"use client";

import { useState } from "react";

const STAGES = [
  { level: "BEGINNER", title: "01. Whitewater Control", desc: "Building confidence, standing up consistently, and mastering soft beach breaks." },
  { level: "NOVICE", title: "02. Open-Face Takeoffs", desc: "Angle takeoffs, trimming along open faces, and understanding timing." },
  { level: "PROGRESSIVE", title: "03. Flow & Turn Execution", desc: "Generating speed, waist-high peeling waves, and carving clean bottom turns." },
  { level: "INTERMEDIATE", title: "04. Speed & Maneuvers", desc: "Chest-high wall, practicing cutbacks, re-entries, and carving with power." },
  { level: "ADVANCED", title: "05. Heavy Barrels", desc: "Head-high barreling reefs, high-line speed runs, and technical tube riding." },
];

export default function WaveProgression() {
  const [activeStage, setActiveStage] = useState<number>(2);

  return (
    <section className="bg-[#082F3D] text-white py-20 sm:py-28 relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
          THE PROGRESSION SYSTEM
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
          START HERE. GO ANYWHERE.
        </h2>

        <p className="text-white/80 text-sm sm:text-base font-sans max-w-xl mb-16">
          Surfing is a lifelong journey. Our calibrated lagoon allows you to step onto the wave line exactly where you are and progress at your own pace.
        </p>

        {/* Organic Wave-Shaped SVG Progression Timeline */}
        <div className="relative mb-12">
          {/* Logo-inspired SVG Wave Curve Path */}
          <div className="w-full overflow-hidden mb-8">
            <svg className="w-full h-[80px]" viewBox="0 0 1000 80" fill="none" preserveAspectRatio="none">
              <path
                d="M 0,50 Q 250,10 500,50 T 1000,50"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="4"
              />
              <path
                d="M 0,50 Q 250,10 500,50 T 1000,50"
                stroke="#00C8A0"
                strokeWidth="4"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (activeStage + 1) * 200}
                className="transition-all duration-700 ease-out"
              />
            </svg>
          </div>

          {/* 5 Stage Node Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-left">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.level}
                onClick={() => setActiveStage(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  idx === activeStage
                    ? "bg-[#00C8A0]/15 border-[#00C8A0] text-white shadow-lg"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${idx === activeStage ? "text-[#00C8A0]" : "text-white/50"}`}>
                    STAGE 0{idx + 1}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${idx <= activeStage ? "bg-[#00C8A0]" : "bg-white/20"}`}></span>
                </div>
                
                <h4 className="font-serif text-lg font-bold mb-1 text-white">{stage.level}</h4>
                <p className="text-[11px] text-white/70 leading-relaxed font-sans line-clamp-3">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
