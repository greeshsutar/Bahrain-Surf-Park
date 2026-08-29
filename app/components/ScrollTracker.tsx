"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WAYPOINTS = [
  { id: "#hero", label: "01. Home / Ocean Crest" },
  { id: "#technology", label: "02. Wavegarden Cove Tech" },
  { id: "#find-your-wave", label: "03. Wave Profiles & Tiers" },
  { id: "#academy", label: "04. Club Hawaii Academy" },
  { id: "#cabanas", label: "05. Cabanas & Dining" },
  { id: "#visit", label: "06. Plan Your Visit" },
];

export default function ScrollTracker() {
  const [activeTarget, setActiveTarget] = useState("#hero");
  const [isVisible, setIsVisible] = useState(false);
  const surfboardRef = useRef<HTMLDivElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const techSection = document.getElementById("technology");
    if (!techSection || !surfboardRef.current || !trackLineRef.current) return;

    // 1. Visibility check
    const checkVisibility = () => {
      const techRect = techSection.getBoundingClientRect();
      if (techRect.top <= window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });

    const visTrigger = ScrollTrigger.create({
      trigger: techSection,
      start: "top 80%",
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    // 2. Vertical surfboard motion
    const trackHeight = trackLineRef.current.offsetHeight - 44;

    const surfboardTween = gsap.to(surfboardRef.current, {
      y: trackHeight,
      ease: "none",
      scrollTrigger: {
        trigger: techSection,
        start: "top 70%",
        endTrigger: "body",
        end: "bottom bottom",
        scrub: 1.0,
        invalidateOnRefresh: true,
      },
    });

    // 3. Section waypoint tracking
    const waypointTriggers: ScrollTrigger[] = [];

    WAYPOINTS.forEach((wp) => {
      const el = document.querySelector(wp.id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveTarget(wp.id),
        onEnterBack: () => setActiveTarget(wp.id),
      });
      waypointTriggers.push(trigger);
    });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      visTrigger.kill();
      surfboardTween.kill();
      waypointTriggers.forEach((t) => t.kill());
    };
  }, []);

  const handleWaypointClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnterDot = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1.35, duration: 0.3, ease: "back.out(1.4)", overwrite: "auto" });
  };

  const handleMouseLeaveDot = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <aside
      className={`tracker-container hidden md:flex flex-col items-center select-none ${
        isVisible ? "tracker-visible" : ""
      }`}
      aria-label="Section Navigation Progress"
    >
      <div
        id="tracker-line"
        ref={trackLineRef}
        className="tracker-line-bg flex flex-col justify-between items-center py-2"
      >
        {/* Moving Vector Surfboard SVG Tracker */}
        <div
          id="tracker-surfboard"
          ref={surfboardRef}
          className="z-20 pointer-events-none"
        >
          <svg
            className="w-9 h-14 drop-shadow-[0_6px_12px_rgba(10,25,38,0.22)]"
            viewBox="0 0 28 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 14 2 C 22 12, 24 34, 14 46 C 4 34, 6 12, 14 2 Z"
              fill="#0B7FB5"
              stroke="#063B45"
              strokeWidth="1.8"
            />
            <line
              x1="14"
              y1="4"
              x2="14"
              y2="44"
              stroke="#00C8A0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M 11 41 L 17 41 L 14 46 Z" fill="#063B45" />
          </svg>
        </div>

        {/* 6 Waypoint Dots */}
        {WAYPOINTS.map((wp) => {
          const isActive = activeTarget === wp.id;
          return (
            <div
              key={wp.id}
              onClick={(e) => handleWaypointClick(e, wp.id)}
              onMouseEnter={handleMouseEnterDot}
              onMouseLeave={handleMouseLeaveDot}
              data-target={wp.id}
              className={`waypoint-dot transition-all duration-300 z-10 rounded-full ${
                isActive
                  ? "active-waypoint w-3.5 h-3.5 bg-[#00C8A0] ring-4 ring-[#00C8A0]/25 shadow-md"
                  : "w-2.5 h-2.5 bg-slate-300 hover:scale-125"
              }`}
            >
              <span className="waypoint-tooltip">{wp.label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
