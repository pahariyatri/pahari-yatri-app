"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTextAnimation } from "@/hooks/useTextAnimation";
import ParallaxLayer from "@/components/common/ParallaxLayer";
import TextReveal from "@/components/common/TextReveal";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

const MANIFESTO_LINES = [
  "Not tourism. A movement of Yatri.",
  "Hear the mountains. Feel the silence.",
  "We don't just see the mountains. We surrender to them.",
  "We travel lightly. We listen deeply. We return transformed.",
];

export default function ManifestoSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll animations
  const { scrollY, bgColor } = useScrollAnimation({
    transformConfigs: {
      bgColor: {
        inputRange: [0, 1000, 2000, 3000],
        outputRange: ["#0F1A14", "#1A2B20", "#22332D", "#1E2A24"],
      },
    },
  });

  // Track active line index
  const [activeLine, setActiveLine] = useState<number | null>(null);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-0"
      style={{ backgroundColor: bgColor }}
      aria-label="Pahari Yatri Manifesto"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <ParallaxLayer
          scrollY={scrollY}
          className="absolute inset-0 bg-[url('/static/images/mountain-layer1.jpg')] bg-cover bg-center scale-105"
          speed={4}
          direction="y"
          inputRange={[0, 2000]}
        />
        <ParallaxLayer
          scrollY={scrollY}
          className="absolute inset-0 bg-[url('/static/images/mountain-layer2.png')] bg-cover bg-center opacity-30 scale-110"
          speed={8}
          direction="y"
          inputRange={[0, 2000]}
        />
        <ParallaxLayer
          scrollY={scrollY}
          className="absolute inset-0 bg-[url('/static/images/particles.svg')] opacity-10 mix-blend-overlay"
          speed={2}
          direction="both"
          inputRange={[0, 2000]}
        />

        {/* Decorative vertical progress rail (only desktop) */}
        {activeLine !== null && activeLine > 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: activeLine !== null ? 0.15 : 1 }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex absolute inset-y-0 left-1/2 transform -translate-x-1/2 items-center justify-center"
          >
            <div className="relative h-full flex items-center">
              <div className="relative w-[2px] h-[80%] overflow-hidden">
                <div className="absolute inset-0 bg-gray-500/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-300 via-sky-200 to-indigo-300 mask-fade" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Manifesto lines */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {MANIFESTO_LINES.map((line, i) => {
          const { ref, isInView } = useTextAnimation({
            threshold: 0.6,
            once: false,
            margin: "-100px 0px",
          });

          useEffect(() => {
            if (isInView) setActiveLine(i);
          }, [isInView, i]);

          return (
            <div
              key={i}
              ref={ref}
              className={cn(
                "flex items-center justify-center px-6 sm:px-12",
                "min-h-[100vh]",
                "md:sticky md:top-0 will-change-transform"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }
                }
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full relative flex justify-center"
              >
                <motion.div
                  className="relative px-4 py-4 md:px-8 md:py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Rectangle border (desktop only) */}
                  <div className="hidden md:block">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      {/* Rectangle border */}
                      <motion.rect
                        x="2"
                        y="2"
                        width="96"
                        height="96"
                        rx="8"
                        ry="8"
                        stroke="url(#grad)"
                        strokeWidth="1" // same bold weight for all
                        fill="transparent"
                        strokeDasharray="400"
                        strokeDashoffset={isInView ? 0 : 400}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />

                      {/* Vertical connector line */}
                      {i < MANIFESTO_LINES.length - 1 && (
                        <motion.line
                          x1="50"
                          y1="98" // bottom center of rectangle
                          x2="50"
                          y2="140" // reaches top center of next rectangle
                          stroke="url(#grad)"
                          strokeWidth="3" // match rectangle weight
                          strokeDasharray="42"
                          strokeDashoffset={isInView ? 0 : 42}
                          transition={{
                            duration: 1,
                            ease: "easeInOut",
                            delay: 0.6, // draws after rectangle finishes
                          }}
                        />
                      )}

                      {/* Gradient */}
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#34d399" />
                          <stop offset="50%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>

                  {/* Text */}
                  <TextReveal
                    text={line}
                    element="h2"
                    delay={0.2}
                    duration={0.8}
                    staggerChildren={0.08}
                    once={false}
                    threshold={0.5}
                    className={cn(
                      "text-center font-brandSerif font-extrabold relative z-10",
                      "text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl",
                      "leading-snug drop-shadow-lg bg-clip-text text-transparent",
                      "bg-gradient-to-r from-emerald-300 via-sky-200 to-indigo-300"
                    )}
                  />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
