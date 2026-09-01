"use client";

import FindYourWaveHero from "../components/find-your-wave/FindYourWaveHero";
import InteractiveWaveSelector from "../components/find-your-wave/InteractiveWaveSelector";
import WaveProgressionTimeline from "../components/find-your-wave/WaveProgressionTimeline";
import FeelTheDifference from "../components/find-your-wave/FeelTheDifference";
import SessionBuilder from "../components/find-your-wave/SessionBuilder";
import FindYourWaveCTA from "../components/find-your-wave/FindYourWaveCTA";
import Footer from "../components/Footer";
import { useBooking } from "../context/BookingContext";

export default function FindYourWavePage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* 01 — HERO */}
      <FindYourWaveHero onOpenBooking={onOpenBooking} />

      {/* 02 — FIND YOUR WAVE (Interactive Morphing Visualizer & Specs) */}
      <InteractiveWaveSelector onOpenBooking={onOpenBooking} />

      {/* 03 — WAVE PROGRESSION (Scroll-Driven Timeline) */}
      <WaveProgressionTimeline />

      {/* 04 — FEEL THE DIFFERENCE (Live Canvas Controls) */}
      <FeelTheDifference />

      {/* 05 — YOUR SESSION (Session Configurator) */}
      <SessionBuilder onOpenBooking={onOpenBooking} />

      {/* 06 — FINAL BOOKING EXPERIENCE */}
      <FindYourWaveCTA onOpenBooking={onOpenBooking} />

      {/* 07 — FOOTER */}
      <Footer onOpenBooking={onOpenBooking} />
    </div>
  );
}
