import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function ResponsePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-white selection:text-black">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        onTimeUpdate={(e) => {
          const video = e.currentTarget;
          if (!video.duration) return;
          const timeLeft = video.duration - video.currentTime;
          if (timeLeft < 1.0 || video.currentTime < 0.2) {
            video.style.opacity = "0.7";
          } else {
            video.style.opacity = "1";
          }
        }}
      >
        <source src="/mauricio.mp4" type="video/mp4" /> 
      </video>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 w-full px-8 py-8 md:px-16 md:py-12 flex justify-between items-center max-w-[1400px] mx-auto">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} className="text-white transition-colors" />
          </div>
          <span className="text-[11px] tracking-[0.4em] font-bold uppercase transition-colors text-white/90 group-hover:text-white">DesignCraft</span>
        </div>
        
        <nav className="hidden md:flex gap-10 text-[10px] tracking-[0.3em] font-semibold text-white/50">
          <span className="text-white">ARCHITECTURE</span>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col justify-center items-center h-[calc(100vh-200px)] text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 }}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8 px-5 py-2 border border-white/15 rounded-full bg-white/5 backdrop-blur-md"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white">Module 04 / Validating Ideas</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[50px] sm:text-[70px] md:text-[90px] lg:text-[110px] font-medium tracking-tighter mb-8 leading-[0.9]"
          >
            Launch faster with a <br />
            Minimum Viable Product.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-base md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Focus on building what actually matters first. An MVP is the core version of your idea. It helps you test your assumptions, get real user feedback, and keep moving forward quickly without getting stuck building unnecessary features.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center"
          >
            <a href="https://www.figma.com/resource-library/what-is-a-minimum-viable-product/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white text-black text-[11px] tracking-[0.2em] font-bold uppercase hover:bg-zinc-200 transition-colors hover:scale-105 transform duration-300 inline-block">
              Learn about MVP
            </a>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Bottom Interface Elements */}
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-10 flex gap-12 font-mono text-[9px] tracking-widest uppercase text-white/40">
        <div>
          <div className="mb-1 text-white/20">Engine</div>
          <div>Active</div>
        </div>
        <div>
          <div className="mb-1 text-white/20">Latency</div>
          <div>14ms</div>
        </div>
      </div>
    </div>
  );
}
