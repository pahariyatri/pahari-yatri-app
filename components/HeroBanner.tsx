"use client";

import Link from "./common/Link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
        <section id="hero-banner" className="relative w-full bg-background">
            {/* 🎥 Background Video Section */}
            <div className="relative w-full h-[70vh] lg:h-[60vh] overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/static/images/hero-poster.jpg"
                >
                    <source src={media} type="video/mp4" />
                </video>


            </div>

            {/* ✨ Content Section BELOW the video */}
            <div className="relative z-10 bg-background -mt-8 sm:-mt-20 lg:-mt-2 rounded-t-3xl shadow-lg">
                <div className="max-w-4xl mx-auto px-6 py-12 text-center">
                    {/* Title */}
                    <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold font-brandSerif mb-8 text-white animate-fade-in-up">
                            {title}
                    </h1>
                    {/* <motion.h1
                        className="text-3xl sm:text-5xl lg:text-6xl font-brandSerif font-bold text-foreground"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}

                    >
                        {title}
                    </motion.h1> */}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
