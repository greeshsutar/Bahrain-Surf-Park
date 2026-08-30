import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A1926] text-white py-12 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
        <div className="flex items-center gap-3">
          <Link href="/">
            <img src="/images/logo.png" alt="Bahrain Surf Park" className="h-12 sm:h-14 w-auto object-contain cursor-pointer" />
          </Link>
          <span className="text-white/80 font-bold tracking-wider uppercase text-xs">Bahrain Surf Park</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-semibold uppercase tracking-widest text-[10px]">
          <Link href="/surf" className="hover:text-[#00C8A0] text-[#00C8A0] font-bold transition-colors">
            Surf
          </Link>
          <Link href="/technology" className="hover:text-[#00C8A0] transition-colors">
            Technology
          </Link>
          <Link href="/find-your-wave" className="hover:text-[#00C8A0] transition-colors">
            The Wave
          </Link>
          <Link href="/academy" className="hover:text-[#00C8A0] transition-colors">
            Academy
          </Link>
          <Link href="/services" className="hover:text-[#00C8A0] transition-colors">
            Services
          </Link>
          <Link href="/cabanas" className="hover:text-[#00C8A0] transition-colors">
            Cabanas
          </Link>
          <Link href="/visit" className="hover:text-[#00C8A0] transition-colors">
            Plan Your Visit
          </Link>
        </div>

        <div>
          <span>&copy; 2026 Bahrain Surf Park. </span>
          <a
            href="https://maps.app.goo.gl/qcxXGozrQb9vLgnX8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00C8A0] underline underline-offset-2 transition-colors inline-flex items-center gap-1"
          >
            <span>Bilaj Al Jazayer, Kingdom of Bahrain</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>

      {/* Stakeholder & Partner Logos Row per Spec Section 6 */}
      {/* NOTE: Replace text wordmarks with official vector/raster logo assets in /public/images/partners/ when available */}
      <div className="border-t border-white/10 pt-6 mt-6 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40">
          DEVELOPMENT & TECHNOLOGY PARTNERS
        </span>
        <div className="flex items-center gap-6 sm:gap-8 text-white/70 font-serif tracking-widest text-xs uppercase font-bold">
          <span className="hover:text-[#00C8A0] transition-colors cursor-default">EDAMAH</span>
          <span className="text-white/20">•</span>
          <span className="hover:text-[#00C8A0] transition-colors cursor-default">GFH FINANCIAL GROUP</span>
          <span className="text-white/20">•</span>
          <span className="hover:text-[#00C8A0] transition-colors cursor-default">WAVEGARDEN</span>
        </div>
      </div>
    </footer>
  );
}
