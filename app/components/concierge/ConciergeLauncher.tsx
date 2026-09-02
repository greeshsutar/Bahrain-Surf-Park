"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getPageContext } from "../../constants/conciergeData";

interface ConciergeLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpen: () => void;
}

export default function ConciergeLauncher({ isOpen, onToggle, onOpen }: ConciergeLauncherProps) {
  const pathname = usePathname();
  const contextConfig = getPageContext(pathname);

  const [showProactiveGreeting, setShowProactiveGreeting] = useState(false);
  const [robotReacting, setRobotReacting] = useState(false);

  // Proactive Greeting Logic (4.5s delay, once per session)
  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem("bsp_concierge_greeting_shown");
    if (hasBeenShown === "true" || isOpen) return;

    const timer = setTimeout(() => {
      const alreadyOpened = sessionStorage.getItem("bsp_concierge_greeting_shown");
      if (alreadyOpened !== "true" && !isOpen) {
        setShowProactiveGreeting(true);
        setRobotReacting(true);
        sessionStorage.setItem("bsp_concierge_greeting_shown", "true");

        setTimeout(() => setRobotReacting(false), 800);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide greeting when chat panel opens
  useEffect(() => {
    if (isOpen) {
      setShowProactiveGreeting(false);
      sessionStorage.setItem("bsp_concierge_greeting_shown", "true");
    }
  }, [isOpen]);

  const handleDismissGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProactiveGreeting(false);
    sessionStorage.setItem("bsp_concierge_greeting_shown", "true");
  };

  const handleGreetingClick = () => {
    setShowProactiveGreeting(false);
    sessionStorage.setItem("bsp_concierge_greeting_shown", "true");
    onOpen();
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 lg:bottom-[28px] lg:right-[28px] z-[9999] flex flex-col items-end gap-2.5 pointer-events-none">
      
      {/* 11 & 12. Proactive Conversational Speech Bubble (Positioned ABOVE and pointing to the robot) */}
      {showProactiveGreeting && !isOpen && (
        <div
          onClick={handleGreetingClick}
          className="pointer-events-auto cursor-pointer relative mb-1.5 w-[260px] sm:w-[290px] p-3.5 sm:p-4 rounded-2xl bg-[#F7F7F3] text-[#062B36] border border-[#0B7FB5]/25 shadow-xl shadow-[#0A1926]/10 transition-all duration-300 hover:border-[#00C8A0] hover:-translate-y-1 group/bubble animate-greeting-appear"
        >
          {/* Speech Bubble Pointer Tail pointing down toward robot launcher */}
          <div className="absolute -bottom-1.5 right-7 w-3.5 h-3.5 bg-[#F7F7F3] border-r border-b border-[#0B7FB5]/25 rotate-45 pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                SURF CONCIERGE
              </span>
            </div>
            {/* Dismiss Button */}
            <button
              onClick={handleDismissGreeting}
              aria-label="Dismiss greeting"
              className="text-slate-400 hover:text-[#062B36] text-xs font-bold transition-colors p-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Contextual Message Text (No quotation marks, clean typography) */}
          <p className="text-xs sm:text-[13px] font-medium text-[#062B36] leading-relaxed font-sans mb-2">
            {contextConfig.proactiveGreeting}
          </p>

          {/* Lightweight CTA Action */}
          <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#00C8A0] group-hover/bubble:text-[#0B7FB5] transition-colors">
            <span>FIND YOUR WAVE</span>
            <span className="transition-transform duration-300 group-hover/bubble:translate-x-1">→</span>
          </div>
        </div>
      )}

      {/* Main Square Launcher Row */}
      <div className="pointer-events-auto group flex items-center gap-3 relative">
        
        {/* 9. Separate Hover Tooltip Label (Launcher stays square!) */}
        <div
          className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1926]/95 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-widest border border-[#0B7FB5]/30 shadow-lg pointer-events-none transition-all duration-300 ${
            isOpen ? "opacity-0 translate-x-2 pointer-events-none" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
          <span>SURF CONCIERGE</span>
        </div>

        {/* 3. Rounded Square Launcher Button (72x72 Desktop, 68x68 Tablet, 64x64 Mobile) */}
        <button
          onClick={onToggle}
          aria-label={isOpen ? "Close Surf Concierge" : "Open Surf Concierge"}
          aria-expanded={isOpen}
          className={`relative flex items-center justify-center rounded-[16px] aspect-square transition-all duration-300 cursor-pointer shadow-xl focus:outline-none focus:ring-2 focus:ring-[#00C8A0]/60 overflow-hidden ${
            /* Target dimensions: 64x64 mobile, 68x68 tablet, 72x72 desktop */
            "w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] lg:w-[72px] lg:h-[72px]"
          } ${
            isOpen
              ? "bg-[#0A1926] text-white border-2 border-[#00C8A0]/60"
              : "bg-[#0A1926] border border-[#00C8A0]/30 hover:border-[#00C8A0] hover:ring-2 hover:ring-[#00C8A0]/40 group-hover:-translate-y-1 shadow-md hover:shadow-2xl hover:shadow-[#00C8A0]/20"
          }`}
        >
          {isOpen ? (
            /* Close State: Clean X Icon */
            <svg className="w-6 h-6 transition-transform duration-300 hover:rotate-90 text-[#00C8A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Open State: Robot Character Launcher */
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0A1926] to-[#0D2B3E] overflow-hidden">

              {/* Subtle radial glow behind robot */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-[#00C8A0]/20 blur-md" />
              </div>

              {/* Robot Character */}
              <div
                className={`relative z-10 w-[80%] h-[80%] flex items-center justify-center animate-robot-float transition-transform duration-300 ${
                  robotReacting ? "-translate-y-1.5" : ""
                }`}
              >
                <svg
                  viewBox="0 0 56 62"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-[1.06]"
                  aria-label="Surf Concierge Robot"
                >
                  {/* Antenna */}
                  <line x1="28" y1="7" x2="28" y2="13" stroke="#0B7FB5" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="28" cy="5" r="2.5" fill="#00C8A0"/>

                  {/* Head */}
                  <rect x="14" y="13" width="28" height="20" rx="7" fill="white" stroke="#C8E8F0" strokeWidth="1.5"/>

                  {/* Eyes */}
                  <circle cx="22" cy="23" r="4" fill="#0B7FB5"/>
                  <circle cx="34" cy="23" r="4" fill="#0B7FB5"/>
                  <circle cx="22" cy="23" r="2.2" fill="#00C8A0"/>
                  <circle cx="34" cy="23" r="2.2" fill="#00C8A0"/>
                  <circle cx="23" cy="22" r="0.8" fill="white"/>
                  <circle cx="35" cy="22" r="0.8" fill="white"/>

                  {/* Mouth / panel */}
                  <rect x="22" y="29" width="12" height="2.5" rx="1.25" fill="#C8E8F0"/>

                  {/* Neck */}
                  <rect x="25" y="33" width="6" height="3" rx="1.5" fill="#D0EAF0"/>

                  {/* Body */}
                  <rect x="12" y="36" width="32" height="20" rx="8" fill="white" stroke="#C8E8F0" strokeWidth="1.5"/>

                  {/* Chest badge */}
                  <rect x="21" y="42" width="14" height="8" rx="3" fill="#0B7FB5"/>
                  <circle cx="25" cy="46" r="1.5" fill="#00C8A0"/>
                  <circle cx="28" cy="46" r="1.5" fill="#00E5B3"/>
                  <circle cx="31" cy="46" r="1.5" fill="#00C8A0"/>

                  {/* Arms */}
                  <rect x="3" y="37" width="9" height="14" rx="4.5" fill="white" stroke="#C8E8F0" strokeWidth="1.5"/>
                  <rect x="44" y="37" width="9" height="14" rx="4.5" fill="white" stroke="#C8E8F0" strokeWidth="1.5"/>

                  {/* Hand dots */}
                  <circle cx="7.5" cy="53" r="1.5" fill="#C8E8F0"/>
                  <circle cx="48.5" cy="53" r="1.5" fill="#C8E8F0"/>

                  <defs>
                    <filter id="robot-glow">
                      <feGaussianBlur stdDeviation="1.5" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                </svg>
              </div>

              {/* Shadow under robot */}
              <div className="absolute bottom-1 z-0 w-8 h-1.5 rounded-full bg-[#0A1926]/15 blur-sm animate-robot-shadow pointer-events-none" />
            </div>
          )}
        </button>
      </div>

    </div>
  );
}
