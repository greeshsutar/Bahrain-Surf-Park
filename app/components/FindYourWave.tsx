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
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Compute the track translateX that perfectly centers card[index] in the viewport. */
function computeCardX(
  index: number,
  viewportWidth: number,
  cardWidth: number,
  gap: number
): number {
  const centerOffset = viewportWidth / 2 - cardWidth / 2;
  return centerOffset - index * (cardWidth + gap);
}

/** Read the first .wave-card-item dimensions from the DOM. Returns null until mounted. */
function measureCard(track: HTMLDivElement | null): {
  cardWidth: number;
  gap: number;
} | null {
  if (!track) return null;
  const cardNode = track.querySelector<HTMLElement>(".wave-card-item");
  if (!cardNode) return null;
  const cardWidth = cardNode.offsetWidth;
  const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
  return { cardWidth, gap };
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function FindYourWave({ onOpenBooking }: FindYourWaveProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Keep a ref to the live ScrollTrigger instance so arrows can scroll to it
  const stRef = useRef<ScrollTrigger | null>(null);

  // ── Sync activeIndex ref on every React state change ──────────────────────
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ── REDUCED MOTION: skip all pinning ──────────────────────────────────────
  const reduced = isReducedMotion();

  // ── Main ScrollTrigger pin + horizontal scrub ──────────────────────────────
  useEffect(() => {
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    // We wrap everything in a GSAP context for clean unmount
    const ctx = gsap.context(() => {
      // ── Measurement helper (called once now, and again on refresh) ─────────
      const getMetrics = () => {
        const vw = viewport.clientWidth;
        const m = measureCard(track);
        if (!m) return null;
        const { cardWidth, gap } = m;
        const firstX = computeCardX(0, vw, cardWidth, gap);
        const lastX = computeCardX(CARDS_DATA.length - 1, vw, cardWidth, gap);
        const travel = Math.abs(lastX - firstX);
        return { vw, cardWidth, gap, firstX, lastX, travel };
      };

      // ── Set section height so it provides enough scroll distance ──────────
      // sectionHeight = travel + 1 viewport (the pin panel itself)
      const setSectionHeight = () => {
        const m = getMetrics();
        if (!m) return;
        gsap.set(section, { height: m.travel + window.innerHeight });
      };

      setSectionHeight();

      // ── Position track at card 0 before ST runs ───────────────────────────
      const initialMetrics = getMetrics();
      if (initialMetrics) {
        gsap.set(track, { x: initialMetrics.firstX });
      }

      // ── Create the ScrollTrigger-driven tween ─────────────────────────────
      const tween = gsap.fromTo(
        track,
        { x: () => getMetrics()?.firstX ?? 0 },
        {
          x: () => getMetrics()?.lastX ?? 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => {
              const m = getMetrics();
              return m ? `+=${m.travel}` : "+=3000";
            },
            pin: viewport,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (CARDS_DATA.length - 1),
              duration: { min: 0.3, max: 0.6 },
              ease: "power2.inOut",
              inertia: false,
            },
            onUpdate: (self) => {
              const newIdx = Math.round(
                self.progress * (CARDS_DATA.length - 1)
              );
              if (newIdx !== activeIndexRef.current) {
                activeIndexRef.current = newIdx;
                setActiveIndex(newIdx);
              }
            },
            onRefresh: () => {
              setSectionHeight();
            },
          },
        }
      );

      // Store ST instance for arrow navigation
      stRef.current = tween.scrollTrigger ?? null;
    }, section);

    return () => {
      ctx.revert();
      stRef.current = null;
      // Restore natural section height so there's no layout remnant
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { clearProps: "height" });
      }
    };
  }, [reduced]);

  // ── Arrow navigation via ScrollToPlugin ───────────────────────────────────
  const navigateTo = useCallback((targetIdx: number) => {
    const st = stRef.current;
    if (!st) return;

    const clampedIdx = Math.max(0, Math.min(CARDS_DATA.length - 1, targetIdx));
    const targetProgress = clampedIdx / (CARDS_DATA.length - 1);

    // Convert progress → scroll position within the ST range
    const targetScrollY =
      st.start + targetProgress * (st.end - st.start);

    gsap.to(window, {
      scrollTo: { y: targetScrollY, autoKill: false },
      duration: 0.7,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }, []);

  const handlePrev = () => navigateTo(activeIndexRef.current - 1);
  const handleNext = () => navigateTo(activeIndexRef.current + 1);
  const handleSelectCard = (index: number) => navigateTo(index);

  // ── REDUCED MOTION fallback: simple stacked layout, no pin ────────────────
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

  // ── MAIN RENDER ───────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="find-your-wave"
      className="relative bg-[#061C27] text-white selection:bg-[#00C8A0] selection:text-[#061C27]"
      // Height is set dynamically by GSAP (travel + 100vh).
      // overflow-visible so the pinned child is not clipped during GSAP pin.
    >
      {/* ── Pinned viewport — GSAP pins this element ────────────────────── */}
      <div
        ref={viewportRef}
        className="relative w-full h-screen flex flex-col overflow-hidden"
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
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-10 sm:pt-14 pb-4 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left */}
            <div className="lg:col-span-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.2em] uppercase">
                  FIND YOUR WAVE
                </span>
                <span className="w-12 h-[1.5px] bg-[#00C8A0]/70 inline-block" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-semibold text-white tracking-tight leading-[1.08] mb-4">
                One Place.<br />
                Many Ways<span className="text-[#00C8A0]">.</span>
              </h2>
              <p className="text-slate-300/85 text-sm sm:text-base leading-relaxed max-w-md font-sans">
                From your first ride to your next personal best, our waves are
                designed for every level and every kind of progression.
              </p>
            </div>

            {/* Right: 3 feature items */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-4 lg:pt-0">
                <div className="flex flex-col text-left">
                  <div className="w-9 h-9 rounded-full bg-[#00C8A0]/10 border border-[#00C8A0]/30 flex items-center justify-center text-[#00C8A0] mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5L21.75 6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15c4-4 8 2 12-2s4-1 6-1" />
                    </svg>
                  </div>
                  <h3 className="text-white text-sm font-bold tracking-wide mb-1">100% Customizable</h3>
                  <p className="text-slate-400 text-xs leading-normal font-sans">Wave height, speed and shape.</p>
                </div>

                <div className="flex flex-col text-left sm:border-l sm:border-white/15 sm:pl-4">
                  <div className="w-9 h-9 rounded-full bg-[#00C8A0]/10 border border-[#00C8A0]/30 flex items-center justify-center text-[#00C8A0] mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-sm font-bold tracking-wide mb-1">Energy Efficient</h3>
                  <p className="text-slate-400 text-xs leading-normal font-sans">Smart technology for sustainable waves.</p>
                </div>

                <div className="flex flex-col text-left sm:border-l sm:border-white/15 sm:pl-4">
                  <div className="w-9 h-9 rounded-full bg-[#00C8A0]/10 border border-[#00C8A0]/30 flex items-center justify-center text-[#00C8A0] mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-sm font-bold tracking-wide mb-1">Safe &amp; Controlled</h3>
                  <p className="text-slate-400 text-xs leading-normal font-sans">Consistent, repeatable and safe for all.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD TRACK VIEWPORT ──────────────────────────────────────────── */}
        <div className="relative flex-1 w-full overflow-hidden z-10 flex items-center min-h-0">

          {/* Prev arrow */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous Wave Tier"
            className={`absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/20 bg-[#061C27]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061C27] hover:scale-110 cursor-pointer ${
              activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={handleNext}
            disabled={activeIndex === CARDS_DATA.length - 1}
            aria-label="Next Wave Tier"
            className={`absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/20 bg-[#061C27]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061C27] hover:scale-110 cursor-pointer ${
              activeIndex === CARDS_DATA.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* GSAP-controlled card track — only translateX changes during scroll */}
          <div
            ref={trackRef}
            className="carousel-track flex items-center gap-4 sm:gap-5 lg:gap-6 py-4 will-change-transform"
          >
            {CARDS_DATA.map((card, idx) => {
              const isActive = idx === activeIndex;
              const diff = Math.abs(idx - activeIndex);

              return (
                <div
                  key={card.id}
                  onClick={() => handleSelectCard(idx)}
                  className={`wave-card-item shrink-0 cursor-pointer transition-all duration-500 ease-out flex flex-col justify-between snap-center overflow-hidden rounded-[26px] p-5 sm:p-6
                    w-[82vw] sm:w-[340px] lg:w-[clamp(320px,26vw,400px)]
                    h-[58vh] sm:h-[60vh] lg:h-[62vh]
                    ${
                      isActive
                        ? "scale-100 -translate-y-2.5 opacity-100 z-20 bg-[#F6F4EE] text-[#0A1926] shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-2 border-white/70"
                        : diff === 1
                        ? "scale-[0.95] translate-y-2 opacity-[0.96] z-10 bg-[#F6F4EE]/95 text-[#0A1926]/90 shadow-xl border border-white/30"
                        : "scale-[0.90] translate-y-4 opacity-[0.75] z-0 bg-[#F6F4EE]/80 text-[#0A1926]/80 shadow-lg border border-white/20"
                    }`}
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Top Image */}
                  <div className="relative w-full h-[38%] overflow-hidden rounded-[20px] shrink-0 mb-3">
                    <img
                      src={card.img}
                      alt={`${card.title} wave session`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/30 text-[#00C8A0] text-[9px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
                        <span>{card.waveBadge}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 z-10 text-white pointer-events-none">
                      <span className="font-serif text-base sm:text-lg font-bold uppercase tracking-wide text-white drop-shadow-md">
                        {card.level}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col justify-between flex-grow text-left">
                    <div>
                      <span className="text-[#0B7FB5] text-[10px] font-extrabold tracking-[0.2em] uppercase block mb-0.5">
                        {card.tierLabel}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1926] tracking-tight uppercase mb-1">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed font-sans line-clamp-2 mb-2">
                        {card.desc}
                      </p>
                    </div>

                    <div>
                      {/* Spec Grid */}
                      <div className="grid grid-cols-3 gap-1 py-2 border-y border-slate-200/80 my-2">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 mb-0.5">
                            <svg className="w-3 h-3 text-[#0B7FB5]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15c4-4 8 2 12-2s4-1 6-1" />
                            </svg>
                            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400">HEIGHT</span>
                          </div>
                          <span className="text-xs font-bold text-[#0A1926]">{card.height}</span>
                        </div>

                        <div className="flex flex-col border-l border-slate-200/80 pl-2">
                          <div className="flex items-center gap-1 mb-0.5">
                            <svg className="w-3 h-3 text-[#0B7FB5]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400">RIDE</span>
                          </div>
                          <span className="text-xs font-bold text-[#0A1926]">{card.ride}</span>
                        </div>

                        <div className="flex flex-col border-l border-slate-200/80 pl-2">
                          <div className="flex items-center gap-1 mb-0.5">
                            <svg className="w-3 h-3 text-[#0B7FB5]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M8 6h8" />
                            </svg>
                            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400">BOARD</span>
                          </div>
                          <span className="text-xs font-bold text-[#0A1926] truncate">{card.board}</span>
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-col">
                          <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400">SESSION RATE</span>
                          <span className="text-xs sm:text-sm font-bold text-[#0A1926] font-sans tracking-tight">{card.price}</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(card.title);
                          }}
                          onMouseMove={handleMagneticMouseMove}
                          onMouseLeave={handleMagneticMouseLeave}
                          aria-label={`Book ${card.title} session`}
                          className={`rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                            isActive
                              ? "w-9 h-9 sm:w-10 sm:h-10 bg-[#074754] text-white hover:bg-[#00C8A0] hover:text-[#061C27] hover:scale-105"
                              : "w-8 h-8 sm:w-9 sm:h-9 bg-white border border-slate-300 text-[#074754] hover:bg-[#074754] hover:text-white"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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
        <div className="relative z-10 flex items-center justify-center gap-2.5 py-4 flex-shrink-0">
          {CARDS_DATA.map((card, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={card.id}
                onClick={() => handleSelectCard(idx)}
                aria-label={`Go to ${card.title}`}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-8 h-2 rounded-full bg-[#00C8A0] shadow-sm"
                    : "w-5 h-2 rounded-full bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>

        {/* ── SECTION FOOTER BRANDING ───────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-extrabold tracking-[0.22em] uppercase text-white/70 pt-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#00C8A0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5L21.75 6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15c4-4 8 2 12-2s4-1 6-1" />
            </svg>
            <span className="text-white/90">WAVEGARDEN COVE®</span>
          </div>
          <div className="text-slate-400 text-[11px] tracking-[0.25em]">
            TECHNOLOGY. PRECISION. PERFECTION.
          </div>
        </div>
      </div>
      {/* End pinned viewport */}
    </section>
  );
}
