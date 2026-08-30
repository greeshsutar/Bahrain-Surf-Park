import Academy from "../components/Academy";

export default function AcademyPage() {
  return (
    <div className="bg-white">
      {/* Dedicated Subpage Intro Header */}
      <section className="bg-[#0A1926] text-white pt-28 pb-16 relative z-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-left">
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
            CLUB HAWAII SURF ACADEMY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-3">
            Learn to Surf from Expert Coaches
          </h1>
          <p className="text-[#00C8A0] text-base sm:text-lg font-medium leading-relaxed mb-10 font-sans">
            Whether it's your first time or you're looking to improve, our lessons help every level progress faster.
          </p>

          {/* 2-Column Coaching Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/15">
            {/* Block 1: Group Lessons */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B7FB5] block mb-2">
                  PROGRAM 01
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  Group Lessons
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans">
                  Whether you're catching your first wave or chasing your next breakthrough, our group coaching keeps the energy high. Beginners learn the fundamentals — pop-ups, board control, ocean safety — while more advanced surfers refine turns, timing, and flow with real-time feedback from ISA-certified coaches.
                </p>
              </div>
            </div>

            {/* Block 2: Private Coaching */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#00C8A0] block mb-2">
                  PROGRAM 02
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  Private Coaching
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans">
                  Looking for faster progress or one-on-one support? Our private coaching is tailored entirely to your goals and skill level. Whether you're brand new or fine-tuning technique, your instructor's full attention is on you — building confidence, improving form, and helping you unlock your next level, at your own pace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Academy Component */}
      <Academy />
    </div>
  );
}
