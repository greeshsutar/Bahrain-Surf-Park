"use client";

import gsap from "gsap";

export default function Cabanas() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnterBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.04, y: -2, duration: 0.3, ease: "back.out(1.4)", overwrite: "auto" });
  };

  const handleMouseLeaveBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section id="cabanas" className="bg-white py-14 sm:py-20 relative z-10 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            {/* Plain Typographic Eyebrow */}
            <span className="text-[#0B7FB5] text-xs font-extrabold tracking-[0.2em] uppercase mb-4 block">
              BEYOND THE WAVES
            </span>
            {/* Headline (Playfair Display) */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1926] leading-[1.18] tracking-tight mb-6">
              Beachside Cabanas & Coastal Dining
            </h2>
            {/* Intro copy */}
            <p className="text-[#0A1926]/80 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Experience the complete island escape. Settle into our private luxury cabanas or enjoy premium beachside dining, crafted to provide the ultimate relaxation off the board.
            </p>
            
            {/* Action Button */}
            <div className="flex">
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit")}
                onMouseEnter={handleMouseEnterBtn}
                onMouseLeave={handleMouseLeaveBtn}
                className="bg-[#0B7FB5] hover:bg-[#0077B6] text-white px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2"
              >
                <span>RESERVE AN EXPERIENCE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Asymmetric Image Diptych */}
          <div className="lg:col-span-7 relative flex items-center justify-center gap-6">
            {/* Cabana Lounging Photo Container */}
            <div className="w-1/2 aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-slate-100 bg-[#F1F5F9] relative flex flex-col justify-center items-center text-center p-4">
              <div className="absolute inset-0 bg-slate-900/5 z-10 pointer-events-none"></div>
              <svg className="w-12 h-12 text-[#0B7FB5]/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#0A1926]/75">[REAL PHOTOGRAPHY REQUIRED]</span>
              <span className="text-[10px] text-slate-400 mt-1 max-w-[150px]">Beachside Luxury Cabana Rental Experience</span>
            </div>

            {/* Coastal Dining Photo Container */}
            <div className="w-1/2 aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-slate-100 bg-[#F1F5F9] relative flex flex-col justify-center items-center text-center p-4 mt-12">
              <div className="absolute inset-0 bg-slate-900/5 z-10 pointer-events-none"></div>
              <svg className="w-12 h-12 text-[#0B7FB5]/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#0A1926]/75">[REAL PHOTOGRAPHY REQUIRED]</span>
              <span className="text-[10px] text-slate-400 mt-1 max-w-[150px]">Premium Beachside Dining & Culinary Offerings</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
