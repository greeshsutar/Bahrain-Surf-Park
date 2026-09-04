"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getPageContext } from "../../constants/conciergeData";
import { useLanguage } from "../../context/LanguageContext";

interface ConciergeLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpen: () => void;
}

export default function ConciergeLauncher({ isOpen, onToggle, onOpen }: ConciergeLauncherProps) {
  const pathname = usePathname();
  const contextConfig = getPageContext(pathname);
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

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
    <div className={`fixed bottom-5 ${isRtl ? "left-5 sm:left-6 lg:left-[28px] items-start" : "right-5 sm:right-6 lg:right-[28px] items-end"} z-[9999] flex flex-col gap-2.5 pointer-events-none`}>
      
      {/* 1. Proactive Conversational Speech Bubble (Positioned ABOVE the robot) */}
      {showProactiveGreeting && !isOpen && (
        <div
          onClick={handleGreetingClick}
          className="pointer-events-auto cursor-pointer relative mb-1.5 w-[270px] sm:w-[300px] p-4 rounded-2xl bg-[#F7F7F3] text-[#0A1926] border border-[#00C8A0]/30 shadow-2xl shadow-[#0A1926]/20 transition-all duration-300 hover:border-[#00C8A0] hover:-translate-y-1 group/bubble animate-greeting-appear font-sans"
        >
          {/* Speech Bubble Pointer Tail pointing down toward robot launcher */}
          <div className={`absolute -bottom-1.5 ${isRtl ? "left-7" : "right-7"} w-3.5 h-3.5 bg-[#F7F7F3] border-r border-b border-[#00C8A0]/30 rotate-45 pointer-events-none`} />

          {/* Header */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
              <span className={`text-[9.5px] font-extrabold text-[#00C8A0] ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-[0.2em]"}`}>
                {isRtl ? "كونسيرج ركوب الأمواج" : "SURF CONCIERGE"}
              </span>
            </div>
            {/* Dismiss Button */}
            <button
              onClick={handleDismissGreeting}
              aria-label="Dismiss greeting"
              className="text-slate-400 hover:text-[#0A1926] text-xs font-bold transition-colors p-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Contextual Message Text */}
          <p className="text-xs sm:text-[13px] font-medium text-[#0A1926] leading-relaxed font-sans mb-2.5">
            {isRtl
              ? "مرحبًا بك في حديقة البحرين لركوب الأمواج! أنا كونسيرج ركوب الأمواج، كيف يمكنني مساعدتك اليوم؟"
              : contextConfig.proactiveGreeting}
          </p>

          {/* Lightweight CTA Action */}
          <div className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold text-[#00C8A0] group-hover/bubble:text-[#0B7FB5] transition-colors">
            <span>{isRtl ? "تحدث مع الكونسيرج" : "FIND YOUR WAVE"}</span>
            <span className="transition-transform duration-300 group-hover/bubble:translate-x-1">{isRtl ? "←" : "→"}</span>
          </div>
        </div>
      )}

      {/* Main Square Launcher Row */}
      <div className="pointer-events-auto group flex items-center gap-3 relative">
        
        {/* Hover Tooltip Label */}
        <div
          className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1926]/95 backdrop-blur-md text-white text-[10.5px] font-extrabold border border-[#00C8A0]/30 shadow-xl pointer-events-none transition-all duration-300 ${
            isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
          } ${
            isOpen ? "opacity-0 translate-x-2 pointer-events-none" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
          <span>{isRtl ? "كونسيرج ركوب الأمواج" : "SURF CONCIERGE"}</span>
        </div>

        {/* Breathing Aura Glow Behind Launcher */}
        {!isOpen && (
          <div className="absolute -inset-1.5 rounded-[22px] bg-[#00C8A0]/20 blur-md opacity-30 animate-pulse pointer-events-none" />
        )}

        {/* Launcher Button (64x64 mobile, 68x68 tablet, 72x72 desktop) */}
        <button
          onClick={onToggle}
          aria-label={isOpen ? "Close Surf Concierge" : "Open Surf Concierge"}
          aria-expanded={isOpen}
          className={`relative flex items-center justify-center rounded-[18px] aspect-square transition-all duration-300 cursor-pointer shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#00C8A0]/60 overflow-hidden ${
            "w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] lg:w-[72px] lg:h-[72px]"
          } ${
            isOpen
              ? "bg-[#0A1926] text-white border-2 border-[#00C8A0]"
              : "bg-[#0A1926] border border-[#00C8A0]/35 hover:border-[#00C8A0] group-hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,200,160,0.25)]"
          }`}
        >
          {isOpen ? (
            /* Close State: Clean X Icon */
            <svg className="w-6 h-6 transition-transform duration-300 hover:rotate-90 text-[#00C8A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Closed State: Minimalist Wave Concierge Brand Mark */
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#071923] via-[#082332] to-[#041219] overflow-hidden">
              {/* Subtle Soft Ambient Backlight */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-9 h-9 rounded-full bg-[#00C8A0]/15 blur-lg transition-opacity duration-300 group-hover:opacity-100 opacity-50" />
              </div>

              {/* Wave Concierge Symbol Container */}
              <div
                className={`relative z-10 flex items-center justify-center transition-all duration-200 ${
                  robotReacting ? "-translate-y-0.5 scale-105" : "group-hover:scale-[1.04]"
                }`}
              >
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300"
                  aria-label="Surf Concierge"
                >
                  <defs>
                    <linearGradient id="conciergeBubbleGrad" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#F4F7F5" />
                      <stop offset="100%" stopColor="#5DE4D0" />
                    </linearGradient>
                    <filter id="luxuryConciergeGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#00C8A0" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* Primary Hero: Coastal Dialogue Bubble Silhouette */}
                  <path
                    d="M 14 35 C 9.5 31 8.5 21 15 14.5 C 21.5 8 32.5 9 36.5 15.5 C 41 22 39 30.5 32.5 34.5 L 32.5 39.5 L 26 35.5 C 21.5 37 17 37 14 35 Z"
                    stroke="url(#conciergeBubbleGrad)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#luxuryConciergeGlow)"
                  />

                  {/* Secondary Hero: Flowing Hydrodynamic Surf Wave Crest */}
                  <path
                    d="M 16.5 24 C 20.5 19.5, 25.5 27, 30.5 21.5 C 33.5 18, 35.5 20.5, 36.5 19.5"
                    stroke="#00C8A0"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* Single Integrated AI Spark Node */}
                  <circle cx="30.5" cy="21.5" r="1.8" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
          )}
        </button>
      </div>

    </div>
  );
}
