"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft, Leaf } from "lucide-react";
import { useEffect } from "react";
import { track, trackOnce } from "@/lib/analytics";

function paragraphs(text?: string) {
  return (text || "")
    .split(/\n{2,}|\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function JourneyPageClient({ journey, slug }: any) {
  // The core funnel metric: a Reel sent someone here and the chapter opened.
  useEffect(() => {
    if (!slug) return;
    trackOnce(`chapter_view:${slug}`, "chapter_view", {
      chapter_slug: slug,
      chapter_title: journey?.title,
      book: journey?.parentBook?.title ?? journey?.parentBook,
      region: journey?.location,
    });
  }, [slug, journey?.title]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const narrative = paragraphs(journey.narrative);
  const gifts = (journey.giftsFromMountains || []).filter(Boolean);
  const themes = (journey.themes || []).filter(Boolean);
  const faqs = (journey.faqs || []).filter(
    (f: any) => f?.question && f?.answer
  );
  const relatedStories = (journey.relatedStories || []).filter(Boolean);


  return (
    <div className="bg-background text-foreground font-sans">
      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Static hero — solid, readable, no scroll-jacking. Image sits behind a
          strong bottom gradient; the title lives at the base where contrast is
          highest, so text is legible on every image and every screen size. */}
      <header className="relative w-full h-[82svh] min-h-[480px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <ResponsiveImage
            src={journey.image}
            alt={journey.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            fallbackSrc="/static/images/himalaya-fallback.jpg"
          />
          {/* Even wash + heavy bottom gradient for accessible text contrast */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-14 sm:pb-20 text-white"
        >
          <span className="block text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-4 text-white/85">
            {journey.location ? journey.location : "A Chapter"}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-brandSerif font-medium mb-5 leading-[1.05] drop-shadow-lg">
            {journey.title}
          </h1>
          <p className="text-base sm:text-xl font-light text-white/90 max-w-2xl leading-relaxed drop-shadow">
            {journey.excerpt}
          </p>
        </motion.div>
      </header>

      {/* Content */}
      <div className="relative bg-background">
        {/* The Invitation (poetic soul) */}
        {journey.invitation && (
          <SectionContainer className="py-20 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <span className="block text-primary text-sm font-bold tracking-[0.2em] uppercase mb-8">
                The Invitation
              </span>
              <p className="text-2xl sm:text-3xl font-brandSerif italic leading-relaxed text-foreground/90">
                {journey.invitation}
              </p>
            </div>
          </SectionContainer>
        )}

        {/* The Journey — the chapter lived in first person, the heart of the page */}
        {narrative.length > 0 && (
          <SectionContainer className="py-12 sm:py-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-brandSerif mb-10 flex items-center gap-4">
                <span className="w-8 h-px bg-primary" />
                The Journey
              </h2>
              <div
                className="space-y-6 text-lg sm:text-xl leading-[1.9] font-brandSerif text-foreground/90
                           [&>p:first-of-type]:first-letter:text-6xl
                           [&>p:first-of-type]:first-letter:font-medium
                           [&>p:first-of-type]:first-letter:float-left
                           [&>p:first-of-type]:first-letter:mr-3
                           [&>p:first-of-type]:first-letter:mt-1
                           [&>p:first-of-type]:first-letter:text-primary"
              >
                {narrative.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </SectionContainer>
        )}

        {/* Gifts & Themes (poetic) */}
        {(gifts.length > 0 || themes.length > 0) && (
          <SectionContainer className="py-16 text-center">
            <div className="max-w-3xl mx-auto space-y-10">
              {gifts.length > 0 && (
                <div>
                  <span className="block text-primary text-sm font-bold tracking-[0.2em] uppercase mb-5">
                    What the Mountains Give
                  </span>
                  <div className="flex flex-wrap justify-center gap-3">
                    {gifts.map((g: string, i: number) => (
                      <span
                        key={i}
                        className="px-5 py-2 rounded-full bg-primary/5 border border-primary/20 text-foreground/80 font-brandSerif"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {themes.length > 0 && (
                <div className="text-sm text-muted-foreground/70 uppercase tracking-widest">
                  {themes.join("  ·  ")}
                </div>
              )}
            </div>
          </SectionContainer>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-20 bg-muted/30 border-y border-border/40">
            <SectionContainer>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-brandSerif mb-10 flex items-center gap-4">
                  <span className="w-8 h-px bg-primary" />
                  Questions Yatris Ask
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f: any, i: number) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-lg font-medium">
                        {f.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                        {f.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SectionContainer>
          </section>
        )}

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <SectionContainer className="py-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-brandSerif mb-10 flex items-center gap-4">
                <span className="w-8 h-px bg-primary" />
                Stories from This Chapter
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedStories.map((s: any) => (
                  <Link
                    key={s.slug}
                    href={s.link}
                    className="group block rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-colors"
                  >
                    {s.image && (
                      <div className="relative h-44 w-full overflow-hidden">
                        <ResponsiveImage
                          src={s.image}
                          alt={s.title}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                          className="group-hover:scale-105 transition-transform duration-500"
                          fallbackSrc="/static/images/mountains-bg.jpg"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-brandSerif text-lg mb-2 group-hover:text-primary transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {s.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </SectionContainer>
        )}

        {/* This chapter's home in the library — quiet backlink to its book */}
        {journey.parentBook && (
          <SectionContainer className="py-8">
            <div className="max-w-2xl mx-auto">
              <Link
                href={`/books/${journey.parentBook.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-muted/20 p-6 hover:border-primary/40 transition-colors"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70">
                    This chapter belongs to
                  </span>
                  <p className="text-lg font-brandSerif font-medium group-hover:text-primary transition-colors">
                    {journey.parentBook.title}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </SectionContainer>
        )}

        {/* The next chapter — an open loop, not a dead end */}
        {journey.nextChapter && (
          <SectionContainer className="py-8">
            <div className="max-w-2xl mx-auto">
              <span className="block text-center text-xs uppercase tracking-[0.2em] text-primary/80 mb-6">
                The book continues
              </span>
              <Link
                href={`/chapters/${journey.nextChapter.slug}`}
                className="group grid sm:grid-cols-[180px_1fr] gap-5 items-center rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/40 transition-colors"
              >
                <div className="relative h-36 sm:h-full w-full min-h-[9rem]">
                  <ResponsiveImage
                    src={journey.nextChapter.image}
                    alt={journey.nextChapter.title}
                    fill
                    sizes="180px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackSrc="/static/images/himalaya-fallback.jpg"
                  />
                </div>
                <div className="p-5 sm:pr-8">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70">
                    Next chapter
                  </span>
                  <h3 className="text-xl font-brandSerif font-medium mt-1 mb-1.5 group-hover:text-primary transition-colors">
                    {journey.nextChapter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {journey.nextChapter.excerpt}
                  </p>
                </div>
              </Link>
            </div>
          </SectionContainer>
        )}

        {/* Closing quote — one line to carry home */}
        {journey.closingQuote && (
          <SectionContainer className="py-16 sm:py-20">
            <figure className="max-w-2xl mx-auto text-center">
              <div className="w-8 h-px bg-primary/40 mx-auto mb-8" />
              <blockquote className="text-2xl sm:text-3xl font-brandSerif italic leading-relaxed text-foreground/90">
                “{journey.closingQuote}”
              </blockquote>
              <div className="w-8 h-px bg-primary/40 mx-auto mt-8" />
            </figure>
          </SectionContainer>
        )}

        {/* Responsible Yatri note — shown on every chapter, reinforces the code */}
        <section className="py-16 sm:py-20 bg-muted/30 border-y border-border/40">
          <SectionContainer>
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Leaf className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-brandSerif mb-4">
                  Walk this chapter with awareness
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  {journey.location ? `${journey.location} is` : "This trail is"} a
                  living landscape of villages, shrines, forests, and weather that
                  turns quickly. Move softly, ask before you photograph faces or
                  temples, support local homes, and carry back everything you carry
                  in. The mountain remembers a respectful guest.
                </p>
                <Link
                  href="/responsible-travel"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Read the Yatri Code
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Final CTA — a quiet invitation to walk this chapter */}
        <section className="py-24 sm:py-32 text-center bg-zinc-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <ResponsiveImage
              src={journey.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover grayscale"
              fallbackSrc="/static/images/mountains-bg.jpg"
            />
          </div>
          {/* Dark scrim keeps the copy readable over any image */}
          <div className="absolute inset-0 bg-zinc-900/80" />

          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <span className="block text-xs uppercase tracking-[0.25em] text-white/60 mb-5">
              Continue the journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-brandSerif mb-6 leading-tight">
              The Himalayas are not asking to be visited.
              <span className="block text-white/70">They ask to be understood.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/75 mb-10 font-light leading-relaxed">
              Learn the trail, its people, and its silences before you set out,
              then walk this chapter with awareness.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply"
                onClick={() =>
                  track("join_yatri_circle_click", {
                    location: "chapter",
                    label: "Begin as a Yatri",
                  })
                }
              >
                <Button
                  size="lg"
                  className="rounded-full px-10 py-7 text-lg bg-white text-zinc-900 hover:bg-white/90 hover:scale-[1.03] transition-all duration-300 shadow-xl"
                >
                  Begin as a Yatri
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link
                href="/books"
                className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline transition-colors"
              >
                Explore more chapters
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
