import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBackButton = false,
  onBackClick,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden ${className}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        {(showBackButton || title) && (
          <div className="flex items-center justify-between mb-12">
            {showBackButton ? (
              <button
                onClick={onBackClick}
                className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors duration-300 group"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
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
                Back
              </button>
            ) : (
              <div></div>
            )}
            {title && (
              <div className="text-center flex-1">
                <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && <p className="text-purple-200">{subtitle}</p>}
              </div>
            )}
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        )}

        {/* Main content */}
        <main>{children}</main>
      </div>

      {/* Global styles for animations */}
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PageLayout;
