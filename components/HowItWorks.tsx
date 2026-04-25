"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    id: "step-1",
    number: "01",
    title: "CONSULTATION & DISCOVERY",
    description:
      "We begin with a deep dive into your vision. Whether it's a wedding, corporate event, or personal brand, we explore the emotions and stories you want to capture in a scent.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "step-2",
    number: "02",
    title: "THE ART OF BLENDING",
    description:
      "Our master perfumers select from the finest global ingredients to create a unique olfactory profile. You'll experience multiple iterations until the fragrance perfectly reflects your story.",
    image: "/img/howitworks2.jpg",
  },
  {
    id: "step-3",
    number: "03",
    title: "BESPOKE PACKAGING",
    description:
      "Design doesn't stop at the scent. We curate premium bottles, labels, and packaging that align with your aesthetic, ensuring every detail feels intentional and luxurious.",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2053&auto=format&fit=crop",
  },
];

const TimelineStep = ({ step, index }: { step: Step; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // ✅ FIX 1: ONLY middle step reversed
  const isMiddle = index === 1;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col md:flex-row items-center justify-between mb-24 md:mb-48 last:mb-0 w-full"
    >
      {/* IMAGE */}
      <div
        className={`w-full md:w-[42%] mb-10 md:mb-0 overflow-hidden ${
          isMiddle ? "md:order-1" : "md:order-2"
        }`}
      >
        <div className="relative aspect-[4/5] w-full">
          <motion.img
            style={{ y: smoothY }}
            src={step.image}
            alt={step.title}
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        </div>
      </div>

      {/* TEXT */}
      <div
        className={`w-full md:w-[42%] ${
          isMiddle ? "md:order-2 md:text-left" : "md:order-1 md:text-right"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#999] font-mono block mb-4">
            STEP {step.number}
          </span>

          <h3 className="text-xl md:text-2xl font-medium tracking-[0.15em] text-[#111] uppercase mb-6 leading-tight">
            {step.title}
          </h3>

          <p className="text-sm md:text-base text-[#555] leading-relaxed max-w-md font-light">
            {step.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // ✅ FIX 2: LINE FILLS FULL HEIGHT PROPERLY
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fafafa] py-24 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 md:mb-40">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[20px] md:text-[24px] font-medium tracking-[0.2em] text-[#111] uppercase"
          >
            HOW IT WORKS
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[1px] bg-[#111] mx-auto mt-6"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-[#eee]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#111] origin-top"
            />
          </div>

          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Dot */}
                <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-3 h-3 rounded-full bg-white border border-[#111]"
                  />
                </div>

                <TimelineStep step={step} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;