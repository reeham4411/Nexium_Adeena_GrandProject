import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: "purple" | "blue" | "green" | "pink" | "orange" | "none";
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hover = false,
  gradient = "none",
  size = "md",
  onClick,
}) => {
  const sizeClasses = {
    sm: "p-4 rounded-xl",
    md: "p-6 rounded-2xl",
    lg: "p-8 rounded-3xl",
    xl: "p-12 rounded-3xl",
  };

  const gradientClasses = {
    purple: "bg-gradient-to-r from-purple-500/20 to-blue-500/20",
    blue: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
    green: "bg-gradient-to-r from-green-500/20 to-blue-500/20",
    pink: "bg-gradient-to-r from-pink-500/20 to-purple-500/20",
    orange: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
    none: "bg-white/10",
  };

  const hoverClasses = hover
    ? "hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-pointer"
    : "";

  const baseClasses = `
    ${gradientClasses[gradient]}
    backdrop-blur-xl
    border border-white/20
    shadow-lg
    ${sizeClasses[size]}
    ${hoverClasses}
    ${className}
  `;

  const cardContent = <div className={baseClasses}>{children}</div>;

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {cardContent}
      </button>
    );
  }

  return cardContent;
};

// Pre-configured card variants
export const StatCard: React.FC<{
  icon: string;
  title: string;
  value: string | number;
  gradient?: GlassCardProps["gradient"];
  className?: string;
}> = ({ icon, title, value, gradient = "purple", className = "" }) => (
  <GlassCard gradient={gradient} size="md" className={className}>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-purple-200 text-sm">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  </GlassCard>
);

export const ActionCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  gradient?: GlassCardProps["gradient"];
}> = ({ icon, title, description, onClick, gradient = "purple" }) => (
  <GlassCard gradient={gradient} hover={true} size="lg" onClick={onClick}>
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-purple-200 leading-relaxed">{description}</p>
    </div>
  </GlassCard>
);

export const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
  gradient?: GlassCardProps["gradient"];
  className?: string;
}> = ({ title, children, gradient = "none", className = "" }) => (
  <GlassCard gradient={gradient} size="md" className={className}>
    <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
    <div className="text-purple-100">{children}</div>
  </GlassCard>
);

export default GlassCard;
