"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

interface VisitHeroProps {
  onOpenBooking?: (tier?: string) => void;
}

export default function VisitHero({ onOpenBooking }: VisitHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isReducedMotion()) {
      if (bgRef.current) {
        gsap.set(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
      }
      gsap.set(".visit-hero-anim", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Background Parallax
      if (parallaxRef.current && containerRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Initial Reveal Animation
      gsap.set(bgRef.current, { filter: "blur(16px)", opacity: 0.5, scale: 1.05 });
      gsap.set(".visit-hero-anim", { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0)
        .to(".visit-hero-anim", { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToArrive = () => {
    const el = document.getElementById("arrive-ready");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/qcxXGozrQb9vLgnX8", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[78vh] sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0"
    >
      {/* Background Parallax & Visual Layer */}
      <div ref={parallaxRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 overflow-hidden will-change-transform">
        <div ref={bgRef} className="w-full h-full relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/bahrain_surf_park_clean.jpg"
            className="w-full h-full object-cover object-center opacity-75 scale-105"
          >
            <source src="/videos/ocean.mp4" type="video/mp4" />
          </video>

          {/* Dark Vignette Overlay & Directional Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/50 to-[#02141C]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#02141C]/70 via-transparent to-[#02141C]/40 pointer-events-none" />

          {/* Soft Radial Ambient Glow */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00C8A0]/10 blur-[130px] rounded-full pointer-events-none" />
        </div>
      </div>

      {/* Hero Content Block */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-20 flex flex-col justify-center text-left my-auto">
        <div className="max-w-3xl">
          <span className="visit-hero-anim text-[#00C8A0] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase mb-4 block">
            PLAN YOUR VISIT
          </span>

          <h1 className="visit-hero-anim font-serif text-4xl sm:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.02] mb-6 drop-shadow-lg">
            EVERYTHING YOU NEED<br />BEFORE YOU ARRIVE.
          </h1>

          <p className="visit-hero-anim text-slate-200 text-base sm:text-lg font-sans leading-relaxed max-w-2xl mb-9 drop-shadow-sm">
            Find your route to Bilaj Al Jazayer, explore guest preparation guides, parking access, resort amenities, and safety details to ensure your arrival on Bahrain&apos;s southwest coast is effortless.
          </p>

          <div className="visit-hero-anim flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={handleGetDirections}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2.5 hover:-translate-y-0.5"
            >
              <span>GET DIRECTIONS</span>
              <span className="text-sm font-normal">→</span>
            </button>

            <button
              onClick={handleScrollToArrive}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-bold px-7 py-4 rounded-xl text-xs uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>KNOW BEFORE YOU GO</span>
              <span className="text-xs">↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wave Divider Transitioning into Orientation Section (#F7F6F1) */}
      <WaveDivider fill="#F7F6F1" showGreenScrollLine={true} />
    </section>
  );
}
