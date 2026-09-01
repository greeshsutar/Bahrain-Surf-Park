"use client";

import CabanasHero from "./cabanas/CabanasHero";
import CabanasPrivateHaven from "./cabanas/CabanasPrivateHaven";
import CabanasExperience from "./cabanas/CabanasExperience";
import CabanasInteractiveSelector from "./cabanas/CabanasInteractiveSelector";
import CabanasDayJourney from "./cabanas/CabanasDayJourney";
import CabanasCTA from "./cabanas/CabanasCTA";
import Footer from "./Footer";
import { useBooking } from "../context/BookingContext";

export default function Cabanas() {
  const { onOpenBooking } = useBooking();

  return (
    <div id="cabanas" className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* 01 — CINEMATIC ARRIVAL */}
      <CabanasHero onOpenBooking={onOpenBooking} />

      {/* 02 — YOUR PRIVATE HAVEN */}
      <CabanasPrivateHaven onOpenBooking={onOpenBooking} />

      {/* 03 — THE CABANA EXPERIENCE */}
      <CabanasExperience />

      {/* 04 — CHOOSE YOUR EXPERIENCE */}
      <CabanasInteractiveSelector onOpenBooking={onOpenBooking} />

      {/* 05 — YOUR DAY, YOUR WAY (Signature Scroll-Driven Journey) */}
      <CabanasDayJourney />

      {/* 06 — MAKE THE DAY YOUR OWN */}
      <CabanasCTA onOpenBooking={onOpenBooking} />

      {/* 07 — FOOTER */}
      <Footer onOpenBooking={onOpenBooking} />
    </div>
  );
}
