"use client";

const STAGES = [
  {
    num: "01",
    title: "ARRIVE",
    desc: "Check in at the Bahrain Surf Park coastal reception 45 minutes before your scheduled session. Access private changing suites and prepare your gear.",
    img: "/images/tier1.jpg",
  },
  {
    num: "02",
    title: "PREPARE",
    desc: "Receive soft-top or demo fleet equipment, attend the mandatory safety briefing with ISA-certified instructors, and warm up on the shore.",
    img: "/images/tier2.jpg",
  },
  {
    num: "03",
    title: "SURF",
    desc: "Step into the turquoise lagoon. For 60 uninterrupted minutes, enjoy continuous calibrated waves matching your session tier.",
    img: "/images/tier5.jpg",
  },
  {
    num: "04",
    title: "PROGRESS",
    desc: "Analyze your wave count, review high-definition video footage with coaches at Club Hawaii, and unwind at the beach club cabanas.",
    img: "/images/tier4.jpg",
  },
];

export default function SessionJourney() {
  return (
    <section className="bg-[#082F3D] text-white py-14 sm:py-20 relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
          THE SESSION JOURNEY
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-16">
          FROM ARRIVAL TO YOUR LAST WAVE.
        </h2>

        {/* 4 Stage Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STAGES.map((stg) => (
            <div
              key={stg.num}
              className="bg-white/5 border border-white/15 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#00C8A0] transition-all duration-300 shadow-xl"
            >
              <div className="relative h-[200px] overflow-hidden bg-slate-900">
                <img
                  src={stg.img}
                  alt={stg.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#061F2B]/80 backdrop-blur-md border border-white/20 text-[#00C8A0] font-mono text-sm font-bold flex items-center justify-center">
                  {stg.num}
                </div>
              </div>

              <div className="p-6 text-left flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#00C8A0] transition-colors">
                    {stg.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-sans font-medium">
                    {stg.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
