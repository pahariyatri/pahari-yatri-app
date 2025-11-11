'use client';

import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "@/components/common/Image";
import Link from "@/components/common/Link";
import { Button } from "@/components/ui/button";
import BrandStory from "@/components/BookCardLayout";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Loading from "../looding";

export default function WhyPahariYatri() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate content loading for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);
  // Loading state with mountain-themed loader
  if (isLoading) {
    return (
      <Loading message='Discovering the Pahari way...'></Loading>
    );
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key="why-pahari-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <SectionContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BrandStory />
        </motion.div>
        
        <motion.div 
          className="text-center mb-10 md:mb-14 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.2 }}
        >
          <motion.p 
            className="text-xs md:text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3 md:mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            The Yatri Way
          </motion.p>
          
          {/* Mountain icon background with parallax effect */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, opacity: 0.08 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "120" : "180"} height={isMobile ? "120" : "180"} viewBox="0 0 24 24" fill="currentColor" className="text-himalayan-green">
              <path d="M22.5 21h-21l9-18 12 18z"/>
            </svg>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PageTitle>
              Our Approach
            </PageTitle>
          </motion.div>
          
          <motion.p 
            className="text-sm md:text-base lg:text-lg mx-auto max-w-2xl text-muted-foreground leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Not tourism. Not crowds.
            Just sacred Himalayan journeys—raw, personal, and unforgettable.
          </motion.p>
        </motion.div>

      <motion.div 
        className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12 px-4 sm:px-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        {/* Card 1 - Apple-style minimal design with hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="group bg-card/50 backdrop-blur-xl border border-border/40 shadow-md rounded-2xl overflow-hidden transition-all duration-300 md:duration-500 hover:shadow-xl hover:border-primary/40 hover:transform hover:scale-102 md:hover:scale-105">
            <CardHeader className="flex flex-col items-center p-4 md:p-6">
              <motion.div 
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 md:duration-500 group-hover:bg-primary/20"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                </svg>
              </motion.div>
              <CardTitle className="text-lg md:text-xl lg:text-2xl font-semibold text-center transition-all duration-300 group-hover:text-primary">
                Hidden Trails
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
              <CardDescription className="text-center text-base text-muted-foreground">
                Beyond maps, into the unseen.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="group bg-card/50 backdrop-blur-xl border border-border/40 shadow-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/40 hover:transform hover:scale-105">
            <CardHeader className="flex flex-col items-center p-6">
              <motion.div 
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-primary/20"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </motion.div>
              <CardTitle className="text-xl md:text-2xl font-semibold text-center transition-all duration-300 group-hover:text-primary">
                Intimate Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <CardDescription className="text-center text-base text-muted-foreground">
                We keep it small, to keep it real
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="group bg-card/50 backdrop-blur-xl border border-border/40 shadow-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/40 hover:transform hover:scale-105">
            <CardHeader className="flex flex-col items-center p-6">
              <motion.div 
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-primary/20"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </motion.div>
              <CardTitle className="text-xl md:text-2xl font-semibold text-center transition-all duration-300 group-hover:text-primary">
                Rooted in Culture
              </CardTitle>
            </CardHeader>
          <CardContent className="px-6 pb-6">
            <CardDescription className="text-center text-base text-muted-foreground">
              Travel with respect, live the stories.
            </CardDescription>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>

      {/* Brand Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20 mt-16 md:mt-20 px-4 sm:px-0">

        <div className="relative">
          <Image
            src="/static/logo.jpg"
            alt="Pahari Yatri Story"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-96"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-brandSerif text-himalayan-green relative inline-flex items-center">
            Not Just Treks. Transformations.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every journey with Pahari Yatri is designed to be more than a physical challenge—it&apos;s a spiritual awakening, a cultural immersion, and a personal transformation.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Certified mountain guides with deep spiritual and cultural knowledge</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Exclusive access to sacred sites and hidden trails</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Sustainable practices that preserve Himalayan culture and environment</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Personalized experiences tailored to your spiritual and physical goals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selective Guest Policy */}
      <div className="bg-himalayan-mist rounded-2xl p-6 md:p-8 mb-16 md:mb-20 mx-4 sm:mx-0">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold font-brandSerif text-himalayan-green mb-3 md:mb-4">
            Selective Guest Policy
          </h3>
          <p className="text-base md:text-lg text-muted-foreground mb-5 md:mb-6 leading-relaxed">
            We carefully select our guests to ensure meaningful connections and shared values. Our journeys are not mass tourism—they are intimate gatherings of like-minded souls seeking transformation.
          </p>
          <Link href="/contact">
            <Button className="bg-himalayan-green hover:bg-himalayan-green-600 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base flex items-center gap-2 group">
              Apply to Join
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Button>
          </Link>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 px-4 sm:px-0">
        <Card className="text-center border-himalayan-mist hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-himalayan-green font-brandSerif text-lg md:text-xl flex items-center justify-center gap-2">
              <span className="text-xl md:text-2xl">🏔️</span>
              Authenticity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Genuine experiences that honor local traditions and preserve the sacred nature of Himalayan sites.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center border-himalayan-mist hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-himalayan-green font-brandSerif text-lg md:text-xl flex items-center justify-center gap-2">
              <span className="text-xl md:text-2xl">🌱</span>
              Sustainability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Eco-conscious practices that minimize our footprint and support local communities.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center border-himalayan-mist hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-himalayan-green font-brandSerif text-lg md:text-xl flex items-center justify-center gap-2">
              <span className="text-xl md:text-2xl">✨</span>
              Transformation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Journeys that challenge, inspire, and transform—both physically and spiritually.
            </p>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
      </motion.div>
    </AnimatePresence>
  );
}
