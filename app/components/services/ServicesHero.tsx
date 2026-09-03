"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import { useLanguage } from "../../context/LanguageContext";

interface ServicesHeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function ServicesHero({ onOpenBooking }: ServicesHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  useEffect(() => {
    if (isReducedMotion()) {
      if (bgRef.current) {
        gsap.set(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
      }
      gsap.set(".srv-hero-eyebrow, .srv-hero-headline, .srv-hero-body, .srv-hero-cta", {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial states for entrance sequence
      gsap.set(bgRef.current, { filter: "blur(12px)", opacity: 0.65, scale: 1.04 });
      gsap.set(".srv-hero-eyebrow", { opacity: 0, y: 15 });
      gsap.set(".srv-hero-headline", { opacity: 0, y: 25 });
      gsap.set(".srv-hero-body", { opacity: 0, y: 20 });
      gsap.set(".srv-hero-cta", { opacity: 0, y: 15 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 0ms background begins
      // 300ms eyebrow
      tl.to(".srv-hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        // 500ms headline
        .to(".srv-hero-headline", { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        // 750ms body
        .to(".srv-hero-body", { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        // 950ms CTA
        .to(".srv-hero-cta", { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        // 1200-1600ms image resolves to full clarity
        .to(bgRef.current, { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 1.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToStack = () => {
    const el = document.getElementById("services-card-stack");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0"
    >
      {/* Background Hero Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform">
        <img
          src="/images/services/services_hero.jpg"
          alt="Bahrain Surf Park Services & Hospitality"
          className="w-full h-full object-cover object-center opacity-85"
        />

        {/* Deep Ocean Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/55 to-[#02141C]/80 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-16 my-auto flex flex-col justify-center text-left">
        <div className="max-w-2xl">
          <span className={`srv-hero-eyebrow text-[#00C8A0] text-xs sm:text-sm font-extrabold mb-4 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.25em] uppercase"}`}>
            {isRtl ? "الخدمات والضيافة" : "SERVICES"}
          </span>

          <h1 className={`srv-hero-headline font-serif text-5xl sm:text-7xl lg:text-[80px] font-bold text-white leading-[0.98] mb-6 drop-shadow-md ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
            {isRtl ? (
              <>
                كل ما تحتاجه.<br />بأعلى معايير الراحة.
              </>
            ) : (
              <>
                Everything You Need.<br />Nothing You Don't.
              </>
            )}
          </h1>

          <p className="srv-hero-body text-slate-200 text-base sm:text-lg font-sans leading-relaxed max-w-xl mb-8">
            {isRtl
              ? "اكتشف الخدمات المنتقاة بعناية لجعل وقتك في حديقة البحرين لركوب الأمواج سلسًا ومريحًا ولا يُنسى."
              : "Discover the curated services designed to make your time at Bahrain Surf Park seamless, comfortable and unforgettable."}
          </p>

          <div className="srv-hero-cta flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={handleScrollToStack}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "استكشف الخدمات" : "EXPLORE SERVICES"}</span>
              <span className="text-sm">↓</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-4 rounded-xl text-xs backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "احجز تجربتك" : "BOOK YOUR EXPERIENCE"}</span>
              <span className="text-xs">{isRtl ? "←" : "→"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
