"use client";

import { useEffect, useState } from "react";
import { isReducedMotion } from "../constants/motion";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let minTimeDone = false;
    let windowLoaded = document.readyState === "complete";

    const tryFinish = () => {
      if (minTimeDone && windowLoaded) {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "";
        }, 650);
      }
    };

    const minTimer = setTimeout(() => {
      minTimeDone = true;
      tryFinish();
    }, 1200);

    const handleLoad = () => {
      windowLoaded = true;
      tryFinish();
    };

    if (document.readyState === "complete") {
      windowLoaded = true;
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  const reduced = isReducedMotion();

  return (
    <div
      id="page-loader-overlay"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02141C] transition-opacity duration-[650ms] ease-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-label="Bahrain Surf Park is loading"
    >
      <div className="relative flex flex-col items-center gap-6">
        <img
          src="/images/logo.png"
          alt="Bahrain Surf Park"
          className={`w-32 sm:w-40 h-auto ${!reduced ? "animate-loader-pulse" : ""}`}
        />

        <svg
          width="140"
          height="24"
          viewBox="0 0 140 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 16C14 16 14 6 26 6C38 6 38 18 50 18C62 18 62 4 74 4C86 4 86 20 98 20C110 20 110 8 122 8C130 8 134 12 138 14"
            stroke="#00C8A0"
            strokeWidth="2"
            strokeLinecap="round"
            className={!reduced ? "animate-loader-wave-draw" : ""}
            style={reduced ? { strokeDasharray: 240, strokeDashoffset: 0 } : undefined}
          />
        </svg>
      </div>
    </div>
  );
}
