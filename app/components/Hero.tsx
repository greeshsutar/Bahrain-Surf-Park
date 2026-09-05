"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const { lang, t } = useLanguage();
  const heroSectionRef = useRef<HTMLElement>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = isReducedMotion();
    const video = heroVideoRef.current;
    const parallaxLayer = parallaxWrapperRef.current;

    // REDUCED MOTION
    if (reduced) {
      gsap.set(
        [
          ".hero-eyebrow",
          ".hero-headline",
          ".hero-subtitle",
          ".hero-buttons",
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );

      if (video) {
        video.play().catch(() => { });
      }

      return;
    }

    // PARALLAX
    let videoParallax: gsap.core.Tween | null = null;

    if (parallaxLayer && heroSectionRef.current) {
      videoParallax = gsap.to(parallaxLayer, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // TEXT ENTRANCE ANIMATION (Crisp & immediate, zero blur delay)
    const tl = gsap.timeline({ delay: 0.2 });

    // EYEBROW
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      0.1
    );

    // HEADLINE
    tl.fromTo(
      ".hero-headline",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      0.25
    );

    // SUBTITLE
    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      0.45
    );

    // BUTTONS
    tl.fromTo(
      ".hero-buttons",
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      0.65
    );

    // Ensure video plays cleanly
    if (video) {
      video.play().catch(() => { });
    }

    return () => {
      if (videoParallax) {
        videoParallax.kill();
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative w-full hero-vh-screen min-h-[580px] sm:min-h-[720px] overflow-hidden flex flex-col justify-between z-0 bg-[#061C27]"
    >
      {/* LAYER 1: Outer Scroll Parallax Wrapper */}
      <div
        ref={parallaxWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#061C27]"
      >
        {/* Crisp Video Container (Zero blur, 100% sharp original video) */}
        <div className="w-full h-full overflow-hidden relative">
          {/* LAYER 2: Existing Original Video Element */}
          <video
            ref={heroVideoRef}
            id="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/bahrain_surf_park_clean.jpg"
            className="w-full h-full object-cover relative z-10 opacity-100 filter-none"
          >
            <source src="/videos/create_a_video.mp4" type="video/mp4" />
          </video>

          {/* Editorial Left Gradient Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06232D]/70 via-[#06232D]/35 to-transparent z-20 pointer-events-none" />

          {/* Top Navbar Scrim */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#061922]/65 to-transparent z-20 pointer-events-none" />
        </div>
      </div>

      {/* Crisp UI & Asymmetric Left-Aligned Text Block (Reveals sequentially after media resolves) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 my-auto pt-28 pb-16 flex flex-col items-center sm:items-start justify-end">
        <div className="max-w-xl lg:max-w-2xl text-center sm:text-left">
          {/* Location Eyebrow */}
          <div className="hero-eyebrow mb-3 flex items-center gap-2 opacity-0">
            <span className="inline-flex items-center gap-2 bg-[#00C8A0]/15 backdrop-blur-md border border-[#00C8A0]/40 text-[#00C8A0] text-xs font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-pulse" />
              <span>
                {lang === "ar"
                  ? "افتتاح 2026 • بلاج الجزائر، الساحل الجنوبي الغربي للبحرين"
                  : "Opening 2026 • Bilaj Al Jazayer, Bahrain Southwest Coast"}
              </span>
            </span>
          </div>

          {/* Left-Aligned Display Headline */}
          <h1
            className={`hero-headline font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.08] mb-5 opacity-0 ${
              lang === "ar" ? "tracking-normal font-sans" : "tracking-tight"
            }`}
          >
            {lang === "ar" ? (
              <>
                فخامة الجزيرة.<br />
                أمواج مثالية.
              </>
            ) : (
              <>
                Island Luxury.<br />
                Perfect Waves.
              </>
            )}
          </h1>

          {/* Left-Aligned Subtitle */}
          <p
            className={`hero-subtitle text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-[500px] mb-8 font-sans opacity-0 ${
              lang === "ar" ? "tracking-normal" : ""
            }`}
          >
            {lang === "ar"
              ? "تقنية الأمواج الأكثر تقدمًا في العالم تلتقي بروح الحياة الساحلية في قلب البحرين."
              : "The world's most advanced wave technology meeting the spirit of island living in the heart of Bahrain."}
          </p>

          {/* Left-Aligned Dual Action Buttons */}
          <div className="hero-buttons flex flex-wrap items-center justify-center sm:justify-start gap-6 opacity-0">
            {/* Primary Action Button */}
            <a
              href="#find-your-wave"
              onClick={(e) => handleNavClick(e, "#find-your-wave")}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-gradient-to-r from-[#00C8A0] to-[#0B7FB5] hover:opacity-95 text-white px-7 py-3.5 rounded-lg text-xs font-bold ${
                lang === "ar" ? "tracking-normal font-sans" : "uppercase tracking-widest"
              } shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer`}
            >
              <span>{lang === "ar" ? "استكشف الحديقة" : "DISCOVER THE PARK"}</span>
              <span className="text-sm font-normal">{lang === "ar" ? "←" : "→"}</span>
            </a>

            {/* Secondary Action Button */}
            <a
              href="#technology"
              onClick={(e) => handleNavClick(e, "#technology")}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`inline-flex items-center gap-3 text-white text-xs font-bold ${
                lang === "ar" ? "tracking-normal font-sans" : "uppercase tracking-wider"
              } hover:text-[#00C8A0] transition-colors group cursor-pointer`}
            >
              <span className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center bg-black/15 group-hover:border-white transition-all">
                <svg className="w-3.5 h-3.5 fill-current text-white translate-x-[1px]" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>{lang === "ar" ? "شاهد التجربة" : "WATCH THE EXPERIENCE"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Organic Shoreline Water Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none translate-y-[1px]" aria-hidden="true">
        <svg
          className="block w-full h-[60px] sm:h-[90px] md:h-[120px] lg:h-[145px] leading-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="shoreline-shadow" x="-10%" y="-30%" width="120%" height="220%">
              <feDropShadow dx="0" dy="-8" stdDeviation="12" floodColor="#06232D" floodOpacity="0.16" />
              <feDropShadow dx="0" dy="-2" stdDeviation="4" floodColor="#06232D" floodOpacity="0.10" />
            </filter>
          </defs>

          {/* Layer 1: Semi-transparent Cyan/Ocean Water Underlayer for Depth */}
          <path
            d="M 0,110 C 220,135 440,145 680,95 C 920,40 1160,95 1440,65 L 1440,180 L 0,180 Z"
            fill="rgba(11, 127, 181, 0.22)"
          />

          {/* Layer 2: Pure White Foreground Shoreline Wave with Soft Shadow */}
          <path
            d="M 0,95 C 240,128 480,138 720,85 C 960,32 1200,88 1440,55 L 1440,180 L 0,180 Z"
            fill="#FFFFFF"
            filter="url(#shoreline-shadow)"
          />
        </svg>
      </div>
    </section>
  );
}
