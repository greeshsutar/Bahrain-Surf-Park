"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface InteractiveWaveSelectorProps {
  onOpenBooking: (tier?: string) => void;
}

export interface WaveProfileData {
  id: string;
  num: string;
  level: string;
  tierLabel: string;
  height: string;
  ride: string;
  board: string;
  character: string;
  desc: string;
  img: string;
  // Canvas Target Properties
  amplitude: number;
  frequency: number;
  speed: number;
  steepness: number;
  color: string;
}

const PROFILES: WaveProfileData[] = [
  {
    id: "01",
    num: "01",
    level: "BEGINNER",
    tierLabel: "TIER 01",
    height: "0.5 – 0.8m",
    ride: "120m",
    board: "Soft-top",
    character: "Gentle & Slow-Moving",
    desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment. Instructors are in the water with you the entire session.",
    img: "/images/tier1.jpg",
    amplitude: 25,
    frequency: 0.012,
    speed: 0.02,
    steepness: 0.2,
    color: "#00C8A0",
  },
  {
    id: "02",
    num: "02",
    level: "NOVICE",
    tierLabel: "TIER 02",
    height: "0.8 – 1.2m",
    ride: "140m",
    board: "Funboard",
    character: "Soft Open-Face",
    desc: "Designed for riders who can pop up and are ready to learn board control on soft open-face waves. This is where board control and timing start to click.",
    img: "/images/tier2.jpg",
    amplitude: 40,
    frequency: 0.015,
    speed: 0.028,
    steepness: 0.35,
    color: "#00B590",
  },
  {
    id: "03",
    num: "03",
    level: "PROGRESSIVE",
    tierLabel: "TIER 03",
    height: "1.2 – 1.5m",
    ride: "160m",
    board: "Fish / Longboard",
    character: "Waist-High Peeling",
    desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns. Expect real feedback on your positioning as waves grow more dynamic.",
    img: "/images/tier3.jpg",
    amplitude: 58,
    frequency: 0.018,
    speed: 0.035,
    steepness: 0.55,
    color: "#0B7FB5",
  },
  {
    id: "04",
    num: "04",
    level: "INTERMEDIATE",
    tierLabel: "TIER 04",
    height: "1.5 – 1.8m",
    ride: "180m",
    board: "Shortboard",
    character: "Chest-High Fast Wall",
    desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks. Built for surfers ready to link turns together with speed and control.",
    img: "/images/tier4.jpg",
    amplitude: 75,
    frequency: 0.022,
    speed: 0.045,
    steepness: 0.75,
    color: "#07536A",
  },
  {
    id: "05",
    num: "05",
    level: "EXPERT",
    tierLabel: "TIER 05",
    height: "1.8 – 2.2m",
    ride: "200m",
    board: "Step-Up",
    character: "Head-High Barreling Reef",
    desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels. Reserved for experienced surfers who know their way around a steep drop.",
    img: "/images/tier5.jpg",
    amplitude: 95,
    frequency: 0.026,
    speed: 0.055,
    steepness: 0.95,
    color: "#061C27",
  },
];

export default function InteractiveWaveSelector({ onOpenBooking }: InteractiveWaveSelectorProps) {
  const [activeIdx, setActiveIdx] = useState<number>(2); // Default PROGRESSIVE
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const currentParamsRef = useRef({
    amplitude: PROFILES[2].amplitude,
    frequency: PROFILES[2].frequency,
    speed: PROFILES[2].speed,
    steepness: PROFILES[2].steepness,
  });

  const activeProfile = PROFILES[activeIdx];

  // Morph canvas params when active profile changes
  useEffect(() => {
    const target = PROFILES[activeIdx];
    if (isReducedMotion()) {
      currentParamsRef.current = {
        amplitude: target.amplitude,
        frequency: target.frequency,
        speed: target.speed,
        steepness: target.steepness,
      };
      return;
    }

    gsap.to(currentParamsRef.current, {
      amplitude: target.amplitude,
      frequency: target.frequency,
      speed: target.speed,
      steepness: target.steepness,
      duration: 0.75,
      ease: "power2.out",
    });
  }, [activeIdx]);

  // Canvas Wave Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 420;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height * 0.55;

      time += currentParamsRef.current.speed;

      // Draw background gradient fill for ocean depth
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#061C27");
      bgGradient.addColorStop(0.6, "#082F3D");
      bgGradient.addColorStop(1, "#02141C");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw hydrodynamic grid background lines
      ctx.strokeStyle = "rgba(0, 200, 160, 0.08)";
      ctx.lineWidth = 1;
      const gridSpacing = 40;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render 3 overlapping wave layers for depth
      const waveLayers = [
        { offset: 0, opacity: 0.85, strokeWidth: 3.5, color: "#00C8A0" },
        { offset: Math.PI * 0.4, opacity: 0.4, strokeWidth: 2, color: "#0B7FB5" },
        { offset: Math.PI * 0.8, opacity: 0.2, strokeWidth: 1.5, color: "#00E5B3" },
      ];

      waveLayers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 4) {
          const normX = x / width;
          // Apply steepness distortion curve
          const wavePhase = (x * currentParamsRef.current.frequency) - time + layer.offset;
          const sineVal = Math.sin(wavePhase);
          // Modulate amplitude across center
          const envelope = Math.sin(normX * Math.PI);
          const steepVal = Math.pow(Math.abs(sineVal), 1 + currentParamsRef.current.steepness * 0.8) * Math.sign(sineVal);
          const y = centerY - steepVal * currentParamsRef.current.amplitude * envelope;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Fill wave body gradient
        const waveGradient = ctx.createLinearGradient(0, centerY - currentParamsRef.current.amplitude, 0, height);
        waveGradient.addColorStop(0, layer.color);
        waveGradient.addColorStop(1, "rgba(2, 20, 28, 0.95)");
        ctx.fillStyle = waveGradient;
        ctx.globalAlpha = layer.opacity;
        ctx.fill();

        // Stroke top crest curve
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const normX = x / width;
          const wavePhase = (x * currentParamsRef.current.frequency) - time + layer.offset;
          const sineVal = Math.sin(wavePhase);
          const envelope = Math.sin(normX * Math.PI);
          const steepVal = Math.pow(Math.abs(sineVal), 1 + currentParamsRef.current.steepness * 0.8) * Math.sign(sineVal);
          const y = centerY - steepVal * currentParamsRef.current.amplitude * envelope;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.strokeWidth;
        ctx.globalAlpha = layer.opacity + 0.15;
        ctx.stroke();
      });

      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Entrance Reveal Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wave-selector-anim",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: MOTION.STAGGER,
          ease: MOTION.ENTRANCE_EASE,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="find-your-wave-selector"
      className="bg-[#F7F6F1] text-[#0A1926] py-24 sm:py-32 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Profile Details & Booking CTA (approx 38% width) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <span className="wave-selector-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              CHOOSE YOUR RIDE
            </span>

            <h2 className="wave-selector-anim font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-4">
              Find the Wave<br />That Fits You.
            </h2>

            <p className="wave-selector-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              From your very first pop-up to advanced barrel riding, our programmable lagoon delivers five distinct wave profiles — each precisely tuned for height, speed, and shape.
            </p>

            {/* Active Profile Spec Card */}
            <div className="wave-selector-anim bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden transition-all duration-300">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#00C8A0] bg-[#061C27] px-2.5 py-0.5 rounded-full">
                    {activeProfile.tierLabel}
                  </span>
                  <span className="font-serif text-lg font-bold text-[#0A1926] uppercase">
                    {activeProfile.level}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                  {activeProfile.character}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                {activeProfile.desc}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-3 gap-3 py-3 border-t border-slate-100 text-left">
                <div>
                  <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest block mb-0.5">HEIGHT</span>
                  <span className="font-bold text-xs sm:text-sm text-[#00C8A0]">{activeProfile.height}</span>
                </div>
                <div className="border-l border-slate-100 pl-3">
                  <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest block mb-0.5">RIDE</span>
                  <span className="font-bold text-xs sm:text-sm text-[#0A1926]">{activeProfile.ride}</span>
                </div>
                <div className="border-l border-slate-100 pl-3">
                  <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest block mb-0.5">BOARD</span>
                  <span className="font-bold text-xs sm:text-sm text-[#0A1926] truncate block">{activeProfile.board}</span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="wave-selector-anim">
              <button
                onClick={() => onOpenBooking(activeProfile.level)}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-full sm:w-auto bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>BOOK {activeProfile.level} SESSION</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Morphing Wave Canvas Visualizer & Profile Buttons (approx 62% width) */}
          <div className="wave-selector-anim lg:col-span-7">
            <div className="bg-[#061C27] rounded-[26px] p-4 sm:p-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative">
              
              {/* Canvas Header HUD */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300">
                    LIVE WAVE GEOMETRY VISUALIZER
                  </span>
                </div>
                <span className="text-[10px] font-mono font-extrabold text-[#00C8A0] uppercase">
                  ACTIVE: {activeProfile.level} ({activeProfile.height})
                </span>
              </div>

              {/* Canvas Container */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>

              {/* Profile Selector Buttons (01 - 05) */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {PROFILES.map((p, idx) => {
                  const isSelected = idx === activeIdx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveIdx(idx)}
                      aria-label={`Select ${p.level} wave profile`}
                      className={`py-3 px-2 rounded-xl text-center transition-all duration-300 cursor-pointer border ${
                        isSelected
                          ? "bg-[#00C8A0] text-[#061C27] border-[#00C8A0] shadow-lg scale-[1.02] font-extrabold"
                          : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="block font-mono text-[9px] opacity-75 mb-0.5">WAVE {p.num}</span>
                      <span className="block font-sans text-[10px] sm:text-xs tracking-wider uppercase truncate">
                        {p.level}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
