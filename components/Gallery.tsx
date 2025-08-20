"use client";

import SectionContainer from "@/components/common/SectionContainer";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export default function Gallery({ images = [] }: { images?: (string | null)[] }) {
    const plugin = React.useRef<any>(null);

    React.useEffect(() => {
        plugin.current = Autoplay({ delay: 2000, stopOnInteraction: false });
    }, []);

    // Convert readonly array to mutable and filter out null values
    const processedImages: string[] = [...images].filter((url): url is string => url !== null);

    return (
        <SectionContainer>
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={plugin.current ? [plugin.current] : []}
                className="relative w-full h-96 overflow-hidden"
            >
                <CarouselContent>
                    {processedImages.map((url, index) => (
                        <CarouselItem key={index} className="relative w-full h-96">
                            <ResponsiveImage
                                src={url}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-full"
                                aspectRatio="16:9"
                                rounded="lg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </SectionContainer>
    );
}
