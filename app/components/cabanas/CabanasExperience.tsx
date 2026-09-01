"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "../../constants/motion";

const SCENES = [
  {
    num: "01",
    tag: "PRIVATE",
    title: "EXCLUSIVE SUITES",
    desc: "Climate-controlled indoor spaces, natural teak wood sun decks, custom cream linen loungers, and private changing rooms.",
    img: "/images/cabanas.jpg",
  },
  {
    num: "02",
    tag: "RELAX",
    title: "PERSONAL BUTLER & AMENITIES",
    desc: "Dedicated butler service, chilled facial towels, cold-pressed juices, tropical fruit platters, and private outdoor rain showers.",
    img: "/images/cabanas/cabanas_private_haven.jpg",
  },
  {
    num: "03",
    tag: "CONNECT",
    title: "FIREPIT & SUNSET DECK",
    desc: "Lagoon-front lounge firepits, artisanal cocktail service, coastal dining menus, and front-row seats for evening golden hour.",
    img: "/images/cabanas/cabanas_day_journey.jpg",
  },
];

export default function CabanasExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".exp-header-anim",
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

      // Scene Card reveals
      SCENES.forEach((_, idx) => {
        const sceneEl = document.getElementById(`exp-scene-${idx}`);
        if (sceneEl) {
          gsap.fromTo(
            sceneEl,
            { opacity: 0, y: 40, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: MOTION.ENTRANCE_DURATION,
              ease: MOTION.ENTRANCE_EASE,
              scrollTrigger: {
                trigger: sceneEl,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cabana-experience"
      className="bg-[#061C27] text-white py-24 sm:py-32 relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
        
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="exp-header-anim text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            THE EMOTIONAL CORE
          </span>

          <h2 className="exp-header-anim font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.08] mb-4">
            MORE THAN A PLACE TO SIT<span className="text-[#00C8A0]">.</span>
          </h2>

          <p className="exp-header-anim text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Designed for seamless transitions between high-energy wave sessions and quiet lagoon-side relaxation.
          </p>
        </div>

        {/* 3 Sequential Immersive Scenes */}
        <div className="space-y-24">
          {SCENES.map((sc, idx) => (
            <div
              key={sc.num}
              id={`exp-scene-${idx}`}
              className="relative w-full h-[65vh] sm:h-[72vh] rounded-[32px] overflow-hidden border border-white/15 shadow-2xl group flex flex-col justify-end p-8 sm:p-14"
            >
              {/* Background Visual */}
              <img
                src={sc.img}
                alt={sc.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter contrast-[103%]"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02141C] via-[#02141C]/50 to-transparent pointer-events-none" />

              {/* Scene Content */}
              <div className="relative z-10 max-w-2xl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono font-bold text-[#00C8A0] bg-[#061C27]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    SCENE {sc.num}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B7FB5]">
                    {sc.tag}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {sc.title}
                </h3>

                <p className="text-slate-200 text-xs sm:text-base font-sans leading-relaxed">
                  {sc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
