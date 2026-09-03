"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useBooking } from "../../context/BookingContext";

export default function SurfHero() {
  const { onOpenBooking } = useBooking();
  const videoRef = useRef<HTMLVideoElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.05 },
          { scale: 1.0, duration: 10, ease: "power1.out" }
        );
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".surf-hero-eyebrow",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          accentLineRef.current,
          { width: 0, opacity: 0 },
          { width: "64px", opacity: 1, duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          ".surf-hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.6"
        )
        .fromTo(
          ".surf-hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85 },
          "-=0.6"
        )
        .fromTo(
          ".surf-hero-ctas",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.5"
        )
        .fromTo(
          ".surf-hero-hud",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );
    }
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between bg-[#061F2B] text-white overflow-hidden z-10 pt-24 sm:pt-28">
      {/* 1. Cinematic Full-Bleed Ocean Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/tier5.jpg"
          className="w-full h-full object-cover object-center opacity-95"
        >
          <source src="/videos/surfing.mp4" type="video/mp4" />
        </video>
        
        {/* Layer 1: Lightened Scrim Left Gradient for clearer video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061F2B]/60 via-[#061F2B]/25 to-transparent z-10 pointer-events-none"></div>
        {/* Layer 2: Softened Bottom & Top Radial Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061F2B]/75 via-transparent to-[#061F2B]/20 z-10 pointer-events-none"></div>
      </div>

      {/* 2. Main Hero Editorial Typography Layer */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 my-auto py-12 flex flex-col justify-center">
        <div className="max-w-2xl text-left">
          
          {/* Eyebrow with Animated Turquoise Line Accent */}
          <div className="flex items-center gap-3 mb-4">
            <span className="surf-hero-eyebrow text-[#00C8A0] text-xs sm:text-xs font-extrabold tracking-[0.25em] uppercase">
              SURF · BAHRAIN SURF PARK
            </span>
            <div ref={accentLineRef} className="h-[2px] bg-[#00C8A0] rounded-full"></div>
          </div>

          {/* Cinematic Editorial Title (Playfair Display) */}
          <h1 className="surf-hero-title font-serif text-4xl sm:text-6xl lg:text-[4.75rem] font-bold text-white tracking-tight leading-[1.05] mb-6">
            YOUR WAVE.<br />YOUR PROGRESSION.
          </h1>

          {/* Subtitle */}
          <p className="surf-hero-subtitle text-white/85 text-sm sm:text-base font-medium leading-relaxed max-w-lg mb-8 font-sans">
            From your first take-off to your best ride yet. World-class Wavegarden Cove surfing in the heart of Bahrain.
          </p>

          {/* Dual CTAs */}
          <div className="surf-hero-ctas flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#find-your-wave-selector"
              className="bg-[#00C8A0] hover:bg-[#00B590] text-[#061F2B] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/20 inline-flex items-center gap-2"
            >
              <span>FIND YOUR WAVE</span>
              <span className="text-sm font-normal">↓</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>JOIN THE WAITLIST</span>
              <span className="text-sm">→</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Integrated Technical HUD Statistics Overlay */}
      <div className="surf-hero-hud relative z-20 w-full border-t border-white/10 bg-[#061F2B]/60 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-3 gap-4 sm:gap-8 text-left">
          
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">SYSTEM SPEC</span>
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">52</span>
            </div>
            <span className="text-[11px] font-medium text-white/60">WAVE MODULES</span>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-8 flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#07536A]">LAGOON CAPACITY</span>
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">1,000</span>
            </div>
            <span className="text-[11px] font-medium text-white/60">WAVES / HOUR</span>
          </div>

          <div className="border-l border-white/15 pl-4 sm:pl-8 flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">PARK THROUGHPUT</span>
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">90</span>
            </div>
            <span className="text-[11px] font-medium text-white/60">SURFERS / HOUR</span>
          </div>

        </div>
      </div>
    </section>
  );
}
