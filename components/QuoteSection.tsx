"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Quote {
  text: string;
  author: string;
  role: string;
}

const quotes: Quote[] = [
  {
    text: "THE ESSENCE OF LUXURY IS NOT IN THE POSSESSION, BUT IN THE EXPERIENCE OF SOMETHING TRULY UNIQUE.",
    author: "ALEXANDER VOGUE",
    role: "CREATIVE DIRECTOR",
  },
  {
    text: "TRUE ELEGANCE IS THE ONLY BEAUTY THAT NEVER FADES, ETCHED INTO THE MEMORY OF THOSE WHO WITNESS IT.",
    author: "SOPHIA LOREN",
    role: "BRAND AMBASSADOR",
  },
  {
    text: "WE DON'T JUST CREATE FRAGRANCES; WE BOTTLE THE MOMENTS THAT DEFINE A LIFETIME OF SOPHISTICATION.",
    author: "JULIAN MARC",
    role: "MASTER PERFUMER",
  },
  {
    text: "CRAFTING MEMORIES THROUGH SCENT, WHERE EVERY DROP TELLS A STORY OF UNPARALLELED ARTISTRY.",
    author: "MARCUS CHEN",
    role: "ARTISTIC DIRECTOR",
  },
];

const WIDTH = 45;

const QuoteSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const dotMap = [0, Math.floor(quotes.length / 2)];

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden md:block w-full h-full">

        {/* Divider Lines */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[45%] w-px bg-white/40 z-20"
          style={{ left: `calc(50% - ${WIDTH / 2}vw)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[45%] w-px bg-white/40 z-20"
          style={{ left: `calc(50% + ${WIDTH / 2}vw)` }}
        />

        {/* Slider */}
        <motion.div
          animate={{
            x: `calc(50vw - ${(activeIndex + 0.5) * WIDTH}vw)`,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex absolute left-0 z-10"
          style={{ width: `${quotes.length * WIDTH}vw` }}
        >
          {quotes.map((quote, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="h-screen flex items-center px-20 text-left bg-transparent border-none"
                style={{
                  width: `${WIDTH}vw`,
                  opacity: isActive ? 1 : 0.2,
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                }}
              >
                <QuoteContent quote={quote} />
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ================= MOBILE (SWIPE) ================= */}
      <div className="md:hidden w-full px-6">
        <motion.div
          key={activeIndex}
          drag="x"
          dragElastic={0.2}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -60 && activeIndex < quotes.length - 1) {
              setActiveIndex((prev) => prev + 1);
            } else if (info.offset.x > 60 && activeIndex > 0) {
              setActiveIndex((prev) => prev - 1);
            }
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing"
        >
          <QuoteContent quote={quotes[activeIndex]} center />
        </motion.div>
      </div>

      {/* ================= DOTS ================= */}
      <div className="absolute bottom-10 right-6 md:right-12 flex gap-5 z-30">
        {dotMap.map((targetIndex, i) => {
          const isActive =
            activeIndex >= dotMap[i] &&
            activeIndex < (dotMap[i + 1] ?? quotes.length);

          return (
            <button
              key={i}
              onClick={() => setActiveIndex(targetIndex)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                isActive
                  ? "bg-white"
                  : "bg-transparent border border-white/50"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

const QuoteContent = ({
  quote,
  center = false,
}: {
  quote: Quote;
  center?: boolean;
}) => (
  <div className={`w-full max-w-[600px] ${center ? "text-center" : ""}`}>
    <span className="text-white/40 text-6xl md:text-8xl font-serif mb-6 block">
      &ldquo;
    </span>

    <p className="text-[#e5e5e5] text-xs tracking-[0.3em] leading-relaxed uppercase mb-10">
      {quote.text}
    </p>

    <div className="flex flex-col gap-1">
      <span className="text-white text-[11px] tracking-widest uppercase">
        {quote.author}
      </span>
      <span className="text-white/50 text-[9px] tracking-[0.4em] uppercase">
        {quote.role}
      </span>
    </div>
  </div>
);

export default QuoteSection;