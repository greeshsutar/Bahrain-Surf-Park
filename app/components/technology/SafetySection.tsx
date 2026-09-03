"use client";

import MediaPlaceholder from "./MediaPlaceholder";

const COLUMNS = [
  {
    title: "CONTROLLED ENVIRONMENT",
    desc: "No currents. No tides. Just perfect waves.",
    icon: (
      <svg className="w-6 h-6 text-[#00C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "PREDICTABLE CONDITIONS",
    desc: "The same wave quality in every session.",
    icon: (
      <svg className="w-6 h-6 text-[#00C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2.8.5 1.8.6 2.8.2 1-.4 2.2-.4 3.2.2.6.4 1.4.6 2.2.6" />
      </svg>
    ),
  },
  {
    title: "REAL-TIME MONITORING",
    desc: "24/7 monitoring for maximum safety.",
    icon: (
      <svg className="w-6 h-6 text-[#00C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "TRAINED LIFEGUARDS",
    desc: "Professional team on duty at all times.",
    icon: (
      <svg className="w-6 h-6 text-[#00C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function SafetySection() {
  return (
    <section id="tech-section-08" className="bg-[#031923] text-white py-14 sm:py-20 relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Block */}
          <div className="lg:col-span-6">
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#00C7C7] block mb-3">
              08
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              PRECISION BUILT<br />AROUND PEOPLE.
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              Safety is at the core of everything we do. Our technology creates a predictable and secure environment.
            </p>
          </div>

          {/* Right Crop Visual Placeholder */}
          <div className="lg:col-span-6">
            <MediaPlaceholder
              aspectRatio="aspect-[16/9]"
              label="SAFETY & MONITORING CROP"
              fallbackImage="/images/bahrain_surf_park_clean.jpg"
            />
          </div>

        </div>

        {/* 4 Safety Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#00C7C7]/50 transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#062B36] flex items-center justify-center mb-4">
                  {col.icon}
                </div>

                <h4 className="font-sans text-xs font-extrabold tracking-wider uppercase text-white mb-2">
                  {col.title}
                </h4>

                <p className="text-xs text-white/75 leading-relaxed font-sans">
                  {col.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
