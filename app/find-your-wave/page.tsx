"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FindYourWave from "../components/FindYourWave";
import { useBooking } from "../context/BookingContext";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

const TIER_BREAKDOWN = [
  {
    id: "01",
    level: "BEGINNER",
    tierLabel: "TIER 01",
    height: "0.5 – 0.8m",
    ride: "120m",
    board: "Soft-top",
    img: "/images/tier1.jpg",
    desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment. Our ISA-certified instructors are in the water with you for guidance and support throughout the entire session.",
  },
  {
    id: "02",
    level: "NOVICE",
    tierLabel: "TIER 02",
    height: "0.8 – 1.2m",
    ride: "140m",
    board: "Funboard",
    img: "/images/tier2.jpg",
    desc: "Designed for riders who can pop up and are ready to learn board control on soft open-face waves. This is where board control, timing, and smooth angled take-offs start to click with confidence.",
  },
  {
    id: "03",
    level: "PROGRESSIVE",
    tierLabel: "TIER 03",
    height: "1.2 – 1.5m",
    ride: "160m",
    board: "Fish / Longboard",
    img: "/images/tier3.jpg",
    desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns. Expect real feedback on your positioning as waves grow more dynamic and responsive across the lagoon.",
  },
  {
    id: "04",
    level: "INTERMEDIATE",
    tierLabel: "TIER 04",
    height: "1.5 – 1.8m",
    ride: "180m",
    board: "Shortboard",
    img: "/images/tier4.jpg",
    desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks. Built for surfers ready to link turns together with speed, power, and precise rail-to-rail control.",
  },
  {
    id: "05",
    level: "EXPERT",
    tierLabel: "TIER 05",
    height: "1.8 – 2.2m",
    ride: "200m",
    board: "Step-Up",
    img: "/images/tier5.jpg",
    desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels. Reserved for experienced surfers who know their way around a steep drop, fast section, and heavy barrel.",
  },
];

const WHAT_TO_EXPECT = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#00C8A0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M8 6h8" />
      </svg>
    ),
    title: "EQUIPMENT INCLUDED & RENTALS",
    desc: "Soft-top surfboard included with introductory sessions. High-performance fiberglass boards and premium wetsuits are available for hire at our Surf Rental Center.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#00C8A0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "SAFETY BRIEFING & ORIENTATION",
    desc: "Every session begins with a mandatory 15-minute briefing covering lagoon layout, safety protocols, wave timing, and entry/exit positioning.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#00C8A0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "CERTIFIED IN-WATER COACHING",
    desc: "ISA-certified surf coaches are in the water during lower-tier sessions and poolside for all sessions, offering immediate feedback and wave catching tips.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#00C8A0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 21v-2.25m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
      </svg>
    ),
    title: "CLIMATE & WATER CONTROL",
    desc: "Year-round pristine water clarity powered by continuous advanced filtration and optimal lagoon temperature management.",
  },
];

export default function FindYourWavePage() {
  const { onOpenBooking } = useBooking();
  const breakdownRef = useRef<HTMLDivElement>(null);
  const expectRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Breakdown Section Reveal
      if (breakdownRef.current) {
        gsap.fromTo(
          breakdownRef.current.querySelectorAll(".tier-row-item"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.ENTRANCE_DURATION,
            stagger: MOTION.STAGGER,
            ease: MOTION.ENTRANCE_EASE,
            scrollTrigger: {
              trigger: breakdownRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 2. What to Expect Reveal
      if (expectRef.current) {
        gsap.fromTo(
          expectRef.current.querySelectorAll(".expect-item"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.ENTRANCE_DURATION,
            stagger: MOTION.STAGGER,
            ease: MOTION.ENTRANCE_EASE,
            scrollTrigger: {
              trigger: expectRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 3. CTA Section Reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: MOTION.ENTRANCE_DURATION,
            ease: MOTION.ENTRANCE_EASE,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#061C27] text-white min-h-screen">
      {/* SECTION 1 — Dedicated Subpage Hero Intro Header */}
      <section className="bg-[#061C27] text-white pt-28 pb-14 relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-left">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            CALIBRATED LAGOON PROFILES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
            A Wave for Every Skill Level
          </h1>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans">
            From your very first pop-up to advanced barrel riding, our programmable lagoon delivers five distinct wave profiles — each precisely tuned for height, speed, and shape. Whether you're a complete beginner or chasing your next personal best, there's a session calibrated exactly for where you are.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Interactive FindYourWave Carousel */}
      <FindYourWave onOpenBooking={onOpenBooking} />

      {/* SECTION 3 — Detailed Tier Breakdown List */}
      <section ref={breakdownRef} className="py-20 sm:py-28 bg-[#02141C] text-white border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
          
          {/* Header */}
          <div className="max-w-2xl mb-14">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.22em] uppercase block mb-3">
              FULL TIER BREAKDOWN
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              Level Specifications & Details<span className="text-[#00C8A0]">.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Compare wave heights, ride lengths, recommended board types, and expectations across all five lagoon tiers.
            </p>
          </div>

          {/* Static Rows List */}
          <div className="space-y-6">
            {TIER_BREAKDOWN.map((tier) => (
              <div
                key={tier.id}
                className="tier-row-item bg-[#061C27] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#00C8A0]/50 transition-all shadow-xl"
              >
                {/* Left: Image & Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:w-5/12">
                  <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={tier.img}
                      alt={`${tier.level} wave`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono font-bold text-[#00C8A0]">
                      {tier.tierLabel}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#0B7FB5] text-[10px] font-extrabold tracking-[0.2em] uppercase block mb-1">
                      WAVE {tier.id}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white uppercase tracking-tight mb-2">
                      {tier.level}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                      {tier.desc}
                    </p>
                  </div>
                </div>

                {/* Center: Specs Grid */}
                <div className="grid grid-cols-3 gap-4 py-4 lg:py-0 border-y lg:border-y-0 lg:border-x border-white/10 px-0 lg:px-8 lg:w-4/12">
                  <div>
                    <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest block mb-1">HEIGHT</span>
                    <span className="font-bold text-sm text-[#00C8A0]">{tier.height}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest block mb-1">RIDE</span>
                    <span className="font-bold text-sm text-white">{tier.ride}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest block mb-1">BOARD</span>
                    <span className="font-bold text-xs text-white truncate block">{tier.board}</span>
                  </div>
                </div>

                {/* Right: Booking CTA */}
                <div className="lg:w-2/12 flex items-center justify-end">
                  <button
                    onClick={() => onOpenBooking(tier.level)}
                    onMouseMove={handleMagneticMouseMove}
                    onMouseLeave={handleMagneticMouseLeave}
                    className="w-full sm:w-auto bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-2"
                  >
                    <span>BOOK {tier.level}</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4 — What to Expect */}
      <section ref={expectRef} className="py-20 sm:py-28 bg-[#061C27] text-white border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
          
          <div className="max-w-2xl mb-14">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.22em] uppercase block mb-3">
              SESSION ESSENTIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08]">
              What's Included in Every Session<span className="text-[#00C8A0]">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_TO_EXPECT.map((item) => (
              <div
                key={item.title}
                className="expect-item bg-[#02141C] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#00C8A0]/50 transition-all shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#061C27] border border-white/10 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>

                  <h3 className="font-sans text-xs font-extrabold tracking-wider uppercase text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5 — Closing CTA Section */}
      <section ref={ctaRef} className="py-24 sm:py-32 bg-[#02141C] text-white border-t border-white/10 relative z-10 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
            BAHRAIN SURF PARK
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-6">
            READY TO FIND YOUR WAVE?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-sans max-w-xl mx-auto mb-10 leading-relaxed">
            Reserve your wave session today and experience world-class artificial waves in the heart of Bahrain.
          </p>

          <button
            onClick={() => onOpenBooking()}
            onMouseMove={handleMagneticMouseMove}
            onMouseLeave={handleMagneticMouseLeave}
            className="bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-9 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-2xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2"
          >
            <span>BOOK YOUR SESSION NOW</span>
            <span className="text-sm font-normal">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
