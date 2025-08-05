"use client";

import { useState, useEffect } from "react";
import { fetchAIRecommendation } from "./utils/fetchAI";
import { supabase } from "./lib/supabase";
import { useRouter } from "next/navigation";
import RecommendationFormatter from "./components/RecommendationFormatter";
import Image from "next/image";

export default function Home() {
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [moodRating, setMoodRating] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  // handles magic link & auth check
  useEffect(() => {
    const handleAuth = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("Failed to exchange code for session:", error.message);
        } else {
          // Optionally remove code from URL
          router.replace("/");
        }
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };

    handleAuth();
  }, [router]);

  const handleSubmit = async () => {
    setLoading(true);
    const aiResponse = await fetchAIRecommendation(mood, moodRating);
    setRecommendation(aiResponse);

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

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-lavender-50 flex items-center justify-center relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-rose-200 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-lavender-200 rounded-full animate-float-delayed opacity-40"></div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-peach-200 rounded-full animate-float-slow opacity-50"></div>
          <div className="absolute bottom-20 right-20 w-6 h-6 bg-mint-200 rounded-full animate-float opacity-30"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-200 to-lavender-200 rounded-full mx-auto flex items-center justify-center animate-pulse-soft">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-lavender-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-rose-300 rounded-full animate-bounce"></div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-peach-200 rounded-full animate-ping opacity-40"></div>
          </div>
          <p className="text-slate-600 text-lg font-light tracking-wide">
            Preparing your sanctuary...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-lavender-50 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mix-blend-multiply opacity-30 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-lavender-100 to-purple-100 rounded-full mix-blend-multiply opacity-25 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-peach-100 to-orange-100 rounded-full mix-blend-multiply opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-mint-100 to-emerald-100 rounded-full mix-blend-multiply opacity-25 animate-float"></div>

        {/* Small floating dots */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-rose-300 rounded-full animate-twinkle opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-lavender-300 rounded-full animate-twinkle-delayed opacity-50"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-peach-300 rounded-full animate-twinkle-slow opacity-70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {isAuthenticated ? (
            <div className="backdrop-blur-xl bg-white/40 rounded-[2rem] p-8 border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] relative">
              {/* Decorative corner elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-60"></div>
              <div className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-br from-lavender-200 to-purple-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-br from-peach-200 to-orange-200 rounded-full opacity-55"></div>
              <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-gradient-to-br from-mint-200 to-emerald-200 rounded-full opacity-65"></div>

              <div className="space-y-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-light text-slate-700 mb-2 tracking-wide">
                    How are you feeling today?
                  </h1>
                  <p className="text-slate-500 font-light">
                    Share your thoughts and receive personalized guidance
                  </p>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-4 text-lg">
                    Tell us about your mood
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200/50 focus:border-white/60 transition-all duration-500 resize-none h-36 shadow-inner"
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      placeholder="Describe how you're feeling right now... What's on your mind?"
                    />
                    <div className="absolute bottom-4 right-4 text-slate-400 text-sm">
                      {mood.length}/500
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-4 text-lg">
                    Rate your mood (1-5)
                  </label>

                  <div className="relative p-6 bg-white/30 rounded-2xl border border-white/30">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl mb-2">😢</span>
                        <span className="text-slate-600 font-medium text-sm">
                          1
                        </span>
                      </div>

                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={moodRating}
                          onChange={(e) =>
                            setMoodRating(Number(e.target.value))
                          }
                          className="w-full h-3 bg-gradient-to-r from-rose-200 via-peach-200 to-mint-200 rounded-full appearance-none cursor-pointer slider-thumb"
                        />
                        <div className="flex justify-between mt-2 px-2">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <div
                              key={num}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                moodRating >= num
                                  ? "bg-gradient-to-r from-rose-300 to-peach-300 scale-110"
                                  : "bg-slate-200"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-2xl mb-2">😊</span>
                        <span className="text-slate-600 font-medium text-sm">
                          5
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-slate-600 text-center font-medium">
                      Current mood: {moodRating}/5
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !mood.trim() || moodRating === 0}
                  className="w-full bg-gradient-to-r from-rose-200 via-peach-200 to-lavender-200 text-slate-700 py-5 rounded-2xl font-medium text-lg hover:from-rose-250 hover:via-peach-250 hover:to-lavender-250 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-lg hover:shadow-xl transform-gpu relative overflow-hidden"
                >
                  <div className="relative z-10">
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                        Analyzing your mood...
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Get AI Recommendation
                        <span className="text-xl">✨</span>
                      </span>
                    )}
                  </div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>

              {recommendation && (
                <div className="mt-8 p-6 bg-gradient-to-r from-mint-100/40 to-emerald-100/40 backdrop-blur-md rounded-2xl border border-mint-200/50 animate-slideIn relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-mint-300 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -top-1 -right-2 w-3 h-3 bg-emerald-300 rounded-full opacity-50 animate-pulse-delayed"></div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-mint-200 to-emerald-200 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">🧠</span>
                    </div>
                    <h2 className="text-slate-700 font-semibold text-xl">
                      AI Recommendation
                    </h2>
                  </div>
                  <RecommendationFormatter text={recommendation} />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="backdrop-blur-xl bg-white/40 rounded-[2rem] p-12 border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] max-w-lg mx-auto relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-70 animate-bounce-slow"></div>
                <div className="absolute top-4 -right-4 w-6 h-6 bg-gradient-to-br from-lavender-200 to-purple-200 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-4 -left-4 w-5 h-5 bg-gradient-to-br from-peach-200 to-orange-200 rounded-full opacity-65 animate-twinkle"></div>

                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-8 relative ring-4 ring-white/30 ring-offset-4 ring-offset-transparent">
                  <Image
                    src="/leaf-bg-removal.png"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-100/20 to-transparent"></div>
                </div>
                <h2 className="text-4xl font-light text-slate-700 mb-4 tracking-wide">
                  Welcome to Serenely
                </h2>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">
                  Embark on a journey of emotional wellness with AI-powered
                  insights and personalized recommendations tailored just for
                  you.
                </p>
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-rose-200 via-peach-200 to-lavender-200 text-slate-700 px-10 py-4 rounded-2xl hover:from-rose-250 hover:via-peach-250 hover:to-lavender-250 transition-all duration-500 font-medium text-lg hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Begin Your Journey
                    <span className="text-xl">✨</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        @keyframes twinkle-delayed {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        @keyframes twinkle-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.3);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulse-soft {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes pulse-delayed {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-twinkle-delayed {
          animation: twinkle-delayed 4s ease-in-out infinite;
        }
        .animate-twinkle-slow {
          animation: twinkle-slow 5s ease-in-out infinite;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        .animate-pulse-delayed {
          animation: pulse-delayed 2.5s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fda4af, #fbbf24);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 2px solid white;
        }
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fda4af, #fbbf24);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}
