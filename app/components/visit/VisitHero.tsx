"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface VisitHeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function VisitHero({ onOpenBooking }: VisitHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) {
      if (bgRef.current) {
        gsap.set(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
      }
      gsap.set(".visit-hero-eyebrow, .visit-hero-headline, .visit-hero-body, .visit-hero-cta", {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states for entrance sequence
      gsap.set(bgRef.current, { filter: "blur(12px)", opacity: 0.6, scale: 1.03 });
      gsap.set(".visit-hero-eyebrow", { opacity: 0, y: 15 });
      gsap.set(".visit-hero-headline", { opacity: 0, y: 25 });
      gsap.set(".visit-hero-body", { opacity: 0, y: 20 });
      gsap.set(".visit-hero-cta", { opacity: 0, y: 15 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 300ms: Eyebrow reveals upward
      tl.to(".visit-hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        // 500ms: Headline reveals
        .to(".visit-hero-headline", { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        // 750ms: Body appears
        .to(".visit-hero-body", { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        // 950ms: CTA appears
        .to(".visit-hero-cta", { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        // 1200-1600ms: Background resolves completely
        .to(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 1.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToPlan = () => {
    const el = document.getElementById("plan-your-visit");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0"
    >
      {/* Background Media */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/tier5.jpg"
          className="w-full h-full object-cover object-center opacity-80"
        >
          <source src="/videos/ocean.mp4" type="video/mp4" />
          <source src="/videos/surfing.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/60 to-[#02141C]/80 pointer-events-none" />
      </div>

      {/* Hero Content (Positioned safely below floating Navbar) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-16 my-auto flex flex-col justify-center text-left">
        <div className="max-w-2xl">
          <span className="visit-hero-eyebrow text-[#00C8A0] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase mb-4 block">
            PLAN YOUR VISIT
          </span>

          <h1 className="visit-hero-headline font-serif text-4xl sm:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.02] mb-6 drop-shadow-md">
            Essential Details Before You Paddle Out
          </h1>

          <p className="visit-hero-body text-slate-200 text-base sm:text-lg font-sans leading-relaxed max-w-xl mb-8">
            Located along the scenic coast of Bilaj Al Jazayer, Bahrain Surf Park is designed to make your surf day seamless from arrival to departure.
          </p>

          <div className="visit-hero-cta flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={() => onOpenBooking()}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2"
            >
              <span>BOOK YOUR SESSION</span>
              <span className="text-sm">→</span>
            </button>

            <button
              onClick={handleScrollToPlan}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-4 rounded-xl text-xs uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>EXPLORE THE PARK</span>
              <span className="text-xs">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
