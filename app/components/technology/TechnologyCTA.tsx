"use client";

import Link from "next/link";
import { useBooking } from "../../context/BookingContext";

export default function TechnologyCTA() {
  const { onOpenBooking } = useBooking();

  return (
    <section className="bg-[#031923] text-white py-24 sm:py-32 relative z-10 overflow-hidden border-b border-white/10">
      {/* Background Media Placeholder Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/tier5.jpg"
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/videos/surfing.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#031923] via-[#031923]/70 to-[#031923]/80"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <span className="text-[#00C7C7] text-xs font-extrabold tracking-[0.3em] uppercase mb-4 block">
          BAHRAIN SURF PARK
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-10">
          READY TO EXPERIENCE<br />THE FUTURE OF SURFING?
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onOpenBooking()}
            className="bg-[#00C7C7] hover:bg-[#00D4D4] text-[#031923] font-extrabold px-9 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-2xl hover:shadow-[#00C7C7]/30 cursor-pointer inline-flex items-center gap-2"
          >
            <span>BOOK YOUR SESSION</span>
            <span className="text-sm">→</span>
          </button>

          <Link
            href="/find-your-wave"
            className="bg-transparent hover:bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
          >
            <span>EXPLORE WAVE LEVELS</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
