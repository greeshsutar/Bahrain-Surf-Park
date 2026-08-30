"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import WelcomeModal from "./WelcomeModal";
import { BookingProvider } from "../context/BookingContext";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingTier, setSelectedBookingTier] = useState<string | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = (tier?: string) => {
    setSelectedBookingTier(tier);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const isHomePage = pathname === "/";

  return (
    <BookingProvider value={{ onOpenBooking: handleOpenBooking }}>
      {isHomePage ? (
        children
      ) : (
        <>
          <Navbar onOpenBooking={handleOpenBooking} />
          <main className="min-h-screen bg-white text-[#0A1926] relative">
            {children}
          </main>
          <Footer />
          <BookingModal
            isOpen={isBookingOpen}
            onClose={handleCloseBooking}
            selectedTier={selectedBookingTier}
          />
          <WelcomeModal />
        </>
      )}
    </BookingProvider>
  );
}
