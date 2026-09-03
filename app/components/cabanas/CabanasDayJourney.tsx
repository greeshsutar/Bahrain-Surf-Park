"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const DAY_MOMENTS = [
  {
    num: "01",
    time: "09:00 AM",
    title: "ARRIVE & WELCOME",
    desc: "Morning arrival, seamless private check-in, dedicated butler greeting, and welcome tropical refreshments.",
    img: "/images/cabanas/cabanas_private_haven.jpg",
  },
  {
    num: "02",
    time: "10:30 AM",
    title: "SETTLE IN & WATCH WAVES",
    desc: "Unpack gear, lounge on custom cream daybeds, adjust climate controls, and watch early morning surf sets.",
    img: "/images/cabanas.jpg",
  },
  {
    num: "03",
    time: "01:00 PM",
    title: "PADDLE OUT & SURF",
    desc: "Step directly onto the water line from your cabana deck for your scheduled lagoon wave session.",
    img: "/images/cabanas/cabanas_hero.jpg",
  },
  {
    num: "04",
    time: "03:30 PM",
    title: "RESET & COASTAL DINING",
    desc: "Return to your cabana for a private rain shower, chilled facial towels, and fresh lagoon-side dining.",
    img: "/images/dining.jpg",
  },
  {
    num: "05",
    time: "06:30 PM",
    title: "FIREPIT & GOLDEN HOUR",
    desc: "Evening firepit drinks, artisanal cocktails, and front-row seats for golden hour sunset over the reef.",
    img: "/images/cabanas/cabanas_day_journey.jpg",
  },
];

export default function CabanasDayJourney() {
  const [activeMomentIdx, setActiveMomentIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const activeMoment = DAY_MOMENTS[activeMomentIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${DAY_MOMENTS.length * 80}%`,
        scrub: 0.5,
        pin: sticky,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            DAY_MOMENTS.length - 1,
            Math.floor(self.progress * DAY_MOMENTS.length)
          );
          setActiveMomentIdx(idx);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="day-journey"
      className="relative w-full bg-[#0A1926] text-white z-10"
      style={{ height: `${DAY_MOMENTS.length * 80}vh` }}
    >
      {/* Sticky Pinned Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden py-12 px-6 lg:px-12"
      >
        {/* Header HUD */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20">
          <div className="text-left">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-1 block">
              CHRONOLOGICAL JOURNEY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              YOUR DAY. YOUR WAY<span className="text-[#00C8A0]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#00C8A0] bg-[#061C27]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span>MOMENT 0{activeMomentIdx + 1}</span>
            <span className="text-white/40">•</span>
            <span>{activeMoment.time}</span>
          </div>
        </div>

        {/* Center Scene Composition */}
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20">
          
          {/* Timeline Selector Nodes (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-left">
            {DAY_MOMENTS.map((m, idx) => {
              const isSelected = idx === activeMomentIdx;
              return (
                <div
                  key={m.num}
                  onClick={() => setActiveMomentIdx(idx)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#00C8A0]/15 border-[#00C8A0] text-white shadow-lg translate-x-2"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold ${isSelected ? "text-[#00C8A0]" : "text-white/40"}`}>
                      {m.time}
                    </span>
                    <span className="font-serif text-sm font-bold uppercase tracking-wide">
                      {m.title}
                    </span>
                  </div>

                  <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-[#00C8A0] animate-pulse" : "bg-white/20"}`} />
                </div>
              );
            })}
          </div>

          {/* Active Moment Visual Frame (Right 8 cols) */}
          <div className="lg:col-span-8 relative h-[340px] sm:h-[440px] lg:h-[480px] rounded-[30px] overflow-hidden border border-white/15 shadow-2xl group">
            <img
              key={activeMoment.num}
              src={activeMoment.img}
              alt={activeMoment.title}
              className="w-full h-full object-cover transition-all duration-700 filter contrast-[103%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 z-10 text-left max-w-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C8A0] block mb-1">
                MOMENT {activeMoment.num} • {activeMoment.time}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                {activeMoment.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                {activeMoment.desc}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Timeline Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-white/50 z-20 pt-4 border-t border-white/10">
          <span>09:00 AM MORNING</span>
          <div className="flex items-center gap-1.5">
            {DAY_MOMENTS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeMomentIdx ? "w-6 bg-[#00C8A0]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <span>06:30 PM SUNSET</span>
        </div>
      </div>
    </section>
  );
}
