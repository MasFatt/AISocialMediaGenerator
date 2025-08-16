"use client";

import HomeScreen from "@/components/HomeScreen";
import GeminiApiKeyModal from "@/components/GeminiApiKeyModal";


export default function Home() {
  return (
    <>
      <HomeScreen />
      <div className="fixed bottom-5 right-5">
        <GeminiApiKeyModal />
      </div>
    </>
  );
}
