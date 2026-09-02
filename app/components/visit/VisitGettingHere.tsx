"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

export default function VisitGettingHere() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Photo Parallax
      if (photoParallaxRef.current) {
        gsap.to(photoParallaxRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Entrance Stagger
      gsap.fromTo(
        ".getting-anim",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: MOTION.STAGGER,
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

  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/qcxXGozrQb9vLgnX8", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      id="getting-here"
      className="relative bg-gradient-to-b from-white via-[#F7F6F1]/60 to-white text-[#0A1926] py-20 sm:py-28 z-10 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0B7FB5]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Dominant Photography (~58% width) */}
          <div className="lg:col-span-7 getting-anim">
            <div
              ref={photoParallaxRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0A1926] aspect-[4/3] sm:aspect-[16/10] group"
            >
              <img
                src="/images/bahrain_surf_park_clean.jpg"
                alt="Bahrain Surf Park Bilaj Al Jazayer Coastline"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1926]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 text-[#0A1926] shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5] block mb-1">
                  DESTINATION LOCATION
                </span>
                <p className="text-sm font-serif font-bold">
                  Bilaj Al Jazayer — Southwest Coast, Kingdom of Bahrain
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Information (~42% width) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <span className="getting-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              04 — GETTING HERE
            </span>

            <h2 className="getting-anim font-serif text-3xl sm:text-5xl font-bold text-[#0A1926] leading-[1.05] tracking-tight mb-6">
              GETTING HERE.
            </h2>

            <div className="getting-anim border-l-2 border-[#00C8A0] pl-5 mb-8">
              <p className="font-serif text-lg sm:text-xl font-bold text-[#0A1926] mb-1">
                BAHRAIN SURF PARK
              </p>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Bilaj Al Jazayer<br />
                Southwest Coast<br />
                Kingdom of Bahrain
              </p>
            </div>

            <p className="getting-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Located at Bilaj Al Jazayer on Bahrain's pristine southwest coastline, the park is approximately 30 minutes from Manama city center. Accessible directly via Sheikh Isa Bin Salman Highway with clear directional signage to the resort entrance.
            </p>

            {/* Parking Details (No heavy cards) */}
            <div id="parking-access" className="getting-anim border-t border-b border-slate-200/90 py-5 mb-8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                  PARKING & ARRIVAL ACCESS
                </span>
                <span className="text-[10px] font-bold text-[#00C8A0] bg-[#00C8A0]/10 px-2.5 py-0.5 rounded">
                  ON-SITE PARKING
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Dedicated visitor parking is available directly adjacent to the main Guest Reception building. Designated accessible parking spaces are positioned nearest to the main entrance lobby.
              </p>
            </div>

            <div className="getting-anim flex flex-wrap gap-4">
              <button
                onClick={handleGetDirections}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#0A1926] text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5"
              >
                <span>GET DIRECTIONS</span>
                <span className="text-sm font-normal">→</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
