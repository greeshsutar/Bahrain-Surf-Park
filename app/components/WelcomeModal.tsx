"use client";

import { useEffect, useRef, useState } from "react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const STORAGE_KEY = "bsp_welcome_seen";
    try {
      const hasSeen = localStorage.getItem(STORAGE_KEY);
      if (!hasSeen) {
        const timer = setTimeout(() => {
          const bookingModal = document.getElementById("booking-modal-overlay");
          if (!bookingModal || bookingModal.classList.contains("hidden")) {
            setIsOpen(true);
          }
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const ctaBtn = containerRef.current?.querySelector<HTMLElement>("a, button");
        ctaBtn?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeModal = () => {
    try {
      localStorage.setItem("bsp_welcome_seen", "true");
    } catch (e) {}
    setIsOpen(false);
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeModal();
    const targetSection = document.getElementById("find-your-wave");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="welcome-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#063B45]/70 backdrop-blur-sm p-4 sm:p-6 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      aria-labelledby="welcome-modal-title"
    >
      <div
        id="welcome-modal-container"
        ref={containerRef}
        className="relative w-full max-w-[540px] rounded-xl shadow-2xl overflow-hidden my-auto flex flex-col text-left border border-white/20 bg-[#063B45] transform transition-transform duration-300"
      >
        {/* 1. Full-Bleed Real Photography Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/bahrain_surf_park_clean.jpg"
            alt="Bahrain Surf Park Waves"
            className="w-full h-full object-cover"
          />
          {/* Cinematic Dark Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#063B45] via-[#063B45]/75 to-[#063B45]/40 z-10"></div>
        </div>

        {/* 2. Close Button */}
        <button
          id="welcome-modal-close"
          onClick={closeModal}
          className="absolute top-4 right-4 z-30 text-white/80 hover:text-white p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00C8A0] rounded cursor-pointer"
          aria-label="Close Welcome Dialog"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 3. Modal Content Layer */}
        <div className="relative z-20 px-8 pt-14 pb-10 sm:px-10 sm:pt-16 sm:pb-12 flex flex-col items-start">
          {/* Brand Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#00C8A0] uppercase">
              BAHRAIN SURF PARK
            </span>
          </div>

          {/* Headline */}
          <h2
            id="welcome-modal-title"
            className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white leading-[1.14] tracking-tight mb-4"
          >
            Welcome to the Kingdom's Premier Wave Destination
          </h2>

          {/* Short Supporting Copy */}
          <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8 font-sans max-w-md">
            Experience world-class surf technology, calibrated ocean waves, and luxury island living at Bilaj Al Jazayer.
          </p>

          {/* CTA Button */}
          <a
            href="#find-your-wave"
            id="welcome-modal-cta"
            onClick={handleCtaClick}
            className="bg-[#00C8A0] hover:bg-[#00B590] text-[#063B45] font-extrabold px-8 py-3.5 rounded-lg text-xs uppercase tracking-widest transition-all shadow-lg inline-flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>EXPLORE THE PARK</span>
            <svg className="w-4 h-4 text-[#063B45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
