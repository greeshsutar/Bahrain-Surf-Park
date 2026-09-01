"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

export default function Academy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".academy-home-anim",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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
      id="academy"
      className="bg-[#F8FAFC] text-[#0A1926] py-20 sm:py-24 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <span className="academy-home-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.22em] uppercase mb-3 block">
              SURF ACADEMY &amp; COACHING
            </span>

            <h2 className="academy-home-anim font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1926] tracking-tight leading-[1.1] mb-5">
              Master Every Wave with ISA-Certified Coaching
            </h2>

            <p className="academy-home-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-4">
              Whether taking your first pop-up in shallow water or perfecting high-speed turns on artificial reef points, our world-class instructors provide personalized video analysis and in-water guidance.
            </p>

            <p className="academy-home-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Structured progressive modules ensure rapid skill development for beginners, intermediate surfers, and advanced athletes alike.
            </p>

            <div className="academy-home-anim">
              <Link
                href="/academy"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#0A1926] text-white px-7 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md inline-flex items-center gap-2.5"
              >
                <span>LEARN MORE ABOUT OUR COACHING</span>
                <span className="text-sm font-normal">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Compact Coaching Photo */}
          <div className="lg:col-span-6">
            <div className="academy-home-anim relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[16/10] bg-[#0A1926]">
              <img
                src="/images/academy_coaching.jpg"
                alt="Bahrain Surf Park Academy Coaching"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                <span className="font-mono text-[#00C8A0] font-bold uppercase tracking-wider">ISA CERTIFIED INSTRUCTORS</span>
                <span className="font-sans text-white/80 font-medium">Group &amp; 1-on-1 Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
