"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../../constants/motion";
import WaveDivider from "../WaveDivider";

export default function ServicesCinematicExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#02141C] text-white overflow-hidden z-10"
    >
      {/* Visual Breathing Moment Frame */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[75vh] min-h-[460px] overflow-hidden">
        <img
          ref={imgRef}
          src="/images/dining.jpg"
          alt="Bahrain Surf Park Experience"
          className="w-full h-[125%] object-cover object-center filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02141C]/60 via-[#02141C]/40 to-transparent flex items-center justify-center p-6 text-center z-10 pb-28">
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl drop-shadow-2xl">
            DESIGNED AROUND YOUR EXPERIENCE<span className="text-[#00C8A0]">.</span>
          </h3>
        </div>

        {/* Large Asymmetric Ocean Swell Wave Divider overlapping bottom of image */}
        <WaveDivider fill="#02141C" variant="services-ocean" />
      </div>
    </section>
  );
}
