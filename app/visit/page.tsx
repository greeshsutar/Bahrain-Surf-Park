"use client";

import { useBooking } from "../context/BookingContext";
import VisitHero from "../components/visit/VisitHero";
import VisitOrientationNav from "../components/visit/VisitOrientationNav";
import VisitGettingHere from "../components/visit/VisitGettingHere";
import VisitKnowBeforeYouGo from "../components/visit/VisitKnowBeforeYouGo";
import VisitMap from "../components/visit/VisitMap";
import VisitAtAGlance from "../components/visit/VisitAtAGlance";
import VisitFAQ from "../components/visit/VisitFAQ";
import VisitNeedHelp from "../components/visit/VisitNeedHelp";
import VisitCTA from "../components/visit/VisitCTA";

export default function VisitPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="w-full bg-[#0A1926] text-white selection:bg-[#00C8A0] selection:text-[#02141C]">
      {/* 01 — CINEMATIC ARRIVAL */}
      <VisitHero onOpenBooking={onOpenBooking} />

      {/* 02 — ORIENTATION */}
      <VisitOrientationNav />

      {/* 03 — GETTING HERE */}
      <VisitGettingHere />

      {/* 04 — ARRIVAL GUIDE ("KNOW BEFORE YOU GO") */}
      <VisitKnowBeforeYouGo />

      {/* 05 — INTERACTIVE LOCATION / MAP */}
      <VisitMap />

      {/* 06 — VISITOR ESSENTIALS */}
      <VisitAtAGlance />

      {/* 07 — FAQ */}
      <VisitFAQ />

      {/* 08 — NEED HELP */}
      <VisitNeedHelp onOpenBooking={onOpenBooking} />

      {/* 09 — FINAL ARRIVAL CTA */}
      <VisitCTA onOpenBooking={onOpenBooking} />
    </div>
  );
}
