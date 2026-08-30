"use client";

import FindYourWave from "../components/FindYourWave";
import { useBooking } from "../context/BookingContext";

export default function FindYourWavePage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="bg-[#061C27]">
      {/* Dedicated Subpage Intro Header */}
      <section className="bg-[#061C27] text-white pt-28 pb-14 relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-left">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            CALIBRATED LAGOON PROFILES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
            A Wave for Every Skill Level
          </h1>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans">
            From your very first pop-up to advanced barrel riding, our programmable lagoon delivers five distinct wave profiles — each precisely tuned for height, speed, and shape. Whether you're a complete beginner or chasing your next personal best, there's a session calibrated exactly for where you are.
          </p>
        </div>
      </section>

      {/* Embedded FindYourWave Component */}
      <FindYourWave onOpenBooking={onOpenBooking} />
    </div>
  );
}
