/* ==========================================================================
   Bahrain Surf Park - Rebuilt Minimal Wave Motion Divider & Scroll Triggers
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileMenu();
  initWaveMotion();
  initHeroAnimations();
  initTechAnimations();
  initTierCardAnimations();
});

/**
 * Dynamic Navbar Scroll Listener
 */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.remove("nav-transparent", "bg-transparent", "text-white", "py-5");
      navbar.classList.add("nav-scrolled", "bg-white/95", "text-[#0A1926]", "shadow-sm", "py-3", "md:py-3.5", "backdrop-blur-md", "border-b", "border-slate-100");
    } else {
      navbar.classList.remove("nav-scrolled", "bg-white/95", "text-[#0A1926]", "shadow-sm", "py-3", "md:py-3.5", "backdrop-blur-md", "border-b", "border-slate-100");
      navbar.classList.add("nav-transparent", "bg-transparent", "text-white", "py-5");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
}

/**
 * Mobile Navigation Menu Handler
 */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isHidden = menu.classList.contains("hidden");
    if (isHidden) {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
    } else {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
    }
  });

  const links = menu.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
    });
  });
}

/**
 * GSAP ScrollTrigger + MotionPath Plugin
 * Rebuilt Minimal Surfboard Silhouette Motion (No Human Rider)
 */
function initWaveMotion() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof MotionPathPlugin === "undefined") {
    console.warn("GSAP plugins loading...");
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const waveSection = document.getElementById("wave-divider-section");
  const wavePath = document.getElementById("wave-path");
  const surferBoy = document.getElementById("surfer-boy");

  if (!waveSection || !wavePath || !surferBoy) return;

  if (prefersReducedMotion) {
    // Static placement resting on wave crest for prefers-reduced-motion
    gsap.set(surferBoy, {
      x: 960,
      y: 45
    });
    return;
  }

  gsap.to(surferBoy, {
    scrollTrigger: {
      trigger: waveSection,
      start: "top 85%",
      end: "bottom top",
      scrub: 1.2,
      invalidateOnRefresh: true
    },
    motionPath: {
      path: wavePath,
      align: wavePath,
      autoRotate: true,
      alignOrigin: [0.5, 0.5],
      start: 0,
      end: 1
    },
    ease: "none"
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}

/**
 * Luxury Hero Entrance & Subtle Video Lifecycle Animation
 */
function initHeroAnimations() {
  if (typeof gsap === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Subtle, imperceptible cinematic Ken Burns video scale
  const heroVideo = document.getElementById("hero-video");
  if (heroVideo && !prefersReducedMotion) {
    gsap.fromTo(heroVideo, 
      { scale: 1.00 }, 
      { 
        scale: 1.035, 
        duration: 12, 
        ease: "sine.inOut", 
        repeat: -1, 
        yoyo: true 
      }
    );
  }

  // 2. Elegant Staggered Editorial Reveal
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(".hero-eyebrow", 
    { opacity: 0, y: -12, scale: 0.96 }, 
    { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.15 }
  )
  .fromTo(".hero-headline", 
    { opacity: 0, y: 25 }, 
    { opacity: 1, y: 0, duration: 1.0 }, 
    "-=0.5"
  )
  .fromTo(".hero-subtitle", 
    { opacity: 0, y: 16 }, 
    { opacity: 1, y: 0, duration: 0.85 }, 
    "-=0.6"
  )
  .fromTo(".hero-buttons", 
    { opacity: 0, y: 16 }, 
    { opacity: 1, y: 0, duration: 0.8 }, 
    "-=0.6"
  );
}

/**
 * Section 2: Tech Showcase Scroll Animations
 */
function initTechAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const section = document.getElementById("technology");
  if (!section) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
    }
  });

  tl.fromTo(".tech-left-col", 
    { opacity: 0, x: -35 }, 
    { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
  )
  .fromTo(".tech-right-col", 
    { opacity: 0, x: 35, scale: 0.96 }, 
    { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" }, 
    "-=0.6"
  );
}

/**
 * Section 3: Tier Cards Stagger Animation on Scroll
 */
function initTierCardAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const section = document.getElementById("find-your-wave");
  if (!section) return;

  gsap.fromTo(".tier-card", 
    { opacity: 0, y: 40 }, 
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
      }
    }
  );
}
