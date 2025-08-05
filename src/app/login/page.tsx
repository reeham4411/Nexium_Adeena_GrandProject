"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login submitted");

    const { error } = await supabase.auth.signInWithOtp({ email });
    setMessage(error ? error.message : "Check your email for the login link!");
    setLoading(false);
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-rose-25 to-peach-50 relative overflow-hidden flex items-center justify-center">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-lavender-100 to-purple-100 rounded-full mix-blend-multiply opacity-20 animate-float"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mix-blend-multiply opacity-25 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-peach-100 to-orange-100 rounded-full mix-blend-multiply opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-br from-mint-100 to-emerald-100 rounded-full mix-blend-multiply opacity-20 animate-float"></div>

        {/* Sparkles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-lavender-300 rounded-full animate-twinkle"></div>
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-rose-300 rounded-full animate-twinkle-delayed"></div>
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-peach-300 rounded-full animate-twinkle-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 bg-mint-300 rounded-full animate-twinkle"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="mb-8 flex items-center gap-3 text-slate-500 hover:text-slate-700 transition-all duration-300 group"
        >
          <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/60 transition-all duration-300">
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

        <div className="backdrop-blur-xl bg-white/30 rounded-[2rem] p-8 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] relative">
          {/* Decorative corner elements */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-lavender-200 to-purple-200 rounded-full opacity-70 animate-pulse-soft"></div>
          <div className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-60 animate-pulse-delayed"></div>
          <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-br from-peach-200 to-orange-200 rounded-full opacity-65 animate-pulse-soft"></div>
          <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-gradient-to-br from-mint-200 to-emerald-200 rounded-full opacity-55 animate-pulse-delayed"></div>

          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-lavender-200 via-rose-200 to-peach-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-3xl">🔮</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full flex items-center justify-center animate-bounce-soft">
                <span className="text-sm">✨</span>
              </div>
            </div>
            <h1 className="text-3xl font-light text-slate-700 mb-3 tracking-wide">
              Welcome Back
            </h1>
            <p className="text-slate-500 font-light leading-relaxed">
              Sign in to continue your wellness journey
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-600 font-medium mb-3 text-lg">
                Email Address
              </label>
              <div className="relative">
                <input
                  className="w-full p-5 pl-14 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200/50 focus:border-white/60 transition-all duration-500 shadow-inner"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-200 to-peach-200 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-gradient-to-r from-lavender-200 via-rose-200 to-peach-200 text-slate-700 py-5 rounded-2xl font-medium text-lg hover:from-lavender-250 hover:via-rose-250 hover:to-peach-250 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden"
              type="submit"
              disabled={loading}
            >
              <div className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                    Sending Magic Link...
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Magic Link
                    <span className="text-xl">✨</span>
                  </span>
                )}
              </div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-5 rounded-2xl backdrop-blur-md border animate-slideIn relative ${
                message.includes("Check your email")
                  ? "bg-mint-100/30 border-mint-200/50"
                  : "bg-rose-100/30 border-rose-200/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                    message.includes("Check your email")
                      ? "bg-gradient-to-br from-mint-200 to-emerald-200"
                      : "bg-gradient-to-br from-rose-200 to-pink-200"
                  }`}
                >
                  {message.includes("Check your email") ? (
                    <svg
                      className="w-4 h-4 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
                <p className="font-medium text-slate-700">{message}</p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-center text-slate-500 text-sm font-light leading-relaxed">
              We will send you a secure login link via email. <br />
              No passwords required!
              <span className="text-lg ml-1">🎉</span>
            </p>
          </div>
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
          animation: slideIn 0.6s ease-out;
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        .animate-pulse-delayed {
          animation: pulse-delayed 2.5s ease-in-out infinite;
        }
        .animate-bounce-soft {
          animation: bounce-soft 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
