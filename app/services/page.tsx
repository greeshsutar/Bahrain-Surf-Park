"use client";

import ServicesHero from "../components/services/ServicesHero";
import ServicesCardStack from "../components/services/ServicesCardStack";
import ServicesCinematicExperience from "../components/services/ServicesCinematicExperience";
import ServicesCTA from "../components/services/ServicesCTA";
import { useBooking } from "../context/BookingContext";

export default function ServicesPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="bg-[#02141C] text-[#FFFFFF] min-h-screen relative z-10 overflow-x-hidden">
      {/* 01 — CINEMATIC HERO */}
      <ServicesHero onOpenBooking={onOpenBooking} />

      {/* 02 — STICKY SERVICE CARD STACK (Signature Interaction) */}
      <ServicesCardStack onOpenBooking={onOpenBooking} />

      {/* 03 — CINEMATIC SERVICE EXPERIENCE (Breathing Section) */}
      <ServicesCinematicExperience />

      {/* 04 — FINAL CINEMATIC CTA */}
      <ServicesCTA onOpenBooking={onOpenBooking} />
    </div>
  );
}
