"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

interface CabanasPrivateHavenProps {
  onOpenBooking: (tier?: string) => void;
}

export default function CabanasPrivateHaven({ onOpenBooking }: CabanasPrivateHavenProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, scale: 0.97, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
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

      gsap.fromTo(
        ".haven-text-anim",
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
      id="private-haven"
      className="bg-[#F7F6F1] text-[#0A1926] pt-24 sm:pt-32 pb-0 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Editorial Text Anchor (approx 38% width) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="haven-text-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              EXCLUSIVE SANCTUARY
            </span>

            <h2 className="haven-text-anim font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-6">
              A Place To<br />Call Your Own<span className="text-[#00C8A0]">.</span>
            </h2>

            <p className="haven-text-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Situated directly along the lagoon perimeter, our signature cabanas provide shaded lounge seating, climate control, dedicated butler service, and front-row seats to the world&apos;s most consistent waves.
            </p>

            <div className="haven-text-anim flex">
              <button
                onClick={() => onOpenBooking("VIP Cabana")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#063B45] text-white px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>RESERVE CABANA</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Editorial Photograph (approx 62% width) */}
          <div ref={imgRef} className="lg:col-span-7">
            <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-[28px] overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src="/images/cabanas/cabanas_private_haven.jpg"
                alt="Bahrain Surf Park Private Cabana Haven"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061C27]/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#00C8A0] bg-[#061C27]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
                  LAGOON-FRONT SANCTUARY
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Organic Wave Divider Transitioning into Deep Dark Ocean Experience Section */}
      <WaveDivider fill="#061C27" />
    </section>
  );
}
