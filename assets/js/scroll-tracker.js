document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initScrollTracker();
  initWaveCardsPinScroll();
});

/**
 * Premium Lenis Smooth Scroll Integration with GSAP ScrollTrigger
 */
function initSmoothScroll() {
  if (typeof Lenis === "undefined") {
    console.warn("Lenis library is loading...");
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function initScrollTracker() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP plugins loading for Scroll Tracker...");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const trackerContainer = document.querySelector(".tracker-container");
  const trackerSurfboard = document.getElementById("tracker-surfboard");
  const trackLine = document.getElementById("tracker-line");
  const waypoints = document.querySelectorAll(".waypoint-dot");
  const techSection = document.getElementById("technology");

  if (!trackerContainer || !trackerSurfboard || !trackLine || !techSection) return;

  // 1. Post-Video Visibility Control
  const checkVisibility = () => {
    const techRect = techSection.getBoundingClientRect();
    // Only show if user has scrolled to Section 2 (#technology)
    if (techRect.top <= window.innerHeight * 0.8) {
      trackerContainer.classList.add("tracker-visible");
    } else {
      trackerContainer.classList.remove("tracker-visible");
    }
  };

  checkVisibility();
  window.addEventListener("scroll", checkVisibility, { passive: true });

  ScrollTrigger.create({
    trigger: techSection,
    start: "top 80%",
    onEnter: () => trackerContainer.classList.add("tracker-visible"),
    onLeaveBack: () => trackerContainer.classList.remove("tracker-visible")
  });

  // Calculate track travel height for rescaled surfboard
  const trackHeight = trackLine.offsetHeight - 44;

  // 2. Smooth Vertical Surfboard Motion (Starts at Section 2 through page end)
  gsap.to(trackerSurfboard, {
    y: trackHeight,
    ease: "none",
    scrollTrigger: {
      trigger: techSection,
      start: "top 70%",
      endTrigger: "body",
      end: "bottom bottom",
      scrub: 1.0,
      invalidateOnRefresh: true
    }
  });

  // 3. Active Section Waypoint Highlighting
  waypoints.forEach((dot) => {
    const targetId = dot.getAttribute("data-target");
    if (!targetId) return;

    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    ScrollTrigger.create({
      trigger: targetSection,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => activateDot(dot),
      onEnterBack: () => activateDot(dot)
    });

    // 4. Smooth Click-to-Scroll
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  function activateDot(activeDot) {
    waypoints.forEach(dot => {
      dot.classList.remove("active-waypoint", "w-3.5", "h-3.5", "bg-[#00C8A0]", "ring-4", "ring-[#00C8A0]/25", "shadow-md");
      dot.classList.add("w-2.5", "h-2.5", "bg-slate-300");
    });

    activeDot.classList.remove("w-2.5", "h-2.5", "bg-slate-300");
    activeDot.classList.add("active-waypoint", "w-3.5", "h-3.5", "bg-[#00C8A0]", "ring-4", "ring-[#00C8A0]/25", "shadow-md");
  }
}

/**
 * Pinned Scroll Horizontal Movement & Active Card Auto Progression Layer (GSAP ScrollTrigger)
 */
function initWaveCardsPinScroll() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const container = document.getElementById("wave-cards-container");
  const section = document.getElementById("find-your-wave");
  if (!container || !section) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsHover = window.matchMedia("(hover: hover)").matches;

  // GSAP matchMedia for bulletproof responsive control
  const mm = gsap.matchMedia();

  // Desktop Viewports (1024px and up): Pinned scroll + Auto progression + Hover focus
  mm.add("(min-width: 1024px)", () => {
    if (prefersReducedMotion) {
      container.classList.remove("overflow-x-hidden", "w-max");
      container.classList.add("overflow-x-auto", "snap-x-mandatory", "w-full");
      return;
    }

    container.classList.remove("overflow-x-auto", "snap-x-mandatory", "w-full");
    container.classList.add("overflow-x-hidden", "w-max");

    const cards = gsap.utils.toArray(".tier-card");
    const parentWrapper = container.parentElement;
    if (parentWrapper) {
      parentWrapper.style.overflowX = "hidden";
    }

    // 1. Horizontal Scroll Scrubbing (The SOLE owner of container x!)
    const getScrollAmount = () => {
      return container.scrollWidth - parentWrapper.offsetWidth;
    };

    const scrollTween = gsap.to(container, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true,
      }
    });

    // 2. Auto-Progression Movement Variables
    let activeCardIndex = 0;
    let autoTimer = null;
    let isHoveringCard = false;
    let isUserScrolling = false;
    let isAutoplaying = false;
    let scrollPauseTimeout = null;
    const scrollPos = { y: 0 };

    const cardNames = ["Beginner", "Novice", "Progressive", "Intermediate", "Expert"];

    // Apply visual highlight & elevation to cards (scale, y, opacity, zIndex)
    const applyCardStates = (focusIdx, isHover = false, hoveredCardEl = null) => {
      cards.forEach((card, idx) => {
        if (isHover) {
          if (card === hoveredCardEl) {
            gsap.to(card, {
              scale: 1.05,
              y: -8,
              opacity: 1,
              zIndex: 20,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(card, {
              scale: 0.96,
              y: 0,
              opacity: 0.70,
              zIndex: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        } else {
          if (idx === focusIdx) {
            gsap.to(card, {
              scale: 1.05,
              y: -8,
              opacity: 1,
              zIndex: 20,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(card, {
              scale: 0.96,
              y: 0,
              opacity: 0.70,
              zIndex: 1,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        }
      });

      // Update right-side progress tracker tooltip
      const dot3 = document.querySelector('.waypoint-dot[data-target="#find-your-wave"]');
      if (dot3) {
        const tooltip = dot3.querySelector('.waypoint-tooltip');
        if (tooltip) {
          tooltip.textContent = `03. Wave: ${cardNames[focusIdx]}`;
        }
      }
    };

    // 4-Second Automatic Sequence Stepper: Beginner -> Novice -> Progressive -> Intermediate -> Expert -> Beginner
    const stepAutoProgression = () => {
      if (isHoveringCard || isUserScrolling) return;

      activeCardIndex = (activeCardIndex + 1) % cards.length;

      // Animate the window scroll position to shift the track (ScrollTrigger handles the X translation)
      const startScroll = scrollTween.scrollTrigger.start;
      const totalScroll = getScrollAmount();
      const targetScroll = startScroll + (totalScroll * (activeCardIndex / (cards.length - 1)));

      isAutoplaying = true;
      scrollPos.y = window.scrollY;
      gsap.killTweensOf(scrollPos);
      gsap.to(scrollPos, {
        y: targetScroll,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          window.scrollTo(0, scrollPos.y);
        },
        onComplete: () => {
          isAutoplaying = false;
        },
        overwrite: "auto"
      });

      // Highlight the active card visually
      applyCardStates(activeCardIndex, false);
    };

    const startAutoProgression = () => {
      stopAutoProgression();
      applyCardStates(activeCardIndex, false);
      autoTimer = setInterval(stepAutoProgression, 4000);
    };

    const stopAutoProgression = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    // 3. Section Activation via ScrollTrigger
    const sectionTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => startAutoProgression(),
      onLeave: () => stopAutoProgression(),
      onEnterBack: () => startAutoProgression(),
      onLeaveBack: () => stopAutoProgression()
    });

    // 4. Scroll priority detector
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollAmount()}`,
      scrub: true,
      onUpdate: (self) => {
        if (isAutoplaying) return;

        const progress = self.progress;
        const currentIdx = Math.min(cards.length - 1, Math.floor(progress * cards.length));

        if (!isHoveringCard) {
          if (currentIdx !== activeCardIndex) {
            activeCardIndex = currentIdx;
            applyCardStates(activeCardIndex, false);
          }
        }
      }
    });

    // Input listeners to detect manual scroll interactions and prioritize them over programmatic tweens
    const handleUserInteraction = () => {
      if (isAutoplaying) {
        gsap.killTweensOf(scrollPos);
        isAutoplaying = false;
      }
      isUserScrolling = true;
      stopAutoProgression();

      clearTimeout(scrollPauseTimeout);
      scrollPauseTimeout = setTimeout(() => {
        isUserScrolling = false;
        if (sectionTrigger.isActive && !isHoveringCard) {
          startAutoProgression();
        }
      }, 1500); // Resume autoplay 1.5s after scrolling stops
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });

    // 5. Hover Behavior Event Listeners (Desktop devices with hover capabilities)
    if (supportsHover) {
      cards.forEach((card, idx) => {
        const onMouseEnter = () => {
          isHoveringCard = true;
          stopAutoProgression();
          if (isAutoplaying) {
            gsap.killTweensOf(scrollPos);
            isAutoplaying = false;
          }
          activeCardIndex = idx;
          applyCardStates(idx, true, card);
        };

        const onMouseLeave = () => {
          applyCardStates(activeCardIndex, false);
          clearTimeout(scrollPauseTimeout);
          scrollPauseTimeout = setTimeout(() => {
            isHoveringCard = false;
            if (sectionTrigger.isActive && !isUserScrolling && !isHoveringCard) {
              startAutoProgression();
            }
          }, 1000); // Resume autoplay 1.0s after hover leave
        };

        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);

        card._onMouseEnter = onMouseEnter;
        card._onMouseLeave = onMouseLeave;
      });
    }

    return () => {
      stopAutoProgression();
      clearTimeout(scrollPauseTimeout);
      gsap.killTweensOf(scrollPos);
      if (sectionTrigger) sectionTrigger.kill();

      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);

      cards.forEach((card) => {
        if (card._onMouseEnter) card.removeEventListener("mouseenter", card._onMouseEnter);
        if (card._onMouseLeave) card.removeEventListener("mouseleave", card._onMouseLeave);
        gsap.killTweensOf(card);
      });

      gsap.killTweensOf(container);
      if (parentWrapper) {
        parentWrapper.style.overflowX = "";
      }
    };
  });

  // Tablet & Mobile Viewports (under 1024px): Natural swipe carousel
  mm.add("(max-width: 1023px)", () => {
    container.classList.remove("overflow-x-hidden", "w-max");
    container.classList.add("overflow-x-auto", "snap-x-mandatory", "w-full");

    const cards = gsap.utils.toArray(".tier-card");
    cards.forEach((card) => {
      gsap.set(card, { clearProps: "all" });
    });
  });
}
