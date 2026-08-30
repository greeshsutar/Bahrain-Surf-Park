"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Video Ken Burns scale
    if (heroVideoRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        heroVideoRef.current,
        { scale: 1.0 },
        {
          scale: 1.035,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    }

    // 2. Staggered reveal timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: -12, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.15 }
    )
      .fromTo(
        ".hero-headline",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.0 },
        "-=0.5"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.6"
      )
      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

    return () => {
      tl.kill();
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
    <section
      id="hero"
      className="relative w-full hero-vh-screen min-h-[580px] sm:min-h-[720px] overflow-hidden flex flex-col justify-between z-0"
    >
      {/* 1. Fullscreen Background Video with Subtle Dark Scrim Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={heroVideoRef}
          id="hero-video"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/create_a_video.mp4?v=20260828_clear" type="video/mp4" />
        </video>
        {/* Editorial Left Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06232D]/70 via-[#06232D]/35 to-transparent z-10 pointer-events-none"></div>
        {/* Top Navbar Scrim */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#061922]/60 to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* 2. Asymmetric Left-Aligned Text Block (Lower-Left Third) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 my-auto pt-28 pb-16 flex flex-col justify-end">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Location Eyebrow */}
          <div className="hero-eyebrow mb-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 bg-[#00C8A0]/15 backdrop-blur-md border border-[#00C8A0]/40 text-[#00C8A0] text-xs font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-pulse"></span>
              <span>Opening 2026 • Bilaj Al Jazayer, Bahrain Southwest Coast</span>
            </span>
          </div>

          {/* Left-Aligned Display Headline */}
          <h1 className="hero-headline font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.08] mb-5">
            Island Luxury.<br />Perfect Waves.
          </h1>

          {/* Left-Aligned Subtitle */}
          <p className="hero-subtitle text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-[500px] mb-8 font-sans">
            The world's most advanced wave technology meeting the spirit of island living in the heart of Bahrain.
          </p>

          {/* Left-Aligned Dual Action Buttons */}
          <div className="hero-buttons flex flex-wrap items-center gap-6">
            {/* Primary Action Button */}
            <a
              href="#find-your-wave"
              onClick={(e) => handleNavClick(e, "#find-your-wave")}
              onMouseEnter={handleMouseEnterBtn}
              onMouseLeave={handleMouseLeaveBtn}
              className="bg-gradient-to-r from-[#00C8A0] to-[#0B7FB5] hover:opacity-95 text-white px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl transition-all inline-flex items-center gap-2"
            >
              <span>DISCOVER THE PARK</span>
              <span className="text-sm font-normal">→</span>
            </a>

            {/* Secondary Action Button (Editorial Circular Play) */}
            <a
              href="#technology"
              onClick={(e) => handleNavClick(e, "#technology")}
              className="inline-flex items-center gap-3 text-white text-xs font-bold uppercase tracking-wider hover:text-[#00C8A0] transition-colors group"
            >
              <span className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center bg-black/15 group-hover:border-white transition-all">
                <svg className="w-3.5 h-3.5 fill-current text-white translate-x-[1px]" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>WATCH THE EXPERIENCE</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Organic Shoreline Water Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none translate-y-[1px]" aria-hidden="true">
        <svg
          className="block w-full h-[60px] sm:h-[90px] md:h-[120px] lg:h-[145px] leading-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="shoreline-shadow" x="-10%" y="-30%" width="120%" height="220%">
              <feDropShadow dx="0" dy="-8" stdDeviation="12" floodColor="#06232D" floodOpacity="0.16" />
              <feDropShadow dx="0" dy="-2" stdDeviation="4" floodColor="#06232D" floodOpacity="0.10" />
            </filter>
          </defs>

          {/* Layer 1: Semi-transparent Cyan/Ocean Water Underlayer for Depth */}
          <path
            d="M 0,110 C 220,135 440,145 680,95 C 920,40 1160,95 1440,65 L 1440,180 L 0,180 Z"
            fill="rgba(11, 127, 181, 0.22)"
          />

          {/* Layer 2: Pure White Foreground Shoreline Wave with Soft Shadow */}
          <path
            d="M 0,95 C 240,128 480,138 720,85 C 960,32 1200,88 1440,55 L 1440,180 L 0,180 Z"
            fill="#FFFFFF"
            filter="url(#shoreline-shadow)"
          />
        </svg>
      </div>
    </section>
  );
}
