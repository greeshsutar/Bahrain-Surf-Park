"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

interface HeroProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);
  const cinematicFilterRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = isReducedMotion();
    const video = heroVideoRef.current;
    const filterLayer = cinematicFilterRef.current;
    const parallaxLayer = parallaxWrapperRef.current;

    // 1. Reduced Motion Fallback
    if (reduced) {
      setIsVideoReady(true);
      if (filterLayer) {
        gsap.set(filterLayer, { opacity: 1, filter: "blur(0px)", scale: 1 });
      }
      gsap.set([".hero-eyebrow", ".hero-headline", ".hero-subtitle", ".hero-buttons"], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    // 2. Separate ScrollTrigger Parallax Tween on Outer Wrapper (No transform conflict)
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

    // 3. Cinematic Film Reveal Timeline
    let hasRevealed = false;
    const triggerCinematicReveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      setIsVideoReady(true);

      const revealTl = gsap.timeline({
        onComplete: () => {
          // Clean handoff to continuous slow Ken Burns scale effect on video element
          if (heroVideoRef.current && !isReducedMotion()) {
            gsap.to(heroVideoRef.current, {
              scale: 1.035,
              duration: 12,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          }
        },
      });

      // 0.3s - 1.5s: Cinematic Media Filter Resolve (blur 10px->0px, opacity 0.70->1.0, scale 1.04->1.00)
      if (filterLayer) {
        revealTl.to(
          filterLayer,
          {
            opacity: 1.0,
            filter: "blur(0px)",
            scale: 1.0,
            duration: 1.3,
            ease: "power2.out",
          },
          0.3
        );
      }

      // 1.0s - 1.7s: Location Eyebrow Reveal
      revealTl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        1.0
      );

      // 1.2s - 1.9s: Display Headline Reveal
      revealTl.fromTo(
        ".hero-headline",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        1.2
      );

      // 1.4s - 2.1s: Subtitle Reveal
      revealTl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        1.4
      );

      // 1.7s - 2.3s: Action Buttons Reveal
      revealTl.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        1.7
      );
    };

    // 4. Media Event Listener (No fake timer as main trigger)
    if (video) {
      if (video.readyState >= 3) {
        triggerCinematicReveal();
      } else {
        const handleReady = () => triggerCinematicReveal();
        video.addEventListener("loadeddata", handleReady);
        video.addEventListener("canplay", handleReady);
        video.addEventListener("playing", handleReady);
        video.addEventListener("error", handleReady);

        // Safety fallback timer (3.5s) if browser restricts autoplay/slow network
        const fallbackTimer = setTimeout(() => {
          triggerCinematicReveal();
        }, 3500);

        return () => {
          video.removeEventListener("loadeddata", handleReady);
          video.removeEventListener("canplay", handleReady);
          video.removeEventListener("playing", handleReady);
          video.removeEventListener("error", handleReady);
          clearTimeout(fallbackTimer);
        };
      }
    } else {
      triggerCinematicReveal();
    }

    return () => {
      if (videoParallax) videoParallax.kill();
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
      {/* 1. LAYER 1: Outer Scroll Parallax Wrapper */}
      <div
        ref={parallaxWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#061C27]"
      >
        {/* 2. LAYER 2: Cinematic Blur & Opacity Filter Wrapper (Starts dark ocean + blur(10px) + scale(1.04)) */}
        <div
          ref={cinematicFilterRef}
          className="w-full h-full overflow-hidden relative"
          style={{
            opacity: isVideoReady ? 1 : 0.7,
            filter: isVideoReady ? "blur(0px)" : "blur(10px)",
            transform: isVideoReady ? "scale(1)" : "scale(1.04)",
            willChange: "transform, filter, opacity",
          }}
        >
          {/* 3. LAYER 3: Existing Video Element with First-Frame Poster */}
          <video
            ref={heroVideoRef}
            id="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/bahrain_surf_park_clean.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/create_a_video.mp4?v=20260828_clear" type="video/mp4" />
          </video>

          {/* Editorial Left Gradient Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06232D]/75 via-[#06232D]/40 to-transparent z-10 pointer-events-none" />

          {/* Top Navbar Scrim */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#061922]/65 to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* 4. Crisp UI & Asymmetric Left-Aligned Text Block (Reveals sequentially) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 my-auto pt-28 pb-16 flex flex-col justify-end">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Location Eyebrow */}
          <div className="hero-eyebrow mb-3 flex items-center gap-2 opacity-0">
            <span className="inline-flex items-center gap-2 bg-[#00C8A0]/15 backdrop-blur-md border border-[#00C8A0]/40 text-[#00C8A0] text-xs font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-pulse" />
              <span>Opening 2026 • Bilaj Al Jazayer, Bahrain Southwest Coast</span>
            </span>
          </div>

          {/* Left-Aligned Display Headline */}
          <h1 className="hero-headline font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.08] mb-5 opacity-0">
            Island Luxury.<br />Perfect Waves.
          </h1>

          {/* Left-Aligned Subtitle */}
          <p className="hero-subtitle text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-[500px] mb-8 font-sans opacity-0">
            The world's most advanced wave technology meeting the spirit of island living in the heart of Bahrain.
          </p>

          {/* Left-Aligned Dual Action Buttons */}
          <div className="hero-buttons flex flex-wrap items-center gap-6 opacity-0">
            {/* Primary Action Button */}
            <a
              href="#find-your-wave"
              onClick={(e) => handleNavClick(e, "#find-your-wave")}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-gradient-to-r from-[#00C8A0] to-[#0B7FB5] hover:opacity-95 text-white px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>DISCOVER THE PARK</span>
              <span className="text-sm font-normal">→</span>
            </a>

            {/* Secondary Action Button */}
            <a
              href="#technology"
              onClick={(e) => handleNavClick(e, "#technology")}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="inline-flex items-center gap-3 text-white text-xs font-bold uppercase tracking-wider hover:text-[#00C8A0] transition-colors group cursor-pointer"
            >
              <span className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center bg-black/15 group-hover:border-white transition-all">
                <svg className="w-3.5 h-3.5 fill-current text-white translate-x-[1px]" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>WATCH THE EXPERIENCE</span>
            </a>
          </div>
        </div>
      </div>

      {/* 5. Organic Shoreline Water Transition */}
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
