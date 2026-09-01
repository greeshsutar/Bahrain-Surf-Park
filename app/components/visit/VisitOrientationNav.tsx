"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

const NAV_ITEMS = [
  { id: "getting-here", label: "GETTING HERE" },
  { id: "parking-access", label: "PARKING" },
  { id: "what-to-bring", label: "WHAT TO BRING" },
  { id: "safety", label: "SAFETY" },
  { id: "facilities", label: "FACILITIES" },
  { id: "accessibility", label: "ACCESSIBILITY" },
  { id: "faq", label: "FAQ" },
];

export default function VisitOrientationNav() {
  const [activeId, setActiveId] = useState<string>("getting-here");
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveId(item.id),
          onEnterBack: () => setActiveId(item.id),
        });
        triggers.push(st);
      }
    });

    if (containerRef.current && !isReducedMotion()) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".orient-anim",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, containerRef);

      return () => {
        ctx.revert();
        triggers.forEach((st) => st.kill());
      };
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="arrive-ready"
      className="relative bg-gradient-to-b from-[#F7F6F1] via-[#FAF9F5] to-white text-[#0A1926] pt-16 sm:pt-24 pb-12 sm:pb-16 z-20 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Background Texture & Soft Ambient Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0A1926_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00C8A0]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left mb-10 relative z-10">
        <span className="orient-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
          02 — ORIENTATION
        </span>
        <h2 className="orient-anim font-serif text-3xl sm:text-5xl font-bold text-[#0A1926] tracking-tight leading-[1.05] mb-4">
          ARRIVE READY.
        </h2>
        <p className="orient-anim text-slate-600 text-base sm:text-lg leading-relaxed font-sans max-w-3xl">
          From your journey to Bilaj Al Jazayer to checking in at the Guest Portal, here is your essential guide to navigating Bahrain Surf Park effortlessly.
        </p>
      </div>

      {/* Arrival Guide Nav (Sticky Bar) */}
      <div ref={navRef} className="sticky top-16 sm:top-20 z-30 bg-[#F7F6F1]/95 backdrop-blur-md border-y border-slate-200/90 py-2.5 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B7FB5] shrink-0 mr-3 hidden lg:inline-block">
            ARRIVAL GUIDE:
          </span>

          <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-max" aria-label="Arrival guide section navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseMove={handleMagneticMouseMove}
                  onMouseLeave={handleMagneticMouseLeave}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative min-h-[44px] px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#0A1926] text-white shadow-md scale-102"
                      : "bg-white/80 hover:bg-white text-[#0A1926]/80 hover:text-[#0A1926] border border-slate-200/80 hover:border-[#00C8A0]/40 shadow-2xs hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-[#00C8A0] scale-125" : "bg-slate-300"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
