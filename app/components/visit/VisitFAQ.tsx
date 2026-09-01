"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

const FAQS = [
  {
    q: "WHAT SHOULD I BRING TO MY SESSION?",
    a: "Bring proper swimwear, a towel, reef-safe sun protection, and dry clothes for after your session. Standard boards and safety equipment are included with your booking, along with personal locker and changing suite access.",
  },
  {
    q: "DO I NEED PRIOR SURFING EXPERIENCE?",
    a: "Not at all. Our lagoon features calibrated beginner wave profiles and ISA-certified coaching designed specifically for first-timers, alongside progressively challenging waves for intermediate and expert riders.",
  },
  {
    q: "WHAT SHOULD I KNOW BEFORE ARRIVING?",
    a: "Arrive 45 minutes before your scheduled water time to complete check-in, equipment fitting, locker setup, and the mandatory lagoon safety briefing.",
  },
  {
    q: "ARE FACILITIES AVAILABLE ON-SITE?",
    a: "Yes. Private changing suites, secure lockers, hot freshwater showers, spectator viewing decks, and beachside lounge dining are available for all guests.",
  },
  {
    q: "WHAT HAPPENS IF WEATHER CONDITIONS CHANGE?",
    a: "Unlike open ocean breaks, our electro-mechanical wave generator operates in standard weather conditions. In the event of severe weather or lightning, sessions will be rescheduled safely in accordance with park policy.",
  },
  {
    q: "CAN FRIENDS AND FAMILY WATCH FROM THE SHORE?",
    a: "Yes. Spectators are welcome on the designated viewing deck and beachside lounge free of charge.",
  },
];

export default function VisitFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-row-anim",
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

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-gradient-to-b from-[#0A1926] via-[#061C27] to-[#02141C] text-white pt-24 sm:pt-32 pb-0 z-10 overflow-hidden"
    >
      {/* Soft Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00C8A0]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#0B7FB5]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-left relative z-10">
        <div className="faq-row-anim mb-16 max-w-2xl">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            07 — FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            ARRIVING AT THE LAGOON.
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-sans leading-relaxed">
            Clear answers to common questions before your session at Bilaj Al Jazayer.
          </p>
        </div>

        {/* Large Horizontal Rows Editorial FAQ */}
        <div className="divide-y divide-white/15 border-t border-b border-white/15">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="faq-row-anim py-6 sm:py-8 group">
                <button
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-body-${idx}`}
                  className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer py-3 px-4 rounded-xl hover:bg-white/[0.06] hover:border hover:border-[#00C8A0]/30 transition-all duration-300"
                >
                  <span className="font-serif font-bold text-lg sm:text-2xl text-white group-hover:text-[#00C8A0] pr-6 transition-colors tracking-tight">
                    {faq.q}
                  </span>

                  <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#00C8A0] text-xl font-light shrink-0 transition-all duration-300 group-hover:bg-[#00C8A0] group-hover:text-[#02141C] group-hover:border-[#00C8A0]">
                    <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                      +
                    </span>
                  </span>
                </button>

                <div
                  id={`faq-body-${idx}`}
                  role="region"
                  aria-label={faq.q}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4 px-4" : "grid-rows-[0fr] opacity-0 mt-0 px-4"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl pb-2">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wave Divider Transitioning into Guest Assistance Section (#F7F6F1) */}
      <div className="mt-20 sm:mt-28">
        <WaveDivider fill="#F7F6F1" />
      </div>
    </section>
  );
}