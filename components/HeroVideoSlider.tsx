"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

const videos: string[] = [
  "/videos/video2.mp4",
  "/videos/video1.mp4",
  "/videos/video3.mp4",
];

const HeroVideoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 150 });

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

  // ✅ CORE FIX: single video switching
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = videos[currentSlide];
    video.load();

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [currentSlide]);

  // Cursor movement
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Play / Pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
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

      {/* VIDEO (single, mobile safe) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/fallback.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
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

            {/* White line */}
            <div className="hidden md:block h-[2px] w-full bg-white mb-4" />

            <p className="text-sm text-white/70">
              Expertly crafted fragrances that bring your stories to life.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="p-3 bg-white/10 rounded-full text-white"
        >
          ◀
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
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
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroVideoSlider;