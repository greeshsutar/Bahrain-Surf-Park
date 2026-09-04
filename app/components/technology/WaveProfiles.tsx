"use client";

/**
 * UNUSED COMPONENT:
 * Removed from app/technology/page.tsx per content curation strategy to eliminate duplicate pricing data.
 * Retained for potential repurposing or future reference.
 */

import { useEffect, useRef, useState } from "react";
import { useBooking } from "../../context/BookingContext";

interface WaveProfile {
  id: string;
  num: string;
  level: string;
  desc: string;
  height: string;
  ride: string;
  board: string;
  price: string;
  img: string;
}

const PROFILES: WaveProfile[] = [
  {
    id: "beginner",
    num: "01",
    level: "BEGINNER",
    desc: "Gentle, rolling waves to get you started.",
    height: "0.5 – 0.8m",
    ride: "120m",
    board: "Soft-top",
    price: "FROM 55 BHD",
    img: "/images/tier1.jpg",
  },
  {
    id: "novice",
    num: "02",
    level: "NOVICE",
    desc: "Smooth and forgiving waves to build confidence.",
    height: "0.8 – 1.2m",
    ride: "140m",
    board: "Funboard",
    price: "FROM 55 BHD",
    img: "/images/tier2.jpg",
  },
  {
    id: "progressive",
    num: "03",
    level: "PROGRESSIVE",
    desc: "Open face waves for progression and flow.",
    height: "1.2 – 1.5m",
    ride: "160m",
    board: "Fish / Longboard",
    price: "FROM 65 BHD",
    img: "/images/tier3.jpg",
  },
  {
    id: "intermediate",
    num: "04",
    level: "INTERMEDIATE",
    desc: "Steeper waves for improving performance.",
    height: "1.5 – 1.8m",
    ride: "180m",
    board: "Shortboard",
    price: "FROM 75 BHD",
    img: "/images/tier4.jpg",
  },
  {
    id: "expert",
    num: "05",
    level: "EXPERT",
    desc: "Powerful, hollow waves for advanced surfers.",
    height: "1.8 – 2.2m",
    ride: "200m",
    board: "Step-Up",
    price: "FROM 85 BHD",
    img: "/images/expertsurf.png",
  },
];

export default function WaveProfiles() {
  const { onOpenBooking } = useBooking();
  const [activeIdx, setActiveIdx] = useState<number>(2); // Default PROGRESSIVE
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    setActiveIdx(index);
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const trackWidth = trackRef.current.parentElement?.clientWidth || window.innerWidth;
      const cardOffset = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const scrollPos = cardOffset - trackWidth / 2 + cardWidth / 2;
      trackRef.current.parentElement?.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToCard(activeIdx);
  }, []);

  return (
    <section id="tech-section-05" className="bg-[#F0EEE7] text-[#092531] py-14 sm:py-20 relative z-10 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        
        <div className="max-w-xl">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-[#007F91] block mb-3">
            05
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#092531] tracking-tight leading-[1.08] mb-3">
            FROM MOTION.<br />MANY WAVES.
          </h2>
          <p className="text-[#092531]/80 text-xs sm:text-sm font-sans leading-relaxed">
            From your first wave to your best wave. Our technology creates the perfect conditions for every stage of your surfing journey.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToCard(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            className="w-10 h-10 rounded-full border border-slate-300 bg-white text-[#092531] hover:bg-[#007F91] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            ←
          </button>
          <button
            onClick={() => scrollToCard(Math.min(PROFILES.length - 1, activeIdx + 1))}
            disabled={activeIdx === PROFILES.length - 1}
            className="w-10 h-10 rounded-full border border-slate-300 bg-white text-[#092531] hover:bg-[#007F91] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            →
          </button>
        </div>

      </div>

      {/* 5-Card Horizontal Carousel Viewport */}
      <div className="w-full overflow-x-auto no-scrollbar py-6">
        <div ref={trackRef} className="flex items-center gap-4 sm:gap-6 w-max mx-auto px-[10vw]">
          {PROFILES.map((p, idx) => {
            const isCenter = idx === activeIdx;
            return (
              <div
                key={p.id}
                onClick={() => scrollToCard(idx)}
                className={`group relative flex-shrink-0 cursor-pointer rounded-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between select-none ${
                  isCenter
                    ? "w-[80vw] sm:w-[320px] lg:w-[360px] h-[460px] bg-white text-[#092531] shadow-2xl border-2 border-[#00C7C7] lg:-translate-y-2 z-20"
                    : "w-[70vw] sm:w-[270px] lg:w-[300px] h-[400px] bg-white/70 text-[#092531] shadow-md border border-slate-200/80 lg:translate-y-4 opacity-80 hover:opacity-100 z-10"
                }`}
              >
                <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={p.img}
                    alt={p.level}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#031923]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-[#00C7C7]">
                    {p.num}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 text-left">
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-1 text-[#092531]">{p.level}</h3>
                    <p className="text-xs text-slate-600 font-sans line-clamp-2 mb-4">{p.desc}</p>

                    <div className="grid grid-cols-3 gap-1 border-t border-slate-100 pt-3 text-[10px]">
                      <div>
                        <span className="text-slate-400 block font-mono">HEIGHT</span>
                        <span className="font-bold text-[#092531]">{p.height}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">RIDE</span>
                        <span className="font-bold text-[#092531]">{p.ride}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">BOARD</span>
                        <span className="font-bold text-[#092531] truncate block">{p.board}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-extrabold text-[#007F91] uppercase">{p.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(p.level);
                      }}
                      className="w-8 h-8 rounded-full bg-[#031923] text-white hover:bg-[#00C7C7] hover:text-[#031923] flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      →
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
