"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface AcademySessionBuilderProps {
  onOpenBooking: (tier?: string) => void;
}

const PROGRAMS = [
  { id: "group", title: "GROUP LESSONS", desc: "High-energy coaching in small group formats (max 6 surfers per coach)." },
  { id: "private", title: "PRIVATE COACHING", desc: "Dedicated 1-on-1 personalized instruction with video analytics option." },
];

const SKILL_LEVELS = [
  { id: "beginner", title: "BEGINNER (LEVEL 01-02)", height: "0.5 – 0.8m" },
  { id: "intermediate", title: "INTERMEDIATE (LEVEL 03-04)", height: "1.2 – 1.8m" },
  { id: "advanced", title: "ADVANCED (LEVEL 05)", height: "1.8 – 2.2m" },
];

const GEAR_OPTIONS = [
  { id: "included", title: "STANDARD SOFT-TOP INCLUDED", desc: "Included at no extra charge with all lesson bookings." },
  { id: "demo", title: "HIGH-PERFORMANCE DEMO FLEET", desc: "Upgrade to premium fiberglass shortboards & longboards." },
];

export default function AcademySessionBuilder({ onOpenBooking }: AcademySessionBuilderProps) {
  const [selectedProgIdx, setSelectedProgIdx] = useState<number>(0);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);
  const [selectedGearIdx, setSelectedGearIdx] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);

  const activeProg = PROGRAMS[selectedProgIdx];
  const activeLevel = SKILL_LEVELS[selectedLevelIdx];
  const activeGear = GEAR_OPTIONS[selectedGearIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".acad-sb-anim",
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
      id="session-builder"
      className="bg-[#0A1926] text-white py-16 sm:py-20 relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-14 text-left">
          <span className="acad-sb-anim text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            ACADEMY PROGRAM SELECTOR
          </span>

          <h2 className="acad-sb-anim font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.08] mb-4">
            BUILD YOUR SESSION<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="acad-sb-anim text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Configure your lesson structure, skill level, and surfboard preference before reserving your session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          
          {/* Controls (7 cols) */}
          <div className="acad-sb-anim lg:col-span-7 space-y-8">
            
            {/* Step 1: PROGRAM FORMAT */}
            <div className="bg-[#061C27] border border-white/10 rounded-2xl p-6 shadow-xl">
              <span className="text-[10px] font-mono font-bold text-[#00C8A0] block mb-1">
                STEP 01
              </span>
              <h3 className="font-serif text-lg font-bold text-white uppercase mb-4">
                SELECT PROGRAM FORMAT
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROGRAMS.map((p, idx) => {
                  const isSelected = idx === selectedProgIdx;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProgIdx(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#00C8A0] text-[#061C27] border-[#00C8A0] shadow-md font-bold"
                          : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-xs font-extrabold uppercase">{p.title}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-[#061C27]" : "bg-white/20"}`} />
                      </div>
                      <p className={`text-xs leading-relaxed ${isSelected ? "text-[#061C27]/90 font-medium" : "text-slate-400"}`}>
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: SKILL LEVEL */}
            <div className="bg-[#061C27] border border-white/10 rounded-2xl p-6 shadow-xl">
              <span className="text-[10px] font-mono font-bold text-[#00C8A0] block mb-1">
                STEP 02
              </span>
              <h3 className="font-serif text-lg font-bold text-white uppercase mb-4">
                SELECT SKILL LEVEL
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SKILL_LEVELS.map((lvl, idx) => {
                  const isSelected = idx === selectedLevelIdx;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setSelectedLevelIdx(idx)}
                      className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#00C8A0] text-[#061C27] border-[#00C8A0] shadow-md font-bold scale-[1.02]"
                          : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-[9px] font-mono uppercase block mb-0.5 opacity-80">LEVEL 0{idx + 1}</span>
                      <span className="text-xs font-sans tracking-wide block uppercase">{lvl.title}</span>
                      <span className="text-[10px] block opacity-70 mt-1">Wave HT: {lvl.height}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: EQUIPMENT */}
            <div className="bg-[#061C27] border border-white/10 rounded-2xl p-6 shadow-xl">
              <span className="text-[10px] font-mono font-bold text-[#00C8A0] block mb-1">
                STEP 03
              </span>
              <h3 className="font-serif text-lg font-bold text-white uppercase mb-4">
                SELECT EQUIPMENT SETUP
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GEAR_OPTIONS.map((g, idx) => {
                  const isSelected = idx === selectedGearIdx;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGearIdx(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#00C8A0] text-[#061C27] border-[#00C8A0] shadow-md font-bold"
                          : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-xs font-extrabold uppercase">{g.title}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-[#061C27]" : "bg-white/20"}`} />
                      </div>
                      <p className={`text-xs leading-relaxed ${isSelected ? "text-[#061C27]/90 font-medium" : "text-slate-400"}`}>
                        {g.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Summary Panel (5 cols) */}
          <div className="acad-sb-anim lg:col-span-5 bg-[#02141C] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/15 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
              <span className="text-xs font-extrabold text-[#00C8A0] uppercase tracking-widest">
                LESSON CONFIGURATION
              </span>
              <span className="text-[10px] font-mono text-slate-400">READY TO BOOK</span>
            </div>

            <div className="space-y-5 mb-8">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">
                  PROGRAM FORMAT
                </span>
                <span className="font-serif text-xl font-bold text-white uppercase block">{activeProg.title}</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">
                  SELECTED LEVEL
                </span>
                <span className="font-sans text-sm font-bold text-[#00C8A0] uppercase block">{activeLevel.title}</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">
                  EQUIPMENT SETUP
                </span>
                <span className="font-sans text-sm font-bold text-white uppercase block">{activeGear.title}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking(activeProg.title)}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="w-full bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>START YOUR JOURNEY NOW</span>
              <span className="text-sm font-normal">→</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
