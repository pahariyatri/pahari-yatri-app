"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 lg:bg-gradient-to-r lg:from-black/10 lg:via-black/20 lg:to-background" />

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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground/70"
              >
                {book.year && <span>Edition {book.year}</span>}
                {book.year && chapters.length > 0 && <span className="text-primary/40">•</span>}
                {chapters.length > 0 && <span>{chapters.length} chapters</span>}
              </motion.div>
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

              <div className="space-y-4">
                {chapters.map((chapter: any, index: number) => (
                  <motion.div
                    key={chapter.slug || index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={`/chapters/${chapter.slug}`}
                      className="group flex gap-4 sm:gap-5 items-center rounded-2xl border border-border/50 p-3 sm:p-4 hover:border-primary/40 hover:bg-muted/30 transition-all duration-300"
                    >
                      {/* Chapter thumbnail */}
                      <div className="relative h-20 w-24 sm:h-24 sm:w-28 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={chapter.coverImage}
                          alt={chapter.title}
                          fill
                          sizes="112px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-1.5 left-1.5 text-[10px] font-bold font-sans text-white bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                          {`0${index + 1}`}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        {chapter.location && (
                          <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 truncate">
                            {chapter.location}
                          </span>
                        )}
                        <h4 className="text-lg sm:text-xl font-brandSerif font-medium group-hover:text-primary transition-colors leading-tight mb-1">
                          {chapter.title}
                        </h4>
                        <p className="text-muted-foreground/80 text-sm line-clamp-2 font-light">
                          {chapter.description}
                        </p>
                      </div>

                      <ArrowRight className="w-5 h-5 text-muted-foreground/50 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left pt-12 border-t border-border">
              <p className="text-muted-foreground mb-6 italic font-brandSerif">
                &quot;Read the season slowly. The mountains keep their own time.&quot;
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                {chapters[0] && (
                  <Link href={`/chapters/${chapters[0].slug}`}>
                    <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-[1.03]">
                      Read the first chapter
                    </Button>
                  </Link>
                )}
                <Link
                  href="/books"
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Browse other editions
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
