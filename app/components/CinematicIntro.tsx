"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";

interface CinematicIntroProps {
  onOpenBooking?: (tier?: string) => void;
}

export default function CinematicIntro({ onOpenBooking }: CinematicIntroProps) {
  const { lang, setLang } = useLanguage();
  const isRtl = lang === "ar";

  const [isMounted, setIsMounted] = useState(false);
  // State: "playing" | "ended" | "revealing" | "completed"
  const [introState, setIntroState] = useState<"playing" | "ended" | "revealing" | "completed">("playing");

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoCtaRef = useRef<HTMLDivElement>(null);
  const surfboardRef = useRef<HTMLDivElement>(null);
  const overlayLayerRef = useRef<HTMLDivElement>(null);

  // 1. Client Hydration & First-Visit Check from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const seen =
        localStorage.getItem("bahrain-surf-intro-seen") ||
        localStorage.getItem("bsp_intro_seen");
      if (seen === "true") {
        setIntroState("completed");
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // 1b. Listen for a manual replay trigger (fired by the Navbar logo click)
  useEffect(() => {
    const handleReplay = () => {
      setIntroState("playing");
    };
    window.addEventListener("bsp:replay-intro", handleReplay);
    return () => window.removeEventListener("bsp:replay-intro", handleReplay);
  }, []);

  // 2. Lock page scroll while intro is active; restore when completed
  useEffect(() => {
    if (introState !== "completed") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introState]);

  // 3. Video end handler
  const handleVideoEnded = () => {
    setIntroState("ended");
  };

  // Fallback in case video fails to autoPlay or load
  const handleVideoError = () => {
    console.warn("Intro video could not be played, advancing to ended state.");
    setIntroState("ended");
  };

  // 4. Animate Explore CTA entrance when video naturally ends
  useEffect(() => {
    if (introState === "ended" && logoCtaRef.current) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(logoCtaRef.current, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          logoCtaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
    }
  }, [introState]);

  // 5. Handle "EXPLORE NOW" Click -> Save Persistent Flag & Signature Surfboard Reveal
  const handleExploreClick = () => {
    if (introState === "revealing" || introState === "completed") return;
    setIntroState("revealing");

    // ONLY mark intro as completed in persistent storage upon EXPLORE NOW click
    try {
      localStorage.setItem("bahrain-surf-intro-seen", "true");
      localStorage.setItem("bsp_intro_seen", "true");
    } catch {
      // LocalStorage fallback
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (overlayLayerRef.current) {
        gsap.to(overlayLayerRef.current, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => setIntroState("completed"),
        });
      } else {
        setIntroState("completed");
      }
      return;
    }

    // GSAP Surfboard Left -> Right Sweep & Wave Clip-Path Uncover
    const tl = gsap.timeline({
      onComplete: () => {
        setIntroState("completed");
      },
    });

    const overlay = overlayLayerRef.current;
    const surfboard = surfboardRef.current;

    if (overlay && surfboard) {
      // Animate Surfboard from Left (-30vw) to Right (120vw)
      tl.fromTo(
        surfboard,
        { x: "-30vw", opacity: 1, rotation: -4 },
        {
          x: "120vw",
          rotation: 3,
          duration: 3.2,
          ease: "power1.inOut",
        },
        0
      );

      // Animate Clip-Path Mask of Overlay Layer to reveal website underneath
      tl.to(
        overlay,
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          duration: 3.0,
          ease: "power1.inOut",
        },
        0.15
      );
    } else {
      setIntroState("completed");
    }
  };

  // Returning users or unmounted SSR -> Return null immediately with zero render overhead
  if (!isMounted || introState === "completed") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="cinematic-intro-root"
      className="fixed inset-0 z-[99999] w-full h-[100dvh] overflow-hidden select-none bg-[#02141C]"
      aria-label="Bahrain Surf Park Cinematic Intro"
      role="region"
    >
      {/* OVERLAY LAYER (Holds Video + Top Header UI + Center CTA) */}
      <div
        ref={overlayLayerRef}
        className="absolute inset-0 w-full h-full bg-[#02141C] overflow-hidden"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          willChange: "clip-path",
        }}
      >
        {/* 1. TOP HEADER OVER THE VIDEO (LEFT: Header Logo | RIGHT: EN | AR + GET EARLY ACCESS CTA) */}
        <header className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-12 py-5 sm:py-6 flex items-center justify-between pointer-events-auto">
          {/* LEFT: Existing Bahrain Surf Park Header Logo */}
          <div className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="Bahrain Surf Park Logo"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-md origin-left transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* RIGHT: EN | AR Switcher & GET EARLY ACCESS CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Global Language Switcher */}
            <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-bold tracking-wider font-sans bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <button
                onClick={() => setLang("en")}
                className={`transition-colors cursor-pointer px-1 ${lang === "en"
                  ? "text-[#00C8A0] font-extrabold"
                  : "text-white/60 hover:text-white"
                  }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
              <span className="text-white/30 font-light">|</span>
              <button
                onClick={() => setLang("ar")}
                className={`transition-colors cursor-pointer px-1 ${lang === "ar"
                  ? "text-[#00C8A0] font-extrabold font-sans"
                  : "text-white/60 hover:text-white font-sans"
                  }`}
                aria-label="Switch language to Arabic"
              >
                AR
              </button>
            </div>

            {/* GET EARLY ACCESS CTA (Reuses onOpenBooking without completing intro) */}
            <button
              onClick={() => onOpenBooking && onOpenBooking("Early Access")}
              className={`bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[#00C8A0]/50 hover:scale-105 active:scale-95 border border-[#00C8A0] ${isRtl ? "font-sans tracking-normal" : "uppercase tracking-widest"
                }`}
            >
              {isRtl ? "احصل على الدخول المبكر" : "GET EARLY ACCESS"}
            </button>
          </div>
        </header>

        {/* 2. Pure Clear Video (NO Blurs, NO Scrims, NO Dark Overlays, Opacity 100%) */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          className="w-full h-full object-cover object-center opacity-100 filter-none pointer-events-none"
        >
          <source src="/videos/resortintro.mp4" type="video/mp4" />
        </video>

        {/* 3. EXPLORE NOW CTA (Revealed smoothly after video naturally ends - NO DUPLICATE LOGO) */}
        {introState === "ended" && (
          <div
            ref={logoCtaRef}
            className="absolute inset-x-0 bottom-16 sm:bottom-20 flex flex-col items-center justify-center p-6 z-20 pointer-events-auto"
          >
            {/* Smooth Accessible Explore Now Button */}
            <button
              onClick={handleExploreClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleExploreClick();
                }
              }}
              className={`group relative px-10 py-4 sm:px-12 sm:py-5 rounded-2xl bg-[#00C8A0] hover:bg-[#00E5B3] text-[#02141C] font-extrabold text-sm sm:text-base ${isRtl ? "font-sans tracking-normal" : "uppercase tracking-[0.25em]"
                } transition-all duration-300 shadow-[0_0_40px_rgba(0,200,160,0.5)] hover:shadow-[0_0_60px_rgba(0,200,160,0.8)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3`}
              aria-label={isRtl ? "استكشف المنتزه الآن" : "Explore Bahrain Surf Park Now"}
            >
              <span>{isRtl ? "استكشف الآن" : "EXPLORE NOW"}</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                {isRtl ? "←" : "→"}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* 4. SIGNATURE SURFBOARD REVEAL ELEMENT (Sweeps Left -> Right across screen) */}
      <div
        ref={surfboardRef}
        className={`fixed top-1/2 -translate-y-1/2 z-[100000] pointer-events-none ${introState === "revealing" ? "opacity-100" : "opacity-0"
          }`}
        style={{ willChange: "transform" }}
      >
        {/* High Definition Vector Surfboard & Spray Contour */}
        <div className="relative flex items-center">
          {/* Water Spray & Displaced Liquid Wave Effect behind board */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-[500px] sm:w-[720px] h-[220px] opacity-80 pointer-events-none">
            <svg viewBox="0 0 500 160" fill="none" className="w-full h-full">
              <path
                d="M500,80 C400,20 300,140 200,60 C100,120 50,40 0,80 C50,120 100,20 200,100 C300,20 400,140 500,80 Z"
                fill="url(#sprayGradient)"
              />
              <defs>
                <linearGradient id="sprayGradient" x1="500" y1="80" x2="0" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00C8A0" stopOpacity="0.8" />
                  <stop offset="0.5" stopColor="#0077B6" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Detailed Surfboard Graphic — real board image */}
          <div className="relative w-[380px] sm:w-[560px] h-[126px] sm:h-[185px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <img
              src="/images/surfboard_reveal.png"
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
