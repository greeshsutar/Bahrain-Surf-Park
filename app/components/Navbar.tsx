"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, navItems, bookNowText } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRtl = lang === "ar";

  return (
    <header>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-10 flex items-center justify-between ${
          isScrolled
            ? "nav-scrolled bg-white/95 text-[#063B45] shadow-md py-2 backdrop-blur-md border-b border-slate-200/80"
            : "nav-transparent !bg-transparent text-white py-2.5 sm:py-3 !border-none !shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="Bahrain Surf Park"
              className="
                h-16 md:h-[72px]
                w-auto
                object-contain
                scale-[1.35] md:scale-[1.5]
                origin-center
                transition-transform
                duration-300
                group-hover:scale-[1.55]
                filter
                drop-shadow
              "
            />
          </Link>

          {/* Centered Horizontal Navigation Links */}
          <div
            className={`hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-bold ${
              isRtl ? "tracking-normal font-sans text-sm" : "tracking-[0.15em] uppercase"
            }`}
          >
            {navItems
              .filter((item) => item.href !== "/" || pathname !== "/")
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-1 transition-all duration-200 relative nav-anchor ${
                      isActive ? "nav-active font-extrabold" : ""
                    } ${
                      isScrolled
                        ? isActive
                          ? "text-[#0B7FB5]"
                          : "text-[#063B45] hover:text-[#0B7FB5]"
                        : isActive
                        ? "text-[#00C8A0]"
                        : "text-white/90 hover:text-[#00C8A0]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>

          {/* CTA Button, Language Switcher & Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Language Switcher EN | AR */}
            <div
              className={`flex items-center text-[11px] font-bold rounded-full p-0.5 border transition-colors ${
                isScrolled
                  ? "border-[#063B45]/20 bg-slate-100/90 text-[#063B45]"
                  : "border-white/30 bg-black/25 text-white"
              }`}
              role="group"
              aria-label="Language Switcher"
            >
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === "en"
                    ? isScrolled
                      ? "bg-[#0B7FB5] text-white font-extrabold shadow-sm"
                      : "bg-[#00C8A0] text-[#061C27] font-extrabold shadow-sm"
                    : isScrolled
                    ? "hover:text-[#0B7FB5]"
                    : "hover:text-[#00C8A0]"
                }`}
                aria-pressed={lang === "en"}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="opacity-40 px-0.5 text-[10px]">|</span>
              <button
                onClick={() => setLang("ar")}
                className={`px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === "ar"
                    ? isScrolled
                      ? "bg-[#0B7FB5] text-white font-extrabold shadow-sm"
                      : "bg-[#00C8A0] text-[#061C27] font-extrabold shadow-sm"
                    : isScrolled
                    ? "hover:text-[#0B7FB5]"
                    : "hover:text-[#00C8A0]"
                }`}
                aria-pressed={lang === "ar"}
                aria-label="Switch to Arabic"
              >
                AR
              </button>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBooking()}
              className={`nav-book-btn font-extrabold px-4 sm:px-6 py-2.5 rounded-xl text-xs ${
                isRtl ? "tracking-normal font-sans" : "uppercase tracking-widest"
              } transition-all shadow-md cursor-pointer ${
                isScrolled
                  ? "bg-[#0B7FB5] hover:bg-[#063B45] text-white"
                  : "bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27]"
              }`}
            >
              {bookNowText}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`nav-toggle-btn w-9 h-9 border rounded-full transition-all flex items-center justify-center lg:hidden ${
                isScrolled
                  ? "border-[#063B45]/30 text-[#063B45] hover:bg-[#063B45]/10"
                  : "border-white/30 text-white hover:bg-white/15 bg-black/20"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu"
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } lg:hidden absolute top-full left-0 right-0 bg-[#061C27]/98 text-white backdrop-blur-xl border-b border-white/10 px-6 sm:px-8 py-5 shadow-2xl flex-col gap-3.5 text-xs font-bold ${
            isRtl ? "tracking-normal text-right font-sans text-sm" : "tracking-wider uppercase text-left"
          }`}
        >
          {navItems
            .filter((item) => item.href !== "/" || pathname !== "/")
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 border-b border-white/10 ${
                    isActive ? "text-[#00C8A0] font-extrabold" : "hover:text-[#00C8A0]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </div>
      </nav>
    </header>
  );
}

