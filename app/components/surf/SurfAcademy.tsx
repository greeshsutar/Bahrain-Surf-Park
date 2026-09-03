"use client";

import Link from "next/link";

export default function SurfAcademy() {
  return (
    <section className="bg-[#061F2B] text-white py-14 sm:py-20 relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              CLUB HAWAII COACHING
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08]">
              SURF WITH PURPOSE.
            </h2>
          </div>

          <Link
            href="/academy"
            className="inline-flex items-center gap-2 bg-[#00C8A0] hover:bg-[#00B590] text-[#061F2B] font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shrink-0"
          >
            <span>EXPLORE ACADEMY</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#082F3D] border border-white/15 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#00C8A0] transition-all">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] mb-2 block">
                01. GROUP COACHING
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Group Lessons
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-sans mb-6">
                High-energy group coaching covering pop-up fundamentals, board control, ocean safety, and group wave rotation.
              </p>
            </div>
            <span className="text-xs font-bold text-[#00C8A0]">ISA-Certified Coaches</span>
          </div>

          <div className="bg-[#082F3D] border border-white/15 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#00C8A0] transition-all">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#07536A] mb-2 block">
                02. PRIVATE COACHING
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                1-on-1 Private Sessions
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-sans mb-6">
                Tailored 1-on-1 instruction focused entirely on your specific goals, pop-up technique, and wave selection.
              </p>
            </div>
            <span className="text-xs font-bold text-[#07536A]">Dedicated Instructor</span>
          </div>

          <div className="bg-[#082F3D] border border-white/15 rounded-3xl p-8 flex flex-col justify-between group hover:border-[#00C8A0] transition-all">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] mb-2 block">
                03. PERFORMANCE
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Video Analysis
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-sans mb-6">
                High-definition multi-angle video playback suites analyzing turn mechanics, stance, speed generation, and barrel positioning.
              </p>
            </div>
            <span className="text-xs font-bold text-[#00C8A0]">HD Video Suite</span>
          </div>
        </div>

      </div>
    </section>
  );
}
