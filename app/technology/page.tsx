"use client";

import TechnologyHero from "../components/technology/TechnologyHero";
import TechnologyIntro from "../components/technology/TechnologyIntro";
import WaveCreation from "../components/technology/WaveCreation";
import MotionToWave from "../components/technology/MotionToWave";
import WaveControl from "../components/technology/WaveControl";
import WaveProfiles from "../components/technology/WaveProfiles";
import ConsistencySection from "../components/technology/ConsistencySection";
import SustainabilitySection from "../components/technology/SustainabilitySection";
import SafetySection from "../components/technology/SafetySection";
import TechnologyCTA from "../components/technology/TechnologyCTA";

export default function TechnologyPage() {
  return (
    <div className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      <TechnologyHero />
      <TechnologyIntro />
      <WaveCreation />
      <MotionToWave />
      <WaveControl />
      <WaveProfiles />
      <ConsistencySection />
      <SustainabilitySection />
      <SafetySection />
      <TechnologyCTA />
    </div>
  );
}
