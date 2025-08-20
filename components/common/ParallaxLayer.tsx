'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

type ParallaxLayerProps = {
  children?: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'y' | 'x' | 'both';
  scrollY?: MotionValue<number>;
  inputRange?: number[];
};

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
  direction = 'up',
  scrollY,
  inputRange,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const distance = 200 * speed;
  const progress = scrollY || scrollYProgress;
  const range = inputRange ? [inputRange[0] / 1000, inputRange[1] / 1000] : [0, 1];

  // Call all hooks unconditionally
  const yUp = useTransform(progress, range, [distance, -distance]);
  const yDown = useTransform(progress, range, [-distance, distance]);
  const yDefault = useTransform(progress, range, [0, -distance]);
  const xLeft = useTransform(progress, range, [distance, -distance]);
  const xRight = useTransform(progress, range, [-distance, distance]);
  const xDefault = useTransform(progress, range, [0, -distance]);

  // Then choose values conditionally
  let transform: any = {};
  if (direction === 'both') {
    transform = { x: xDefault, y: yDefault };
  } else if (direction === 'up') {
    transform = { y: yUp };
  } else if (direction === 'down') {
    transform = { y: yDown };
  } else if (direction === 'left') {
    transform = { x: xLeft };
  } else if (direction === 'right') {
    transform = { x: xRight };
  } else if (direction === 'y') {
    transform = { y: yDefault };
  } else if (direction === 'x') {
    transform = { x: xDefault };
  } else {
    transform = { y: yDefault };
  }

  return (
    <motion.div ref={ref} className={className} style={transform}>
      {children}
    </motion.div>
  );
}
