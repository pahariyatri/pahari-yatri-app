"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";

export default function BookPageClient({ book, chapters }: any) {
  return (
    <div className="w-full flex flex-col bg-background text-foreground">
      {/* Cover / Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 sm:px-10 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl font-bold leading-tight mb-4"
          >
            {book.title}
          </motion.h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl">
            {book.excerpt}
          </p>
        </div>
      </section>

      {/* Invitation / Intro */}
      <SectionContainer className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">The Invitation</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {book.invitation}
          </p>
        </motion.div>
      </SectionContainer>

      {/* Chapters */}
      <SectionContainer className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Chapters in this Journey
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter: any, index: number) => (
              <motion.div
                key={chapter.slug || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={chapter.coverImage}
                    alt={chapter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <h4 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                    {chapter.title}
                  </h4>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {chapter.description}
                  </p>
                  <Link href={`/chapters/${chapter.slug}`}>
                    <Button variant="outline" className="rounded-full text-sm">
                      Read Chapter
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* End CTA */}
      <section className="relative py-24 bg-gradient-to-b from-black to-zinc-900 text-center text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Continue the Journey?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Each chapter completes a story — and maybe the next one is yours.
          </p>
          <Link href="/apply">
            <Button
              size="lg"
              className="rounded-full text-lg px-10 py-6 bg-primary hover:bg-primary/90"
            >
              Begin Your Next Chapter
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
