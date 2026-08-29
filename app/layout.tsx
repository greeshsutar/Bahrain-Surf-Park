import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Bahrain Surf Park — World-Class Surf Meets Island Luxury",
  description: "Experience Bahrain's Premier Surfing Destination at Bilaj Al Jazayer. Wavegarden Cove technology, ocean luxury, and waves for all skill levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable} scroll-smooth bg-white text-[#0B1926]`}
    >
      <body className="bg-white text-[#0A1926] antialiased selection:bg-[#00C8A0]/30 selection:text-[#0B7FB5] m-0 p-0 relative">
        {children}
      </body>
    </html>
  );
}
