"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";

export default function JourneyPageClient({ journey }: any) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={journey.image}
          alt={journey.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
          >
            {journey.title}
          </motion.h1>
          <p className="text-lg sm:text-xl max-w-2xl text-white/80">
            {journey.excerpt}
          </p>
          {journey.location && (
            <p className="mt-4 text-sm uppercase tracking-wider text-white/60">
              {journey.location}
            </p>
          )}
        </div>
      </section>

      {/* The Legend */}
      <SectionContainer className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">The Legend</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {journey.story}
          </p>
        </motion.div>
      </SectionContainer>

      {/* Myth & Rituals */}
      {(journey.myth || journey.rituals) && (
        <SectionContainer className="py-20 bg-muted/40">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {journey.myth && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Myth & Belief</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {journey.myth}
                </p>
              </motion.div>
            )}
            {journey.rituals && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Rituals & Offerings</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {journey.rituals}
                </p>
              </motion.div>
            )}
          </div>
        </SectionContainer>
      )}

      {/* Essence / Reflection */}
      {journey.essence && (
        <SectionContainer className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-bold mb-6">The Essence</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {journey.essence}
            </p>
          </motion.div>
        </SectionContainer>
      )}

      {/* Final CTA */}
      <section className="relative py-32 text-center text-white bg-black overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent animate-pulse"
        />
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Walk as a Yatri?
          </h2>
          <p className="text-lg text-white/70 mb-10">
            Every mountain holds a story — maybe this one is calling you.
          </p>
          <Link href="/apply">
            <Button size="lg" className="rounded-full text-lg px-10 py-6">
              Begin Your Yatra
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
