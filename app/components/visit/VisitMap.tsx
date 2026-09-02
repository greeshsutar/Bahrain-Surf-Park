"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

export default function VisitMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Map Container Parallax Scrub
      if (mapParallaxRef.current) {
        gsap.to(mapParallaxRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Scroll Reveal Stagger
      gsap.fromTo(
        ".visit-map-anim",
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
      id="wayfinding-map"
      className="relative bg-gradient-to-b from-[#061C27] via-[#02141C] to-[#0A1926] text-white py-24 sm:py-32 z-10 overflow-hidden"
    >
      {/* Soft Ambient Radial Scrims */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C8A0]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#0B7FB5]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-left mb-12 visit-map-anim max-w-2xl">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            06 — FIND YOUR WAY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            BILAJ AL JAZAYER, BAHRAIN.
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans">
            Positioned on the southwest coast of the Kingdom of Bahrain. Navigate live directions or explore our resort coordinates before your journey.
          </p>
        </div>

        {/* Substantial Map Visual Component with Parallax Scrub (~65vh desktop height) */}
        <div
          ref={mapParallaxRef}
          className="visit-map-anim relative w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#02141C] group transition-all duration-500 hover:border-[#00C8A0]/40 hover:shadow-[0_25px_60px_rgba(0,200,160,0.15)]"
        >
          {/* Top Floating Badge Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="bg-[#0A1926]/90 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-white flex items-center gap-2.5 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">
                BILAJ AL JAZAYER <span className="text-[#00C8A0] ml-1">• BAHRAIN SURF PARK</span>
              </span>
            </div>

            <div className="bg-[#0A1926]/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white flex items-center gap-2 shadow-lg">
              <svg className="w-4 h-4 text-[#00C8A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-bold text-slate-200">~30 min from Manama</span>
            </div>
          </div>

          {/* Map Embed Window (60vh - 68vh height range) */}
          <div className="w-full h-[52vh] sm:h-[60vh] lg:h-[68vh] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.569472110017!2d50.4605294!3d25.9821565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e484d10ac4af0ed%3A0x1ed725240b2dec62!2sBahrain%20Surf%20Park!5e0!3m2!1sen!2sin!4v1788188275602!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Bahrain Surf Park Location Map"
              className="w-full h-full grayscale-[0.2] contrast-[1.05] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0A1926]/95 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl group-hover:border-[#00C8A0]/40 transition-colors">
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-0.5">
                COORDINATES & ADDRESS
              </span>
              <p className="text-xs sm:text-sm font-bold text-white">
                Bahrain Surf Park, Bilaj Al Jazayer, Kingdom of Bahrain (26.0125° N, 50.4850° E)
              </p>
            </div>

            <button
              onClick={handleGetDirections}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="w-full sm:w-auto bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] text-xs font-extrabold px-6 py-3.5 rounded-xl uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:shadow-[#00C8A0]/30 flex items-center justify-center gap-2 shrink-0 cursor-pointer hover:-translate-y-0.5"
            >
              <span>GET DIRECTIONS</span>
              <span className="text-sm font-normal">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}