"use client";

import CabanasHero from "../components/cabanas/CabanasHero";
import CabanasPrivateHaven from "../components/cabanas/CabanasPrivateHaven";
import CabanasExperience from "../components/cabanas/CabanasExperience";
import CabanasInteractiveSelector from "../components/cabanas/CabanasInteractiveSelector";
import CabanasDayJourney from "../components/cabanas/CabanasDayJourney";
import CabanasCTA from "../components/cabanas/CabanasCTA";
import Footer from "../components/Footer";
import { useBooking } from "../context/BookingContext";

export default function CabanasPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div id="cabanas-page" className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* 01 — CINEMATIC ARRIVAL */}
      <CabanasHero onOpenBooking={onOpenBooking} />

      {/* 02 — YOUR PRIVATE HAVEN */}
      <CabanasPrivateHaven onOpenBooking={onOpenBooking} />

      {/* 03 — THE CABANA EXPERIENCE */}
      <CabanasExperience />

      {/* 04 — CHOOSE YOUR EXPERIENCE */}
      <CabanasInteractiveSelector onOpenBooking={onOpenBooking} />

      {/* 05 — YOUR DAY, YOUR WAY */}
      <CabanasDayJourney />

      {/* 06 — MAKE THE DAY YOUR OWN */}
      <CabanasCTA onOpenBooking={onOpenBooking} />
    </div>
  );
}
