"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import Image from "@/components/common/Image";

interface Journey {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
}

interface JourneyClientPageProps {
    journeys: Journey[];
}

export default function JourneyClientPage({ journeys }: JourneyClientPageProps) {
    if (!journeys?.length) {
        return (
            <SectionContainer>
                <div className="pb-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Journeys Coming Soon
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                        The Himalayas are calling. Our curated Yatras will be revealed soon.
                    </p>
                </div>
            </SectionContainer>
        );
    }

    return (
        <>
            {/* Banner */}
            <div className="relative w-full h-[70vh] sm:h-[75vh] overflow-hidden">
                <Image
                    src="/static/images/journey-banner.jpg"
                    alt="Himalayan Journey Banner"
                    fill
                    priority
                    sizes="100vw"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 z-10" />


            </div>


            {/* Journeys List */}

            <SectionContainer>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-brandSerif mb-6 leading-snug sm:leading-tight">

                    Each trail is a story. <br /> Choose the one that calls you.
                </h1>

                <div className="py-16 md:py-24 space-y-20 md:space-y-32">

                    {journeys.map((journey, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isEven ? "" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Text Block */}
                                <div className="flex-1 space-y-4">
                                    <span className="text-sm md:text-base text-muted-foreground font-mono">
                                        Chapter {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h2 className="text-xl md:text-2xl font-serif font-bold">
                                        {journey.title}
                                    </h2>
                                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                        {journey.description}
                                    </p>
                                    <Link
                                        href={journey.href}
                                        className="inline-block mt-4 bg-primary hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition text-background"
                                    >
                                        Read More
                                    </Link>
                                </div>

                                {/* Image Block */}
                                <motion.div
                                    className="flex-1 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-xl"
                                    initial={{ scale: 1.05 }}
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src={journey.imageSrc}
                                        alt={journey.title}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </SectionContainer>
        </>
    );
}
