"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import RecommendationFormatter from "../components/RecommendationFormatter";

interface Log {
  mood: string;
  recommendation: string;
  date: string;
  moodRating?: number;
  userEmail?: string;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchLogs() {
      try {
        console.log(
          "🔍 Dashboard: Fetching logs from n8n managed collections..."
        );
        const res = await fetch("/api/getLogs");
        console.log("📡 API Response status:", res.status);
        console.log("📡 API Response ok:", res.ok);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ API Error response:", errorText);
          throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        console.log("📊 Raw API response:", data);
        console.log("📝 Data type:", typeof data);
        console.log("📝 Is array:", Array.isArray(data));
        console.log(
          "📝 Number of logs:",
          Array.isArray(data) ? data.length : "Not an array"
        );

        if (Array.isArray(data) && data.length > 0) {
          console.log("📋 First log entry:", JSON.stringify(data[0], null, 2));
          console.log("📋 Sample mood:", data[0].mood);
          console.log(
            "📋 Sample recommendation:",
            data[0].recommendation?.substring(0, 100) + "..."
          );
        }

        setLogs(Array.isArray(data) ? data : []);
        console.log(
          "✅ Logs set successfully:",
          Array.isArray(data) ? data.length : 0,
          "entries"
        );
      } catch (error) {
        console.error("❌ Error fetching logs from n8n collections:", error);
        if (error instanceof Error) {
          console.error("❌ Error details:", error.message);
        } else {
          console.error("❌ Error details: Unknown error type");
        }
        setLogs([]); // Set empty array on error
      } finally {
        setLoading(false);
        console.log("🏁 Dashboard loading completed");
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-300 border-t-white mx-auto mb-4"></div>
          <p className="text-white text-lg">
            Loading your mood history from n8n...
          </p>
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
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors duration-300"
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
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Your Mood Journey
            </h1>
            <p className="text-purple-200">
              Track your emotional patterns over time
            </p>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        <div className="max-w-4xl mx-auto">
          {logs.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  No Mood Logs Yet
                </h2>
                <p className="text-purple-200 mb-8">
                  Start tracking your mood to see your emotional journey unfold
                  here.
                  <br />
                  <small className="text-purple-300 block mt-2">
                    Data is managed by n8n workflow - check browser console for
                    debug info
                  </small>
                </p>
                <button
                  onClick={handleBack}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium hover:scale-105 shadow-lg"
                >
                  Record Your First Mood ✨
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">📈</span>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm">Total Entries</p>
                      <p className="text-white text-2xl font-bold">
                        {logs.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🧠</span>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm">AI Insights</p>
                      <p className="text-white text-2xl font-bold">
                        {logs.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🔥</span>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm">Days Tracking</p>
                      <p className="text-white text-2xl font-bold">
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
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                          {getMoodEmoji(log.mood)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-semibold text-lg">
                            Mood Entry
                          </h3>
                          <span className="text-purple-200 text-sm bg-white/10 px-3 py-1 rounded-full">
                            {formatDate(log.date)}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-purple-200 text-sm mb-2 font-medium">
                              How you felt:
                            </p>
                            <p className="text-white leading-relaxed bg-white/5 rounded-xl p-4 border border-white/10">
                              {log.mood}
                            </p>
                          </div>

                          <div>
                            <p className="text-purple-200 text-sm mb-2 font-medium flex items-center gap-2">
                              <span className="text-lg">🤖</span>
                              AI Recommendation:
                            </p>
                            <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-xl p-4 border border-white/10">
                              <RecommendationFormatter
                                text={log.recommendation}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-purple-300 text-xs flex items-center gap-2">
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
                  <p className="text-purple-200">
                    You have viewed all {logs.length} mood entries from n8n.
                    Keep tracking to see more insights! 🌟
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
  );
}
