"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";

interface CardData {
  id: string;
  image: string;
  tag: string;
  title: string;
  alt: string;
}

const COLUMN_1_CARDS: CardData[] = [
  {
    id: "col1-1",
    image: "/images/cabanas.jpg",
    tag: "PRIVATE HAVEN",
    title: "Beachside Cabana Lounging",
    alt: "Beachside Luxury Cabanas",
  },
  {
    id: "col1-2",
    image: "/images/tier5.jpg",
    tag: "LAGOON SANCTUARY",
    title: "VIP Waterline Cabana Suites",
    alt: "VIP Waterline Cabanas",
  },
  {
    id: "col1-3",
    image: "/images/tier2.jpg",
    tag: "OCEAN VISTA",
    title: "Resort Lagoon Terrace",
    alt: "Resort Lagoon Terrace",
  },
];

const COLUMN_2_CARDS: CardData[] = [
  {
    id: "col2-1",
    image: "/images/dining.jpg",
    tag: "CULINARY ESCAPE",
    title: "Coastal Lagoon Dining",
    alt: "Coastal Dining & Lounge",
  },
  {
    id: "col2-2",
    image: "/images/tier4.jpg",
    tag: "SUNSET LOUNGE",
    title: "Firepit & Cocktail Deck",
    alt: "Sunset Lounge & Firepit",
  },
  {
    id: "col2-3",
    image: "/images/tier1.jpg",
    tag: "BEACHFRONT REST",
    title: "Shaded Palm Hammocks",
    alt: "Beachfront Shaded Hammocks",
  },
];

export default function Cabanas() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const reduced = isReducedMotion();

    if (!reduced) {
      const animElements = section.querySelectorAll(".cabanas-animate");
      gsap.fromTo(
        animElements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          stagger: MOTION.STAGGER,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      const animElements = section.querySelectorAll(".cabanas-animate");
      gsap.set(animElements, { opacity: 1, y: 0 });
    }

    return () => {
      ScrollTrigger.getAll().filter((st) => st.trigger === section).forEach((st) => st.kill());
    };
  }, []);

  // Desktop Mouse Parallax for Image Gallery
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 35;
      const y = (e.clientY - rect.top - rect.height / 2) / 35;
      setMouseOffset({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cabanas"
      className="bg-white py-16 sm:py-24 relative z-10 overflow-hidden border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 1. Left Column: Fixed Editorial Anchor */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center relative z-20">
            {/* Typographic Eyebrow */}
            <span className="cabanas-animate text-[#0B7FB5] text-xs font-extrabold tracking-[0.2em] uppercase mb-4 block">
              BEYOND THE WAVES
            </span>
            {/* Headline (Playfair Display) */}
            <h2 className="cabanas-animate font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#0A1926] leading-[1.14] tracking-tight mb-6">
              Beachside Cabanas & Coastal Dining
            </h2>
            {/* Intro copy */}
            <p className="cabanas-animate text-[#0A1926]/80 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Experience the complete island escape. Settle into our private luxury cabanas or enjoy premium beachside dining, crafted to provide the ultimate relaxation off the board.
            </p>
            
            {/* Action Button */}
            <div className="cabanas-animate flex">
              <a
                href="#visit"
                onClick={(e) => handleNavClick(e, "#visit")}
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="bg-[#0B7FB5] hover:bg-[#0077B6] text-white px-8 py-4 rounded-lg text-xs font-extrabold uppercase tracking-widest transition-all inline-flex items-center gap-2.5 cursor-pointer shadow-md"
              >
                <span>RESERVE AN EXPERIENCE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 2 & 3. Right Column: Continuous Vertical Motion Gallery System */}
          <div
            ref={galleryRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 relative h-[540px] sm:h-[580px] lg:h-[620px] overflow-hidden rounded-3xl bg-[#F8FAFC] border border-slate-100 shadow-inner group/gallery hover-pause-track"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            
            {/* 9. Top & Bottom Edge Bleed Fade Masks */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20 pointer-events-none" />

            {/* Dual Column Opposing Flow Container */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 p-4 h-full relative z-10">
              
              {/* Column 1: Moves UP continuously */}
              <div className="relative overflow-hidden h-full">
                <div className="animate-vertical-up flex flex-col gap-5 sm:gap-6">
                  {/* Duplicate 2x for seamless 100% infinite recycling loop */}
                  {[...COLUMN_1_CARDS, ...COLUMN_1_CARDS].map((card, idx) => (
                    <div
                      key={`col1-${idx}`}
                      className="group relative w-full h-[360px] sm:h-[390px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#F1F5F9] shrink-0 transition-transform duration-500 hover:scale-[1.03] cursor-pointer"
                    >
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                      
                      {/* Text Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-white text-left">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">
                          {card.tag}
                        </span>
                        <span className="font-serif text-sm sm:text-base font-bold leading-tight block">
                          {card.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Moves DOWN continuously (Staggered offset) */}
              <div className="relative overflow-hidden h-full pt-8 sm:pt-12">
                <div className="animate-vertical-down flex flex-col gap-5 sm:gap-6">
                  {/* Duplicate 2x for seamless 100% infinite recycling loop */}
                  {[...COLUMN_2_CARDS, ...COLUMN_2_CARDS].map((card, idx) => (
                    <div
                      key={`col2-${idx}`}
                      className="group relative w-full h-[360px] sm:h-[390px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#F1F5F9] shrink-0 transition-transform duration-500 hover:scale-[1.03] cursor-pointer"
                    >
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                      
                      {/* Text Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-white text-left">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-1">
                          {card.tag}
                        </span>
                        <span className="font-serif text-sm sm:text-base font-bold leading-tight block">
                          {card.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 16. Minimal Right-Side Gallery Progress Indicator */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2 pointer-events-none">
              <span className="w-1 h-8 rounded-full bg-[#0B7FB5]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
              <span className="w-1 h-8 rounded-full bg-[#0B7FB5]/40" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
