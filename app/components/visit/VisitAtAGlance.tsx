"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

const ESSENTIALS_DATA = [
  {
    id: "what-to-bring",
    label: "WHAT TO BRING",
    content: {
      essential: [
        "Swimwear (boardshorts, swimsuits, rashguards)",
        "Fresh towel for post-session drying",
        "Reef-safe sun protection (SPF 30+)",
        "Dry set of clothes for post-surf leisure",
      ],
      recommended: [
        "Water bottle for hydration",
        "Sandals or water shoes for pool deck areas",
        "Light jacket for evening sea breezes",
      ],
      provided: [
        "Soft-top surfboard (Beginner/Novice sessions)",
        "Personal secure locker access",
        "Private changing suite access",
        "Freshwater shower facilities",
      ],
    },
  },
  {
    id: "safety",
    label: "SAFETY",
    content: {
      essential: [
        "Mandatory safety briefing before every session",
        "ISA-certified surf coaches present on water",
        "Lifeguard-monitored lagoon with dedicated safety zones",
        "Soft-top equipment required for beginner zones",
      ],
      recommended: [
        "Follow coach instructions and lane rules at all times",
        "Stay within your assigned skill level wave zone",
        "Signal lifeguards immediately if assistance is needed",
      ],
      provided: [
        "Personal flotation devices available on request",
        "First aid station on-site",
        "Emergency response medical protocol active",
      ],
    },
  },
  {
    id: "facilities",
    label: "FACILITIES",
    content: {
      essential: [
        "Private changing suites with digital lockers",
        "Freshwater hot showers and luxury restrooms",
        "Surf Center for gear check-in and fitting",
      ],
      recommended: [
        "Beachside lounge with healthy refreshments",
        "Elevated spectator viewing deck overlooking lagoon",
        "Surf retail shop for apparel and wax",
      ],
      provided: [
        "High-speed complimentary Wi-Fi in guest areas",
        "Dedicated guest parking near entrance",
        "Full wheelchair-accessible facilities",
      ],
    },
  },
  {
    id: "accessibility",
    label: "ACCESSIBILITY",
    content: {
      essential: [
        "Step-free wheelchair-accessible pathways throughout resort",
        "Accessible private changing rooms and restrooms",
        "Designated accessible parking spaces near main lobby",
        "Adaptive surfing programs available with advance notice",
      ],
      recommended: [
        "Contact Guest Services 48 hours prior for dedicated assistance",
        "Beach wheelchairs available upon request",
      ],
      provided: [
        "Trained guest service team for assisted entry",
        "Service animals permitted in designated guest areas",
      ],
    },
  },
  {
    id: "rules",
    label: "RULES",
    content: {
      essential: [
        "Check-in required 45 minutes before session time",
        "Mandatory safety briefing attendance",
        "No personal hardboards in beginner zones without clearance",
        "Alcohol and glass containers strictly prohibited",
      ],
      recommended: [
        "Respect fellow surfers and coach safety calls",
        "Adhere to wave rotation guidelines",
        "Children under 12 must be accompanied by an adult",
      ],
      provided: [
        "Complete guest safety policies available at check-in",
        "Guest Services desk for on-site inquiries",
      ],
    },
  },
];

export default function VisitAtAGlance() {
  const [activeTab, setActiveTab] = useState(0);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".essentials-anim",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: MOTION.STAGGER,
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

  const handleTabChange = (index: number) => {
    if (activeTab === index) return;
    
    if (contentRef.current && !isReducedMotion()) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(index);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
          );
        },
      });
    } else {
      setActiveTab(index);
    }
  };

  const activeContent = ESSENTIALS_DATA[activeTab].content;

  return (
    <section
      ref={sectionRef}
      id="visit-essentials"
      className="relative bg-gradient-to-b from-[#F7F6F1] via-[#FAF9F5] to-white text-[#0A1926] py-24 sm:py-32 z-10 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Background Dot Texture & Ambient Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0A1926_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00C8A0]/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-left mb-14 essentials-anim">
          <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            06 — VISITOR ESSENTIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0A1926] leading-[1.05] tracking-tight mb-4">
            VISITOR ESSENTIALS.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-sans leading-relaxed max-w-2xl">
            Everything provided, recommended, and required for your visit to Bahrain Surf Park.
          </p>
        </div>

        {/* Desktop Tab System */}
        <div className="hidden md:block essentials-anim">
          <div
            className="flex items-center gap-3 border-b border-slate-300 mb-10 overflow-x-auto"
            role="tablist"
            aria-label="Visitor essentials navigation"
          >
            {ESSENTIALS_DATA.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(idx)}
                  onMouseMove={handleMagneticMouseMove}
                  onMouseLeave={handleMagneticMouseLeave}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`py-4 px-5 text-xs font-extrabold uppercase tracking-[0.15em] transition-all relative cursor-pointer whitespace-nowrap ${
                    isActive ? "text-[#0A1926]" : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C8A0] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Panel Display with lift+shadow tier-card hover effect */}
          <div
            ref={contentRef}
            role="tabpanel"
            aria-labelledby={`tab-${ESSENTIALS_DATA[activeTab].id}`}
            id={`panel-${ESSENTIALS_DATA[activeTab].id}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* ESSENTIAL */}
            <div className="bg-white/90 border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-[#00C8A0]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-[#00C8A0]/15 flex items-center justify-center text-[#00C8A0]">
                  ✓
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#00C8A0]">
                  ESSENTIAL
                </span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 font-sans leading-relaxed">
                {activeContent.essential.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#00C8A0] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RECOMMENDED */}
            <div className="bg-white/90 border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-[#0B7FB5]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-[#0B7FB5]/15 flex items-center justify-center text-[#0B7FB5]">
                  ★
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0B7FB5]">
                  RECOMMENDED
                </span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 font-sans leading-relaxed">
                {activeContent.recommended.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#0B7FB5] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PROVIDED */}
            <div className="bg-white/90 border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-[#0A1926]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-[#0A1926]/10 flex items-center justify-center text-[#0A1926]">
                  ✦
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0A1926]">
                  PROVIDED
                </span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 font-sans leading-relaxed">
                {activeContent.provided.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#0A1926] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Accessible Accordions */}
        <div className="block md:hidden space-y-4 essentials-anim">
          {ESSENTIALS_DATA.map((tab, idx) => {
            const isOpen = openMobileAccordion === idx;
            return (
              <div key={tab.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-[#00C8A0]/40 transition-colors">
                <button
                  onClick={() => setOpenMobileAccordion(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`mobile-panel-${tab.id}`}
                  className="w-full flex items-center justify-between p-5 text-left min-h-[48px] focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-extrabold uppercase tracking-widest text-[#0A1926]">
                    {tab.label}
                  </span>
                  <span className="text-xl font-bold text-[#0B7FB5]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div id={`mobile-panel-${tab.id}`} className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-6">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-2">
                        ESSENTIAL
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700 font-sans">
                        {tab.content.essential.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#00C8A0] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5] block mb-2">
                        RECOMMENDED
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700 font-sans">
                        {tab.content.recommended.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#0B7FB5] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A1926] block mb-2">
                        PROVIDED
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700 font-sans">
                        {tab.content.provided.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#0A1926] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}