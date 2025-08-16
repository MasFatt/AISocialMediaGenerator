"use client";

import { useState } from "react";
import InputForm from "./InputForm";
import OutputBox from "./OutputBox";

export default function HomeScreen() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = (output: string) => {
    setResult(output);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          AI Social Media Post Generator
        </h1>

        <InputForm
          onGenerate={(output: string) => {
            setLoading(true);
            handleGenerate(output);
          }}
        />

        {loading && (
          <p className="mt-6 text-center text-indigo-400 animate-pulse">
            Menghasilkan postingan...
          </p>
        )}

        {result && <OutputBox content={result} />}
      </div>
    </main>
  );
}
