"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface CabanasHeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function CabanasHero({ onOpenBooking }: CabanasHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) {
      if (bgRef.current) {
        gsap.set(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
      }
      gsap.set(".cab-hero-eyebrow, .cab-hero-headline, .cab-hero-body, .cab-hero-cta", {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Opening state: dark ocean, blur 12px, opacity 0.75, scale 1.04
      gsap.set(bgRef.current, { filter: "blur(12px)", opacity: 0.7, scale: 1.04 });
      gsap.set(".cab-hero-eyebrow", { opacity: 0, y: 15 });
      gsap.set(".cab-hero-headline", { opacity: 0, y: 25 });
      gsap.set(".cab-hero-body", { opacity: 0, y: 20 });
      gsap.set(".cab-hero-cta", { opacity: 0, y: 15 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 0ms background begins
      // 300ms eyebrow
      tl.to(".cab-hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        // 500ms headline
        .to(".cab-hero-headline", { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        // 750ms body
        .to(".cab-hero-body", { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        // 950ms CTA
        .to(".cab-hero-cta", { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        // 1200-1600ms visual resolves to full clarity
        .to(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 1.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToHaven = () => {
    const el = document.getElementById("private-haven");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0"
    >
      {/* Background Hero Visual */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform">
        <img
          src="/images/cabanas/cabanas_hero.jpg"
          alt="Bahrain Surf Park Private Cabana"
          className="w-full h-full object-cover object-center opacity-85"
        />

        {/* Deep Ocean Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/50 to-[#02141C]/75 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-16 my-auto flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
        <div className="max-w-2xl">
          <span className="cab-hero-eyebrow text-[#00C8A0] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase mb-4 block">
            SIGNATURE CABANAS
          </span>

          <h1 className="cab-hero-headline font-serif text-5xl sm:text-7xl lg:text-[82px] font-bold text-white tracking-tight leading-[0.98] mb-6 drop-shadow-md">
            Your Private<br />Side of the Wave.
          </h1>

          <p className="cab-hero-body text-slate-200 text-base sm:text-lg font-sans leading-relaxed max-w-xl mb-8">
            A private space to slow down, recharge and experience the park your way.
          </p>

          <div className="cab-hero-cta flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-5">
            <button
              onClick={handleScrollToHaven}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2"
            >
              <span>EXPLORE CABANAS</span>
              <span className="text-sm">↓</span>
            </button>

            <button
              onClick={() => onOpenBooking("VIP Cabana")}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-4 rounded-xl text-xs uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>RESERVE YOUR EXPERIENCE</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
