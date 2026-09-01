"use client";

import AcademyHero from "./academy/AcademyHero";
import AcademyLevelSelector from "./academy/AcademyLevelSelector";
import AcademyLearningJourney from "./academy/AcademyLearningJourney";
import AcademyCoaching from "./academy/AcademyCoaching";
import AcademySessionBuilder from "./academy/AcademySessionBuilder";
import AcademyCTA from "./academy/AcademyCTA";
import Footer from "./Footer";
import { useBooking } from "../context/BookingContext";

export default function Academy() {
  const { onOpenBooking } = useBooking();

  return (
    <div id="academy" className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* 01 — HERO */}
      <AcademyHero onOpenBooking={onOpenBooking} />

      {/* 02 — FIND YOUR LEVEL */}
      <AcademyLevelSelector onOpenBooking={onOpenBooking} />

      {/* 03 — THE LEARNING JOURNEY (+ Image Break & WaveDivider) */}
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
