"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  MOTION,
  isReducedMotion,
  handleMagneticMouseMove,
  handleMagneticMouseLeave,
} from "../constants/motion";
import { useLanguage } from "../context/LanguageContext";

interface FindYourWaveProps {
  onOpenBooking: (tier?: string) => void;
}

const CARDS_DATA = [
  {
    id: "01",
    waveBadge: "WAVE 01",
    level: "BEGINNER",
    tierLabel: "TIER 01",
    title: "BEGINNER",
    desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment. Our instructors are in the water with you the entire session.",
    img: "/images/tier1.jpg",
    height: "0.5 – 0.8m",
    ride: "120m",
    board: "Soft-top",
    price: "FROM 25 BHD",
  },
  {
    id: "02",
    waveBadge: "WAVE 02",
    level: "NOVICE",
    tierLabel: "TIER 02",
    title: "NOVICE",
    desc: "Designed for riders who can pop up and are ready to learn board control on soft open-face waves. This is where board control and timing start to click.",
    img: "/images/tier2.jpg",
    height: "0.8 – 1.2m",
    ride: "140m",
    board: "Funboard",
    price: "FROM 35 BHD",
  },
  {
    id: "03",
    waveBadge: "WAVE 03",
    level: "PROGRESSIVE",
    tierLabel: "TIER 03",
    title: "PROGRESSIVE",
    desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns. Expect real feedback on your positioning as waves grow more dynamic.",
    img: "/images/tier3.jpg",
    height: "1.2 – 1.5m",
    ride: "160m",
    board: "Fish / Longboard",
    price: "FROM 45 BHD",
  },
  {
    id: "04",
    waveBadge: "WAVE 04",
    level: "INTERMEDIATE",
    tierLabel: "TIER 04",
    title: "INTERMEDIATE",
    desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks. Built for surfers ready to link turns together with speed and control.",
    img: "/images/tier4.jpg",
    height: "1.5 – 1.8m",
    ride: "180m",
    board: "Shortboard",
    price: "FROM 55 BHD",
  },
  {
    id: "05",
    waveBadge: "WAVE 05",
    level: "EXPERT",
    tierLabel: "TIER 05",
    title: "EXPERT",
    desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels. Reserved for surfers who know their way around a barrel.",
    img: "/images/bahrain_surf_park_clean.jpg",
    height: "1.8 – 2.2m",
    ride: "200m",
    board: "Step-Up",
    price: "FROM 65 BHD",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Measurement helper — calculates exact card positions using layout offsetLeft
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function FindYourWave({ onOpenBooking }: FindYourWaveProps) {
  const { lang, t } = useLanguage();
  const isRtl = lang === "ar";
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Live ScrollTrigger instance for arrow navigation on desktop
  const stRef = useRef<ScrollTrigger | null>(null);

  // Mobile breakpoint
  const [isMobile, setIsMobile] = useState(false);

  // Touch tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Reduced motion check
  const reduced = isReducedMotion();

  // ── Track mobile breakpoint ──────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // ── Mobile track positioning logic ───────────────────────────────────────
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

  // ── Keep mobile card track centered when activeIndex or isMobile changes ──
  useEffect(() => {
    if (!isMobile) return;
    updateMobilePosition(activeIndex);
  }, [isMobile, activeIndex, updateMobilePosition]);

  // Handle window resize on mobile to re-center active card
  useEffect(() => {
    if (!isMobile) return;
    const handleResize = () => {
      updateMobilePosition(activeIndexRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, updateMobilePosition]);

  // ── Main ScrollTrigger pin + horizontal scrub (DESKTOP ONLY) ─────────────
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

      // Position track at Card 01 initially
      gsap.set(track, { x: pos.firstX });

      // Create single ScrollTrigger pinned horizontal tween
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
              snapTo: 1 / (CARDS_DATA.length - 1),
              duration: { min: 0.3, max: 0.6 },
              ease: "power2.inOut",
              inertia: false,
            },
            onUpdate: (self) => {
              const index = Math.round(
                self.progress * (CARDS_DATA.length - 1)
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

    // Refresh ScrollTrigger after a tick to ensure images & layout fonts are loaded
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
      stRef.current = null;
    };
  }, [reduced, isMobile]);

  // ── Card navigation (desktop via ScrollToPlugin, mobile via GSAP track tween) ──
  const navigateTo = useCallback(
    (targetIdx: number) => {
      const clampedIdx = Math.max(0, Math.min(CARDS_DATA.length - 1, targetIdx));

      if (isMobile) {
        activeIndexRef.current = clampedIdx;
        setActiveIndex(clampedIdx);
        updateMobilePosition(clampedIdx);
        return;
      }

      const st = stRef.current;
      if (!st) return;

      const targetProgress = clampedIdx / (CARDS_DATA.length - 1);
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

  // ── Touch / Swipe handlers for mobile ───────────────────────────────────
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
    const minSwipeDistance = 35; // px threshold

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

  // ── REDUCED MOTION fallback: simple stacked layout, no pin ──────────────
  if (reduced) {
    return (
      <section
        id="find-your-wave"
        className="relative py-16 bg-[#061C27] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-4xl font-semibold text-white mb-10">
            Find Your Wave
          </h2>
          <div className="flex flex-col gap-8">
            {CARDS_DATA.map((card) => (
              <div
                key={card.id}
                className="bg-[#F6F4EE] rounded-2xl p-6 text-[#0A1926]"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.desc}
                </p>
                <button
                  onClick={() => onOpenBooking(card.title)}
                  className="mt-4 px-6 py-3 bg-[#074754] text-white rounded-xl text-sm font-bold cursor-pointer"
                >
                  Book {card.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── MAIN RENDER ─────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="find-your-wave"
      className="relative bg-[#061C27] text-white selection:bg-[#00C8A0] selection:text-[#061C27]"
      style={{ overflow: "visible" }}
    >
      {/* ── Pinned viewport — GSAP pins this element on desktop ──────────────── */}
      <div
        ref={viewportRef}
        className="relative w-full flex flex-col justify-between overflow-hidden h-[100dvh]"
      >
        {/* Background glows & contour lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(11,127,181,0.25)_0%,rgba(0,200,160,0.08)_40%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[75%] pointer-events-none z-0 opacity-20 overflow-hidden"
        >
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M-100 120 C 300 280, 700 40, 1100 180 C 1300 240, 1500 160, 1600 200"
              stroke="#00C8A0"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d="M-100 220 C 250 380, 650 120, 1050 290 C 1280 340, 1480 260, 1600 310"
              stroke="#0B7FB5"
              strokeWidth="1"
            />
            <path
              d="M-100 350 C 350 480, 800 220, 1200 410 C 1350 460, 1520 380, 1600 420"
              stroke="#00C8A0"
              strokeWidth="0.8"
              strokeOpacity="0.7"
            />
          </svg>
        </div>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pt-3 sm:pt-7 pb-1 sm:pb-2 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end">
            {/* Left */}
            <div className="lg:col-span-6 text-left">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <span className={`text-[#00C8A0] text-[10px] sm:text-xs font-extrabold ${isRtl ? "tracking-normal font-sans" : "tracking-[0.2em] uppercase"}`}>
                  {t.fywEyebrow}
                </span>
                <span className="w-8 sm:w-12 h-[1.5px] bg-[#00C8A0]/70 inline-block" />
              </div>
              <h2 className={`font-serif text-2xl sm:text-4xl lg:text-[46px] font-semibold text-white leading-[1.08] mb-1 sm:mb-2 ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
                {t.fywHeadlinePart1}<br className="hidden sm:block" /> {t.fywHeadlinePart2}
                <span className="text-[#00C8A0]">.</span>
              </h2>
              <p className="text-slate-300/85 text-[11px] sm:text-sm leading-snug sm:leading-relaxed max-w-md font-sans line-clamp-2 sm:line-clamp-none">
                {t.fywSubtitle}
              </p>
            </div>

            {/* Right: 3 feature items — hidden on mobile to prioritize complete card visibility */}
            <div className="hidden sm:block lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 lg:pt-0">
                <div className="flex flex-col text-left">
                  <div className="w-8 h-8 rounded-full bg-[#00C8A0]/10 border border-[#00C8A0]/30 flex items-center justify-center text-[#00C8A0] mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.5 4.5L21.75 6"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 15c4-4 8 2 12-2s4-1 6-1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide mb-0.5">
                    {isRtl ? "قابلة للتخصيص 100%" : "100% Customizable"}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-normal font-sans">
                    {isRtl ? "ارتفاع، سرعة وشكل الموجة." : "Wave height, speed and shape."}
                  </p>
                </div>

                <div className="flex flex-col text-left sm:border-l sm:border-white/15 sm:pl-3">
                  <div className="w-8 h-8 rounded-full bg-[#00C8A0]/10 border border-[#00C8A0]/30 flex items-center justify-center text-[#00C8A0] mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide mb-0.5">
                    {isRtl ? "كفاءة الطاقة" : "Energy Efficient"}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-normal font-sans">
                    {isRtl ? "تقنية ذكية لأمواج مستدامة." : "Smart technology for sustainable waves."}
                  </p>
                </div>

                <div className="flex flex-col text-left sm:border-l sm:border-white/15 sm:pl-3">
                  <div className="w-8 h-8 rounded-full bg-[#00C8A0]/10 border border-[#00C8A0]/30 flex items-center justify-center text-[#00C8A0] mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide mb-0.5">
                    {isRtl ? "آمن ومحكم" : "Safe & Controlled"}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-normal font-sans">
                    {isRtl ? "متسق وآمن للجميع." : "Consistent, repeatable and safe for all."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD TRACK VIEWPORT ──────────────────────────────────────────── */}
        <div className="relative flex-1 w-full overflow-hidden z-10 flex items-center min-h-0 py-1 sm:py-2">
          {/* Prev arrow */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous Wave Tier"
            className={`absolute left-2 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-[#061C27]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061C27] hover:scale-110 cursor-pointer ${
              activeIndex === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={handleNext}
            disabled={activeIndex === CARDS_DATA.length - 1}
            aria-label="Next Wave Tier"
            className={`absolute right-2 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-[#061C27]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061C27] hover:scale-110 cursor-pointer ${
              activeIndex === CARDS_DATA.length - 1
                ? "opacity-20 cursor-not-allowed"
                : "opacity-100"
            }`}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* GSAP-controlled card track — only translateX changes during scroll / navigation */}
          <div
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="carousel-track flex items-center gap-3 sm:gap-5 lg:gap-6 py-1 sm:py-2 will-change-transform"
            style={{
              ...(isMobile ? { paddingLeft: "8vw", paddingRight: "8vw" } : {}),
            }}
          >
            {CARDS_DATA.map((card, idx) => {
              const isActive = idx === activeIndex;
              const diff = Math.abs(idx - activeIndex);

              const cardTitle = isRtl
                ? idx === 0
                  ? t.fywCard01Title
                  : idx === 1
                  ? t.fywCard02Title
                  : idx === 2
                  ? t.fywCard03Title
                  : idx === 3
                  ? t.fywCard04Title
                  : t.fywCard05Title
                : card.title;

              const cardLevel = isRtl
                ? idx === 0
                  ? t.fywCard01Level
                  : idx === 1
                  ? t.fywCard02Level
                  : idx === 2
                  ? t.fywCard03Level
                  : idx === 3
                  ? t.fywCard04Level
                  : t.fywCard05Level
                : card.level;

              const cardDesc = isRtl
                ? idx === 0
                  ? t.fywCard01Desc
                  : idx === 1
                  ? t.fywCard02Desc
                  : idx === 2
                  ? t.fywCard03Desc
                  : idx === 3
                  ? t.fywCard04Desc
                  : t.fywCard05Desc
                : card.desc;

              return (
                <div
                  key={card.id}
                  data-wave-card
                  onClick={() => handleSelectCard(idx)}
                  className={`wave-card-item shrink-0 cursor-pointer transition-all duration-500 ease-out flex flex-col justify-between snap-center overflow-hidden rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-5
                    w-[84vw] max-w-[340px] sm:w-[330px] lg:w-[clamp(310px,25vw,380px)]
                    h-[clamp(350px,50vh,450px)] sm:h-[clamp(400px,51vh,510px)]
                    ${
                      isActive
                        ? "scale-100 opacity-100 z-20 bg-[#F6F4EE] text-[#0A1926] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/70"
                        : diff === 1
                        ? "scale-[0.95] opacity-[0.94] z-10 bg-[#F6F4EE]/95 text-[#0A1926]/90 shadow-xl border border-white/30"
                        : "scale-[0.90] opacity-[0.75] z-0 bg-[#F6F4EE]/80 text-[#0A1926]/80 shadow-lg border border-white/20"
                    }`}
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Top Image */}
                  <div className="relative w-full h-[35%] sm:h-[38%] overflow-hidden rounded-[14px] sm:rounded-[18px] shrink-0 mb-1.5 sm:mb-2">
                    <img
                      src={card.img}
                      alt={`${cardTitle} wave session`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/30 text-[#00C8A0] text-[8.5px] sm:text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
                        <span>{card.waveBadge}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 z-10 text-white pointer-events-none">
                      <span className={`font-serif text-xs sm:text-base font-bold text-white drop-shadow-md ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-wide"}`}>
                        {cardLevel}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col justify-between flex-grow text-left min-h-0">
                    <div>
                      <span className={`text-[#0B7FB5] text-[9px] sm:text-[9.5px] font-extrabold uppercase block mb-0.5 ${isRtl ? "tracking-normal font-sans" : "tracking-[0.2em]"}`}>
                        {card.tierLabel}
                      </span>
                      <h3 className={`font-serif text-base sm:text-xl font-bold text-[#0A1926] mb-0.5 ${isRtl ? "tracking-normal font-sans" : "tracking-tight uppercase"}`}>
                        {cardTitle}
                      </h3>
                      <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-sans line-clamp-2 mb-1">
                        {cardDesc}
                      </p>
                    </div>

                    <div>
                      {/* Spec Grid */}
                      <div className="grid grid-cols-3 gap-1 py-1 sm:py-1.5 border-y border-slate-200/80 my-1">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 mb-0.5">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0B7FB5]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 15c4-4 8 2 12-2s4-1 6-1"
                              />
                            </svg>
                            <span className={`text-[7.5px] sm:text-[8px] font-extrabold text-slate-400 ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"}`}>
                              {t.fywHeight}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-bold text-[#0A1926]">
                            {card.height}
                          </span>
                        </div>

                        <div className="flex flex-col border-l border-slate-200/80 pl-1.5">
                          <div className="flex items-center gap-1 mb-0.5">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0B7FB5]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            <span className={`text-[7.5px] sm:text-[8px] font-extrabold text-slate-400 ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"}`}>
                              {t.fywRide}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-bold text-[#0A1926]">
                            {card.ride}
                          </span>
                        </div>

                        <div className="flex flex-col border-l border-slate-200/80 pl-1.5">
                          <div className="flex items-center gap-1 mb-0.5">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0B7FB5]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 2v20M8 6h8"
                              />
                            </svg>
                            <span className={`text-[7.5px] sm:text-[8px] font-extrabold text-slate-400 ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"}`}>
                              {t.fywBoard}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-bold text-[#0A1926] truncate">
                            {card.board}
                          </span>
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-0.5 sm:pt-1">
                        <div className="flex flex-col">
                          <span className={`text-[7.5px] sm:text-[8px] font-extrabold text-slate-400 ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"}`}>
                            {t.fywSessionRate}
                          </span>
                          <span className="text-[11px] sm:text-sm font-bold text-[#0A1926] font-sans tracking-tight">
                            {card.price}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(cardTitle);
                          }}
                          onMouseMove={handleMagneticMouseMove}
                          onMouseLeave={handleMagneticMouseLeave}
                          aria-label={`Book ${cardTitle} session`}
                          className={`rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                            isActive
                              ? "w-7 h-7 sm:w-9 sm:h-9 bg-[#074754] text-white hover:bg-[#00C8A0] hover:text-[#061C27] hover:scale-105"
                              : "w-6 h-6 sm:w-8 sm:h-8 bg-white border border-slate-300 text-[#074754] hover:bg-[#074754] hover:text-white"
                          }`}
                        >
                          <svg
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── PAGINATION DOTS ──────────────────────────────────────────────── */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-2.5 py-1.5 sm:py-2 flex-shrink-0">
          {CARDS_DATA.map((card, idx) => {
            const dotActive = idx === activeIndex;
            return (
              <button
                key={card.id}
                onClick={() => handleSelectCard(idx)}
                aria-label={`Go to ${card.title}`}
                className={`transition-all duration-300 cursor-pointer ${
                  dotActive
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 rounded-full bg-[#00C8A0] shadow-sm"
                    : "w-4 sm:w-5 h-1.5 sm:h-2 rounded-full bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>

        {/* ── SECTION FOOTER BRANDING ───────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-2 sm:pb-3 border-t border-white/10 flex flex-row items-center justify-between gap-2 text-[9px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-white/70 pt-1.5 sm:pt-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00C8A0]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.5 4.5L21.75 6"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15c4-4 8 2 12-2s4-1 6-1"
              />
            </svg>
            <span className="text-white/90">WAVEGARDEN COVE®</span>
          </div>
          <div className="text-slate-400 text-[8.5px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em]">
            TECHNOLOGY. PRECISION. PERFECTION.
          </div>
        </div>
      </div>
      {/* End pinned viewport */}
    </section>
  );
}
