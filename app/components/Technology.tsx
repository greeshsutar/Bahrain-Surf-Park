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

    // 1. Column reveal entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
      },
    });

    tl.fromTo(
      ".tech-left-col",
      { opacity: 0, x: -35 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
    ).fromTo(
      ".tech-right-col",
      { opacity: 0, x: 35, scale: 0.96 },
      { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );

    // 2. Animated count-up counter for technical numbers
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
    gsap.to(e.currentTarget, { scale: 1.04, y: -2, duration: 0.3, ease: "back.out(1.4)", overwrite: "auto" });
  };

  const handleMouseLeaveBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section id="technology" className="relative bg-[#FBFDFD] pt-8 sm:pt-10 pb-12 sm:pb-16 min-h-[640px] lg:min-h-[680px] z-10 overflow-visible">
      {/* Background Subtle Contour Lines & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Topographic contour curves */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.045]" viewBox="0 0 1440 900" fill="none" stroke="#063B45" strokeWidth="1.2">
          <path d="M-100,100 C200,80 400,250 800,200 C1200,150 1400,300 1600,250" />
          <path d="M-100,220 C180,200 380,380 780,320 C1180,260 1380,420 1600,370" />
          <path d="M-100,340 C160,320 360,510 760,440 C1160,370 1360,540 1600,490" />
          <path d="M-100,460 C140,440 340,640 740,560 C1140,480 1340,660 1600,610" />
        </svg>
        {/* Ambient Atmospheric Glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00C8A0]/[0.04] rounded-full blur-3xl"></div>
      </div>

      {/* Real Ocean Video Layer (Lower 25–35% of section, naturally emerging below CTA) */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full h-[220px] sm:h-[280px] lg:h-[330px] pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.65) 40%, black 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.65) 40%, black 80%)"
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-top"
        >
          <source src="/videos/ocean.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Engineering Narrative & Editorial Stats */}
          <div className="lg:col-span-7 text-left tech-left-col">
            
            {/* Eyebrow with Subtle Line Accent */}
            <div className="mb-3">
              <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.22em] uppercase inline-block">
                WAVEGARDEN COVE® ENGINEERING
              </span>
              <div className="w-12 h-[2px] bg-[#0B7FB5] mt-1.5 opacity-80"></div>
            </div>

            {/* Headline (Playfair Display) */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#063B45] leading-[1.08] tracking-tight mb-5">
              The Physics of<br />Perfection
            </h2>

            {/* Narrative Paragraph 1 */}
            <p className="text-[#063B45]/85 text-sm sm:text-[15px] leading-relaxed mb-4 font-sans max-w-xl">
              Our lagoon is powered by a 52-module Wavegarden Cove technology system, capable of generating up to 1,000 ocean-like waves per hour. Each wave profile is programmatically controlled to modify height, speed, and shape in real time.
            </p>

            {/* Narrative Paragraph 2 */}
            <p className="text-[#063B45]/80 text-sm sm:text-[15px] leading-relaxed mb-6 font-sans max-w-xl">
              Through custom hydrodynamic modules, we optimize energy usage while delivering precise wave geometries. This creates the most consistent and customizable surfing environment in the world.
            </p>

            {/* Thin Horizontal Divider */}
            <div className="border-t border-slate-200/90 my-5"></div>

            {/* 3-Column Technical Statistics Row with Animated Count-up Numbers */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 text-left mb-6">
              
              {/* Stat 1: Waves / Hour */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#0B7FB5]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2.8.5 1.8.6 2.8.2 1-.4 2.2-.4 3.2.2.6.4 1.4.6 2.2.6"/>
                  </svg>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">WAVES / HOUR</span>
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-xs font-serif italic text-slate-500 font-normal">up to</span>
                  <span ref={stat1Ref} className="font-serif text-3xl sm:text-4xl font-bold text-[#063B45] tracking-tight">0</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-normal mt-1 max-w-[130px]">
                  Industry-leading capacity for endless wave sessions.
                </p>
              </div>

              {/* Stat 2: Wave Profiles */}
              <div className="border-l border-slate-200/90 pl-3 sm:pl-6 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#00C8A0]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                    <path d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                    <path d="M2 18c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                  </svg>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">WAVE PROFILES</span>
                </div>
                <div className="my-1">
                  <span ref={stat2Ref} className="font-serif text-3xl sm:text-4xl font-bold text-[#063B45] tracking-tight">0</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-normal mt-1 max-w-[130px]">
                  Programable wave profiles for every ability and style.
                </p>
              </div>

              {/* Stat 3: Surfers Capacity */}
              <div className="border-l border-slate-200/90 pl-3 sm:pl-6 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 text-[#00C8A0]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">SURFERS CAPACITY</span>
                </div>
                <div className="my-1">
                  <span ref={stat3Ref} className="font-serif text-3xl sm:text-4xl font-bold text-[#063B45] tracking-tight">0</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-normal mt-1 max-w-[130px]">
                  Maximum simultaneous surfers across all lagoon zones.
                </p>
              </div>

            </div>

            {/* Action Button (Explore Wave Tiers) */}
            <a
              href="#find-your-wave"
              onClick={(e) => handleNavClick(e, "#find-your-wave")}
              onMouseEnter={handleMouseEnterBtn}
              onMouseLeave={handleMouseLeaveBtn}
              className="bg-[#0B7FB5] hover:bg-[#063B45] text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md inline-flex items-center gap-2.5"
            >
              <span>EXPLORE WAVE TIERS</span>
              <span className="text-sm font-normal">→</span>
            </a>

          </div>

          {/* Right Column: Technology Portrait Video Container */}
          <div className="lg:col-span-5 tech-right-col flex flex-col items-center justify-center">
            
            <div className="w-full max-w-[460px] rounded-[22px] overflow-hidden shadow-2xl relative border border-white/70 h-[340px] sm:h-[400px] lg:h-[440px] max-h-[440px] bg-slate-900 group">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="/videos/create_a_video.mp4" type="video/mp4" />
              </video>

              {/* Translucent White Status Bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-white/70 rounded-xl px-4 py-3 shadow-lg flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse"></span>
                  <span className="text-xs font-bold text-[#063B45]">Wave Generator Active</span>
                </div>
                <div className="border-l border-slate-300 h-4 mx-2"></div>
                <a
                  href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-600 hover:text-[#0B7FB5] truncate transition-colors flex items-center gap-1"
                >
                  <span>Bilaj Al Jazayer, Bahrain</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>

            {/* Subtle Live System Status Indicator Below Image */}
            <div className="w-full flex items-center gap-2.5 mt-4 text-left px-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C8A0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00C8A0]"></span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5]">LIVE SYSTEM STATUS</span>
                <span className="text-[11px] text-slate-500 font-medium">— Real-time wave generation in progress</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <WaveDivider />
    </section>
  );
}

