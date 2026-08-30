"use client";

import React, { createContext, useContext } from "react";

interface BookingContextType {
  onOpenBooking: (tier?: string) => void;
}

const BookingContext = createContext<BookingContextType>({
  onOpenBooking: () => {},
});

export const BookingProvider = BookingContext.Provider;

export const useBooking = () => useContext(BookingContext);
