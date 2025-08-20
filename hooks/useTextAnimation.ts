'use client';

import { useEffect, useState } from 'react';

type TextAnimationOptions = {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
};

export function useTextAnimation({
  text = '',
  speed = 50,
  delay = 0,
  loop = false,
  loopDelay = 2000,
}: TextAnimationOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay
    const startAnimation = () => {
      timeout = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsAnimating(false);
          
          if (loop) {
            timeout = setTimeout(() => {
              setDisplayText('');
              setCurrentIndex(0);
              setIsAnimating(true);
            }, loopDelay);
          }
        }
      }, currentIndex === 0 ? delay : speed);
    };

    if (isAnimating) {
      startAnimation();
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, isAnimating, loop, loopDelay, speed, text]);

  const resetAnimation = () => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsAnimating(true);
  };

  return { displayText, isComplete: !isAnimating, resetAnimation };
}