'use client';

import Link from "../common/Link";
import BaseCard from "../common/BaseCard";
import CustomBadge from "../common/CustomBadge";
import ResponsiveImage from "../common/ResponsiveImage";
import IconButton from "../common/IconButton";
import { useState } from "react";

interface FeaturedCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    duration?: string;
    difficulty?: string;
    location?: string;
}

const FeaturedCard = ({ title, description, imageSrc, href, duration = "7 Days", difficulty = "Moderate", location = "Himachal Pradesh" }: FeaturedCardProps) => {
    const [expanded, setExpanded] = useState(false);
    // Check for mobile viewport
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Determine if description is long enough to need truncation
    const isLongDescription = description.length > (isMobile ? 100 : 120);
    const truncatedDescription = isLongDescription && !expanded ? `${description.substring(0, isMobile ? 100 : 120)}...` : description;
    
    return (
        <BaseCard 
            className="p-0" 
            hoverEffect="translate"
            contentClassName="p-0"
        >
            <div className="relative flex flex-col rounded-lg overflow-hidden h-full">
                <div className="relative">
                    <ResponsiveImage 
                        src={imageSrc} 
                        alt={title} 
                        className="w-full h-48 sm:h-56 md:h-64 transition-transform duration-500 hover:scale-105" 
                        aspectRatio="16:9"
                        overlay={true}
                        overlayColor="black"
                        overlayOpacity={0.4}
                    />
                    {/* Mountain icon overlay */}
                    <div className="absolute top-4 right-4 text-white/40 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                        </svg>
                    </div>
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-brandSerif text-foreground mb-3 tracking-tight">{title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                            {truncatedDescription}
                        </p>
                    </div>
                    <div className="mt-4">
                        <Link href={href} className="block w-full">
                            <IconButton 
                                className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-md text-base flex items-center justify-center gap-2"
                                iconType="calendar"
                                iconPosition="left"
                            >
                                <span className="flex items-center gap-2">
                                    <span>Read Full Story</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </span>
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
}

export default FeaturedCard;
