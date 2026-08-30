"use client";

import Link from "next/link";
import { useBooking } from "../../context/BookingContext";

export default function SurfCTA() {
  const { onOpenBooking } = useBooking();

  return (
    <section className="bg-[#061F2B] text-white py-24 sm:py-32 relative z-10 overflow-hidden border-b border-white/10">
      {/* Giant Enormous Subtle Wave Contour Background */}
      <div className="absolute inset-0 pointer-events-none opacity-15 flex items-center justify-center">
        <svg className="w-[140%] h-[140%]" viewBox="0 0 1440 900" fill="none" stroke="#00C8A0" strokeWidth="2">
          <path d="M-200,450 C300,100 800,800 1600,450" />
          <path d="M-200,550 C300,200 800,900 1600,550" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.3em] uppercase mb-4 block">
          BAHRAIN SURF PARK
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
          READY TO RIDE?
        </h2>

        <p className="text-white/80 text-base sm:text-xl font-serif italic max-w-xl mx-auto mb-10">
          Your next wave starts here.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onOpenBooking()}
            className="bg-[#00C8A0] hover:bg-[#00B590] text-[#061F2B] font-extrabold px-9 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-2xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2"
          >
            <span>JOIN THE WAITLIST</span>
            <span className="text-sm">→</span>
          </button>

          <Link
            href="/academy"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
          >
            <span>EXPLORE ACADEMY</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
