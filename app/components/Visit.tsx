"use client";

import { useEffect, useState, useRef } from "react";
import VisitHero from "./visit/VisitHero";
import VisitPlan from "./visit/VisitPlan";
import VisitAtAGlance from "./visit/VisitAtAGlance";
import VisitKnowBeforeYouGo from "./visit/VisitKnowBeforeYouGo";
import VisitMap from "./visit/VisitMap";
import VisitFAQ from "./visit/VisitFAQ";
import VisitCTA from "./visit/VisitCTA";
import WaveDivider from "./WaveDivider";

interface VisitProps {
  onOpenBooking: (tier?: string) => void;
}

const SECTIONS = [
  { id: "arrive-ready", label: "ARRIVE" },
  { id: "visit-at-a-glance", label: "VISIT" },
  { id: "know-before-you-go", label: "KNOW" },
  { id: "location-directions", label: "MAP" },
  { id: "faq", label: "FAQ" },
];

export default function Visit({ onOpenBooking }: VisitProps) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              const idx = sections.indexOf(target);
              if (idx !== -1) {
                setActiveSection(idx);
              }
            }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      sections.forEach((section) => observerRef.current?.unobserve(section));
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div id="visit" className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* Vertical Section Navigation (Desktop only) */}
      <nav
        id="section-tracker"
        className="hidden lg:fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-4 pointer-events-none"
        aria-label="Page sections"
      >
        {SECTIONS.map((section, idx) => (
          <div
            key={section.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className={`relative group pointer-events-auto transition-all duration-300 ${
              activeSection === idx ? "opacity-100 translate-x-0" : "opacity-60"
            }`}
          >
            <button
              onClick={() => {
                const target = document.getElementById(section.id);
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 hover:bg-white/20 hover:border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#00C8A0]"
              aria-current={activeSection === idx ? "true" : "false"}
              aria-label={`Scroll to ${section.label}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === idx
                    ? "bg-[#00C8A0] scale-125 shadow-[0_0_8px_rgba(0,200,160,0.6)]"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
              <span className={`text-xs font-extrabold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-300 ${
                activeSection === idx ? "text-white opacity-100 w-auto" : "text-white/50 opacity-0 w-0 overflow-hidden"
              }`}>
                {section.label}
              </span>
            </button>
          </div>
        ))}
      </nav>

      {/* 01 — CINEMATIC ARRIVAL HERO */}
      <VisitHero onOpenBooking={onOpenBooking} />

      {/* Wave: Hero → Arrive Ready */}
      <WaveDivider fill="#F7F6F1" className="-bottom-[1px]" />

      {/* 02 — ARRIVE READY */}
      <VisitPlan />

      {/* Wave: Arrive Ready → Visit At A Glance */}
      <WaveDivider fill="#F7F6F1" className="-bottom-[1px]" />

      {/* 03 — YOUR VISIT AT A GLANCE */}
      <VisitAtAGlance />

      {/* 04 — KNOW BEFORE YOU GO (Cinematic Visual Break) */}
      <VisitKnowBeforeYouGo />

      {/* Wave: Know Before You Go → Location */}
      <WaveDivider fill="white" className="-bottom-[1px]" />

      {/* 05 — LOCATION + DIRECTIONS */}
      <VisitMap />

      {/* Wave: Location → FAQ */}
      <WaveDivider fill="#061C27" className="-bottom-[1px]" />

      {/* 06 — FAQ / HELP */}
      <VisitFAQ />

      {/* 07 — FINAL ARRIVAL CTA */}
      <VisitCTA onOpenBooking={onOpenBooking} />
    </div>
  );
}