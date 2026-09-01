"use client";

import AcademyHero from "../components/academy/AcademyHero";
import AcademyLevelSelector from "../components/academy/AcademyLevelSelector";
import AcademyLearningJourney from "../components/academy/AcademyLearningJourney";
import AcademyCoaching from "../components/academy/AcademyCoaching";
import AcademySessionBuilder from "../components/academy/AcademySessionBuilder";
import AcademyCTA from "../components/academy/AcademyCTA";
import Footer from "../components/Footer";
import { useBooking } from "../context/BookingContext";

export default function AcademyPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div id="academy-page" className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* 01 — HERO */}
      <AcademyHero onOpenBooking={onOpenBooking} />

      {/* 02 — FIND YOUR LEVEL */}
      <AcademyLevelSelector onOpenBooking={onOpenBooking} />

      {/* 03 — THE LEARNING JOURNEY */}
      <AcademyLearningJourney />

      {/* 04 — MEET THE COACHING EXPERIENCE */}
      <AcademyCoaching onOpenBooking={onOpenBooking} />

      {/* 05 — BUILD YOUR SESSION */}
      <AcademySessionBuilder onOpenBooking={onOpenBooking} />

      {/* 06 — FINAL CINEMATIC CTA */}
      <AcademyCTA onOpenBooking={onOpenBooking} />

      {/* 07 — FOOTER */}
      <Footer onOpenBooking={onOpenBooking} />
    </div>
  );
}
