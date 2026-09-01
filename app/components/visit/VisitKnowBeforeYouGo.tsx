"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const CHECKLIST_ITEMS = [
  "Session booked and confirmed",
  "Arrival time noted (45 minutes before session)",
  "Swimwear, towel, and sun protection packed",
  "Directions to Bilaj Al Jazayer saved",
  "Parking or valet plan confirmed",
  "Weather-appropriate layers for evening",
  "Questions? Contact Guest Services",
];

export default function VisitKnowBeforeYouGo() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-know-anim",
        { opacity: 0, y: 30 },
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

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.02 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="know-before-you-go"
      className="relative w-full min-h-[55vh] sm:min-h-[65vh] lg:min-h-[70vh] flex items-center bg-[#02141C] text-white overflow-hidden z-10"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform"
        style={{ backgroundImage: "url('/images/bahrain_surf_park_clean.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/40 to-[#02141C]/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Editorial Statement */}
          <div className="lg:col-span-6 text-left visit-know-anim">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-4 block">
              BEFORE YOU GO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.05] mb-8">
              KNOW THE DAY.<br />ENJOY THE RIDE.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed max-w-xl">
              A smooth arrival means more time in the water. Review the essentials below so nothing stands between you and your session.
            </p>
          </div>

          {/* RIGHT: Checklist */}
          <div className="lg:col-span-6 text-left visit-know-anim">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00C8A0] block mb-4">
                PRE-ARRIVAL CHECKLIST
              </span>
              <ul className="space-y-3">
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-slate-200 font-sans leading-relaxed group">
                    <div className="relative shrink-0 w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-has-[:checked]:bg-[#00C8A0] group-has-[:checked]:border-[#00C8A0] transition-all duration-300">
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id={`checklist-${idx}`}
                      />
                      <svg
                        className="w-3.5 h-3.5 text-white opacity-0 group-has-[:checked]:opacity-100 transition-opacity duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <label htmlFor={`checklist-${idx}`} className="cursor-pointer select-none">
                      {item}
                    </label>
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