"use client";

import Link from "next/link";
import { useBooking } from "../context/BookingContext";

export default function ServicesPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="bg-[#061C27] text-white pt-28 pb-24 min-h-screen relative z-10 overflow-hidden">
      {/* Subtle Atmospheric Topographic Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" stroke="#00C8A0" strokeWidth="1">
          <path d="M-100,100 C200,80 400,250 800,200 C1200,150 1400,300 1600,250" />
          <path d="M-100,300 C180,250 380,450 780,380 C1180,310 1380,480 1600,430" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            PARK AMENITIES & ECOSYSTEM
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-6">
            Services & Facilities
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
            From world-class Wavegarden Cove surf sessions and ISA coaching to private event hosting, boutique surf retail, and oceanfront wellness — explore the complete Bahrain Surf Park lifestyle.
          </p>
        </div>

        {/* 6-Card Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Tile 1: The Surf Lagoon (Teaser -> /technology) [Span 7] */}
          <div className="md:col-span-7 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#00C8A0]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                  FACILITY 01 · WAVE ENGINE
                </span>
                <span className="text-xs font-mono text-white/50">52 MODULES</span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#00C8A0] transition-colors">
                The Surf Lagoon
              </h2>
              
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-lg mb-8">
                Powered by a 52-module Wavegarden Cove generator producing up to 1,000 ocean-grade waves per hour. Controlled height, speed, and shape calibrated for all skill levels.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <span className="text-xs font-bold text-[#00C8A0]">1,000 Waves / Hour</span>
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00C8A0] transition-colors"
              >
                <span>EXPLORE TECHNOLOGY</span>
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Tile 2: Club Hawaii Surf Academy (Teaser -> /academy) [Span 5] */}
          <div className="md:col-span-5 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                  FACILITY 02 · COACHING
                </span>
                <span className="text-xs font-mono text-white/50">ISA CERTIFIED</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#00C8A0] transition-colors">
                Club Hawaii Surf Academy
              </h2>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-8">
                World-class instruction offering beginner lessons, high-performance video analysis, private coaching, and youth surf clinics.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <span className="text-xs font-bold text-[#0B7FB5]">All Skill Levels</span>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00C8A0] transition-colors"
              >
                <span>EXPLORE ACADEMY</span>
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Tile 3: Terraces & Dining (Teaser -> /cabanas) [Span 4] */}
          <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                  FACILITY 03 · HOSPITALITY
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Terraces & Dining
              </h2>

              <p className="text-white/80 text-xs leading-relaxed mb-6">
                Private luxury cabanas, oceanfront lounge seating, and curated island-inspired food & beverage menus overlooking the lagoon.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#00C8A0]">VIP Cabanas</span>
              <Link
                href="/cabanas"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00C8A0] transition-colors"
              >
                <span>VIEW CABANAS</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Tile 4: Private Events & Competitions (Real New Content) [Span 4] */}
          <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                  FACILITY 04 · EVENTS & RETREATS
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Events & Competitions
              </h2>

              <p className="text-white/80 text-xs leading-relaxed mb-6">
                Full park venue hire for corporate functions, brand launches, private group sessions, and national or international surf competitions.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0B7FB5]">Private Venue Hire</span>
              <button
                onClick={() => onOpenBooking("Private Group")}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00C8A0] hover:text-white transition-colors cursor-pointer"
              >
                <span>INQUIRE NOW</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Tile 5: Retail & Surf Gear Shop (Real New Content) [Span 4] */}
          <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                  FACILITY 05 · SURF SHOP & RENTALS
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Retail & Demo Fleet
              </h2>

              <p className="text-white/80 text-xs leading-relaxed mb-6">
                Pro surf shop featuring premium shortboards, longboards, wetsuits, zinc, hardware, and official Bahrain Surf Park apparel.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#00C8A0]">Demo Fleet Available</span>
              <span className="text-[11px] font-medium text-white/60">In-Park Rental</span>
            </div>
          </div>

          {/* Tile 6: Wellness & Beach Club Access (Real New Content) [Span 12] */}
          <div className="md:col-span-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-2xl">
            <div className="max-w-2xl text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] mb-2 block">
                FACILITY 06 · NON-SURFER BEACH CLUB & WELLNESS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Beach Club Pass & Wellness Suites
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans">
                Designed for non-surfing guests, families, and spectators. Relax along the turquoise lagoon beach, enjoy day-pass sunbed access, oceanfront saunas, hydrotherapy recovery pools, and beachfront volleyball courts.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onOpenBooking()}
                className="bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
              >
                <span>RESERVE DAY PASS</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
