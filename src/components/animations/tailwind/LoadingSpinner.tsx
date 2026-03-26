import type { ReactNode } from "react";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({
  className = "",
  size = "md",
}: SpinnerProps): ReactNode => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-vibrant-orange/10 border-t-vibrant-orange rounded-full animate-spin`}
      />
      <div
        className={`absolute ${sizeClasses[size]} border-2 border-transparent border-b-apple-blue/50 rounded-full animate-spin-slow`}
      />
    </div>
  );
};
