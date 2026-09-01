"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "ARRIVE",
    desc: "Arrive at Bilaj Al Jazayer with dedicated visitor parking and valet drop-off available.",
  },
  {
    num: "02",
    title: "CHECK IN",
    desc: "Check in at the guest portal 45 minutes prior to your scheduled session time.",
  },
  {
    num: "03",
    title: "GEAR UP",
    desc: "Receive your fitted soft-top board, wetsuit, and access to private changing suites & lockers.",
  },
  {
    num: "04",
    title: "SAFETY BRIEFING",
    desc: "Attend the mandatory 15-minute safety orientation led by our ISA-certified surf coaches.",
  },
  {
    num: "05",
    title: "PADDLE OUT",
    desc: "Enter the lagoon, take your spot in the lineup, and catch your first ocean-like wave!",
  },
];

export default function VisitPlan() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    if (isReducedMotion()) {
      gsap.set(".timeline-step", { opacity: 1, y: 0 });
      gsap.set(".timeline-line-path", { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Text reveals on left
      gsap.fromTo(
        ".plan-left-anim",
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

      // 2. Timeline steps & connecting line draw animation
      const linePath = lineRef.current;
      if (linePath) {
        const length = linePath.getTotalLength();
        gsap.set(linePath, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });

        tl.to(linePath, { strokeDashoffset: 0, ease: "none" });

        // Activate step nodes sequentially based on scroll progress
        JOURNEY_STEPS.forEach((_, idx) => {
          tl.to(
            `#step-node-${idx}`,
            {
              backgroundColor: "#00C8A0",
              borderColor: "#00C8A0",
              boxShadow: "0 0 16px rgba(0,200,160,0.6)",
              scale: 1.15,
              duration: 0.2,
            },
            idx / (JOURNEY_STEPS.length - 1)
          ).to(
            `#step-card-${idx}`,
            {
              opacity: 1,
              borderColor: "rgba(0, 200, 160, 0.4)",
              duration: 0.2,
            },
            idx / (JOURNEY_STEPS.length - 1)
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plan-your-visit"
      className="bg-[#F7F6F1] text-[#0A1926] py-24 sm:py-32 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Editorial Narrative & Practical Logistics (5 cols) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-start">
            <span className="plan-left-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              BEFORE YOU ARRIVE
            </span>

            <h2 className="plan-left-anim font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-6">
              Everything You Need<br />Before Your Session
            </h2>

            <p className="plan-left-anim text-[#063B45]/80 text-sm sm:text-base leading-relaxed font-sans mb-10">
              Located along the scenic coast of Bilaj Al Jazayer, Bahrain Surf Park is designed to make your surf day seamless from arrival to departure.
            </p>

            {/* Editorial Information Rows */}
            <div className="plan-left-anim space-y-6">
              <div className="border-l-2 border-[#0B7FB5] pl-5 py-1.5 transition-all duration-300 hover:translate-x-1">
                <span className="text-xs font-extrabold text-[#0A1926] uppercase tracking-widest block mb-1">
                  ARRIVAL PROTOCOL
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Please check in 45 minutes prior to your session time for equipment fitting and the mandatory safety briefing.
                </p>
              </div>

              <div className="border-l-2 border-[#00C8A0] pl-5 py-1.5 transition-all duration-300 hover:translate-x-1">
                <span className="text-xs font-extrabold text-[#0A1926] uppercase tracking-widest block mb-1">
                  OPERATING HOURS & PARKING
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  <span className="font-bold text-[#0A1926]">Open daily from 7:00 AM to 10:00 PM</span> — Dedicated visitor parking and valet drop-off available.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Arrival Journey Timeline (7 cols) */}
          <div className="lg:col-span-7 text-left">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <span className="text-xs font-extrabold text-[#0B7FB5] tracking-[0.2em] uppercase">
                  ARRIVAL JOURNEY
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  5 STEPS TO THE LINEUP
                </span>
              </div>

              {/* Timeline Container with SVG Connecting Line */}
              <div className="timeline-container relative pl-8 sm:pl-10 space-y-8">
                {/* SVG Progress Line */}
                <svg
                  className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-[2px] h-[calc(100%-32px)] pointer-events-none"
                  overflow="visible"
                >
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    ref={lineRef}
                    d="M 1 0 L 1 540"
                    fill="none"
                    stroke="#00C8A0"
                    strokeWidth="2.5"
                    className="timeline-line-path"
                  />
                </svg>

                {/* Steps List */}
                {JOURNEY_STEPS.map((step, idx) => (
                  <div
                    key={step.num}
                    id={`step-card-${idx}`}
                    className="timeline-step relative pl-4 bg-slate-50/60 border border-slate-200/60 rounded-2xl p-5 transition-all duration-300 hover:bg-white"
                  >
                    {/* Node Dot */}
                    <div
                      id={`step-node-${idx}`}
                      className="absolute -left-[37px] sm:-left-[41px] top-6 w-5 h-5 rounded-full bg-white border-2 border-slate-300 transition-all duration-300 flex items-center justify-center z-10"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>

                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#00C8A0]">
                        STEP {step.num}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        {step.title}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#0A1926] mb-1">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
