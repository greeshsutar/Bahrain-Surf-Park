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
      className="relative w-full bg-[#061C27] text-white overflow-hidden z-10 pt-20"
    >
      {/* Visual Breathing Moment Frame */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden my-0">
        <img
          ref={imgRef}
          src="/images/services/services_hero.jpg"
          alt="Bahrain Surf Park Experience"
          className="w-full h-[120%] object-cover object-center filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061C27]/90 via-[#061C27]/40 to-[#061C27]/80 flex items-center justify-center p-6 text-center">
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl drop-shadow-lg">
            DESIGNED AROUND YOUR EXPERIENCE<span className="text-[#00C8A0]">.</span>
          </h3>
        </div>
      </div>

      {/* Organic Wave Divider Transitioning into Deep Dark Ocean CTA */}
      <WaveDivider fill="#02141C" />
    </section>
  );
}
