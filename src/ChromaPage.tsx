import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ChromaPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  }, []);

  return (
    <div className="relative h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-opacity duration-1000"
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            // Avoid errors if duration is not fully loaded
            if (!video.duration) return;
            const timeLeft = video.duration - video.currentTime;
            // Fade out slightly before the loop point, fade in right after
            if (timeLeft < 1.0 || video.currentTime < 0.2) {
              video.style.opacity = "0.7";
            } else {
              video.style.opacity = "1";
            }
          }}
        >
          <source src="/tree.mp4" type="video/mp4" />
        </video>
        {/* 50% Black Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Navbar */}
        <header className="w-full px-6 md:px-[120px] py-[20px] flex justify-between items-center shrink-0">
          {/* Left Side */}
          <div className="flex items-center gap-[30px]">
            {/* Logo Wordmark Placeholder */}
            <div 
              className="w-[187px] h-[25px] flex items-center cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <ArrowLeft size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity -ml-6" />
              <span className="text-[20px] font-bold tracking-widest uppercase">Designcraft</span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-[30px]">
              {/* Removed Nav Links */}
            </nav>
          </div>

          {/* Right Side - Empty space to balance layout after removing Platform button */}
          <div className="w-[100px]"></div>
        </header>

        {/* Hero Content */}
        <main className="flex-grow flex flex-col items-center justify-center pb-20 px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center w-full max-w-4xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-[6px] rounded-[20px] bg-white/10 border border-white/20 mb-[30px] sm:mb-[40px]">
              <div className="w-1 h-1 rounded-full bg-white ml-1 shrink-0"></div>
              <div className="text-[11px] sm:text-[13px] font-medium tracking-wide">
                <span className="text-white/60">Mastering the balance between </span>
                <span className="text-white block sm:inline">aesthetics and functionality</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[32px] sm:text-[40px] md:text-[56px] font-medium leading-[1.15] md:leading-[1.28] tracking-tight max-w-[613px]"
                style={{
                  background: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent"
                }}
            >
              Understanding UI vs UX Design
            </h1>

            {/* Subtitle */}
            <p className="mt-[20px] sm:mt-[24px] mb-[32px] sm:mb-[40px] text-[15px] sm:text-[16px] md:text-[18px] font-normal leading-relaxed text-white/70 max-w-[680px] px-2 sm:px-0">
              User Interface (UI) focuses on the visual elements—how things look and feel. User Experience (UX) focuses on the overall journey—how things work and function together. You need both to build a successful digital product.
            </p>

            {/* CTA Link */}
            <a href="https://www.figma.com/resource-library/difference-between-ui-and-ux/" target="_blank" rel="noopener noreferrer" className="relative cursor-pointer rounded-full p-[0.6px] overflow-hidden bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] group transition-transform hover:scale-105 active:scale-95 block">
              {/* Subtle glow streak on top edge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[8px] bg-white opacity-80 blur-[4px]"></div>
              
              {/* Inner White Pill */}
              <div className="relative bg-white rounded-full px-[29px] py-[11px]">
                <span className="text-[14px] font-medium text-black">Learn more</span>
              </div>
            </a>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
