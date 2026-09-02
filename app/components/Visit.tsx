"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDivider from "./WaveDivider";
import {
  MOTION,
  isReducedMotion,
  handleMagneticMouseMove,
  handleMagneticMouseLeave,
} from "../constants/motion";

interface VisitProps {
  onOpenBooking?: (tier?: string) => void;
}

export default function Visit({ onOpenBooking }: VisitProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-anim-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION || 0.8,
          ease: MOTION.ENTRANCE_EASE || "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="relative bg-[#06111C] text-white pt-14 sm:pt-20 pb-24 sm:pb-32 overflow-hidden"
    >
      {/* Background Ambient Glow & Luxury Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00D4B2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-[500px] h-[500px] bg-[#0B7FB5]/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Premium Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">

            {/* Pill Tag */}
            <div className="visit-anim-item inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00D4B2] animate-pulse" />
              <span className="text-[#00D4B2] text-[11px] font-bold tracking-[0.2em] uppercase">
                Plan Your Sanctuary
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="visit-anim-item font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] mb-6 text-slate-100">
              Your Coastal Haven on <span className="italic font-light text-[#00D4B2]">Bahrain's</span> Southwest Shore.
            </h2>

            {/* Paragraphs */}
            <p className="visit-anim-item text-slate-300 text-base sm:text-lg leading-relaxed font-light mb-4">
              Set along the turquoise edge of Bilaj Al Jazayer, Bahrain Surf Park seamlessly fuses state-of-the-art wave technology with world-class dining, private oceanfront cabanas, and pristine coastal serenity.
            </p>

            <p className="visit-anim-item text-slate-400 text-sm sm:text-base leading-relaxed font-light mb-8">
              Just 30 minutes from downtown Manama, everything is tailored for effortless arrival, private leisure, and uninterrupted surf sessions.
            </p>

            {/* Key Quick Stats */}
            <div className="visit-anim-item grid grid-cols-3 gap-4 py-5 mb-8 border-y border-white/10">
              <div>
                <span className="block text-xl sm:text-2xl font-semibold text-white">30m</span>
                <span className="text-[11px] tracking-wider uppercase text-slate-400">From Manama</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-semibold text-[#00D4B2]">5★</span>
                <span className="text-[11px] tracking-wider uppercase text-slate-400">Beach Club</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-semibold text-white">100%</span>
                <span className="text-[11px] tracking-wider uppercase text-slate-400">Curated Waves</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="visit-anim-item flex flex-wrap items-center gap-4">
              <Link
                href="/visit"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0B7FB5] to-[#00D4B2] text-[#06111C] font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(0,212,178,0.25)] hover:shadow-[0_0_40px_rgba(0,212,178,0.45)] hover:scale-[1.02]"
              >
                <span>Explore Destination</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-6">
            <div className="visit-anim-item relative rounded-3xl p-2 bg-gradient-to-b from-white/15 via-white/5 to-transparent backdrop-blur-xl border border-white/10 shadow-2xl group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-[#0A1926]">
                <img
                  src="/images/bahrain_surf_park_clean.jpg"
                  alt="Bahrain Surf Park Bilaj Al Jazayer Location"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06111C]/90 via-[#06111C]/20 to-transparent" />

                {/* Floating Glassmorphism Location Tag */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-2xl transition-all duration-300 group-hover:border-[#00D4B2]/40">
                  <div className="flex flex-col pr-3">
                    <span className="text-[#00D4B2] text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">
                      Destination Coordinates
                    </span>
                    <span className="text-sm sm:text-base font-medium text-white tracking-tight">
                      Bilaj Al Jazayer, Bahrain
                    </span>
                  </div>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-[#00D4B2] text-white hover:text-[#06111C] text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 border border-white/15 shrink-0"
                  >
                    <span>Directions</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave Transition */}
      <WaveDivider fill="#0A1926" showGreenScrollLine={false} />
    </section>
  );
}