"use client";

import { useState, useEffect } from "react";

export default function GeminiApiKeyModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <>
            <style>
                {`
          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animated-gradient {
            background: linear-gradient(270deg, #7c3aed, #4338ca, #8b5cf6, #6366f1);
            background-size: 600% 600%;
            animation: gradientMove 8s ease infinite;
          }
        `}
            </style>

            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-5 py-3 text-white font-semibold rounded-lg shadow-lg hover:brightness-110 transition animated-gradient"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                Tutorial API Key Gemini
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Modal container */}
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        tabIndex={-1}
                        className="fixed inset-0 flex items-center justify-center p-6 z-50 bg-black/10 backdrop-blur-sm"
                    >

                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative">
                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close modal"
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <h2
                                id="modal-title"
                                className="text-2xl font-bold text-gray-900 mb-6"
                            >
                                Cara Dapatkan API Key Gemini
                            </h2>

                            <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
                                <li>
                                    Buka{" "}
                                    <a
                                        href="https://aistudio.google.com/app/apikey"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 underline hover:text-indigo-800"
                                    >
                                        https://aistudio.google.com/app/apikey
                                    </a>.
                                </li>
                                <li>Login menggunakan akun Google Anda.</li>
                                <li>
                                    Klik tombol <strong>&quot;Generate New Key&quot;</strong> atau{" "}
                                    <strong>&quot;Buat Kunci Baru&quot;</strong>.
                                </li>
                                <li>Salin API Key yang muncul dan simpan dengan aman.</li>
                                <li>Gunakan API Key tersebut pada aplikasi Anda untuk mengakses Gemini API.</li>
                            </ol>

                            <p className="mt-6 text-xs text-gray-500">
                                *Jangan bagikan API Key Anda ke publik untuk keamanan.
                            </p>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
