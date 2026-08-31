"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import ScrollTracker from "./components/ScrollTracker";
import Hero from "./components/Hero";
import QuickNav from "./components/QuickNav";
import Technology from "./components/Technology";

import FindYourWave from "./components/FindYourWave";
import Academy from "./components/Academy";
import Cabanas from "./components/Cabanas";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import WelcomeModal from "./components/WelcomeModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingTier, setSelectedBookingTier] = useState<string | undefined>(undefined);

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

  return (
    <main className="min-h-screen bg-white text-[#0A1926] relative">
      <Navbar onOpenBooking={handleOpenBooking} />
      <ScrollTracker />
      <Hero onOpenBooking={handleOpenBooking} />
      <QuickNav />
      <Technology />
      <FindYourWave onOpenBooking={handleOpenBooking} />
      <Academy />
      <Cabanas />
      <Visit onOpenBooking={handleOpenBooking} />
      <Footer onOpenBooking={handleOpenBooking} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedTier={selectedBookingTier}
      />
      <WelcomeModal />
    </main>
  );
}
