"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface AcademyLevelSelectorProps {
  onOpenBooking: (tier?: string) => void;
}

const LEVELS = [
  {
    id: "beginner",
    badge: "LEVEL 01 – 02",
    title: "BEGINNER",
    subtitle: "Water Confidence & Pop-Up Mechanics",
    desc: "Designed for first-timers and early beginners. Learn essential ocean safety, board handling, stance, and pop-up technique in gentle white water and soft rolling waves under close instructor guidance.",
    img: "/images/tier1.jpg",
    height: "0.5 – 0.8m",
    board: "Soft-top Longboard",
    focus: ["Safety Briefing & Lagoon Entry", "Paddling Technique & Stance", "Consistent Pop-Up Control", "Instructor In-Water Support"],
  },
  {
    id: "intermediate",
    badge: "LEVEL 03 – 04",
    title: "INTERMEDIATE",
    subtitle: "Open Face Trimming & Carving Turns",
    desc: "For surfers ready to catch open-face waist to chest-high waves. Focus on angled take-offs, generating speed down the line, bottom turns, cutbacks, and rail-to-rail transitions.",
    img: "/images/tier3.jpg",
    height: "1.2 – 1.8m",
    board: "Fish / Shortboard",
    focus: ["Angled Take-Offs & Speed Generation", "Clean Bottom & Top Turns", "Cutback Mechanics", "Video Analytics Feedback"],
  },
  {
    id: "advanced",
    badge: "LEVEL 05",
    title: "ADVANCED",
    subtitle: "Tube Riding & Technical Maneuvers",
    desc: "Engineered for experienced surfers mastering steep drops, heavy barrels, and high-line maneuvers. Fine-tune your speed positioning and barrel technique with multi-angle video analysis.",
    img: "/images/expertsurf.png",
    height: "1.8 – 2.2m",
    board: "Performance Step-Up",
    focus: ["Steep Drop Positioning", "High-Line Speed Runs", "Deep Tube Riding & Barrel Vision", "Frame-by-Frame Video Analytics"],
  },
];

export default function AcademyLevelSelector({ onOpenBooking }: AcademyLevelSelectorProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeLevel = LEVELS[activeIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".acad-level-anim",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: MOTION.STAGGER,
          ease: MOTION.ENTRANCE_EASE,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="academy-levels"
      className="bg-[#F7F6F1] text-[#0A1926] py-16 sm:py-20 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="acad-level-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            FIND YOUR LEVEL
          </span>

          <h2 className="acad-level-anim font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-4">
            FIND YOUR LEVEL<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="acad-level-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            Every surfer starts somewhere. Find the right starting point and progress at your own pace with structured coaching curriculum.
          </p>
        </div>

        {/* Level Navigation Tabs (Chapter Style) */}
        <div className="acad-level-anim flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-slate-200">
          {LEVELS.map((lvl, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={lvl.id}
                onClick={() => setActiveIdx(idx)}
                className={`py-3 px-6 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#061C27] text-white border-[#061C27] shadow-lg scale-[1.02]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                <span className="text-[10px] text-[#00C8A0] font-mono block mb-0.5">{lvl.badge}</span>
                <span>{lvl.title}</span>
              </button>
            );
          })}
        </div>

        {/* Large Interactive Editorial Composition */}
        <div className="acad-level-anim bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Image Visual (approx 55% width) */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <img
                  src={activeLevel.img}
                  alt={`${activeLevel.title} surf coaching`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061C27]/75 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C8A0] bg-[#061C27]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {activeLevel.badge} • WAVE HT: {activeLevel.height}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Information & Focus List (approx 45% width) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-extrabold text-[#0B7FB5] tracking-[0.2em] uppercase block mb-1">
                  {activeLevel.subtitle}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1926] uppercase tracking-tight mb-4">
                  {activeLevel.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                  {activeLevel.desc}
                </p>

                {/* Key Focus Checklist */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                    CURRICULUM FOCUS POINTS:
                  </span>
                  {activeLevel.focus.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs font-sans text-[#0A1926] font-bold">
                      <span className="w-4 h-4 rounded-full bg-[#00C8A0]/15 text-[#00C8A0] flex items-center justify-center text-[10px] shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onOpenBooking(activeLevel.title)}
                  onMouseMove={handleMagneticMouseMove}
                  onMouseLeave={handleMagneticMouseLeave}
                  className="w-full sm:w-auto bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>BOOK {activeLevel.title} PROGRAM</span>
                  <span className="text-sm">→</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
