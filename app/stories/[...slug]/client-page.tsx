"use client";

import React, { useEffect, useState } from "react";
import Image from "@/components/common/Image";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import siteMetadata from "@/data/siteMetadata";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, PenLine } from "lucide-react";

interface BlogPageClientProps {
  blog: any;
}

export default function BlogPageClient({ blog }: BlogPageClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [renderable, setRenderable] = useState<string>("");

  useEffect(() => {
    if (typeof blog.contentHtml === "string") setRenderable(blog.contentHtml);
  }, [blog]);

  return (
    <main className="min-h-screen bg-background">
      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Back */}
      <nav className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40">
        <Link
          href="/stories"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Stories</span>
        </Link>
      </nav>

      {/* Hero — readable white title at the base over a strong gradient */}
      <header className="relative w-full h-[68svh] min-h-[440px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src={blog.image || `${siteMetadata.siteUrl}/static/images/himalaya-fallback.jpg`}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/55 to-black/20" />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-12 sm:pb-16 text-center">
          {blog.chapter && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-white/80 mb-5"
            >
              From the chapter · {blog.chapter.title}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-medium font-brandSerif text-white mb-5 leading-[1.08] drop-shadow-lg"
          >
            {blog.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-white/85 font-light max-w-xl mx-auto leading-relaxed drop-shadow"
          >
            {blog.excerpt}
          </motion.p>
        </div>
      </header>

      {/* Meta bar */}
      <div className="max-w-2xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
          <span>{siteMetadata.author}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {blog.minutes} min read
          </span>
        </div>
        <div className="w-10 h-px bg-primary/30 mx-auto mt-8" />
      </div>

      {/* Body — comfortable reading measure, drop cap, refined serif */}
      <SectionContainer className="py-10 md:py-14">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg dark:prose-invert mx-auto max-w-[68ch]
                     font-brandSerif prose-p:leading-[1.9] prose-p:text-foreground/90
                     prose-headings:font-brandSerif
                     prose-p:first-of-type:first-letter:text-6xl
                     prose-p:first-of-type:first-letter:font-brandSerif
                     prose-p:first-of-type:first-letter:font-medium
                     prose-p:first-of-type:first-letter:float-left
                     prose-p:first-of-type:first-letter:mr-3
                     prose-p:first-of-type:first-letter:mt-1
                     prose-p:first-of-type:first-letter:text-primary"
        >
          {renderable ? (
            <div dangerouslySetInnerHTML={{ __html: renderable }} />
          ) : (
            <p className="text-muted-foreground italic">{blog.excerpt}</p>
          )}
        </motion.article>

        {/* Pull quote */}
        {blog.quote && (
          <figure className="max-w-2xl mx-auto my-16 text-center">
            <div className="w-8 h-px bg-primary/40 mx-auto mb-8" />
            <blockquote className="text-2xl sm:text-3xl font-brandSerif italic leading-relaxed text-foreground/90">
              “{blog.quote}”
            </blockquote>
            <div className="w-8 h-px bg-primary/40 mx-auto mt-8" />
          </figure>
        )}

        {/* Chapter context */}
        {blog.chapter && (
          <div className="max-w-2xl mx-auto mt-16">
            <Link
              href={`/chapters/${blog.chapter.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <div>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70">
                  This story belongs to
                </span>
                <p className="text-lg font-brandSerif font-medium group-hover:text-primary transition-colors">
                  {blog.chapter.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </SectionContainer>

      {/* Next story */}
      {blog.nextStory && (
        <section className="border-t border-border/40 bg-muted/20 py-16">
          <div className="max-w-3xl mx-auto px-6">
            <span className="block text-center text-xs uppercase tracking-[0.2em] text-primary/80 mb-8">
              Keep reading
            </span>
            <Link
              href={`/stories/${blog.nextStory.slug}`}
              className="group grid sm:grid-cols-[200px_1fr] gap-6 items-center rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/40 transition-colors"
            >
              <div className="relative h-40 sm:h-full w-full min-h-[10rem]">
                <ResponsiveImage
                  src={blog.nextStory.image}
                  alt={blog.nextStory.title}
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackSrc="/static/images/himalaya-fallback.jpg"
                />
              </div>
              <div className="p-6 sm:pr-8">
                <h3 className="text-xl font-brandSerif font-medium mb-2 group-hover:text-primary transition-colors">
                  {blog.nextStory.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.nextStory.excerpt}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Contribute CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <PenLine className="w-6 h-6 text-primary mx-auto mb-5" strokeWidth={1.5} />
          <h2 className="text-2xl sm:text-3xl font-brandSerif font-medium mb-4">
            Every trail has a story.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Yours could become the next chapter others learn from. Share a walk, a
            village, a temple bell you still hear.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contribute">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                Write your own story
              </span>
            </Link>
            <Link
              href="/stories"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Back to all stories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
