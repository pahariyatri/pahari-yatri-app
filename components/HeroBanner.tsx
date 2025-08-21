"use client";

import Link from "./common/Link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    media: string; // MP4 video file path
}

const HeroBanner = ({ title, description, buttonText, buttonLink, media }: HeroBannerProps) => {
    return (
        <section id="hero-banner" className="w-full">
            {/* Cinematic Background Video */}
            <div className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[65vh] overflow-hidden">
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
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent dark:from-background/95 dark:via-background/60 dark:to-transparent" />
                {/* Decorative silhouette */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('/static/images/himalaya-silhouette.svg')] bg-repeat-x bg-bottom opacity-10 dark:opacity-15" /> */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-in-up [animation-delay:1000ms]">
                <span className="text-xs uppercase tracking-widest text-white/70 mb-2 font-light">
                    Walk with us
                </span>
                <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-scroll-indicator"></div>
                </div>
            </div>
            </div>
            {/* Text & CTA overlay - CENTERED */}
            {/* <div className="text-center mt-12 mb-12 px-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-brandSerif drop-shadow-lg">
                    {title}
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-brandSerif drop-shadow-lg">
                    {description}
                </h2>
            </div> */}
        </section>
    );
};

export default HeroBanner;
