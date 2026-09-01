"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const FAQS = [
  {
    q: "What should I bring to my session?",
    a: "Bring proper swimwear, a towel, reef-safe sun protection, and dry clothes for after your session. Standard boards and safety equipment are included with your booking, along with personal locker and changing suite access.",
  },
  {
    q: "Do I need prior surfing experience?",
    a: "Not at all. Our lagoon features calibrated beginner wave profiles and ISA-certified coaching designed specifically for first-timers, alongside progressively challenging waves for intermediate and expert riders.",
  },
  {
    q: "Are wetsuits and surfboards provided?",
    a: "Yes, soft-top boards and essential gear are provided for Beginner and Novice sessions. Surfers can also bring their own boards or upgrade to high-performance demo fleet options at our Surf Center.",
  },
  {
    q: "What is the minimum age to surf?",
    a: "The minimum age for group sessions is 8 years old, unless otherwise authorized by park management. Private sessions allow surfers as young as 6.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Sessions canceled at least 30 days in advance receive a full refund. Cancellations between 14 days and 72 hours before your session receive park credit valid for one year. Cancellations within 72 hours are not eligible for a refund or credit.",
  },
  {
    q: "What happens if the weather conditions change?",
    a: "Unlike open ocean breaks, our electro-mechanical Wavegarden Cove generator operates in standard weather conditions. In the event of lightning or severe wind, sessions will be rescheduled in accordance with park safety policies.",
  },
];

export default function VisitFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first question open
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-faq-anim",
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

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-[#061C27] text-white py-24 sm:py-32 relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Editorial Header (35% width) */}
          <div className="lg:col-span-4 text-left flex flex-col justify-start">
            <span className="visit-faq-anim text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h2 className="visit-faq-anim font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.08] tracking-tight mb-6">
              Before You<br />Paddle Out<span className="text-[#00C8A0]">.</span>
            </h2>

            <p className="visit-faq-anim text-white/80 text-sm sm:text-base leading-relaxed font-sans">
              Everything you need to know about preparing for your session, equipment, age guidelines, and park policies.
            </p>
          </div>

          {/* RIGHT COLUMN: Single Accordion System (65% width) */}
          <div className="lg:col-span-8 text-left">
            <div className="visit-faq-anim border-t border-white/15 divide-y divide-white/15">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={faq.q} className="py-5 sm:py-6">
                    <button
                      onClick={() => toggleFAQ(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                    >
                      <span className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-[#00C8A0] transition-colors pr-4">
                        {faq.q}
                      </span>
                      
                      {/* Plus/Minus Indicator */}
                      <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00C8A0] text-lg font-light transition-transform duration-300 shrink-0 group-hover:bg-[#00C8A0] group-hover:text-[#061C27]">
                        <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                          +
                        </span>
                      </span>
                    </button>

                    {/* Smooth Height Expansion */}
                    <div
                      id={`faq-answer-${idx}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
