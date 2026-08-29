"use client";

import { useEffect, useState } from "react";

interface NavbarProps {
  onOpenBooking: (tier?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 px-6 sm:px-10 flex items-center justify-between ${
          isScrolled
            ? "nav-scrolled bg-white/95 text-[#0A1926] shadow-sm py-3 md:py-3.5 backdrop-blur-md border-b border-slate-100"
            : "nav-transparent bg-transparent text-white py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Left: Clean Single Brand Logo Asset */}
          <a href="#" className="flex items-center group focus:outline-none">
            <img
              src="/images/logo.png"
              alt="Bahrain Surf Park"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow"
            />
          </a>

          {/* Center: Spaced Tracking Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-white/90">
            <a
              href="#technology"
              onClick={(e) => handleNavClick(e, "#technology")}
              className="nav-anchor py-1 hover:text-[#00C8A0] transition-colors"
            >
              TECHNOLOGY
            </a>
            <a
              href="#find-your-wave"
              onClick={(e) => handleNavClick(e, "#find-your-wave")}
              className="nav-anchor py-1 hover:text-[#00C8A0] transition-colors"
            >
              THE WAVE
            </a>
            <a
              href="#academy"
              onClick={(e) => handleNavClick(e, "#academy")}
              className="nav-anchor py-1 hover:text-[#00C8A0] transition-colors"
            >
              ACADEMY
            </a>
            <a
              href="#cabanas"
              onClick={(e) => handleNavClick(e, "#cabanas")}
              className="nav-anchor py-1 hover:text-[#00C8A0] transition-colors"
            >
              CABANAS
            </a>
            <a
              href="#visit"
              onClick={(e) => handleNavClick(e, "#visit")}
              className="nav-anchor py-1 hover:text-[#00C8A0] transition-colors"
            >
              PLAN YOUR VISIT
            </a>
          </div>

          {/* Right: Ocean Blue / Teal Button & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="nav-book-btn bg-[#00C8A0]/90 hover:bg-[#00C8A0] text-[#063B45] font-extrabold px-6 py-2 rounded-lg text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer"
            >
              BOOK NOW
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-toggle-btn w-9 h-9 border border-white/30 rounded-full text-white hover:bg-white/15 transition-all flex items-center justify-center bg-black/20"
              aria-label="Toggle Navigation"
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
          } lg:hidden absolute top-full left-0 right-0 bg-white/96 text-[#0A1926] backdrop-blur-xl border-b border-slate-100 px-6 sm:px-8 py-5 shadow-2xl flex-col gap-3.5 text-xs font-bold tracking-wider uppercase`}
        >
          <a
            href="#technology"
            onClick={(e) => handleNavClick(e, "#technology")}
            className="hover:text-[#0B7FB5] py-2 border-b border-slate-100"
          >
            TECHNOLOGY
          </a>
          <a
            href="#find-your-wave"
            onClick={(e) => handleNavClick(e, "#find-your-wave")}
            className="hover:text-[#0B7FB5] py-2 border-b border-slate-100"
          >
            THE WAVE
          </a>
          <a
            href="#academy"
            onClick={(e) => handleNavClick(e, "#academy")}
            className="hover:text-[#0B7FB5] py-2 border-b border-slate-100"
          >
            ACADEMY
          </a>
          <a
            href="#cabanas"
            onClick={(e) => handleNavClick(e, "#cabanas")}
            className="hover:text-[#0B7FB5] py-2 border-b border-slate-100"
          >
            CABANAS
          </a>
          <a
            href="#visit"
            onClick={(e) => handleNavClick(e, "#visit")}
            className="hover:text-[#0B7FB5] py-2"
          >
            PLAN YOUR VISIT
          </a>
        </div>
      </nav>
    </header>
  );
}
