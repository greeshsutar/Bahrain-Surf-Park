"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getPageContext, QuickAction } from "../../constants/conciergeData";
import { useBooking } from "../../context/BookingContext";
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
        text: `${contextConfig.headerPrompt}\n\nWelcome to Bahrain Surf Park! I'm your Surf Concierge. I can guide you through wave levels, visit logistics, technology, or assist with booking your session.`,
        suggestedActions: contextConfig.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([initialMessage]);
    }
  }, [contextConfig, messages.length]);

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
      className="fixed z-[9999] transition-all duration-300 ease-out flex flex-col overflow-hidden bg-[#0B7FB5] text-white border-2 border-white/20 shadow-2xl shadow-[#0A1926]/50 animate-greeting-appear bottom-20 right-5 sm:right-7 lg:bottom-[108px] lg:right-[28px] w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[82vh] rounded-2xl max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:h-[88vh] max-sm:max-h-[88vh] max-sm:rounded-t-3xl max-sm:rounded-b-none"
    >
      {/* Ocean Blue Concierge Header */}
      <div className="bg-[#086F9F] text-white px-5 py-4 flex items-center justify-between border-b border-white/20 shrink-0 relative">
        <div className="flex items-center gap-3">
          {/* Surf Concierge Robot Character Emblem */}
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-[#00C8A0]/60 flex items-center justify-center shrink-0 overflow-hidden p-1.5 shadow-inner">
            <svg
              className="w-full h-full text-[#00C8A0]"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Bahrain Surf Concierge Emblem"
            >
              <path
                d="M 6 32 C 14 20, 24 18, 34 24 C 38 27, 41 26, 43 22"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 6 37 C 16 26, 28 25, 37 31 C 41 34, 43 33, 45 30"
                stroke="#00C8A0"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 28 8 C 33 14, 31 25, 18 36 C 17 37, 15 35, 16 34 C 23 23, 26 13, 28 8 Z"
                fill="url(#surf-concierge-panel-grad)"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              <path
                d="M 11 25 C 16 16, 25 14, 31 18 C 35 21, 36 25, 33 27 C 30 29, 27 27, 29 24"
                stroke="#00C8A0"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 37 8 L 38.5 11 L 41.5 12.5 L 38.5 14 L 37 17 L 35.5 14 L 32.5 12.5 L 35.5 11 Z"
                fill="#00C8A0"
              />
              <defs>
                <linearGradient id="surf-concierge-panel-grad" x1="16" y1="36" x2="31" y2="8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00C8A0" />
                  <stop offset="1" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00C8A0]">
              BAHRAIN SURF PARK
            </div>
            <div className="text-sm font-bold tracking-wide uppercase text-white flex items-center gap-2">
              <span>SURF CONCIERGE</span>
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Concierge"
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Solid Ocean Blue Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-left bg-[#0B7FB5]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} animate-fadeIn`}
          >
            {/* Sender Label */}
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-100 mb-1 px-1">
              {msg.sender === "user" ? "YOU" : "SURF CONCIERGE"}
            </span>

            {/* Bubble Container */}
            <div
              className={
                msg.sender === "user"
                  ? "bg-[#0A1926] text-white rounded-2xl rounded-tr-xs px-4 py-2.5 text-xs sm:text-sm font-medium max-w-[85%] shadow-md border border-[#00C8A0]/50"
                  : "bg-white text-[#0A1926] rounded-2xl rounded-tl-xs p-4 shadow-md text-xs sm:text-sm leading-relaxed max-w-[92%]"
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
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => handleCTAAction(msg.actionCTA)}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#00C8A0] hover:bg-[#00E5B3] text-[#0A1926] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>{msg.actionCTA.label}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action Suggestions */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                {msg.suggestedActions.map((action, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={() => handleSendMessage(action.query)}
                    className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0A1926] border border-white/40 transition-all shadow-xs cursor-pointer"
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
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-100 mb-1 px-1">
              SURF CONCIERGE
            </span>
            <div className="bg-white rounded-2xl rounded-tl-xs px-4 py-3 shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#00C8A0] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3.5 bg-[#086F9F] border-t border-white/20 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white/15 border border-white/30 rounded-xl px-3 py-1.5 focus-within:border-[#00C8A0] focus-within:bg-white/25 transition-all shadow-inner"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="ASK ABOUT YOUR SURF EXPERIENCE..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-white/70 focus:outline-none py-1.5 font-sans font-medium"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            aria-label="Send message"
            className="w-8 h-8 rounded-lg bg-[#00C8A0] hover:bg-[#00E5B3] disabled:opacity-40 text-[#0A1926] flex items-center justify-center transition-all cursor-pointer shrink-0 font-bold"
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
