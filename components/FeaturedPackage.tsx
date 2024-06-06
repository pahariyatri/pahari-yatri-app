'use client';

import Autoplay from "embla-carousel-autoplay"
import * as React from "react";
import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import FeaturedCard from "./cards/FeaturedCard";

interface FeaturedPackageProps {
    featuredPackages: Array<{
        title: string;
        description: string;
        href: string;
        imageSrc: string;
    }>;
}


export default function FeaturedPackage({ featuredPackages }: FeaturedPackageProps) {
    const plugin = React.useRef<any>(null);

    React.useEffect(() => {
        // Initialize the Autoplay plugin on the client side
        const autoplay = Autoplay({ delay: 2000, stopOnInteraction: false });
        plugin.current = autoplay;
    }, []);

    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Featured
                </p>
                <PageTitle>Kailash Yatra with Pahari Yatri</PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    Embark on a Spiritual Journey to Shrikhand, Manimahesh, and Kinnaur Kailash
                </p>
            </div>

            <Carousel opts={{ align: "start", loop: true }}
                plugins={plugin.current ? [plugin.current] : []}
                // onMouseEnter={plugin.current ? plugin.current.stop : null}
                // onMouseLeave={plugin.current ? plugin.current.reset : null}
                className="relative w-full overflow-hidden mt-4"
            >
                <CarouselContent>
                    {featuredPackages.map((pkg, index) => (
                        <CarouselItem key={index} className="basis-full sm:basis-1/1.1 lg:basis-1/1 p-2">
                            <FeaturedCard
                                key={index}
                                title={pkg.title}
                                description={pkg.description}
                                href={pkg.href}
                                imageSrc={pkg.imageSrc}
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
