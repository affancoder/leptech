'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete?: () => void;
}

const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fixed duration of 4.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 1000); // Wait for fade out animation to finish
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: 'blur(20px)',
            transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          {/* Brand Logo/Name Container */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 1.5, 
                  ease: "easeOut" 
                } 
              }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                Leptech.ai
              </h1>
            </motion.div>

            {/* Cinematic Progress Bar */}
            <div className="w-48 md:w-64 h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ 
                  width: '100%',
                  transition: { 
                    delay: 1.5,
                    duration: 2, 
                    ease: "easeInOut" 
                  } 
                }}
                className="absolute inset-0 bg-white"
              />
            </div>
            
            {/* Subtle subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0.5],
                transition: { 
                  delay: 0.5,
                  duration: 2,
                  times: [0, 0.5, 1]
                }
              }}
              className="mt-4 text-[10px] tracking-[0.4em] text-white/40 uppercase"
            >
              Experience the Future
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
