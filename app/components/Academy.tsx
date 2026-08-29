"use client";

import gsap from "gsap";

export default function Academy() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnterBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.04, y: -2, duration: 0.3, ease: "back.out(1.4)", overwrite: "auto" });
  };

  const handleMouseLeaveBtn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section id="academy" className="relative w-full py-16 sm:py-20 bg-[#0A1926] text-white overflow-hidden z-10">
      {/* Dark Ocean Photographic Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/create_a_video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1926] via-[#0A1926]/90 to-transparent z-0"></div>

      {/* Asymmetric Direct Overlay Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl text-left">
          
          {/* Plain Typographic Eyebrow */}
          <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.2em] uppercase mb-4 block">
            CLUB HAWAII SURF ACADEMY
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6">
            Master the Waves with <span className="italic font-normal text-[#00C8A0]">World-Class Coaching</span>
          </h2>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
            From first-time pop-ups to advanced video analysis and tube-riding technique, our ISA-certified coaches deliver tailored 1-on-1 and group progression programs.
          </p>

          {/* Asymmetric Off-Grid Specs */}
          <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/15 mb-8">
            <div>
              <span className="text-xs uppercase font-bold text-[#00C8A0] tracking-wider block mb-1">ISA-Certified</span>
              <span className="text-sm font-semibold text-white/90">Professional Master Coaches</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#00C8A0] tracking-wider block mb-1">Video Analytics</span>
              <span className="text-sm font-semibold text-white/90">Multi-Angle Technique Review</span>
            </div>
          </div>

          <a
            href="#visit"
            onClick={(e) => handleNavClick(e, "#visit")}
            onMouseEnter={handleMouseEnterBtn}
            onMouseLeave={handleMouseLeaveBtn}
            className="inline-flex items-center gap-2 bg-[#0B7FB5] hover:bg-[#0077B6] text-white px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
          >
            <span>Explore Academy Coaching</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
}
