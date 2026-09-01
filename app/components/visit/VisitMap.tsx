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
      id="location-directions"
      className="bg-white text-[#0A1926] py-24 sm:py-32 relative z-10 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Location Details */}
          <div className="lg:col-span-4 text-left flex flex-col justify-start visit-map-anim">
            <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              LOCATION + DIRECTIONS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0A1926] leading-[1.08] tracking-tight mb-6">
              Find Us at<br />Bilaj Al Jazayer
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans mb-8">
              Bahrain Surf Park sits on the southwest coast of Bahrain at Bilaj Al Jazayer, easily accessible via major highways from Manama, the airport, and surrounding communities.
            </p>

            {/* Address Card */}
            <div className="bg-[#F7F6F1] border border-slate-200 rounded-2xl p-6 mb-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B7FB5]/10 flex items-center justify-center text-[#0B7FB5] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">ADDRESS</span>
                  <address className="not-italic text-sm sm:text-base font-bold text-[#0A1926] leading-relaxed">
                    Bahrain Surf Park<br />
                    Bilaj Al Jazayer<br />
                    Kingdom of Bahrain
                  </address>
                </div>
              </div>

              <div className="border-t border-slate-200/80 pt-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00C8A0]/10 flex items-center justify-center text-[#00C8A0] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">COORDINATES</span>
                  <span className="text-sm font-mono font-bold text-[#0A1926]">26.0125° N, 50.4850° E</span>
                </div>
              </div>

              <div className="border-t border-slate-200/80 pt-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#061C27]/10 flex items-center justify-center text-[#061C27] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">OPERATING HOURS</span>
                  <span className="text-sm font-bold text-[#0A1926]">Daily 7:00 AM — 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Directions CTAs */}
            <div className="flex flex-wrap gap-4 visit-map-anim">
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

              <button
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-[#0A1926] px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-sm cursor-pointer"
              >
                <span>GET DIRECTIONS</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Embedded Map */}
          <div className="visit-map-anim lg:col-span-8">
            <div className="relative w-full rounded-[24px] overflow-hidden border border-slate-300/80 shadow-[0_20px_50px_rgba(10,25,38,0.12)] bg-slate-100 group transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(10,25,38,0.18)]">
              {/* Map Header Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-[#0A1926]/95 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-white flex items-center gap-2.5 shadow-lg pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">
                  BILAJ AL JAZAYER <span className="text-[#00C8A0] ml-1">BAHRAIN</span>
                </span>
              </div>

              {/* Distance Badge */}
              <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200/80 px-4 py-2 rounded-xl text-slate-700 flex items-center gap-2 shadow-lg pointer-events-none">
                <svg className="w-4 h-4 text-[#00C8A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-xs font-bold text-[#0A1926]">~25 min from Manama</span>
              </div>

              {/* Map Iframe Container */}
              <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px]">
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

              {/* Map Controls Hint */}
              <div className="absolute bottom-4 left-4 right-4 z-10 px-4 pointer-events-none">
                <p className="text-center text-xs text-white/70 bg-[#0A1926]/60 backdrop-blur-sm px-3 py-2 rounded-full inline-block mx-auto">
                  Scroll to zoom • Drag to pan • Click for directions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}