"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import { useLanguage } from "../../context/LanguageContext";

interface AcademyHeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function AcademyHero({ onOpenBooking }: AcademyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  useEffect(() => {
    if (isReducedMotion()) {
      if (bgRef.current) {
        gsap.set(bgRef.current, { filter: "none", opacity: 1, scale: 1 });
      }
      gsap.set(".acad-hero-eyebrow, .acad-hero-headline, .acad-hero-body, .acad-hero-cta", {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Clear initial blur and keep background sharp & bright from start
      gsap.set(bgRef.current, { filter: "none", opacity: 0.95, scale: 1.02 });
      gsap.set(".acad-hero-eyebrow", { opacity: 0, y: 15 });
      gsap.set(".acad-hero-headline", { opacity: 0, y: 25 });
      gsap.set(".acad-hero-body", { opacity: 0, y: 20 });
      gsap.set(".acad-hero-cta", { opacity: 0, y: 15 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 300ms eyebrow
      tl.to(".acad-hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        // 500ms headline
        .to(".acad-hero-headline", { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        // 750ms body
        .to(".acad-hero-body", { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        // 950ms CTA
        .to(".acad-hero-cta", { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        // Visual image settles smoothly
        .to(bgRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.6);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToLevels = () => {
    const el = document.getElementById("academy-levels");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0"
    >
      {/* Background Hero Image / Video */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform">
        <img
          src="/images/academy_hero.jpg"
          alt="Bahrain Surf Park Academy instruction"
          className="w-full h-full object-cover object-center opacity-100"
        />

        {/* Light & Moderate Deep Ocean Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C]/65 via-[#02141C]/25 to-[#02141C]/30 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-16 my-auto flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
        <div className="max-w-2xl">
          <span className={`acad-hero-eyebrow text-[#00C8A0] text-xs sm:text-sm font-extrabold mb-4 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.25em] uppercase"}`}>
            {isRtl ? "أكاديمية ركوب الأمواج" : "THE SURF ACADEMY"}
          </span>

          <h1 className={`acad-hero-headline font-serif text-5xl sm:text-7xl lg:text-[80px] font-bold text-white leading-[0.98] mb-6 drop-shadow-md ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
            {isRtl ? (
              <>
                تعلم ركوب الأمواج.<br />أتقن أداءك.
              </>
            ) : (
              <>
                Learn To Surf.<br />Learn To Ride.
              </>
            )}
          </h1>

          <p className="acad-hero-body text-slate-200 text-base sm:text-lg font-sans leading-relaxed max-w-xl mb-8">
            {isRtl
              ? "من محاولتك الأولى حتى إتقانك لأفضل ركوب، ابنِ الثقة والتقنية والانسيابية مع مدربين معتمدين دوليًا من ISA."
              : "From your first paddle to your next breakthrough, build confidence, technique and flow with expert ISA-certified coaching."}
          </p>

          <div className="acad-hero-cta flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-5">
            <button
              onClick={() => onOpenBooking()}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "ابدأ رحلتك" : "START YOUR JOURNEY"}</span>
              <span className="text-sm">{isRtl ? "←" : "→"}</span>
            </button>

            <button
              onClick={handleScrollToLevels}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-4 rounded-xl text-xs backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "استكشف الأكاديمية" : "EXPLORE THE ACADEMY"}</span>
              <span className="text-xs">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
