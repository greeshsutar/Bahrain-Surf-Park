"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

const CURRICULUM_STEPS = [
  {
    num: "01",
    title: "ORIENTATION & LAGOON SAFETY",
    desc: "Mandatory 15-minute briefing covering lagoon orientation, safety protocols, wave generator timing, and water entry/exit positioning.",
  },
  {
    num: "02",
    title: "WATER CONFIDENCE & PADDLING",
    desc: "Board handling, paddling technique efficiency, stance alignment, and mastering wave catch timing in small, forgiving white water.",
  },
  {
    num: "03",
    title: "BOARD CONTROL & POP-UP",
    desc: "Perfecting pop-up mechanics, weight distribution, center of gravity, and riding smooth open-face waves with confidence.",
  },
  {
    num: "04",
    title: "RIDING THE WAVE FACE",
    desc: "Angled take-offs, trimming down the line, setting rail edges, and executing clean bottom and top turns across peeling walls.",
  },
  {
    num: "05",
    title: "CARVING & VIDEO ANALYTICS",
    desc: "Generating speed, carving cutbacks, re-entries, and fine-tuning technical body positioning using multi-angle video analysis.",
  },
];

export default function AcademyLearningJourney() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    if (isReducedMotion()) {
      gsap.set(".curric-anim", { opacity: 1, y: 0 });
      gsap.set(".curric-line-path", { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Text reveals
      gsap.fromTo(
        ".curric-anim",
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

      // 2. Continuous SVG line draw
      const linePath = lineRef.current;
      if (linePath) {
        const length = linePath.getTotalLength();
        gsap.set(linePath, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".curric-track-container",
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        });

        tl.to(linePath, { strokeDashoffset: 0, ease: "none" });

        CURRICULUM_STEPS.forEach((_, idx) => {
          tl.to(
            `#curric-node-${idx}`,
            {
              backgroundColor: "#00C8A0",
              borderColor: "#00C8A0",
              boxShadow: "0 0 16px rgba(0,200,160,0.6)",
              scale: 1.2,
              duration: 0.2,
            },
            idx / (CURRICULUM_STEPS.length - 1)
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="learning-journey"
      className="bg-[#061C27] text-white pt-24 sm:pt-32 pb-0 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left mb-20">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="curric-anim text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            THE ACADEMY CURRICULUM
          </span>

          <h2 className="curric-anim font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.08] mb-4">
            FROM FIRST PADDLE TO CONFIDENT RIDE<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="curric-anim text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Our structured progression framework breaks surf coaching down into clear, achievable stages — ensuring safety, rapid skill acquisition, and lasting confidence.
          </p>
        </div>

        {/* Continuous Journey Track */}
        <div className="curric-track-container relative">
          
          {/* Desktop SVG Line */}
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
                className="curric-line-path"
              />
            </svg>
          </div>

          {/* 5 Curriculum Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {CURRICULUM_STEPS.map((stg, idx) => {
              const isSelected = idx === activeStep;
              return (
                <div
                  key={stg.num}
                  onClick={() => setActiveStep(idx)}
                  className={`curric-anim rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#02141C] border-[#00C8A0] text-white shadow-2xl scale-[1.02]"
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
                        id={`curric-node-${idx}`}
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                          isSelected
                            ? "bg-[#00C8A0] border-[#00C8A0] shadow-[0_0_12px_#00C8A0]"
                            : "bg-white/20 border-white/40"
                        }`}
                      />
                    </div>

                    <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                      {stg.title}
                    </h3>

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

      {/* IMAGE BREAK: Full-Width Cinematic Parallax Moment */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden my-0">
        <img
          src="/images/academy_hero.jpg"
          alt="Surfer in ocean lagoon"
          className="w-full h-full object-cover object-center filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061C27]/90 via-[#061C27]/40 to-[#061C27]/80 flex items-center justify-center p-6 text-center">
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl drop-shadow-lg">
            PROGRESS FEELS DIFFERENT FOR EVERY SURFER<span className="text-[#00C8A0]">.</span>
          </h3>
        </div>
      </div>

      {/* Organic Wave Divider Transitioning into White Background */}
      <WaveDivider fill="#F7F6F1" />
    </section>
  );
}
