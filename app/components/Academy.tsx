"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

const PROGRESSION_LEVELS = [
  { id: "beginner", label: "BEGINNER", desc: "Pop-ups & Safety Basics", badge: "LEVEL 01" },
  { id: "novice", label: "NOVICE", desc: "Board Control & Open Face", badge: "LEVEL 02" },
  { id: "progressive", label: "PROGRESSIVE", desc: "Trimming & Take-offs", badge: "LEVEL 03" },
  { id: "intermediate", label: "INTERMEDIATE", desc: "Speed & Carving Turns", badge: "LEVEL 04" },
  { id: "advanced", label: "ADVANCED", desc: "Tube-Riding & Video Analytics", badge: "LEVEL 05" },
];

export default function Academy() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);
  const [activeStep, setActiveStep] = useState<number>(2); // Default to Level 03 PROGRESSIVE

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const reduced = isReducedMotion();

    if (!reduced) {
      const animElements = section.querySelectorAll(".academy-animate");
      gsap.fromTo(
        animElements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          stagger: MOTION.STAGGER,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      const animElements = section.querySelectorAll(".academy-animate");
      gsap.set(animElements, { opacity: 1, y: 0 });
    }

    return () => {
      ScrollTrigger.getAll().filter((st) => st.trigger === section).forEach((st) => st.kill());
    };
  }, []);

  // Update travelling node position on progression track when active step changes
  useEffect(() => {
    if (isReducedMotion() || !pathRef.current || !nodeRef.current) return;
    const path = pathRef.current;
    const node = nodeRef.current;
    const length = path.getTotalLength();
    const targetProgress = activeStep / (PROGRESSION_LEVELS.length - 1);

    const point = path.getPointAtLength(targetProgress * length);
    gsap.to(node, {
      cx: point.x,
      cy: point.y,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [activeStep]);

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
      id="academy"
      className="relative w-full py-20 sm:py-28 bg-[#0A1926] text-white overflow-hidden z-10"
    >
      {/* Dark Ocean Photographic Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/create_a_video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1926] via-[#0A1926]/90 to-transparent z-0"></div>

      {/* Asymmetric Content & Progression Journey */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative & Specs */}
          <div className="lg:col-span-6 text-left">
            
            {/* Eyebrow Tag */}
            <span className="academy-animate text-[#00C8A0] text-xs font-extrabold tracking-[0.2em] uppercase mb-4 block">
              CLUB HAWAII SURF ACADEMY
            </span>

            {/* Headline */}
            <h2 className="academy-animate font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] mb-6">
              Master the Waves with <span className="italic font-normal text-[#00C8A0]">World-Class Coaching</span>
            </h2>

            {/* Body Copy */}
            <p className="academy-animate text-white/80 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              From first-time pop-ups to advanced video analysis and tube-riding technique, our ISA-certified coaches deliver tailored 1-on-1 and group progression programs.
            </p>

            {/* Asymmetric Specs Grid */}
            <div className="academy-animate grid grid-cols-2 gap-6 py-6 border-y border-white/15 mb-8">
              <div>
                <span className="text-xs uppercase font-bold text-[#00C8A0] tracking-wider block mb-1">ISA-Certified</span>
                <span className="text-sm font-semibold text-white/90">Professional Master Coaches</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#00C8A0] tracking-wider block mb-1">Video Analytics</span>
                <span className="text-sm font-semibold text-white/90">Multi-Angle Technique Review</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="academy-animate">
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="inline-flex items-center gap-2.5 bg-[#0B7FB5] hover:bg-[#0077B6] text-white px-8 py-4 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-xl transition-all cursor-pointer"
              >
                <span>EXPLORE ACADEMY COACHING</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Progression Journey Track */}
          <div className="academy-animate lg:col-span-6 flex flex-col justify-center">
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/15">
                <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#00C8A0]">
                  PROGRESSION JOURNEY TRACK
                </span>
                <span className="text-[11px] font-mono text-white/60">
                  {PROGRESSION_LEVELS[activeStep].badge}
                </span>
              </div>

              {/* Hydrodynamic Progression SVG Track Line */}
              <div className="relative w-full mb-6">
                <svg
                  className="w-full h-12 block"
                  viewBox="0 0 500 50"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="progGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00C8A0" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0B7FB5" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="progGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00C8A0" floodOpacity="0.9" />
                    </filter>
                  </defs>

                  {/* Base Track Path */}
                  <path
                    ref={pathRef}
                    d="M 20 25 C 130 5, 260 45, 370 15 C 430 30, 460 20, 480 25"
                    fill="none"
                    stroke="url(#progGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Travelling Wave Marker Node */}
                  <circle
                    ref={nodeRef}
                    cx="250"
                    cy="25"
                    r="6"
                    fill="#00C8A0"
                    filter="url(#progGlow)"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              {/* Interactive Step Items */}
              <div className="space-y-3">
                {PROGRESSION_LEVELS.map((lvl, index) => {
                  const isActive = index === activeStep;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setActiveStep(index)}
                      className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-[#00C8A0]/15 border-[#00C8A0] text-white shadow-md translate-x-1"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center ${
                            isActive
                              ? "bg-[#00C8A0] text-[#0A1926]"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {lvl.label}
                          </span>
                          <span className="text-[11px] text-white/60 font-sans">
                            {lvl.desc}
                          </span>
                        </div>
                      </div>

                      {isActive && (
                        <span className="text-[#00C8A0] text-xs font-extrabold uppercase tracking-widest animate-pulse">
                          ACTIVE
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
