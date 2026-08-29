"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FindYourWaveProps {
  onOpenBooking: (tier?: string) => void;
}

const CARDS_DATA = [
  {
    level: "01",
    tier: "Tier 01",
    title: "BEGINNER",
    subtitle: "BEGINNER",
    desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment.",
    img: "/images/tier1.jpg",
    height: "0.5 – 0.8m",
    ride: "120m",
    board: "Soft-top",
    price: "35",
  },
  {
    level: "02",
    tier: "Tier 02",
    title: "NOVICE",
    subtitle: "NOVICE",
    desc: "Designed for riders who can pop up and are ready to learn board control on open-face waves.",
    img: "/images/tier2.jpg",
    height: "0.8 – 1.2m",
    ride: "140m",
    board: "Funboard",
    price: "45",
  },
  {
    level: "03",
    tier: "Tier 03",
    title: "PROGRESSIVE",
    subtitle: "PROGRESSIVE",
    desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns.",
    img: "/images/tier3.jpg",
    height: "1.2 – 1.5m",
    ride: "160m",
    board: "Fish / Longboard",
    price: "55",
  },
  {
    level: "04",
    tier: "Tier 04",
    title: "INTERMEDIATE",
    subtitle: "INTERMEDIATE",
    desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks.",
    img: "/images/tier4.jpg",
    height: "1.5 – 1.8m",
    ride: "180m",
    board: "Shortboard",
    price: "65",
  },
  {
    level: "05",
    tier: "Tier 05",
    title: "EXPERT",
    subtitle: "EXPERT",
    desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels.",
    img: "/images/tier5.jpg",
    height: "1.8 – 2.2m",
    ride: "200m",
    board: "Step-Up",
    price: "85",
  },
];

export default function FindYourWave({ onOpenBooking }: FindYourWaveProps) {
  const [activeIndex, setActiveIndex] = useState(2); // Starts on Tier 03 PROGRESSIVE
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    CARDS_DATA.forEach((_, idx) => {
      const card = cardsRef.current[idx];
      if (!card) return;

      const offset = idx - activeIndex;
      const isActive = offset === 0;

      if (prefersReducedMotion) {
        gsap.set(card, {
          scale: isActive ? 1 : 0.88,
          opacity: isActive ? 1 : 0.75,
          zIndex: 20 - Math.abs(offset),
        });
        return;
      }

      // Responsive center positioning offset
      let xShift = offset * 365;
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          xShift = offset * 280;
        } else if (window.innerWidth < 1024) {
          xShift = offset * 330;
        }
      }

      gsap.to(card, {
        x: xShift,
        scale: isActive ? 1 : 0.86 - Math.abs(offset) * 0.04,
        opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.82 - Math.abs(offset) * 0.15,
        zIndex: 20 - Math.abs(offset),
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    const cardNames = ["Beginner", "Novice", "Progressive", "Intermediate", "Expert"];
    const dot3 = document.querySelector('.waypoint-dot[data-target="#find-your-wave"]');
    if (dot3) {
      const tooltip = dot3.querySelector(".waypoint-tooltip");
      if (tooltip) {
        tooltip.textContent = `03. Wave: ${cardNames[activeIndex]}`;
      }
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CARDS_DATA.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CARDS_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="find-your-wave" className="relative pt-12 sm:pt-16 pb-20 sm:pb-28 overflow-hidden z-10 bg-[#F4EFEA]">
      {/* Decorative Palm-Frond Shadow Overlay (Top Left) */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none z-0 opacity-15 overflow-hidden">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-full h-full text-[#063B45]">
          <path d="M0 0 Q60 110 140 35 M0 0 Q90 70 170 15 Q110 100 15 185 M0 0 Q40 130 110 150" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Subtle Ocean Wave Photo/Texture Fading in Along Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#063B45]/20 via-[#0B7FB5]/05 to-transparent pointer-events-none z-0"></div>

      {/* Header Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mb-10 sm:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Header Copy */}
          <div className="text-left max-w-2xl">
            <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.2em] uppercase mb-2 flex items-center gap-2 block">
              <span className="w-2 h-0.5 bg-[#00C8A0]"></span>
              <span>FIND YOUR WAVE</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1926] tracking-tight mb-3">
              One Place. Many Ways.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              From your first ride to your next personal best, our waves are designed for every level and every kind of progression.
            </p>
          </div>

          {/* Right Header Feature Badges (3 Badges Row on Desktop, Stacked on Mobile) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 border-t sm:border-t-0 sm:border-l border-slate-300/60 pt-6 sm:pt-0 sm:pl-8">
            
            {/* Feature Badge 1 */}
            <div className="flex flex-col text-left">
              <svg className="w-6 h-6 text-[#00C8A0] mb-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15c4-4 8-4 12 0s8 4 12 0M3 9c4-4 8-4 12 0s8 4 12 0" />
              </svg>
              <span className="text-xs font-extrabold text-[#0A1926] uppercase tracking-wider">100% Customizable</span>
              <span className="text-[11px] text-slate-500 mt-0.5 font-sans">Wave height, speed and shape.</span>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-slate-300/60"></div>

            {/* Feature Badge 2 */}
            <div className="flex flex-col text-left">
              <svg className="w-6 h-6 text-[#00C8A0] mb-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs font-extrabold text-[#0A1926] uppercase tracking-wider">Energy Efficient</span>
              <span className="text-[11px] text-slate-500 mt-0.5 font-sans">Smart technology for sustainable waves.</span>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-slate-300/60"></div>

            {/* Feature Badge 3 */}
            <div className="flex flex-col text-left">
              <svg className="w-6 h-6 text-[#00C8A0] mb-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs font-extrabold text-[#0A1926] uppercase tracking-wider">Safe & Controlled</span>
              <span className="text-[11px] text-slate-500 mt-0.5 font-sans">Consistent, repeatable and safe for all.</span>
            </div>

          </div>

        </div>
      </div>

      {/* Center-Focus Carousel Area */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 mb-4">
        
        {/* Previous Button (Left) */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#063B45] shadow-lg flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Previous Wave Tier"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Next Button (Right) */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#063B45] shadow-lg flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Next Wave Tier"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Card Stage Container */}
        <div className="relative w-full h-[530px] sm:h-[550px] flex items-center justify-center overflow-hidden">
          {CARDS_DATA.map((card, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={card.level}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={() => setActiveIndex(idx)}
                className={`tier-card w-[310px] sm:w-[350px] lg:w-[370px] cursor-pointer ${
                  isActive ? "tier-card-active" : ""
                }`}
                data-level={card.level}
              >
                {/* Top Image with Solid Dark-Teal Badge */}
                <div className="card-image-wrapper">
                  <img src={card.img} alt={`${card.subtitle} Session`} className="w-full h-full object-cover" />
                  
                  {/* Top-Left Solid Dark-Teal Pill Badge */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="bg-[#063B45] text-white text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
                      WAVE {card.level}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="text-left flex flex-col justify-between flex-grow">
                  <div>
                    {/* Eyebrow Label with Teal Underline */}
                    <div className="flex flex-col items-start mb-1">
                      <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#0B7FB5]">
                        {card.tier}
                      </span>
                      <div className="w-6 h-[2px] bg-[#00C8A0] mt-1"></div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#0A1926] tracking-tight leading-tight mt-1.5 mb-2 uppercase">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 font-sans">{card.desc}</p>
                  </div>

                  <div>
                    {/* Specification Row with Teal Line Icons */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-200/60 mb-3 text-left">
                      
                      {/* Height */}
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#00C8A0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17c3-3 6-3 9 0s6 3 9 0M3 11c3-3 6-3 9 0s6 3 9 0" />
                        </svg>
                        <div>
                          <span className="block text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400">HEIGHT</span>
                          <span className="block text-xs font-bold text-[#0A1926] mt-0.5">{card.height}</span>
                        </div>
                      </div>

                      {/* Ride */}
                      <div className="flex items-center gap-2 pl-2 border-l border-slate-200/60">
                        <svg className="w-5 h-5 text-[#00C8A0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 6c3-2 6-2 9 0s6 2 9 0M2 12c3-2 6-2 9 0s6 2 9 0M2 18c3-2 6-2 9 0s6 2 9 0" />
                        </svg>
                        <div>
                          <span className="block text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400">RIDE</span>
                          <span className="block text-xs font-bold text-[#0A1926] mt-0.5">{card.ride}</span>
                        </div>
                      </div>

                      {/* Board */}
                      <div className="flex items-center gap-2 pl-2 border-l border-slate-200/60">
                        <svg className="w-5 h-5 text-[#00C8A0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9.5 5 8 9 8 14s1.5 8 4 8 4-3 4-8-1.5-9-4-12zM12 6v12" />
                        </svg>
                        <div>
                          <span className="block text-[8.5px] font-extrabold uppercase tracking-widest text-slate-400">BOARD</span>
                          <span className="block text-xs font-bold text-[#0A1926] mt-0.5 truncate">{card.board}</span>
                        </div>
                      </div>

                    </div>

                    {/* Circular Arrow CTA Button */}
                    <div className="flex items-center justify-start pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(card.title);
                        }}
                        data-tier={card.title}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-[#063B45] hover:bg-[#0B7FB5] text-white shadow-md hover:scale-110"
                            : "border border-[#063B45]/30 text-[#063B45] bg-transparent hover:border-[#063B45] hover:bg-[#063B45]/10"
                        }`}
                        aria-label={`Book ${card.title} Session`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots Below Carousel */}
        <div className="flex items-center justify-center gap-2 mt-6 relative z-20">
          {CARDS_DATA.map((card, idx) => (
            <button
              key={card.level}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? "w-8 bg-[#00C8A0] shadow-sm"
                  : "w-2.5 bg-slate-300/80 hover:bg-slate-400"
              }`}
              aria-label={`Go to ${card.title}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
