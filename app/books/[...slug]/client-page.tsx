"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";
import { ArrowRight } from "lucide-react";
import PhotoCredit from "@/components/common/PhotoCredit";
import styles from "./reading.module.css";

export default function BookPageClient({ book, chapters }: any) {
  const prefersReducedMotion = useReducedMotion() !== false;
  const chapterBySlug = new Map(chapters.map((chapter: any) => [chapter.slug, chapter]));
  const configuredParts = (book.editorialParts || []).map((part: any) => ({
    title: part.title,
    chapters: (part.chapters || [])
      .map((slug: string) => chapterBySlug.get(slug))
      .filter(Boolean),
  }));
  const parts = configuredParts.length > 0
    ? configuredParts
    : [{ title: "Chapters", chapters }];
  const primaryChapters = parts.flatMap((part: any) => part.chapters);
  const furtherJourneys = (book.furtherJourneys || [])
    .map((slug: string) => chapterBySlug.get(slug))
    .filter(Boolean);
  const primaryChapterCount = primaryChapters.length;
  const isParvatiEdition = book.slug === "parvati-valley-beyond-kasol";

  return (
    <div className={`${styles.book} w-full min-h-screen bg-background text-foreground`}>

      {/* The book title is painted twice below — once in the mobile cover overlay,
          once in the desktop column — and CSS hides one of them per breakpoint.
          Both were <h1>, so every book page shipped two identical <h1> elements to
          crawlers, and whichever one was display:none dropped out of the
          accessibility tree entirely. This single sr-only heading is the real <h1>
          for both breakpoints; the two painted titles are now presentational. */}
      <h1 className="sr-only">{book.title}</h1>

      {/* Hero / Cover Section — sticky (not fixed) cover so the page ends
          cleanly and the footer is never overlapped by scrolling content */}
      <div className="relative mx-auto w-full max-w-7xl flex flex-col lg:flex-row lg:items-start lg:gap-12 lg:px-10 lg:py-16">

        {/* Left: Sticky Cover (Desktop) / Top Cover (Mobile) */}
        <div className="relative w-full lg:w-[38%] h-[55svh] lg:h-[72svh] lg:sticky lg:top-24 z-10 overflow-hidden lg:rounded-sm lg:shadow-xl">
          <Image
            src={book.coverImage}
            alt={book.coverImageAlt || book.title}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 lg:bg-gradient-to-r lg:from-black/10 lg:via-black/20 lg:to-background" />

          {/* Mobile Title Overlay */}
          <div className="absolute bottom-0 left-0 p-6 lg:hidden">
            <p aria-hidden="true" className="text-4xl font-bold font-brandSerif text-white mb-2">{book.title}</p>
            <p className="text-white/80 text-sm">{book.excerpt}</p>
            {!isParvatiEdition && (
              <PhotoCredit credit={book.coverImageCredit} url={book.coverImageCreditUrl} className="mt-3" />
            )}
          </div>
          {/* Desktop: credit sits at the cover's base */}
          {!isParvatiEdition && (
            <PhotoCredit
              credit={book.coverImageCredit}
              url={book.coverImageCreditUrl}
              className="hidden lg:block absolute bottom-4 left-6"
            />
          )}
        </div>

        {/* Right: Content Scroll */}
        <div className="w-full lg:flex-1 lg:min-w-0 relative z-20 bg-background">
          <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-0 lg:py-6 max-w-2xl mx-auto">

            {/* Desktop Title */}
            <div className="hidden lg:block mb-16">
              <motion.span
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 }}
                className="text-primary text-sm font-bold tracking-[0.2em] uppercase block mb-4"
              >
                A Himalayan reading edition
              </motion.span>
              <motion.p
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3 }}
                className="text-5xl xl:text-6xl font-bold font-brandSerif text-foreground leading-tight mb-6"
              >
                {book.title}
              </motion.p>
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.4 }}
                className="text-xl text-muted-foreground font-light leading-relaxed"
              >
                {book.excerpt}
              </motion.p>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.5 }}
                className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground/70"
              >
                {book.year && <span>Edition {book.year}</span>}
                {book.year && primaryChapterCount > 0 && <span className="text-primary/40">•</span>}
                {primaryChapterCount > 0 && <span>{primaryChapterCount} chapters</span>}
              </motion.div>
            </div>

            <nav aria-label="Book navigation" className="mb-10 flex flex-wrap items-center gap-5 border-b border-border pb-5 text-sm text-muted-foreground">
              <Link href="/library" className="hover:text-foreground">← Library</Link>
              <a href="#book-contents" className="hover:text-foreground">Contents</a>
              <span className="ml-auto">{primaryChapterCount} chapters{furtherJourneys.length > 0 ? ` · ${furtherJourneys.length} further journeys` : ""}</span>
            </nav>

            {/* Invitation */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              className="prose prose-lg dark:prose-invert mb-12"
            >
              <h2 className="font-brandSerif text-3xl mb-6">The Invitation</h2>
              <p className="text-muted-foreground leading-loose">
                {book.invitation}
              </p>
            </motion.div>

            {/* Table of Contents */}
            <div id="book-contents" className="mb-14 scroll-mt-24">
              <h2 className="font-brandSerif text-3xl mb-10 flex items-center gap-4">
                <span className="w-8 h-px bg-primary"></span>
                Table of Contents
              </h2>

              <p className="mb-8 max-w-prose text-sm leading-relaxed text-muted-foreground">
                The reading order connects places and themes; it is not a continuous trekking route.
              </p>
              <div className="space-y-10">
                {parts.map((part: any, partIndex: number) => {
                  let chapterNumber = parts
                    .slice(0, partIndex)
                    .reduce((count: number, earlierPart: any) => count + earlierPart.chapters.length, 0);

                  return (
                    <section key={part.title} aria-labelledby={`book-part-${partIndex}`}>
                      <h3
                        id={`book-part-${partIndex}`}
                        className="mb-4 border-b border-border/50 pb-3 font-brandSerif text-2xl"
                      >
                        {part.title}
                      </h3>
                      <ol className="space-y-4">
                        {part.chapters.map((chapter: any) => {
                          chapterNumber += 1;
                          return (
                            <li key={chapter.slug}>
                              <Link
                                href={`/chapters/${chapter.slug}`}
                                className="group flex gap-4 sm:gap-5 items-center border-b border-border/60 py-5 hover:border-primary/60 hover:bg-muted/20 transition-colors"
                              >
                                <span className="w-8 shrink-0 self-start pt-1 font-brandSerif text-xl text-primary/60 tabular-nums" aria-hidden="true">
                                  {String(chapterNumber).padStart(2, "0")}
                                </span>

                                <div className="min-w-0 flex-1">
                                  {chapter.location && (
                                    <span className="mb-1 block truncate text-[10px] uppercase tracking-widest text-primary/70">
                                      {chapter.location}
                                    </span>
                                  )}
                                  <h4 className="mb-1 font-brandSerif text-lg font-medium leading-tight transition-colors group-hover:text-primary sm:text-xl">
                                    {chapter.title}
                                  </h4>
                                  <p className="line-clamp-2 text-sm font-light text-muted-foreground/80">
                                    {chapter.description}
                                  </p>
                                </div>

                                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                              </Link>
                            </li>
                          );
                        })}
                      </ol>
                    </section>
                  );
                })}
              </div>

              {furtherJourneys.length > 0 && (
                <section className="mt-12 border-t border-border/60 pt-8" aria-labelledby="further-journeys">
                  <h3 id="further-journeys" className="font-brandSerif text-2xl">
                    Further Journeys
                  </h3>
                  <p className="mb-5 mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                    Related reading beyond the main {primaryChapterCount}-chapter sequence.
                  </p>
                  <ul className="space-y-3">
                    {furtherJourneys.map((chapter: any) => (
                      <li key={chapter.slug}>
                        <Link
                          href={`/chapters/${chapter.slug}`}
                          className="flex items-center justify-between gap-4 rounded-xl border border-border/50 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-muted/30"
                        >
                          <span>
                            {chapter.location && (
                              <span className="mb-1 block text-[10px] uppercase tracking-widest text-primary/70">
                                {chapter.location}
                              </span>
                            )}
                            <span className="font-brandSerif text-lg">{chapter.title}</span>
                          </span>
                          <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {isParvatiEdition && book.coverImageCredit && (
              <section aria-labelledby="cover-acknowledgement" className="mb-12 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
                <h2 id="cover-acknowledgement" className="mb-2 font-medium text-foreground">Cover photograph</h2>
                <p>
                  {book.coverImageAlt}. {book.coverImageCredit}. Displayed with a responsive crop.
                  {book.coverImageCreditUrl && (
                    <> <a href={book.coverImageCreditUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">Photograph source</a>.</>
                  )}
                  {" "}<a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">Licence terms</a>.
                </p>
              </section>
            )}

            {/* CTA */}
            <div className="text-center lg:text-left pt-12 border-t border-border">
              <p className="text-muted-foreground mb-6 italic font-brandSerif">
                &quot;{isParvatiEdition ? "Read the valley slowly. The mountains keep their own time." : "Read the season slowly. The mountains keep their own time."}&quot;
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                {primaryChapters[0] && (
                  <Link href={`/chapters/${primaryChapters[0].slug}`}>
                    <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-[1.03]">
                      Read the first chapter
                    </Button>
                  </Link>
                )}
                <Link
                  href="/library"
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
