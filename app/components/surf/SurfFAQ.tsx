"use client";

const FAQS = [
  {
    q: "What's the minimum age to surf?",
    a: "The minimum age for group sessions is 8 years old, unless otherwise authorized by park management. Private sessions allow surfers as young as 6.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Sessions canceled at least 30 days in advance receive a full refund. Cancellations between 14 days and 72 hours before your session receive park credit valid for one year. Cancellations within 72 hours are not eligible for a refund or credit.",
  },
  {
    q: "Do I need my own equipment?",
    a: "No — soft-top boards and essential safety gear are provided for all Beginner and Novice sessions. High-performance demo fleet rentals are available on-site.",
  },
  {
    q: "When should I arrive for my session?",
    a: "Please check in at the reception desk 45 minutes prior to your scheduled session time for equipment fitting and the mandatory safety briefing.",
  },
];

export default function SurfFAQ() {
  return (
    <section className="bg-[#082F3D] text-white py-14 sm:py-20 relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
          PRACTICAL INFORMATION
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-12">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-[#00C8A0] mb-2">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
