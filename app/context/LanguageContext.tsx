"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "ar";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS_MAP: Record<Language, NavItem[]> = {
  en: [
    { label: "HOME", href: "/" },
    { label: "SURF", href: "/surf" },
    { label: "TECHNOLOGY", href: "/technology" },
    { label: "THE WAVE", href: "/find-your-wave" },
    { label: "ACADEMY", href: "/academy" },
    { label: "SERVICES", href: "/services" },
    { label: "CABANAS", href: "/cabanas" },
    { label: "PLAN YOUR VISIT", href: "/visit" },
  ],
  ar: [
    { label: "الرئيسية", href: "/" },
    { label: "ركوب الأمواج", href: "/surf" },
    { label: "التقنية", href: "/technology" },
    { label: "الموجة", href: "/find-your-wave" },
    { label: "الأكاديمية", href: "/academy" },
    { label: "الخدمات", href: "/services" },
    { label: "الكابانات", href: "/cabanas" },
    { label: "خطط لزيارتك", href: "/visit" },
  ],
};

export const TRANSLATIONS = {
  en: {
    bookNow: "BOOK NOW",
    // Hero
    heroEyebrow: "WORLD-CLASS SURF MEETS ISLAND LUXURY",
    heroHeadlinePart1: "Where Waves",
    heroHeadlinePart2: "Meet Wonder.",
    heroSubtitle: "Experience Bahrain's premier ocean-lake surfing destination. Powered by Wavegarden Cove technology, designed for every wave rider.",
    heroCtaDiscover: "DISCOVER WAVES",
    heroCtaBook: "BOOK SESSION",
    heroLocation: "BILAJ AL JAZAYER, BAHRAIN",
    // QuickNav
    qnWaves: "THE WAVES",
    qnTech: "TECHNOLOGY",
    qnAcademy: "SURF ACADEMY",
    qnCabanas: "LUXURY CABANAS",
    qnVisit: "PLAN YOUR VISIT",
    // Technology
    techEyebrow: "WAVEGARDEN COVE® ENGINEERING",
    techHeading: "The Physics of Perfection",
    techBody1: "Our lagoon is powered by a 52-module Wavegarden Cove technology system, capable of generating up to 1,000 ocean-like waves per hour. Each wave profile is programmatically controlled to modify height, speed, and shape in real time.",
    techBody2: "Through custom hydrodynamic modules, we optimize energy usage while delivering precise wave geometries. This creates a consistent and highly customizable surfing environment.",
    techStat1Label: "WAVES / HOUR",
    techStat1Sub: "Industry-leading capacity for endless wave sessions.",
    techStat2Label: "WAVE PROFILES",
    techStat2Sub: "Programmable wave profiles for every ability and style.",
    techStat3Label: "SURFERS CAPACITY",
    techStat3Sub: "Maximum simultaneous surfers across lagoon zones.",
    techCta: "EXPLORE WAVE TIERS",
    techStatusActive: "Wave Generator Active",
    techStatusLive: "LIVE SYSTEM STATUS",
    techStatusSub: "Real-time wave generation in progress",
    // Find Your Wave
    fywEyebrow: "FIND YOUR WAVE",
    fywHeadlinePart1: "One Place.",
    fywHeadlinePart2: "Many Ways.",
    fywSubtitle: "From your first ride to your next personal best, our waves are designed for every level and every kind of progression.",
    fywHeight: "HEIGHT",
    fywRide: "RIDE",
    fywBoard: "BOARD",
    fywSessionRate: "SESSION RATE",
    fywCard01Title: "BEGINNER",
    fywCard01Level: "BEGINNER",
    fywCard01Desc: "Gentle, slow-moving waves perfect for catching your very first waves in a safe, supportive environment. Our instructors are in the water with you the entire session.",
    fywCard02Title: "NOVICE",
    fywCard02Level: "NOVICE",
    fywCard02Desc: "Designed for riders who can pop up and are ready to learn board control on soft open-face waves. This is where board control and timing start to click.",
    fywCard03Title: "PROGRESSIVE",
    fywCard03Level: "PROGRESSIVE",
    fywCard03Desc: "Waist-high, slow-peeling waves ideal for refining take-offs, trimming, and basic turns. Expect real feedback on your positioning as waves grow more dynamic.",
    fywCard04Title: "INTERMEDIATE",
    fywCard04Level: "INTERMEDIATE",
    fywCard04Desc: "Chest-high, faster-peeling waves perfect for building speed and practicing cutbacks. Built for surfers ready to link turns together with speed and control.",
    fywCard05Title: "EXPERT",
    fywCard05Level: "EXPERT",
    fywCard05Desc: "Powerful, head-high barreling waves engineered for advanced maneuvers and heavy barrels. Reserved for surfers who know their way around a barrel.",
    // Academy
    academyEyebrow: "SURF ACADEMY",
    academyHeading: "Elevate Your Riding",
    academySub: "World-class coaching from certified ISA instructors tailored to your exact progression goals.",
    // Cabanas
    cabanasEyebrow: "LUXURY AMENITIES",
    cabanasHeading: "Private Cabanas & Hospitality",
    cabanasSub: "Relax in air-conditioned oceanfront cabanas featuring VIP concierge service, private plunge pools, and gourmet dining.",
    // Visit
    visitEyebrow: "PLAN YOUR VISIT",
    visitHeading: "Your Island Surf Escape Awaits",
    visitSub: "Located at Bilaj Al Jazayer, Bahrain. Minutes from world-class resorts and Bahrain International Circuit.",
    // Footer
    footerTagline: "World-class surfing meets island luxury at Bilaj Al Jazayer, Bahrain.",
    footerRights: "ALL RIGHTS RESERVED.",
  },
  ar: {
    bookNow: "احجز الآن",
    // Hero
    heroEyebrow: "ركوب أمواج عالمي يلتقي بفخامة الجزيرة",
    heroHeadlinePart1: "حيث تلتقي الأمواج",
    heroHeadlinePart2: "بروعة المحيط.",
    heroSubtitle: "استمتع بجهة ركوب الأمواج الأولى في البحرين. بتقنية ويف جاردن كوف المصممة لجميع مستويات ركوب الأمواج.",
    heroCtaDiscover: "استكشف الأمواج",
    heroCtaBook: "احجز الجلسة",
    heroLocation: "بلاج الجزائر، البحرين",
    // QuickNav
    qnWaves: "الأمواج",
    qnTech: "التقنية",
    qnAcademy: "أكاديمية ركوب الأمواج",
    qnCabanas: "الكابانات الفاخرة",
    qnVisit: "خطط لزيارتك",
    // Technology
    techEyebrow: "هندسة ويف جاردن كوف®",
    techHeading: "فيزياء الإتقان والتميز",
    techBody1: "تعمل بحيرتنا بنظام تقني مكون من 52 وحدة ويف جاردن كوف قادر على توليد حتى 1,000 موجة في الساعة. يتم التحكم في كل نمط موجة برمجيًا لتعديل الارتفاع والسرعة والشكل مباشرة.",
    techBody2: "من خلال وحدات هيدروديناميكية مخصصة، نُحسن استهلاك الطاقة مع تقديم هندسة موجات دقيقة، مما يخلق بيئة ركوب أمواج متناسقة ومخصصة للغاية.",
    techStat1Label: "موجة / ساعة",
    techStat1Sub: "طاقة استيعابية رائدة لجلسات أمواج لا تنتهي.",
    techStat2Label: "أنماط الأمواج",
    techStat2Sub: "أنماط أمواج قابلة للبرمجة لكل المهارات والأساليب.",
    techStat3Label: "سعة الراكبين",
    techStat3Sub: "أقصى عدد من السباحين والراكبين في نفس الوقت عبر مناطق البحيرة.",
    techCta: "استكشف مستويات الأمواج",
    techStatusActive: "مولد الأمواج نشط الآن",
    techStatusLive: "حالة النظام المباشرة",
    techStatusSub: "توليد الأمواج في الوقت الفعلي جاري",
    // Find Your Wave
    fywEyebrow: "اطلب موجتك",
    fywHeadlinePart1: "مكان واحد.",
    fywHeadlinePart2: "طرق متعددة.",
    fywSubtitle: "من تجربتك الأولى إلى أفضل أداء شخصي لك، أمواجنا صُممت لكل مستوى وكل نوع من التطور.",
    fywHeight: "الارتفاع",
    fywRide: "المسافة",
    fywBoard: "اللوح",
    fywSessionRate: "سعر الجلسة",
    fywCard01Title: "المبتدئ",
    fywCard01Level: "مبتدئ",
    fywCard01Desc: "أمواج هادئة وبطيئة مثالية لالتقاط أمواجك الأولى في بيئة آمنة ومحفزة. مدربونا معك في الماء طوال الجلسة.",
    fywCard02Title: "المبتدئ المتقدم",
    fywCard02Level: "مبتدئ متقدم",
    fywCard02Desc: "مصممة للراكبين المستعدين للتحكم في اللوح على أمواج مفتوحة هادئة. هنا يبدأ التحكم والوقوف في التناغم.",
    fywCard03Title: "المتطور",
    fywCard03Level: "متطور",
    fywCard03Desc: "أمواج بارتفاع الخصر مثالية لتحسين الانطلاق والانعطافات الأساسية مع استجابة حقيقية لأدائك.",
    fywCard04Title: "المتوسط",
    fywCard04Level: "متوسط",
    fywCard04Desc: "أمواج بارتفاع الصدر أسرع مثالية لبناء السرعة وممارسة الانعطافات القوية والتحكم بالسرعة.",
    fywCard05Title: "الخبير",
    fywCard05Level: "خبير",
    fywCard05Desc: "أمواج قوية بارتفاع الرأس مصممة للمناورات المتقدمة والأنابيب العميقة لخير المحترفين.",
    // Academy
    academyEyebrow: "أكاديمية ركوب الأمواج",
    academyHeading: "ارتقِ بركوبك للأمواج",
    academySub: "تدريب عالمي من مدربين معتمدين مخصص لأهداف تطورك الدقيقة.",
    // Cabanas
    cabanasEyebrow: "وسائل الراحة الفاخرة",
    cabanasHeading: "كابانات خاصة وضيافة راقية",
    cabanasSub: "استرخِ في كابانات مكيّفة مطلة على المحيط مع خدمة كونسيرج VIP ومسابح خاصة وتناول طعام فاخر.",
    // Visit
    visitEyebrow: "خطط لزيارتك",
    visitHeading: "ملاذك الساحلي بانتظارك",
    visitSub: "تقع في بلاج الجزائر، البحرين. على بعد دقائق من المنتجهات العالمية وحلبة البحرين الدولية.",
    // Footer
    footerTagline: "ركوب أمواج عالمي يلتقي بفخامة الجزيرة في بلاج الجزائر، البحرين.",
    footerRights: "جميع الحقوق محفوظة.",
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  navItems: NavItem[];
  bookNowText: string;
  t: typeof TRANSLATIONS["en"];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  navItems: NAV_ITEMS_MAP.en,
  bookNowText: TRANSLATIONS.en.bookNow,
  t: TRANSLATIONS.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bsp_lang") as Language | null;
      if (stored === "ar" || stored === "en") {
        setLangState(stored);
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("bsp_lang", newLang);
      document.documentElement.setAttribute("lang", newLang);
      document.documentElement.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  }, [lang]);

  const toggleLang = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        navItems: NAV_ITEMS_MAP[lang],
        bookNowText: TRANSLATIONS[lang].bookNow,
        t: TRANSLATIONS[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
