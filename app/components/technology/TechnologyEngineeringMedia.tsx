"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { isReducedMotion } from "../../constants/motion";

export default function TechnologyEngineeringMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const reduced = isReducedMotion();
    if (reduced) return;

    // Continuous smooth node animation along the hydrodynamic wave path
    const pathNode = pathRef.current;
    const circleNode = nodeRef.current;
    if (!pathNode || !circleNode) return;

    const pathLength = pathNode.getTotalLength();
    const progressObj = { value: 0 };

    const tween = gsap.to(progressObj, {
      value: 1,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        const point = pathNode.getPointAtLength(progressObj.value * pathLength);
        circleNode.setAttribute("cx", point.x.toString());
        circleNode.setAttribute("cy", point.y.toString());
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion() || !containerRef.current || !videoRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(videoRef.current, {
      scale: 1.025,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Move glowing trajectory focus node slightly toward cursor offset
    if (nodeRef.current) {
      const targetX = (x / rect.width) * 400;
      gsap.to(nodeRef.current, {
        r: 6,
        duration: 0.3,
        overwrite: "auto",
      });
    }
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

    if (nodeRef.current) {
      gsap.to(nodeRef.current, {
        r: 4.5,
        duration: 0.3,
        overwrite: "auto",
      });
    }
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

      {/* 3. Hydrodynamic Wave Trajectory SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 400 250"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C8A0" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00C8A0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0B7FB5" stopOpacity="0.2" />
          </linearGradient>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00C8A0" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Sinusoidal Wave Trajectory Curve */}
        <path
          ref={pathRef}
          d="M 10 180 C 100 210, 160 80, 240 130 C 300 170, 350 90, 390 120"
          fill="none"
          stroke="url(#waveLineGradient)"
          strokeWidth="2"
          strokeDasharray="4 3"
          className="tech-hud-trajectory transition-opacity duration-300 opacity-70 group-hover:opacity-100"
        />

        {/* Glowing Trajectory Node */}
        <circle
          ref={nodeRef}
          cx="240"
          cy="130"
          r="4.5"
          fill="#00C8A0"
          filter="url(#nodeGlow)"
          className="transition-all duration-300"
        />
      </svg>

      {/* 4. Interactive Engineering HUD Overlay */}
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
