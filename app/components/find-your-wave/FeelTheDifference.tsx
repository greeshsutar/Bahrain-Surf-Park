"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

export default function FeelTheDifference() {
  const [heightVal, setHeightVal] = useState<number>(1.4); // 0.5m - 2.2m
  const [speedVal, setSpeedVal] = useState<number>(50); // 10 - 100
  const [shapeVal, setShapeVal] = useState<number>(50); // 0 (Soft) - 100 (Hollow Barrel)

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Live Canvas Wave Render Loop
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
      canvas.height = canvas.parentElement.clientHeight || 380;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handlePointerMove = (e: MouseEvent) => {
      if (isReducedMotion()) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Clamp pointer offset to 8px max
      pointerRef.current.targetX = Math.max(-8, Math.min(8, x * 0.05));
      pointerRef.current.targetY = Math.max(-8, Math.min(8, y * 0.05));
    };

    const handlePointerLeave = () => {
      pointerRef.current.targetX = 0;
      pointerRef.current.targetY = 0;
    };

    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("mouseleave", handlePointerLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Smooth pointer offset interpolation
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.1;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.1;

      const centerY = height * 0.55 + pointerRef.current.y;
      const calcSpeed = (speedVal / 100) * 0.05 + 0.01;
      const calcAmp = ((heightVal - 0.5) / 1.7) * 70 + 20;
      const calcSteep = shapeVal / 100;

      time += calcSpeed;

      // Draw background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#02141C");
      bgGrad.addColorStop(0.5, "#061C27");
      bgGrad.addColorStop(1, "#082F3D");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = "rgba(0, 200, 160, 0.07)";
      ctx.lineWidth = 1;
      const grid = 36;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x + pointerRef.current.x * 0.5, 0);
        ctx.lineTo(x + pointerRef.current.x * 0.5, height);
        ctx.stroke();
      }

      // Render 3 Wave Curves
      const layers = [
        { opacity: 0.9, color: "#00C8A0", width: 3.5, freq: 0.016, phase: 0 },
        { opacity: 0.45, color: "#0B7FB5", width: 2, freq: 0.014, phase: Math.PI * 0.5 },
        { opacity: 0.25, color: "#00E5B3", width: 1.5, freq: 0.012, phase: Math.PI * 0.9 },
      ];

      layers.forEach((lyr) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 4) {
          const normX = x / width;
          const envelope = Math.sin(normX * Math.PI);
          const wavePhase = x * lyr.freq - time + lyr.phase;
          const sineVal = Math.sin(wavePhase);
          const steepVal = Math.pow(Math.abs(sineVal), 1 + calcSteep * 1.2) * Math.sign(sineVal);
          const y = centerY - steepVal * calcAmp * envelope;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, centerY - calcAmp, 0, height);
        grad.addColorStop(0, lyr.color);
        grad.addColorStop(1, "rgba(2, 20, 28, 0.95)");
        ctx.fillStyle = grad;
        ctx.globalAlpha = lyr.opacity;
        ctx.fill();

        // Top line stroke
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const normX = x / width;
          const envelope = Math.sin(normX * Math.PI);
          const wavePhase = x * lyr.freq - time + lyr.phase;
          const sineVal = Math.sin(wavePhase);
          const steepVal = Math.pow(Math.abs(sineVal), 1 + calcSteep * 1.2) * Math.sign(sineVal);
          const y = centerY - steepVal * calcAmp * envelope;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = lyr.color;
        ctx.lineWidth = lyr.width;
        ctx.globalAlpha = lyr.opacity + 0.1;
        ctx.stroke();
      });

      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", handlePointerMove);
        canvas.removeEventListener("mouseleave", handlePointerLeave);
      }
    };
  }, [heightVal, speedVal, shapeVal]);

  // Entrance reveal animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ftd-anim",
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
      id="feel-the-difference"
      className="bg-[#02141C] text-white py-24 sm:py-32 relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="ftd-anim text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            LIVE WAVE CONTROLS
          </span>

          <h2 className="ftd-anim font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.08] mb-4">
            FEEL THE DIFFERENCE<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="ftd-anim text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Every wave setting changes the ride. Adjust the parameters below to visualize real-time transformations in wave height, propagation speed, and face steepness.
          </p>
        </div>

        {/* Live Canvas Visual & Parameter Control Sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Canvas Box (7 cols) */}
          <div className="ftd-anim lg:col-span-7">
            <div className="bg-[#061C27] rounded-[24px] p-4 sm:p-5 border border-white/10 shadow-2xl relative">
              
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300">
                    REAL-TIME CANVAS SIMULATOR
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#00C8A0] font-bold">
                  HT: {heightVal.toFixed(1)}M | SPD: {speedVal}% | SHP: {shapeVal > 65 ? "BARREL" : shapeVal > 35 ? "STEEP" : "SOFT"}
                </div>
              </div>

              <div className="relative w-full h-[300px] sm:h-[380px] rounded-xl overflow-hidden border border-white/10">
                <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
              </div>

            </div>
          </div>

          {/* Interactive Sliders Panel (5 cols) */}
          <div className="ftd-anim lg:col-span-5 bg-[#061C27]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            {/* Control 1: HEIGHT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-sans text-xs font-extrabold tracking-wider uppercase text-white">
                  WAVE HEIGHT
                </label>
                <span className="font-mono text-xs font-bold text-[#00C8A0]">
                  {heightVal.toFixed(1)}m
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.2"
                step="0.1"
                value={heightVal}
                onChange={(e) => setHeightVal(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00C8A0]"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                <span>0.5m (Gentle)</span>
                <span>2.2m (Head-High)</span>
              </div>
            </div>

            {/* Control 2: SPEED */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-sans text-xs font-extrabold tracking-wider uppercase text-white">
                  PROPAGATION SPEED
                </label>
                <span className="font-mono text-xs font-bold text-[#00C8A0]">
                  {speedVal}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={speedVal}
                onChange={(e) => setSpeedVal(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00C8A0]"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                <span>Slow & Forgiving</span>
                <span>Fast & Dynamic</span>
              </div>
            </div>

            {/* Control 3: SHAPE */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-sans text-xs font-extrabold tracking-wider uppercase text-white">
                  WAVE FACE SHAPE
                </label>
                <span className="font-mono text-xs font-bold text-[#00C8A0]">
                  {shapeVal > 65 ? "Hollow Barrel" : shapeVal > 35 ? "Steep Face" : "Soft Open-Face"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={shapeVal}
                onChange={(e) => setShapeVal(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00C8A0]"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                <span>Soft Peeling</span>
                <span>Heavy Hollow Barrel</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
