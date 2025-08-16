"use client";
import { useEffect, useState } from "react";

const platforms = ["Twitter/X", "LinkedIn", "Facebook", "Instagram"];
const styles = ["Casual", "Professional", "Humorous", "Inspirational", "Technical"];

export default function InputForm({ onGenerate }: { onGenerate: (result: string) => void }) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Twitter/X");
  const [style, setStyle] = useState("Casual");
  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [includeHashtag, setIncludeHashtag] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load API key dari localStorage saat komponen mount
  useEffect(() => {
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) setApiKey(storedKey);
  }, []);

  // Simpan API key ke localStorage
  const handleSaveApiKey = () => {
    if (apiKey.trim().length > 0) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      setErrorMessage("");
      setSuccessMessage("API key berhasil disimpan.");
      setStatus("idle");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setErrorMessage("API key tidak boleh kosong.");
      setSuccessMessage("");
    }
  };

  // Hapus API key dari localStorage dan reset state
  const handleDeleteApiKey = () => {
    localStorage.removeItem("gemini_api_key");
    setApiKey("");
    setErrorMessage("");
    setSuccessMessage("API key berhasil dihapus.");
    setStatus("idle");
    onGenerate(""); // reset hasil generate saat API key dihapus
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!apiKey.trim()) {
      setErrorMessage("API key tidak boleh kosong. Silakan simpan API key terlebih dahulu.");
      return;
    }
    if (!topic.trim()) {
      setErrorMessage("Topik tidak boleh kosong.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/generatePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, platform, style, includeEmoji, includeHashtag, apiKey }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(errorData?.error || `Gagal menghasilkan postingan. Status: ${res.status}`);
        return;
      }

      const data = await res.json();

      if (data.error) {
        setStatus("error");
        setErrorMessage(data.error);
        return;
      }

      setStatus("success");
      setSuccessMessage("Postingan berhasil dibuat.");
      onGenerate(data.output);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Terjadi kesalahan pada server.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto rounded-lg p-6 space-y-6 border border-gray-700 bg-gray-950"
    >
      {/* API Key Input */}
      <div>
        <label htmlFor="apiKey" className="block text-gray-300 font-medium mb-2">
          API Key Gemini
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="apiKey"
            type="text"
            placeholder="Masukkan API Key Anda"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 bg-gray-800 text-gray-100 rounded-md p-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          />
          <button
            type="button"
            onClick={handleSaveApiKey}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={handleDeleteApiKey}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            Hapus
          </button>
        </div>
        {errorMessage && (
          <p className="mt-2 text-red-400 text-sm font-medium">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="mt-2 text-green-400 text-sm font-medium">{successMessage}</p>
        )}
      </div>

      {/* Topic Input */}
      <div>
        <label htmlFor="topic" className="block text-gray-300 font-medium mb-2">
          Topik / Tujuan Postingan
        </label>
        <textarea
          id="topic"
          placeholder="Masukkan topik atau tujuan postingan"
          className="w-full bg-gray-800 text-gray-100 rounded-md p-4 resize-none border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>

      {/* Platform & Style */}
      <div className="flex flex-wrap gap-4 items-start justify-between">
        <div className="flex flex-col">
          <span className="block mb-1 text-gray-300 font-medium">Platform</span>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                  platform === p
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-6">
        <div className="flex-1 min-w-[160px]">
          <label htmlFor="style" className="block mb-1 text-gray-300 font-medium">
            Gaya Penulisan
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 rounded-md p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-6 ml-auto items-center text-sm font-medium text-gray-300">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={includeHashtag}
                onChange={() => setIncludeHashtag(!includeHashtag)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-700 rounded-full peer-checked:bg-indigo-500 transition-colors duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-300"></div>
            </div>
            <span>Sertakan Hashtag</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={includeEmoji}
                onChange={() => setIncludeEmoji(!includeEmoji)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-700 rounded-full peer-checked:bg-indigo-500 transition-colors duration-300"></div>
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform duration-300"></div>
            </div>
            <span>Sertakan Emoji</span>
          </label>
        </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading" || !apiKey.trim()}
        className="w-full bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-md py-3 hover:bg-indigo-600 transition-shadow shadow-md"
      >
        {status === "loading" ? "Menghasilkan..." : "Hasilkan Postingan"}
      </button>
    </form>
  );
}
