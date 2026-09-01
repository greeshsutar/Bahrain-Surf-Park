"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const TAB_DATA = [
  {
    id: "what-to-bring",
    label: "WHAT TO BRING",
    content: {
      essential: [
        "Swimwear",
        "Towel",
        "Reef-safe sun protection",
        "Dry clothes for after your session",
      ],
      recommended: [
        "Water bottle",
        "Sandals or water shoes",
        "Light jacket for evening sessions",
      ],
      provided: [
        "Soft-top surfboard (Beginner/Novice sessions)",
        "Personal locker access",
        "Private changing suite",
        "Shower facilities",
      ],
    },
  },
  {
    id: "safety",
    label: "SAFETY",
    content: {
      essential: [
        "Mandatory 15-minute safety briefing before every session",
        "ISA-certified surf coaches present at all times",
        "Lifeguard-monitored lagoon with dedicated safety zones",
        "Helmet required for Beginner sessions",
      ],
      recommended: [
        "Listen to coach instructions at all times",
        "Stay within your designated wave zone",
        "Signal coach immediately if you need assistance",
      ],
      provided: [
        "Personal flotation device available on request",
        "First aid station on-site",
        "Emergency response protocol active",
      ],
    },
  },
  {
    id: "facilities",
    label: "FACILITIES",
    content: {
      essential: [
        "Private changing suites with secure lockers",
        "Hot showers and restrooms",
        "Surf Center with equipment fitting",
      ],
      recommended: [
        "Beachside lounge with refreshments",
        "Spectator viewing deck",
        "Retail shop for surf essentials",
      ],
      provided: [
        "Complimentary Wi-Fi in guest areas",
        "Valet drop-off at main entrance",
        "Dedicated accessible facilities",
      ],
    },
  },
  {
    id: "accessibility",
    label: "ACCESSIBILITY",
    content: {
      essential: [
        "Wheelchair-accessible pathways throughout the park",
        "Accessible changing rooms and restrooms",
        "Designated accessible parking spaces near entrance",
        "Adaptive surfing program available with advance notice",
      ],
      recommended: [
        "Contact Guest Services 48 hours prior for specific accommodations",
        "Beach wheelchair available on request",
      ],
      provided: [
        "Trained staff for assisted access",
        "Service animals welcome in designated areas",
      ],
    },
  },
  {
    id: "rules",
    label: "RULES",
    content: {
      essential: [
        "Check-in required 45 minutes before session",
        "Safety briefing attendance is mandatory",
        "No outside boards without prior approval",
        "Alcohol and glass containers prohibited",
      ],
      recommended: [
        "Respect fellow surfers and coaches",
        "Follow all posted signage and coach directions",
        "Children under 12 must be accompanied by an adult",
      ],
      provided: [
        "Full park policies available at check-in",
        "Guest Services desk for questions",
      ],
    },
  },
];

export default function VisitAtAGlance() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-glance-anim",
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

  const updateIndicator = () => {
    if (!indicatorRef.current || !tabRefs.current[activeTab]) return;
    const tab = tabRefs.current[activeTab];
    const container = tab.parentElement;
    if (!container) return;

    const tabRect = tab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    gsap.to(indicatorRef.current, {
      x: tabRect.left - containerRect.left,
      width: tabRect.width,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab]);

  const activeContent = TAB_DATA[activeTab].content;

  return (
    <section
      ref={sectionRef}
      id="visit-at-a-glance"
      className="bg-[#F7F6F1] text-[#0A1926] py-24 sm:py-32 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 visit-glance-anim">
          <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            YOUR VISIT AT A GLANCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A1926] leading-[1.08] tracking-tight">
            What You Need to Know<br />Before You Arrive
          </h2>
        </div>

        {/* Tab Navigation */}
        <div
          className="relative visit-glance-anim overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
          role="tablist"
          aria-label="Visit information categories"
        >
          <div
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-1 bg-[#00C8A0] rounded-full transition-all duration-300 ease-out"
            aria-hidden="true"
          />
          <div className="flex items-center gap-2 min-w-max">
            {TAB_DATA.map((tab, idx) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setActiveTab(idx)}
                role="tab"
                aria-selected={activeTab === idx}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`relative flex-shrink-0 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap ${
                  activeTab === idx
                    ? "text-[#0A1926]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Panels */}
        <div className="mt-8 visit-glance-anim" role="tabpanel" aria-labelledby={`tab-${TAB_DATA[activeTab].id}`} id={`panel-${TAB_DATA[activeTab].id}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* ESSENTIAL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#00C8A0]/15 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#00C8A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#00C8A0]">ESSENTIAL</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 font-sans leading-relaxed">
                {activeContent.essential.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#00C8A0] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RECOMMENDED */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#0B7FB5]/15 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#0B7FB5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 19a2 2 0 01-2-2V7a2 2 0 014 0v10a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19a2 2 0 01-2-2V7a2 2 0 014 0v10a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 014 0v10a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#0B7FB5]">RECOMMENDED</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 font-sans leading-relaxed">
                {activeContent.recommended.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#0B7FB5] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PROVIDED */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#061C27]/10 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#0A1926]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#0A1926]">PROVIDED</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 font-sans leading-relaxed">
                {activeContent.provided.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#0A1926] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}