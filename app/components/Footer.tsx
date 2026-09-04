"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion, handleMagneticMouseMove, handleMagneticMouseLeave } from "../constants/motion";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  onOpenBooking?: (tier?: string) => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const { lang, navItems, bookNowText, t } = useLanguage();
  const isRtl = lang === "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const footer = footerRef.current;
    if (!footer) return;

    const reduced = isReducedMotion();

    if (!reduced) {
      const animElements = footer.querySelectorAll(".footer-animate");
      gsap.fromTo(
        animElements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.ENTRANCE_DURATION,
          ease: MOTION.ENTRANCE_EASE,
          stagger: MOTION.STAGGER,
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      const animElements = footer.querySelectorAll(".footer-animate");
      gsap.set(animElements, { opacity: 1, y: 0 });
    }

    return () => {
      ScrollTrigger.getAll().filter((st) => st.trigger === footer).forEach((st) => st.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#0A1926] text-white pt-16 sm:pt-20 pb-12 relative z-10 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* 1. Bold Closing Statement Header Banner */}
        <div className="footer-animate border-b border-white/10 pb-16 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
          <div className="max-w-2xl">
            <span className={`text-[#00C8A0] text-xs font-extrabold mb-3 block ${isRtl ? "tracking-normal font-sans" : "tracking-[0.2em] uppercase"}`}>
              {isRtl ? "الفصل القادم" : "THE NEXT CHAPTER"}
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] mb-4 ${isRtl ? "tracking-normal font-sans" : "tracking-tight"}`}>
              {isRtl ? "موجتك بانتظارك." : "Your Wave Is Waiting."}
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
              {isRtl
                ? "حيث تلتقي التقنية العالمية بروح الحياة الساحلية على سواحل البحرين."
                : "Where world-class technology meets the spirit of island living on the coast of Bahrain. Join us as we redefine coastal surf culture."}
            </p>
          </div>

          <div className="shrink-0 flex">
            <button
              onClick={() => onOpenBooking?.()}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className={`bg-gradient-to-r from-[#00C8A0] to-[#0B7FB5] hover:opacity-95 text-white px-8 py-4 rounded-lg text-xs font-extrabold ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"} shadow-xl transition-all inline-flex items-center gap-2.5 cursor-pointer`}
            >
              <span>{isRtl ? "احجز جلستك الآن" : "BOOK YOUR SESSION"}</span>
              <span className="text-sm font-normal">{isRtl ? "←" : "→"}</span>
            </button>
          </div>
        </div>

        {/* 2. 4-Column Sitemap & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 text-left">
          
          {/* Column 1: Brand, Location & Live Detail */}
          <div className="footer-animate lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Link href="/">
                  <img
                    src="/images/logo.png"
                    alt="Bahrain Surf Park"
                    className="h-18 sm:h-20 md:h-22 w-auto object-contain cursor-pointer"
                  />
                </Link>
                <span className="text-white font-bold tracking-wider uppercase text-xs">
                  {isRtl ? "حديقة البحرين لركوب الأمواج" : "Bahrain Surf Park"}
                </span>
              </div>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm font-sans">
                {isRtl
                  ? "أحدث تقنيات ركوب الأمواج في العالم تلتقي بروح الحياة الساحلية الفاخرة في قلب البحرين."
                  : "The world's most advanced wave technology meeting the spirit of island living in the heart of Bahrain."}
              </p>

              {/* Official Google Maps Location Link */}
              <a
                href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/80 hover:text-[#00C8A0] transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <svg className="w-4 h-4 text-[#00C8A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{isRtl ? "بلاج الجزائر، مملكة البحرين" : "Bilaj Al Jazayer, Kingdom of Bahrain"}</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>

            {/* Living Live Status Pulse Badge */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C8A0] animate-pulse shrink-0"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00C8A0]">
                {isRtl ? "مباشر في بلاج الجزائر" : "Live in Bilaj Al Jazayer"}
              </span>
            </div>
          </div>

          {/* Column 2: Explore Navigation Links */}
          <div className="footer-animate lg:col-span-2">
            <span className={`text-xs font-extrabold uppercase mb-4 block text-[#00C8A0] ${isRtl ? "tracking-normal font-sans" : "tracking-[0.2em]"}`}>
              {isRtl ? "استكشف" : "EXPLORE"}
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-white/80">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#00C8A0] transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit Details & Opening Badge */}
          <div className="footer-animate lg:col-span-3">
            <span className={`text-xs font-extrabold uppercase mb-4 block text-[#00C8A0] ${isRtl ? "tracking-normal font-sans" : "tracking-[0.2em]"}`}>
              {isRtl ? "الزيارة" : "VISIT"}
            </span>
            <div className="space-y-3 text-xs text-white/75 font-sans leading-relaxed">
              <p>
                <strong className="text-white block font-bold mb-0.5">{isRtl ? "الوجهة" : "Destination"}</strong>
                {isRtl ? "بلاج الجزائر، الساحل الجنوبي الغربي، مملكة البحرين" : "Bilaj Al Jazayer, Southwest Coast, Kingdom of Bahrain"}
              </p>

              <p>
                <strong className="text-white block font-bold mb-0.5">{isRtl ? "ساعات العمل" : "Operating Hours"}</strong>
                {isRtl ? "مفتوح يوميًا من 7:00 صباحًا حتى 10:00 مساءً" : "Open Daily from 7:00 AM to 10:00 PM"}
              </p>

              {/* Opening 2026 Badge */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-[#00C8A0]/15 border border-[#00C8A0]/40 text-[#00C8A0] text-[11px] font-extrabold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse"></span>
                  <span>{isRtl ? "الافتتاح 2026" : "Opening 2026"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Connected & Magnetic Social Icons */}
          <div className="footer-animate lg:col-span-3">
            <span className={`text-xs font-extrabold uppercase mb-4 block text-[#00C8A0] ${isRtl ? "tracking-normal font-sans" : "tracking-[0.2em]"}`}>
              {isRtl ? "ابق على اتصال" : "STAY CONNECTED"}
            </span>
            <p className="text-xs text-white/75 leading-relaxed mb-4">
              {isRtl
                ? "احصل على التحديثات الحصرية ودعوات حجز الجلسات المباشرة."
                : "Receive early access updates and exclusive session booking invitations."}
            </p>

            {/* Newsletter Email Form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 mb-6">
              <input
                type="email"
                placeholder={isRtl ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                className="bg-[#082F3D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C8A0] transition-colors w-full"
              />
              <button
                type="submit"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className={`bg-[#00C8A0] hover:bg-[#00E5B3] text-[#061F2B] px-4 py-2.5 rounded-lg text-xs font-extrabold ${isRtl ? "tracking-normal font-sans" : "uppercase tracking-wider"} transition-all cursor-pointer shadow-md`}
              >
                {isRtl ? "احصل على وصول مبكر" : "GET EARLY ACCESS"}
              </button>
            </form>

            {/* Magnetic Social Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061F2B] text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061F2B] text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X (Twitter)"
                onMouseMove={handleMagneticMouseMove}
                onMouseLeave={handleMagneticMouseLeave}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-[#00C8A0] hover:border-[#00C8A0] hover:text-[#061F2B] text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* 3. Bottom Bar: Copyright & Stakeholder Partners Row */}
        <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
          <div>
            <span>
              {isRtl
                ? "© 2026 حديقة البحرين لركوب الأمواج. جميع الحقوق محفوظة."
                : "© 2026 Bahrain Surf Park. All Rights Reserved."}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span className={`text-[10px] font-extrabold uppercase text-white/40 ${isRtl ? "tracking-normal font-sans" : "tracking-[0.2em]"}`}>
              {isRtl ? "شركاء التطوير والتكنولوجيا" : "DEVELOPMENT & TECHNOLOGY PARTNERS"}
            </span>
            <div className="flex items-center gap-4 sm:gap-6 text-white/75 font-serif tracking-widest text-[11px] uppercase font-bold">
              <span className="hover:text-[#00C8A0] transition-colors cursor-default">{isRtl ? "إدامة" : "EDAMAH"}</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-[#00C8A0] transition-colors cursor-default">{isRtl ? "مجموعة GFH المالية" : "GFH FINANCIAL GROUP"}</span>
              <span className="text-white/20">•</span>
              <span className="hover:text-[#00C8A0] transition-colors cursor-default">{isRtl ? "ويف جاردن" : "WAVEGARDEN"}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
