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
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    if (isReducedMotion()) {
      return;
    }

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial positions based on ServicesCardStack pattern: Card 0 at y:0, scale:1; rest at yPercent: 105
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, scale: 1, opacity: 1 });
        } else {
          gsap.set(card, { yPercent: 105, scale: 1, opacity: 1 });
        }
      });

      const totalCards = cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${container.offsetHeight - window.innerHeight}`,
          invalidateOnRefresh: true,
          scrub: 0.5,
          pin: sticky,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const current = Math.min(
              totalCards - 1,
              Math.floor(progress * totalCards)
            );
            setActiveIdx(current);
          },
        },
      });

      // Animate cards sequentially sliding over previous cards (ServicesCardStack exact animation pattern)
      for (let i = 1; i < totalCards; i++) {
        const incomingCard = cards[i];
        const prevCard = cards[i - 1];

        tl.to(
          incomingCard,
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
          i - 0.85
        ).to(
          prevCard,
          {
            scale: 0.95,
            opacity: 0.65,
            duration: 1,
            ease: "none",
          },
          i - 0.85
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="day-journey"
      className="relative w-full bg-[#02141C] text-white z-10"
      style={{ height: `${DAY_MOMENTS.length * 100}vh` }}
    >
      {/* Sticky Pinned Viewport Container */}
      <div
        ref={stickyRef}
        className="w-full h-screen flex flex-col justify-center items-center overflow-hidden py-6 sm:py-10 px-4 sm:px-8"
      >
        {/* Section Header HUD & Index Indicator */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-4 sm:mb-6 px-2 z-50 shrink-0">
          <div className="text-left">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-1 block">
              CHRONOLOGICAL JOURNEY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.08]">
              YOUR DAY. YOUR WAY<span className="text-[#00C8A0]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#00C8A0] bg-[#061C27]/90 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#00C8A0]/30 shadow-lg shrink-0">
            <span>MOMENT {DAY_MOMENTS[activeIdx].num}</span>
            <span className="text-white/40">•</span>
            <span>{DAY_MOMENTS[activeIdx].time}</span>
          </div>
        </div>

        {/* Card Stack Container Frame (Services Card Stack Architecture) */}
        <div className="relative w-full max-w-6xl h-[72vh] sm:h-[75vh] flex items-center justify-center">
          {DAY_MOMENTS.map((card, idx) => (
            <div
              key={card.num}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full bg-[#061C27] border border-white/15 rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-stretch justify-between transition-shadow duration-300"
              style={{ zIndex: (idx + 1) * 10 }}
            >
              {/* CARD LEFT/TOP: Image Container (58% width on desktop) */}
              <div className="w-full lg:w-[58%] h-[45%] lg:h-full relative overflow-hidden group">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#061C27] via-transparent to-transparent pointer-events-none opacity-80" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C8A0] bg-[#02141C]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                    MOMENT {card.num} • {card.time}
                  </span>
                </div>
              </div>

              {/* CARD RIGHT/BOTTOM: Content Details (42% width on desktop) */}
              <div className="w-full lg:w-[42%] h-[55%] lg:h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-left bg-[#061C27]">
                <div>
                  <span className="text-xs font-extrabold text-[#00C8A0] tracking-[0.2em] uppercase block mb-2">
                    MOMENT {card.num} • {card.time}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.08] mb-4">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                      <span className="w-2 h-2 rounded-full bg-[#00C8A0]" />
                      <span>PRIVATE CABANA EXPERIENCE</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                      <span className="w-2 h-2 rounded-full bg-[#00C8A0]" />
                      <span>DEDICATED BUTLER & REFRESHMENTS</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/50">
                  <span>DAY MOMENT 0{idx + 1} OF 0{DAY_MOMENTS.length}</span>
                  <span className="text-[#00C8A0] font-bold">{card.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
