'use client';

import Autoplay from "embla-carousel-autoplay"
import * as React from "react";
import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import FeaturedCard from "./cards/FeaturedCard";
import { cn } from "@/lib/utils";

interface FeaturedPackageProps {
    featuredPackages: Array<{
        title: string;
        description: string;
        href: string;
        imageSrc: string;
        duration?: string;
        difficulty?: string;
        location?: string;
        price?: number;
    }>;
}


export default function FeaturedPackage({ featuredPackages }: FeaturedPackageProps) {
    const plugin = React.useRef<any>(null);

    React.useEffect(() => {
        // Initialize the Autoplay plugin on the client side
        const autoplay = Autoplay({ delay: 2500, stopOnInteraction: false });
        plugin.current = autoplay;
    }, []);

    return (
        <SectionContainer className="py-8 md:py-16">
            <Carousel 
                opts={{ align: "start", loop: true }}
                plugins={plugin.current ? [plugin.current] : []}
                // onMouseEnter={plugin.current ? plugin.current.stop : null}
                // onMouseLeave={plugin.current ? plugin.current.reset : null}
                className="relative w-full overflow-hidden mt-10 animate-fade-in"
            >
                <CarouselContent className="-ml-4">
                    {featuredPackages.map((pkg, index) => (
                        <CarouselItem 
                            key={index} 
                            className={cn(
                                "pl-4 basis-full sm:basis-1/2 md:basis-1/3 p-4",
                                index === 0 ? "animate-slide-in-right" : "",
                                index === 1 ? "animate-slide-in-right [animation-delay:150ms]" : "",
                                index === 2 ? "animate-slide-in-right [animation-delay:300ms]" : ""
                            )}
                        >
                            <FeaturedCard
                                key={index}
                                title={pkg.title}
                                description={pkg.description}
                                href={pkg.href}
                                imageSrc={pkg.imageSrc}
                                duration={pkg.duration || "7 Days"}
                                difficulty={pkg.difficulty || "Moderate"}
                                location={pkg.location}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
            </Carousel>
        </SectionContainer>
    );
}
