"use client";

import Link from "next/link";

export default function SurfTechnology() {
  return (
    <section className="bg-[#061F2B] text-white py-20 sm:py-28 relative z-10 overflow-hidden border-b border-white/10">
      {/* Background Tech Glow */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-[#00C8A0]/[0.05] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Tech Copy */}
          <div className="lg:col-span-7">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              WAVEGARDEN COVE® HYDRODYNAMICS
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-6">
              YOUR WAVE.<br />ENGINEERED.
            </h2>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans max-w-xl mb-8">
              Bahrain Surf Park operates the industry-leading Wavegarden Cove system — utilizing 52 electro-mechanical modules to shape precise water displacement into ocean-grade waves.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-xl mb-8">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">PILLAR 01</span>
                <span className="font-serif text-base font-bold text-white">CONSISTENCY</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#07536A] block mb-1">PILLAR 02</span>
                <span className="font-serif text-base font-bold text-white">CONTROL</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#07536A] block mb-1">PILLAR 03</span>
                <span className="font-serif text-base font-bold text-white">REPEATABILITY</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">PILLAR 04</span>
                <span className="font-serif text-base font-bold text-white">PRECISION</span>
              </div>
            </div>

            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00C8A0] hover:text-white transition-colors"
            >
              <span>EXPLORE FULL ENGINEERING SPEC</span>
              <span>→</span>
            </Link>
          </div>

          {/* Right Column: Visual Portrait Video Container */}
          <div className="lg:col-span-5">
            <div className="w-full rounded-3xl overflow-hidden shadow-2xl relative border border-white/20 h-[360px] sm:h-[440px] bg-slate-900 group">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="/videos/create_a_video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#061F2B] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse"></span>
                  <span className="text-xs font-bold text-white">52 Modules Active</span>
                </div>
                <span className="text-xs font-mono text-white/70">1,000 WAVES / HR</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
