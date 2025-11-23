"use client";

import Link from "./common/Link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroBannerProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  media: string; // MP4 video path
}

const HeroBanner = ({
  title,
  description,
  buttonText,
  buttonLink,
  media,
}: HeroBannerProps) => {
  return (
    <section
      id="hero-banner"
      className="relative w-full h-[90vh] sm:h-screen overflow-hidden bg-background"
    >
      {/* 🎥 Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background z-10" /> {/* Gradient */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/static/images/hero-poster.jpg" // Fallback image
        >
          <source src={media} type="video/mp4" />
        </video>
      </div>

      {/* ✨ Content Overlay */}
      {/* <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold font-brandSerif text-white mb-6 tracking-tight drop-shadow-lg">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-lg sm:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            {description}
          </p>
        </motion.div>

        {buttonText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <Link href={buttonLink || "/yatri-pass"}>
              <Button
                size="lg"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:border-white/60"
              >
                {buttonText}
              </Button>
            </Link>
          </motion.div>
        )}
      </div> */}

      {/* 👇 Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-xs uppercase tracking-widest font-medium">Explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
