"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutClient() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">

            {/* Hero / Origin */}
            <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/static/images/mountains-bg.jpg"
                        alt="Himalayan Peaks"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-30 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-primary text-sm font-bold tracking-[0.3em] uppercase"
                    >
                        The Origin
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl sm:text-7xl md:text-8xl font-brandSerif font-medium tracking-tight leading-tight"
                    >
                        We are not <br /> <span className="italic text-muted-foreground">tourists.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl sm:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        We are Yatris. Seekers of the sacred. Wanderers of the high passes.
                    </motion.p>
                </div>
            </section>

            {/* The Story */}
            <SectionContainer className="py-24 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <h2 className="text-3xl font-brandSerif mb-6">The Awakening</h2>
                        <div className="w-12 h-px bg-primary mb-6" />
                        <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">Est. 2018</p>
                        <p className="text-muted-foreground text-sm">Shrikhand Mahadev Yatra</p>
                    </div>

                    <div className="lg:col-span-8 prose prose-lg dark:prose-invert prose-p:leading-loose prose-headings:font-brandSerif">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-2xl sm:text-3xl font-brandSerif leading-relaxed text-foreground mb-12">
                                &quot;The mountains don&apos;t just challenge the body. They strip away the ego, layer by layer, until only the soul remains.&quot;
                            </p>

                            <p>
                                Pahari Yatri was born not in a boardroom, but on the rugged trails of the Shrikhand Mahadev Yatra. It was 2018. The air was thin, the path was treacherous, and the silence was deafening. In that silence, I found something I hadn&apos;t realized I was looking for: <strong>Connection.</strong>
                            </p>
                            <p>
                                Not just with nature, but with the divine energy that permeates these peaks. I realized that the Himalayas are not merely a destination for adventure; they are ancient, living temples.
                            </p>
                            <p>
                                I saw travelers rushing to conquer peaks, missing the spirit of the mountain. I wanted to change that. I wanted to create a community of <em>Yatris</em>—travelers who walk with reverence, who seek transformation, and who leave footprints of kindness.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </SectionContainer>

            {/* The Values / Manifesto */}
            <SectionContainer>
                <div className="max-w-5xl mx-auto text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl font-brandSerif mb-6">Our Covenant</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        To walk with us is to uphold these sacred truths.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {[
                        {
                            title: "Reverence",
                            desc: "We do not conquer mountains. We bow to them. Every trek is a pilgrimage, every step a prayer."
                        },
                        {
                            title: "Sustainability",
                            desc: "We are guardians of the high lands. We leave no trace but gratitude, protecting the fragile ecosystem."
                        },
                        {
                            title: "Community",
                            desc: "We are not a tour group. We are a tribe. We support local Pahari communities and honor their traditions."
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="text-center space-y-6"
                        >
                            <div className="w-16 h-16 mx-auto bg-background rounded-full flex items-center justify-center border border-border/60 shadow-sm">
                                <span className="font-brandSerif text-xl italic">{idx + 1}</span>
                            </div>
                            <h3 className="text-2xl font-brandSerif">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
}
