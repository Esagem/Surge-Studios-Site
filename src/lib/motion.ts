import type { Variants } from "framer-motion";

export const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const MOTION_DURATIONS = {
  fast: 0.24,
  base: 0.5,
  slow: 0.8,
} as const;

export const fadeUpIn = (delay = 0, distance = 20): Variants => ({
  hidden: { opacity: 0, y: distance, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: MOTION_DURATIONS.base,
      ease: MOTION_EASE,
    },
  },
});

export const sectionRevealVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: MOTION_DURATIONS.slow,
      ease: MOTION_EASE,
    },
  },
});

export const staggerContainerVariant = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const cardHoverVariant: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 6px 22px rgba(0, 0, 0, 0.14)",
    transition: { duration: MOTION_DURATIONS.fast, ease: MOTION_EASE },
  },
  hover: {
    y: -3,
    scale: 1,
    boxShadow: "0 14px 30px rgba(8, 21, 38, 0.28)",
    transition: { duration: 0.35, ease: MOTION_EASE },
  },
  tap: {
    y: -1,
    scale: 1,
    transition: { duration: 0.16 },
  },
};
