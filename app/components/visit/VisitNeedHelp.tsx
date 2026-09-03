"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface VisitNeedHelpProps {
  onOpenBooking?: (tier?: string) => void;
}

export default function VisitNeedHelp({ onOpenBooking }: VisitNeedHelpProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".help-anim",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: 0.1,
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

  const handleContactClick = () => {
    const el = document.getElementById("faq");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="visit-contact"
      className="relative bg-gradient-to-b from-[#F7F6F1] via-white to-[#F7F6F1] text-[#0A1926] pt-16 sm:pt-20 pb-0 z-10 overflow-hidden"
    >
      {/* Background Dot Pattern & Ambient Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0A1926_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#00C8A0]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center help-anim relative z-10 mb-14">
        <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-2 block">
          09 — GUEST ASSISTANCE
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1926] tracking-tight leading-[1.05] mb-3">
          NEED A HAND?
        </h2>

        <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed max-w-lg mx-auto mb-6">
          Still have a question before you arrive? Our team is here to help you plan every detail.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleContactClick}
            onMouseMove={handleMagneticMouseMove}
            onMouseLeave={handleMagneticMouseLeave}
            className="bg-[#0A1926] hover:bg-[#0B7FB5] text-white font-extrabold px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl cursor-pointer inline-flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span>CONTACT US</span>
            <span className="text-sm font-normal">→</span>
          </button>

          {onOpenBooking && (
            <button
              onClick={() => onOpenBooking()}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#00C8A0]/50 text-[#0A1926] font-extrabold px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xs hover:shadow-md cursor-pointer inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>BOOK YOUR EXPERIENCE</span>
              <span className="text-sm font-normal">→</span>
            </button>
          )}
        </div>
      </div>

      {/* Flat Horizontal Transition into Final Arrival CTA (#02141C) */}
      <div className="w-full h-12 bg-[#02141C]" aria-hidden="true" />
    </section>
  );
}
