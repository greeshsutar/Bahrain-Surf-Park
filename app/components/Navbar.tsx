"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenBooking: (tier?: string) => void;
}

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "SURF", href: "/surf" },
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

  return (
    <header>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-10 flex items-center justify-between ${
          isScrolled
            ? "nav-scrolled bg-white/95 text-[#063B45] shadow-md py-3.5 backdrop-blur-md border-b border-slate-200/80"
            : "nav-transparent !bg-transparent text-white py-4 sm:py-5 !border-none !shadow-none"
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

          {/* Solid CTA Button Right & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className={`nav-book-btn font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer ${
                isScrolled
                  ? "bg-[#0B7FB5] hover:bg-[#063B45] text-white"
                  : "bg-[#00C8A0] hover:bg-[#00B590] text-[#061C27]"
              }`}
            >
              BOOK NOW
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
