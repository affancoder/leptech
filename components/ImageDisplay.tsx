"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/img/bg.jpg",
  "/img/bg2.jpg",
  "/img/bg3.jpg",
];

const ImageDisplay = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;

      if (totalHeight <= 0) return;

      const progress = Math.min(
        Math.max(-rect.top / totalHeight, 0),
        1
      );

      const newIndex = Math.min(
        images.length - 1,
        Math.floor(progress * images.length)
      );

      setIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="h-[300vh] w-full">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full px-6 md:px-12 lg:px-20 py-20">
        
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              key={index} // forces clean change
              src={images[index]}
              alt="Background"
              fill
              priority
              className="object-cover transition-opacity duration-700"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl text-white px-8 md:px-14">

              <h1 className="text-3xl md:text-5xl font-semibold mb-4 uppercase">
                The Broken Gift
              </h1>

              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6">
                Move beyond predictable favors and corporate gifts to something
                genuinely memorable. Each recipient creates a personal fragrance
                that captures their unique experience or relationship.
              </p>

              <p className="text-base md:text-lg font-medium">
                How can you elevate your big day?
              </p>

              <div className="mt-6 flex items-center gap-3">
                <img src="/img/e.png" alt="E" className="w-6 h-6" />
                <div className="w-1/3 h-10 border border-white/30 rounded-lg" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImageDisplay;