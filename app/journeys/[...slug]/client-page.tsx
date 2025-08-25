"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/common/Image";
import Link from "@/components/common/Link";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";

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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl"
                    >
                        {journey.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                        className="mt-6 max-w-xl text-lg sm:text-2xl text-white/80"
                    >
                        {journey.excerpt}
                    </motion.p>
                </div>
            </section>

            {/* Why This Journey Matters */}
            <SectionContainer>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                    className="py-16 space-y-6 text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Why This Journey Matters
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
                        This is not a tour. It’s a pilgrimage into the silence of the mountains — a chance to walk as a seeker, not a tourist.
                    </p>
                </motion.div>
            </SectionContainer>

            {/* Itinerary */}
            {itinerary.length > 0 && (
                <section className="bg-muted/30 py-16">
                    <h3 className="text-center text-2xl sm:text-3xl font-semibold mb-10 tracking-tight">
                        The Journey
                    </h3>
                    <div className="space-y-8 max-w-3xl mx-auto px-4">
                        {itinerary.map((d: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl shadow-lg bg-card/80 text-card-foreground border border-primary/10 backdrop-blur-md"
                            >
                                <h4 className="text-xl font-semibold mb-2">
                                    Day {d.day} — {d.title}
                                </h4>
                                <p className="text-base sm:text-lg text-muted-foreground">
                                    {d.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="w-full py-28 md:py-36 relative overflow-hidden">
                {/* Radial Gradient / Particles */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse-slow" />
                </motion.div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0.7 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="w-24 h-1 bg-primary/80 mx-auto mb-12 rounded-full shadow-sm animate-glow origin-center"
                    />
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold font-brandSerif text-white mb-12 leading-tight tracking-tight animate-fade-in-up"
                    >
                        Are you ready to walk as a Yatri?
                    </motion.h2>
                    <Link href={'/apply'}>
                        <Button
                            variant="default"
                            className="font-medium text-lg px-10 py-7 rounded-full relative overflow-hidden group transition-all duration-500 transform hover:scale-105 shadow-xl border border-primary/20 hover:border-primary"
                        >
                            <span className="absolute top-0 left-0 w-full h-full bg-primary-foreground/20 scale-0 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></span>
                            <span className="relative z-10">{'Join the Yatra'}</span>
                        </Button>
                    </Link>
                </div>
            </section>

            {/* More than a Journey */}
            <SectionContainer>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                    className="py-20 text-center space-y-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        More than a Journey
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
                        {["Meaning", "Transformation", "Connection"].map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-xl bg-muted/80 text-muted-foreground border border-primary/10 shadow-md"
                            >
                                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                                    {point}
                                </h3>
                                <p className="text-base sm:text-lg">
                                    A short line explaining {point.toLowerCase()} in this Yatra.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </SectionContainer>


        </>
    );
}