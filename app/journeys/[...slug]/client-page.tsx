"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import Link from "@/components/common/Link";
import SectionContainer from "@/components/common/SectionContainer";

export default function JourneyPageClient({ journey }: any) {
    const itinerary = Array.isArray(journey.itinerary) ? journey.itinerary : [];

    return (
        <>
         {/* Hero */}
                    <section className="relative w-full h-screen overflow-hidden">
                        <Image
                            src={journey.image}
                            alt={journey.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-foreground"
                            >
                                {journey.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="mt-4 max-w-lg sm:max-w-xl text-base sm:text-lg text-muted-foreground"
                            >
                                {journey.excerpt}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="mt-6 sm:mt-8"
                            >
                                <Link
                                    href="#apply"
                                    className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg bg-primary text-primary-foreground shadow-lg"
                                >
                                    Begin Your Yatra
                                </Link>
                            </motion.div>
                        </div>
                    </section>

            <SectionContainer>
           


                {/* Why This Journey Matters */}
                <SectionContainer>
                    <div className="py-12 sm:py-16 space-y-6 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            Why This Journey Matters
                        </h2>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                            This is not a tour. It’s a pilgrimage into the silence of the
                            mountains — a chance to walk as a seeker, not a tourist.
                        </p>
                    </div>
                </SectionContainer>

                {/* Itinerary */}
                <SectionContainer>
                    {itinerary.length > 0 && (
                        <section className="bg-muted/30 py-12 sm:py-16">
                            <h3 className="text-center text-xl sm:text-2xl font-semibold mb-8">
                                The Journey
                            </h3>
                            <div className="space-y-6 max-w-3xl mx-auto px-4">
                                {itinerary.map((d: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true }}
                                        className="p-6 rounded-2xl shadow-sm bg-card text-card-foreground"
                                    >
                                        <h4 className="text-lg font-semibold">
                                            Day {d.day} — {d.title}
                                        </h4>
                                        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                                            {d.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}
                </SectionContainer>


                {/* More than a Journey */}
                <SectionContainer>
                    <div className="py-16 sm:py-20 text-center space-y-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            More than a Journey
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
                            {["Meaning", "Transformation", "Connection"].map((point, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-xl bg-muted text-muted-foreground"
                                >
                                    <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                                        {point}
                                    </h3>
                                    <p className="mt-2 text-sm sm:text-base">
                                        A short line explaining {point.toLowerCase()} in this Yatra.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionContainer>

                {/* Final CTA */}
                <section
                    id="apply"
                    className="bg-primary text-primary-foreground py-16 sm:py-20 text-center px-4"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        Are you ready to walk as a Yatri?
                    </h2>
                    <Link
                        href="/apply"
                        className="mt-8 inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full text-lg font-semibold bg-background text-foreground shadow-lg"
                    >
                        Join the Yatra
                    </Link>
                </section>
            </SectionContainer>
        </>

    );
}
