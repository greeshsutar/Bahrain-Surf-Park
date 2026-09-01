"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface ServicesCardStackProps {
  onOpenBooking: (tier?: string) => void;
}

export interface ServiceCardData {
  id: string;
  num: string;
  category: string;
  title: string;
  desc: string;
  highlights: string[];
  img: string;
  linkHref?: string;
  linkText?: string;
  bookingTag?: string;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "lagoon",
    num: "01",
    category: "HYDRODYNAMIC LAGOON",
    title: "The Surf Lagoon",
    desc: "The heartbeat of Bahrain Surf Park. Powered by 52 Wavegarden Cove® electro-mechanical modules, delivering up to 1,000 ocean-quality waves per hour with instant height, speed, and shape customization.",
    highlights: ["52 Wavegarden Modules", "1,000 Waves / Hour", "Real-Time Calibration"],
    img: "/images/wavecove.png",
    linkHref: "/technology",
    linkText: "EXPLORE TECHNOLOGY →",
  },
  {
    id: "academy",
    num: "02",
    category: "SURF COACHING",
    title: "Club Hawaii Academy",
    desc: "ISA-certified coaching for every progression stage. From first-time pop-up fundamentals to advanced multi-angle video analysis, tube-riding techniques, and structured water training.",
    highlights: ["ISA-Certified Master Coaches", "1-on-1 & Group Lessons", "Multi-Angle Video Analytics"],
    img: "/images/academy_coaching.jpg",
    linkHref: "/academy",
    linkText: "EXPLORE ACADEMY →",
  },
  {
    id: "cabanas",
    num: "03",
    category: "HOSPITALITY & COMFORT",
    title: "Terraces & VIP Cabanas",
    desc: "Lagoon-front private cabanas featuring shaded lounge seating, climate control, dedicated butler service, and direct unobstructed views of the wave lineup.",
    highlights: ["Lagoon-Front Views", "Private Shaded Lounges", "Dedicated Butler Service"],
    img: "/images/cabanas.jpg",
    linkHref: "/cabanas",
    linkText: "VIEW CABANAS →",
  },
  {
    id: "beachclub",
    num: "04",
    category: "NON-SURF EXPERIENCE",
    title: "Beach Club Access",
    desc: "You don't need to surf to enjoy the lagoon. Day passes grant non-surfing guests and families access to beach club sunbeds, lagoon-side dining, and front-row wave watching.",
    highlights: ["Day Pass Entry", "Poolside Sunbeds", "Lagoon-Front Dining"],
    img: "/images/dining.jpg",
    bookingTag: "Beach Club Day Pass",
  },
  {
    id: "retail",
    num: "05",
    category: "EQUIPMENT & RETAIL",
    title: "Retail & Surf Shop",
    desc: "Full-service surf rental center offering soft-top training boards, high-performance demo fiberglass fleets, wetsuits, apparel, and premium surf accessories on site.",
    highlights: ["Included Soft-Tops", "High-Performance Demo Fleet", "Apparel & Gear Shop"],
    img: "/images/services/service_retail.jpg",
    bookingTag: "Surf Rentals",
  },
  {
    id: "events",
    num: "06",
    category: "PRIVATE VENUE & TOURNAMENTS",
    title: "Private Venue & Event Hire",
    desc: "Host private celebrations, corporate retreats, commercial film shoots, or surf competitions with full lagoon rental, custom wave programming, and luxury event catering.",
    highlights: ["Exclusive Lagoon Rental", "Custom Wave Programming", "Bespoke Event Catering"],
    img: "/images/services/service_events.jpg",
    bookingTag: "Private Group",
  },
];

export default function ServicesCardStack({ onOpenBooking }: ServicesCardStackProps) {
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
      // Set initial positions: Card 0 at y:0, scale:1; rest at yPercent: 100
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
          end: `+=${totalCards * 90}%`,
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

      // Animate cards sequentially sliding over previous cards
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
      id="services-card-stack"
      className="relative w-full bg-[#02141C] text-white z-10"
      style={{ height: `${SERVICES_DATA.length * 100}vh` }}
    >
      {/* Sticky Pinned Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden py-6 sm:py-10 px-4 sm:px-8"
      >
        {/* Section Header HUD & Index Indicator */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-4 sm:mb-6 px-2 z-50">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00C8A0] uppercase">
              THE SERVICES PORTFOLIO
            </span>
          </div>

          {/* Vertical/Horizontal Number Counter */}
          <div className="flex items-baseline gap-1 font-mono text-sm sm:text-base font-bold text-white/90 bg-[#061C27]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
            <span className="text-[#00C8A0] text-base sm:text-lg">{SERVICES_DATA[activeIdx].num}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">0{SERVICES_DATA.length}</span>
          </div>
        </div>

        {/* Card Stack Container Frame */}
        <div className="relative w-full max-w-6xl h-[76vh] sm:h-[78vh] flex items-center justify-center">
          {SERVICES_DATA.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full bg-[#061C27] border border-white/15 rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-stretch justify-between transition-shadow duration-300"
              style={{ zIndex: (idx + 1) * 10 }}
            >
              {/* CARD LEFT/TOP: Image Container (58% width on desktop) */}
              <div className="w-full lg:w-[58%] h-[42%] lg:h-full relative overflow-hidden group">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#061C27] via-transparent to-transparent pointer-events-none opacity-80" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C8A0] bg-[#02141C]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    SERVICE {card.num}
                  </span>
                </div>
              </div>

              {/* CARD RIGHT/BOTTOM: Content Details (42% width on desktop) */}
              <div className="w-full lg:w-[42%] h-[58%] lg:h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-left bg-[#061C27]">
                <div>
                  <span className="text-xs font-extrabold text-[#0B7FB5] tracking-[0.2em] uppercase block mb-2">
                    {card.category}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight leading-[1.08] mb-4">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                      KEY HIGHLIGHTS:
                    </span>
                    {card.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs font-sans text-white font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  {card.linkHref && card.linkText ? (
                    <Link
                      href={card.linkHref}
                      className="inline-flex items-center gap-2 bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md"
                    >
                      <span>{card.linkText}</span>
                    </Link>
                  ) : card.bookingTag ? (
                    <button
                      onClick={() => onOpenBooking(card.bookingTag)}
                      onMouseMove={handleMagneticMouseMove}
                      onMouseLeave={handleMagneticMouseLeave}
                      className="inline-flex items-center gap-2 bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md cursor-pointer"
                    >
                      <span>BOOK THIS EXPERIENCE →</span>
                    </button>
                  ) : null}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
