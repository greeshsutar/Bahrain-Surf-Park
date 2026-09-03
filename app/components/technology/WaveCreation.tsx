"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ArchitecturalPoint {
  num: string;
  title: string;
  desc: string;
  target: { x: number; y: number }; // percentage coords on image
  labelPos: { x: number; y: number }; // percentage coords on board
  linePath: string; // SVG relative path string
}

const ARCHITECTURAL_POINTS: ArchitecturalPoint[] = [
  {
    num: "01",
    title: "CENTRAL CLUBHOUSE",
    desc: "The heart of Bahrain Surf Park, bringing together arrival, hospitality, dining and panoramic views of the lagoon.",
    target: { x: 50.5, y: 20 },
    labelPos: { x: 50.5, y: 6 },
    linePath: "M 50.5 12 L 50.5 20",
  },
  {
    num: "02",
    title: "RESORT HOTEL",
    desc: "Premium accommodation overlooking the lagoon with direct access to the park experience.",
    target: { x: 28, y: 28 },
    labelPos: { x: 12, y: 16 },
    linePath: "M 22 18 L 28 28",
  },
  {
    num: "03",
    title: "SURF PARK FACILITIES",
    desc: "Surf retail, rentals, café, wellness and supporting guest facilities.",
    target: { x: 74, y: 28 },
    labelPos: { x: 88, y: 16 },
    linePath: "M 80 18 L 74 28",
  },
  {
    num: "04",
    title: "MAIN LAGOON",
    desc: "The central Wavegarden Cove® lagoon where the surfing experience takes place.",
    target: { x: 35, y: 48 },
    labelPos: { x: 10, y: 48 },
    linePath: "M 20 48 L 35 48",
  },
  {
    num: "05",
    title: "WAVE GENERATOR",
    desc: "The Wavegarden Cove® wave-generation system responsible for creating the surfable waves.",
    target: { x: 50.5, y: 38 },
    labelPos: { x: 76, y: 38 },
    linePath: "M 66 38 L 50.5 38",
  },
  {
    num: "06",
    title: "MAIN ENTRANCE",
    desc: "The primary arrival sequence connecting guests to the resort and lagoon.",
    target: { x: 50.5, y: 60 },
    labelPos: { x: 50.5, y: 72 },
    linePath: "M 50.5 70 L 50.5 60",
  },
  {
    num: "07",
    title: "BEACH CLUB VILLAS",
    desc: "Private luxury villas surrounded by tropical landscaping with direct beach access.",
    target: { x: 18, y: 80 },
    labelPos: { x: 10, y: 86 },
    linePath: "M 16 84 L 18 80",
  },
  {
    num: "08",
    title: "BEACHFRONT & PALM WALK",
    desc: "A landscaped beachfront promenade with palms, relaxation areas and pedestrian connections.",
    target: { x: 36, y: 68 },
    labelPos: { x: 36, y: 82 },
    linePath: "M 36 80 L 36 68",
  },
  {
    num: "09",
    title: "DINING & BEACH CLUB",
    desc: "Beachfront dining, social spaces and leisure experiences.",
    target: { x: 80, y: 78 },
    labelPos: { x: 85, y: 82 },
    linePath: "M 82 80 L 80 78",
  },
  {
    num: "10",
    title: "LANDSCAPED SURROUNDINGS",
    desc: "Lush tropical landscaping creating a natural buffer around the resort.",
    target: { x: 88, y: 88 },
    labelPos: { x: 90, y: 92 },
    linePath: "M 90 90 L 88 88",
  },
];

export default function WaveCreation() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(imageRef.current, { opacity: 0, scale: 0.98 });
      gsap.set(".connector-line", { strokeDasharray: 400, strokeDashoffset: 400 });
      gsap.set(".target-node", { scale: 0, opacity: 0 });
      gsap.set(".callout-label", { opacity: 0, y: 8 });
      gsap.set(".mobile-card", { opacity: 0, y: 12 });

      if (prefersReduced) {
        gsap.set(imageRef.current, { opacity: 1, scale: 1 });
        gsap.set(".connector-line", { strokeDashoffset: 0 });
        gsap.set(".target-node", { scale: 1, opacity: 1 });
        gsap.set(".callout-label", { opacity: 1, y: 0 });
        gsap.set(".mobile-card", { opacity: 1, y: 0 });
        return;
      }

      // Master 9-Second Architectural Reveal Timeline (Triggered once on Viewport Entrance)
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // STEP 01 — IMAGE (0.0s - 1.0s)
      mainTl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      });

      // STEPS 01-10 PROGRESSIVE ONE-BY-ONE REVEALS (1.0s - 9.0s)
      ARCHITECTURAL_POINTS.forEach((pt, index) => {
        const stepTime = 1.0 + index * 0.75; // Smooth 0.75s intervals with natural overlap

        // 1. Connector line begins drawing
        mainTl.to(
          `#line-${pt.num}`,
          {
            strokeDashoffset: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          stepTime
        );

        // 2. Target node softly appears as line reaches location
        mainTl.to(
          `#node-${pt.num}`,
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.8)",
          },
          stepTime + 0.35
        );

        // 3. Label number & title fade/slide in
        mainTl.to(
          `#label-${pt.num}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          stepTime + 0.45
        );

        // Mobile Card reveal sync
        mainTl.to(
          `#mobile-card-${pt.num}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          stepTime + 0.45
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-section-02"
      className="bg-[#061C27] text-[#F5F7F4] py-16 sm:py-24 relative z-10 border-b border-white/10 overflow-hidden"
    >
      {/* Background Subtle Contour Lines & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.04]"
          viewBox="0 0 1440 900"
          fill="none"
          stroke="#00C8C8"
          strokeWidth="1"
        >
          <path d="M-100,120 C300,40 600,260 1100,160 C1300,120 1500,240 1600,200" strokeDasharray="4 4" />
          <path d="M-100,280 C250,360 650,130 1050,300 C1280,340 1480,220 1600,280" />
          <path d="M-100,440 C350,500 800,300 1200,460 C1350,500 1520,380 1600,440" strokeDasharray="6 6" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00C8C8]/[0.03] rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 text-left relative z-10">
        
        {/* Header Block */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-[#00C8C8] tracking-[0.22em] block mb-2">
            02
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F7F4] tracking-tight leading-[1.08] mb-3">
            PARTS & NAMING GUIDE<span className="text-[#00C8C8]">.</span>
          </h2>
          <p className="text-[#9BB1B8] text-sm sm:text-base font-sans leading-relaxed max-w-xl">
            An overview of the key areas and architectural elements of Bahrain Surf Park.
          </p>
        </div>

        {/* DESKTOP ARCHITECTURAL PRESENTATION BOARD (All 10 points visible simultaneously) */}
        <div
          ref={imageRef}
          className="hidden md:block relative w-full rounded-[24px] border border-[#00C8C8]/30 bg-[#073845]/90 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <div className="relative w-full overflow-hidden rounded-2xl bg-[#061C27]">
            
            {/* 100% CLEAN Aerial Photograph (Zero baked-in text or graphics) */}
            <img
              src="/images/wave_engineering.jpg"
              alt="Bahrain Surf Park clean masterplan aerial photograph"
              className="w-full h-auto object-cover block rounded-2xl"
            />

            {/* Desktop SVG Connector Lines Layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {ARCHITECTURAL_POINTS.map((pt) => (
                <path
                  key={pt.num}
                  id={`line-${pt.num}`}
                  d={pt.linePath}
                  stroke="#00C8C8"
                  strokeWidth="0.45"
                  strokeOpacity="0.85"
                  strokeDasharray="400"
                  className="connector-line"
                />
              ))}
            </svg>

            {/* 10 Target Nodes over specific physical locations */}
            {ARCHITECTURAL_POINTS.map((pt) => (
              <div
                key={pt.num}
                id={`node-${pt.num}`}
                style={{ left: `${pt.target.x}%`, top: `${pt.target.y}%` }}
                className="target-node absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8C8] shadow-[0_0_10px_#00C8C8]" />
              </div>
            ))}

            {/* 10 Architectural Callout Badges around photo */}
            {ARCHITECTURAL_POINTS.map((pt) => (
              <div
                key={pt.num}
                id={`label-${pt.num}`}
                style={{ left: `${pt.labelPos.x}%`, top: `${pt.labelPos.y}%` }}
                className="callout-label absolute -translate-x-1/2 -translate-y-1/2 z-40 bg-[#061C27]/90 backdrop-blur-md border border-[#00C8C8]/40 rounded-xl px-3 py-1.5 shadow-lg max-w-[200px] text-left"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#00C8C8]">
                    {pt.num}
                  </span>
                  <span className="text-[10px] font-sans font-bold text-[#F5F7F4] uppercase tracking-wider truncate">
                    {pt.title}
                  </span>
                </div>
                <p className="text-[9.5px] text-[#A8BDC3] font-sans leading-tight line-clamp-2">
                  {pt.desc}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* MOBILE RESPONSIVE COMPOSITION (Clean Photo top + 10 Cards below) */}
        <div className="block md:hidden space-y-6">
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#00C8C8]/30 shadow-xl bg-[#073845]">
            <img
              src="/images/wave_engineering.jpg"
              alt="Bahrain Surf Park clean masterplan aerial photograph"
              className="w-full h-auto object-cover block rounded-2xl"
            />
            {ARCHITECTURAL_POINTS.map((pt) => (
              <div
                key={pt.num}
                style={{ left: `${pt.target.x}%`, top: `${pt.target.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <span className="w-2.5 h-2.5 block rounded-full bg-[#00C8C8] shadow-[0_0_8px_#00C8C8]" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {ARCHITECTURAL_POINTS.map((pt) => (
              <div
                key={pt.num}
                id={`mobile-card-${pt.num}`}
                className="mobile-card bg-[#073845]/90 border border-[#00C8C8]/25 rounded-xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-[#00C8C8]">
                    {pt.num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8C8]" />
                </div>
                <h3 className="font-sans text-xs font-bold text-[#F5F7F4] uppercase tracking-wider mb-1">
                  {pt.title}
                </h3>
                <p className="text-xs text-[#A8BDC3] font-sans leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
