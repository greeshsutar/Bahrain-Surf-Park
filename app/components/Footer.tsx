export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0A1926] text-white py-12 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Bahrain Surf Park" className="h-8 w-auto object-contain" />
          <span className="text-white/80 font-bold tracking-wider uppercase text-[11px]">Bahrain Surf Park</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-semibold uppercase tracking-widest text-[10px]">
          <a
            href="#technology"
            onClick={(e) => handleNavClick(e, "#technology")}
            className="hover:text-[#00C8A0] transition-colors"
          >
            Technology
          </a>
          <a
            href="#find-your-wave"
            onClick={(e) => handleNavClick(e, "#find-your-wave")}
            className="hover:text-[#00C8A0] transition-colors"
          >
            The Wave
          </a>
          <a
            href="#academy"
            onClick={(e) => handleNavClick(e, "#academy")}
            className="hover:text-[#00C8A0] transition-colors"
          >
            Academy
          </a>
          <a
            href="#cabanas"
            onClick={(e) => handleNavClick(e, "#cabanas")}
            className="hover:text-[#00C8A0] transition-colors"
          >
            Cabanas
          </a>
          <a
            href="#visit"
            onClick={(e) => handleNavClick(e, "#visit")}
            className="hover:text-[#00C8A0] transition-colors"
          >
            Plan Your Visit
          </a>
        </div>
        <div>
          <span>&copy; 2026 Bahrain Surf Park. Bilaj Al Jazayer, Kingdom of Bahrain.</span>
        </div>
      </div>
    </footer>
  );
}
