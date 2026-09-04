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
      className={`group relative flex-shrink-0 cursor-pointer rounded-3xl transition-all duration-500 overflow-hidden flex flex-col justify-between select-none ${
        isActive
          ? "w-[84vw] max-w-[340px] sm:w-[330px] lg:w-[clamp(310px,25vw,370px)] h-[clamp(360px,48vh,480px)] sm:h-[clamp(400px,51vh,510px)] bg-[#082F3D] text-white shadow-2xl border-2 border-[#00C8A0] z-20"
          : "w-[76vw] max-w-[300px] sm:w-[290px] lg:w-[clamp(280px,22vw,330px)] h-[clamp(330px,44vh,440px)] sm:h-[clamp(360px,46vh,460px)] bg-[#F7F8F6] text-[#0A1926] shadow-md border border-slate-200 opacity-75 hover:opacity-100 z-10"
      }`}
    >
      {/* 1. Media Container */}
      <div className="relative w-full h-[36%] sm:h-[40%] min-h-[140px] max-h-[220px] overflow-hidden bg-slate-900 shrink-0">
        <img
          src={card.img}
          alt={cardTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className={`absolute inset-0 bg-gradient-to-t ${isActive ? "from-[#082F3D] via-[#082F3D]/40 to-transparent" : "from-[#F7F8F6] via-transparent to-transparent"}`}></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
          <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"} ${isActive ? "bg-[#00C8A0] text-[#061F2B]" : "bg-[#0A1926] text-white"}`}>
            {card.badge}
          </span>
          <span className={`text-xs font-mono font-bold ${isActive ? "text-[#00C8A0]" : "text-slate-500"}`}>
            {card.number}
          </span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-left min-h-0">
        <div>
          <span className={`text-[9.5px] font-extrabold block mb-0.5 ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-[0.2em]"} ${isActive ? "text-[#00C8A0]" : "text-[#07536A]"}`}>
            {cardLevel}
          </span>

          <h3 className={`font-serif text-lg sm:text-2xl font-bold mb-1 ${isActive ? "text-white" : "text-[#0A1926]"} ${isRtl ? "tracking-normal font-sans" : ""}`}>
            {cardTitle}
          </h3>

          <p className={`text-[11px] sm:text-xs leading-relaxed font-sans line-clamp-2 sm:line-clamp-3 mb-3 ${isActive ? "text-white/80" : "text-slate-600"}`}>
            {cardDesc}
          </p>
        </div>

        {/* 3. Technical Specs Grid */}
        <div className="pt-3 border-t border-slate-200/20">
          <div className="grid grid-cols-3 gap-2 text-left mb-3">
            <div>
              <span className={`text-[8px] font-extrabold block ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"} ${isActive ? "text-white/50" : "text-slate-400"}`}>
                {t.fywHeight}
              </span>
              <span className={`text-[11px] sm:text-xs font-bold ${isActive ? "text-white" : "text-[#0A1926]"}`}>
                {card.height}
              </span>
            </div>
            <div className="border-l border-slate-200/20 pl-2">
              <span className={`text-[8px] font-extrabold block ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"} ${isActive ? "text-white/50" : "text-slate-400"}`}>
                {t.fywRide}
              </span>
              <span className={`text-[11px] sm:text-xs font-bold ${isActive ? "text-white" : "text-[#0A1926]"}`}>
                {card.ride}
              </span>
            </div>
            <div className="border-l border-slate-200/20 pl-2">
              <span className={`text-[8px] font-extrabold block ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"} ${isActive ? "text-white/50" : "text-slate-400"}`}>
                {t.fywBoard}
              </span>
              <span className={`text-[11px] sm:text-xs font-bold truncate block ${isActive ? "text-white" : "text-[#0A1926]"}`}>
                {card.board}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <span className={`text-[9.5px] font-bold ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-wider"} ${isActive ? "text-[#00C8A0]" : "text-[#07536A]"}`}>
              {t.fywSessionRate}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenBooking(cardTitle);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-wider"} ${
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
