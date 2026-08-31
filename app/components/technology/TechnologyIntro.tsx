"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechnologyEngineeringMedia from "./TechnologyEngineeringMedia";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

export default function TechnologyIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reduced = isReducedMotion();

    // 1-Pass Sequential Entrance Timeline (Phases 1-7, triggers ONCE on viewport enter)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
      defaults: { ease: MOTION.ENTRANCE_EASE, duration: MOTION.ENTRANCE_DURATION },
    });

    if (!reduced) {
      // Phase 1 & 2: Background & Eyebrow (0.0s - 0.8s)
      tl.fromTo(
        ".intro-phase-eyebrow",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        // Phase 3: Headline (0.5s - 1.1s)
        .fromTo(
          ".intro-phase-headline",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        // Phase 4: Paragraphs (0.8s - 1.4s)
        .fromTo(
          ".intro-phase-body",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        // Phase 5: Metrics Readout (1.0s - 1.6s)
        .fromTo(
          ".intro-phase-metrics",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        // Phase 6: Media Video Scale/Fade (0.8s - 1.5s)
        .fromTo(
          ".intro-phase-media",
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          "-=1.1"
        )
        // Phase 7: CTA & Status Activation (1.4s - 2.0s)
        .fromTo(
          ".intro-phase-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    } else {
      gsap.set(
        [
          ".intro-phase-eyebrow",
          ".intro-phase-headline",
          ".intro-phase-body",
          ".intro-phase-metrics",
          ".intro-phase-media",
          ".intro-phase-cta",
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
    }

    // Phase 5 count-up numbers tween
    const countObj = { val1: 0, val2: 0, val3: 0 };
    const counterTween = gsap.to(countObj, {
      val1: 1000,
      val2: 20,
      val3: 90,
      duration: reduced ? 0 : 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
      onUpdate: () => {
        if (stat1Ref.current) stat1Ref.current.textContent = Math.floor(countObj.val1).toLocaleString();
        if (stat2Ref.current) stat2Ref.current.textContent = `${Math.floor(countObj.val2)}+`;
        if (stat3Ref.current) stat3Ref.current.textContent = Math.floor(countObj.val3).toString();
      },
    });

    return () => {
      tl.kill();
      counterTween.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="tech-section-01"
      className="relative bg-[#F0EEE7] text-[#0A1926] pt-24 sm:pt-32 pb-32 sm:pb-40 z-10 overflow-hidden"
    >
      {/* 1. Hydrodynamic Contour Blueprint Lines & Ambient Soft Teal Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Engineering Blueprint Water-Flow SVG */}
        <svg
          className="absolute top-0 left-0 w-[140%] h-full opacity-[0.07]"
          viewBox="0 0 1800 900"
          fill="none"
          stroke="#0B7FB5"
          strokeWidth="1.2"
        >
          <path d="M-100,100 C200,80 500,240 900,190 C1300,140 1600,290 1900,240" strokeDasharray="4 4" />
          <path d="M-100,220 C180,200 480,380 880,310 C1280,250 1580,410 1900,360" />
          <path d="M-100,340 C160,320 460,500 860,430 C1260,360 1560,530 1900,480" strokeDasharray="6 6" />
          <path d="M-100,460 C140,440 440,630 840,550 C1240,470 1540,650 1900,600" />
        </svg>

        {/* Soft Atmospheric Teal Glow behind Right Media Area */}
        <div className="absolute top-1/4 right-5 w-[600px] h-[600px] bg-[#00C8A0]/[0.09] rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Engineering Narrative (approx 40% width) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            
            {/* Technical Number & Eyebrow */}
            <div className="intro-phase-eyebrow flex items-center gap-3 mb-3">
              <span className="font-sans text-xs font-extrabold text-[#0B7FB5] tracking-widest">
                01
              </span>
              <span className="w-8 h-[1.5px] bg-[#00C8A0]"></span>
              <span className="font-sans text-[#0B7FB5] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                WAVEGARDEN COVE® ENGINEERING
              </span>
            </div>

            {/* Headline: Refined & Controlled Editorial Serif (target 52-64px desktop) */}
            <h2 className="intro-phase-headline font-serif text-[clamp(32px,4.2vw,60px)] font-bold text-[#0A1926] tracking-tight leading-[1.06] mb-6">
              THE PHYSICS OF<br />PERFECTION
            </h2>

            {/* Paragraph 1 */}
            <p className="intro-phase-body text-slate-700 text-sm sm:text-base leading-relaxed font-sans max-w-xl mb-4">
              Our lagoon is powered by a 52-module Wavegarden Cove® technology system, capable of generating up to 1,000 ocean-like waves per hour. Each wave profile is programmatically controlled to modify height, speed, and shape in real time.
            </p>

            {/* Paragraph 2 */}
            <p className="intro-phase-body text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl mb-8">
              Through custom hydrodynamic modules, we optimize energy usage while delivering precise wave geometries. This creates a consistent and highly customizable surfing environment.
            </p>

            {/* Refined Horizontal Engineering Metrics Readout */}
            <div className="intro-phase-metrics grid grid-cols-3 gap-3 py-4 border-y border-slate-300/80 mb-8">
              
              {/* Metric 01: Waves / Hour */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0]"></span>
                  <span className="font-sans text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-[#0B7FB5]">
                    WAVES / HR
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wide text-slate-500">up to</span>
                  <span ref={stat1Ref} className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1926] tracking-tight">
                    1,000+
                  </span>
                </div>
              </div>

              {/* Metric 02: Wave Profiles */}
              <div className="flex flex-col text-left border-l border-slate-300/80 pl-3">
                <div className="flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0]"></span>
                  <span className="font-sans text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-[#0B7FB5]">
                    PROFILES
                  </span>
                </div>
                <div className="my-0.5">
                  <span ref={stat2Ref} className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1926] tracking-tight">
                    20+
                  </span>
                </div>
              </div>

              {/* Metric 03: Surfers Capacity */}
              <div className="flex flex-col text-left border-l border-slate-300/80 pl-3">
                <div className="flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0]"></span>
                  <span className="font-sans text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-[#0B7FB5]">
                    CAPACITY
                  </span>
                </div>
                <div className="my-0.5">
                  <span ref={stat3Ref} className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1926] tracking-tight">
                    90
                  </span>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <div className="intro-phase-cta">
              <a
                href="#tech-section-02"
                onClick={(e) => handleNavClick(e, "#tech-section-02")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="inline-flex items-center gap-2.5 bg-[#0B7FB5] hover:bg-[#0A1926] text-white px-7 py-3.5 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-md transition-all cursor-pointer"
              >
                <span>EXPLORE WAVE TIERS</span>
                <span className="text-sm font-normal">→</span>
              </a>
            </div>

          </div>

          {/* Right Column: Immersive Wave System Media & Interactive HUD (approx 55-60% width) */}
          <div className="intro-phase-media lg:col-span-7">
            <TechnologyEngineeringMedia />
          </div>

        </div>
      </div>

      {/* Visual Transition into Section 02 (#tech-section-02 WaveCreation): Hydrodynamic Wave Contour */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[70px] sm:h-[90px] pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        <svg
          className="w-full h-full block"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 60 C 240 100, 480 30, 720 70 C 960 110, 1200 40, 1440 80 L 1440 125 L 0 125 Z"
            fill="#02141C"
          />
          <path
            d="M 0 60 C 240 100, 480 30, 720 70 C 960 110, 1200 40, 1440 80"
            fill="none"
            stroke="#00C8A0"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="6 4"
          />
        </svg>
      </div>
    </section>
  );
}
