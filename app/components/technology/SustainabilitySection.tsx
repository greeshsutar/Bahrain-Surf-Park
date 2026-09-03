"use client";

export default function SustainabilitySection() {
  return (
    <section id="tech-section-07" className="bg-[#F7F8F6] text-[#092531] py-14 sm:py-20 relative z-10 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 text-left">
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#007F91] block mb-3">
              07
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#092531] tracking-tight leading-[1.08] mb-6">
              ENGINEERED FOR<br />A BETTER FUTURE.
            </h2>

            <p className="text-[#092531]/80 text-sm sm:text-base leading-relaxed font-sans max-w-xl mb-8">
              Smart design. Efficient energy use. Sustainable for generations.
            </p>

            <a
              href="#tech-section-08"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#007F91] hover:text-[#031923] transition-colors"
            >
              <span>OUR SUSTAINABILITY</span>
              <span className="text-sm font-normal">→</span>
            </a>
          </div>

          {/* Right Column: Large Technical Circular Visualization */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-[#007F91]/40 flex flex-col items-center justify-center p-8 bg-white shadow-xl">
              {/* Radial Aqua Dotted Graphic */}
              <div className="absolute inset-0 rounded-full border-4 border-[#00C7C7]/20 border-t-[#00C7C7] animate-spin" style={{ animationDuration: "20s" }}></div>

              <div className="text-center relative z-10 px-4">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#092531] tracking-tight mb-2 uppercase">
                  ECO-EFFICIENT
                </div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#007F91] max-w-[160px] mx-auto leading-snug">
                  ENGINEERED FOR EFFICIENT, SUSTAINABLE OPERATION
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
