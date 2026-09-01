"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

const ARRIVAL_CATEGORIES = [
  {
    num: "01",
    title: "GETTING HERE",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343M18 12a6 6 0 01-12 0 6 6 0 0112 0z" />
      </svg>
    ),
    items: [
      {
        label: "From Manama City Center",
        value: "~25 min via Sheikh Isa Bin Salman Hwy",
      },
      {
        label: "From Bahrain International Airport",
        value: "~15 min via Sheikh Isa Bin Salman Hwy",
      },
      {
        label: "From Amwaj Islands",
        value: "~20 min via Coastal Road",
      },
      {
        label: "Rideshare / Taxi",
        value: "Available via all major apps",
      },
    ],
  },
  {
    num: "02",
    title: "PARKING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7a2 2 0 012-2h6a2 2 0 012 2v10m-6 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2" />
      </svg>
    ),
    items: [
      {
        label: "Dedicated Visitor Parking",
        value: "On-site lot with direct entrance access",
      },
      {
        label: "Valet Drop-Off",
        value: "Available at main entrance during operating hours",
      },
      {
        label: "Accessible Spaces",
        value: "Reserved spaces near park entry",
      },
      {
        label: "EV Charging",
        value: "Charging stations available in visitor lot",
      },
    ],
  },
  {
    num: "03",
    title: "ARRIVAL",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    items: [
      {
        label: "Check-In Time",
        value: "45 minutes before your session",
      },
      {
        label: "Guest Portal Location",
        value: "Main entrance, clearly signposted",
      },
      {
        label: "What Happens Next",
        value: "Equipment fitting → Safety briefing → Paddle out",
      },
      {
        label: "Late Arrival",
        value: "May result in session forfeiture — please plan ahead",
      },
    ],
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

  const handleGetDirections = () => {
    const el = document.getElementById("location-directions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="arrive-ready"
      className="bg-[#F7F6F1] text-[#0A1926] py-24 sm:py-32 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Large Destination Image */}
          <div className="lg:col-span-7 arrive-anim">
            <div className="relative rounded-[24px] overflow-hidden bg-slate-200 aspect-[4/3] sm:aspect-[5/4] bg-cover bg-center" style={{ backgroundImage: "url('/images/bahrain_surf_park_clean.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#02141C]/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="text-white">
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00C8A0] block mb-1">ARRIVE READY</span>
                  <p className="text-sm sm:text-base font-medium">Bilaj Al Jazayer, Bahrain</p>
                </div>
                <button
                  onClick={handleGetDirections}
                  onMouseMove={handleMagneticMouseMove}
                  onMouseLeave={handleMagneticMouseLeave}
                  className="bg-white hover:bg-slate-100 text-[#0A1926] font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>GET DIRECTIONS</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Practical Arrival Information */}
          <div className="lg:col-span-5 arrive-anim flex flex-col justify-start">
            <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              ARRIVE READY
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-8">
              Your Arrival,<br />Simplified.
            </h2>

            <div className="space-y-6">
              {ARRIVAL_CATEGORIES.map((category, catIdx) => (
                <div key={category.num} className="border-l-2 border-[#E2E8F0] pl-6 pb-8 last:pb-0 last:border-transparent transition-all duration-300 hover:border-[#00C8A0]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#00C8A0]/10 flex items-center justify-center text-[#00C8A0] shrink-0">
                      {category.icon}
                    </span>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#00C8A0]">
                        {category.num}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#0A1926] ml-2">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <dl className="space-y-3 ml-13">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-t border-slate-200/60">
                        <dt className="text-xs sm:text-sm text-slate-500 font-sans">
                          {item.label}
                        </dt>
                        <dd className="text-xs sm:text-sm font-medium text-[#0A1926] font-sans text-right sm:text-left">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <button
              onClick={handleGetDirections}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="mt-8 w-full sm:w-auto bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2"
            >
              <span>GET DIRECTIONS</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}