"use client";
import { useEffect } from "react";

type ModalProps = {
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

export default function ModalToast({ show, message, type = "info", onClose }: ModalProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const typeColor = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`rounded-lg px-5 py-3 text-white shadow-lg transition-all duration-300 ${typeColor[type]}`}
      >
        {message}
      </div>
    </div>
  );
}
