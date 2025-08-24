'use client';

import SectionContainer from "./common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "./common/Link";
import Image from "./common/Image";
import { useEffect, useState } from "react";

export default function BrandStory() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return (
        <SectionContainer className="py-12 md:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop layout with image and text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
                    {/* Image with animation */}
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl animate-fade-in">
                        <Image 
                            src="/static/images/pahari-yatri-banner.png" 
                            alt="Pahari Yatri Journey" 
                            width={600} 
                            height={400} 
                            className="w-full h-auto object-cover rounded-xl md:rounded-2xl transition-transform duration-500 md:duration-700 hover:scale-103 md:hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-60"></div>
                        {/* Mountain silhouette overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 overflow-hidden opacity-30 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
                                <path fill="currentColor" className="text-himalayan-green" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </div>
                    
                    {/* Content with luxury spacing */}
                    <div className="flex flex-col space-y-4 md:space-y-6 animate-slide-in-right">
                        {/* Short bold statement */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-brandSerif text-foreground mb-2 md:mb-4 relative inline-flex items-center">
                            <span className="mr-2 text-2xl md:text-3xl">🏔️</span> Born from the Himalayas
                        </h2>
                        
                        {/* Supporting copy */}
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
                            Pahari Yatri began with a single yatra in 2018. A journey of devotion that became a movement of transformation. Our story is rooted in the ancient wisdom of the Himalayas and a deep connection to spiritual heritage.
                        </p>
                        
                        {/* <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            We don't just offer packages - we create transformative experiences that honor the sacred mountains and the traditions they hold.
                        </p> */}
                        
                        <Link href="/about-us" className="inline-block">
                            <Button 
                                variant="outline"
                                className="group relative overflow-hidden border-primary hover:border-primary/80 hover:bg-primary/5 text-sm md:text-base flex items-center gap-2"
                            >
                                <span className="relative z-10">Read Our Full Story</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
