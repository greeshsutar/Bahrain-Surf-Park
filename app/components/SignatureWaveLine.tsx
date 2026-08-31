"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../constants/motion";

interface SignatureWaveLineProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  showNode?: boolean;
}

export default function SignatureWaveLine({
  className = "",
  strokeColor = "#00C8A0",
  strokeWidth = 1.5,
  showNode = true,
}: SignatureWaveLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const reduced = isReducedMotion();
    const length = path.getTotalLength();

    if (!reduced) {
      // Set path stroke dash array to animate drawing
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const tween = gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 0.8,
        },
      });

      // Animate travelling node along path
      let nodeTween: gsap.core.Tween | null = null;
      if (showNode && nodeRef.current) {
        const node = nodeRef.current;
        const progressObj = { val: 0 };

        nodeTween = gsap.to(progressObj, {
          val: 1,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            end: "bottom 20%",
            scrub: 0.8,
          },
          onUpdate: () => {
            const pt = path.getPointAtLength(progressObj.val * length);
            node.setAttribute("cx", pt.x.toString());
            node.setAttribute("cy", pt.y.toString());
          },
        });
      }

      return () => {
        tween.kill();
        if (nodeTween) nodeTween.kill();
      };
    } else {
      gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
    }
  }, [showNode]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-auto block"
        viewBox="0 0 1200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="sigNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={strokeColor} floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Thin Hydrodynamic Wave Trajectory Line */}
        <path
          ref={pathRef}
          d="M 0 40 C 150 15, 300 65, 450 35 C 600 5, 750 70, 900 40 C 1050 10, 1150 50, 1200 35"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeOpacity="0.8"
          strokeLinecap="round"
        />

        {/* Travelling Node Marker */}
        {showNode && (
          <circle
            ref={nodeRef}
            cx="0"
            cy="40"
            r="4"
            fill={strokeColor}
            filter="url(#sigNodeGlow)"
          />
        )}
      </svg>
    </div>
  );
}
