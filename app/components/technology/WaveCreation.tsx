"use client";

import MediaPlaceholder from "./MediaPlaceholder";

const CALLOUTS_LEFT = [
  { num: "01", title: "WAVE GENERATION", desc: "The Cove's power unit creates a surge of water." },
  { num: "02", title: "WATER MOVEMENT", desc: "Hydrodynamic flow transports energy across the lagoon." },
  { num: "03", title: "HYDRODYNAMICS", desc: "Advanced design ensures smooth, efficient and powerful wave shaping." },
];

const CALLOUTS_RIGHT = [
  { num: "04", title: "WAVE SHAPE", desc: "Adjustable bathymetry sculpts each wave with precision." },
  { num: "05", title: "WAVE SPEED", desc: "Real-time control of wave speed for the perfect ride." },
  { num: "06", title: "CONTROL SYSTEM", desc: "Sensors and software monitor and optimize every wave." },
];

export default function WaveCreation() {
  return (
    <section id="tech-section-02" className="bg-[#031923] text-white py-20 sm:py-28 relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
        
        {/* Header Block */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-[#00C7C7] block mb-3">
            02
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
            HOW THE WAVE<br />IS CREATED.
          </h2>
          <p className="text-white/80 text-sm sm:text-base font-sans leading-relaxed mb-6">
            A perfect wave is the result of precision engineering and real-time data working together.
          </p>
          <a
            href="#tech-section-03"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00C7C7] hover:text-white transition-colors"
          >
            <span>SEE THE PROCESS</span>
            <span className="text-sm font-normal">→</span>
          </a>
        </div>

        {/* Technical Diagram Container with Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Left Callouts */}
          <div className="lg:col-span-3 space-y-6">
            {CALLOUTS_LEFT.map((c) => (
              <div key={c.num} className="bg-white/5 border border-white/10 rounded-xl p-4 text-left relative group hover:border-[#00C7C7]/50 transition-all">
                <span className="text-[10px] font-mono font-bold text-[#00C7C7] block mb-1">{c.num}</span>
                <h4 className="font-sans text-xs font-bold text-white tracking-wider uppercase mb-1">{c.title}</h4>
                <p className="text-[11px] text-white/70 font-sans leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Technical Lagoon Visualization Placeholder */}
          <div className="lg:col-span-6 relative">
            <MediaPlaceholder
              aspectRatio="aspect-[4/3]"
              label="LAGOOON ENGINEERING DIAGRAM"
              fallbackImage="/images/tier2.jpg"
              className="border-2 border-[#00C7C7]/40 shadow-2xl"
            />
          </div>

          {/* Right Callouts */}
          <div className="lg:col-span-3 space-y-6">
            {CALLOUTS_RIGHT.map((c) => (
              <div key={c.num} className="bg-white/5 border border-white/10 rounded-xl p-4 text-left relative group hover:border-[#00C7C7]/50 transition-all">
                <span className="text-[10px] font-mono font-bold text-[#00C7C7] block mb-1">{c.num}</span>
                <h4 className="font-sans text-xs font-bold text-white tracking-wider uppercase mb-1">{c.title}</h4>
                <p className="text-[11px] text-white/70 font-sans leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
