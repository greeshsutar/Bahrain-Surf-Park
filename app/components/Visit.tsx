"use client";

import VisitHero from "./visit/VisitHero";
import VisitPlan from "./visit/VisitPlan";
import VisitMap from "./visit/VisitMap";
import VisitFAQ from "./visit/VisitFAQ";
import VisitCTA from "./visit/VisitCTA";

interface VisitProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Visit({ onOpenBooking }: VisitProps) {
  return (
    <div id="visit" className="bg-[#02141C] text-white min-h-screen relative z-10 overflow-x-hidden">
      {/* 01 — ARRIVAL / HERO */}
      <VisitHero onOpenBooking={onOpenBooking} />

      {/* 02 — PLAN YOUR VISIT */}
      <VisitPlan />

      {/* 03 — FIND US */}
      <VisitMap />

      {/* 04 — FREQUENTLY ASKED QUESTIONS */}
      <VisitFAQ />

      {/* 05 — FINAL BOOKING CTA */}
      <VisitCTA onOpenBooking={onOpenBooking} />
    </div>
  );
}
