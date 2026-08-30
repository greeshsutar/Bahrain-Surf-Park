"use client";

export default function SurfEmotion() {
  return (
    <section className="bg-[#082F3D] text-white py-20 sm:py-28 relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/5] bg-slate-900">
              <img src="/images/tier2.jpg" alt="Surfer smile" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/5] bg-slate-900 translate-y-6">
              <img src="/images/tier3.jpg" alt="Lagoon sunset" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6">
            <span className="text-[#00C8A0] text-xs font-extrabold tracking-[0.25em] uppercase mb-3 block">
              THE HUMAN EXPERIENCE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-6">
              MORE THAN A WAVE.
            </h2>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans mb-6">
              Bahrain Surf Park is built on the feeling of stepping out of your routine and into the water. It is about the surge of confidence after catching your first wave, the shared laughter on the shore, and the quiet satisfaction of watching the sun dip over Bilaj Al Jazayer.
            </p>

            <p className="text-white/70 text-sm leading-relaxed font-sans mb-8">
              Whether you are riding with family, training for competition, or unwinding on the terrace with friends — every session creates memories that linger long after the water settles.
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-white/15 text-xs font-bold text-[#00C8A0] uppercase tracking-wider">
              <span>CONFIDENCE</span>
              <span>•</span>
              <span>COMMUNITY</span>
              <span>•</span>
              <span>ACHIEVEMENT</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
