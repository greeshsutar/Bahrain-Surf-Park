"use client";

import Visit from "../components/Visit";
import { useBooking } from "../context/BookingContext";

export default function VisitPage() {
  const { onOpenBooking } = useBooking();

  return <Visit onOpenBooking={onOpenBooking} />;
}
