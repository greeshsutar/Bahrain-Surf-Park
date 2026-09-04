"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import WaveCard, { WaveLevelData } from "./WaveCard";
import { useLanguage } from "../../context/LanguageContext";
import { isReducedMotion } from "../../constants/motion";

const WAVE_LEVELS: WaveLevelData[] = [
  {
    id: "beginner",
    number: "01",
    badge: "WAVE 01",
    level: "BEGINNER",
    title: "BEGINNER",
    desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment. Our instructors are in the water with you the entire session, focused on confidence and safety.",
    height: "0.5 – 0.8m",
    ride: "120m",
    board: "Soft-top",
    img: "/images/tier1.jpg",
  },
  {
    id: "novice",
    number: "02",
    badge: "WAVE 02",
    level: "NOVICE",
    title: "NOVICE",
    desc: "Designed for riders who can pop up and are ready to learn board control on soft open-face waves. This is where board control and timing start to click.",
    height: "0.8 – 1.2m",
    ride: "140m",
    board: "Funboard",
    img: "/images/tier2.jpg",
  },
  {
    id: "progressive",
    number: "03",
    badge: "WAVE 03",
    level: "PROGRESSIVE",
    title: "PROGRESSIVE",
    desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns. Expect real feedback on your positioning as waves grow more dynamic.",
    height: "1.2 – 1.5m",
    ride: "160m",
    board: "Fish / Longboard",
    img: "/images/tier3.jpg",
  },
  {
    id: "intermediate",
    number: "04",
    badge: "WAVE 04",
    level: "INTERMEDIATE",
    title: "INTERMEDIATE",
    desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks. Built for surfers ready to link turns together with speed and control.",
    height: "1.5 – 1.8m",
    ride: "180m",
    board: "Shortboard",
    img: "/images/tier4.jpg",
  },
  {
    id: "expert",
    number: "05",
    badge: "WAVE 05",
    level: "ADVANCED",
    title: "EXPERT / ADVANCED",
    desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels. Our most technical, powerful setting — reserved for surfers who know their way around a barrel.",
    height: "1.8 – 2.2m",
    ride: "200m",
    board: "Step-Up",
    img: "/images/expertsurf.png",
  },
];

function getCardPositions(viewport: HTMLElement, track: HTMLElement) {
  const cards = Array.from(
    track.querySelectorAll<HTMLElement>("[data-wave-card]")
  );
  if (!cards.length) return null;

  const vw = viewport.clientWidth;
  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];

  const firstCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2;
  const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;

  const firstX = vw / 2 - firstCenter;
  const lastX = vw / 2 - lastCenter;
  const distance = firstX - lastX;

  return { firstX, lastX, distance };
}

export default function WaveSelector() {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const stRef = useRef<ScrollTrigger | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const reduced = isReducedMotion();

  // Mobile breakpoint
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Mobile positioning logic
  const updateMobilePosition = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-wave-card]")
    );
    if (!cards.length) return;

    const clampedIdx = Math.max(0, Math.min(cards.length - 1, index));
    const targetCard = cards[clampedIdx];
    if (!targetCard) return;

    const vw = viewport.clientWidth;
    const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
    const targetX = vw / 2 - cardCenter;

    gsap.to(track, {
      x: targetX,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    updateMobilePosition(activeIndex);
  }, [isMobile, activeIndex, updateMobilePosition]);

  useEffect(() => {
    if (!isMobile) return;
    const handleResize = () => {
      updateMobilePosition(activeIndexRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, updateMobilePosition]);

  // Main Desktop ScrollTrigger pin + horizontal scrub
  useEffect(() => {
    if (reduced || isMobile) return;
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const pos = getCardPositions(viewport, track);
      if (!pos) return;

      // Initial position for Card 01 centered
      gsap.set(track, { x: pos.firstX });

      const tween = gsap.fromTo(
        track,
        {
          x: () => getCardPositions(viewport, track)?.firstX ?? 0,
        },
        {
          x: () => getCardPositions(viewport, track)?.lastX ?? 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => {
              const p = getCardPositions(viewport, track);
              return `+=${p?.distance ?? 2000}`;
            },
            pin: viewport,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (WAVE_LEVELS.length - 1),
              duration: { min: 0.3, max: 0.6 },
              ease: "power2.inOut",
              inertia: false,
            },
            onUpdate: (self) => {
              const index = Math.round(
                self.progress * (WAVE_LEVELS.length - 1)
              );
              if (activeIndexRef.current !== index) {
                activeIndexRef.current = index;
                setActiveIndex(index);
              }
            },
          },
        }
      );

      stRef.current = tween.scrollTrigger ?? null;
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
      stRef.current = null;
    };
  }, [reduced, isMobile]);

  // Direct card navigation handler
  const navigateTo = useCallback(
    (targetIdx: number) => {
      const clampedIdx = Math.max(0, Math.min(WAVE_LEVELS.length - 1, targetIdx));

      if (isMobile) {
        activeIndexRef.current = clampedIdx;
        setActiveIndex(clampedIdx);
        updateMobilePosition(clampedIdx);
        return;
      }

      const st = stRef.current;
      if (!st) return;

      const targetProgress = clampedIdx / (WAVE_LEVELS.length - 1);
      const targetScrollY = st.start + targetProgress * (st.end - st.start);

      gsap.to(window, {
        scrollTo: { y: targetScrollY, autoKill: false },
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    },
    [isMobile, updateMobilePosition]
  );

  const handlePrev = () => navigateTo(activeIndexRef.current - 1);
  const handleNext = () => navigateTo(activeIndexRef.current + 1);
  const handleSelectCard = (index: number) => navigateTo(index);

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMobile || touchStartX.current === null || touchEndX.current === null)
      return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 35;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Reduced motion fallback
  if (reduced) {
    return (
      <section
        id="find-your-wave-selector"
        className="bg-[#061F2B] text-white py-14 sm:py-20 relative z-10 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left mb-8">
          <span className={`text-[#00C8A0] text-xs font-extrabold mb-3 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.25em] uppercase"}`}>
            {isRtl ? "محدد الأمواج المتميز" : "SIGNATURE WAVE SELECTOR"}
          </span>
          <h2 className={`font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] mb-4 ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
            {isRtl ? "اطلب موجتك." : "FIND YOUR WAVE."}
          </h2>
          <p className="text-white/80 text-base sm:text-xl font-serif italic max-w-2xl">
            {isRtl ? "مكان واحد. لكل مستوى من مستويات التطور." : "ONE PLACE. EVERY LEVEL OF PROGRESSION."}
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-xl mx-auto px-4">
          {WAVE_LEVELS.map((card, idx) => (
            <WaveCard
              key={card.id}
              card={card}
              isActive={idx === activeIndex}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="find-your-wave-selector"
      className="relative bg-[#061F2B] text-white selection:bg-[#00C8A0] selection:text-[#061F2B] border-b border-white/10"
      style={{ overflow: "hidden" }}
    >
      {/* ── Pinned viewport — GSAP pins this element on desktop ──────────────── */}
      <div
        ref={viewportRef}
        className="relative w-full flex flex-col justify-between overflow-hidden min-h-screen lg:h-screen pt-16 sm:pt-20 lg:pt-20 pb-3 sm:pb-4"
      >
        {/* Background Atmosphere Layers & Contour Lines */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#00C8A0]/[0.07] rounded-full blur-3xl pointer-events-none z-0"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-10 z-0"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            fill="none"
            stroke="#00C8A0"
            strokeWidth="1"
          >
            <path d="M-100,150 C300,100 600,300 1000,200 C1300,150 1500,350 1700,280" />
            <path d="M-100,350 C300,300 600,500 1000,400 C1300,350 1500,550 1700,480" />
          </svg>
        </div>

        {/* ── STATIC HEADING (Fixed inside pinned viewport) ─────────────────── */}
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10 text-left shrink-0">
          <span className={`text-[#00C8A0] text-[10px] sm:text-xs font-extrabold mb-0.5 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.25em] uppercase"}`}>
            {isRtl ? "محدد الأمواج المتميز" : "SIGNATURE WAVE SELECTOR"}
          </span>
          <h2 className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-0.5 ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
            {isRtl ? "اطلب موجتك." : "FIND YOUR WAVE."}
          </h2>
          <p className="text-white/80 text-xs sm:text-sm lg:text-base font-serif italic max-w-2xl">
            {isRtl ? "مكان واحد. لكل مستوى من مستويات التطور." : "ONE PLACE. EVERY LEVEL OF PROGRESSION."}
          </p>
        </div>

        {/* ── CARD TRACK VIEWPORT ──────────────────────────────────────────── */}
        <div className="relative flex-1 w-full overflow-hidden z-10 flex items-center min-h-0 py-2 sm:py-3">
          {/* GSAP-controlled card track — horizontal translation driven by vertical scroll */}
          <div
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="carousel-track flex items-center gap-4 sm:gap-6 py-2 h-full items-center will-change-transform"
            style={{
              ...(isMobile ? { paddingLeft: "8vw", paddingRight: "8vw" } : {}),
            }}
          >
            {WAVE_LEVELS.map((card, idx) => (
              <WaveCard
                key={card.id}
                card={card}
                isActive={idx === activeIndex}
                onClick={() => handleSelectCard(idx)}
              />
            ))}
          </div>
        </div>

        {/* ── PAGINATION & CONTROLS FOOTER (Fixed in Pinned Viewport) ──────── */}
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 flex items-center justify-between relative z-10 shrink-0 pt-1">
          {/* Level Indicators */}
          <div className="flex items-center gap-2">
            {WAVE_LEVELS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectCard(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-8 bg-[#00C8A0]" : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to ${item.title}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous Wave Level"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === WAVE_LEVELS.length - 1}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next Wave Level"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
