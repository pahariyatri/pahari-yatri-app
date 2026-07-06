"use client";

import React, { useState } from "react";
import Image from "@/components/common/Image";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import siteMetadata from "@/data/siteMetadata";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, PenLine, Share2 } from "lucide-react";

interface BlogPageClientProps {
  blog: any;
}

export default function BlogPageClient({ blog }: BlogPageClientProps) {
  const [copied, setCopied] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax effects for the hero header image
  const y = useTransform(scrollY, [0, 400], [0, 120]);
  const scale = useTransform(scrollY, [0, 400], [1.05, 0.95]);
  const gradientOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          className="flex items-center gap-2 text-white/90 hover:text-white transition-all bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Stories</span>
        </Link>
      </nav>

      {/* Hero — readable white title at the base over a strong gradient */}
      <header className="relative w-full h-[68svh] min-h-[440px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <motion.div style={{ y, scale }} className="absolute inset-0 h-full w-full">
            <Image
              src={blog.image || `${siteMetadata.siteUrl}/static/images/himalaya-fallback.jpg`}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/35 z-10" />
          <motion.div style={{ opacity: gradientOpacity }} className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/10 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-3xl mx-auto px-6 pb-12 sm:pb-16 text-center">
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
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
              <PenLine className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Narrator / Voice</span>
              <span className="font-brandSerif text-base font-medium text-foreground">
                {blog.voice ? blog.voice : siteMetadata.author}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground tracking-wide">
            <span className="inline-flex items-center gap-1.5 bg-muted/50 px-3.5 py-1.5 rounded-full border border-border/40">
              <Clock className="w-3.5 h-3.5 text-primary" /> {blog.minutes} min read
            </span>
            {blog.publishedAt && (
              <time dateTime={blog.publishedAt} className="bg-muted/50 px-3.5 py-1.5 rounded-full border border-border/40">
                {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </div>
      </div>

      {/* Body — comfortable reading measure, drop cap, refined serif */}
      <SectionContainer className="py-6 md:py-10">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="story-article mx-auto max-w-[65ch]"
        >
          {blog.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />
          ) : (
            <p className="text-muted-foreground italic">{blog.excerpt}</p>
          )}
        </motion.article>

        {/* Pull quote */}
        {blog.quote && (
          <figure className="relative max-w-2xl mx-auto my-16 px-8 py-12 rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-sm overflow-hidden text-center">
            <span className="absolute -top-6 -left-2 text-[180px] font-serif font-bold text-primary/10 select-none pointer-events-none leading-none">“</span>
            <blockquote className="relative z-10 text-xl sm:text-2xl md:text-3xl font-brandSerif italic leading-relaxed text-foreground/90 max-w-xl mx-auto">
              {blog.quote}
            </blockquote>
            <span className="absolute -bottom-24 -right-2 text-[180px] font-serif font-bold text-primary/10 select-none pointer-events-none leading-none">”</span>
          </figure>
        )}

        {/* Share widget */}
        <div className="max-w-[68ch] mx-auto mt-16 border-t border-border/40 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            Enjoyed this story? Share the path.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background px-5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/40 transition-all duration-300"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 bg-background px-5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/40 transition-all duration-300"
            >
              Share on X
            </a>
          </div>
        </div>

        {/* Chapter context */}
        {blog.chapter && (
          <div className="max-w-[68ch] mx-auto mt-12">
            <Link
              href={`/chapters/${blog.chapter.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
                  This story belongs to
                </span>
                <p className="text-lg font-brandSerif font-medium group-hover:text-primary transition-colors mt-0.5">
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
            <span className="block text-center text-xs uppercase tracking-[0.2em] text-primary/80 mb-8 font-semibold">
              Keep reading
            </span>
            <Link
              href={`/stories/${blog.nextStory.slug}`}
              className="group grid sm:grid-cols-[200px_1fr] gap-6 items-center rounded-3xl overflow-hidden border border-border/40 bg-card p-2 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-40 sm:h-full w-full min-h-[10rem] rounded-2xl overflow-hidden">
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
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
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
