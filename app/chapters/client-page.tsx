"use client";

import { motion, AnimatePresence } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import Image from "@/components/common/Image";
import { useEffect, useState } from "react";
import Loading from "../looding";

interface Chapters {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
}

interface ChaptersClientPageProps {
    chapters: Chapters[];
}

export default function ChaptersClientPage({ chapters }: ChaptersClientPageProps) {
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
    if (!chapters?.length) {
        return (
            <SectionContainer>
                <div className="pb-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Chapters Coming Soon
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

                    {chapters.map((chapters, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-stretch"
                            >
                                {/* Content Block */}
                                <div
                                    className={`flex flex-col justify-center space-y-4 ${isEven ? "" : "md:col-start-2"
                                        }`}
                                >
                                    {/* Chapter */}
                                    <motion.span
                                        className="text-sm md:text-base text-primary font-mono inline-block"
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        Chapter {String(index + 1).padStart(2, "0")}
                                    </motion.span>

                                    {/* Title */}
                                    <motion.h2
                                        className="text-xl md:text-2xl font-serif font-bold"
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        {chapters.title}
                                    </motion.h2>

                                    {/* Mobile Image */}
                                    <motion.div
                                        className="relative w-full h-56 md:hidden rounded-xl overflow-hidden shadow-xl"
                                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                                    >
                                        <Image
                                            src={chapters.imageSrc}
                                            alt={chapters.title}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        className="text-base md:text-lg leading-relaxed text-muted-foreground"
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        {chapters.description}
                                    </motion.p>

                                    {/* CTA */}
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
                                            href={chapters.href}
                                            className="inline-flex items-center gap-2 mt-4 bg-primary hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition text-background border-2 border-primary/60 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            <span>Explore Journey</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Desktop Image */}
                                <motion.div
                                    className="relative w-full h-full rounded-xl overflow-hidden shadow-xl hidden md:flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                                >
                                    <Image
                                        src={chapters.imageSrc}
                                        alt={chapters.title}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
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
