"use client";

import { useRouter } from "next/navigation";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer
      className={`bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-xl border-t border-white/10 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Serenely
                </h2>
                <p className="text-purple-200 text-sm">Mind & Mood Tracker</p>
              </div>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed mb-6 max-w-md">
              Your personal AI-powered companion for mental wellness. Track your
              emotions, receive personalized insights, and build healthier
              emotional patterns with intelligent recommendations tailored just
              for you.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.533l1.745-1.745c.394.787 1.201 1.328 2.132 1.328 1.323 0 2.394-1.071 2.394-2.394s-1.071-2.394-2.394-2.394c-.931 0-1.738.541-2.132 1.328L5.244 10.033c.757-.937 1.908-1.533 3.205-1.533 2.27 0 4.106 1.836 4.106 4.106s-1.836 4.106-4.106 4.106z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-purple-200 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                aria-label="Email"
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
                    d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Login
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">
                AI-Powered Insights
              </h4>
              <p className="text-purple-200 text-sm">
                Personalized recommendations based on your unique emotional
                patterns
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <h4 className="text-white font-medium mb-2">Progress Tracking</h4>
              <p className="text-purple-200 text-sm">
                Visual analytics to help you understand your emotional journey
                over time
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Privacy First</h4>
              <p className="text-purple-200 text-sm">
                Your emotional data is encrypted and secure, giving you peace of
                mind
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-purple-200 text-sm">
              © {currentYear} Serenely. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                AI Online
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <p className="text-purple-200">
              Made with <span className="text-red-400 animate-pulse">❤️</span>{" "}
              for your mental wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
