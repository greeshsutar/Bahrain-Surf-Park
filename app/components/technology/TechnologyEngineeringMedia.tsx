"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { isReducedMotion } from "../../constants/motion";

export default function TechnologyEngineeringMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion() || !containerRef.current || !videoRef.current) return;

    gsap.to(videoRef.current, {
      scale: 1.025,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (isReducedMotion() || !videoRef.current) return;
    setIsHovered(false);

    gsap.to(videoRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tech-hud-container relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[22px] overflow-hidden shadow-2xl bg-[#092531] border border-[#00C8A0]/30 ring-1 ring-[#00C8A0]/20 group transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,200,160,0.15)]"
    >
      {/* 1. Primary Wave Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/wavecove.png"
        className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
      >
        <source src="/videos/wave.mp4" type="video/mp4" />
      </video>

      {/* 2. Soft Dark Scrim for Pristine Readout Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#092531]/80 via-transparent to-[#092531]/50 pointer-events-none z-10" />

      {/* 3. Interactive Engineering HUD Overlay */}
      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none z-30 font-sans text-white">
        
        {/* Top Readout Bar */}
        <div className="flex items-center justify-between">
          
          {/* Top-Left: Live System Status */}
          <div className="flex items-center gap-2 bg-[#092531]/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-md">
            <span className={`w-2 h-2 rounded-full bg-[#00C8A0] ${isHovered ? "animate-ping" : "animate-pulse"}`}></span>
            <span className="text-[9.5px] font-extrabold tracking-[0.18em] uppercase text-white">
              LIVE SYSTEM <span className="text-[#00C8A0] ml-1">WAVE GENERATOR ACTIVE</span>
            </span>
          </div>

          {/* Top-Right: Profile Mode */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#092531]/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-md">
            <span className="text-[9.5px] font-extrabold tracking-[0.18em] uppercase text-white/70">
              PROFILE: <span className="text-[#00C8A0]">REAL-TIME</span>
            </span>
          </div>

        </div>

        {/* Bottom Readout Bar: Real-time Telemetry Indicators */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3 sm:gap-4 bg-[#092531]/85 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-[10px] font-sans text-white/90 shadow-lg">
            <div className="flex items-center gap-1">
              <span className="text-white/50">HT:</span>
              <span className="font-bold text-[#00C8A0]">0.5–2.2M</span>
            </div>
            <span className="w-[1px] h-3 bg-white/20"></span>
            <div className="flex items-center gap-1">
              <span className="text-white/50">SPD:</span>
              <span className="font-bold text-white">CALIBRATED</span>
            </div>
            <span className="w-[1px] h-3 bg-white/20"></span>
            <div className="flex items-center gap-1">
              <span className="text-white/50">SHP:</span>
              <span className="font-bold text-[#00C8A0]">DYNAMIC</span>
            </div>
          </div>

          {/* Subtle Wave Tracking Node Badge */}
          <div className="text-[9px] font-sans font-bold uppercase text-[#00C8A0] tracking-widest bg-black/40 px-2.5 py-1 rounded border border-[#00C8A0]/30 hidden sm:block">
            HYDRO-52 ACTIVE
          </div>
        </div>

      </div>
    </div>
  );
}

