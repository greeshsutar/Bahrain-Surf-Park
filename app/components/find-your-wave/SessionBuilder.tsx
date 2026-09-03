"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface SessionBuilderProps {
  onOpenBooking: (tier?: string) => void;
}

const TIERS = [
  { level: "BEGINNER", height: "0.5 – 0.8m", code: "WAVE 01" },
  { level: "NOVICE", height: "0.8 – 1.2m", code: "WAVE 02" },
  { level: "PROGRESSIVE", height: "1.2 – 1.5m", code: "WAVE 03" },
  { level: "INTERMEDIATE", height: "1.5 – 1.8m", code: "WAVE 04" },
  { level: "EXPERT", height: "1.8 – 2.2m", code: "WAVE 05" },
];

const TYPES = [
  { id: "group", title: "GROUP SESSION", desc: "Shared session with max 12 surfers per reef bay." },
  { id: "private", title: "PRIVATE BAY RENTAL", desc: "Exclusive bay access with custom wave profile selection." },
];

const GEAR = [
  { id: "included", title: "STANDARD SOFT-TOP INCLUDED", desc: "Included at no extra charge with all bookings." },
  { id: "demo", title: "HIGH-PERFORMANCE DEMO FLEET", desc: "Upgrade to premium fiberglass shortboards & longboards on site." },
];

export default function SessionBuilder({ onOpenBooking }: SessionBuilderProps) {
  const [selectedTierIdx, setSelectedTierIdx] = useState<number>(2); // PROGRESSIVE default
  const [selectedTypeIdx, setSelectedTypeIdx] = useState<number>(0);
  const [selectedGearIdx, setSelectedGearIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activeTier = TIERS[selectedTierIdx];
  const activeType = TYPES[selectedTypeIdx];
  const activeGear = GEAR[selectedGearIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sb-anim",
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
      className="bg-[#F7F6F1] text-[#0A1926] py-16 sm:py-20 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-14 text-left">
          <span className="sb-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            SESSION BUILDER
          </span>

          <h2 className="sb-anim font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#0A1926] tracking-tight leading-[1.08] mb-4">
            BUILD YOUR SESSION<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="sb-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            Select your preferred wave level, session structure, and equipment setup to configure your session before booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          
          {/* Configurator Controls (7 cols) */}
          <div className="sb-anim lg:col-span-7 space-y-8">
            
            {/* Step 1: WAVE TIER */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-[#00C8A0] block mb-1">
                STEP 01
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0A1926] uppercase mb-4">
                SELECT WAVE LEVEL
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {TIERS.map((t, idx) => {
                  const isSelected = idx === selectedTierIdx;
                  return (
                    <button
                      key={t.level}
                      onClick={() => setSelectedTierIdx(idx)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061C27] text-white border-[#061C27] shadow-md font-bold scale-[1.02]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-[#00C8A0] block">{t.code}</span>
                      <span className="text-xs font-sans tracking-wide block uppercase">{t.level}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{t.height}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: SESSION TYPE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-[#00C8A0] block mb-1">
                STEP 02
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0A1926] uppercase mb-4">
                SELECT SESSION TYPE
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TYPES.map((type, idx) => {
                  const isSelected = idx === selectedTypeIdx;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedTypeIdx(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061C27] text-white border-[#061C27] shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-xs font-extrabold uppercase">{type.title}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-[#00C8A0]" : "bg-slate-300"}`} />
                      </div>
                      <p className={`text-xs leading-relaxed ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        {type.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: EQUIPMENT */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-[#00C8A0] block mb-1">
                STEP 03
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0A1926] uppercase mb-4">
                SELECT EQUIPMENT SETUP
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GEAR.map((g, idx) => {
                  const isSelected = idx === selectedGearIdx;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGearIdx(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061C27] text-white border-[#061C27] shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-xs font-extrabold uppercase">{g.title}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-[#00C8A0]" : "bg-slate-300"}`} />
                      </div>
                      <p className={`text-xs leading-relaxed ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        {g.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Summary Card (5 cols) */}
          <div className="sb-anim lg:col-span-5 bg-[#061C27] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
              <span className="text-xs font-extrabold text-[#00C8A0] uppercase tracking-widest">
                SESSION CONFIGURATION
              </span>
              <span className="text-[10px] font-mono text-slate-400">READY TO BOOK</span>
            </div>

            <div className="space-y-5 mb-8">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">
                  SELECTED WAVE
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl font-bold text-white uppercase">{activeTier.level}</span>
                  <span className="font-mono text-xs font-bold text-[#00C8A0]">{activeTier.height}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">
                  SESSION FORMAT
                </span>
                <span className="font-sans text-sm font-bold text-white uppercase block">{activeType.title}</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">
                  EQUIPMENT
                </span>
                <span className="font-sans text-sm font-bold text-white uppercase block">{activeGear.title}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking(activeTier.level)}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="w-full bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>BOOK YOUR {activeTier.level} SESSION</span>
              <span className="text-sm font-normal">→</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
