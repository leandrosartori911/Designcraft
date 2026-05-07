import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Shield, ArrowLeft } from 'lucide-react';
import Hls from 'hls.js';

const VideoPlayer = memo(({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls;

    if (Hls.isSupported() && src.includes('.m3u8')) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      // Fallback to native video if HLS is not supported or if it's just an mp4
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      } else {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [src]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-100 brightness-110 transition-opacity duration-500" // Increased brightness and duration
        style={{ transform: "scale(1.35) translateY(-5%)" }} // Scale to hide logo
        onTimeUpdate={(e) => {
          const video = e.currentTarget;
          const timeLeft = video.duration - video.currentTime;
          if (timeLeft < 0.5) {
            video.style.opacity = "0";
          } else if (timeLeft > 0.7) {
            video.style.opacity = "1";
          }
        }}
      />
    </div>
  );
});

export default function TypeFacePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black overflow-x-hidden">
      {/* Background Video */}
      <VideoPlayer src="/1777062887863-3a3b250a-91f9-4696-8a85-201a189f6da5.mp4" />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)]"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center w-full max-w-[1400px] mx-auto p-8 sm:p-16 mb-4">
        <div className="flex items-center gap-12">
          <div className="flex flex-col cursor-pointer group" onClick={() => onNavigate('home')}>
             {/* Simple back functionality while keeping the original logo style */}
            <span className="text-[10px] tracking-[0.4em] font-bold opacity-100 uppercase group-hover:text-zinc-400 transition-colors flex items-center gap-2">
              <ArrowLeft size={12} /> DesignCraft
            </span>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-6 max-w-4xl mx-auto w-full -mt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          {/* Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-4 mb-2">
            {[
              { icon: <Layers size={12} />, text: 'Prompt to UI' },
              { icon: <Zap size={12} />, text: 'Vibecoding' },
              { icon: <Shield size={12} />, text: 'AI Generation' },
            ].map((badge, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] tracking-[0.2em] font-medium uppercase text-zinc-300"
              >
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-[50px] sm:text-[60px] md:text-[80px] leading-[0.9] font-medium tracking-tighter"
          >
            Vibecode Your Next Website
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base leading-relaxed opacity-60 font-light max-w-2xl px-4"
          >
            Building websites/apps is no longer just about writing structural code. With AI, you can generate complete digital experiences seamlessly by simply describing your vision and letting intelligent systems handle the rest.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="mt-4">
            <a 
              href="https://www.figma.com/resource-library/ai-app-builders/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-white/10 hover:border-white/30 transition-all rounded-sm inline-block"
            >
              Start Vibecoding
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* Static Logo Marquee (Bottom) */}
      <footer className="relative z-10 mt-auto border-t border-white/10 p-8 overflow-hidden bg-black/40 backdrop-blur-sm">
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-24 opacity-40 grayscale">
          <a href="https://www.figma.com/make/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm tracking-[0.3em] font-bold uppercase transition-all hover:opacity-100 cursor-pointer">
            <img src="https://cdn.simpleicons.org/figma/white" alt="Figma" className="w-5 h-5" />
            FIGMA-MAKE
          </a>
          <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold text-sm tracking-widest italic uppercase transition-all hover:opacity-100 cursor-pointer">
            <img src="https://cdn.simpleicons.org/replit/white" alt="Replit" className="w-5 h-5" />
            REPLIT
          </a>
          <a href="https://lovable.dev/dashboard" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-sm tracking-tighter uppercase transition-all hover:opacity-100 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>LOVABLE</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
