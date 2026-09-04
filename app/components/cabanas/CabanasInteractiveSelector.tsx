"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

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
    capacity: "UP TO 8 GUESTS",
    inclusions: ["Unobstructed Lagoon Views", "Climate-Controlled Lounge", "Dedicated Butler Service", "Private Outdoor Plunge Deck"],
    img: "/images/cabanas/cabanas_hero.jpg",
  },
  {
    id: "terrace",
    num: "02",
    name: "LAGOON TERRACE CABANA",
    tagline: "Elevated Panoramic Sanctuary",
    desc: "Elevated above the main walkway offering sweeping panoramic views across the entire 52-module wave reef. Includes shaded lounge seating, artisanal dining service, and private changing amenities.",
    capacity: "UP TO 6 GUESTS",
    inclusions: ["Panoramic Lagoon View", "Shaded Plush Loungers", "Artisanal F&B Service", "Private Changing Suite"],
    img: "/images/cabanas/cabanas_private_haven.jpg",
  },
  {
    id: "beachclub",
    num: "03",
    name: "BEACH CLUB CABANA",
    tagline: "Vibrant Poolside & Dining Lounge",
    desc: "Located steps from the main pool and beach club restaurant. Perfect for groups and families looking to combine wave watching with lively lounge atmosphere and poolside cocktail service.",
    capacity: "UP TO 10 GUESTS",
    inclusions: ["Beach Club Pool Access", "Direct Restaurant Service", "Sunbeds & Shaded Sofa", "Complimentary Day Passes"],
    img: "/images/dining.jpg",
  },
];

export default function CabanasInteractiveSelector({ onOpenBooking }: CabanasInteractiveSelectorProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef<number>(0);

  const activeCabana = CABANA_OPTIONS[activeIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return;

    if (isReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const getStartX = () => {
        if (!track.firstElementChild) return 0;
        const containerWidth = section.offsetWidth;
        const cardEl = track.firstElementChild as HTMLElement;
        const cardWidth = cardEl.offsetWidth;
        return (containerWidth - cardWidth) / 2;
      };

      const getEndX = () => {
        if (!track.firstElementChild) return 0;
        const containerWidth = section.offsetWidth;
        const cardEl = track.firstElementChild as HTMLElement;
        const cardWidth = cardEl.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
        const startX = (containerWidth - cardWidth) / 2;
        const moveDistance = (CABANA_OPTIONS.length - 1) * (cardWidth + gap);
        return startX - moveDistance;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${section.offsetHeight - window.innerHeight}`,
          pin: sticky,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIdx = Math.round(self.progress * (CABANA_OPTIONS.length - 1));
            const idx = Math.min(CABANA_OPTIONS.length - 1, Math.max(0, rawIdx));
            if (idx !== activeIdxRef.current) {
              activeIdxRef.current = idx;
              setActiveIdx(idx);
            }
          },
        },
      });

      tl.fromTo(
        track,
        { x: () => getStartX() },
        { x: () => getEndX(), ease: "none" }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleDotClick = (idx: number) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const totalScroll = section.offsetHeight - window.innerHeight;
    const targetProgress = idx / (CABANA_OPTIONS.length - 1);
    const targetY = section.offsetTop + targetProgress * totalScroll;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="choose-experience"
      className="relative w-full bg-[#0A1926] text-white z-10 overflow-hidden"
      style={{ height: `${CABANA_OPTIONS.length * 80}vh` }}
    >
      {/* Sticky Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12"
      >
        {/* Header HUD */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-20 shrink-0 mb-2">
          <div className="text-left">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-1 block">
              CABANA SELECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.08]">
              CHOOSE YOUR<br />CABANA EXPERIENCE<span className="text-[#00C8A0]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#00C8A0] bg-[#061C27]/90 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#00C8A0]/30 shadow-lg shrink-0">
            <span>0{activeIdx + 1} / 0{CABANA_OPTIONS.length}</span>
            <span className="text-white/40">•</span>
            <span>{activeCabana.name}</span>
          </div>
        </div>

        {/* Center Horizontal Experience Gallery Track */}
        <div className="relative w-full h-[420px] sm:h-[485px] lg:h-[540px] my-auto overflow-hidden rounded-[32px] p-0 z-20">
          {/* Left / Right Navigation Arrows */}
          <button
            onClick={() => handleDotClick(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#061C27]/85 backdrop-blur-md border border-white/20 text-[#00C8A0] flex items-center justify-center transition-all hover:bg-[#00C8A0] hover:text-[#061C27] hover:border-[#00C8A0] disabled:opacity-20 disabled:pointer-events-none shadow-2xl cursor-pointer"
            aria-label="Previous cabana"
          >
            <span className="text-base sm:text-lg font-bold">←</span>
          </button>

          <button
            onClick={() => handleDotClick(Math.min(CABANA_OPTIONS.length - 1, activeIdx + 1))}
            disabled={activeIdx === CABANA_OPTIONS.length - 1}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#061C27]/85 backdrop-blur-md border border-white/20 text-[#00C8A0] flex items-center justify-center transition-all hover:bg-[#00C8A0] hover:text-[#061C27] hover:border-[#00C8A0] disabled:opacity-20 disabled:pointer-events-none shadow-2xl cursor-pointer"
            aria-label="Next cabana"
          >
            <span className="text-base sm:text-lg font-bold">→</span>
          </button>

          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 items-center h-full will-change-transform"
          >
            {CABANA_OPTIONS.map((opt, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={opt.id}
                  className={`relative w-[88vw] sm:w-[640px] lg:w-[770px] h-full shrink-0 rounded-[32px] overflow-hidden border transition-all duration-500 shadow-2xl group flex flex-col justify-between p-6 sm:p-8 bg-[#061C27] ${
                    isActive
                      ? "border-[#00C8A0]/70 ring-1 ring-[#00C8A0]/40 opacity-100 shadow-[0_25px_60px_rgba(0,200,160,0.2)]"
                      : "border-white/15 opacity-40 hover:opacity-60"
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={opt.img}
                    alt={opt.name}
                    className="absolute inset-0 w-full h-full object-cover filter contrast-[104%] transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/55 to-[#02141C]/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#00C8A0] bg-[#061C27]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#00C8A0]/30 shadow-md">
                      OPTION {opt.num}
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/90 bg-[#061C27]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                      {opt.capacity}
                    </span>
                  </div>

                  {/* Bottom Content Overlay */}
                  <div className="relative z-10 text-left space-y-3 mt-auto">
                    <div>
                      <span className="text-[11px] font-sans font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">
                        {opt.tagline}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                        {opt.name}
                      </h3>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed line-clamp-2 max-w-xl">
                      {opt.desc}
                    </p>

                    {/* Inclusions checklist */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {opt.inclusions.map((inc) => (
                        <span
                          key={inc}
                          className="text-[10px] font-sans font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15"
                        >
                          ✓ {inc}
                        </span>
                      ))}
                    </div>

                    {/* Reserve Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => onOpenBooking(opt.name)}
                        onMouseMove={handleMagneticMouseMove}
                        onMouseLeave={handleMagneticMouseLeave}
                        className="bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>RESERVE {opt.name}</span>
                        <span className="text-sm">→</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Timeline Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-white/50 z-20 pt-4 border-t border-white/10 shrink-0 mt-2">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-white/60">01 WATERLINE</span>
          <div className="flex items-center gap-2">
            {CABANA_OPTIONS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => handleDotClick(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIdx ? "w-7 bg-[#00C8A0]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to ${c.name}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] sm:text-xs font-bold text-white/60">03 BEACH CLUB</span>
        </div>

      </div>
    </section>
  );
}




