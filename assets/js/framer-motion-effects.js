/* ==========================================================================
   Bahrain Surf Park - Framer Motion (Motion One Physics) Integration
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initFramerMotionEffects();
});

function initFramerMotionEffects() {
  const motionLib = window.Motion || window.motion;
  
  if (!motionLib && typeof gsap === "undefined") {
    console.warn("Framer Motion / Motion One library initializing...");
    return;
  }

  const animate = motionLib ? motionLib.animate : (elem, props, opts) => {
    if (typeof gsap !== "undefined") {
      gsap.to(elem, { ...props, duration: opts?.duration || 0.4, ease: opts?.easing || "power2.out" });
    }
  };

  const spring = motionLib ? motionLib.spring : (opts) => "back.out(1.4)";

  // 1. Framer Motion Spring Physics for Tier Cards
  const cards = document.querySelectorAll(".tier-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      animate(card, 
        { transform: "translateY(-8px) scale(1.015)" }, 
        { duration: 0.4, easing: spring({ stiffness: 300, damping: 20 }) }
      );
    });

    card.addEventListener("mouseleave", () => {
      animate(card, 
        { transform: "translateY(0px) scale(1)" }, 
        { duration: 0.35, easing: "ease-out" }
      );
    });
  });

  // 2. Framer Motion Spring Physics for Rectangular Action Buttons (Max 8px Radius)
  const buttons = document.querySelectorAll("a.bg-\\[\\#0B7FB5\\], a.bg-\\[\\#00C8A0\\], button");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      animate(btn, 
        { transform: "scale(1.04) translateY(-2px)" }, 
        { duration: 0.3, easing: spring({ stiffness: 400, damping: 15 }) }
      );
    });

    btn.addEventListener("mouseleave", () => {
      animate(btn, 
        { transform: "scale(1) translateY(0px)" }, 
        { duration: 0.25, easing: "ease-out" }
      );
    });
  });

  // 3. Framer Motion Side Tracker Dots Physics
  const dots = document.querySelectorAll(".waypoint-dot");
  dots.forEach((dot) => {
    dot.addEventListener("mouseenter", () => {
      animate(dot, 
        { scale: 1.35 }, 
        { duration: 0.3, easing: spring({ stiffness: 500, damping: 18 }) }
      );
    });

    dot.addEventListener("mouseleave", () => {
      animate(dot, 
        { scale: 1 }, 
        { duration: 0.25, easing: "ease-out" }
      );
    });
  });
}
