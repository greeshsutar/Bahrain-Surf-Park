"use client";

import Link from "next/link";
import TechnologyHero from "../components/technology/TechnologyHero";
import TechnologyIntro from "../components/technology/TechnologyIntro";
import MotionToWave from "../components/technology/MotionToWave";
import WaveControl from "../components/technology/WaveControl";
import SustainabilitySection from "../components/technology/SustainabilitySection";
import SafetySection from "../components/technology/SafetySection";
import TechnologyCTA from "../components/technology/TechnologyCTA";

export default function TechnologyPage() {
  return (
    <div className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* 1. Hero & Stat Strip */}
      <TechnologyHero />

      {/* 2. Physics of Perfection */}
      <TechnologyIntro />

      {/* 3. From Motion to Wave */}
      <MotionToWave />

      {/* 4. Every Wave Under Control */}
      <WaveControl />

      {/* 5. Wave Tiers Navigation Banner */}
      <section className="bg-[#061C27] text-[#FFFFFF] py-12 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/85 text-base sm:text-lg font-sans font-medium text-center sm:text-left">
            Explore all five wave tiers and find your session
          </p>
          <Link
            href="/find-your-wave"
            className="inline-flex items-center gap-2 bg-[#00C8A0] hover:bg-[#00B590] text-[#02141C] font-extrabold px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shrink-0"
          >
            <span>EXPLORE WAVE TIERS</span>
            <span className="text-sm font-normal">→</span>
          </Link>
        </div>
      </section>

      {/* 6. Sustainability */}
      <SustainabilitySection />

      {/* 7. Precision Built Around People (Safety) */}
      <SafetySection />

      {/* 8. Final CTA */}
      <TechnologyCTA />
    </div>
  );
}
