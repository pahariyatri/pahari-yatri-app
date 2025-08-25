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
            <div className="relative w-full h-[50vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
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

            
        </section>
    );
};

export default HeroBanner;
