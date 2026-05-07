import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isTechOpen, setIsTechOpen] = useState(false);
  
  const modules = [
    { id: "01", title: "DESIGN", desc: "Learn design basics", active: true },
    { id: "02", title: "BUILD WITH AI", desc: "Vibecode a site", active: false },
    { id: "03", title: "UI/UX", desc: "What is the difference between UI and UX?", active: false },
    { id: "04", title: "MVP", desc: "Minimum viable product", active: false },
  ];

  return (
    <div id="designer-page" className="relative min-h-screen bg-black text-white font-sans flex flex-col p-8 sm:p-16 selection:bg-white selection:text-black overflow-x-hidden">
      {/* Background Video & Fallback */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover opacity-70 brightness-125 transition-opacity duration-300"
          style={{
            transform: "scale(1.35) translate(15%, -5%)",
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            const timeLeft = video.duration - video.currentTime;
            if (timeLeft < 0.3) {
              video.style.opacity = "0";
            } else if (timeLeft > 0.5) {
              video.style.opacity = "0.7";
            }
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        
        {/* Cinematic Overlays similar to module 04 */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-full max-w-[1400px] mx-auto w-full flex-grow">
        {/* Header */}
        <header id="navbar" className="flex justify-between items-center mb-12 w-full">
          <div className="flex items-center gap-12">
            <span className="text-[10px] tracking-[0.4em] font-bold opacity-100 uppercase">DesignCraft</span>
            <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.3em] font-medium relative">
              <div className="relative">
                <button 
                  onClick={() => setIsTechOpen(!isTechOpen)}
                  className={`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-all uppercase tracking-[0.3em] ${isTechOpen ? 'opacity-100 bg-white/10 border-white/20' : 'opacity-80'}`}
                >
                  TECHNOLOGY
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isTechOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isTechOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 bg-black/80 backdrop-blur-md border border-white/20 p-4 min-w-[200px] flex flex-col gap-2 z-50 rounded-sm"
                    >
                      <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:bg-white/10 px-3 py-2.5 transition-colors opacity-70 hover:opacity-100">
                        <img src="https://cdn.simpleicons.org/figma/white" alt="Figma" className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                        FIGMA
                      </a>
                      <a href="https://penpot.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:bg-white/10 px-3 py-2.5 transition-colors opacity-70 hover:opacity-100">
                        <img src="https://cdn.simpleicons.org/penpot/white" alt="Penpot" className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                        PENPOT
                      </a>
                      <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:bg-white/10 px-3 py-2.5 transition-colors opacity-70 hover:opacity-100">
                        <img src="https://cdn.simpleicons.org/framer/white" alt="Framer" className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                        FRAMER
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>
          <div className="text-[10px] tracking-[0.3em] opacity-40 font-medium">APRIL 2026 EDITION</div>
        </header>

        {/* Hero Section */}
        <main id="hero-section" className="flex-grow flex flex-col justify-center mb-16 w-full">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="px-2 py-0.5 border border-white/30 text-[9px] tracking-tighter rounded-sm uppercase font-semibold">Vol. 01</span>
              <span className="text-[10px] font-bold tracking-[0.3em] opacity-60 uppercase">AI Web Builders</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[64px] sm:text-[80px] lg:text-[110px] leading-[0.85] font-light tracking-tighter mb-10 italic font-serif"
            >
              Design intelligent web interfaces through AI generation.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg lg:text-xl leading-relaxed opacity-70 font-light mb-12 max-w-2xl uppercase"
            >
              Website design is the process of creating the visual look, layout, and user experience of a website. It involves structuring information logically and constructing interfaces that are aesthetically pleasing and highly functional.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="https://www.figma.com/resource-library/design-basics/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white text-black text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-zinc-200 transition-colors inline-block text-center"
              >
                Start Designing
              </a>
            </motion.div>
          </div>
        </main>

        {/* Grid Section */}
        <section id="tabs-section" className="w-full">
          <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8 font-bold">MODULES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, idx) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                onClick={() => {
                  if (module.id === "02") {
                    onNavigate("typeface");
                  } else if (module.id === "03") {
                    onNavigate("chroma");
                  } else if (module.id === "04") {
                    onNavigate("response");
                  }
                }}
                className="group cursor-pointer"
              >
                <div className={`h-44 flex flex-col justify-between p-6 transition-all duration-300 backdrop-blur-sm ${
                  module.active 
                    ? "border-l-2 border-white bg-white/10" 
                    : "border-l border-white/5 bg-white/[0.02] opacity-50 hover:opacity-100 hover:bg-white/[0.05] hover:border-white/20"
                }`}>
                  <span className="text-[10px] font-mono opacity-50 font-medium tracking-widest">{module.id}</span>
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold tracking-[0.2em] uppercase leading-none">{module.title}</h4>
                    <p className="text-[9px] opacity-40 uppercase tracking-[0.15em] font-semibold">{module.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
