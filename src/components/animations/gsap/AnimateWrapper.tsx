import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE_PREMIUM } from "../../../core/utils/animations";

/**
 * AnimateWrapper
 * A GSAP-powered component for fluid entrances.
 */
interface AnimateWrapperProps {
  children: ReactNode;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "pop" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: number;
}

export const AnimateWrapper = ({
  children,
  animation = "none",
  delay = 0,
  duration = 0.6,
  className = "",
  stagger = 0,
}: AnimateWrapperProps): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const vars: gsap.TweenVars = {
        opacity: 0,
        ease: EASE_PREMIUM,
        delay,
        duration,
        stagger,
      };

      if (animation === "none") return;
      if (animation === "slideUp") vars.y = 30;
      if (animation === "slideDown") vars.y = -30;
      if (animation === "pop") vars.scale = 0.9;

      gsap.from(el.children, {
        ...vars,
      });
    },
    { scope: containerRef, dependencies: [animation, delay] },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
