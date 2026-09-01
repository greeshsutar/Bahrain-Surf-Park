"use client";

import { useEffect, useRef } from "react";
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
  },
  {
    id: "safety",
    num: "02",
    eyebrow: "COACHING & MONITORING",
    title: "SAFETY & WATER RULES",
    paragraph: "All sessions operate under continuous supervision from ISA-certified surf coaches and professional ocean lifeguards. Guests undergo a mandatory lagoon safety overview before entering the wave basin.",
    meta: "SUPERVISION: ISA Coaches & Ocean Lifeguards",
  },
  {
    id: "arrival",
    num: "03",
    eyebrow: "TIMING & CHECK-IN",
    title: "ARRIVAL PROCEDURES",
    paragraph: "Arrive 45 minutes prior to your scheduled water time. This allows ample time for guest check-in, wetsuit or gear fitting, locker setup, and the mandatory pre-session safety briefing.",
    meta: "CHECK-IN: 45 Minutes Prior to Session",
  },
  {
    id: "facilities",
    num: "04",
    eyebrow: "RESORT AMENITIES",
    title: "FACILITIES & GUEST SPACES",
    paragraph: "Enjoy private changing suites, hot freshwater showers, secure personal lockers, spectator viewing decks, and beachside lounge dining facing the wave lagoon.",
    meta: "AMENITIES: Changing Suites, Showers, Lounge",
  },
  {
    id: "accessibility",
    num: "05",
    eyebrow: "INCLUSIVE EXPERIENCE",
    title: "ACCESSIBILITY & ADAPTIVE SERVICES",
    paragraph: "Wheelchair-accessible pathways seamlessly connect guest parking, reception, changing suites, viewing decks, and lagoon access points. Adaptive surf programs are available with advance notice.",
    meta: "ACCESSIBLE: Barrier-Free Pathways & Restrooms",
  },
];

export default function VisitKnowBeforeYouGo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".know-item-anim",
        { opacity: 0, y: 24 },
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

  return (
    <section
      ref={sectionRef}
      id="know-before-you-go"
      className="relative bg-gradient-to-b from-[#F7F6F1] via-white to-[#F7F6F1] text-[#0A1926] pt-24 sm:pt-32 pb-24 relative z-10 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle Background Texture & Radial Ambient Glow */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#0A1926_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00C8A0]/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-left relative z-10">
        {/* Section Header */}
        <div className="know-item-anim mb-16 max-w-2xl">
          <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            04 — ARRIVAL GUIDE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0A1926] leading-[1.05] tracking-tight mb-4">
            KNOW BEFORE YOU GO.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-sans leading-relaxed">
            Essential preparation points to ensure your day at Bahrain Surf Park is smooth from arrival to paddle-out.
          </p>
        </div>

        {/* Thin Divider List Layout with lift + shadow hover cards */}
        <div className="space-y-4">
          {GUIDELINES.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="know-item-anim bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#00C8A0]/40 p-6 sm:p-8 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                {/* Left metadata / number */}
                <div className="md:col-span-3 flex flex-col justify-start">
                  <span className="font-mono text-xs font-bold text-[#00C8A0] mb-1">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                    {item.eyebrow}
                  </span>
                </div>

                {/* Right content */}
                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1926] mb-3 group-hover:text-[#0B7FB5] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-4 max-w-2xl">
                    {item.paragraph}
                  </p>

                  <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-[#F7F6F1] border border-slate-200/90 px-3.5 py-1.5 rounded-lg shadow-2xs group-hover:border-[#00C8A0]/30 transition-colors">
                    {item.meta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Divider Transition into Dark Map Section (#061C27) */}
      <div className="mt-20">
        <WaveDivider fill="#061C27" />
      </div>
    </section>
  );
}