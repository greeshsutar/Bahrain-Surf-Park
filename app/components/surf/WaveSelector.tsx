"use client";

import { useEffect, useRef, useState } from "react";
import WaveCard, { WaveLevelData } from "./WaveCard";

const WAVE_LEVELS: WaveLevelData[] = [
  {
    id: "beginner",
    number: "01",
    badge: "WAVE 01",
    level: "BEGINNER",
    title: "BEGINNER",
    desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment. Our instructors are in the water with you the entire session, focused on confidence and safety.",
    height: "0.5 – 0.8m",
    ride: "120m",
    board: "Soft-top",
    img: "/images/tier1.jpg",
    video: "/videos/surfing.mp4",
  },
  {
    id: "novice",
    number: "02",
    badge: "WAVE 02",
    level: "NOVICE",
    title: "NOVICE",
    desc: "Designed for riders who can pop up and are ready to learn board control on soft open-face waves. This is where board control and timing start to click.",
    height: "0.8 – 1.2m",
    ride: "140m",
    board: "Funboard",
    img: "/images/tier2.jpg",
    video: "/videos/surfing.mp4",
  },
  {
    id: "progressive",
    number: "03",
    badge: "WAVE 03",
    level: "PROGRESSIVE",
    title: "PROGRESSIVE",
    desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns. Expect real feedback on your positioning as waves grow more dynamic.",
    height: "1.2 – 1.5m",
    ride: "160m",
    board: "Fish / Longboard",
    img: "/images/tier3.jpg",
    video: "/videos/surfing.mp4",
  },
  {
    id: "intermediate",
    number: "04",
    badge: "WAVE 04",
    level: "INTERMEDIATE",
    title: "INTERMEDIATE",
    desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks. Built for surfers ready to link turns together with speed and control.",
    height: "1.5 – 1.8m",
    ride: "180m",
    board: "Shortboard",
    img: "/images/tier4.jpg",
    video: "/videos/surfing.mp4",
  },
  {
    id: "expert",
    number: "05",
    badge: "WAVE 05",
    level: "ADVANCED",
    title: "EXPERT / ADVANCED",
    desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels. Our most technical, powerful setting — reserved for surfers who know their way around a barrel.",
    height: "1.8 – 2.2m",
    ride: "200m",
    board: "Step-Up",
    img: "/images/tier5.jpg",
    video: "/videos/surfing.mp4",
  },
];

export default function WaveSelector() {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default PROGRESSIVE
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);

  // Center active card
  const scrollToCard = (index: number) => {
    setActiveIndex(index);
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
    scrollToCard(activeIndex);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          const next = Math.max(0, prev - 1);
          scrollToCard(next);
          return next;
        });
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => {
          const next = Math.min(WAVE_LEVELS.length - 1, prev + 1);
          scrollToCard(next);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current?.parentElement) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - trackRef.current.parentElement.offsetLeft;
    scrollLeftRef.current = trackRef.current.parentElement.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current?.parentElement) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.parentElement.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    trackRef.current.parentElement.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="find-your-wave-selector"
      ref={containerRef}
      className="bg-[#061F2B] text-white py-20 sm:py-28 relative z-10 overflow-hidden border-b border-white/10"
    >
      {/* Background Atmosphere Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#00C8A0]/[0.07] rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Contour Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" stroke="#00C8A0" strokeWidth="1">
          <path d="M-100,150 C300,100 600,300 1000,200 C1300,150 1500,350 1700,280" />
          <path d="M-100,350 C300,300 600,500 1000,400 C1300,350 1500,550 1700,480" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left mb-12">
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
          SIGNATURE WAVE SELECTOR
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.08] mb-4">
          FIND YOUR WAVE.
        </h2>
        <p className="text-white/80 text-base sm:text-xl font-serif italic max-w-2xl">
          ONE PLACE. EVERY LEVEL OF PROGRESSION.
        </p>
      </div>

      {/* Carousel Scroll Viewport */}
      <div
        className="w-full overflow-x-auto no-scrollbar py-8 px-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-6 w-max mx-auto px-[8vw] sm:px-[20vw]"
        >
          {WAVE_LEVELS.map((card, idx) => (
            <WaveCard
              key={card.id}
              card={card}
              isActive={idx === activeIndex}
              onClick={() => scrollToCard(idx)}
            />
          ))}
        </div>
      </div>

      {/* Pagination & Controls Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-8 flex items-center justify-between relative z-10">
        
        {/* Level Indicators */}
        <div className="flex items-center gap-2">
          {WAVE_LEVELS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollToCard(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "w-8 bg-[#00C8A0]" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to ${item.title}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous Wave Level"
          >
            ←
          </button>
          <button
            onClick={() => scrollToCard(Math.min(WAVE_LEVELS.length - 1, activeIndex + 1))}
            disabled={activeIndex === WAVE_LEVELS.length - 1}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next Wave Level"
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}
