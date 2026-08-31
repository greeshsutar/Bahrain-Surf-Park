import gsap from "gsap";

/**
 * Canonical Motion System Constants for Bahrain Surf Park
 * Unified motion values for entrance reveals, micro-interactions, and staggering.
 */
export const MOTION = {
  // Entrance & reveal animations
  ENTRANCE_EASE: "power3.out",
  ENTRANCE_DURATION: 0.9,
  STAGGER: 0.08,

  // Hover & micro-interactions
  HOVER_EASE: "power2.out",
  HOVER_DURATION: 0.3,
  HOVER_SCALE: 1.04,
  HOVER_Y: -2,

  // Magnetic CTA settings
  MAGNETIC_MAX_OFFSET: 8,
  MAGNETIC_FACTOR: 0.2,
};

/**
 * Check if the user prefers reduced motion.
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Magnetic button mousemove event handler.
 * Offsets button towards cursor up to MAGNETIC_MAX_OFFSET pixels.
 */
export const handleMagneticMouseMove = (
  e: React.MouseEvent<HTMLElement>,
  maxOffset: number = MOTION.MAGNETIC_MAX_OFFSET
) => {
  if (isReducedMotion()) return;

  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = (e.clientX - centerX) * MOTION.MAGNETIC_FACTOR;
  const deltaY = (e.clientY - centerY) * MOTION.MAGNETIC_FACTOR;

  // Clamp within [-maxOffset, maxOffset]
  const moveX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
  const moveY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

  gsap.to(target, {
    x: moveX,
    y: moveY,
    scale: MOTION.HOVER_SCALE,
    duration: MOTION.HOVER_DURATION,
    ease: MOTION.HOVER_EASE,
    overwrite: "auto",
  });
};

/**
 * Magnetic button mouseleave event handler.
 * Springs button back to original position.
 */
export const handleMagneticMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
  const target = e.currentTarget;
  gsap.to(target, {
    x: 0,
    y: 0,
    scale: 1,
    duration: MOTION.HOVER_DURATION,
    ease: MOTION.HOVER_EASE,
    overwrite: "auto",
  });
};
