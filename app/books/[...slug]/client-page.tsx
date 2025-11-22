"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";
import { ArrowRight } from "lucide-react";

export default function BookPageClient({ book, chapters }: any) {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">

      {/* Hero / Cover Section */}
      <div className="relative w-full lg:h-screen flex flex-col lg:flex-row">

        {/* Left: Sticky Cover (Desktop) / Top Cover (Mobile) */}
        <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-full lg:fixed lg:left-0 lg:top-0 z-10 overflow-hidden">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/80" />

          {/* Mobile Title Overlay */}
          <div className="absolute bottom-0 left-0 p-6 lg:hidden">
            <h1 className="text-4xl font-bold font-brandSerif text-white mb-2">{book.title}</h1>
            <p className="text-white/80 text-sm">{book.excerpt}</p>
          </div>
        </div>

        {/* Right: Content Scroll */}
        <div className="w-full lg:w-1/2 lg:ml-auto relative z-20 bg-background min-h-screen">
          <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-20 lg:py-32 max-w-2xl mx-auto">

            {/* Desktop Title */}
            <div className="hidden lg:block mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary text-sm font-bold tracking-[0.2em] uppercase block mb-4"
              >
                The Edition
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl xl:text-7xl font-bold font-brandSerif text-foreground leading-tight mb-6"
              >
                {book.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground font-light leading-relaxed"
              >
                {book.excerpt}
              </motion.p>
            </div>

            {/* Invitation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg dark:prose-invert mb-20"
            >
              <h3 className="font-brandSerif text-3xl mb-6">The Invitation</h3>
              <p className="text-muted-foreground leading-loose">
                {book.invitation}
              </p>
            </motion.div>

            {/* Table of Contents */}
            <div className="mb-24">
              <h3 className="font-brandSerif text-3xl mb-10 flex items-center gap-4">
                <span className="w-8 h-px bg-primary"></span>
                Table of Contents
              </h3>

              <div className="space-y-8">
                {chapters.map((chapter: any, index: number) => (
                  <motion.div
                    key={chapter.slug || index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group border-b border-border/40 pb-8 last:border-0"
                  >
                    <Link href={`/chapters/${chapter.slug}`} className="block group-hover:pl-4 transition-all duration-300">
                      <div className="flex items-baseline justify-between mb-2">
                        <h4 className="text-xl sm:text-2xl font-brandSerif font-medium group-hover:text-primary transition-colors">
                          <span className="mr-4 text-sm text-muted-foreground/50 font-sans uppercase tracking-widest">0{index + 1}</span>
                          {chapter.title}
                        </h4>
                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-muted-foreground/80 text-sm pl-10 line-clamp-2 font-light">
                        {chapter.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left pt-12 border-t border-border">
              <p className="text-muted-foreground mb-6 italic font-brandSerif">
                &quot;Every journey begins with a single step.&quot;
              </p>
              <Link href="/apply">
                <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Begin This Journey
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
