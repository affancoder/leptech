"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useLowEndDevice } from "@/hooks/useLowEndDevice";

interface Slide {
  heading: string;
  subheading: string;
  cta: string;
}

const videos: string[] = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
];

const slides: Slide[] = [
  {
    heading: "Build Your Brand",
    subheading:
      "Elevate your digital presence with cutting-edge design and technology.",
    cta: "Get Started",
  },
  {
    heading: "Innovate Faster",
    subheading:
      "Streamline your workflow with our powerful and intuitive platform.",
    cta: "Learn More",
  },
  {
    heading: "Design for Tomorrow",
    subheading:
      "Future-proof your business with scalable solutions built for growth.",
    cta: "Contact Us",
  },
];

const HeroVideoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Cursor motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for the cursor
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (isPaused || !isPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused, isPlaying]);

  // Mouse move handler for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Play/Pause toggle
  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Ensure video playback state is correct when changing slides
  useEffect(() => {
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play().catch(() => {
          // Handle potential play() interruption
          console.warn("Video play interrupted");
        });
      } else {
        currentVideo.pause();
      }
    }
  }, [currentSlide, isPlaying]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black md:cursor-none group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={togglePlayPause}
    >
      {/* Custom Cursor */}
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
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center text-white font-bold tracking-widest text-xs uppercase">
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm7.5 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Videos */}
      <div className="absolute inset-0 z-0">
        {videos.map((video, index) => (
          <video
            key={video}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: index === currentSlide ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/70 pointer-events-none" />

      {/* Hero Content */}
      <div className="absolute bottom-16 left-6 md:bottom-20 md:left-20 z-20 flex flex-col items-start gap-4 max-w-full md:max-w-xl text-left text-white pr-6 md:pr-0">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 leading-tight tracking-wide">
                BOTTLE THE MOMENT
              </h1>

              <h2 className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 whitespace-normal md:whitespace-nowrap tracking-wider uppercase font-light">
                BESPOKE SCENTS FOR UNFORGETTABLE MEMORIES
              </h2>

              <motion.div
                className="pointer-events-auto mt-4 cursor-pointer hidden md:block"
                whileHover="hover"
                initial="initial"
                animate="initial"
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center justify-between w-full">
                    <motion.div
                      variants={{
                        initial: { width: "100%" },
                        hover: { width: "100%" },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="h-[2px] bg-white"
                    />
                  </div>
                </div>
              </motion.div>

              <p className="text-xs md:text-sm lg:text-base text-white/70 mt-4 md:mt-2 mb-8 max-w-sm md:max-w-lg leading-relaxed font-light">
                Expertly crafted fragrances that bring your stories to life,
                from personal celebrations to corporate gifts
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-6 md:right-12 lg:right-16 z-30 text-white text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase whitespace-nowrap pointer-events-none opacity-80"
      >
        BEGIN THE JOURNEY &#x25CB;
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          onMouseEnter={() => {
            setIsPaused(true);
            setIsHovering(false);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsHovering(true);
          }}
          className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all backdrop-blur-sm group border border-white/10"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          onMouseEnter={() => {
            setIsPaused(true);
            setIsHovering(false);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsHovering(true);
          }}
          className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all backdrop-blur-sm group border border-white/10"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3 pointer-events-none">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            onMouseEnter={() => {
              setIsPaused(true);
              setIsHovering(false);
            }}
            onMouseLeave={() => {
              setIsPaused(false);
              setIsHovering(true);
            }}
            className={`pointer-events-auto h-2 transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroVideoSlider;