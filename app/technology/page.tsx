"use client";

import Technology from "../components/Technology";

export default function TechnologyPage() {
  return (
    <div className="bg-[#FBFDFD]">
      {/* Dedicated Subpage Intro Header */}
      <section className="bg-[#061C27] text-white pt-28 pb-16 relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-left">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            WAVEENGINE ENGINEERING
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
            The Technology Behind Every Wave
          </h1>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans">
            Our lagoon runs on a 52-module Wavegarden Cove system, producing up to 1,000 ocean-grade waves per hour — with wave heights ranging from gentle whitewater for first-timers to powerful, head-high faces for advanced surfers. Bahrain Surf Park is part of Wavegarden's global network of more than 70 surf-lagoon projects worldwide, recognized as one of the most energy-efficient wave-generation systems in the industry.
          </p>
        </div>
      </section>

      {/* Embedded Technology Section */}
      <Technology />
    </div>
  );
}
