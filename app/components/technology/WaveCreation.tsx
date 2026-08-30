"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CALLOUTS_LEFT = [
  {
    num: "01",
    title: "WAVE GENERATION",
    desc: "The Cove® power unit creates a surge of water.",
    target: { x: "50%", y: "40%" },
  },
  {
    num: "02",
    title: "WATER MOVEMENT",
    desc: "Hydrodynamic flow transports energy across the lagoon.",
    target: { x: "32%", y: "48%" },
  },
  {
    num: "03",
    title: "HYDRODYNAMICS",
    desc: "Advanced design ensures smooth, efficient and powerful wave shaping.",
    target: { x: "22%", y: "65%" },
  },
];

const CALLOUTS_RIGHT = [
  {
    num: "04",
    title: "WAVE SHAPE",
    desc: "Adjustable bathymetry sculpts each wave with precision.",
    target: { x: "78%", y: "58%" },
  },
  {
    num: "05",
    title: "WAVE SPEED",
    desc: "Real-time control of wave speed for the perfect ride.",
    target: { x: "66%", y: "46%" },
  },
  {
    num: "06",
    title: "CONTROL SYSTEM",
    desc: "Sensors and software monitor and optimize every wave.",
    target: { x: "50%", y: "22%" },
  },
];

export default function WaveCreation() {
  const sectionRef = useRef<HTMLElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Center Image subtle fade in
      gsap.fromTo(
        centerImageRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // 2. Left Cards stagger reveal
      gsap.fromTo(
        ".tech-card-left",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      // 3. Right Cards stagger reveal
      gsap.fromTo(
        ".tech-card-right",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      // 4. Connector lines animation draw
      gsap.fromTo(
        ".connector-path",
        { strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        }
      );

      // 5. Endpoint dots illuminate
      gsap.fromTo(
        ".endpoint-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-section-02"
      className="bg-[#031B25] text-[#F4F2EA] py-20 sm:py-28 relative z-10 border-b border-white/10 overflow-hidden"
    >
      {/* Background Subtle Contour Lines & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.035]"
          viewBox="0 0 1440 900"
          fill="none"
          stroke="#00C8C0"
          strokeWidth="1"
        >
          <path d="M-100,150 C300,50 600,280 1100,180 C1300,140 1500,260 1600,220" strokeDasharray="4 4" />
          <path d="M-100,300 C250,380 650,150 1050,320 C1280,360 1480,240 1600,300" />
          <path d="M-100,450 C350,520 800,320 1200,480 C1350,520 1520,400 1600,460" strokeDasharray="6 6" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00C8C0]/[0.03] rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left relative z-10">
        
        {/* Header Block */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-[#00C8C0] tracking-[0.2em] uppercase block mb-3">
            02
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F2EA] tracking-tight leading-[1.08] mb-4">
            HOW THE WAVE<br />IS CREATED<span className="text-[#00C8C0]">.</span>
          </h2>
          <p className="text-[#F4F2EA]/80 text-sm sm:text-base font-sans leading-relaxed mb-6 max-w-xl">
            A perfect wave is the result of precision engineering and real-time data working together across our Wavegarden Cove® lagoon.
          </p>
          <a
            href="#tech-section-03"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00C8C0] hover:text-white transition-colors group"
          >
            <span>SEE THE PROCESS</span>
            <span className="text-sm font-normal group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Technical Engineering Composition */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Desktop SVG Overlay Connectors connecting Cards to physical locations inside Center Image */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-30"
            viewBox="0 0 1200 650"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Left Connectors: Cards 01, 02, 03 */}
            {/* Card 01 -> Wave Generator Spine (approx x: 600 [50%], y: 260 [40%]) */}
            <path
              d="M 285 110 L 440 110 L 600 260"
              stroke="#00C8C0"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="500"
              className="connector-path"
            />

            {/* Card 02 -> Left Water Channel (approx x: 445 [37%], y: 312 [48%]) */}
            <path
              d="M 285 325 L 390 325 L 445 312"
              stroke="#00C8C0"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="500"
              className="connector-path"
            />

            {/* Card 03 -> Left Lower Hydrodynamics Area (approx x: 380 [31%], y: 422 [65%]) */}
            <path
              d="M 285 540 L 350 540 L 380 422"
              stroke="#00C8C0"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="500"
              className="connector-path"
            />

            {/* Right Connectors: Cards 04, 05, 06 */}
            {/* Card 04 -> Right Wave Shape Peeling Zone (approx x: 820 [68%], y: 377 [58%]) */}
            <path
              d="M 915 110 L 870 110 L 820 377"
              stroke="#00C8C0"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="500"
              className="connector-path"
            />

            {/* Card 05 -> Right Active Wave Channel (approx x: 755 [63%], y: 299 [46%]) */}
            <path
              d="M 915 325 L 810 325 L 755 299"
              stroke="#00C8C0"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="500"
              className="connector-path"
            />

            {/* Card 06 -> Central Control System Infrastructure (approx x: 600 [50%], y: 143 [22%]) */}
            <path
              d="M 915 540 L 760 540 L 600 143"
              stroke="#00C8C0"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="500"
              className="connector-path"
            />
          </svg>

          {/* Left Cards Column (approx 24% width) */}
          <div className="lg:col-span-3 space-y-4 lg:space-y-6 z-20 order-2 lg:order-1">
            {CALLOUTS_LEFT.map((c) => (
              <div
                key={c.num}
                className="tech-card-left bg-[#062A35]/80 backdrop-blur-md border border-[#00C8C0]/25 hover:border-[#00C8C0]/60 rounded-2xl p-4 sm:p-5 text-left relative group transition-all duration-300 shadow-lg hover:shadow-cyan-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#00C8C0] tracking-widest">
                    {c.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00C8C0]/40 group-hover:bg-[#00C8C0] group-hover:shadow-[0_0_8px_#00C8C0] transition-all" />
                </div>
                <h3 className="font-sans text-xs font-bold text-[#F4F2EA] tracking-wider uppercase mb-1.5">
                  {c.title}
                </h3>
                <p className="text-xs text-[#F4F2EA]/75 font-sans leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Center Image Column: Completely CLEAN Original Photograph (approx 48% width) */}
          <div
            ref={centerImageRef}
            className="lg:col-span-6 relative z-20 order-1 lg:order-2 my-2 lg:my-0 flex items-center justify-center"
          >
            <div className="relative w-full overflow-hidden rounded-[20px] border border-[#00C8C0]/30 bg-[#062A35] shadow-[0_15px_40px_rgba(2,20,28,0.6)] group">
              
              {/* CLEAN Original Photograph (No generated labels, no baked text) */}
              <img
                src="/images/wavecove.png"
                alt="Bahrain Surf Park Wavegarden Cove aerial photograph"
                className="w-full h-auto object-cover block rounded-[20px] transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Endpoint Glowing Target Dots over specific physical features */}
              {/* Endpoint 01: Wave Generation Pier */}
              <div
                style={{ top: "40%", left: "50%" }}
                className="endpoint-dot absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="w-3 h-3 rounded-full bg-[#00C8C0] shadow-[0_0_12px_#00C8C0] animate-pulse" />
                <span className="absolute w-6 h-6 rounded-full border border-[#00C8C0]/60 animate-ping opacity-75" />
              </div>

              {/* Endpoint 02: Water Movement Flow */}
              <div
                style={{ top: "48%", left: "32%" }}
                className="endpoint-dot absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8C0] shadow-[0_0_10px_#00C8C0]" />
              </div>

              {/* Endpoint 03: Hydrodynamics Area */}
              <div
                style={{ top: "65%", left: "22%" }}
                className="endpoint-dot absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8C0] shadow-[0_0_10px_#00C8C0]" />
              </div>

              {/* Endpoint 04: Wave Shape Zone */}
              <div
                style={{ top: "58%", left: "78%" }}
                className="endpoint-dot absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8C0] shadow-[0_0_10px_#00C8C0]" />
              </div>

              {/* Endpoint 05: Wave Speed Track */}
              <div
                style={{ top: "46%", left: "66%" }}
                className="endpoint-dot absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8C0] shadow-[0_0_10px_#00C8C0]" />
              </div>

              {/* Endpoint 06: Control System Infrastructure */}
              <div
                style={{ top: "22%", left: "50%" }}
                className="endpoint-dot absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
              >
                <span className="w-3 h-3 rounded-full bg-[#00C8C0] shadow-[0_0_12px_#00C8C0] animate-pulse" />
                <span className="absolute w-6 h-6 rounded-full border border-[#00C8C0]/60 animate-ping opacity-75" />
              </div>

              {/* Subtle 1px Inner Highlight Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none rounded-[20px] ring-1 ring-inset ring-white/10"
              />
            </div>
          </div>

          {/* Right Cards Column (approx 24% width) */}
          <div className="lg:col-span-3 space-y-4 lg:space-y-6 z-20 order-3">
            {CALLOUTS_RIGHT.map((c) => (
              <div
                key={c.num}
                className="tech-card-right bg-[#062A35]/80 backdrop-blur-md border border-[#00C8C0]/25 hover:border-[#00C8C0]/60 rounded-2xl p-4 sm:p-5 text-left relative group transition-all duration-300 shadow-lg hover:shadow-cyan-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#00C8C0] tracking-widest">
                    {c.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00C8C0]/40 group-hover:bg-[#00C8C0] group-hover:shadow-[0_0_8px_#00C8C0] transition-all" />
                </div>
                <h3 className="font-sans text-xs font-bold text-[#F4F2EA] tracking-wider uppercase mb-1.5">
                  {c.title}
                </h3>
                <p className="text-xs text-[#F4F2EA]/75 font-sans leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
