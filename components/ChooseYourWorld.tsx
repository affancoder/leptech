"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ChooseYourWorld = () => {
  const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const panels = [
    {
      title: "WEDDINGS",
      desc: "Craft an olfactory memory for your most special day with bespoke fragrances tailored to your love story.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
      featured: true,
    },
    {
      title: "CORPORATE & GIFTING",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "HOSPITALITY",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-[#f1efe9] pt-16 md:pt-24 pb-20 md:pb-32">
      
      {/* Header */}
      <div className="px-6 sm:px-10 md:px-20 mb-10 md:mb-14 text-left">
        <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-medium tracking-[0.18em] text-[#111] uppercase">
          CHOOSE YOUR WORLD
        </h2>
        <p className="mt-2 text-[10px] sm:text-[11px] text-[#666] tracking-wider max-w-md">
          Which story will you write in scent?
        </p>
      </div>

      {/* Panels */}
      <div
        className="flex flex-col md:flex-row w-full md:h-[500px]"
        onMouseLeave={() => setActive(null)}
      >
        {panels.map((panel, index) => {
          const isActive = active === index;
          const isOtherActive = active !== null && !isActive;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => !isMobile && setActive(index)}
              className="relative w-full h-[280px] sm:h-[320px] md:h-full overflow-hidden group cursor-pointer"
              
              animate={
                isMobile
                  ? { flex: 1 }
                  : {
                      flex:
                        active === null
                          ? panel.featured
                            ? 2.1
                            : 1
                          : isActive
                          ? 2.4
                          : 0.8,
                    }
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* ✅ FIX: make image container relative */}
              <div className="absolute inset-0">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${panel.img})` }}
                  animate={
                    isMobile
                      ? { scale: 1 }
                      : {
                          scale: isActive ? 1.05 : 1,
                          filter: isOtherActive ? "brightness(0.7)" : "brightness(1)",
                        }
                  }
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-30 md:opacity-0 md:group-hover:opacity-100 transition duration-500" />

              {/* Content */}
              {panel.featured ? (
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-0 md:left-0 w-[90%] sm:w-[70%] md:w-[60%] bg-[#f1efe9] p-4 sm:p-6 md:p-7 md:translate-y-[25%] z-10">
                  <div className="relative">
                    <h3 className="text-[11px] sm:text-[12px] tracking-[0.15em] uppercase">
                      {panel.title}
                    </h3>
                    <p className="mt-2 text-[10px] sm:text-[11px] text-[#555] leading-relaxed max-w-[240px]">
                      {panel.desc}
                    </p>

                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full border border-[#aaa] flex items-center justify-center hover:bg-black hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10">
                  <h3 className="text-[11px] tracking-[0.14em] text-white uppercase">
                    {panel.title}
                  </h3>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ChooseYourWorld;