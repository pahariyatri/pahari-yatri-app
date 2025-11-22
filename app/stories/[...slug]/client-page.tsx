"use client";

import React, { useEffect, useState } from "react";
import Image from "@/components/common/Image";
import SectionContainer from "@/components/common/SectionContainer";
import Link from "@/components/common/Link";
import siteMetadata from "@/data/siteMetadata";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface BlogPageClientProps {
  blog: any;
}

export default function BlogPageClient({ blog }: BlogPageClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [renderable, setRenderable] = useState<string>("");

  useEffect(() => {
    if (typeof blog.contentHtml === 'string') {
      setRenderable(blog.contentHtml);
    }
  }, [blog]);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 p-6 z-40">
        <Link href="/stories" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Stories</span>
        </Link>
      </nav>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src={blog.image || `${siteMetadata.siteUrl}/static/og-image.jpg`}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:p-20 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-brandSerif text-foreground mb-6 leading-tight drop-shadow-lg"
          >
            {blog.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            {blog.excerpt}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <SectionContainer className="py-16 md:py-24">
        <article className="prose prose-lg md:prose-xl dark:prose-invert mx-auto font-brandSerif leading-loose">
          {/* Meta */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-12 font-sans uppercase tracking-widest border-b border-border/40 pb-8">
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{siteMetadata.author}</span>
          </div>

          {/* Body */}
          {renderable && (
            <div dangerouslySetInnerHTML={{ __html: renderable }} />
          )}
        </article>

        {/* Footer / Next */}
        <div className="max-w-3xl mx-auto mt-24 pt-12 border-t border-border text-center">
          <p className="text-muted-foreground italic font-brandSerif mb-8">
            &quot;The story continues...&quot;
          </p>
          <Link href="/stories" className="inline-block">
            <span className="text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-sm border-b-2 border-primary pb-1 transition-colors">
              Read Another Story
            </span>
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
