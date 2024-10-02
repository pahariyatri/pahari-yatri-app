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
        <section className="relative w-full h-screen overflow-hidden">
            {/* Carousel Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={plugin.current ? [plugin.current] : []}
                    className="relative w-full h-screen overflow-hidden"
                >
                    <CarouselContent>
                        {heroBanners.map((heroBanner, index) => (
                            <CarouselItem
                                key={index}
                                className="relative w-full h-screen flex items-center justify-center text-white text-center"
                                style={{ backgroundImage: `url(${heroBanner.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/50"></div>

                                {/* Content */}
                                <div className="relative z-10 max-w-2xl mx-auto p-4">
                                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4">
                                        {heroBanner.title}
                                    </h1>
                                    <p className="text-lg sm:text-xl md:text-2xl mb-6">
                                        {heroBanner.description}
                                    </p>
                                    <Link href={heroBanner.buttonLink}>
                                        <Button className="font-bold py-3 px-6 rounded-full transition duration-300 bg-blue-600 hover:bg-blue-700">
                                            {heroBanner.buttonText}
                                        </Button>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
};

export default HeroBanner;
