"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../../constants/motion";

export default function VisitMap() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-map-anim",
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
      id="find-us"
      className="bg-white text-[#0A1926] py-24 sm:py-32 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Location Details (approx 38% width) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <span className="visit-map-anim text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              FIND YOUR WAY HERE
            </span>

            <h2 className="visit-map-anim font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-6">
              Bilaj Al Jazayer,<br />Bahrain
            </h2>

            <p className="visit-map-anim text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Bahrain Surf Park is conveniently situated on the southwest coast of Bahrain at Bilaj Al Jazayer, easily accessible via major highways from Manama and Bahrain International Airport.
            </p>

            {/* Coordinates & Physical Address */}
            <div className="visit-map-anim bg-[#F7F6F1] border border-slate-200 rounded-2xl p-6 mb-8 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B7FB5]/10 flex items-center justify-center text-[#0B7FB5] shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">LOCATION</span>
                  <span className="text-xs sm:text-sm font-bold text-[#0A1926]">Bilaj Al Jazayer, Kingdom of Bahrain</span>
                </div>
              </div>

              <div className="border-t border-slate-200/80 pt-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00C8A0]/10 flex items-center justify-center text-[#00C8A0] shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-0.5">COORDINATES</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#0A1926]">26.0125° N, 50.4850° E</span>
                </div>
              </div>
            </div>

            {/* External Google Maps Button */}
            <div className="visit-map-anim">
              <a
                href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="inline-flex items-center gap-2.5 bg-[#0B7FB5] hover:bg-[#063B45] text-white px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md cursor-pointer"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <span className="text-sm font-normal">↗</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Embedded Google Map (approx 62% width) */}
          <div className="visit-map-anim lg:col-span-7">
            <div className="relative w-full rounded-[24px] overflow-hidden border border-slate-300/80 shadow-[0_20px_50px_rgba(10,25,38,0.12)] bg-slate-100 group transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(10,25,38,0.18)]">
              
              {/* Top Map Header Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-[#0A1926]/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white flex items-center gap-2.5 shadow-lg pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">
                  BILAJ AL JAZAYER <span className="text-[#00C8A0] ml-1">BAHRAIN</span>
                </span>
              </div>

              {/* Map Iframe Container */}
              <div className="w-full h-[380px] sm:h-[450px] lg:h-[540px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.569472110017!2d50.4605294!3d25.9821565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e484d10ac4af0ed%3A0x1ed725240b2dec62!2sBahrain%20Surf%20Park!5e0!3m2!1sen!2sin!4v1788188275602!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Bahrain Surf Park Location Map"
                  className="w-full h-full"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
