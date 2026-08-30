"use client";

import Link from "next/link";

const DESTINATIONS = [
  {
    title: "Club Hawaii Academy",
    eyebrow: "SURF COACHING",
    desc: "ISA-certified instructors, group lessons, and video analysis suites.",
    link: "/academy",
    img: "/images/tier1.jpg",
  },
  {
    title: "Terraces & Cabanas",
    eyebrow: "BEACH CLUB & HOSPITALITY",
    desc: "Private luxury cabanas, lagoon-side lounge seating, and organic dining.",
    link: "/cabanas",
    img: "/images/tier2.jpg",
  },
  {
    title: "Plan Your Visit",
    eyebrow: "VISITOR LOGISTICS",
    desc: "Operating hours, check-in protocol, parking, and location guides.",
    link: "/visit",
    img: "/images/tier5.jpg",
  },
];

export default function SurfDestinations() {
  return (
    <section className="bg-[#082F3D] text-white py-20 sm:py-28 relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
          EXPLORE THE PARK
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-12">
          CONTINUE YOUR JOURNEY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESTINATIONS.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="group relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 h-[380px] flex flex-col justify-end p-8 select-none"
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061F2B] via-[#061F2B]/60 to-transparent z-10"></div>

              <div className="relative z-20 text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-2">
                  {item.eyebrow}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#00C8A0] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-sans mb-4">
                  {item.desc}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00C8A0]">
                  <span>EXPLORE CHAPTER</span>
                  <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
