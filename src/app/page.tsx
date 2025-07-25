"use client";

import { useState, useEffect } from "react";
import { fetchAIRecommendation } from "./utils/fetchAI";
import { supabase } from "./lib/supabase"; // Adjust path as needed
import { useRouter } from "next/navigation";

export default function Home() {
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const [moodRating, setMoodRating] = useState<number>(0);

  // Get user authentication status
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
      setIsAuthenticated(!!user);
    };
    getUser();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const aiResponse = await fetchAIRecommendation(mood, moodRating);
    setRecommendation(aiResponse);

    // Clear mood if successful (not an error message)
    if (
      !aiResponse.includes("Something went wrong") &&
      !aiResponse.includes("Please log in")
    ) {
      setMood("");
    }

    setLoading(false);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setIsAuthenticated(false);
    setRecommendation("");
    setMood("");
  };

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Header with Login/Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">How are you feeling today?</h1>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>

      {/* Main Content */}
      {isAuthenticated ? (
        <>
          <textarea
            className="border w-full p-2 mb-2 rounded"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Describe your mood..."
          />
          <div className="mb-4">
            <label className="block mb-1 font-medium">Mood Rating (1-5)</label>
            <select
              value={moodRating}
              onChange={(e) => setMoodRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
            >
              <option value={0}>Select a rating</option>
              <option value={1}>1 - Very Bad</option>
              <option value={2}>2 - Bad</option>
              <option value={3}>3 - Neutral</option>
              <option value={4}>4 - Good</option>
              <option value={5}>5 - Great</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 disabled:opacity-50 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Recommendation"}
          </button>

          {recommendation && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h2 className="font-semibold">AI Suggestion:</h2>
              <p>{recommendation}</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Please log in to track your mood and get AI recommendations.
          </p>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Get Started - Login
          </button>
        </div>
      )}
    </div>
  );
}
