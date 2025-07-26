import React from "react";

interface MoodRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

const MoodRating: React.FC<MoodRatingProps> = ({
  rating,
  onRatingChange,
  disabled = false,
  size = "md",
  showLabels = true,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };

  const emotions = [
    {
      rating: 1,
      emoji: "😢",
      label: "Very Bad",
      color: "from-red-500 to-red-600",
    },
    {
      rating: 2,
      emoji: "😕",
      label: "Bad",
      color: "from-orange-500 to-red-500",
    },
    {
      rating: 3,
      emoji: "😐",
      label: "Neutral",
      color: "from-yellow-500 to-orange-500",
    },
    {
      rating: 4,
      emoji: "😊",
      label: "Good",
      color: "from-green-500 to-yellow-500",
    },
    {
      rating: 5,
      emoji: "😄",
      label: "Great",
      color: "from-green-400 to-green-500",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-3 justify-center">
        {emotions.map((emotion) => (
          <button
            key={emotion.rating}
            onClick={() => !disabled && onRatingChange(emotion.rating)}
            disabled={disabled}
            className={`
              ${sizeClasses[size]} 
              rounded-full border-2 font-bold transition-all duration-300 
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50
              ${
                rating === emotion.rating
                  ? `bg-gradient-to-r ${emotion.color} border-white text-white shadow-lg scale-110`
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            title={emotion.label}
          >
            <span className="text-xl">{emotion.emoji}</span>
          </button>
        ))}
      </div>

      {showLabels && (
        <div className="flex justify-between text-purple-200 text-sm px-2">
          <span>Very Bad</span>
          <span>Great</span>
        </div>
      )}

      {rating > 0 && (
        <div className="text-center">
          <p className="text-white font-medium">
            You are feeling:{" "}
            <span className="text-purple-200">
              {emotions[rating - 1].label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodRating;
