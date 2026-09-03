"use client";

import { useLanguage } from "../../context/LanguageContext";

export default function SurfIntro() {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  return (
    <section className="bg-[#082F3D] text-white py-14 sm:py-20 relative z-10 overflow-hidden border-b border-white/10">
      {/* Background Subtle Contour Wave Graphic Inspired by Logo */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" stroke="#00C8A0" strokeWidth="1.2">
          <path d="M-100,100 C200,60 400,220 800,180 C1200,140 1400,300 1600,240" />
          <path d="M-100,240 C180,200 380,380 780,320 C1180,260 1380,440 1600,380" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 text-left">
            <span className={`text-[#00C8A0] text-xs font-extrabold mb-4 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.25em] uppercase"}`}>
              {isRtl ? "الفلسفة • رحلتك الشخصية" : "PHILOSOPHY · THE INDIVIDUAL JOURNEY"}
            </span>

            <h2 className={`font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] mb-6 ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
              {isRtl ? (
                <>
                  ركوب الأمواج،<br />مصمم خصيصًا لك.
                </>
              ) : (
                <>
                  Surfing,<br />Engineered Around You.
                </>
              )}
            </h2>

            <p className="text-white/85 text-base sm:text-lg font-medium leading-relaxed mb-6 font-sans max-w-xl">
              {isRtl
                ? "كل راكب أمواج متميز عن غيره. لذلك يجب أن تكون التجربة متطورة ومحكومة ومصممة وفقًا لقدراتك الفردية."
                : "Every surfer is different. The surf experience should therefore feel progressive, controlled, and designed around individual ability."}
            </p>

            <p className="text-white/70 text-sm leading-relaxed font-sans max-w-xl mb-8">
              {isRtl
                ? "من خلال توليد أمواج إلكتروميكانيكية دقيقة، تحول حديقة البحرين لركوب الأمواج التجربة من عنصر طبيعي غير متوقع إلى منصة تطور شخصية."
                : "Through precision electro-mechanical wave generation, Bahrain Surf Park transforms surfing from an unpredictable natural element into a personal progression platform."}
            </p>

            <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#00C8A0] font-bold ${isRtl ? "tracking-normal font-sans" : "tracking-wider uppercase"}`}>
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-pulse"></span>
              <span>{isRtl ? "مصممة خصيصًا لتطور مهاراتك" : "CALIBRATED FOR YOUR PROGRESSION"}</span>
            </div>
          </div>

          {/* Right Column: Editorial Crop Visual */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative aspect-[4/5] group bg-[#061F2B]">
              <img
                src="/images/tier4.jpg"
                alt="Bahrain Surf Park Rider"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061F2B]/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className={`text-[10px] font-extrabold text-[#00C8A0] block mb-1 ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"}`}>
                  {isRtl ? "هندسة الجودة المحيطية" : "OCEAN-GRADE GEOMETRY"}
                </span>
                <p className="text-xs font-serif font-bold text-white">
                  {isRtl ? "الاتساق والاستمرارية في كل جلسة." : "Consistency and repeatability in every session."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
