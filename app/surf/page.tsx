"use client";

import SurfHero from "../components/surf/SurfHero";
import SurfIntro from "../components/surf/SurfIntro";
import WaveSelector from "../components/surf/WaveSelector";
import WaveProgression from "../components/surf/WaveProgression";
import SessionFinder from "../components/surf/SessionFinder";
import SessionJourney from "../components/surf/SessionJourney";
import SurfTechnology from "../components/surf/SurfTechnology";
import SurfEmotion from "../components/surf/SurfEmotion";
import SurfAcademy from "../components/surf/SurfAcademy";
import SurfFAQ from "../components/surf/SurfFAQ";
import SurfCTA from "../components/surf/SurfCTA";
import SurfDestinations from "../components/surf/SurfDestinations";
import Footer from "../components/Footer";
import { useBooking } from "../context/BookingContext";

export default function SurfPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="bg-[#061F2B] text-white min-h-screen relative z-10 overflow-x-hidden">
      <SurfHero />
      <SurfIntro />
      <WaveSelector />
      <WaveProgression />
      <SessionFinder />
      <SessionJourney />
      <SurfTechnology />
      <SurfEmotion />
      <SurfAcademy />
      <SurfFAQ />
      <SurfCTA />
      <SurfDestinations />
    </div>
  );
}
