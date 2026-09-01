"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

export default function Cabanas() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cabanas-home-anim",
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
      id="cabanas"
      className="bg-white text-[#0A1926] py-20 sm:py-24 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Compact Cabana Photo */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="cabanas-home-anim relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[16/10] bg-[#0A1926]">
              <img
                src="/images/cabanas/cabanas_hero.jpg"
                alt="Bahrain Surf Park Luxury Cabana"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                <span className="font-mono text-[#00C8A0] font-bold uppercase tracking-wider">PRIVATE LAGOON HAVENS</span>
                <span className="font-sans text-white/80 font-medium">Dedicated Concierge Service</span>
              </div>
            </div>
          </div>

          {/* Right Column: Text & CTA */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center text-left">
            <span className="cabanas-home-anim text-[#00C8A0] text-xs font-extrabold tracking-[0.22em] uppercase mb-3 block">
              ISLAND HOSPITALITY
            </span>

            <h2 className="cabanas-home-anim font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1926] tracking-tight leading-[1.1] mb-5">
              Private Luxury Cabanas Overlooking the Wave
            </h2>

            <p className="cabanas-home-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-4">
              Elevate your day at Bahrain Surf Park in your private shaded sanctuary. Complete with premium daybeds, personal climate controls, dedicated dining service, and uninterrupted vistas of the surfing lagoon.
            </p>

            <p className="cabanas-home-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Available for full-day reservations, family gatherings, or VIP group hospitality packages.
            </p>

            <div className="cabanas-home-anim">
              <Link
                href="/cabanas"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0A1926] hover:bg-[#0B7FB5] text-white px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md inline-flex items-center gap-2.5"
              >
                <span>EXPLORE PRIVATE CABANAS</span>
                <span className="text-sm font-normal">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
