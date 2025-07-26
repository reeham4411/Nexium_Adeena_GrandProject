"use client";

import { useState, useEffect } from "react";
import { fetchAIRecommendation } from "./utils/fetchAI";
import { supabase } from "./lib/supabase";
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

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-300 border-t-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header with Login/Logout */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              MoodFlow
            </h1>
            <p className="text-purple-200 text-lg">
              How are you feeling today?
            </p>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-purple-200 text-sm">Welcome back,</p>
                <p className="text-white font-medium">{userEmail}</p>
              </div>
              <button
                onClick={handleDashboard}
                className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500/80 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-red-500 transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium hover:scale-105 shadow-lg"
            >
              Login
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {isAuthenticated ? (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-3 text-lg">
                    Tell us about your mood
                  </label>
                  <textarea
                    className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none h-32"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Describe how you're feeling right now... What's on your mind?"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-3 text-lg">
                    Rate your mood (1-5)
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMoodRating(rating)}
                        className={`w-12 h-12 rounded-full border-2 font-bold transition-all duration-300 hover:scale-110 ${
                          moodRating === rating
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 border-white text-white shadow-lg"
                            : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-purple-200 text-sm mt-2">
                    <span>Very Bad</span>
                    <span>Great</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !mood.trim() || moodRating === 0}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-2xl font-medium text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Analyzing your mood...
                    </div>
                  ) : (
                    "Get AI Recommendation ✨"
                  )}
                </button>
              </div>

              {recommendation && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-md rounded-2xl border border-white/20 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🤖</span>
                    </div>
                    <h2 className="text-white font-semibold text-xl">
                      AI Recommendation
                    </h2>
                  </div>
                  <p className="text-white leading-relaxed text-lg">
                    {recommendation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🌟</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome to MoodFlow
                </h2>
                <p className="text-purple-200 mb-8 text-lg leading-relaxed">
                  Track your emotions, get AI-powered insights, and discover
                  personalized recommendations to enhance your well-being.
                </p>
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium text-lg hover:scale-105 shadow-lg"
                >
                  Start Your Journey ✨
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
