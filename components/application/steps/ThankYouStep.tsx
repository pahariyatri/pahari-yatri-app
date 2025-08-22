'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  formData: {
    firstName: string;
  };
};

export default function ThankYouStep({ formData }: Props) {
  const [showConfetti, setShowConfetti] = useState(true);
  
  // Confetti animation elements
  const confettiElements = [
    { id: 1, color: 'bg-primary', size: 'w-3 h-3', delay: 0 },
    { id: 2, color: 'bg-blue-400', size: 'w-2 h-2', delay: 0.1 },
    { id: 3, color: 'bg-green-400', size: 'w-4 h-4', delay: 0.2 },
    { id: 4, color: 'bg-yellow-400', size: 'w-3 h-3', delay: 0.3 },
    { id: 5, color: 'bg-primary', size: 'w-2 h-2', delay: 0.4 },
    { id: 6, color: 'bg-blue-400', size: 'w-3 h-3', delay: 0.5 },
    { id: 7, color: 'bg-green-400', size: 'w-2 h-2', delay: 0.6 },
    { id: 8, color: 'bg-yellow-400', size: 'w-4 h-4', delay: 0.7 },
    { id: 9, color: 'bg-primary', size: 'w-3 h-3', delay: 0.8 },
    { id: 10, color: 'bg-blue-400', size: 'w-2 h-2', delay: 0.9 },
    { id: 11, color: 'bg-green-400', size: 'w-3 h-3', delay: 1.0 },
    { id: 12, color: 'bg-yellow-400', size: 'w-2 h-2', delay: 1.1 },
  ];
  
  // Hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Random position generator for confetti
  const getRandomPosition = (i: number) => {
    const positions = [
      'top-1/4 left-1/4',
      'top-1/3 left-1/2',
      'top-1/4 right-1/4',
      'top-1/2 left-1/3',
      'top-1/2 right-1/3',
      'top-2/3 left-1/4',
      'top-2/3 right-1/4',
      'top-3/4 left-1/2',
      'top-1/3 left-1/4',
      'top-1/3 right-1/4',
      'top-2/3 left-1/2',
      'top-1/2 left-1/4',
    ];
    return positions[i % positions.length];
  };
  
  return (
    <div className="space-y-4 text-center relative overflow-hidden">
      {/* Confetti Animation - Simplified for mobile */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            className="absolute inset-0 z-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Confetti Pieces - Reduced for performance */}
            {Array.from({ length: 30 }).map((_, i) => {
              const size = Math.random() * 8 + 4;
              const xPos = Math.random() * 100;
              const fallDelay = Math.random() * 3;
              const fallDuration = Math.random() * 8 + 8;
              const rotation = Math.random() * 360;
              const color = [
                'bg-primary', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'
              ][Math.floor(Math.random() * 4)];
              
              return (
                <motion.div
                  key={i}
                  className={`absolute rounded-sm ${color}`}
                  style={{
                    width: size,
                    height: size,
                    left: `${xPos}%`,
                    top: '-20px',
                  }}
                  initial={{ y: -20, rotate: 0 }}
                  animate={{
                    y: '120vh',
                    rotate: rotation,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: fallDuration,
                    delay: fallDelay,
                    ease: 'easeIn'
                  }}
                />
              );
            })}
            
            {/* Simple Mountain Silhouette */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-16 bg-muted/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
                <path 
                  fill="currentColor" 
                  fillOpacity="0.2"
                  d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-4 relative z-10"
      >
        <motion.div 
          className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3"
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.6, times: [0, 0.7, 1] }}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </motion.svg>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold tracking-tight mb-1"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Application Received
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground text-base"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Thank you, {formData.firstName}! Your journey with us begins now.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        className="p-6 bg-muted/30 rounded-lg border border-border/50 max-w-md mx-auto relative z-10 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p className="mb-4">
            We&apos;ve received your application and will be in touch within 48 hours to discuss the next steps of your Himalayan journey.
          </p>
          <p className="text-muted-foreground">
            In the meantime, explore our blog for stories from fellow travelers and preparation tips.
          </p>
        </motion.div>
        
        {/* Mountain icon */}
        <motion.div 
          className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: "spring" }}
        className="pt-6 relative z-10"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" className="relative overflow-hidden group">
              <Link href="/blog" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Read Travel Stories
                <motion.span 
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="relative overflow-hidden group">
              <Link href="/" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Return to Homepage
                <motion.span 
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}