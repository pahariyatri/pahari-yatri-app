'use client';

import Link from "./common/Link";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface HeroBannersProps {
    heroBanners: Array<{
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        image: string;
    }>;
}

const HeroBanner = ({ heroBanners }: HeroBannersProps) => {
    const plugin = React.useRef<any>(null);

    React.useEffect(() => {
        const autoplay = Autoplay({ delay: 2000, stopOnInteraction: false });
        plugin.current = autoplay;
    }, []);

    return (
        <section className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
            {/* Carousel Layer */}
            <div className="absolute inset-0">
                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={plugin.current ? [plugin.current] : []}
                    className="relative w-full h-full overflow-hidden"
                >
                    <CarouselContent>
                        {heroBanners.map((heroBanner, index) => {
                            const isVideo = heroBanner.image?.toLowerCase().endsWith('.mp4');
                            return (
                                <CarouselItem
                                    key={index}
                                    className="relative w-full h-[90vh] sm:h-screen flex items-center justify-center text-white text-center"
                                >
                                    {/* Background Media */}
                                    <div className="absolute inset-0 -z-10">
                                        {isVideo ? (
                                            <video
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="none"
                                            >
                                                <source src={heroBanner.image} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <div
                                                className="w-full h-full bg-center bg-cover"
                                                style={{ backgroundImage: `url(${heroBanner.image})` }}
                                            />
                                        )}
                                        {/* Subtle gradient overlay for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 max-w-4xl mx-auto p-4">
                                        <p className="mb-2 text-sm sm:text-base tracking-widest uppercase text-white/90">
                                            A spiritual journey beyond peaks.
                                        </p>
                                        <h1 className="text-3xl sm:text-6xl md:text-6xl font-extrabold mb-4">
                                            {heroBanner.title}
                                        </h1>
                                        <p className="text-base sm:text-xl md:text-xl mb-6 text-white/95">
                                            {heroBanner.description}
                                        </p>
                                        <Link href={heroBanner.buttonLink}>
                                            <Button className="font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-[1.03]">
                                                {heroBanner.buttonText}
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Scroll Indicator */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90">
                                        <a href="#featured" className="flex flex-col items-center gap-1">
                                            <span className="text-xs tracking-widest uppercase">Scroll</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 animate-bounce"
                                            >
                                                <path d="M12 16.5l-6-6 1.5-1.5L12 13.5l4.5-4.5L18 10.5z" />
                                            </svg>
                                        </a>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
};

export default HeroBanner;
