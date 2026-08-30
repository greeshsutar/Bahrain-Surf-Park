"use client";

import { useEffect, useRef, useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
}

export default function BookingModal({ isOpen, onClose, selectedTier }: BookingModalProps) {
  const [sessionType, setSessionType] = useState("Beginner");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const minDate = new Date().toISOString().split("T")[0];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTier) {
      const match = ["Beginner", "Novice", "Progressive", "Intermediate", "Expert"].find(
        (t) => t.toLowerCase() === selectedTier.toLowerCase()
      );
      if (match) {
        setSessionType(match);
      }
    }
  }, [selectedTier, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsSubmitted(false);

      // Focus first input
      setTimeout(() => {
        const firstInput = containerRef.current?.querySelector<HTMLElement>(
          "select, input, button"
        );
        firstInput?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      id="booking-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#063B45]/60 backdrop-blur-sm p-4 sm:p-6 transition-opacity duration-200"
      aria-modal="true"
      role="dialog"
      aria-labelledby="booking-modal-title"
    >
      <div
        id="booking-modal-container"
        ref={containerRef}
        className="relative w-full max-w-[480px] bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col transform transition-transform duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B7FB5] block mb-0.5">
              BAHRAIN SURF PARK
            </span>
            <h3 id="booking-modal-title" className="text-lg font-bold text-[#0A1926] font-sans">
              Request Session Booking
            </h3>
          </div>
          {/* Close Button */}
          <button
            id="booking-modal-close"
            onClick={onClose}
            className="text-slate-400 hover:text-[#0A1926] p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#063B45] rounded cursor-pointer"
            aria-label="Close Booking Modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body (Form State) */}
        {!isSubmitted ? (
          <div id="booking-form-state" className="p-6 overflow-y-auto font-sans">
            <form id="booking-form" onSubmit={handleSubmit} className="space-y-4 text-left" noValidate={false}>
              {/* Field 1: Session Type */}
              <div>
                <label
                  htmlFor="booking-session-type"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  1. Session Type
                </label>
                <select
                  id="booking-session-type"
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0A1926] font-medium focus:border-[#063B45] focus:ring-1 focus:ring-[#063B45] outline-none transition-all cursor-pointer"
                  required
                >
                  <option value="Beginner">Beginner (Gentle Whitewater)</option>
                  <option value="Novice">Novice (Open-Face Waves)</option>
                  <option value="Progressive">Progressive (Waist-High Peeling)</option>
                  <option value="Intermediate">Intermediate (Chest-High Turns)</option>
                  <option value="Expert">Expert (Head-High Barreling)</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">Calibrated session tiers & equipment included.</span>
              </div>

              {/* Field 2: Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  2. Preferred Date
                </label>
                <input
                  type="date"
                  id="booking-date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0A1926] font-medium focus:border-[#063B45] focus:ring-1 focus:ring-[#063B45] outline-none transition-all"
                  required
                />
              </div>

              {/* Field 3: Number of Guests */}
              <div>
                <label
                  htmlFor="booking-guests"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  3. Number of Surfers
                </label>
                <select
                  id="booking-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0A1926] font-medium focus:border-[#063B45] focus:ring-1 focus:ring-[#063B45] outline-none transition-all cursor-pointer"
                  required
                >
                  <option value="1">1 Surfer</option>
                  <option value="2">2 Surfers</option>
                  <option value="3">3 Surfers</option>
                  <option value="4">4 Surfers</option>
                  <option value="5">5 Surfers</option>
                  <option value="6">6 Surfers</option>
                  <option value="7">7 Surfers</option>
                  <option value="8">8 Surfers (Private Group)</option>
                </select>
              </div>

              {/* Field 4: Contact Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  4. Contact Information
                </span>

                <div>
                  <input
                    type="text"
                    id="booking-name"
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0A1926] placeholder-slate-400 focus:border-[#063B45] focus:ring-1 focus:ring-[#063B45] outline-none transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      id="booking-email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0A1926] placeholder-slate-400 focus:border-[#063B45] focus:ring-1 focus:ring-[#063B45] outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      id="booking-phone"
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0A1926] placeholder-slate-400 focus:border-[#063B45] focus:ring-1 focus:ring-[#063B45] outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Integration Disclaimer */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 block tracking-wide">
                  Direct confirmation sent via email upon scheduling.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0B7FB5] hover:bg-[#0077B6] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md focus:ring-2 focus:ring-[#063B45] focus:outline-none cursor-pointer"
                >
                  Confirm Booking Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Modal Body (Success State) */
          <div id="booking-success-state" className="p-8 text-center font-sans my-auto">
            <div className="w-12 h-12 rounded-full bg-[#00C8A0]/15 text-[#00C8A0] flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#0A1926] mb-2">Request Received</h4>
            <p className="text-xs text-[#063B45]/80 leading-relaxed max-w-sm mx-auto mb-6">
              Thanks — we'll be in touch to confirm your session and finalize your wave schedule at Bilaj Al Jazayer.
            </p>
            <button
              id="booking-reset-btn"
              onClick={onClose}
              className="bg-[#0A1926] hover:bg-[#063B45] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
