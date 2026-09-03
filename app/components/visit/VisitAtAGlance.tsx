"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

const ESSENTIALS_LIST = [
  {
    num: "01",
    title: "WHAT TO BRING",
    eyebrow: "EQUIPMENT & CLOTHING",
    summary: "Proper swimwear, fresh towel, reef-safe sunscreen, and dry post-surf clothes.",
    details: [
      "Soft-top surfboard included for Beginner/Novice sessions",
      "Private changing suite and digital locker provided",
      "Freshwater hot showers and restrooms on-site",
    ],
  },
  {
    num: "02",
    title: "SAFETY & WATER RULES",
    eyebrow: "SUPERVISION & PROTOCOLS",
    summary: "Continuous monitoring by ISA-certified surf coaches and professional ocean lifeguards.",
    details: [
      "Mandatory 15-minute lagoon safety briefing prior to session",
      "Soft-top surfboards required in beginner wave zones",
      "First aid station and medical response team active",
    ],
  },
  {
    num: "03",
    title: "ARRIVAL & CHECK-IN",
    eyebrow: "TIMING & ENTRY",
    summary: "Arrive 45 minutes prior to scheduled water time for gear fitting and safety orientation.",
    details: [
      "Direct entry from dedicated guest parking lobby",
      "Gear fitting and digital locker assignment at Surf Center",
      "Check-in closes 15 minutes before wave session starts",
    ],
  },
  {
    num: "04",
    title: "RESORT FACILITIES",
    eyebrow: "AMENITIES & LOUNGE",
    summary: "Spectator viewing deck, beachside lounge dining, retail shop, and high-speed Wi-Fi.",
    details: [
      "Complimentary spectator access for family and friends",
      "Healthy dining and beverages at Beachside Lounge",
      "Surf retail shop for apparel, sunscreen, and accessories",
    ],
  },
  {
    num: "05",
    title: "ACCESSIBILITY & ADAPTIVE",
    eyebrow: "BARRIER-FREE ACCESS",
    summary: "Step-free wheelchair-accessible pathways across parking, suites, viewing decks, and lagoon.",
    details: [
      "Designated accessible parking spaces near main entrance",
      "Accessible private changing suites and restrooms",
      "Adaptive surfing sessions available upon advance request",
    ],
  },
];

export default function VisitAtAGlance() {
  const [activeRow, setActiveRow] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".essentials-row-anim",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: 0.08,
          ease: MOTION.ENTRANCE_EASE,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visit-essentials"
      className="relative bg-gradient-to-b from-[#F7F6F1] via-white to-[#F7F6F1] text-[#0A1926] py-16 sm:py-20 z-10 overflow-hidden"
    >
      {/* Background Texture & Ambient Glow */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#0A1926_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00C8A0]/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        {/* Section Header */}
        <div className="essentials-row-anim mb-16 max-w-2xl">
          <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            07 — VISITOR ESSENTIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0A1926] leading-[1.05] tracking-tight mb-4">
            VISITOR ESSENTIALS.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-sans leading-relaxed">
            Everything provided, recommended, and required for your day on the water.
          </p>
        </div>

        {/* Large Editorial Vertical List (No 3-card grid) */}
        <div className="divide-y divide-slate-300/90 border-t border-b border-slate-300/90">
          {ESSENTIALS_LIST.map((item, idx) => {
            const isOpen = activeRow === idx;
            return (
              <div
                key={item.num}
                onClick={() => setActiveRow(isOpen ? null : idx)}
                className={`essentials-row-anim py-7 sm:py-9 px-4 sm:px-6 cursor-pointer transition-all duration-300 group ${
                  isOpen ? "bg-white/90 shadow-2xs" : "hover:bg-white/50"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                  {/* Left Number & Label */}
                  <div className="md:col-span-3 flex flex-col justify-start">
                    <span className={`font-mono text-xs font-bold transition-colors ${isOpen ? "text-[#00C8A0]" : "text-slate-400"}`}>
                      {item.num}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${isOpen ? "text-[#0B7FB5]" : "text-slate-400"}`}>
                      {item.eyebrow}
                    </span>
                  </div>

                  {/* Right Title & Details */}
                  <div className="md:col-span-9">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-serif text-2xl sm:text-3xl font-bold transition-colors ${
                        isOpen ? "text-[#0A1926]" : "text-slate-700 group-hover:text-[#0A1926]"
                      }`}>
                        {item.title}
                      </h3>

                      <span className={`text-base font-bold transition-transform duration-300 ${
                        isOpen ? "text-[#00C8A0] rotate-90" : "text-slate-300 group-hover:text-slate-500"
                      }`}>
                        →
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans mt-2 max-w-2xl">
                      {item.summary}
                    </p>

                    {isOpen && (
                      <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 animate-fadeIn">
                        {item.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-sans">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#00C8A0] shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Organic Wave Divider Transitioning into Visit FAQ (#0A1926) */}
      <WaveDivider fill="#0A1926" />
    </section>
  );
}