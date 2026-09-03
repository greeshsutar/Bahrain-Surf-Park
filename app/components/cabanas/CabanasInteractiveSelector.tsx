"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface CabanasInteractiveSelectorProps {
  onOpenBooking: (tier?: string) => void;
}

const CABANA_OPTIONS = [
  {
    id: "waterline",
    num: "01",
    name: "VIP WATERLINE CABANA",
    tagline: "Front-Row Wave Line Access",
    desc: "Positioned directly on the water's edge with unobstructed views of the surf lineup. Features climate-controlled indoor lounge, teak sun deck, plunge area, and dedicated butler service.",
    capacity: "Up to 8 Guests",
    inclusions: ["Unobstructed Lagoon Views", "Climate-Controlled Lounge", "Dedicated Butler Service", "Private Outdoor Plunge Deck"],
    img: "/images/cabanas/cabanas_hero.jpg",
  },
  {
    id: "terrace",
    num: "02",
    name: "LAGOON TERRACE CABANA",
    tagline: "Elevated Panoramic Sanctuary",
    desc: "Elevated above the main walkway offering sweeping panoramic views across the entire 52-module wave reef. Includes shaded lounge seating, artisanal dining service, and private changing amenities.",
    capacity: "Up to 6 Guests",
    inclusions: ["Panoramic Lagoon View", "Shaded Plush Loungers", "Artisanal F&B Service", "Private Changing Suite"],
    img: "/images/cabanas/cabanas_private_haven.jpg",
  },
  {
    id: "beachclub",
    num: "03",
    name: "BEACH CLUB CABANA",
    tagline: "Vibrant Poolside & Dining Lounge",
    desc: "Located steps from the main pool and beach club restaurant. Perfect for groups and families looking to combine wave watching with lively lounge atmosphere and poolside cocktail service.",
    capacity: "Up to 10 Guests",
    inclusions: ["Beach Club Pool Access", "Direct Restaurant Service", "Sunbeds & Shaded Sofa", "Complimentary Day Passes"],
    img: "/images/dining.jpg",
  },
];

export default function CabanasInteractiveSelector({ onOpenBooking }: CabanasInteractiveSelectorProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeCabana = CABANA_OPTIONS[activeIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sel-anim",
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
      id="choose-experience"
      className="bg-[#F7F6F1] text-[#0A1926] py-16 sm:py-20 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="sel-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            CABANA SELECTION
          </span>

          <h2 className="sel-anim font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-4">
            CHOOSE YOUR<br />CABANA EXPERIENCE<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="sel-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            Select your preferred cabana layout and atmosphere to reserve your private sanctuary.
          </p>
        </div>

        {/* Large Editorial Selection System */}
        <div className="sel-anim grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Cabana Option List (40% width) */}
          <div className="lg:col-span-5 space-y-4">
            {CABANA_OPTIONS.map((opt, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <div
                  key={opt.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#061C27] text-white border-[#061C27] shadow-xl scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-[#00C8A0]" : "text-slate-400"}`}>
                      OPTION {opt.num}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isSelected ? "text-[#00C8A0]" : "text-[#0B7FB5]"}`}>
                      {opt.capacity}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight mb-1">
                    {opt.name}
                  </h3>

                  <p className={`text-xs font-sans ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {opt.tagline}
                  </p>

                  {/* Active Indicator Arrow Line */}
                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[#00C8A0] text-xs font-extrabold tracking-widest uppercase">
                      <span>SELECTED SCENE</span>
                      <span>──────────────→</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Large Visual Crossfade & Detail Box (60% width) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-2xl">
            <div className="relative w-full h-[300px] sm:h-[380px] rounded-2xl overflow-hidden mb-6 shadow-md border border-slate-100 group">
              <img
                key={activeCabana.id}
                src={activeCabana.img}
                alt={activeCabana.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C27]/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C8A0] bg-[#061C27]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {activeCabana.name} • {activeCabana.capacity}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {activeCabana.desc}
              </p>

              {/* Inclusions checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
                {activeCabana.inclusions.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-xs font-sans text-[#0A1926] font-bold">
                    <span className="w-4 h-4 rounded-full bg-[#00C8A0]/15 text-[#00C8A0] flex items-center justify-center text-[10px] shrink-0">✓</span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              {/* Booking Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenBooking(activeCabana.name)}
                  onMouseMove={handleMagneticMouseMove}
                  onMouseLeave={handleMagneticMouseLeave}
                  className="w-full sm:w-auto bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>RESERVE {activeCabana.name}</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
