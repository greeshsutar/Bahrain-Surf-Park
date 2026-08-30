"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenBooking: (tier?: string) => void;
}

const NAV_ITEMS = [
  { label: "TECHNOLOGY", href: "/technology" },
  { label: "THE WAVE", href: "/find-your-wave" },
  { label: "ACADEMY", href: "/academy" },
  { label: "SERVICES", href: "/services" },
  { label: "CABANAS", href: "/cabanas" },
  { label: "PLAN YOUR VISIT", href: "/visit" },
];

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 px-6 sm:px-10 flex items-center justify-between ${
          isScrolled
            ? "nav-scrolled bg-[#061C27]/95 text-white shadow-lg py-3 backdrop-blur-md border-b border-white/10"
            : "nav-transparent bg-gradient-to-b from-[#061C27]/80 to-transparent text-white py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Logo Far Left */}
          <Link href="/" className="flex items-center group focus:outline-none shrink-0">
            <img
              src="/images/logo.png"
              alt="Bahrain Surf Park"
              className="h-12 sm:h-14 md:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow"
            />
          </Link>

          {/* Centered Horizontal Navigation Links (Resort Pattern) */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-[0.15em] uppercase">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1 transition-all duration-200 relative ${
                    isActive
                      ? "text-[#00C8A0] font-extrabold"
                      : "text-white/90 hover:text-[#00C8A0]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00C8A0] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Solid CTA Button Right & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="nav-book-btn bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27] font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              BOOK NOW
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-toggle-btn w-9 h-9 border border-white/30 rounded-full text-white hover:bg-white/15 transition-all flex items-center justify-center bg-black/20 lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu"
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } lg:hidden absolute top-full left-0 right-0 bg-[#061C27]/98 text-white backdrop-blur-xl border-b border-white/10 px-6 sm:px-8 py-5 shadow-2xl flex-col gap-3.5 text-xs font-bold tracking-wider uppercase`}
        >
          {NAV_ITEMS.map((item) => {
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
