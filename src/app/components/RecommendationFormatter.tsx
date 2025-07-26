import React from "react";

interface RecommendationFormatterProps {
  text: string;
  className?: string;
}

const RecommendationFormatter: React.FC<RecommendationFormatterProps> = ({
  text,
  className = "",
}) => {
  const formatText = (text: string) => {
    // Split text into lines
    const lines = text.split("\n");
    const formattedElements: React.ReactElement[] = [];

    lines.forEach((line, index) => {
      if (line.trim() === "") {
        // Empty line - add spacing
        formattedElements.push(<div key={index} className="h-3" />);
        return;
      }

      // Check if line starts with **
      if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
        // Bold headers
        const content = line.trim().slice(2, -2);
        formattedElements.push(
          <div key={index} className="font-bold text-white text-lg mb-3 mt-4">
            {formatInlineText(content)}
          </div>
        );
      } else if (line.trim().startsWith("***")) {
        // Triple asterisk - sub-points with special styling
        const content = line.trim().slice(3).replace(/\*+$/, "");
        formattedElements.push(
          <div key={index} className="ml-6 mb-2 flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-purple-100 leading-relaxed">
              {formatInlineText(content)}
            </span>
          </div>
        );
      } else if (line.trim().startsWith("*")) {
        // Single asterisk - main bullet points
        const content = line.trim().slice(1).replace(/\*+$/, "");
        formattedElements.push(
          <div key={index} className="ml-4 mb-3 flex items-start gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-white leading-relaxed">
              {formatInlineText(content)}
            </span>
          </div>
        );
      } else {
        // Regular paragraph
        formattedElements.push(
          <p key={index} className="text-white leading-relaxed mb-4">
            {formatInlineText(line.trim())}
          </p>
        );
      }
    });

    return formattedElements;
  };

  const formatInlineText = (text: string) => {
    // Handle **bold** text within lines
    const parts = text.split(/(\*\*[^*]+\*\*)/);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={index} className="font-bold text-purple-200">
            {boldText}
          </strong>
        );
      }
      return part;
    });
  };

  return <div className={`space-y-2 ${className}`}>{formatText(text)}</div>;
};

export default RecommendationFormatter;
