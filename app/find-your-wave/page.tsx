"use client";

import FindYourWave from "../components/FindYourWave";
import { useBooking } from "../context/BookingContext";

export default function FindYourWavePage() {
  const { onOpenBooking } = useBooking();
  return <FindYourWave onOpenBooking={onOpenBooking} />;
}
