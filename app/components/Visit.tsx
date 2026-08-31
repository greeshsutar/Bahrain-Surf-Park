"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";
import WaveDivider from "./WaveDivider";

interface VisitProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Visit({ onOpenBooking }: VisitProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const reduced = isReducedMotion();

    if (!reduced) {
      const animElements = section.querySelectorAll(".visit-animate");
      gsap.fromTo(
        animElements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          stagger: MOTION.STAGGER,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      const animElements = section.querySelectorAll(".visit-animate");
      gsap.set(animElements, { opacity: 1, y: 0 });
    }

    return () => {
      ScrollTrigger.getAll().filter((st) => st.trigger === section).forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="bg-white pt-16 sm:pt-24 pb-32 sm:pb-40 lg:pb-44 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Practical Visit Logistics & Map Integration Placeholder */}
          <div className="lg:col-span-5 text-left flex flex-col justify-start">
            
            {/* Plain Typographic Eyebrow */}
            <span className="visit-animate text-[#0B7FB5] text-xs font-extrabold tracking-[0.2em] uppercase mb-4 block">
              PLAN YOUR VISIT
            </span>

            {/* Headline (Playfair Display) */}
            <h2 className="visit-animate font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1926] leading-[1.18] tracking-tight mb-6">
              Essential Details Before You Paddle Out
            </h2>

            <p className="visit-animate text-[#063B45]/80 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Located along the scenic coast of Bilaj Al Jazayer, Bahrain Surf Park is designed to make your surf day seamless from arrival to departure.
            </p>

            {/* Practical Logistics Summary Blocks */}
            <div className="visit-animate space-y-4 mb-8">
              <div className="border-l-2 border-[#0B7FB5] pl-4 py-1">
                <span className="text-xs font-bold text-[#0A1926] uppercase tracking-wider block">Arrival Protocol</span>
                <p className="text-xs text-[#063B45]/75 mt-1 leading-relaxed">
                  Please check in 45 minutes prior to your session time for equipment fitting and the mandatory safety briefing.
                </p>
              </div>
              
              <div className="border-l-2 border-[#00C8A0] pl-4 py-1">
                <span className="text-xs font-bold text-[#0A1926] uppercase tracking-wider block">Operating Hours & Parking</span>
                <p className="text-xs text-[#063B45]/75 mt-1 leading-relaxed">
                  <span className="font-semibold text-[#0A1926]">Open daily from 7:00 AM to 10:00 PM</span> — Dedicated visitor parking and valet drop-off available.
                </p>
              </div>
            </div>

            {/* Official Google Maps Location Card */}
            <a
              href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
              target="_blank"
              rel="noopener noreferrer"
              className="visit-animate group rounded-xl border border-[#0B7FB5]/20 bg-[#F0F8FF] hover:bg-[#E6F4FE] p-6 mb-8 text-center flex flex-col items-center justify-center relative overflow-hidden transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-[#0B7FB5] text-white flex items-center justify-center mb-3 shadow-md transition-transform duration-300 group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A1926] block mb-1 group-hover:text-[#0B7FB5] transition-colors">
                Bilaj Al Jazayer, Kingdom of Bahrain
              </span>
              <span className="text-[11px] font-mono text-slate-500 block mb-3">26.0125° N, 50.4850° E</span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B7FB5] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all group-hover:bg-[#063B45]">
                <span>VIEW ON GOOGLE MAPS</span>
                <span className="text-sm">↗</span>
              </span>
            </a>

            {/* Primary CTA Button */}
            <div className="visit-animate">
              <button
                onClick={() => onOpenBooking()}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#0077B6] text-[#FFFFFF] px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>BOOK YOUR SESSION</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </div>

          </div>

          {/* Right Column: Editorial FAQ Accordion */}
          <div className="lg:col-span-7 text-left">
            
            <div className="visit-animate border-b border-slate-200 pb-4 mb-2">
              <span className="text-xs font-bold text-[#0A1926]/60 uppercase tracking-widest block">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            {/* Plain Typographic Accordion List */}
            <div className="divide-y divide-slate-200">
              
              {/* Question 1 */}
              <details className="visit-animate group py-5" open>
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>What should I bring to my session?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Bring proper swimwear, a towel, reef-safe sun protection, and dry clothes for after your session. Standard boards and safety equipment are included with your booking, along with personal locker and changing suite access.
                </div>
              </details>

              {/* Question 2 */}
              <details className="visit-animate group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>Do I need prior surfing experience?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Not at all. Our lagoon features calibrated beginner wave profiles and ISA-certified coaching designed specifically for first-timers, alongside progressively challenging waves for intermediate and expert riders.
                </div>
              </details>

              {/* Question 3 */}
              <details className="visit-animate group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>Are wetsuits and surfboards provided?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Yes, soft-top boards and essential gear are provided for Beginner and Novice sessions. Surfers can also bring their own boards or upgrade to high-performance demo fleet options.
                </div>
              </details>

              {/* Question 4 */}
              <details className="visit-animate group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>What happens if the weather conditions change?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Unlike open ocean breaks, our electro-mechanical Wavegarden Cove generator operates in standard weather conditions. In the event of lightning or severe wind, sessions will be rescheduled in accordance with park safety policies.
                </div>
              </details>

            </div>

          </div>

        </div>

      </div>

      {/* Flush Wave Divider transitioning Visit into Navy #0A1926 Footer */}
      <WaveDivider fill="#0A1926" />
    </section>
  );
}
