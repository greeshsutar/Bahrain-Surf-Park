"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const PROGRESSION_STAGES = [
  {
    num: "01",
    level: "BEGINNER",
    title: "FIRST SESSION",
    sub: "Whitewater Control",
    desc: "Building confidence, standing up consistently, and mastering soft beach breaks with in-water instructor support.",
  },
  {
    num: "02",
    level: "NOVICE",
    title: "BUILD CONFIDENCE",
    sub: "Open-Face Takeoffs",
    desc: "Angled takeoffs, trimming along soft open faces, and developing board control and wave timing.",
  },
  {
    num: "03",
    level: "PROGRESSIVE",
    title: "FIND YOUR FLOW",
    sub: "Flow & Turn Execution",
    desc: "Generating speed on waist-high peeling waves, refining take-offs, and carving clean bottom turns.",
  },
  {
    num: "04",
    level: "INTERMEDIATE",
    title: "PUSH YOUR LIMITS",
    sub: "Speed & Maneuvers",
    desc: "Chest-high wall, practicing cutbacks, re-entries, and linking turns together with speed, power, and flow.",
  },
  {
    num: "05",
    level: "EXPERT",
    title: "MASTER THE BARREL",
    sub: "Heavy Barrels & Tubes",
    desc: "Head-high barreling reefs, high-line speed runs, and technical tube riding on steep drops.",
  },
];

export default function WaveProgressionTimeline() {
  const [activeStage, setActiveStage] = useState<number>(2);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    if (isReducedMotion()) {
      gsap.set(".progression-anim", { opacity: 1, y: 0 });
      gsap.set(".progression-line-path", { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Text reveals
      gsap.fromTo(
        ".progression-anim",
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

      // 2. Line Draw & Stage Node activations
      const linePath = lineRef.current;
      if (linePath) {
        const length = linePath.getTotalLength();
        gsap.set(linePath, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".progression-track-container",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });

        tl.to(linePath, { strokeDashoffset: 0, ease: "none" });

        PROGRESSION_STAGES.forEach((_, idx) => {
          tl.to(
            `#prog-node-${idx}`,
            {
              backgroundColor: "#00C8A0",
              borderColor: "#00C8A0",
              boxShadow: "0 0 16px rgba(0,200,160,0.6)",
              scale: 1.2,
              duration: 0.2,
            },
            idx / (PROGRESSION_STAGES.length - 1)
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="wave-progression"
      className="bg-[#082F3D] text-white py-24 sm:py-32 relative z-10 overflow-hidden border-b border-white/10"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C8A0]/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="progression-anim text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            THE PROGRESSION SYSTEM
          </span>

          <h2 className="progression-anim font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.08] mb-4">
            PROGRESS AT YOUR OWN PACE<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="progression-anim text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
            Surfing is a lifelong journey. Our calibrated lagoon allows you to step onto the wave line exactly where you are and progress at your own pace.
          </p>
        </div>

        {/* Scroll-Driven Horizontal Progress Line & Stages Grid */}
        <div className="progression-track-container relative">
          
          {/* Continuous Desktop SVG Connecting Line */}
          <div className="hidden sm:block relative w-full h-8 mb-6 overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1000 32" fill="none" preserveAspectRatio="none">
              <path
                d="M 0 16 L 1000 16"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="3"
              />
              <path
                ref={lineRef}
                d="M 0 16 L 1000 16"
                stroke="#00C8A0"
                strokeWidth="3.5"
                className="progression-line-path"
              />
            </svg>
          </div>

          {/* 5 Progression Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {PROGRESSION_STAGES.map((stg, idx) => {
              const isSelected = idx === activeStage;
              return (
                <div
                  key={stg.level}
                  onClick={() => setActiveStage(idx)}
                  className={`progression-anim rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#061C27] border-[#00C8A0] text-white shadow-2xl scale-[1.02]"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#00C8A0]">
                        STAGE {stg.num}
                      </span>
                      
                      {/* Node Dot */}
                      <div
                        id={`prog-node-${idx}`}
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                          isSelected
                            ? "bg-[#00C8A0] border-[#00C8A0] shadow-[0_0_12px_#00C8A0]"
                            : "bg-white/20 border-white/40"
                        }`}
                      />
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white mb-0.5">
                      {stg.title}
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-3">
                      {stg.sub}
                    </span>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {stg.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
