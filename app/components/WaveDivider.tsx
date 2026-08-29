"use client";

export default function WaveDivider() {
  return (
    <div className="wave-divider-wrap relative z-20 w-full overflow-visible pointer-events-none leading-none -mb-[1px]">
      <section id="wave-divider-section" className="select-none pointer-events-none w-full">
        <svg
          className="block w-full h-[60px] sm:h-[80px] md:h-[95px] lg:h-[110px] leading-none"
          viewBox="0 0 1440 95"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="wave-soft-shadow" x="-5%" y="-10%" width="110%" height="200%">
              {/* Close defined soft shadow following wave contour */}
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#06232D" floodOpacity="0.10" />
              <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#06232D" floodOpacity="0.06" />
            </filter>
          </defs>
          {/* Pure White Wave Body with Soft Shadow */}
          <path
            d="M 0,0 L 1440,0 L 1440,65 C 1380,50 1350,50 1320,50 C 1220,50 1180,80 1100,80 C 1000,80 940,55 880,55 C 780,55 700,90 600,90 C 420,90 320,50 200,50 C 100,50 50,75 0,80 Z"
            fill="#FFFFFF"
            stroke="none"
            filter="url(#wave-soft-shadow)"
          />
          {/* Subtle dark edge line along wave curve */}
          <path
            d="M 0,80 C 50,75 100,50 200,50 C 320,50 420,90 600,90 C 700,90 780,55 880,55 C 940,55 1000,80 1100,80 C 1180,80 1220,50 1320,50 C 1350,50 1380,50 1440,65"
            stroke="rgba(10, 25, 38, 0.16)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </section>
    </div>
  );
}
