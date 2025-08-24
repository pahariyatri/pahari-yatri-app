"use client";

import { motion, AnimatePresence } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import Image from "@/components/common/Image";
import { useEffect, useState } from "react";
import Loading from "../looding";

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
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Detect mobile device on client side
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Simulate loading state for smooth transition
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timer);
        };
    }, []);
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
            {/* Banner with loading transition */}
            <AnimatePresence>
                {isLoading ? (
                    <Loading message='Loading Himalayan journeys...'></Loading>
                ) : null}
            </AnimatePresence>

            {/* Banner */}
            <motion.div
                className="relative w-full h-[60vh] sm:h-[70vh] md:h-[75vh] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Image
                    src="/static/images/journey-banner.jpg"
                    alt="Himalayan Journey Banner"
                    fill
                    priority
                    sizes="100vw"
                    className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-10000"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

                {/* Mountain silhouette overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 z-20 opacity-30 pointer-events-none overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path fill="currentColor" fillOpacity="1" className="text-background" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </motion.div>


            {/* Journeys List */}
            <SectionContainer>
                <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                >
                    {/* Mountain icon background */}
                    <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "120" : "200"} height={isMobile ? "120" : "200"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                        </svg>
                    </div>

                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-brandSerif mb-6 leading-snug sm:leading-tight flex items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                    >
                        <span>Each trail is a story.</span>
                        {/* Mountain icon inline */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary hidden sm:inline-block">
                            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                        </svg>
                        <br className="block sm:hidden" />
                        <span>Choose the one that calls you.</span>
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-lg text-muted-foreground max-w-3xl mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    >
                        Curated journeys through the Himalayas — where adventure meets transformation.
                    </motion.p>
                </motion.div>

                <div className="py-8 md:py-16 space-y-16 md:space-y-24">

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
                                    <motion.span
                                        className="text-sm md:text-base text-primary font-mono inline-block"
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        Chapter {String(index + 1).padStart(2, "0")}
                                    </motion.span>
                                    <motion.h2
                                        className="text-xl md:text-2xl font-serif font-bold"
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        {journey.title}
                                    </motion.h2>
                                    <motion.p
                                        className="text-base md:text-lg leading-relaxed text-muted-foreground"
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        {journey.description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-block touch-manipulation"
                                    >
                                        <Link
                                            href={journey.href}
                                            className="inline-flex items-center gap-2 mt-4 bg-primary hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition text-background relative overflow-hidden group
    border-2 border-primary/60 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                            tabIndex={0}
                                        >
                                            <span>Explore Journey</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                            <motion.span
                                                className="absolute inset-0 bg-white/10 pointer-events-none"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "0%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Image Block */}
                                <motion.div
                                    className="flex-1 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-xl group"
                                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                                    whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Mountain overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Mountain silhouette */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 z-20 opacity-30 pointer-events-none overflow-hidden transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                                            <path fill="currentColor" fillOpacity="1" className="text-white" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                        </svg>
                                    </div>

                                    <Image
                                        src={journey.imageSrc}
                                        alt={journey.title}
                                        className="w-full h-full object-cover rounded-xl transition-transform duration-10000 group-hover:scale-110"
                                    />

                                    {/* Journey number badge */}
                                    <div className="absolute top-4 right-4 z-20 bg-primary/90 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                                        {index + 1}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </SectionContainer>
        </>
    );
}
