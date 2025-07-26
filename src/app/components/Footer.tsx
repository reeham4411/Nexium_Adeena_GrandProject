"use client";
import { useRouter } from "next/navigation";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer({ className = "" }: { className?: string }) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer
      className={`bg-purple-200 text-gray-800 border-t border-purple-300 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">Serenely</h1>
            <p className="text-gray-600 text-sm">Mind & Mood Tracker</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6 max-w-md">
              Your personal AI-powered companion for mental wellness. Track your
              mood, get insights, and feel better every day.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 hover:text-purple-600 hover:bg-purple-100 transition-all duration-300 hover:scale-110 border border-purple-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 hover:text-purple-600 hover:bg-purple-100 transition-all duration-300 hover:scale-110 border border-purple-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 hover:text-purple-600 hover:bg-purple-100 transition-all duration-300 hover:scale-110 border border-purple-300"
              >
                <FaGithub />
              </a>
            </div>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-lg font-semibold text-purple-800 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation("/")}
                    className="text-gray-700 hover:text-purple-800 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="text-gray-700 hover:text-purple-800 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/journal")}
                    className="text-gray-700 hover:text-purple-800 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                  >
                    Journal
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-800 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation("/blog")}
                    className="text-gray-700 hover:text-purple-800 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/faq")}
                    className="text-gray-700 hover:text-purple-800 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="text-gray-700 hover:text-purple-800 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-purple-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {currentYear} Serenely. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-green-600 text-sm font-medium">
              AI Online
            </span>
            <p className="text-gray-700">
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              for your mental wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
