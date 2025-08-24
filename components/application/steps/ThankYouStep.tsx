'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  formData: {
    firstName: string;
  };
};

export default function ThankYouStep({ formData }: Props) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device on client side
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Confetti animation elements with premium colors - Reduced for mobile
  const confettiElements = [
    { id: 1, color: 'bg-primary', size: 'w-3 h-3', delay: 0 },
    { id: 2, color: 'bg-secondary', size: 'w-2 h-2', delay: 0.1 },
    { id: 3, color: 'bg-accent', size: 'w-4 h-4', delay: 0.2 },
    { id: 4, color: 'bg-primary/80', size: 'w-3 h-3', delay: 0.3 },
    { id: 5, color: 'bg-secondary/80', size: 'w-2 h-2', delay: 0.4 },
    { id: 6, color: 'bg-accent/80', size: 'w-3 h-3', delay: 0.5 },
    { id: 7, color: 'bg-primary/60', size: 'w-2 h-2', delay: 0.6 },
    { id: 8, color: 'bg-secondary/60', size: 'w-4 h-4', delay: 0.7 },
    { id: 9, color: 'bg-accent/60', size: 'w-3 h-3', delay: 0.8 },
    { id: 10, color: 'bg-primary/40', size: 'w-2 h-2', delay: 0.9 },
    { id: 11, color: 'bg-secondary/40', size: 'w-3 h-3', delay: 1.0 },
    { id: 12, color: 'bg-accent/40', size: 'w-2 h-2', delay: 1.1 },
  ];
  
  // Hide confetti after 5 seconds on desktop, 3 seconds on mobile for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, isMobile ? 3000 : 5000);
    
    return () => clearTimeout(timer);
  }, [isMobile]);
  
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
  
  // Animation variants - Enhanced for better mobile experience
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1, // Faster on mobile
        delayChildren: isMobile ? 0.2 : 0.3 // Faster on mobile
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.3 : 0.5, ease: "easeOut" } }
  };
  
  // Mobile-optimized tap animation
  const tapAnimation = {
    scale: 0.95,
    transition: { duration: 0.1 }
  };
  
  return (
    <motion.div 
      className="space-y-6 text-center relative overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Confetti Animation - Enhanced for premium feel */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            className="absolute inset-0 z-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: isMobile ? 0.5 : 0.8 } }}
          >
            {/* Confetti Pieces - Enhanced with premium colors */}
            {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => {
              // Optimized confetti for mobile - smaller pieces, faster animation
              const size = isMobile ? (Math.random() * 5 + 2) : (Math.random() * 10 + 5);
              const xPos = Math.random() * 100;
              const fallDelay = Math.random() * (isMobile ? 1 : 2);
              const fallDuration = isMobile ? (Math.random() * 3 + 3) : (Math.random() * 8 + 8);
              const rotation = Math.random() * 360;
              const color = [
                'bg-primary', 'bg-secondary', 'bg-accent', 'bg-primary/80', 'bg-secondary/80', 'bg-accent/80'
              ][Math.floor(Math.random() * 6)];
              
              return (
                <motion.div
                  key={i}
                  className={cn(
                    `absolute ${color}`,
                    Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
                    'shadow-sm'
                  )}
                  style={{
                    width: size,
                    height: size,
                    left: `${xPos}%`,
                    top: '-20px',
                  }}
                  initial={{ y: -20, rotate: 0, scale: 0 }}
                  animate={{
                    y: '120vh',
                    rotate: rotation,
                    scale: [0, 1, 1, 0.5],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: fallDuration,
                    delay: fallDelay,
                    ease: 'easeIn'
                  }}
                />
              );
            })}
            
            {/* Himalayan Mountain Range Silhouette */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary/10 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
                <path 
                  fill="currentColor" 
                  fillOpacity="0.2"
                  className="text-primary"
                  d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
              
              {/* Snow-capped peaks */}
              <div className="absolute top-1/3 left-0 w-full h-2 bg-white/20 blur-sm"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        
        className="mb-6 relative z-10"
      >
        <motion.div 
          className={cn(
            "mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4",
            "bg-gradient-to-br from-primary/20 to-secondary/30 shadow-brand-md"
          )}
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.8, times: [0, 0.7, 1] }}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </motion.svg>
        </motion.div>
        
        <motion.h2 
          className="text-2xl sm:text-h3 md:text-h2 font-brandSerif font-semibold mb-2 text-primary tracking-wide"
          
        >
          Application Received
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground text-sm sm:text-base md:text-lg px-2"
          
        >
          Thank you, <span className="text-primary font-medium">{formData.firstName}</span>! Your Himalayan journey begins now.
        </motion.p>
      </motion.div>

      <motion.div 
        
        className={cn(
          "p-5 sm:p-8 max-w-md mx-auto relative z-10",
          "bg-gradient-to-br from-background to-muted/30 border-2 border-primary/20",
          "rounded-xl shadow-brand-md backdrop-blur-sm",
          "touch-manipulation"
        )}
      >
        <motion.div
          
        >
          <p className="mb-4 text-base leading-relaxed">
            We&apos;ve received your application and will be in touch within 48 hours to discuss the next steps of your Himalayan journey.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            In the meantime, explore our blog for stories from fellow travelers and preparation tips.
          </p>
        </motion.div>
        
        {/* Himalayan Mountain icon with snow cap */}
        <motion.div 
          className={cn(
            "absolute -top-5 -right-5 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden",
            "bg-gradient-to-br from-primary to-secondary text-white shadow-brand-sm"
          )}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          {/* Snow cap */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-white/30"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        
        className="pt-6 sm:pt-8 relative z-10"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto px-4 sm:px-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={tapAnimation} className="w-full sm:w-auto">
            <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="relative overflow-hidden group shadow-brand-sm border-2 border-primary/20 h-14 w-full touch-manipulation"
              >
              <Link href="/blog" className="flex items-center justify-center gap-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span className="font-medium">Read Travel Stories</span>
                <motion.span 
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={tapAnimation} className="w-full sm:w-auto">
            <Button 
                asChild 
                variant="premium" 
                size="lg"
                className="relative overflow-hidden group h-14 w-full touch-manipulation"
              >
              <Link href="/" className="flex items-center justify-center gap-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="font-medium">Return to Homepage</span>
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
    </motion.div>
  );
}