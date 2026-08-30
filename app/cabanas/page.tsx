import Cabanas from "../components/Cabanas";

export default function CabanasPage() {
  return (
    <div className="bg-[#061922]">
      {/* Dedicated Subpage Intro Header */}
      <section className="bg-[#0A1926] text-white pt-28 pb-14 relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-left">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            BEACH CLUB & HOSPITALITY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
            Relax Lagoon-Side
          </h1>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans">
            Our beach club is a vibrant, lagoon-side space where surfers and non-surfers alike can unwind. Surfers can relax before or after their session, while non-surfing guests can purchase a day pass to soak up the sun and enjoy the atmosphere from our terraces and cabanas.
          </p>
        </div>
      </section>

      {/* Embedded Cabanas Component */}
      <Cabanas />
    </div>
  );
}
