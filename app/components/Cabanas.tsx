"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

export default function Cabanas() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const reduced = isReducedMotion();

    if (!reduced) {
      const animElements = section.querySelectorAll(".cabanas-animate");
      gsap.fromTo(
        animElements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          stagger: MOTION.STAGGER,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      const animElements = section.querySelectorAll(".cabanas-animate");
      gsap.set(animElements, { opacity: 1, y: 0 });
    }

    return () => {
      ScrollTrigger.getAll().filter((st) => st.trigger === section).forEach((st) => st.kill());
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cabanas"
      className="bg-white py-16 sm:py-24 relative z-10 overflow-hidden border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            {/* Typographic Eyebrow */}
            <span className="cabanas-animate text-[#0B7FB5] text-xs font-extrabold tracking-[0.2em] uppercase mb-4 block">
              BEYOND THE WAVES
            </span>
            {/* Headline (Playfair Display) */}
            <h2 className="cabanas-animate font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#0A1926] leading-[1.14] tracking-tight mb-6">
              Beachside Cabanas & Coastal Dining
            </h2>
            {/* Intro copy */}
            <p className="cabanas-animate text-[#0A1926]/80 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Experience the complete island escape. Settle into our private luxury cabanas or enjoy premium beachside dining, crafted to provide the ultimate relaxation off the board.
            </p>
            
            {/* Action Button */}
            <div className="cabanas-animate flex">
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#0077B6] text-white px-8 py-4 rounded-lg text-xs font-extrabold uppercase tracking-widest transition-all inline-flex items-center gap-2.5 cursor-pointer shadow-md"
              >
                <span>RESERVE AN EXPERIENCE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Asymmetric Luxury Image Diptych */}
          <div className="lg:col-span-7 relative flex items-center justify-center gap-6">
            
            {/* Cabana Lounging Photo Container */}
            <div className="cabanas-animate w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-[#F1F5F9] relative group">
              <img
                src="/images/cabanas.jpg"
                alt="Beachside Luxury Cabanas"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">
                  PRIVATE HAVEN
                </span>
                <span className="font-serif text-sm sm:text-base font-bold leading-tight block">
                  Beachside Cabana Lounging
                </span>
              </div>
            </div>

            {/* Coastal Dining Photo Container */}
            <div className="cabanas-animate w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-[#F1F5F9] relative group mt-12">
              <img
                src="/images/dining.jpg"
                alt="Coastal Dining & Resort Lounge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">
                  CULINARY ESCAPE
                </span>
                <span className="font-serif text-sm sm:text-base font-bold leading-tight block">
                  Coastal Lagoon Dining
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
