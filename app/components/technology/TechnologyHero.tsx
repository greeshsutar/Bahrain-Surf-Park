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
          poster="/images/tier5.jpg"
          className="w-full h-full object-cover object-center opacity-85"
        >
          <source src="/videos/surfing.mp4" type="video/mp4" />
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
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-36 sm:pt-40 md:pt-44 pb-12 my-auto flex flex-col justify-center text-left">
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
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="#tech-intro"
              className="bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-7 py-3.5 h-[50px] rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-cyan-500/25 inline-flex items-center gap-2.5 shrink-0"
            >
              <span>EXPLORE THE TECHNOLOGY</span>
              <span className="text-sm font-normal">→</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="bg-white/10 hover:bg-white/20 border border-white/40 text-white font-extrabold px-7 py-3.5 h-[50px] rounded-xl text-xs uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-2.5 shrink-0"
            >
              <span>WATCH THE FILM</span>
              <span className="text-xs">▷</span>
            </button>
          </div>

        </div>
      </div>

      {/* Hero Engineering Metrics HUD Bar */}
      <div className="relative z-20 w-full border-t border-white/15 bg-[#02141C]/80 backdrop-blur-md py-5 sm:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-left">
          
          {/* Metric 1 */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#00C8A0]/40 bg-[#00C8A0]/15 flex items-center justify-center shrink-0 text-[#00C8A0]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2.8.5 1.8.6 2.8.2 1-.4 2.2-.4 3.2.2.6.4 1.4.6 2.2.6"/>
              </svg>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">1,000+</div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#00C8A0]">WAVES / HOUR</div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="sm:border-l sm:border-white/15 sm:pl-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#00C8A0]/40 bg-[#00C8A0]/15 flex items-center justify-center shrink-0 text-[#00C8A0]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                <path d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
                <path d="M2 18c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2"/>
              </svg>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">20+</div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#00C8A0]">WAVE PROFILES</div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="sm:border-l sm:border-white/15 sm:pl-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#00C8A0]/40 bg-[#00C8A0]/15 flex items-center justify-center shrink-0 text-[#00C8A0]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">REAL-TIME</div>
              <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#00C8A0]">CONTROL</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
