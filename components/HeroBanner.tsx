"use client";

import Link from "./common/Link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroBannerProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  media: string; // MP4 video path
}

const HeroBanner = ({
  title,
  description,
  buttonText,
  buttonLink,
  secondaryText,
  secondaryLink,
  media,
}: HeroBannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    if (mobile) return;

    // Defer video src assignment until after first paint to unblock LCP
    const raf = requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;
      video.src = media;
      video.load();
      video.play().catch(() => {});
    });
    return () => cancelAnimationFrame(raf);
  }, [media]);

  return (
    <section
      id="hero-banner"
      className="relative w-full h-[90vh] sm:h-screen overflow-hidden bg-background"
    >
      {/* Background media */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-background z-10" />

        {/* Poster image — always visible, fades out once video is playing */}
        <Image
          src="/static/images/mountains-bg.jpg"
          alt="Himalayan peaks"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />

        {/* Video — hidden on mobile to save bandwidth */}
        {!isMobile && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onCanPlay={() => setVideoReady(true)}
          />
        )}
      </div>

      {/* ✨ Content Overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-white/70 mb-6"
        >
          Pahari Yatri
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium font-brandSerif text-white mb-6 tracking-tight leading-[1.08] max-w-4xl mx-auto drop-shadow-lg">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-base sm:text-xl text-white/85 font-light max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            {description}
          </p>
        </motion.div>

        {(buttonText || secondaryText) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto"
          >
            {buttonText && (
              <Link href={buttonLink || "/books"} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-[1.03] shadow-xl"
                >
                  {buttonText}
                </Button>
              </Link>
            )}
            {secondaryText && (
              <Link href={secondaryLink || "/apply"} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/15 backdrop-blur-md text-white border border-white/40 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:border-white/70"
                >
                  {secondaryText}
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </div>

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
