"use client";

import Visit from "../components/Visit";
import { useBooking } from "../context/BookingContext";

export default function VisitPage() {
  const { onOpenBooking } = useBooking();

  return (
    <div className="bg-white">
      {/* Dedicated Subpage Intro & Visiting Policy FAQ Section */}
      <section className="bg-[#0A1926] text-white pt-28 pb-16 relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-left">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            VISITOR GUIDE & POLICIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-8">
            Park Policies & Visiting FAQ
          </h1>

          {/* 3 FAQ Policy Cards */}
          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-[#00C8A0] mb-2">
                What's the minimum age to surf?
              </h3>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-sans">
                The minimum age for group sessions is 8 years old, unless otherwise authorized by park management. Private sessions allow surfers as young as 6.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-[#00C8A0] mb-2">
                What's your cancellation policy?
              </h3>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-sans">
                Sessions canceled at least 30 days in advance receive a full refund. Cancellations between 14 days and 72 hours before your session receive park credit valid for one year. Cancellations within 72 hours are not eligible for a refund or credit.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-[#00C8A0] mb-2">
                Do I need my own equipment?
              </h3>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-sans">
                No — board and wetsuit rentals are available on-site for every session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Visit Component */}
      <Visit onOpenBooking={onOpenBooking} />
    </div>
  );
}
