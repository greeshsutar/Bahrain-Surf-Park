"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getPageContext, QuickAction } from "../../constants/conciergeData";
import { useBooking } from "../../context/BookingContext";
import { useLanguage } from "../../context/LanguageContext";
import { ConciergeResponseBody } from "../../api/concierge/route";

export interface MessageItem {
  id: string;
  sender: "user" | "concierge";
  text: string;
  suggestedActions?: QuickAction[];
  actionCTA?: {
    type: "BOOKING" | "MAP" | "QUICK_ACTION";
    label: string;
    payload?: string;
    href?: string;
  };
  timestamp: string;
}

interface ConciergePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConciergePanel({ isOpen, onClose }: ConciergePanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpenBooking } = useBooking();
  const { lang } = useLanguage();
  const isRtl = lang === "ar";

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contextConfig = getPageContext(pathname);

  // Initialize Concierge session with Context-Aware first message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: MessageItem = {
        id: "msg-welcome",
        sender: "concierge",
        text: isRtl
          ? "مرحبًا بك في حديقة البحرين لركوب الأمواج! أنا كونسيرج ركوب الأمواج. يمكنني مساعدتك في استكشاف مستويات الأمواج، لوجستيات الزيارة، أو الحجز."
          : `${contextConfig.headerPrompt}\n\nWelcome to Bahrain Surf Park! I'm your Surf Concierge. I can guide you through wave levels, visit logistics, technology, or assist with booking your session.`,
        suggestedActions: isRtl
          ? [
              { label: "مستويات الأمواج", query: "ما هي مستويات الأمواج المتاحة؟" },
              { label: "احجز جلسة", query: "كيف يمكنني حجز جلسة ركوب أمواج؟" },
              { label: "الكابانات الفاخرة", query: "أخبرني عن الكابانات الفاخرة" },
            ]
          : contextConfig.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([initialMessage]);
    }
  }, [contextConfig, messages.length, isRtl]);

  // Dynamic Context update when pathname changes
  useEffect(() => {
    if (messages.length > 0) {
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const lastMsg = prev[prev.length - 1];
        if (lastMsg.sender === "concierge" && !lastMsg.actionCTA) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...lastMsg,
            suggestedActions: contextConfig.suggestions,
          };
          return updated;
        }
        return prev;
      });
    }
  }, [pathname, contextConfig]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // ESC Key close listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || inputQuery).trim();
    if (!queryText || isLoading) return;

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText, pathname }),
      });

      if (!res.ok) throw new Error("API response error");

      const data: ConciergeResponseBody = await res.json();

      const conciergeMsg: MessageItem = {
        id: `concierge-${Date.now()}`,
        sender: "concierge",
        text: data.reply,
        suggestedActions: data.suggestedActions,
        actionCTA: data.actionCTA,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, conciergeMsg]);
    } catch (err) {
      console.error("Concierge messaging error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: "concierge",
          text: "Something went wrong. Please try asking your question again.",
          suggestedActions: [{ label: "TRY AGAIN", query: "How can I plan my surf experience?" }],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCTAAction = (cta: MessageItem["actionCTA"]) => {
    if (!cta) return;
    if (cta.type === "BOOKING") {
      onOpenBooking(cta.payload);
    } else if (cta.type === "MAP") {
      if (pathname === "/" || pathname === "/visit") {
        const visitElem = document.getElementById("visit");
        if (visitElem) {
          visitElem.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      router.push("/visit#visit");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Bahrain Surf Park Surf Concierge"
      className="fixed z-[9999] transition-all duration-300 ease-out flex flex-col overflow-hidden bg-[#061B24]/95 text-white border border-[#00C8A0]/25 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] animate-greeting-appear bottom-20 right-5 sm:right-7 lg:bottom-[108px] lg:right-[28px] w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[82vh] rounded-2xl max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:h-[88vh] max-sm:max-h-[88vh] max-sm:rounded-t-3xl max-sm:rounded-b-none"
    >
      {/* Ambient Radial Atmosphere Glow Layers inside Panel */}
      <div className="absolute top-0 right-0 w-[280px] h-[280px] bg-[#00C8A0]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[240px] h-[240px] bg-[#0B7FB5]/[0.08] rounded-full blur-3xl pointer-events-none" />

      {/* Refined Ocean Header */}
      <div className="bg-[#0A1926]/90 backdrop-blur-md text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          {/* Surf Concierge Avatar Container */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#0B7FB5]/30 to-[#0A1926] border border-[#00C8A0]/40 flex items-center justify-center shrink-0 p-1.5 shadow-inner">
            <svg
              viewBox="0 0 56 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-sm"
              aria-label="Surf Concierge Robot"
            >
              {/* Antenna */}
              <line x1="28" y1="7" x2="28" y2="13" stroke="#00C8A0" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="28" cy="5" r="2.5" fill="#00C8A0"/>

              {/* Head */}
              <rect x="14" y="13" width="28" height="20" rx="7" fill="white" fillOpacity="0.95"/>

              {/* Eyes */}
              <circle cx="22" cy="23" r="4" fill="#0B7FB5"/>
              <circle cx="34" cy="23" r="4" fill="#0B7FB5"/>
              <circle cx="22" cy="23" r="2.2" fill="#00C8A0"/>
              <circle cx="34" cy="23" r="2.2" fill="#00C8A0"/>
              <circle cx="23" cy="22" r="0.8" fill="white"/>
              <circle cx="35" cy="22" r="0.8" fill="white"/>

              {/* Mouth */}
              <rect x="22" y="29" width="12" height="2.5" rx="1.25" fill="#C8E8F0"/>

              {/* Neck */}
              <rect x="25" y="33" width="6" height="3" rx="1.5" fill="white" fillOpacity="0.6"/>

              {/* Body */}
              <rect x="12" y="36" width="32" height="20" rx="8" fill="white" fillOpacity="0.9"/>

              {/* Chest badge */}
              <rect x="21" y="42" width="14" height="8" rx="3" fill="#0B7FB5"/>
              <circle cx="25" cy="46" r="1.5" fill="#00C8A0"/>
              <circle cx="28" cy="46" r="1.5" fill="white"/>
              <circle cx="31" cy="46" r="1.5" fill="#00C8A0"/>

              {/* Arms */}
              <rect x="3" y="37" width="9" height="14" rx="4.5" fill="white" fillOpacity="0.9"/>
              <rect x="44" y="37" width="9" height="14" rx="4.5" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <div>
            <div className="text-[9.5px] font-extrabold uppercase tracking-[0.22em] text-[#00C8A0] block mb-0.5">
              BAHRAIN SURF PARK
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span>SURF CONCIERGE</span>
              <span className="inline-flex items-center gap-1 text-[9.5px] font-extrabold text-[#00C8A0] tracking-widest normal-case ml-1 bg-[#00C8A0]/10 px-2 py-0.5 rounded-full border border-[#00C8A0]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8A0] animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Concierge"
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Calm Deep Ocean Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-left bg-[#03131A] relative z-10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} animate-fadeIn`}
          >
            {/* Sender Label */}
            <span className={`text-[9px] font-extrabold uppercase tracking-[0.2em] mb-1 px-1 flex items-center gap-1.5 ${
              msg.sender === "user" ? "text-white/50" : "text-[#00C8A0]"
            }`}>
              {msg.sender === "user" ? (
                "YOU"
              ) : (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#00C8A0]" />
                  <span>SURF CONCIERGE</span>
                </>
              )}
            </span>

            {/* Bubble Container */}
            <div
              className={
                msg.sender === "user"
                  ? "bg-[#0A1926] text-white rounded-2xl rounded-tr-xs px-4 py-3 text-xs sm:text-sm font-medium max-w-[85%] shadow-md border border-[#00C8A0]/35 font-sans"
                  : "bg-[#F7F7F3] text-[#0A1926] rounded-2xl rounded-tl-xs p-4 shadow-lg border border-white/20 text-xs sm:text-sm leading-relaxed max-w-[90%] font-sans"
              }
            >
              {/* Formatted Text Lines */}
              <div className="whitespace-pre-line">
                {msg.text.split("\n\n").map((paragraph, pIdx) => (
                  <p key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>
                    {paragraph.split("**").map((part, bIdx) =>
                      bIdx % 2 === 1 ? <strong key={bIdx} className="font-bold text-[#0B7FB5]">{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>

              {/* Action CTA Button */}
              {msg.actionCTA && (
                <div className="mt-3.5 pt-3 border-t border-slate-200/80">
                  <button
                    onClick={() => handleCTAAction(msg.actionCTA)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00C8A0] hover:bg-[#00E5B3] text-[#0A1926] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group/cta"
                  >
                    <span>{msg.actionCTA.label}</span>
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action Suggestions */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 max-w-[95%]">
                {msg.suggestedActions.map((action, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={() => handleSendMessage(action.query)}
                    className="text-[10.5px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#00C8A0] text-white/90 hover:text-[#0A1926] border border-white/15 hover:border-[#00C8A0] transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex flex-col items-start animate-pulse">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#00C8A0] mb-1 px-1 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00C8A0]" />
              <span>SURF CONCIERGE</span>
            </span>
            <div className="bg-[#F7F7F3] rounded-2xl rounded-tl-xs px-4 py-3 shadow-md flex items-center gap-2 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Dark Glass Input Bar */}
      <div className="p-3.5 sm:p-4 bg-[#0A1926]/95 backdrop-blur-md border-t border-white/10 shrink-0 relative z-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white/5 border border-white/15 rounded-xl px-3.5 py-1.5 focus-within:border-[#00C8A0] focus-within:bg-white/10 transition-all shadow-inner"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={isRtl ? "اسأل الكونسيرج عن الأمواج والأسعار أو الحجز..." : "ASK ABOUT YOUR SURF EXPERIENCE..."}
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none py-1.5 font-sans font-medium"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            aria-label="Send message"
            className="w-8.5 h-8.5 rounded-lg bg-[#00C8A0] hover:bg-[#00E5B3] disabled:opacity-30 text-[#0A1926] flex items-center justify-center transition-all cursor-pointer shrink-0 font-bold shadow-md hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
