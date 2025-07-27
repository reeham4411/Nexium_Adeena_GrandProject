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
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-300 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">
            Loading your mood history from Supabase...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-violet-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
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
              Back to Home
            </button>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Your Mood Journey
              </h1>
              <p className="text-slate-600">
                Track your emotional patterns over time
              </p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>

          <div className="max-w-4xl mx-auto">
            {logs.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-blue-100 shadow-xl max-w-lg mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📊</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-700 mb-4">
                    No Mood Logs Yet
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Start tracking your mood to see your emotional journey
                    unfold here.
                    <br />
                    <small className="text-slate-500 block mt-2">
                      Data is stored in Supabase - check browser console for
                      debug info
                    </small>
                  </p>
                  <button
                    onClick={handleBack}
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-8 py-3 rounded-2xl hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 font-medium hover:scale-105 shadow-lg"
                  >
                    Record Your First Mood ✨
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-100/60 to-indigo-100/60 backdrop-blur-xl rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">📈</span>
                      </div>
                      <div>
                        <p className="text-slate-600 text-sm">Total Entries</p>
                        <p className="text-slate-800 text-2xl font-bold">
                          {logs.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-100/60 to-blue-100/60 backdrop-blur-xl rounded-2xl p-6 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">🧠</span>
                      </div>
                      <div>
                        <p className="text-slate-600 text-sm">AI Insights</p>
                        <p className="text-slate-800 text-2xl font-bold">
                          {logs.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-100/60 to-orange-100/60 backdrop-blur-xl rounded-2xl p-6 border border-amber-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">🔥</span>
                      </div>
                      <div>
                        <p className="text-slate-600 text-sm">Days Tracking</p>
                        <p className="text-slate-800 text-2xl font-bold">
                          {
                            new Set(
                              logs.map((log) =>
                                new Date(log.date).toDateString()
                              )
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
                      className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 shadow-lg hover:bg-white/90 transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl">
                            {getMoodEmoji(log.mood)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-slate-800 font-semibold text-lg">
                              Mood Entry
                            </h3>
                            <span className="text-slate-600 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                              {formatDate(log.date)}
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-slate-600 text-sm mb-2 font-medium">
                                How you felt:
                              </p>
                              <p className="text-slate-700 leading-relaxed bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                                {log.mood}
                              </p>
                            </div>

                            <div>
                              <p className="text-slate-600 text-sm mb-2 font-medium flex items-center gap-2">
                                <span className="text-lg">🤖</span>
                                AI Recommendation:
                              </p>
                              <div className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 rounded-xl p-4 border border-emerald-200">
                                <RecommendationFormatter
                                  text={log.recommendation}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-blue-100">
                            <p className="text-slate-500 text-xs flex items-center gap-2">
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

                {/* Load More Button (if needed in future) */}
                {logs.length > 0 && (
                  <div className="text-center mt-12">
                    <p className="text-slate-600">
                      You have viewed all {logs.length} mood entries from
                      Supabase. Keep tracking to see more insights! 🌟
                    </p>
                  </div>
                )}
              </>
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
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    </>
  );
}
