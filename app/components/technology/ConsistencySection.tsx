"use client";

import MediaPlaceholder from "./MediaPlaceholder";
import { useBooking } from "../../context/BookingContext";

export default function ConsistencySection() {
  const { onOpenBooking } = useBooking();

  return (
    <section id="tech-section-06" className="bg-[#062B36] text-white py-20 sm:py-28 relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Media Placeholder */}
          <div className="lg:col-span-6">
            <MediaPlaceholder
              aspectRatio="aspect-[16/10]"
              label="CONSISTENCY PROOF"
              fallbackImage="/images/tier5.jpg"
            />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 text-left">
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#00C7C7] block mb-3">
              06
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-6">
              CONSISTENCY<br />IS THE TECHNOLOGY.
            </h2>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans max-w-xl mb-8">
              Every wave is measured. Every wave is perfected. Every session is consistent.
            </p>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 bg-[#00C7C7] hover:bg-[#00D4D4] text-[#031923] font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
            >
              <span>▶ WATCH THE FILM</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
