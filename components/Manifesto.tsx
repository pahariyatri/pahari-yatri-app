'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useInView, MotionValue } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TextReveal from '@/components/common/TextReveal';
import { cn } from '@/lib/utils';
import { ParallaxLayer } from './common/ParallaxLayer';

const MANIFESTO_LINES = [
  'Not tourism. A movement of Yatri.',
  "We don't just see the mountains. We surrender to them.",
];

function ManifestoLine({
  line,
  index,
  setActiveLine,
}: {
  line: string;
  index: number;
  setActiveLine: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: index === 0 ? 0.1 : 0.6,
    once: false,
    margin: index === 0 ? '0px' : '-100px 0px',
  });

  useEffect(() => {
    if (isInView) setActiveLine(index);
  }, [isInView, index, setActiveLine]);

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center px-6 sm:px-12',
        'min-h-[100vh]',
        index === 0 ? 'md:sticky md:top-0 will-change-transform' : 'md:relative'
      )}
    >
      <motion.div
        initial={{ opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 60 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : -60 }
        }
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
            >
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="28"
                ry="28"
                stroke="url(#grad)"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="1200"
                strokeDashoffset={isInView || index === 0 ? 0 : 1200}
                transition={{
                  duration: index === 0 ? 0.5 : 1.5,
                  ease: 'easeInOut',
                }}
              />
              {index < MANIFESTO_LINES.length - 1 && (
                <motion.line
                  x1="50%"
                  y1="100%"
                  x2="50%"
                  y2="125%"
                  stroke="url(#grad)"
                  strokeWidth="4"
                  strokeDasharray="200"
                  strokeDashoffset={isInView ? 0 : 200}
                  transition={{
                    duration: 1,
                    ease: 'easeInOut',
                    delay: 0.4,
                  }}
                />
              )}
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
            duration={index === 0 ? 0.2 : 0.4}
            staggerChildren={index === 0 ? 0.02 : 0.04}
            once={index === 0}
            amount={index === 0 ? 0.1 : 0.3}
            className={cn(
              'text-center font-brandSerif font-extrabold relative z-10',
              'text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl',
              'leading-snug drop-shadow-lg bg-clip-text text-transparent',
              'bg-gradient-to-r from-emerald-300 via-sky-200 to-indigo-300'
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ManifestoSection() {
  const prefersReduced = useReducedMotion();

  // scrollY and bgColor are MotionValues
  const { scrollY, bgColor, ref: sectionRef } = useScrollAnimation({
    transformConfigs: {
      bgColor: {
        inputRange: [0, 1000, 2000, 3000],
        outputRange: ['#0F1A14', '#1A2B20', '#22332D', '#1E2A24'],
      },
    },
  });

  const [activeLine, setActiveLine] = useState<number | null>(null);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-0"
      // Use bgColor.get() to extract string from MotionValue
      style={{ backgroundColor: (bgColor as MotionValue<string>).get() }}
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
      </div>

      {/* Lines */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {MANIFESTO_LINES.map((line, i) => (
          <ManifestoLine
            key={i}
            line={line}
            index={i}
            setActiveLine={setActiveLine}
          />
        ))}
      </div>
    </section>
  );
}
