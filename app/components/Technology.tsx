"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDivider from "./WaveDivider";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const oceanVideoContainerRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reduced = isReducedMotion();

    // 1. Bottom Ocean Video Background Parallax Depth
    let videoParallax: gsap.core.Tween | null = null;
    if (oceanVideoContainerRef.current && !reduced) {
      videoParallax = gsap.to(oceanVideoContainerRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // 2. Canonical Entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: MOTION.ENTRANCE_EASE, duration: MOTION.ENTRANCE_DURATION },
    });

    if (!reduced) {
      tl.fromTo(
        ".tech-eyebrow",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: MOTION.ENTRANCE_DURATION }
      )
        .fromTo(
          ".tech-heading",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: MOTION.ENTRANCE_DURATION },
          `-=${MOTION.ENTRANCE_DURATION - MOTION.STAGGER * 3}`
        )
        .fromTo(
          ".tech-body",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: MOTION.ENTRANCE_DURATION },
          `-=${MOTION.ENTRANCE_DURATION - MOTION.STAGGER * 3}`
        )
        .fromTo(
          ".tech-stat-item",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: MOTION.ENTRANCE_DURATION, stagger: MOTION.STAGGER },
          `-=${MOTION.ENTRANCE_DURATION - MOTION.STAGGER * 3}`
        )
        .fromTo(
          ".tech-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: MOTION.ENTRANCE_DURATION },
          `-=${MOTION.ENTRANCE_DURATION - MOTION.STAGGER * 3}`
        )
        .fromTo(
          ".tech-media-container",
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: MOTION.ENTRANCE_DURATION },
          `-=${MOTION.ENTRANCE_DURATION - MOTION.STAGGER * 2}`
        )
        .fromTo(
          ".tech-status-pill",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: MOTION.ENTRANCE_DURATION },
          `-=${MOTION.ENTRANCE_DURATION - MOTION.STAGGER * 3}`
        );
    } else {
      gsap.set(
        [
          ".tech-eyebrow",
          ".tech-heading",
          ".tech-body",
          ".tech-stat-item",
          ".tech-cta",
          ".tech-media-container",
          ".tech-status-pill",
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
    }

    // 3. Animated count-up counter for technical numbers
    const countObj = { val1: 0, val2: 0, val3: 0 };

    const counterTween = gsap.to(countObj, {
      val1: 1000,
      val2: 20,
      val3: 90,
      duration: reduced ? 0 : 2.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
      onUpdate: () => {
        if (stat1Ref.current) {
          stat1Ref.current.textContent = Math.floor(countObj.val1).toLocaleString();
        }
        if (stat2Ref.current) {
          stat2Ref.current.textContent = `${Math.floor(countObj.val2)}+`;
        }
        if (stat3Ref.current) {
          stat3Ref.current.textContent = Math.floor(countObj.val3).toString();
        }
      },
    });

    return () => {
      tl.kill();
      counterTween.kill();
      if (videoParallax) videoParallax.kill();
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
      id="technology"
      className="relative bg-[#F7F7F3] text-[#0A1926] pt-14 sm:pt-16 lg:pt-18 pb-14 sm:pb-16 lg:pb-18 z-10 overflow-hidden"
    >
      {/* Background Subtle Flowing Ocean Contour Lines & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute top-0 left-0 w-[140%] h-full opacity-[0.06] animate-[flowContour_24s_linear_infinite]"
          viewBox="0 0 1800 900"
          fill="none"
          stroke="#0B7FB5"
          strokeWidth="1.2"
        >
          <path d="M-100,100 C200,80 500,240 900,190 C1300,140 1600,290 1900,240" />
          <path d="M-100,220 C180,200 480,380 880,310 C1280,250 1580,410 1900,360" />
          <path d="M-100,340 C160,320 460,500 860,430 C1260,360 1560,530 1900,480" />
          <path d="M-100,460 C140,440 440,630 840,550 C1240,470 1540,650 1900,600" />
        </svg>

        {/* Ambient Atmospheric Turquoise Glow behind right media block */}
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#00C8A0]/[0.06] rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Engineering Narrative & Clean Divider Stats */}
          <div className="lg:col-span-6 text-left">
            
            {/* Eyebrow */}
            <div className="tech-eyebrow mb-2">
              <span className="text-[#0B7FB5] text-[12px] sm:text-[13px] font-bold tracking-[0.22em] uppercase block">
                WAVEGARDEN COVE® ENGINEERING
              </span>
              <div className="w-10 h-[1.5px] bg-[#00C8A0] mt-2 opacity-80"></div>
            </div>

            {/* Main Headline */}
            <h2 className="tech-heading font-serif text-5xl sm:text-6xl lg:text-[70px] font-bold text-[#0A1926] leading-[0.98] tracking-tight mb-7">
              The Physics of<br />Perfection
            </h2>

            {/* Paragraph 1 */}
            <p className="tech-body text-slate-600 text-base sm:text-[17.5px] leading-[1.65] font-sans max-w-[620px] mb-4">
              Our lagoon is powered by a 52-module Wavegarden Cove technology system, capable of generating up to 1,000 ocean-like waves per hour. Each wave profile is programmatically controlled to modify height, speed, and shape in real time.
            </p>

            {/* Paragraph 2 */}
            <p className="tech-body text-slate-600 text-base sm:text-[17.5px] leading-[1.65] font-sans max-w-[620px] mb-8">
              Through custom hydrodynamic modules, we optimize energy usage while delivering precise wave geometries. This creates a consistent and highly customizable surfing environment.
            </p>

            {/* Thin Horizontal Top Divider */}
            <div className="border-t border-slate-200 my-7"></div>

            {/* Clean Horizontal 3-Column Statistics System (No Cards / No Glass / Thin Dividers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-left my-7 py-1">
              
              {/* Stat 01: Waves / Hour */}
              <div className="tech-stat-item flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#0B7FB5]">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2.8.5 1.8.6 2.8.2 1-.4 2.2-.4 3.2.2.6.4 1.4.6 2.2.6"/>
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B7FB5]">WAVES / HOUR</span>
                </div>
                <div className="flex items-baseline gap-1.5 my-0.5">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wide text-slate-500">up to</span>
                  <span ref={stat1Ref} className="font-serif text-4xl sm:text-[44px] font-bold text-[#0A1926] tracking-tight">1,000</span>
                </div>
                <p className="text-[12px] text-slate-600 font-medium leading-relaxed mt-1 max-w-[150px]">
                  Industry-leading capacity for endless wave sessions.
                </p>
              </div>

              {/* Stat 02: Wave Profiles */}
              <div className="tech-stat-item sm:border-l sm:border-slate-200 sm:pl-5 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#0B7FB5]">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 18c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B7FB5]">WAVE PROFILES</span>
                </div>
                <div className="my-0.5">
                  <span ref={stat2Ref} className="font-serif text-4xl sm:text-[44px] font-bold text-[#0A1926] tracking-tight">20+</span>
                </div>
                <p className="text-[12px] text-slate-600 font-medium leading-relaxed mt-1 max-w-[150px]">
                  Programmable wave profiles for every ability and style.
                </p>
              </div>

              {/* Stat 03: Surfers Capacity */}
              <div className="tech-stat-item sm:border-l sm:border-slate-200 sm:pl-5 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#0B7FB5]">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 1 0 7.75"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B7FB5]">SURFERS CAPACITY</span>
                </div>
                <div className="my-0.5">
                  <span ref={stat3Ref} className="font-serif text-4xl sm:text-[44px] font-bold text-[#0A1926] tracking-tight">90</span>
                </div>
                <p className="text-[12px] text-slate-600 font-medium leading-relaxed mt-1 max-w-[150px]">
                  Maximum simultaneous surfers across lagoon zones.
                </p>
              </div>

            </div>

            {/* CTA Button with Magnetic Physics */}
            <div className="tech-cta mt-4">
              <a
                href="#find-your-wave"
                onClick={(e) => handleNavClick(e, "#find-your-wave")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#0A1926] text-white px-7 py-3.5 h-[52px] rounded-[8px] text-[15px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>EXPLORE WAVE TIERS</span>
                <span className="text-sm font-normal">→</span>
              </a>
            </div>

          </div>

          {/* Right Column: Premium Architectural Media Block */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center w-full">
            
            <div className="tech-media-container w-full max-w-full lg:max-w-[700px] xl:max-w-[740px] rounded-[26px] overflow-hidden shadow-2xl relative border border-[#0A1926]/15 h-[420px] sm:h-[500px] lg:h-[540px] max-h-[540px] bg-[#0A1926] group">
              
              {/* Clean High-Res Wave Video Player */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              >
                <source src="/videos/wave.mp4" type="video/mp4" />
              </video>

              {/* Floating White Status Pill */}
              <div className="tech-status-pill absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-white/80 rounded-[14px] h-[50px] px-5 shadow-lg flex items-center justify-between z-20 text-xs font-bold text-[#0A1926]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse"></span>
                  <span>Wave Generator Active</span>
                </div>
                
                <span className="w-[1px] h-4 bg-[#0A1926]/20"></span>
                
                <a
                  href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B7FB5] transition-colors flex items-center gap-1 text-slate-600"
                >
                  <span>Bilaj Al Jazayer, Bahrain</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>

            {/* Subtitle Live System Status Line Below Video */}
            <div className="w-full max-w-full lg:max-w-[700px] xl:max-w-[740px] flex items-center gap-2 mt-4 text-left px-1">
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-pulse shrink-0"></span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">LIVE SYSTEM STATUS</span>
                <span className="text-[11px] text-slate-600 font-medium">— Real-time wave generation in progress</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Real Ocean Wave Video Background Layer at bottom - Parallax Depth Enabled */}
      <div
        ref={oceanVideoContainerRef}
        className="absolute bottom-0 left-0 right-0 w-full h-[300px] sm:h-[380px] lg:h-[420px] pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.95) 30%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.95) 30%, black 100%)"
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-[center_35%] opacity-85"
        >
          <source src="/videos/ocean.mp4" type="video/mp4" />
        </video>
      </div>

      <WaveDivider fill="#061C27" />
    </section>
  );
}
