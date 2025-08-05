"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import RecommendationFormatter from "../components/RecommendationFormatter";

interface Log {
  mood: string;
  recommendation: string;
  date: string;
  moodRating?: number;
  userId?: string;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchLogs() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          throw new Error("User not authenticated.");
        }

        const userId = user.id;

        console.log("🔍 Logged-in user ID:", userId);

        const res = await fetch(
          `/api/getLogs?id=${encodeURIComponent(userId!)}`
        );

        console.log("🔍 Fetching logs from API:", res);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching logs:", error);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  const getMoodEmoji = (mood: string) => {
    const moodLower = mood.toLowerCase();
    if (
      moodLower.includes("happy") ||
      moodLower.includes("great") ||
      moodLower.includes("excited")
    )
      return "😊";
    if (
      moodLower.includes("sad") ||
      moodLower.includes("down") ||
      moodLower.includes("depressed")
    )
      return "😢";
    if (moodLower.includes("angry") || moodLower.includes("frustrated"))
      return "😠";
    if (moodLower.includes("anxious") || moodLower.includes("worried"))
      return "😰";
    if (moodLower.includes("tired") || moodLower.includes("exhausted"))
      return "😴";
    if (moodLower.includes("calm") || moodLower.includes("peaceful"))
      return "😌";
    return "🤔";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sage-25 to-lavender-50 flex items-center justify-center relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-mint-200 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-sage-200 rounded-full animate-float-delayed opacity-40"></div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-lavender-200 rounded-full animate-float-slow opacity-50"></div>
          <div className="absolute bottom-20 right-20 w-6 h-6 bg-peach-200 rounded-full animate-float opacity-30"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-mint-200 to-sage-200 rounded-full mx-auto flex items-center justify-center animate-pulse-soft">
              <div className="w-16 h-16 bg-gradient-to-br from-mint-100 to-sage-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-lavender-200 rounded-full animate-ping opacity-40"></div>
          </div>
          <p className="text-slate-600 text-lg font-light tracking-wide">
            Loading your mood journey...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-sage-25 to-lavender-50 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-mint-100 to-emerald-100 rounded-full mix-blend-multiply opacity-25 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-sage-100 to-green-100 rounded-full mix-blend-multiply opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-lavender-100 to-purple-100 rounded-full mix-blend-multiply opacity-15 animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-peach-100 to-orange-100 rounded-full mix-blend-multiply opacity-30 animate-float"></div>

        {/* Sparkles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-mint-300 rounded-full animate-twinkle opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-sage-300 rounded-full animate-twinkle-delayed opacity-50"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-lavender-300 rounded-full animate-twinkle-slow opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 bg-peach-300 rounded-full animate-twinkle opacity-55"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={handleBack}
            className="flex items-center gap-3 text-slate-500 hover:text-slate-700 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/60 transition-all duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="font-medium">Back to Home</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-light mb-3 bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent tracking-wide">
              Your Mood Journey
            </h1>
            <p className="text-slate-600 font-light">
              Discover patterns in your emotional wellness
            </p>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        <div className="max-w-6xl mx-auto">
          {logs.length === 0 ? (
            <div className="text-center py-16">
              <div className="backdrop-blur-xl bg-white/30 rounded-[2rem] p-12 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] max-w-lg mx-auto relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-mint-200 to-sage-200 rounded-full opacity-70 animate-bounce-soft"></div>
                <div className="absolute top-4 -right-4 w-6 h-6 bg-gradient-to-br from-lavender-200 to-purple-200 rounded-full opacity-60 animate-pulse-soft"></div>
                <div className="absolute bottom-4 -left-4 w-5 h-5 bg-gradient-to-br from-peach-200 to-orange-200 rounded-full opacity-65 animate-twinkle"></div>

                <div className="w-24 h-24 bg-gradient-to-br from-mint-200 via-sage-200 to-lavender-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-4xl">📊</span>
                </div>
                <h2 className="text-3xl font-light text-slate-700 mb-4 tracking-wide">
                  No Mood Logs Yet
                </h2>
                <p className="text-slate-600 mb-8 font-light leading-relaxed">
                  Begin your emotional wellness journey by recording your first
                  mood entry.
                  <br />
                  <small className="text-slate-500 block mt-3 text-sm">
                    Your data is securely stored and ready to provide insights
                  </small>
                </p>
                <button
                  onClick={handleBack}
                  className="bg-gradient-to-r from-mint-200 via-sage-200 to-lavender-200 text-slate-700 px-10 py-4 rounded-2xl hover:from-mint-250 hover:via-sage-250 hover:to-lavender-250 transition-all duration-500 font-medium hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Record Your First Mood
                    <span className="text-xl">✨</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="backdrop-blur-xl bg-white/30 rounded-2xl p-6 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] relative">
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-mint-300 rounded-full opacity-60 animate-pulse-soft"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-mint-200 to-emerald-200 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">📈</span>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium">
                        Total Entries
                      </p>
                      <p className="text-slate-800 text-3xl font-light">
                        {logs.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/30 rounded-2xl p-6 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] relative">
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-sage-300 rounded-full opacity-60 animate-pulse-delayed"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-sage-200 to-green-200 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">🧠</span>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium">
                        AI Insights
                      </p>
                      <p className="text-slate-800 text-3xl font-light">
                        {logs.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/30 rounded-2xl p-6 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] relative">
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-lavender-300 rounded-full opacity-60 animate-pulse-soft"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-lavender-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">🔥</span>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium">
                        Days Tracking
                      </p>
                      <p className="text-slate-800 text-3xl font-light">
                        {
                          new Set(
                            logs.map((log) => new Date(log.date).toDateString())
                          ).size
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mood Logs */}
              <div className="space-y-6">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-xl bg-white/30 rounded-2xl p-8 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:bg-white/40 transition-all duration-500 animate-slideIn relative group"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Decorative corner dot */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-mint-300 to-emerald-300 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-300"></div>

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-mint-200 via-sage-200 to-lavender-200 rounded-full flex items-center justify-center text-3xl shadow-lg relative">
                          {getMoodEmoji(log.mood)}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                            <span className="text-xs text-slate-600 font-medium">
                              {log.moodRating || "?"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-slate-800 font-medium text-xl">
                            Mood Entry
                          </h3>
                          <span className="text-slate-600 text-sm bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-sm">
                            {formatDate(log.date)}
                          </span>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <p className="text-slate-600 text-sm mb-3 font-medium flex items-center gap-2">
                              <span className="w-2 h-2 bg-mint-300 rounded-full"></span>
                              How you felt:
                            </p>
                            <p className="text-slate-700 leading-relaxed bg-white/30 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-inner">
                              {log.mood}
                            </p>
                          </div>

                          <div>
                            <p className="text-slate-600 text-sm mb-3 font-medium flex items-center gap-2">
                              <span className="text-lg">🤖</span>
                              AI Recommendation:
                            </p>
                            <div className="bg-gradient-to-r from-mint-100/40 via-sage-100/30 to-lavender-100/40 backdrop-blur-md rounded-xl p-5 border border-mint-200/40">
                              <RecommendationFormatter
                                text={log.recommendation}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/20">
                          <p className="text-slate-500 text-xs flex items-center gap-2 font-light">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {new Date(log.date).toLocaleString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Footer */}
              {logs.length > 0 && (
                <div className="text-center mt-16">
                  <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-8 border border-white/30 inline-block">
                    <p className="text-slate-600 font-light leading-relaxed">
                      You have completed{" "}
                      <span className="font-medium text-slate-700">
                        {logs.length}
                      </span>{" "}
                      mood entries on your wellness journey.
                      <br />
                      Keep tracking to unlock deeper insights!
                      <span className="text-xl ml-2">🌟</span>
                    </p>
                  </div>
                </div>
              )}
            </>
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
            transform: translateY(30px) scale(0.95);
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
        @keyframes bounce-soft {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
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
          animation: slideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        .animate-pulse-delayed {
          animation: pulse-delayed 2.5s ease-in-out infinite;
        }
        .animate-bounce-soft {
          animation: bounce-soft 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
