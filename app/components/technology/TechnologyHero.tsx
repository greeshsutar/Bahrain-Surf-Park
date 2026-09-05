"use client";

import { useBooking } from "../../context/BookingContext";

export default function TechnologyHero() {
  const { onOpenBooking } = useBooking();

  return (
    <section id="technology-hero" className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-between bg-[#02141C] text-white overflow-hidden z-10 m-0 p-0">
      {/* Cinematic Background Video / Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/wave_engineering.jpg"
          className="w-full h-full object-cover object-center opacity-85"
        >
          <source src="/videos/wavecove.mp4" type="video/mp4" />
        </video>

        {/* Top Dark Scrim Overlay to ensure Navbar readability */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#02141C]/90 via-[#02141C]/40 to-transparent z-10 pointer-events-none"></div>

        {/* Left-to-Right Dark Cinematic Scrim for Text Contrast */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(2,20,28,0.92) 0%, rgba(2,20,28,0.65) 42%, rgba(2,20,28,0.25) 75%, rgba(2,20,28,0.10) 100%)"
          }}
        ></div>

        {/* Bottom Fade Gradient for Smooth Section Integration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02141C] to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Hero Content (Positioned safely below floating Navbar) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-12 my-auto flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
        <div className="max-w-[650px]">
          
          {/* Aqua Eyebrow Label */}
          <span className="text-[#00C8A0] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase mb-4 block">
            WAVEGARDEN COVE® TECHNOLOGY
          </span>

          {/* Large Serif Title */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] xl:text-[82px] font-bold text-white tracking-tight leading-[0.98] mb-6 drop-shadow-md">
            THE ENGINE<br />BEHIND THE WAVE.
          </h1>

          {/* Supporting Copy */}
          <p className="text-slate-100 text-base sm:text-lg font-normal leading-relaxed max-w-[460px] mb-8 font-sans">
            Precision engineered waves,<br className="hidden sm:inline" />
            designed for every surfer,<br className="hidden sm:inline" />
            every time.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-5">
            <a
              href="#technology-intro"
              className="bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#00C8A0]/30 cursor-pointer inline-flex items-center gap-2"
            >
              <span>EXPLORE THE TECH</span>
              <span className="text-sm font-normal">↓</span>
            </a>

            <button
              onClick={() => onOpenBooking("Technology Overview")}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-4 rounded-xl text-xs uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>BOOK A SESSION</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
