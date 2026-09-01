"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDivider from "./WaveDivider";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

interface VisitProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Visit({ onOpenBooking }: VisitProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-home-anim",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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
      className="bg-[#F8FAFC] text-[#0A1926] pt-20 sm:pt-24 pb-32 sm:pb-36 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <span className="visit-home-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.22em] uppercase mb-3 block">
              PLAN YOUR VISIT
            </span>

            <h2 className="visit-home-anim font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1926] tracking-tight leading-[1.1] mb-5">
              Your Destination on Bahrain&apos;s Southwest Coast
            </h2>

            <p className="visit-home-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-4">
              Located at Bilaj Al Jazayer, Bahrain Surf Park combines world-class wave technology with pristine beach facilities, dining, and luxury cabanas. Just 30 minutes from Manama.
            </p>

            <p className="visit-home-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Explore arrival guides, parking information, resort amenities, and guest guidelines to prepare for your day on the water.
            </p>

            <div className="visit-home-anim flex flex-wrap items-center gap-4">
              <Link
                href="/visit"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#0A1926] text-white px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md inline-flex items-center gap-2.5"
              >
                <span>PLAN YOUR VISIT</span>
                <span className="text-sm font-normal">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Compact Location Card / Map Embed */}
          <div className="lg:col-span-6">
            <div className="visit-home-anim relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#0A1926] aspect-[16/10]">
              <img
                src="/images/bahrain_surf_park_clean.jpg"
                alt="Bahrain Surf Park Bilaj Al Jazayer Location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926]/80 via-[#0A1926]/30 to-transparent pointer-events-none" />
              
              {/* Location Pill & Overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-white/80 rounded-xl p-4 shadow-lg flex items-center justify-between text-xs font-bold text-[#0A1926]">
                <div className="flex flex-col">
                  <span className="text-[#0B7FB5] text-[10px] font-black uppercase tracking-widest">LOCATION</span>
                  <span className="text-sm font-serif font-bold">Bilaj Al Jazayer, Bahrain</span>
                </div>

                <a
                  href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0B7FB5] hover:bg-[#0A1926] text-white text-[11px] font-extrabold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>GET DIRECTIONS</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retained Bottom Wave Divider transitioning cleanly into Footer (#0A1926) */}
      <WaveDivider fill="#0A1926" showGreenScrollLine={false} />
    </section>
  );
}