"use client";

import { useEffect, useRef } from "react";
import { useBooking } from "../../context/BookingContext";

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
  video: string;
}

interface WaveCardProps {
  card: WaveLevelData;
  isActive: boolean;
  onClick: () => void;
}

export default function WaveCard({ card, isActive, onClick }: WaveCardProps) {
  const { onOpenBooking } = useBooking();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <div
      onClick={onClick}
      className={`group relative flex-shrink-0 cursor-pointer rounded-3xl transition-all duration-500 overflow-hidden flex flex-col justify-between select-none ${
        isActive
          ? "w-[88vw] sm:w-[360px] lg:w-[400px] h-[520px] sm:h-[560px] bg-[#082F3D] text-white shadow-2xl border-2 border-[#00C8A0] lg:-translate-y-2 z-20"
          : "w-[76vw] sm:w-[310px] lg:w-[340px] h-[450px] sm:h-[480px] bg-[#F7F8F6] text-[#0A1926] shadow-md border border-slate-200 lg:translate-y-6 opacity-75 hover:opacity-100 z-10"
      }`}
    >
      {/* 1. Media Container */}
      <div className="relative w-full h-[220px] sm:h-[250px] overflow-hidden bg-slate-900 shrink-0">
        {isActive ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            poster={card.img}
            preload="none"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src={card.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className={`absolute inset-0 bg-gradient-to-t ${isActive ? "from-[#082F3D] via-[#082F3D]/40 to-transparent" : "from-[#F7F8F6] via-transparent to-transparent"}`}></div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${isActive ? "bg-[#00C8A0] text-[#061F2B]" : "bg-[#0A1926] text-white"}`}>
            {card.badge}
          </span>
          <span className={`text-xs font-mono font-bold ${isActive ? "text-[#00C8A0]" : "text-slate-500"}`}>
            {card.number}
          </span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 text-left">
        <div>
          <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] block mb-1 ${isActive ? "text-[#00C8A0]" : "text-[#07536A]"}`}>
            {card.level}
          </span>

          <h3 className={`font-serif text-2xl font-bold mb-2 ${isActive ? "text-white" : "text-[#0A1926]"}`}>
            {card.title}
          </h3>

          <p className={`text-xs leading-relaxed font-sans line-clamp-3 mb-6 ${isActive ? "text-white/80" : "text-slate-600"}`}>
            {card.desc}
          </p>
        </div>

        {/* 3. Technical Specs Grid */}
        <div className="pt-4 border-t border-slate-200/20">
          <div className="grid grid-cols-3 gap-2 text-left mb-4">
            <div>
              <span className={`text-[8.5px] font-extrabold uppercase tracking-widest block ${isActive ? "text-white/50" : "text-slate-400"}`}>
                HEIGHT
              </span>
              <span className={`text-xs font-bold ${isActive ? "text-white" : "text-[#0A1926]"}`}>
                {card.height}
              </span>
            </div>
            <div className="border-l border-slate-200/20 pl-2">
              <span className={`text-[8.5px] font-extrabold uppercase tracking-widest block ${isActive ? "text-white/50" : "text-slate-400"}`}>
                RIDE
              </span>
              <span className={`text-xs font-bold ${isActive ? "text-white" : "text-[#0A1926]"}`}>
                {card.ride}
              </span>
            </div>
            <div className="border-l border-slate-200/20 pl-2">
              <span className={`text-[8.5px] font-extrabold uppercase tracking-widest block ${isActive ? "text-white/50" : "text-slate-400"}`}>
                CRAFT
              </span>
              <span className={`text-xs font-bold truncate block ${isActive ? "text-white" : "text-[#0A1926]"}`}>
                {card.board}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-[#00C8A0]" : "text-[#07536A]"}`}>
              SESSION RATE: TBA
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenBooking(card.title);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00C8A0] text-[#061F2B] hover:bg-[#00B590] shadow-md"
                  : "bg-[#0A1926] text-white hover:bg-[#07536A]"
              }`}
            >
              BOOK TIER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
