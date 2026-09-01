"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

interface CabanasCTAProps {
  onOpenBooking: (tier?: string) => void;
}

export default function CabanasCTA({ onOpenBooking }: CabanasCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cab-cta-anim",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[65vh] sm:min-h-[75vh] flex flex-col justify-center bg-[#02141C] text-white overflow-hidden z-10 pt-24 pb-0"
    >
      {/* Background Video / Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="/images/cabanas/cabanas_hero.jpg"
          alt="Bahrain Surf Park Private Cabana"
          className="w-full h-full object-cover opacity-35 filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/75 to-[#02141C]/85" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center cab-cta-anim mb-20">
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.28em] uppercase mb-4 block">
          YOUR DAY STARTS HERE
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
          Make The Day<br />Your Own.
        </h2>

        <p className="text-slate-200 text-base sm:text-lg font-sans max-w-xl mx-auto mb-10 leading-relaxed">
          Choose your experience and enquire about your private cabana.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onOpenBooking("VIP Cabana")}
            onMouseMove={handleMagneticMouseMove}
            onMouseLeave={handleMagneticMouseLeave}
            className="bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-9 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-2xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2"
          >
            <span>RESERVE YOUR CABANA</span>
            <span className="text-sm font-normal">→</span>
          </button>

          <Link
            href="/visit"
            onMouseMove={handleMagneticMouseMove}
            onMouseLeave={handleMagneticMouseLeave}
            className="bg-transparent hover:bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
          >
            <span>EXPLORE THE PARK</span>
            <span className="text-sm font-normal">→</span>
          </Link>
        </div>
      </div>

      {/* Organic Wave Divider Transitioning into Global Footer */}
      <WaveDivider fill="#0A1926" showGreenScrollLine={true} />
    </section>
  );
}
