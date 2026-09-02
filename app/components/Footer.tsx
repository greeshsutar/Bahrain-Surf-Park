"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";
import WaveDivider from "./WaveDivider";

interface FooterProps {
  onOpenBooking?: (tier?: string) => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const footer = footerRef.current;
    if (!footer) return;

    const reduced = isReducedMotion();

    if (!reduced) {
      const animElements = footer.querySelectorAll(".footer-animate");
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
            trigger: footer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      const animElements = footer.querySelectorAll(".footer-animate");
      gsap.set(animElements, { opacity: 1, y: 0 });
    }

    return () => {
      ScrollTrigger.getAll().filter((st) => st.trigger === footer).forEach((st) => st.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#0A1926] text-white pt-16 sm:pt-20 pb-12 relative z-10 font-sans mt-20 sm:mt-28"
    >
      {/* Signature Continuous Wave Divider Header before Footer for all pages */}
      <WaveDivider
        fill="#0A1926"
        showGreenScrollLine={true}
        className="!top-0 !bottom-auto -translate-y-[99%]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* 1. Bold Closing Statement Header Banner */}
        <div className="footer-animate border-b border-white/10 pb-16 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
          <div className="max-w-2xl">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.2em] uppercase mb-3 block">
              THE NEXT CHAPTER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-4">
              Your Wave Is Waiting.
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
              Where world-class technology meets the spirit of island living on the coast of Bahrain. Join us as we redefine coastal surf culture.
            </p>
          </div>

          <div className="shrink-0 flex">
            <button
              onClick={() => onOpenBooking?.()}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-gradient-to-r from-[#00C8A0] to-[#0B7FB5] hover:opacity-95 text-white px-8 py-4 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-xl transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span>BOOK YOUR SESSION</span>
              <span className="text-sm font-normal">→</span>
            </button>
          </div>
        </div>

        {/* 2. 4-Column Sitemap & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 text-left">
          
          {/* Column 1: Brand, Location & Live Detail */}
          <div className="footer-animate lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Link href="/">
                  <img
                    src="/images/logo.png"
                    alt="Bahrain Surf Park"
                    className="h-11 sm:h-12 w-auto object-contain cursor-pointer"
                  />
                </Link>
                <span className="text-white font-bold tracking-wider uppercase text-xs">
                  Bahrain Surf Park
                </span>
              </div>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm font-sans">
                The world&apos;s most advanced wave technology meeting the spirit of island living in the heart of Bahrain.
              </p>

              {/* Official Google Maps Location Link */}
              <a
                href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/80 hover:text-[#00C8A0] transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <svg className="w-4 h-4 text-[#00C8A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Bilaj Al Jazayer, Kingdom of Bahrain</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>

            {/* Living Live Status Pulse Badge */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse shrink-0"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                Live in Bilaj Al Jazayer
              </span>
            </div>
          </div>

          {/* Column 2: Explore Navigation Links */}
          <div className="footer-animate lg:col-span-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00C8A0] block mb-4">
              EXPLORE
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-white/80">
              <li>
                <Link href="/surf" className="hover:text-[#00C8A0] transition-colors block py-0.5">
                  Surf
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-[#00C8A0] transition-colors block py-0.5">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/find-your-wave" className="hover:text-[#00C8A0] transition-colors block py-0.5">
                  The Wave
                </Link>
              </li>
              <li>
                <Link href="/academy" className="hover:text-[#00C8A0] transition-colors block py-0.5">
                  Academy
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00C8A0] transition-colors block py-0.5">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/cabanas" className="hover:text-[#00C8A0] transition-colors block py-0.5">
                  Cabanas
                </Link>
              </li>
              <li>
                <Link href="/visit" className="hover:text-[#00C8A0] transition-colors block py-0.5">
                  Plan Your Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Visit Details & Opening Badge */}
          <div className="footer-animate lg:col-span-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00C8A0] block mb-4">
              VISIT
            </span>
            <div className="space-y-3 text-xs text-white/75 font-sans leading-relaxed">
              <p>
                <strong className="text-white block font-bold mb-0.5">Destination</strong>
                Bilaj Al Jazayer, Southwest Coast, Kingdom of Bahrain
              </p>

              <p>
                <strong className="text-white block font-bold mb-0.5">Operating Hours</strong>
                Open Daily from 7:00 AM to 10:00 PM
              </p>

              {/* Opening 2026 Badge */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-[#00C8A0]/15 border border-[#00C8A0]/40 text-[#00C8A0] text-[11px] font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse"></span>
                  <span>Opening 2026</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Connected & Magnetic Social Icons */}
          <div className="footer-animate lg:col-span-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00C8A0] block mb-4">
              STAY CONNECTED
            </span>
            <p className="text-xs text-white/75 leading-relaxed mb-4">
              Receive early access updates and exclusive session booking invitations.
            </p>

            {/* Newsletter Email Form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#082F3D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C8A0] transition-colors w-full"
              />
              <button
                type="submit"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#00C8A0] hover:bg-[#00E5B3] text-[#061F2B] px-4 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                GET EARLY ACCESS
              </button>
            </form>

            {/* Magnetic Social Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061F2B] text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061F2B] text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X (Twitter)"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061F2B] text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* 3. Bottom Bar: Copyright & Stakeholder Partners Row */}
        <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
          <div>
            <span>&copy; 2026 Bahrain Surf Park. All Rights Reserved.</span>
          </div>

          {/* Stakeholder & Partner Logos Row per Spec Section 6 */}
          {/* NOTE: Replace text wordmarks with official vector/raster logo assets in /public/images/partners/ when available */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40">
              DEVELOPMENT & TECHNOLOGY PARTNERS
            </span>
            <div className="flex items-center gap-4 sm:gap-6 text-white/75 font-serif tracking-widest text-[11px] uppercase font-bold">
              <span className="hover:text-[#00C8A0] transition-colors cursor-default">EDAMAH</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-[#00C8A0] transition-colors cursor-default">GFH FINANCIAL GROUP</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-[#00C8A0] transition-colors cursor-default">WAVEGARDEN</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
