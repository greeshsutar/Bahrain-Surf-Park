"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../../constants/motion";

const DAY_MOMENTS = [
  {
    num: "01",
    time: "09:00 AM",
    title: "ARRIVE & WELCOME",
    desc: "Morning arrival, seamless private check-in, dedicated butler greeting, and welcome tropical refreshments.",
    img: "/images/welcome.png",
  },
  {
    num: "02",
    time: "10:30 AM",
    title: "SETTLE IN & WATCH WAVES",
    desc: "Unpack gear, lounge on custom cream daybeds, adjust climate controls, and watch early morning surf sets.",
    img: "/images/relax.png",
  },
  {
    num: "03",
    time: "01:00 PM",
    title: "PADDLE OUT & SURF",
    desc: "Step directly onto the water line from your cabana deck for your scheduled lagoon wave session.",
    img: "/images/paddle.png",
  },
  {
    num: "04",
    time: "03:30 PM",
    title: "RESET & COASTAL DINING",
    desc: "Return to your cabana for a private rain shower, chilled facial towels, and fresh lagoon-side dining.",
    img: "/images/resort.png",
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
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef<number>(0);

  const activeMoment = DAY_MOMENTS[activeMomentIdx];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!container || !sticky || !track) return;

    if (isReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const getStartX = () => {
        if (!track.firstElementChild) return 0;
        const containerWidth = container.offsetWidth;
        const cardEl = track.firstElementChild as HTMLElement;
        const cardWidth = cardEl.offsetWidth;
        return (containerWidth - cardWidth) / 2;
      };

      const getEndX = () => {
        if (!track.firstElementChild) return 0;
        const containerWidth = container.offsetWidth;
        const cardEl = track.firstElementChild as HTMLElement;
        const cardWidth = cardEl.offsetWidth;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
        const startX = (containerWidth - cardWidth) / 2;
        const moveDistance = (DAY_MOMENTS.length - 1) * (cardWidth + gap);
        return startX - moveDistance;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${container.offsetHeight - window.innerHeight}`,
          pin: sticky,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIdx = Math.round(self.progress * (DAY_MOMENTS.length - 1));
            const idx = Math.min(DAY_MOMENTS.length - 1, Math.max(0, rawIdx));
            if (idx !== activeIdxRef.current) {
              activeIdxRef.current = idx;
              setActiveMomentIdx(idx);
            }
          },
        },
      });

      tl.fromTo(
        track,
        { x: () => getStartX() },
        { x: () => getEndX(), ease: "none" }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleTimelineClick = (idx: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const totalScroll = container.offsetHeight - window.innerHeight;
    const targetProgress = idx / (DAY_MOMENTS.length - 1);
    const targetY = container.offsetTop + targetProgress * totalScroll;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="day-journey"
      className="relative w-full bg-[#0A1926] text-white z-10 overflow-hidden"
      style={{ height: `${DAY_MOMENTS.length * 85}vh` }}
    >
      {/* Sticky Pinned Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden py-8 sm:py-12 px-4 sm:px-8 lg:px-12"
      >
        {/* Centered Header HUD */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-20 shrink-0 mb-4 sm:mb-6">
          <div className="text-left">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-1 block">
              CHRONOLOGICAL JOURNEY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              YOUR DAY. YOUR WAY<span className="text-[#00C8A0]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#00C8A0] bg-[#061C27]/90 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#00C8A0]/30 shadow-lg shrink-0">
            <span>MOMENT 0{activeMomentIdx + 1}</span>
            <span className="text-white/40">•</span>
            <span>{activeMoment.time}</span>
          </div>
        </div>

        {/* Full-Width Centered Horizontal Experience Gallery Track */}
        <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] my-auto overflow-hidden rounded-[30px] p-0 z-20">
          {/* Left / Right Navigation Arrows */}
          <button
            onClick={() => handleTimelineClick(Math.max(0, activeMomentIdx - 1))}
            disabled={activeMomentIdx === 0}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#061C27]/85 backdrop-blur-md border border-white/20 text-[#00C8A0] flex items-center justify-center transition-all hover:bg-[#00C8A0] hover:text-[#061C27] hover:border-[#00C8A0] disabled:opacity-20 disabled:pointer-events-none shadow-2xl cursor-pointer"
            aria-label="Previous moment"
          >
            <span className="text-base sm:text-lg font-bold">←</span>
          </button>

          <button
            onClick={() => handleTimelineClick(Math.min(DAY_MOMENTS.length - 1, activeMomentIdx + 1))}
            disabled={activeMomentIdx === DAY_MOMENTS.length - 1}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#061C27]/85 backdrop-blur-md border border-white/20 text-[#00C8A0] flex items-center justify-center transition-all hover:bg-[#00C8A0] hover:text-[#061C27] hover:border-[#00C8A0] disabled:opacity-20 disabled:pointer-events-none shadow-2xl cursor-pointer"
            aria-label="Next moment"
          >
            <span className="text-base sm:text-lg font-bold">→</span>
          </button>

          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 items-center h-full will-change-transform"
          >
            {DAY_MOMENTS.map((m, idx) => {
              const isActive = idx === activeMomentIdx;
              return (
                <div
                  key={m.num}
                  className={`relative w-[84vw] sm:w-[580px] lg:w-[720px] h-full shrink-0 rounded-[30px] overflow-hidden border transition-all duration-500 shadow-2xl group ${
                    isActive
                      ? "border-[#00C8A0]/70 ring-1 ring-[#00C8A0]/40 opacity-100 shadow-[0_25px_60px_rgba(0,200,160,0.18)]"
                      : "border-white/15 opacity-40 hover:opacity-60"
                  }`}
                >
                  <img
                    src={m.img}
                    alt={m.title}
                    className="w-full h-full object-cover filter contrast-[103%] transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/40 to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 left-6 right-6 z-10 text-left max-w-xl">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C8A0] block mb-1">
                      MOMENT {m.num} • {m.time}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {m.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Timeline Progress Bar Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-white/50 z-20 pt-4 border-t border-white/10 shrink-0 mt-4">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-white/60">09:00 AM MORNING</span>
          <div className="flex items-center gap-2">
            {DAY_MOMENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTimelineClick(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeMomentIdx ? "w-7 bg-[#00C8A0]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to moment ${i + 1}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] sm:text-xs font-bold text-white/60">06:30 PM SUNSET</span>
        </div>

      </div>
    </section>
  );
}



