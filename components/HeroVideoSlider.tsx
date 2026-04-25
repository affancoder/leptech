"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

const videos: string[] = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
];

const HeroVideoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [readySlides, setReadySlides] = useState<Set<number>>(new Set([0]));

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  // ✅ On mount: eagerly preload ALL videos so mobile has them ready
  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (!vid) return;
      vid.preload = "auto";
      vid.load();
      // Mark as ready once it can play through
      const onCanPlay = () => {
        setReadySlides((prev) => new Set([...prev, index]));
      };
      vid.addEventListener("canplaythrough", onCanPlay, { once: true });
    });
  }, []);

  // ✅ When slide changes, play current video and pause others
  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (!vid) return;
      if (index === currentSlide) {
        // Reset to start for clean transition
        vid.currentTime = 0;
        // Use a small delay to let opacity transition start first
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked — try muted play as fallback
            vid.muted = true;
            vid.play().catch(() => {});
          });
        }
      } else {
        vid.pause();
      }
    });
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  // Auto slide
  useEffect(() => {
    if (isPaused || !isPlaying) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, isPlaying]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentSlide];
    if (!currentVideo) return;
    if (isPlaying) {
      currentVideo.pause();
    } else {
      currentVideo.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black md:cursor-none group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={togglePlayPause}
    >
      {/* Cursor */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <span className="text-white text-xs uppercase">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Videos */}
      <div className="absolute inset-0 z-0 bg-black">
        {videos.map((video, index) => (
          <video
            key={video}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={video}
            muted
            loop
            playsInline
            // ✅ Preload ALL videos as "auto", not just the first
            preload="auto"
            // ✅ Keep all videos mounted in DOM but hidden via opacity
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: index === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* Content */}
      <div className="absolute bottom-16 left-6 md:bottom-20 md:left-20 z-20 text-white max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              BOTTLE THE MOMENT
            </h1>
            <h2 className="text-xl md:text-2xl mb-6 uppercase font-light">
              BESPOKE SCENTS FOR UNFORGETTABLE MEMORIES
            </h2>
            <div className="hidden md:block h-[2px] w-full bg-white mb-4" />
            <p className="text-sm text-white/70">
              Expertly crafted fragrances that bring your stories to life.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Begin The Journey */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-6 md:right-12 lg:right-16 z-30 text-white text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase whitespace-nowrap pointer-events-none opacity-80"
      >
        BEGIN THE JOURNEY &#x25CB;
      </motion.div>

      {/* Arrows */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="p-3 bg-white/10 rounded-full text-white"
        >
          ◀
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="p-3 bg-white/10 rounded-full text-white"
        >
          ▶
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroVideoSlider;