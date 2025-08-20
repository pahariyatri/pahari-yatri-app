'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

type TransformConfig = {
  inputRange: number[];
  outputRange: string[]; // Can be numbers as well
};

type UseScrollAnimationProps = {
  transformConfigs: Record<string, TransformConfig>;
};

type UseScrollAnimationReturn = {
  ref: React.RefObject<HTMLElement>;
  scrollY: MotionValue<number>;
  [key: string]: MotionValue<number> | MotionValue<string> | React.RefObject<HTMLElement>;
};

export function useScrollAnimation({
  transformConfigs,
}: UseScrollAnimationProps): UseScrollAnimationReturn {
  const ref = useRef<HTMLElement>(null);

  const { scrollY } = useScroll({ target: ref });

  const output: any = { ref, scrollY };

  Object.keys(transformConfigs).forEach((key) => {
    const { inputRange, outputRange } = transformConfigs[key];
    output[key] = useTransform(scrollY, inputRange, outputRange);
  });

  return output;
}
