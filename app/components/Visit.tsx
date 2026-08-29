"use client";

import gsap from "gsap";

interface VisitProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Visit({ onOpenBooking }: VisitProps) {
  const handleMouseEnterBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.04, y: -2, duration: 0.3, ease: "back.out(1.4)", overwrite: "auto" });
  };

  const handleMouseLeaveBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section id="visit" className="bg-white py-16 sm:py-24 relative z-10 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Practical Visit Logistics & Map Integration Placeholder */}
          <div className="lg:col-span-5 text-left flex flex-col justify-start">
            
            {/* Plain Typographic Eyebrow */}
            <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.2em] uppercase mb-4 block">
              PLAN YOUR VISIT
            </span>

            {/* Headline (Playfair Display) */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1926] leading-[1.18] tracking-tight mb-6">
              Essential Details Before You Paddle Out
            </h2>

            <p className="text-[#063B45]/80 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Located along the scenic coast of Bilaj Al Jazayer, Bahrain Surf Park is designed to make your surf day seamless from arrival to departure.
            </p>

            {/* Practical Logistics Summary Blocks */}
            <div className="space-y-4 mb-8">
              <div className="border-l-2 border-[#0B7FB5] pl-4 py-1">
                <span className="text-xs font-bold text-[#0A1926] uppercase tracking-wider block">Arrival Protocol</span>
                <p className="text-xs text-[#063B45]/75 mt-1 leading-relaxed">
                  Please check in 45 minutes prior to your session time for equipment fitting and the mandatory safety briefing.
                </p>
              </div>
              
              <div className="border-l-2 border-[#00C8A0] pl-4 py-1">
                <span className="text-xs font-bold text-[#0A1926] uppercase tracking-wider block">Operating Hours & Parking</span>
                <p className="text-xs text-[#063B45]/75 mt-1 leading-relaxed">
                  <span className="font-semibold text-[#0A1926]">[CONTENT REQUIRED: VISIT DETAILS]</span> — Dedicated visitor parking and valet drop-off available.
                </p>
              </div>
            </div>

            {/* Clearly Marked Map Integration Placeholder */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-8 text-center flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-[#0B7FB5]/10 text-[#0B7FB5] flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A1926] block mb-1">
                Bilaj Al Jazayer, Kingdom of Bahrain
              </span>
              <span className="text-[11px] font-mono text-slate-400 block mb-2">26.0125° N, 50.4850° E</span>
              <span className="inline-block px-2.5 py-1 rounded bg-slate-200/70 text-[10px] font-extrabold uppercase tracking-widest text-[#063B45]/80">
                [MAP INTEGRATION REQUIRED]
              </span>
            </div>

            {/* Primary CTA Button */}
            <div>
              <button
                onClick={() => onOpenBooking()}
                onMouseEnter={handleMouseEnterBtn}
                onMouseLeave={handleMouseLeaveBtn}
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
            
            <div className="border-b border-slate-200 pb-4 mb-2">
              <span className="text-xs font-bold text-[#0A1926]/60 uppercase tracking-widest block">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            {/* Plain Typographic Accordion List */}
            <div className="divide-y divide-slate-200">
              
              {/* Question 1 */}
              <details className="group py-5" open>
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>What should I bring to my session?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Bring proper swimwear, a towel, reef-safe sun protection, and dry clothes for after your session. Standard boards and safety equipment are included with your booking. <span className="text-xs font-semibold text-slate-500">[CONTENT REQUIRED: VISIT DETAILS]</span> for personal locker and changing suite access.
                </div>
              </details>

              {/* Question 2 */}
              <details className="group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>Do I need prior surfing experience?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Not at all. Our lagoon features calibrated beginner wave profiles and ISA-certified coaching designed specifically for first-timers, alongside progressively challenging waves for intermediate and expert riders.
                </div>
              </details>

              {/* Question 3 */}
              <details className="group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>Are wetsuits and surfboards provided?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Yes, soft-top boards and essential gear are provided for Beginner and Novice sessions. Surfers can also bring their own boards or upgrade to high-performance rental options. <span className="text-xs font-semibold text-slate-500">[CONTENT REQUIRED: VISIT DETAILS]</span> for specialty demo fleet rates.
                </div>
              </details>

              {/* Question 4 */}
              <details className="group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-bold text-base text-[#0A1926] hover:text-[#0B7FB5] transition-colors pr-2">
                  <span>What happens if the weather conditions change?</span>
                  <span className="text-[#0B7FB5] text-lg font-light transition-transform duration-300 group-open:rotate-45 ml-4 shrink-0">+</span>
                </summary>
                <div className="pt-3 text-sm text-[#063B45]/80 leading-relaxed font-sans">
                  Unlike open ocean breaks, our electro-mechanical Wavegarden Cove generator operates in standard weather conditions. In the event of lightning or severe wind, sessions will be rescheduled in accordance with park safety policies. <span className="text-xs font-semibold text-slate-500">[CONTENT REQUIRED: VISIT DETAILS]</span> for rescheduling guidelines.
                </div>
              </details>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
