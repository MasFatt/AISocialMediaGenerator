"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function OutputBox({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Gagal menyalin teks:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6 border border-gray-700 mt-10 relative text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Deskripsi yang Dihasilkan</h2>
        <button
          onClick={copyToClipboard}
          aria-label="Salin ke clipboard"
          title="Salin ke clipboard"
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        >
          {copied ? (
            <FiCheck className="w-5 h-5 text-green-400" />
          ) : (
            <FiCopy className="w-5 h-5" />
          )}
          <span className="text-sm">{copied ? "Tersalin" : "Salin"}</span>
        </button>
      </div>

      <pre className="whitespace-pre-wrap leading-relaxed text-sm font-sans bg-gray-800 rounded-md p-4 min-h-[140px] text-gray-100">
        {content || "Belum ada hasil. Silakan masukkan topik dan klik &#39;Hasilkan Postingan&#39;."}
      </pre>

    </div>
  );
}
