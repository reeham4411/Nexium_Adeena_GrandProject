"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

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

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email || null);
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    router.push("/login");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    router.push("/login");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
    setIsMenuOpen(false);
  };

  const handleHome = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`bg-purple-600 border-b border-purple-700 sticky top-0 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={handleHome}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg bg-white">
              <Image
                src="/leaf-logo.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Serenely
              </h1>
              <p className="text-xs text-purple-200 -mt-1">Mind & Mood</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <div className="text-right mr-4">
                  <p className="text-purple-200 text-sm">Welcome back,</p>
                  <p className="text-white font-medium text-sm truncate max-w-48">
                    {userEmail}
                  </p>
                </div>

                <button
                  onClick={handleDashboard}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500/80 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-red-500 transition-all duration-300 hover:scale-105 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium hover:scale-105 shadow-lg group"
              >
                <svg
                  className="w-4 h-4 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="pb-3 border-b border-white/10">
                    <p className="text-purple-200 text-sm">Welcome back,</p>
                    <p className="text-white font-medium truncate">
                      {userEmail}
                    </p>
                  </div>

                  <button
                    onClick={handleDashboard}
                    className="w-full flex items-center space-x-3 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 bg-red-500/80 text-white px-4 py-3 rounded-xl hover:bg-red-500 transition-all duration-300"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium"
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}
