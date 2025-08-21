'use client';

import { motion, useInView, Variants, easeOut } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  duration?: number;
  once?: boolean;
  staggerChildren?: number;
  amount?: number;
  children?: React.ReactNode;
}

const TextReveal = ({
  text,
  className = '',
  element = 'p',
  duration = 0.4,
  once = false,             // ✅ not limited to one time
  staggerChildren = 0.03,   // ✅ quick stagger
  amount = 0.05,            // ✅ small threshold, triggers even on fast scroll
  children,
}: TextRevealProps) => {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { once, amount });

  const words = text ? text.split(' ') : [];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren }, // ✅ no delayChildren
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: easeOut,
      },
    },
  };

  const renderWords = () =>
    words.map((word, index) => (
      <motion.span
        key={index}
        variants={child}
        className="inline-block mr-[0.25em] last:mr-0"
      >
        {word}
      </motion.span>
    ));

  const props = {
    ref: containerRef,
    className,
    variants: container,
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  };

  switch (element) {
    case 'h1':
      return <motion.h1 {...props}>{children || renderWords()}</motion.h1>;
    case 'h2':
      return <motion.h2 {...props}>{children || renderWords()}</motion.h2>;
    case 'h3':
      return <motion.h3 {...props}>{children || renderWords()}</motion.h3>;
    case 'h4':
      return <motion.h4 {...props}>{children || renderWords()}</motion.h4>;
    case 'h5':
      return <motion.h5 {...props}>{children || renderWords()}</motion.h5>;
    case 'h6':
      return <motion.h6 {...props}>{children || renderWords()}</motion.h6>;
    case 'span':
      return <motion.span {...props}>{children || renderWords()}</motion.span>;
    default:
      return <motion.p {...props}>{children || renderWords()}</motion.p>;
  }
};

export default TextReveal;
