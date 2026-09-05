"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

const GUIDELINES = [
  {
    id: "what-to-bring",
    num: "01",
    eyebrow: "EQUIPMENT & APPAREL",
    title: "WHAT TO BRING",
    paragraph: "Proper swimwear (boardshorts, swimsuits, or rashguards), a fresh towel, reef-safe sunscreen, and dry clothes for after your session. Soft-top surfboards and personal lockers are provided for all guests.",
    meta: "PROVIDED: Surfboard, Locker, Suite Access",
    image: "/images/know.png",
    alt: "Surfboard equipment and gear fitting at Bahrain Surf Park",
  },
  {
    id: "safety",
    num: "02",
    eyebrow: "COACHING & MONITORING",
    title: "SAFETY & WATER RULES",
    paragraph: "All sessions operate under continuous supervision from ISA-certified surf coaches and professional ocean lifeguards. Guests undergo a mandatory lagoon safety overview before entering the wave basin.",
    meta: "SUPERVISION: ISA Coaches & Ocean Lifeguards",
    image: "/images/safety.png",
    alt: "ISA certified surf coach and ocean lifeguard safety supervision",
  },
  {
    id: "arrival",
    num: "03",
    eyebrow: "TIMING & CHECK-IN",
    title: "ARRIVAL PROCEDURES",
    paragraph: "Arrive 45 minutes prior to your scheduled water time. This allows ample time for guest check-in, wetsuit or gear fitting, locker setup, and the mandatory pre-session safety briefing.",
    meta: "CHECK-IN: 45 Minutes Prior to Session",
    image: "/images/arrive.png",
    alt: "Bahrain Surf Park guest reception and check-in lobby",
  },
  {
    id: "facilities",
    num: "04",
    eyebrow: "RESORT AMENITIES",
    title: "FACILITIES & GUEST SPACES",
    paragraph: "Enjoy private changing suites, hot freshwater showers, secure personal lockers, spectator viewing decks, and beachside lounge dining facing the wave lagoon.",
    meta: "AMENITIES: Changing Suites, Showers, Lounge",
    image: "/images/accesibilty.png",
    alt: "Private changing suites and spectator viewing deck",
  },
  {
    id: "accessibility",
    num: "05",
    eyebrow: "INCLUSIVE EXPERIENCE",
    title: "ACCESSIBILITY & ADAPTIVE SERVICES",
    paragraph: "Wheelchair-accessible pathways seamlessly connect guest parking, reception, changing suites, viewing decks, and lagoon access points. Adaptive surf programs are available with advance notice.",
    meta: "ACCESSIBLE: Barrier-Free Pathways & Restrooms",
    image: "/images/accesicibiltys.png",
    alt: "Barrier-free accessible resort pathways and lagoon access",
  },
];

export default function VisitKnowBeforeYouGo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".know-anim",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: 0.1,
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

  const handleItemHover = (index: number) => {
    if (index === activeIndex || isCrossfading) return;
    setActiveIndex(index);

    if (imageRef.current && !isReducedMotion()) {
      setIsCrossfading(true);
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setDisplayedIndex(index);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 1.03 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.38,
              ease: "power2.out",
              onComplete: () => setIsCrossfading(false),
            }
          );
        },
      });
    } else {
      setDisplayedIndex(index);
    }
  };

  const activeGuideline = GUIDELINES[activeIndex];
  const displayedGuideline = GUIDELINES[displayedIndex];

  return (
    <section
      ref={sectionRef}
      id="know-before-you-go"
      className="relative bg-white text-[#0A1926] pt-24 sm:pt-32 pb-24 z-10 overflow-hidden"
    >
      {/* Background Texture & Soft Ambient Glow */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#0A1926_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00C8A0]/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="know-anim mb-16 max-w-2xl text-left">
          <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            05 — ARRIVAL GUIDE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0A1926] leading-[1.05] tracking-tight mb-4">
            KNOW BEFORE YOU GO.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-sans leading-relaxed">
            Hover or select a topic to explore essential guidelines for your visit to Bilaj Al Jazayer.
          </p>
        </div>

        {/* 2-Column Editorial Interactive Experience (No vertical cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Vertical List with Card Lift & Teal Accent Bar (~55% width) */}
          <div className="lg:col-span-7 text-left space-y-3 know-anim">
            {GUIDELINES.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  onMouseEnter={() => handleItemHover(idx)}
                  onClick={() => handleItemHover(idx)}
                  className={`relative py-6 pl-7 pr-5 sm:pr-7 cursor-pointer transition-all duration-300 ease-out group rounded-2xl border overflow-hidden ${
                    isActive
                      ? "bg-white shadow-xl shadow-slate-900/8 -translate-y-1 border-slate-200"
                      : "bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-slate-900/6 hover:-translate-y-1 border-slate-200/60 hover:border-slate-200"
                  }`}
                >
                  {/* Teal accent bar — grows in on hover/active */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-[#00C8A0] transition-transform duration-300 ease-out origin-top ${
                      isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    }`}
                  />

                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold transition-colors ${isActive ? "text-[#00C8A0]" : "text-slate-400"}`}>
                        {item.num}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${isActive ? "text-[#0B7FB5]" : "text-slate-400"}`}>
                        {item.eyebrow}
                      </span>
                    </div>
                    <span className={`text-sm font-bold transition-all ${isActive ? "text-[#00C8A0] translate-x-1" : "text-slate-300 group-hover:text-slate-500"}`}>
                      →
                    </span>
                  </div>

                  <h3 className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${
                    isActive ? "text-[#0A1926]" : "text-slate-700 group-hover:text-[#0A1926]"
                  }`}>
                    {item.title}
                  </h3>

                  {isActive && (
                    <div className="mt-3 space-y-3 pt-1 animate-fadeIn">
                      <p className="text-slate-600 text-sm leading-relaxed font-sans max-w-xl">
                        {item.paragraph}
                      </p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0B7FB5] bg-[#0B7FB5]/10 border border-[#0B7FB5]/20 px-3 py-1 rounded-md">
                        {item.meta}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Large Contextual Crossfading Image Frame (~45% width) */}
          <div className="lg:col-span-5 sticky top-28 know-anim">
            <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#0A1926] border border-slate-200 group">
              <img
                ref={imageRef}
                src={displayedGuideline.image}
                alt={displayedGuideline.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926]/85 via-transparent to-transparent pointer-events-none" />

              {/* Contextual Image Label Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 text-[#0A1926] shadow-xl">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">
                  {displayedGuideline.num} — {displayedGuideline.eyebrow}
                </span>
                <p className="text-sm font-serif font-bold">
                  {displayedGuideline.title}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave Divider Transitioning into Dark Map Section (#061C27) */}
      <div className="mt-24">
        <WaveDivider fill="#061C27" />
      </div>
    </section>
  );
}