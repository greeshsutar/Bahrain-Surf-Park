"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import { useLanguage } from "../../context/LanguageContext";

interface FindYourWaveHeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function FindYourWaveHero({ onOpenBooking }: FindYourWaveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  useEffect(() => {
    if (isReducedMotion()) {
      if (bgRef.current) {
        gsap.set(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
      }
      gsap.set(".fyw-hero-eyebrow, .fyw-hero-headline, .fyw-hero-body, .fyw-hero-cta", {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states for entrance sequence
      gsap.set(bgRef.current, { filter: "blur(4px)", opacity: 0.85, scale: 1.02 });
      gsap.set(".fyw-hero-eyebrow", { opacity: 0, y: 15 });
      gsap.set(".fyw-hero-headline", { opacity: 0, y: 25 });
      gsap.set(".fyw-hero-body", { opacity: 0, y: 20 });
      gsap.set(".fyw-hero-cta", { opacity: 0, y: 15 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 0ms background begins
      // 300ms eyebrow
      tl.to(".fyw-hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        // 500ms headline
        .to(".fyw-hero-headline", { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        // 750ms body
        .to(".fyw-hero-body", { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        // 950ms CTA
        .to(".fyw-hero-cta", { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        // 1200ms background resolves
        .to(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 1.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToSelector = () => {
    const el = document.getElementById("find-your-wave-selector");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0"
    >
      {/* Cinematic Background Video */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/tier5.jpg"
          className="w-full h-full object-cover object-center opacity-95"
        >
          <source src="/videos/surfing.mp4" type="video/mp4" />
          <source src="/videos/ocean.mp4" type="video/mp4" />
        </video>

        {/* Deep Ocean Scrim Overlay - Lightened for 25-35% clearer video & surfer detail */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/35 to-[#02141C]/25 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-16 my-auto flex flex-col justify-center text-left">
        <div className="max-w-2xl">
          <span className={`fyw-hero-eyebrow text-[#00C8A0] text-xs sm:text-sm font-extrabold mb-4 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.25em] uppercase"}`}>
            {isRtl ? "اطلب موجتك" : "FIND YOUR WAVE"}
          </span>

          <h1 className={`fyw-hero-headline font-serif text-5xl sm:text-7xl lg:text-[80px] font-bold text-white leading-[0.98] mb-6 drop-shadow-md ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
            {isRtl ? (
              <>
                موجتك الخاصة.<br />ركوبك المفضل.
              </>
            ) : (
              <>
                Your Wave.<br />Your Ride.
              </>
            )}
          </h1>

          <p className="fyw-hero-body text-slate-200 text-base sm:text-lg font-sans leading-relaxed max-w-xl mb-8">
            {isRtl
              ? "من المبتدئين حتى المحترفين، اعثر على الموجة المصممة بدقة لمستواك."
              : "From first-time surfers to experienced riders, find the wave precisely designed for your level."}
          </p>

          <div className="fyw-hero-cta flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={handleScrollToSelector}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "اكتشف موجتي" : "FIND MY WAVE"}</span>
              <span className="text-sm">{isRtl ? "←" : "→"}</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-4 rounded-xl text-xs backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "احجز مباشرة" : "BOOK DIRECT"}</span>
              <span className="text-xs">▷</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
