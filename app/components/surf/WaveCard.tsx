"use client";

import { useBooking } from "../../context/BookingContext";
import { useLanguage } from "../../context/LanguageContext";

export interface WaveLevelData {
  id: string;
  number: string;
  badge: string;
  level: string;
  title: string;
  desc: string;
  height: string;
  ride: string;
  board: string;
  img: string;
  video?: string;
}

interface WaveCardProps {
  card: WaveLevelData;
  isActive: boolean;
  onClick: () => void;
}

export default function WaveCard({ card, isActive, onClick }: WaveCardProps) {
  const { onOpenBooking } = useBooking();
  const { lang, t } = useLanguage();
  const isRtl = lang === "ar";

  const cardTitle = isRtl
    ? card.id === "beginner"
      ? t.fywCard01Title
      : card.id === "novice"
      ? t.fywCard02Title
      : card.id === "progressive"
      ? t.fywCard03Title
      : card.id === "intermediate"
      ? t.fywCard04Title
      : t.fywCard05Title
    : card.title;

  const cardLevel = isRtl
    ? card.id === "beginner"
      ? t.fywCard01Level
      : card.id === "novice"
      ? t.fywCard02Level
      : card.id === "progressive"
      ? t.fywCard03Level
      : card.id === "intermediate"
      ? t.fywCard04Level
      : t.fywCard05Level
    : card.level;

  const cardDesc = isRtl
    ? card.id === "beginner"
      ? t.fywCard01Desc
      : card.id === "novice"
      ? t.fywCard02Desc
      : card.id === "progressive"
      ? t.fywCard03Desc
      : card.id === "intermediate"
      ? t.fywCard04Desc
      : t.fywCard05Desc
    : card.desc;

  return (
    <div
      data-wave-card
      onClick={onClick}
      className={`group relative flex-shrink-0 cursor-pointer rounded-2xl sm:rounded-3xl transition-all duration-500 ease-out overflow-hidden flex flex-col justify-between select-none border-[1.5px] ${
        isActive
          ? "w-[84vw] max-w-[340px] sm:w-[330px] lg:w-[clamp(300px,24vw,360px)] h-full max-h-[460px] min-h-[350px] bg-[#F7F8F6] text-[#0A1926] shadow-2xl border-[#00C8A0] z-20 scale-100 opacity-100"
          : "w-[76vw] max-w-[300px] sm:w-[290px] lg:w-[clamp(270px,21vw,320px)] h-full max-h-[435px] min-h-[330px] bg-[#F7F8F6] text-[#0A1926] shadow-md border-slate-200/80 opacity-[0.85] hover:opacity-100 z-10 scale-[0.97]"
      }`}
    >
      {/* Smooth Dark Ocean Background Layer (Fades in over 500ms when active) */}
      <div
        className={`absolute inset-0 bg-[#082F3D] transition-opacity duration-500 ease-out pointer-events-none z-0 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 1. Media Container */}
      <div className="relative w-full h-[32%] sm:h-[35%] min-h-[110px] max-h-[165px] overflow-hidden bg-slate-900 shrink-0 z-10">
        <img
          src={card.img}
          alt={cardTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dual Gradient Overlays (Smooth Crossfade without step flash) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#F7F8F6] via-[#F7F8F6]/30 to-transparent pointer-events-none transition-opacity duration-500 ease-out ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#082F3D] via-[#082F3D]/50 to-transparent pointer-events-none transition-opacity duration-500 ease-out ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold transition-colors duration-500 ${
              isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
            } ${isActive ? "bg-[#00C8A0] text-[#061F2B]" : "bg-[#0A1926] text-white"}`}
          >
            {card.badge}
          </span>
          <span
            className={`text-xs font-mono font-bold transition-colors duration-500 ${
              isActive ? "text-[#00C8A0]" : "text-slate-500"
            }`}
          >
            {card.number}
          </span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 min-h-0 text-left relative z-10">
        <div className="min-h-0 flex-1 flex flex-col justify-start">
          <span
            className={`text-[9.5px] font-extrabold block mb-0.5 transition-colors duration-500 ${
              isRtl ? "tracking-normal font-sans" : "uppercase tracking-[0.2em]"
            } ${isActive ? "text-[#00C8A0]" : "text-[#07536A]"}`}
          >
            {cardLevel}
          </span>

          <h3
            className={`font-serif text-lg sm:text-2xl font-bold mb-1 transition-colors duration-500 ${
              isActive ? "text-white" : "text-[#0A1926]"
            } ${isRtl ? "tracking-normal font-sans" : ""}`}
          >
            {cardTitle}
          </h3>

          <p
            className={`text-[11px] sm:text-xs leading-snug sm:leading-relaxed font-sans line-clamp-2 mb-2 transition-colors duration-500 ${
              isActive ? "text-white/80" : "text-slate-600"
            }`}
          >
            {cardDesc}
          </p>
        </div>

        {/* 3. Technical Specs Grid */}
        <div className="pt-2 sm:pt-2.5 border-t border-slate-200/20 shrink-0 mt-auto">
          <div className="grid grid-cols-3 gap-1.5 text-left mb-2">
            <div>
              <span
                className={`text-[8px] font-extrabold block transition-colors duration-500 ${
                  isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
                } ${isActive ? "text-white/50" : "text-slate-400"}`}
              >
                {t.fywHeight}
              </span>
              <span
                className={`text-[11px] sm:text-xs font-bold transition-colors duration-500 ${
                  isActive ? "text-white" : "text-[#0A1926]"
                }`}
              >
                {card.height}
              </span>
            </div>
            <div className="border-l border-slate-200/20 pl-2">
              <span
                className={`text-[8px] font-extrabold block transition-colors duration-500 ${
                  isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
                } ${isActive ? "text-white/50" : "text-slate-400"}`}
              >
                {t.fywRide}
              </span>
              <span
                className={`text-[11px] sm:text-xs font-bold transition-colors duration-500 ${
                  isActive ? "text-white" : "text-[#0A1926]"
                }`}
              >
                {card.ride}
              </span>
            </div>
            <div className="border-l border-slate-200/20 pl-2">
              <span
                className={`text-[8px] font-extrabold block transition-colors duration-500 ${
                  isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
                } ${isActive ? "text-white/50" : "text-slate-400"}`}
              >
                {t.fywBoard}
              </span>
              <span
                className={`text-[11px] sm:text-xs font-bold truncate block transition-colors duration-500 ${
                  isActive ? "text-white" : "text-[#0A1926]"
                }`}
              >
                {card.board}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between shrink-0 pt-0.5">
            <span
              className={`text-[9.5px] font-bold transition-colors duration-500 ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-wider"
              } ${isActive ? "text-[#00C8A0]" : "text-[#07536A]"}`}
            >
              {t.fywSessionRate}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenBooking(cardTitle);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-500 cursor-pointer ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-wider"
              } ${
                isActive
                  ? "bg-[#00C8A0] text-[#061F2B] hover:bg-[#00B590] shadow-md"
                  : "bg-[#0A1926] text-white hover:bg-[#07536A]"
              }`}
            >
              {isRtl ? "احجز الفئة" : "BOOK TIER"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
