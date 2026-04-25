'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring for the progress ring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    // Optimized scroll listener
    let requestRunning = false;
    const handleScroll = () => {
      if (!requestRunning) {
        requestAnimationFrame(() => {
          toggleVisibility();
          requestRunning = false;
        });
        requestRunning = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.5, 
            y: 20,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.2)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed z-40 right-6 bottom-6 md:right-12 md:bottom-10 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-white transition-colors duration-300"
          aria-label="Scroll to top"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth="2"
              className="md:stroke-2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="100"
              style={{ pathLength: scrollYProgress }}
              className="md:stroke-2"
            />
          </svg>

          {/* Icon */}
          <motion.div
            animate={{ 
              y: [0, -4, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
