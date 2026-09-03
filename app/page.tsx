"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CinematicIntro from "./components/CinematicIntro";
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
      <CinematicIntro onOpenBooking={handleOpenBooking} />
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
