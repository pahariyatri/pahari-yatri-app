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
    
    // Determine if description is long enough to need truncation
    const isLongDescription = description.length > 120;
    const truncatedDescription = isLongDescription && !expanded ? `${description.substring(0, 120)}...` : description;
    
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
                        className="w-full h-64 transition-transform duration-500 hover:scale-105" 
                        aspectRatio="16:9"
                        overlay={true}
                        overlayColor="black"
                        overlayOpacity={0.4}
                    />
                    {/* <div className="absolute bottom-4 left-4 flex gap-2">
                        <CustomBadge variant="primary">{duration}</CustomBadge>
                        <CustomBadge variant="secondary">{difficulty}</CustomBadge>
                    </div> */}
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                        <h3 className="text-xl font-bold font-brandSerif text-foreground mb-3">{title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            {truncatedDescription}
                        </p>
                    </div>
                    <div className="mt-4">
                        <Link href={href} className="block w-full">
                            <IconButton 
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-md"
                                iconType="calendar"
                                iconPosition="left"
                            >
                                Request to Join
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
}

export default FeaturedCard;
