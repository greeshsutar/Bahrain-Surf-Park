"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

interface VisitCTAProps {
  onOpenBooking: (tier?: string) => void;
}

export default function VisitCTA({ onOpenBooking }: VisitCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Parallax Video Layer Scrub
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Entrance Stagger Reveal
      gsap.fromTo(
        ".visit-cta-anim",
        { opacity: 0, scale: 0.97, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
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

  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/qcxXGozrQb9vLgnX8", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70vh] lg:min-h-[78vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 pt-24 sm:pt-32 pb-0"
    >
      {/* Cinematic Ocean Video Layer with Parallax Scrub */}
      <div ref={parallaxRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 overflow-hidden will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/tier5.jpg"
          className="w-full h-full object-cover opacity-50 scale-105"
        >
          <source src="/videos/surfing.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/75 to-[#02141C]/85" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#00C8A0]/15 blur-[160px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center visit-cta-anim my-auto">
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.28em] uppercase mb-4 block">
          10 — FINAL ARRIVAL
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.03] mb-6 drop-shadow-lg">
          READY FOR THE WAVE?
        </h2>

        <p className="text-slate-200 text-base sm:text-xl font-sans max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
          Your journey starts before you reach the water.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onOpenBooking()}
            onMouseMove={handleMagneticMouseMove}
            onMouseLeave={handleMagneticMouseLeave}
            className="bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-9 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-2xl hover:shadow-[#00C8A0]/40 cursor-pointer inline-flex items-center gap-2.5 hover:-translate-y-0.5"
          >
            <span>BOOK YOUR EXPERIENCE</span>
            <span className="text-sm font-normal">→</span>
          </button>

          <button
            onClick={handleGetDirections}
            onMouseMove={handleMagneticMouseMove}
            onMouseLeave={handleMagneticMouseLeave}
            className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span>GET DIRECTIONS</span>
            <span className="text-sm font-normal">→</span>
          </button>
        </div>
      </div>

      {/* Organic Wave Divider Transitioning cleanly into Global Footer (#0A1926) */}
      <WaveDivider fill="#0A1926" />
    </section>
  );
}