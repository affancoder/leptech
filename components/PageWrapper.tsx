'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicLoader from './CinematicLoader';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Lock scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      <CinematicLoader onComplete={() => setIsLoading(false)} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          scale: isLoading ? 0.98 : 1,
          transition: { 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1], // easeOutQuart
            delay: 0.2 // Small buffer after loader starts fading
          }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageWrapper;
