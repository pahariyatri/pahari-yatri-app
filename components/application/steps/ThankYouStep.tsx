'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { FormData } from '../conversation';
import { MessageSquare, Volume2, BookOpen } from 'lucide-react';
import { track } from '@/lib/analytics';

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
  
  const tapAnimation = {
    scale: 0.98,
    transition: { duration: 0.1 }
  };

  const whatsappChannelUrl = "https://whatsapp.com/channel/0029VbBQ3PLElagxCgWywv1S";
  const discordUrl = "https://discord.gg/uxyqQjjesU";
  
  return (
    <motion.div 
      className="space-y-8 text-center relative overflow-hidden px-4 max-w-xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Confetti Animation - Enhanced for premium feel */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden z-50"
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: isMobile ? 30 : 60 }).map((_, i) => {
              const xPos = Math.random() * 100;
              const fallDelay = Math.random() * 0.8;
              const fallDuration = 2 + Math.random() * 2.5;
              const rotation = Math.random() * 360;
              const size = 6 + Math.random() * 10;
              const colors = ['#2DC653', '#204F23', '#D3EAD4', '#E6C687', '#22C55E', '#3B82F6'];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <motion.div
                  key={i}
                  className={cn(
                    'absolute rounded-sm opacity-90',
                    'shadow-sm'
                  )}
                  style={{
                    width: size,
                    height: size,
                    left: `${xPos}%`,
                    top: '-20px',
                    backgroundColor: randomColor
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
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div className="mb-6 relative z-10">
        <motion.div 
          className={cn(
            "mx-auto w-18 h-18 rounded-full flex items-center justify-center mb-4",
            "bg-gradient-to-br from-primary/20 to-emerald-500/20 shadow-brand-md"
          )}
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.8, times: [0, 0.7, 1] }}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
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
          className="text-2xl sm:text-3xl font-brandSerif font-semibold mb-3 text-primary tracking-wide"
        >
          Your Yatri profile has been created.
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto"
        >
          Welcome to the circle. We’ll send you stories, local notes, and future journey updates based on what you selected.
        </motion.p>
      </motion.div>

      {/* Connection Sanctuary Actions */}
      <motion.div 
        className={cn(
          "p-6 sm:p-8 relative z-10 space-y-6",
          "bg-gradient-to-br from-background/90 to-muted/40 border border-primary/20",
          "rounded-2xl shadow-brand-md backdrop-blur-sm"
        )}
      >
        <div className="space-y-4">
          
          {/* Action 1: WhatsApp Channel */}
          <Button 
            asChild
            variant="premium"
            size="lg"
            className="w-full h-13 rounded-xl text-sm font-semibold gap-3 justify-center shadow-lg"
          >
            <a
              href={whatsappChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track('whatsapp_join_click', {
                  location: 'thank_you',
                  url: whatsappChannelUrl,
                })
              }
            >
              <Volume2 className="h-4.5 w-4.5 shrink-0" />
              Join WhatsApp Channel
            </a>
          </Button>

          {/* Action 2: Discord Server */}
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="w-full h-13 rounded-xl text-sm font-semibold gap-3 border-primary/20 hover:bg-primary/5 hover:border-primary/40 justify-center"
          >
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track('discord_join_click', {
                  location: 'thank_you',
                  url: discordUrl,
                })
              }
            >
              <MessageSquare className="h-4.5 w-4.5 shrink-0 text-primary" />
              Enter Discord Circle
            </a>
          </Button>

          {/* Action 3: Book of Journeys */}
          <Button 
            asChild
            variant="ghost"
            size="lg"
            className="w-full h-13 rounded-xl text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground justify-center"
          >
            <Link href="/books">
              <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground mr-1" />
              Read the Book of Journeys
            </Link>
          </Button>

        </div>
      </motion.div>

      {/* Return options */}
      <motion.div className="pt-2 relative z-10">
        <div className="flex justify-center max-w-xs mx-auto">
          <Button 
            asChild 
            variant="ghost" 
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 hover:text-foreground"
          >
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}