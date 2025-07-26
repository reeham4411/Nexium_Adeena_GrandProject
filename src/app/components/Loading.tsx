import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "md",
  variant = "spinner",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const renderSpinner = () => (
    <div
      className={`${sizeClasses[size]} border-4 border-purple-300 border-t-white rounded-full animate-spin`}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
      <div
        className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  );

  const renderPulse = () => (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse`}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className="text-center">
      <div className="flex justify-center mb-4">{renderLoader()}</div>
      <p className={`text-white ${textSizeClasses[size]} font-medium`}>
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
