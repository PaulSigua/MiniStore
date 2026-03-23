import { gsap } from "gsap";

/**
 * Custom Easing based on Apple's premium feel
 */
export const EASE_PREMIUM = "cubic-bezier(0.25, 1, 0.5, 1)";
export const EASE_SPRING = "elastic.out(1, 0.75)";

/**
 * Standard Durations
 */
export const DURATION = {
  INSTANT: 0.1,
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.7,
  RELAXED: 1.2,
};

/**
 * Preset Animations
 */
export const ANIM_PRESETS = {
  fadeIn: {
    opacity: 0,
    duration: DURATION.NORMAL,
    ease: "power2.out",
  },
  slideUp: {
    y: 20,
    opacity: 0,
    duration: DURATION.NORMAL,
    ease: EASE_PREMIUM,
  },
  springPop: {
    scale: 0.8,
    opacity: 0,
    duration: DURATION.NORMAL,
    ease: EASE_SPRING,
  },
};

/**
 * Helper to register GSAP defaults
 */
export const initGSAP = () => {
  gsap.defaults({
    duration: DURATION.NORMAL,
    ease: "power2.out",
  });
};
