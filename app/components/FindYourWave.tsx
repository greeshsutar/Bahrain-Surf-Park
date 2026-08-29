"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FindYourWaveProps {
  onOpenBooking: (tier?: string) => void;
}

const CARDS_DATA = [
  {
    level: "01",
    tier: "Tier 01",
    title: "BEGINNER",
    subtitle: "BEGINNER",
    desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment.",
    img: "/images/tier1.jpg",
    height: "0.5–0.8m",
    ride: "120m",
    board: "Soft-top",
  },
  {
    level: "02",
    tier: "Tier 02",
    title: "NOVICE",
    subtitle: "NOVICE",
    desc: "Designed for riders who can pop up and are ready to learn board control on soft open-face waves.",
    img: "/images/tier2.jpg",
    height: "0.8–1.2m",
    ride: "140m",
    board: "Funboard",
  },
  {
    level: "03",
    tier: "Tier 03",
    title: "PROGRESSIVE",
    subtitle: "PROGRESSIVE",
    desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns.",
    img: "/images/tier3.jpg",
    height: "1.2–1.5m",
    ride: "160m",
    board: "Fish / Longboard",
  },
  {
    level: "04",
    tier: "Tier 04",
    title: "INTERMEDIATE",
    subtitle: "INTERMEDIATE",
    desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks.",
    img: "/images/tier4.jpg",
    height: "1.5–1.8m",
    ride: "180m",
    board: "Shortboard",
  },
  {
    level: "05",
    tier: "Tier 05",
    title: "EXPERT",
    subtitle: "EXPERT",
    desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels.",
    img: "/images/tier5.jpg",
    height: "1.8–2.2m",
    ride: "200m",
    board: "Step-Up",
  },
];

export default function FindYourWave({ onOpenBooking }: FindYourWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsHover = window.matchMedia("(hover: hover)").matches;

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

      const cards = gsap.utils.toArray<HTMLElement>(".tier-card");
      const parentWrapper = container.parentElement;
      if (parentWrapper) {
        parentWrapper.style.overflowX = "hidden";
      }

      const getScrollAmount = () => {
        return container.scrollWidth - (parentWrapper ? parentWrapper.offsetWidth : window.innerWidth);
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
        },
      });

      let activeCardIndex = 0;
      let autoTimer: NodeJS.Timeout | null = null;
      let isHoveringCard = false;
      let isUserScrolling = false;
      let isAutoplaying = false;
      let scrollPauseTimeout: NodeJS.Timeout | null = null;
      const scrollPos = { y: 0 };

      const cardNames = ["Beginner", "Novice", "Progressive", "Intermediate", "Expert"];

      const applyCardStates = (focusIdx: number, isHover = false, hoveredCardEl: HTMLElement | null = null) => {
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
                overwrite: "auto",
              });
            } else {
              gsap.to(card, {
                scale: 0.97,
                y: 0,
                opacity: 0.74,
                zIndex: 1,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
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
                overwrite: "auto",
              });
            } else {
              gsap.to(card, {
                scale: 0.97,
                y: 0,
                opacity: 0.76,
                zIndex: 1,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          }
        });

        const dot3 = document.querySelector('.waypoint-dot[data-target="#find-your-wave"]');
        if (dot3) {
          const tooltip = dot3.querySelector(".waypoint-tooltip");
          if (tooltip) {
            tooltip.textContent = `03. Wave: ${cardNames[focusIdx]}`;
          }
        }
      };

      const stepAutoProgression = () => {
        if (isHoveringCard || isUserScrolling) return;

        activeCardIndex = (activeCardIndex + 1) % cards.length;

        const startScroll = scrollTween.scrollTrigger?.start || 0;
        const totalScroll = getScrollAmount();
        const targetScroll = startScroll + totalScroll * (activeCardIndex / (cards.length - 1));

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
          overwrite: "auto",
        });

        applyCardStates(activeCardIndex, false);
      };

      const stopAutoProgression = () => {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      };

      const startAutoProgression = () => {
        stopAutoProgression();
        applyCardStates(activeCardIndex, false);
        autoTimer = setInterval(stepAutoProgression, 4000);
      };

      const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => startAutoProgression(),
        onLeave: () => stopAutoProgression(),
        onEnterBack: () => startAutoProgression(),
        onLeaveBack: () => stopAutoProgression(),
      });

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
        },
      });

      const handleUserInteraction = () => {
        if (isAutoplaying) {
          gsap.killTweensOf(scrollPos);
          isAutoplaying = false;
        }
        isUserScrolling = true;
        stopAutoProgression();

        if (scrollPauseTimeout) clearTimeout(scrollPauseTimeout);
        scrollPauseTimeout = setTimeout(() => {
          isUserScrolling = false;
          if (sectionTrigger.isActive && !isHoveringCard) {
            startAutoProgression();
          }
        }, 1500);
      };

      window.addEventListener("wheel", handleUserInteraction, { passive: true });
      window.addEventListener("touchmove", handleUserInteraction, { passive: true });
      window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
      window.addEventListener("keydown", handleUserInteraction, { passive: true });

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
            if (scrollPauseTimeout) clearTimeout(scrollPauseTimeout);
            scrollPauseTimeout = setTimeout(() => {
              isHoveringCard = false;
              if (sectionTrigger.isActive && !isUserScrolling && !isHoveringCard) {
                startAutoProgression();
              }
            }, 1000);
          };

          card.addEventListener("mouseenter", onMouseEnter);
          card.addEventListener("mouseleave", onMouseLeave);

          (card as any)._onMouseEnter = onMouseEnter;
          (card as any)._onMouseLeave = onMouseLeave;
        });
      }

      return () => {
        stopAutoProgression();
        if (scrollPauseTimeout) clearTimeout(scrollPauseTimeout);
        gsap.killTweensOf(scrollPos);
        if (sectionTrigger) sectionTrigger.kill();

        window.removeEventListener("wheel", handleUserInteraction);
        window.removeEventListener("touchmove", handleUserInteraction);
        window.removeEventListener("pointerdown", handleUserInteraction);
        window.removeEventListener("keydown", handleUserInteraction);

        cards.forEach((card) => {
          if ((card as any)._onMouseEnter) card.removeEventListener("mouseenter", (card as any)._onMouseEnter);
          if ((card as any)._onMouseLeave) card.removeEventListener("mouseleave", (card as any)._onMouseLeave);
          gsap.killTweensOf(card);
        });

        gsap.killTweensOf(container);
        if (parentWrapper) {
          parentWrapper.style.overflowX = "";
        }
      };
    });

    // Mobile Viewports (under 1024px)
    mm.add("(max-width: 1023px)", () => {
      container.classList.remove("overflow-x-hidden", "w-max");
      container.classList.add("overflow-x-auto", "snap-x-mandatory", "w-full");

      const cards = gsap.utils.toArray<HTMLElement>(".tier-card");
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "all" });
      });
    });

    // Tier Card Stagger Entrance
    gsap.fromTo(
      ".tier-card",
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
        },
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  const handleMouseEnterCard = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -8, scale: 1.015, duration: 0.4, ease: "back.out(1.4)", overwrite: "auto" });
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section ref={sectionRef} id="find-your-wave" className="relative pt-4 sm:pt-6 pb-16 sm:pb-24 overflow-hidden z-10 bg-white">
      {/* Section Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <div className="text-left max-w-3xl">
          <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.2em] uppercase mb-2.5 block">
            FIND YOUR WAVE
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1926] tracking-tight mb-3.5">
            One Place.<br />Many Ways.
          </h2>

          <p className="text-[#0A1926]/70 text-sm sm:text-base leading-relaxed font-sans">
            Engineered by Wavegarden Cove technology, choose from 5 tailored wave progression profiles designed for total beginners to elite barrel riders.
          </p>
        </div>
      </div>

      {/* Outer Wrapper */}
      <div className="w-full overflow-x-auto no-scrollbar relative z-10">
        {/* Inner Track Container */}
        <div
          id="wave-cards-container"
          ref={containerRef}
          className="flex flex-row flex-nowrap gap-6 sm:gap-8 no-scrollbar px-6 sm:px-12 md:px-16 pb-8 w-max"
        >
          {CARDS_DATA.map((card) => (
            <div
              key={card.level}
              onMouseEnter={handleMouseEnterCard}
              onMouseLeave={handleMouseLeaveCard}
              className="tier-card w-[350px] sm:w-[380px] md:w-[395px] shrink-0 snap-start-card flex flex-col justify-start"
              data-level={card.level}
            >
              {/* Top Hero Image with Editorial Overlay */}
              <div className="card-image-wrapper">
                <img src={card.img} alt={`${card.subtitle} Session`} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3.5 z-10 text-white flex flex-col text-left pointer-events-none">
                  <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#00C8A0] uppercase">
                    WAVE {card.level}
                  </span>
                  <span className="font-sans text-xs font-extrabold uppercase tracking-wider text-white">
                    {card.subtitle}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="text-left flex flex-col">
                <span className="text-xs uppercase font-extrabold tracking-[0.18em] text-[#0B7FB5] mb-0.5 block">
                  {card.tier}
                </span>
                <h3 className="font-serif text-[28px] sm:text-[30px] font-semibold text-[#0A1926] tracking-tight leading-[1.05] mb-2 uppercase">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-[1.55] mb-3.5 font-sans">{card.desc}</p>

                {/* Compact Technical Specification Row */}
                <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 mb-3 text-left">
                  <div>
                    <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                      HEIGHT
                    </span>
                    <span className="block text-xs font-bold text-[#0A1926] mt-0.5">{card.height}</span>
                  </div>
                  <div className="border-l border-slate-100 pl-2.5">
                    <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                      RIDE
                    </span>
                    <span className="block text-xs font-bold text-[#0A1926] mt-0.5">{card.ride}</span>
                  </div>
                  <div className="border-l border-slate-100 pl-2.5">
                    <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                      BOARD
                    </span>
                    <span className="block text-xs font-bold text-[#0A1926] mt-0.5 truncate">{card.board}</span>
                  </div>
                </div>

                {/* Price & Circular CTA Row */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">FROM</span>
                    <span className="text-xs font-bold text-[#0A1926] uppercase tracking-wider mt-0.5">
                      [CONTENT REQUIRED: PRICING CONFIG] BHD
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenBooking(card.title)}
                    data-tier={card.title}
                    className="w-9 h-9 bg-[#0B7FB5] hover:bg-[#0077B6] text-white rounded-full flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                    aria-label={`Book ${card.title} Session`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
