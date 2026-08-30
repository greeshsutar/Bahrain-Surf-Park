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
      <style>{`
        .wave-light-stroke {
          stroke-dasharray: 250 1000;
          stroke-dashoffset: 250;
          animation: waveTravel 5s linear infinite;
          filter: drop-shadow(0 0 6px rgba(0, 200, 160, 0.75));
          will-change: stroke-dashoffset;
        }

        @keyframes waveTravel {
          0% {
            stroke-dashoffset: 250;
            opacity: 0.85;
          }
          50% {
            stroke-dashoffset: -375;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -1000;
            opacity: 0.85;
          }
        }

        .stage-3-pulse {
          animation: stage3Glow 5s linear infinite;
        }

        @keyframes stage3Glow {
          0%, 35%, 65%, 100% {
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            border-color: rgba(0, 200, 160, 0.7);
          }
          48%, 52% {
            box-shadow: 0 0 20px rgba(0, 200, 160, 0.45);
            border-color: #00E5B3;
          }
        }

        .dot-pulse {
          animation: dotGlow 5s linear infinite;
        }

        @keyframes dotGlow {
          0%, 35%, 65%, 100% {
            transform: scale(1);
            box-shadow: none;
          }
          48%, 52% {
            transform: scale(1.35);
            box-shadow: 0 0 10px #00C8A0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wave-light-stroke {
            animation: none !important;
            stroke-dasharray: 600 1000 !important;
            stroke-dashoffset: 0 !important;
            filter: none !important;
          }
          .stage-3-pulse,
          .dot-pulse {
            animation: none !important;
          }
        }
      `}</style>

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
              {/* 1. Muted Base Track Path */}
              <path
                d="M 0,50 Q 250,10 500,50 T 1000,50"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="4"
                pathLength="1000"
                strokeLinecap="round"
              />

              {/* 2. Bright Bahrain Surf Park Aqua Animated Traveling Segment */}
              <path
                d="M 0,50 Q 250,10 500,50 T 1000,50"
                stroke="#00C8A0"
                strokeWidth="4"
                pathLength="1000"
                strokeLinecap="round"
                className="wave-light-stroke"
              />
            </svg>
          </div>

          {/* 5 Stage Node Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-left">
            {STAGES.map((stage, idx) => {
              const isSelected = idx === activeStage;
              const isStage3Active = idx === 2 && activeStage === 2;

              return (
                <div
                  key={stage.level}
                  onClick={() => setActiveStage(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? `bg-[#00C8A0]/15 border-[#00C8A0] text-white shadow-lg ${
                          isStage3Active ? "stage-3-pulse" : ""
                        }`
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest ${
                        isSelected ? "text-[#00C8A0]" : "text-white/50"
                      }`}
                    >
                      STAGE 0{idx + 1}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx <= activeStage ? "bg-[#00C8A0]" : "bg-white/20"
                      } ${isStage3Active ? "dot-pulse" : ""}`}
                    ></span>
                  </div>

                  <h4 className="font-serif text-lg font-bold mb-1 text-white">{stage.level}</h4>
                  <p className="text-[11px] text-white/70 leading-relaxed font-sans line-clamp-3">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
