'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { FormData } from '../conversation';

type Props = {
  formData: FormData;
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
  
  // Hide confetti after 5 seconds on desktop, 3 seconds on mobile for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, isMobile ? 3000 : 5000);
    
    return () => clearTimeout(timer);
  }, [isMobile]);
  
  // Animation variants - Enhanced for better mobile experience
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0.2 : 0.3
      }
    }
  };
  
  // Mobile-optimized tap animation
  const tapAnimation = {
    scale: 0.95,
    transition: { duration: 0.1 }
  };

  const isTravel = formData.joinType === 'travel';
  
  // WhatsApp and Discord URLs
  const prefilledText = encodeURIComponent(
    `Hello! I just completed my Pahari Yatri application for a curated journey. My name is ${formData.fullName || 'there'}.`
  );
  const whatsappGuideUrl = `https://wa.me/916280888188?text=${prefilledText}`;
  const whatsappGroupUrl = "https://chat.whatsapp.com/L12wU6JmfevEL1r8nZ9LhP";
  const discordUrl = "https://discord.gg/pahariyatri";
  
  return (
    <motion.div 
      className="space-y-8 text-center relative overflow-hidden px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Confetti Animation - Enhanced for premium feel */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: isMobile ? 0.5 : 0.8 } }}
          >
            {/* Confetti Pieces */}
            {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => {
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div className="mb-6 relative z-10">
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
          className="text-2xl sm:text-3xl font-brandSerif font-semibold mb-2 text-primary tracking-wide"
        >
          Application Received
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto"
        >
          Thank you, <span className="text-primary font-medium">{formData.fullName}</span>! Your Himalayan path is being plotted.
        </motion.p>
      </motion.div>

      {/* Dynamic Instruction & Next Steps */}
      <motion.div 
        className={cn(
          "p-6 sm:p-8 max-w-lg mx-auto relative z-10 space-y-6",
          "bg-gradient-to-br from-background/90 to-muted/40 border border-primary/20",
          "rounded-2xl shadow-brand-md backdrop-blur-sm"
        )}
      >
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-foreground">
            {isTravel ? "🔗 Connect with a Trail Guide" : "🏮 Join the Yatri Sanctuary"}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isTravel 
              ? "We've received your journey details. To bypass queue delays and coordinates immediately, talk directly to a guide or join our WhatsApp community updates group."
              : "Welcome to the movement. Join our Discord Sanctuary to introduce yourself, participate in folklore discussions, or share your own travel diaries."
            }
          </p>
        </div>

        {/* High-Conversion CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {isTravel ? (
            <>
              <Button 
                asChild
                variant="premium"
                size="lg"
                className="w-full h-12 rounded-xl text-sm font-medium gap-2 justify-center"
              >
                <a href={whatsappGuideUrl} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Connect on WhatsApp
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-xl text-sm font-medium gap-2 border-primary/20 hover:bg-primary/5 justify-center"
              >
                <a href={whatsappGroupUrl} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Join WhatsApp Hub
                </a>
              </Button>
            </>
          ) : (
            <>
              <Button 
                asChild
                variant="premium"
                size="lg"
                className="w-full h-12 rounded-xl text-sm font-medium gap-2 justify-center"
              >
                <a href={discordUrl} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  Enter Discord Sanctuary
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-xl text-sm font-medium gap-2 border-primary/20 hover:bg-primary/5 justify-center"
              >
                <a href={whatsappGroupUrl} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Join WhatsApp Hub
                </a>
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {/* Return options */}
      <motion.div className="pt-4 relative z-10">
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Button 
            asChild 
            variant="ghost" 
            className="w-full text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <Link href="/stories">Read Travel Stories</Link>
          </Button>
          <Button 
            asChild 
            variant="ghost" 
            className="w-full text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}