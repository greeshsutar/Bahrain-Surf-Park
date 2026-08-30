"use client";

import { useState } from "react";
import { useBooking } from "../../context/BookingContext";

export default function SessionFinder() {
  const { onOpenBooking } = useBooking();
  const [q1, setQ1] = useState<string>("Never");
  const [q2, setQ2] = useState<string>("Learning to stand");
  const [q3, setQ3] = useState<string>("Learn");

  const calculateRecommendation = () => {
    if (q1 === "Never") return { level: "BEGINNER (WAVE 01)", desc: "Gentle 0.5–0.8m whitewater rolls. Focus on pop-up fundamentals and ocean safety with in-water instructors." };
    if (q1 === "A few times" && q2 === "Learning to stand") return { level: "NOVICE (WAVE 02)", desc: "Soft 0.8–1.2m open-face waves. Perfect for practicing board control and trimming down the line." };
    if (q2 === "Ride down the line" || q3 === "Progress") return { level: "PROGRESSIVE (WAVE 03)", desc: "Waist-high 1.2–1.5m peeling waves. Refine your take-offs, generate speed, and carving turns." };
    if (q2 === "Turn" || q3 === "Train") return { level: "INTERMEDIATE (WAVE 04)", desc: "Chest-high 1.5–1.8m faster peeling walls. Ideal for speed generation, cutbacks, and re-entries." };
    return { level: "EXPERT / ADVANCED (WAVE 05)", desc: "Head-high 1.8–2.2m barreling reef waves. Designed for heavy barrels and high-performance maneuvers." };
  };

  const rec = calculateRecommendation();

  return (
    <section className="bg-[#061F2B] text-white py-20 sm:py-28 relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
          INTERACTIVE MATCHMAKER
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
          WHAT LEVEL ARE YOU?
        </h2>

        <p className="text-white/80 text-sm sm:text-base font-sans max-w-xl mb-12">
          Answer 3 quick questions to discover your ideal starting point in the lagoon.
        </p>

        <div className="bg-[#082F3D] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
          
          {/* Question 1 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00C8A0] mb-3">
              1. Have you surfed before?
            </label>
            <div className="flex flex-wrap gap-3">
              {["Never", "A few times", "Regularly"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setQ1(opt)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    q1 === opt
                      ? "bg-[#00C8A0] text-[#061F2B] shadow-md"
                      : "bg-white/5 text-white border border-white/15 hover:bg-white/15"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00C8A0] mb-3">
              2. What can you currently do?
            </label>
            <div className="flex flex-wrap gap-3">
              {["Learning to stand", "Ride down the line", "Turn", "Surf confidently"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setQ2(opt)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    q2 === opt
                      ? "bg-[#00C8A0] text-[#061F2B] shadow-md"
                      : "bg-white/5 text-white border border-white/15 hover:bg-white/15"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00C8A0] mb-3">
              3. What are you looking for?
            </label>
            <div className="flex flex-wrap gap-3">
              {["Learn", "Progress", "Train", "Push my limits"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setQ3(opt)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    q3 === opt
                      ? "bg-[#00C8A0] text-[#061F2B] shadow-md"
                      : "bg-white/5 text-white border border-white/15 hover:bg-white/15"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Output Card */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/5 p-6 rounded-2xl">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/50 block mb-1">
                RECOMMENDED MATCH
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#00C8A0] mb-1">{rec.level}</h3>
              <p className="text-xs text-white/80 max-w-md font-sans">{rec.desc}</p>
            </div>

            <button
              onClick={() => onOpenBooking(rec.level.split(" ")[0])}
              className="bg-[#00C8A0] hover:bg-[#00B590] text-[#061F2B] font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shrink-0 cursor-pointer"
            >
              EXPLORE YOUR WAVE →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
