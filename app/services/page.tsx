"use client";

import Link from "next/link";
import { useBooking } from "../context/BookingContext";

export default function ServicesPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="bg-[#061C27] text-white pt-28 pb-24 min-h-screen relative z-10 overflow-hidden">
      {/* Subtle Atmospheric Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00C8A0]/[0.06] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Page Header */}
        <div className="max-w-3xl text-left mb-14">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            PARK AMENITIES & ECOSYSTEM
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-4">
            Everything at the Park
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed font-sans max-w-2xl font-medium">
            Beyond the lagoon — dining, retail, wellness, and private events, all in one place.
          </p>
        </div>

        {/* 6 Bento Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Tile 1: The Surf Lagoon (Teaser -> /technology) [Span 6] */}
          <div className="md:col-span-6 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 sm:p-9 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                  PARK LAGOON
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold text-[#00C8A0]">
                  52 MODULES
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                The Surf Lagoon
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                The heart of the park — 1,000 programmable waves per hour.
              </p>
            </div>

            <div className="pt-5 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#00C8A0]">Wavegarden Cove® Engine</span>
              <Link
                href="/technology"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00C8A0] transition-colors"
              >
                <span>EXPLORE TECHNOLOGY</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Tile 2: Club Hawaii Academy (Teaser -> /academy) [Span 6] */}
          <div className="md:col-span-6 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 sm:p-9 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                  SURF COACHING
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold text-[#0B7FB5]">
                  ISA CERTIFIED
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Club Hawaii Academy
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                ISA-certified coaching for every level.
              </p>
            </div>

            <div className="pt-5 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0B7FB5]">Group & Private Lessons</span>
              <Link
                href="/academy"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00C8A0] transition-colors"
              >
                <span>EXPLORE ACADEMY</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Tile 3: Terraces & Dining (Teaser -> /cabanas) [Span 4] */}
          <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                  HOSPITALITY
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Terraces & Dining
              </h2>
              <p className="text-white/80 text-xs leading-relaxed mb-6 font-sans">
                Lagoon-side cabanas and beachside dining.
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

          {/* Tile 4: Beach Club Access (NEW Real Content) [Span 4] */}
          <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                  NON-SURF ACCESS
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Beach Club Access
              </h2>
              <p className="text-white/80 text-xs leading-relaxed mb-6 font-sans">
                You don't have to surf to enjoy the lagoon. Purchase a day pass to relax lagoon-side, soak up the sun, and watch the waves — perfect for non-surfing guests and families.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#00C8A0]">Day Pass Entry</span>
              <span className="text-[10px] font-mono text-white/50">LAGONSIDE</span>
            </div>
          </div>

          {/* Tile 5: Retail & Surf Shop (NEW Real Content) [Span 4] */}
          <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                  SURF SHOP & RENTALS
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Retail & Surf Shop
              </h2>
              <p className="text-white/80 text-xs leading-relaxed mb-6 font-sans">
                Our on-site shop offers board and wetsuit rentals, apparel, and everything you need for your session — no need to bring your own gear.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0B7FB5]">Gear & Rentals</span>
              <span className="text-[10px] font-mono text-white/50">ON-SITE</span>
            </div>
          </div>

          {/* Tile 6: Private Events & Competitions (NEW Real Content) [Span 12] */}
          <div className="md:col-span-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-[#00C8A0]/60 transition-all duration-300 shadow-2xl">
            <div className="max-w-2xl text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] mb-2 block">
                PRIVATE VENUE HIRE & COMPETITIONS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#00C8A0] transition-colors">
                Private Events & Competitions
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans">
                Host your next celebration, corporate event, or surf competition at Bahrain Surf Park. Our lagoon can be booked privately for group sessions, tournaments, and exclusive gatherings.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onOpenBooking("Private Group")}
                className="bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
              >
                <span>INQUIRE ABOUT EVENTS</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
