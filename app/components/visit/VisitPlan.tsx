"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

const QUICK_NAV_ITEMS = [
  { id: "getting-here", label: "GETTING HERE" },
  { id: "parking-access", label: "PARKING" },
  { id: "know-before-you-go", label: "WHAT TO BRING" },
  { id: "visit-essentials", label: "SAFETY & FACILITIES" },
  { id: "wayfinding-map", label: "MAP" },
  { id: "visit-faq", label: "FAQ" },
  { id: "visit-contact", label: "CONTACT" },
];

const ARRIVAL_STEPS = [
  {
    step: "01",
    title: "GETTING HERE",
    subtitle: "Bilaj Al Jazayer, Bahrain",
    desc: "Located on Bahrain's pristine southwest coast, accessible via Sheikh Isa Bin Salman Highway. Approximately 30 minutes from Manama city center.",
    ctaLabel: "GET DIRECTIONS ↗",
    ctaAction: "directions",
  },
  {
    step: "02",
    title: "PARKING & RESORT ENTRY",
    subtitle: "Dedicated Guest Parking",
    desc: "On-site visitor parking with direct entry to the main entrance lobby. Clear directional signage guides guests from the main highway turn-off.",
    ctaLabel: "VIEW PARKING INFO ↓",
    ctaAction: "parking",
  },
  {
    step: "03",
    title: "GUEST CHECK-IN",
    subtitle: "Check-in 45 Mins Prior",
    desc: "Arrive 45 minutes before your scheduled session time for gear fitting, locker assignment, and the mandatory safety orientation briefing.",
    ctaLabel: "CHECK-IN GUIDELINES ↓",
    ctaAction: "essentials",
  },
];

export default function VisitPlan() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".arrive-anim",
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

  const handleNavClick = (id: string) => {
    if (id === "directions") {
      window.open("https://maps.app.goo.gl/qcxXGozrQb9vLgnX8", "_blank", "noopener,noreferrer");
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="arrive-ready"
      className="bg-[#F7F6F1] text-[#0A1926] pt-16 sm:pt-20 pb-20 sm:pb-24 relative z-10 border-b border-slate-200/80"
    >
      {/* Quick Access Horizontal Utility Navigation Bar */}
      <div className="sticky top-20 z-30 bg-[#F7F6F1]/90 backdrop-blur-md border-y border-slate-200 shadow-sm py-3 mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B7FB5] shrink-0 mr-3 hidden sm:inline-block">
            QUICK ACCESS:
          </span>
          {QUICK_NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#0A1926] hover:text-white border border-slate-200 text-[#0A1926] text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-xs"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="arrive-anim max-w-3xl mb-14 text-left">
          <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            02 — ARRIVE READY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0A1926] tracking-tight leading-[1.05] mb-5">
            ARRIVE READY.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
            From your journey to Bilaj Al Jazayer to checking in at the Guest Portal, here is everything you need for a smooth arrival experience.
          </p>
        </div>

        {/* 3-Column Editorial Arrival Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {ARRIVAL_STEPS.map((item) => (
            <div
              key={item.step}
              className="arrive-anim bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-2xl font-bold text-[#00C8A0]">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5] bg-[#0B7FB5]/10 px-2.5 py-1 rounded-md">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1926] mb-3 group-hover:text-[#0B7FB5] transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed font-sans mb-6">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => handleNavClick(item.ctaAction === "directions" ? "directions" : item.ctaAction === "parking" ? "parking-access" : "visit-essentials")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-full bg-[#0A1926] hover:bg-[#0B7FB5] text-white text-xs font-extrabold py-3.5 px-5 rounded-xl uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2 cursor-pointer mt-auto"
              >
                <span>{item.ctaLabel}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}