"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "@/components/common/Image";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";
import { useRef } from "react";

export default function JourneyPageClient({ journey }: any) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-sans">

      {/* Sticky Hero / Chapter Title */}
      <div className="relative h-screen w-full sticky top-0 z-0 overflow-hidden flex flex-col items-center justify-center">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 w-full h-full">
          <Image
            src={journey.image}
            alt={journey.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
        >
          <span className="block text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6 text-white/80">
            Chapter Selection
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-brandSerif font-medium mb-8 leading-tight">
            {journey.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
            {journey.excerpt}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-0 right-0 text-center text-white/60 animate-bounce"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to Read</span>
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 bg-background min-h-screen rounded-t-[3rem] -mt-20 shadow-[0_-20px_40px_rgba(0,0,0,0.2)] border-t border-white/10">

        {/* The Legend - Passage Style */}
        <SectionContainer className="py-24 sm:py-32">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg md:prose-xl dark:prose-invert font-brandSerif"
            >
              <span className="block text-primary text-sm font-sans font-bold tracking-[0.2em] uppercase mb-8 text-center">The Legend</span>
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left leading-loose">
                {journey.story}
              </p>
            </motion.div>
          </div>
        </SectionContainer>

        {/* Myth & Rituals - Split View */}
        {(journey.myth || journey.rituals) && (
          <section className="py-24 bg-muted/30 border-y border-border/40">
            <SectionContainer>
              <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">
                {journey.myth && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-brandSerif text-primary">Mythos</h3>
                    <div className="w-12 h-px bg-primary/40" />
                    <p className="text-muted-foreground text-lg leading-relaxed font-light">
                      {journey.myth}
                    </p>
                  </motion.div>
                )}

                {journey.rituals && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-brandSerif text-primary">Ritual</h3>
                    <div className="w-12 h-px bg-primary/40" />
                    <p className="text-muted-foreground text-lg leading-relaxed font-light">
                      {journey.rituals}
                    </p>
                  </motion.div>
                )}
              </div>
            </SectionContainer>
          </section>
        )}

        {/* The Essence - Centered */}
        {journey.essence && (
          <SectionContainer className="py-32 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto bg-primary/5 p-12 rounded-3xl border border-primary/10"
            >
              <h3 className="text-2xl font-brandSerif mb-8 text-primary">The Essence</h3>
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed italic font-brandSerif">
                &quot;{journey.essence}&quot;
              </p>
            </motion.div>
          </SectionContainer>
        )}

        {/* Final CTA */}
        <section className="py-32 text-center bg-zinc-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src={journey.image}
              alt="Background"
              fill
              className="object-cover grayscale"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <h2 className="text-4xl sm:text-5xl font-brandSerif mb-8">
              The Mountain Calls
            </h2>
            <p className="text-lg text-white/70 mb-12 font-light">
              This chapter is waiting to be written. Will you be the one to write it?
            </p>
            <Link href="/apply">
              <Button size="lg" className="rounded-full px-12 py-8 text-xl bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl">
                Begin Your Yatra
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
