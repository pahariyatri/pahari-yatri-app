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
      className="relative w-full bg-background"
    >
      {/* ✅ Background Poster for LCP */}
      <div className="relative w-full h-[55vh] sm:h-[55vh] md:h-[60vh] overflow-hidden">
        {/* <Image
          src="/static/image.jpg"
          alt="Pahari Yatri Himalayas"
          fill
          priority
          className="object-cover"
        /> */}

        {/* 🎥 Load video after paint */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none" // 🚀 don’t block LCP
        >
          <source src={media} type="video/mp4" />
        </video>
      </div>
      
    </section>
  );
};

export default HeroBanner;
