"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDivider from "./WaveDivider";

export default function Technology() {
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.getElementById("technology");
    if (!section) return;

    // Entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
      },
    });

    tl.fromTo(
      ".tech-eyebrow",
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
      .fromTo(
        ".tech-heading",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".tech-body",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".tech-stat-item",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".tech-cta",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".tech-media-container",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        ".tech-status-pill",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

    // Animated count-up counter for technical numbers
    const countObj = { val1: 0, val2: 0, val3: 0 };

    const counterTween = gsap.to(countObj, {
      val1: 1000,
      val2: 20,
      val3: 90,
      duration: 2.2,
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
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnterBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  const handleMouseLeaveBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section
      id="technology"
      className="relative bg-[#F7F7F3] text-[#063B4A] pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-28 lg:pb-32 min-h-[760px] lg:min-h-[820px] z-10 overflow-hidden"
    >
      {/* Background Subtle Flowing Ocean Contour Lines & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute top-0 left-0 w-[140%] h-full opacity-[0.06] animate-[flowContour_24s_linear_infinite]"
          viewBox="0 0 1800 900"
          fill="none"
          stroke="#087EA4"
          strokeWidth="1.2"
        >
          <path d="M-100,100 C200,80 500,240 900,190 C1300,140 1600,290 1900,240" />
          <path d="M-100,220 C180,200 480,380 880,310 C1280,250 1580,410 1900,360" />
          <path d="M-100,340 C160,320 460,500 860,430 C1260,360 1560,530 1900,480" />
          <path d="M-100,460 C140,440 440,630 840,550 C1240,470 1540,650 1900,600" />
        </svg>

        {/* Ambient Atmospheric Turquoise Glow behind right media block */}
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#00BFAE]/[0.06] rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Engineering Narrative & Clean Divider Stats */}
          <div className="lg:col-span-7 text-left">
            
            {/* Eyebrow */}
            <div className="tech-eyebrow mb-2">
              <span className="text-[#087EA4] text-[12px] sm:text-[13px] font-bold tracking-[0.22em] uppercase block">
                WAVEGARDEN COVE® ENGINEERING
              </span>
              <div className="w-10 h-[1.5px] bg-[#00BFAE] mt-2 opacity-80"></div>
            </div>

            {/* Main Headline */}
            <h2 className="tech-heading font-serif text-5xl sm:text-6xl lg:text-[70px] font-bold text-[#063B4A] leading-[0.98] tracking-tight mb-7">
              The Physics of<br />Perfection
            </h2>

            {/* Paragraph 1 */}
            <p className="tech-body text-[#426879] text-base sm:text-[17.5px] leading-[1.65] font-sans max-w-[620px] mb-4">
              Our lagoon is powered by a 52-module Wavegarden Cove technology system, capable of generating up to 1,000 ocean-like waves per hour. Each wave profile is programmatically controlled to modify height, speed, and shape in real time.
            </p>

            {/* Paragraph 2 */}
            <p className="tech-body text-[#426879] text-base sm:text-[17.5px] leading-[1.65] font-sans max-w-[620px] mb-8">
              Through custom hydrodynamic modules, we optimize energy usage while delivering precise wave geometries. This creates a consistent and highly customizable surfing environment.
            </p>

            {/* Thin Horizontal Top Divider */}
            <div className="border-t border-[#063B4A]/14 my-7"></div>

            {/* Clean Horizontal 3-Column Statistics System (No Cards / No Glass / Thin Dividers) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-left my-7 py-1">
              
              {/* Stat 01: Waves / Hour */}
              <div className="tech-stat-item flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#087EA4]">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2.8.5 1.8.6 2.8.2 1-.4 2.2-.4 3.2.2.6.4 1.4.6 2.2.6"/>
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">WAVES / HOUR</span>
                </div>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-xs font-serif italic text-[#587486] font-normal">up to</span>
                  <span ref={stat1Ref} className="font-serif text-4xl sm:text-[44px] font-bold text-[#063B4A] tracking-tight">1,000</span>
                </div>
                <p className="text-[12px] text-[#587486] font-medium leading-relaxed mt-1 max-w-[150px]">
                  Industry-leading capacity for endless wave sessions.
                </p>
              </div>

              {/* Stat 02: Wave Profiles */}
              <div className="tech-stat-item sm:border-l sm:border-[#063B4A]/14 sm:pl-5 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#087EA4]">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 18c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">WAVE PROFILES</span>
                </div>
                <div className="my-0.5">
                  <span ref={stat2Ref} className="font-serif text-4xl sm:text-[44px] font-bold text-[#063B4A] tracking-tight">20+</span>
                </div>
                <p className="text-[12px] text-[#587486] font-medium leading-relaxed mt-1 max-w-[150px]">
                  Programmable wave profiles for every ability and style.
                </p>
              </div>

              {/* Stat 03: Surfers Capacity */}
              <div className="tech-stat-item sm:border-l sm:border-[#063B4A]/14 sm:pl-5 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#087EA4]">
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">SURFERS CAPACITY</span>
                </div>
                <div className="my-0.5">
                  <span ref={stat3Ref} className="font-serif text-4xl sm:text-[44px] font-bold text-[#063B4A] tracking-tight">90</span>
                </div>
                <p className="text-[12px] text-[#587486] font-medium leading-relaxed mt-1 max-w-[150px]">
                  Maximum simultaneous surfers across lagoon zones.
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="tech-cta mt-4">
              <a
                href="#find-your-wave"
                onClick={(e) => handleNavClick(e, "#find-your-wave")}
                onMouseEnter={handleMouseEnterBtn}
                onMouseLeave={handleMouseLeaveBtn}
                className="bg-[#087EA4] hover:bg-[#063B4A] text-white px-7 py-3.5 h-[52px] rounded-[8px] text-[15px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>EXPLORE WAVE TIERS</span>
                <span className="text-sm font-normal">→</span>
              </a>
            </div>

          </div>

          {/* Right Column: Premium Architectural Media Block */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="tech-media-container w-full max-w-[480px] rounded-[26px] overflow-hidden shadow-2xl relative border border-[#063B4A]/15 h-[380px] sm:h-[460px] lg:h-[500px] max-h-[500px] bg-[#063B4A] group">
              
              {/* Clean Base Image / Aerial Photography */}
              <img
                src="/images/wavecove.png"
                alt="Bahrain Surf Park Aerial Lagoon and Wavegarden System"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Floating White Status Pill */}
              <div className="tech-status-pill absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-white/80 rounded-[14px] h-[50px] px-5 shadow-lg flex items-center justify-between z-20 text-xs font-bold text-[#063B4A]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00BFAE] animate-pulse"></span>
                  <span>Wave Generator Active</span>
                </div>
                
                <span className="w-[1px] h-4 bg-[#063B4A]/20"></span>
                
                <a
                  href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#087EA4] transition-colors flex items-center gap-1 text-[#426879]"
                >
                  <span>Bilaj Al Jazayer, Bahrain</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>

            {/* Subtitle Live System Status Line Below Image */}
            <div className="w-full max-w-[480px] flex items-center gap-2 mt-4 text-left px-1">
              <span className="w-2 h-2 rounded-full bg-[#00BFAE] animate-pulse shrink-0"></span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00BFAE]">LIVE SYSTEM STATUS</span>
                <span className="text-[11px] text-[#587486] font-medium">— Real-time wave generation in progress</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <WaveDivider />
    </section>
  );
}


