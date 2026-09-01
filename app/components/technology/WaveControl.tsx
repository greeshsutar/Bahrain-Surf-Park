"use client";

const CARDS = [
  {
    title: "HEIGHT CONTROL",
    desc: "Adjust wave height from small and gentle to powerful and hollow.",
    val: "0.5m – 2.2m",
    fill: "85%",
    icon: (
      <svg className="w-6 h-6 text-[#00C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    title: "SPEED CONTROL",
    desc: "Control the speed and power of the wave for different riding styles.",
    val: "CALIBRATED",
    fill: "90%",
    icon: (
      <svg className="w-6 h-6 text-[#00C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: "SHAPE CONTROL",
    desc: "Fine-tune the shape of the wave face for ultimate performance.",
    val: "DYNAMIC",
    fill: "95%",
    icon: (
      <svg className="w-6 h-6 text-[#00C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function WaveControl() {
  return (
    <section id="tech-section-04" className="bg-[#031923] text-white py-20 sm:py-28 relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-4">
            <span className="font-mono text-xs sm:text-sm font-extrabold text-[#00C7C7] block mb-3">
              04
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              EVERY WAVE<br />UNDER CONTROL.
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
              Real-time adjustments mean we can create the ideal wave for any level of surfer.
            </p>
          </div>

          {/* Right Column: 3 Technology Dark Glass Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-[#062B36]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-[#00C7C7]/50 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#031923] border border-white/10 flex items-center justify-center mb-6 text-[#00C7C7]">
                    {card.icon}
                  </div>

                  <h3 className="font-sans text-xs font-extrabold tracking-wider uppercase text-white mb-2 group-hover:text-[#00C7C7] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-white/75 leading-relaxed font-sans mb-8">
                    {card.desc}
                  </p>
                </div>

                {/* Technical Control Line with Glowing Indicator */}
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-white/50 mb-1.5">
                    <span>PARAM LEVEL</span>
                    <span className="text-[#00C7C7]">{card.val}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#007F91] to-[#00C7C7] rounded-full"
                      style={{ width: card.fill }}
                    ></div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
