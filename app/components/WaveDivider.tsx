"use client";

export default function WaveDivider() {
  return (
    <div
      className="
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
      "
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="wave-shadow"
            x="-10%"
            y="-30%"
            width="120%"
            height="170%"
          >
            <feDropShadow
              dx="0"
              dy="-5"
              stdDeviation="7"
              floodColor="#063B45"
              floodOpacity="0.14"
            />
            <feDropShadow
              dx="0"
              dy="-2"
              stdDeviation="3"
              floodColor="#063B45"
              floodOpacity="0.07"
            />
          </filter>
        </defs>

        {/* 
          Organic White Wave Overlay:
          Positioned low at the bottom of the section (covering only bottom ~15-20% of video),
          leaving ~80% of the ocean video and breaking wave fully visible above.
        */}
        <path
          d="
            M 0 160
            C 150 130, 300 130, 450 158
            C 600 188, 730 198, 875 164
            C 1020 130, 1160 128, 1300 150
            C 1360 160, 1405 164, 1440 155
            L 1440 205
            L 0 205
            Z
          "
          fill="#FFFFFF"
          stroke="none"
          filter="url(#wave-shadow)"
        />
      </svg>
    </div>
  );
}



