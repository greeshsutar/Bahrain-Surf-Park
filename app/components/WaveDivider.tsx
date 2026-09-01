"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../constants/motion";

interface WaveDividerProps {
  fill?: string;
  className?: string;
  showGreenScrollLine?: boolean;
  greenLineColor?: string;
}

export default function WaveDivider({
  fill = "#061C27",
  className = "",
  showGreenScrollLine = false,
  greenLineColor = "#00C8A0",
}: WaveDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const greenLineRef = useRef<SVGPathElement>(null);
  const greenNodeRef = useRef<SVGCircleElement>(null);

  const waveCurvePath =
    "M 0 160 C 150 130, 300 130, 450 158 C 600 188, 730 198, 875 164 C 1020 130, 1160 128, 1300 150 C 1360 160, 1405 164, 1440 155";

  useEffect(() => {
    if (!showGreenScrollLine) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const line = greenLineRef.current;
    const node = greenNodeRef.current;
    if (!container || !line) return;

    if (isReducedMotion()) {
      gsap.set(line, { strokeDashoffset: 0 });
      return;
    }

    const totalLength = line.getTotalLength();
    gsap.set(line, { strokeDasharray: totalLength, strokeDashoffset: totalLength });

    // Initial position at left start
    if (node) {
      const startPt = line.getPointAtLength(0);
      gsap.set(node, { cx: startPt.x, cy: startPt.y });
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container.parentElement || container,
        start: "top 75%",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentOffset = totalLength * (1 - progress);
          gsap.set(line, { strokeDashoffset: currentOffset });

          if (node) {
            const pt = line.getPointAtLength(progress * totalLength);
            gsap.set(node, { cx: pt.x, cy: pt.y });
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [showGreenScrollLine]);

  return (
    <div
      ref={containerRef}
      className={`
        absolute
        left-0
        right-0
        -bottom-[2px]
        w-full
        h-[100px]
        sm:h-[120px]
        lg:h-[145px]
        z-20
        pointer-events-none
        overflow-hidden
        ${className}
      `}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="wave-shadow" x="-10%" y="-30%" width="120%" height="170%">
            <feDropShadow dx="0" dy="-5" stdDeviation="7" floodColor="#000000" floodOpacity="0.14" />
            <feDropShadow dx="0" dy="-2" stdDeviation="3" floodColor="#000000" floodOpacity="0.07" />
          </filter>

          <filter id="green-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={greenLineColor} floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor={greenLineColor} floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 1. Base Organic Wave Background Fill */}
        <path
          d={`
            ${waveCurvePath}
            L 1440 205
            L 0 205
            Z
          `}
          fill={fill}
          stroke="none"
          filter="url(#wave-shadow)"
        />

        {/* 2. Optional Green Scroll-Driven Animated Wave Curve & Node */}
        {showGreenScrollLine && (
          <>
            {/* Background Muted Track Line */}
            <path
              d={waveCurvePath}
              fill="none"
              stroke={greenLineColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />

            {/* Scroll-Driven Animated Bright Green Wave Stroke */}
            <path
              ref={greenLineRef}
              d={waveCurvePath}
              fill="none"
              stroke={greenLineColor}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#green-glow)"
            />

            {/* Scroll-Driven Travelling Glowing Green Node */}
            <circle
              ref={greenNodeRef}
              r="8"
              fill="#00E5B3"
              filter="url(#green-glow)"
              className="transition-transform duration-100"
            />
          </>
        )}
      </svg>
    </div>
  );
}
