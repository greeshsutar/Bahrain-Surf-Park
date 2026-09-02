"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../../constants/motion";

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
  const containerRef = useRef<HTMLElement>(null);
  const photoParallaxRef = useRef<HTMLDivElement>(null);

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
        // Photo Parallax Scrub
        if (photoParallaxRef.current) {
          gsap.to(photoParallaxRef.current, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Entrance Stagger
        gsap.fromTo(
          ".coast-anim",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
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
      id="arrive-at-coast"
      className="relative bg-gradient-to-b from-[#F7F6F1] via-[#FAF9F5] to-white text-[#0A1926] pt-20 sm:pt-28 pb-16 z-20 overflow-hidden"
    >
      {/* Background Texture & Ambient Glow */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#0A1926_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00C8A0]/8 blur-[140px] rounded-full pointer-events-none" />

      {/* 02 — ARRIVE AT THE COAST Editorial Introduction */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Dominant Editorial Photography (Occupying ~65% of viewport on desktop) */}
          <div className="lg:col-span-8 coast-anim">
            <div
              ref={photoParallaxRef}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-[#0A1926] border border-slate-200/80 group"
            >
              <img
                src="/images/bahrain_surf_park_clean.jpg"
                alt="Bahrain Surf Park Coastline Bilaj Al Jazayer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 flex items-baseline justify-between text-white">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#00C8A0] block mb-1">
                    DESTINATION AT A GLANCE
                  </span>
                  <p className="font-serif text-lg sm:text-2xl font-bold">
                    Bilaj Al Jazayer, Kingdom of Bahrain
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Asymmetric Typography Panel (~35% width) */}
          <div className="lg:col-span-4 text-left flex flex-col justify-center coast-anim">
            <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              02 — PLAN YOUR ARRIVAL
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A1926] leading-[1.02] tracking-tight mb-6">
              ARRIVE AT<br />THE COAST.
            </h2>

            <div className="border-l-2 border-[#00C8A0] pl-5 mb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B7FB5] block mb-0.5">
                LOCATION
              </span>
              <p className="font-serif text-lg font-bold text-[#0A1926]">
                BILAJ AL JAZAYER, BAHRAIN
              </p>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              From your journey across the island to checking in at the Guest Portal, here is your essential guide to navigating Bahrain Surf Park effortlessly.
            </p>
          </div>

        </div>
      </div>

      {/* 03 — ARRIVAL GUIDE INDEX (Magazine-Style Index Nav with Thin Rules) */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-y border-slate-200/90 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#0B7FB5] shrink-0 hidden md:inline-block">
            ARRIVAL INDEX —
          </span>

          <nav className="flex items-center gap-6 lg:gap-8 shrink-0 min-w-max" aria-label="Arrival guide index navigation">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative py-2 text-xs font-extrabold uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive ? "text-[#0A1926]" : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? "bg-[#00C8A0] scale-125" : "bg-transparent opacity-0 group-hover:opacity-50"}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C8A0] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
