import type { ReactNode } from "react";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
  width?: string | number;
  height?: string | number;
}

/**
 * Premium Skeleton Component
 * Combines a base pulse with a shimmering mask for a modern feel.
 */
export const Skeleton = ({
  className = "",
  variant = "rect",
  width,
  height,
}: SkeletonProps): ReactNode => {
  const baseStyles =
    "relative overflow-hidden bg-white/5 dark:bg-white/5 animate-pulse";

  const variantStyles = {
    rect: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-lg h-4 w-full",
  };

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    >
      {/* Shimmering Glare Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_40px_rgba(255,255,255,0.05)]" />
    </div>
  );
};

export default Skeleton;
