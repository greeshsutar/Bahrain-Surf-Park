"use client";

interface MediaPlaceholderProps {
  aspectRatio?: string;
  className?: string;
  label?: string;
  showPlayBtn?: boolean;
  playBtnLabel?: string;
  playBtnPosition?: "center" | "bottom-left";
  fallbackImage?: string;
}

export default function MediaPlaceholder({
  aspectRatio = "aspect-video",
  className = "",
  label = "",
  showPlayBtn = false,
  playBtnLabel = "HOW IT WORKS",
  playBtnPosition = "center",
  fallbackImage,
}: MediaPlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[18px] sm:rounded-2xl bg-[#062B36] border border-black/10 shadow-xl group ${aspectRatio} ${className}`}
    >
      {/* Background Image / Placeholder Texture */}
      {fallbackImage ? (
        <img
          src={fallbackImage}
          alt={label || "Media Content"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#062B36] via-[#031923] to-[#092531] flex items-center justify-center relative">
          {/* Subtle Hydrodynamic Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00C7C7_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>
      )}

      {/* Dark Overlay Gradient for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02141C]/80 via-[#02141C]/20 to-transparent pointer-events-none"></div>

      {/* Play Button Overlay */}
      {showPlayBtn && (
        playBtnPosition === "bottom-left" ? (
          <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 flex flex-col items-start z-10">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#031923]/75 border border-[#00C8A0]/60 text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110 cursor-pointer">
              <svg className="w-4 h-4 fill-current translate-x-[1px]" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {playBtnLabel && (
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.22em] text-white mt-2 drop-shadow-md">
                {playBtnLabel}
              </span>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00C7C7] text-[#031923] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 cursor-pointer mb-3">
              <svg className="w-6 h-6 fill-current translate-x-[2px]" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {playBtnLabel && (
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-white bg-[#031923]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                {playBtnLabel}
              </span>
            )}
          </div>
        )
      )}

      {/* Optional Label Badge */}
      {label && !showPlayBtn && (
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C7C7] bg-[#031923]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
