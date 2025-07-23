"use client";

import { useState } from "react";
import { fetchAIRecommendation } from "./utils/fetchAI";

export default function Home() {
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleSubmit = async () => {
    const aiResponse = await fetchAIRecommendation(mood);
    setRecommendation(aiResponse);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">How are you feeling today?</h1>
      <textarea
        className="border w-full p-2 mb-2"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Describe your mood..."
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2"
      >
        Get Recommendation
      </button>
      {recommendation && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">AI Suggestion:</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}
