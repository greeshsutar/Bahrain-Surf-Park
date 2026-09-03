"use client";

import { useLanguage } from "../context/LanguageContext";

export default function QuickNav() {
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  return (
    <section id="quick-nav" className="bg-white pt-4 pb-5 sm:pb-8 relative z-10 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* 4-Column Grid matching reference composition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-left items-start">
          
          {/* Column 1: World-Class Waves */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-[#0B7FB5]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2.8.5 1.8.6 2.8.2 1-.4 2.2-.4 3.2.2.6.4 1.4.6 2.2.6"/>
                <path d="M2 17c.6 0 1.2-.2 1.6-.6 1-.8 2.2-.8 3.2 0 .8.6 1.8.8 2.8.4 1-.4 2.2-.4 3.2.2.8.5 1.8.6 2.8.2 1-.4 2.2-.4 3.2.2.6.4 1.4.6 2.2.6"/>
              </svg>
            </div>
            <div>
              <h3 className={`font-sans text-xs font-black text-[#0A1926] mb-1 ${isRtl ? "tracking-normal" : "uppercase tracking-wider"}`}>
                {isRtl ? "أمواج عالمية المستوى" : "WORLD-CLASS WAVES"}
              </h3>
              <p className="text-[#063B45]/70 text-xs font-medium leading-relaxed">
                {isRtl ? "أمواج متناسقة ومثالية لجميع المستويات." : "Consistent, perfect waves for every ability."}
              </p>
            </div>
          </div>

          {/* Column 2: Island Living */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-[#00C8A0]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 0-7.07 17.07l.07.07A10 10 0 0 0 12 22a10 10 0 0 0 7-2.93l.07-.07A10 10 0 0 0 12 2z"/>
                <path d="M12 22v-9"/>
                <path d="M8 7c2 2 4 4 4 6"/>
                <path d="M16 7c-2 2-4 4-4 6"/>
              </svg>
            </div>
            <div>
              <h3 className={`font-sans text-xs font-black text-[#0A1926] mb-1 ${isRtl ? "tracking-normal" : "uppercase tracking-wider"}`}>
                {isRtl ? "الحياة الساحلية" : "ISLAND LIVING"}
              </h3>
              <p className="text-[#063B45]/70 text-xs font-medium leading-relaxed">
                {isRtl ? "مرافق فاخرة تحيط بها الطبيعة الساحلية الخلابة." : "Luxury facilities surrounded by natural beauty."}
              </p>
            </div>
          </div>

          {/* Column 3: Advanced Technology */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-[#0B7FB5]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 3v3m0 12v3M3 12h3m12 0h3"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div>
              <h3 className={`font-sans text-xs font-black text-[#0A1926] mb-1 ${isRtl ? "tracking-normal" : "uppercase tracking-wider"}`}>
                {isRtl ? "تكنولوجيا متطورة" : "ADVANCED TECHNOLOGY"}
              </h3>
              <p className="text-[#063B45]/70 text-xs font-medium leading-relaxed">
                {isRtl ? "مدعوم بالجيل القادم من تقنيات الأمواج الذكية." : "Powered by next-generation wave technology."}
              </p>
            </div>
          </div>

          {/* Column 4: Authentic Bahrain */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-[#00C8A0]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <h3 className={`font-sans text-xs font-black text-[#0A1926] mb-1 ${isRtl ? "tracking-normal" : "uppercase tracking-wider"}`}>
                {isRtl ? "أصالة البحرين" : "AUTHENTIC BAHRAIN"}
              </h3>
              <p className="text-[#063B45]/70 text-xs font-medium leading-relaxed">
                {isRtl ? "مستوحى من ثقافتنا العريقة ومرتبط بهوية جزيرتنا." : "Inspired by our culture, connected to our island."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
