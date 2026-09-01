"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const FAQ_CATEGORIES = [
  {
    id: "what-to-bring",
    label: "WHAT TO BRING",
    questions: [
      {
        q: "What should I bring to my session?",
        a: "Bring proper swimwear, a towel, reef-safe sun protection, and dry clothes for after your session. Standard boards and safety equipment are included with your booking, along with personal locker and changing suite access.",
      },
      {
        q: "Do I need to bring my own board?",
        a: "No. Soft-top boards are provided for Beginner and Novice sessions. Experienced surfers may bring their own boards or upgrade to high-performance demo fleet options at the Surf Center.",
      },
    ],
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    questions: [
      {
        q: "Do I need prior surfing experience?",
        a: "Not at all. Our lagoon features calibrated beginner wave profiles and ISA-certified coaching designed specifically for first-timers, alongside progressively challenging waves for intermediate and expert riders.",
      },
      {
        q: "What is the minimum age to surf?",
        a: "The minimum age for group sessions is 8 years old, unless otherwise authorized by park management. Private sessions allow surfers as young as 6.",
      },
    ],
  },
  {
    id: "equipment",
    label: "EQUIPMENT",
    questions: [
      {
        q: "Are wetsuits and surfboards provided?",
        a: "Yes, soft-top boards and essential gear are provided for Beginner and Novice sessions. Surfers can also bring their own boards or upgrade to high-performance demo fleet options at our Surf Center.",
      },
      {
        q: "Are lockers and changing facilities available?",
        a: "Yes. Every booking includes access to a private changing suite and secure personal locker. Hot showers and restrooms are also available on-site.",
      },
    ],
  },
  {
    id: "weather",
    label: "WEATHER & POLICIES",
    questions: [
      {
        q: "What happens if the weather conditions change?",
        a: "Unlike open ocean breaks, our electro-mechanical Wavegarden Cove generator operates in standard weather conditions. In the event of lightning or severe wind, sessions will be rescheduled in accordance with park safety policies.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Sessions canceled at least 30 days in advance receive a full refund. Cancellations between 14 days and 72 hours before your session receive park credit valid for one year. Cancellations within 72 hours are not eligible for a refund or credit.",
      },
    ],
  },
  {
    id: "booking",
    label: "BOOKING",
    questions: [
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 2–4 weeks in advance for peak times. Limited walk-up availability may exist but cannot be guaranteed.",
      },
      {
        q: "Can I modify my booking after confirming?",
        a: "Yes, modifications are possible up to 72 hours before your session subject to availability. Contact Guest Services for assistance.",
      },
    ],
  },
  {
    id: "spectators",
    label: "SPECTATORS",
    questions: [
      {
        q: "Can friends and family watch?",
        a: "Yes. Spectators are welcome at the designated viewing deck and beachside lounge. There is no charge for spectator access.",
      },
      {
        q: "Is there food and beverage available?",
        a: "The beachside lounge offers a selection of refreshments and light bites. Full dining options are available at the park's restaurant.",
      },
    ],
  },
];

export default function VisitFAQ() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-faq-anim",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          stagger: MOTION.STAGGER,
          ease: MOTION.ENTRANCE_EASE,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleCategory = (idx: number) => {
    setOpenCategory(openCategory === idx ? null : idx);
    setOpenQuestion(null);
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const activeCategory = openCategory !== null ? FAQ_CATEGORIES[openCategory] : null;

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-[#061C27] text-white py-24 sm:py-32 relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Category Navigation */}
          <div className="lg:col-span-4 text-left flex flex-col justify-start visit-faq-anim">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.08] tracking-tight mb-8">
              Before You<br />Paddle Out<span className="text-[#00C8A0]">.</span>
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans mb-10">
              Select a category to explore common questions about preparing for your session, equipment, policies, and more.
            </p>

            <nav className="flex flex-col gap-2" aria-label="FAQ categories">
              {FAQ_CATEGORIES.map((category, idx) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(idx)}
                  className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 text-sm font-medium ${
                    openCategory === idx
                      ? "bg-[#00C8A0]/15 border border-[#00C8A0]/30 text-[#00C8A0]"
                      : "bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/20"
                  }`}
                  aria-expanded={openCategory === idx}
                >
                  <span className="text-xs font-extrabold uppercase tracking-[0.1em] block mb-1">
                    {category.label}
                  </span>
                  <span className="text-xs text-white/50">
                    {category.questions.length} questions
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* RIGHT COLUMN: Questions Accordion */}
          <div className="lg:col-span-8 text-left">
            {activeCategory ? (
              <div className="visit-faq-anim space-y-3 border-t border-white/15 pt-6">
                {activeCategory.questions.map((faq: { q: string; a: string }, idx: number) => {
                  const isOpen = openQuestion === faq.q;
                  return (
                    <div key={faq.q} className="group">
                      <button
                        onClick={() => toggleQuestion(faq.q)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${activeCategory.id}-${idx}`}
                        className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer py-5 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <span className="font-sans font-medium text-base sm:text-lg text-white pr-4 transition-colors">
                          {faq.q}
                        </span>

                        <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00C8A0] text-xl font-light transition-all duration-300 shrink-0 group-hover:bg-[#00C8A0] group-hover:text-[#061C27] group-hover:border-[#00C8A0]">
                          <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                            +
                          </span>
                        </span>
                      </button>

                      <div
                        id={`faq-answer-${activeCategory.id}-${idx}`}
                        role="region"
                        aria-label={faq.q}
                        className={`grid transition-all duration-400 ease-in-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden px-4">
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl pb-4">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="visit-faq-anim text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
                <svg className="w-16 h-16 mx-auto text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.5-2.9 2.5H7.772c-.549 1.165-2.03 2-3.772 2-2.21 0-4-1.343-4-3 0-1.4 1.278-2.5 2.9-2.5h1.428z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.626 9c.549 1.165-2.03 2-3.772 2-2.21 0-4-1.343-4-3 0-1.4 1.278-2.5 2.9-2.5h1.428c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.5-2.9 2.5H18.054c-.549 1.165-2.03 2-3.772 2-2.21 0-4-1.343-4-3 0-1.4 1.278-2.5 2.9-2.5H16.626z" />
                </svg>
                <p className="text-white/70 text-sm sm:text-base font-sans">
                  Select a category on the left to view frequently asked questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}