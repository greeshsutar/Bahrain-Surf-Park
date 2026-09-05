"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import WaveDivider from "../WaveDivider";
import { useLanguage } from "../../context/LanguageContext";

interface VisitHeroProps {
  onOpenBooking?: (tier?: string) => void;
}

export default function VisitHero({ onOpenBooking }: VisitHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isReducedMotion()) {
      gsap.set(".visit-hero-anim", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Background Parallax
      if (parallaxRef.current && containerRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Initial Reveal Timeline
      gsap.set(".visit-hero-anim", { opacity: 0, y: 28 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".visit-hero-anim", { opacity: 1, y: 0, duration: 0.9, stagger: 0.14 }, 0.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToArrive = () => {
    const el = document.getElementById("arrive-at-coast");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/qcxXGozrQb9vLgnX8", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0"
    >
      {/* Cinematic Media Parallax Layer */}
      <div ref={parallaxRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 overflow-hidden will-change-transform">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/bahrain_surf_park_clean.jpg"
          className="w-full h-full object-cover object-center opacity-75 scale-105"
        >
          <source src="/videos/ocean.mp4" type="video/mp4" />
        </video>

        {/* Asymmetric Scrims & Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/45 to-[#02141C]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02141C]/85 via-[#02141C]/40 to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#00C8A0]/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      {/* Asymmetric Hero Content Block */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-44 pb-24 flex flex-col items-center sm:items-start justify-center text-center sm:text-left my-auto">
        <div className="max-w-3xl">
          <span className={`visit-hero-anim text-[#00C8A0] text-xs sm:text-sm font-extrabold mb-4 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.28em] uppercase"}`}>
            {isRtl ? "خطط لزيارتك" : "PLAN YOUR VISIT"}
          </span>

          <h1 className={`visit-hero-anim font-serif text-4xl sm:text-6xl lg:text-[72px] font-bold text-white leading-[1.01] mb-6 drop-shadow-lg ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
            {isRtl ? (
              <>
                كل ما تحتاجه<br />قبل وصولك إلى المنتزه.
              </>
            ) : (
              <>
                EVERYTHING YOU NEED<br />BEFORE YOU ARRIVE.
              </>
            )}
          </h1>

          <p className="visit-hero-anim text-slate-200 text-base sm:text-xl font-sans leading-relaxed max-w-2xl mb-10 drop-shadow-sm">
            {isRtl
              ? "تعرف على الاتجاهات نحو بلاج الجزائر، وادلة تحضير الزوار، والوصول للمواقف، ووسائل الراحة لضمان وصولك السلس للشاطئ."
              : "Find your route to Bilaj Al Jazayer, explore guest preparation guides, parking access, resort amenities, and safety details to ensure your arrival on Bahrain's southwest coast is effortless."}
          </p>

          <div className="visit-hero-anim flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <button
              onClick={handleGetDirections}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-9 py-4 rounded-xl text-xs transition-all shadow-xl hover:shadow-[#00C8A0]/40 cursor-pointer inline-flex items-center gap-2.5 hover:-translate-y-0.5 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "احصل على الاتجاهات" : "GET DIRECTIONS"}</span>
              <span className="text-sm font-normal">{isRtl ? "←" : "→"}</span>
            </button>

            <button
              onClick={handleScrollToArrive}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl text-xs backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2 hover:-translate-y-0.5 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              }`}
            >
              <span>{isRtl ? "معلومات هامة قبل الزيارة" : "KNOW BEFORE YOU GO"}</span>
              <span className="text-xs">↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* Signature Shoreline Wave Divider Transitioning into Warm White Destination Section */}
      <WaveDivider fill="#F7F6F1" showGreenScrollLine={true} />
    </section>
  );
}
