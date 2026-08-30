"use client";

import MediaPlaceholder from "./MediaPlaceholder";

export default function TechnologyIntro() {
  return (
    <section id="tech-section-01" className="bg-[#F0EEE7] text-[#092531] py-20 sm:py-28 relative z-10 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 text-left">
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#007F91] block mb-3">
              01
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#092531] tracking-tight leading-[1.08] mb-6">
              ENGINEERED WATER.<br />PERFECTED WAVES.
            </h2>

            <p className="text-[#092531]/80 text-sm sm:text-base leading-relaxed font-sans max-w-xl mb-8">
              Wavegarden Cove® technology uses advanced hydrodynamics and real-time control to create perfectly shaped waves in a safe, sustainable and consistent environment.
            </p>

            <a
              href="#tech-section-02"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#007F91] hover:text-[#031923] transition-colors"
            >
              <span>DISCOVER OUR TECHNOLOGY</span>
              <span className="text-sm font-normal">→</span>
            </a>
          </div>

          {/* Right Column: Panoramic Media Card */}
          <div className="lg:col-span-7">
            <MediaPlaceholder
              aspectRatio="aspect-[2/1] sm:aspect-[2.15/1]"
              showPlayBtn={true}
              playBtnLabel="HOW IT WORKS"
              playBtnPosition="bottom-left"
              fallbackImage="/images/wavecove.png"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
