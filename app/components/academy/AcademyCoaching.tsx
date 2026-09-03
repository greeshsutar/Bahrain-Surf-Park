"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

interface AcademyCoachingProps {
  onOpenBooking: (tier?: string) => void;
}

export default function AcademyCoaching({ onOpenBooking }: AcademyCoachingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Image scale reveal (0.97 -> 1)
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: MOTION.ENTRANCE_DURATION,
            ease: MOTION.ENTRANCE_EASE,
            scrollTrigger: {
              trigger: imgRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Text items reveal
      gsap.fromTo(
        ".coaching-text-anim",
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

  return (
    <section
      ref={sectionRef}
      id="coaching-experience"
      className="bg-[#F7F6F1] text-[#0A1926] py-16 sm:py-20 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Large Coaching Image (58% width) */}
          <div ref={imgRef} className="lg:col-span-7">
            <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-[26px] overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src="/images/academy_coaching.jpg"
                alt="ISA Certified Surf Coaching at Bahrain Surf Park"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C27]/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#00C8A0] bg-[#061C27]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
                  ISA-CERTIFIED MASTER COACHING
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Human Coaching Narrative (42% width) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <span className="coaching-text-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              ISA-CERTIFIED INSTRUCTORS
            </span>

            <h2 className="coaching-text-anim font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-6">
              Coaching That<br />Meets You Where<br />You Are.
            </h2>

            <p className="coaching-text-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Surfing is equal parts technique, timing, and confidence. Our team of ISA-certified instructors provides personalized in-water guidance and structured feedback tailored to your individual goals.
            </p>

            {/* 2 Key Feature Specs */}
            <div className="coaching-text-anim bg-white border border-slate-200 rounded-2xl p-6 mb-8 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B7FB5]/10 flex items-center justify-center text-[#0B7FB5] shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">IN-WATER ASSISTANCE</span>
                  <span className="text-xs sm:text-sm font-bold text-[#0A1926]">ISA-Certified Master Coaches</span>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Direct in-water positioning, push-in assistance for beginners, and safety orientation.</p>
                </div>
              </div>

              <div className="border-t border-slate-200/80 pt-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00C8A0]/10 flex items-center justify-center text-[#00C8A0] shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">VIDEO ANALYTICS</span>
                  <span className="text-xs sm:text-sm font-bold text-[#0A1926]">Multi-Angle Frame Review</span>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">High-definition video review to break down stance, rail engagement, and turn mechanics.</p>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="coaching-text-anim">
              <button
                onClick={() => onOpenBooking("PRIVATE COACHING")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="inline-flex items-center gap-2.5 bg-[#0B7FB5] hover:bg-[#063B45] text-white px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md cursor-pointer"
              >
                <span>BOOK PRIVATE COACHING</span>
                <span className="text-sm font-normal">→</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
