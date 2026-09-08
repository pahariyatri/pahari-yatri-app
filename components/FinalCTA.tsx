"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";
import YatriCircleLink from "@/components/common/YatriCircleLink";
import { ArrowRight, BookOpen } from "lucide-react";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { amount: 0.35, once: true });

  // A slow, near-imperceptible vertical drift on the backdrop as the section
  // crosses the viewport — the closing-scene feel, not a SaaS parallax
  // gimmick. One GPU transform, no per-frame JS.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22, filter: "blur(6px)" },
    animate: isInView
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 22, filter: "blur(6px)" },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 sm:py-32 md:py-40 relative overflow-hidden bg-zinc-950"
    >
      {/* Cinematic backdrop — CSS-only, no new image requests. A dusk
          gradient, two slow-breathing glow orbs standing in for alpenglow
          and mist, a hairline mountain horizon (a 446-byte SVG, not a
          photo), and the same film-grain overlay already used elsewhere on
          the homepage. Oversized on the y-axis so the parallax drift never
          reveals an edge. */}
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-[110px] animate-glow" />
        <div className="absolute -bottom-24 -right-16 w-[24rem] h-[24rem] rounded-full bg-white/10 blur-[110px] animate-pulse-slow" />
        <div
          className="absolute bottom-0 inset-x-0 h-24 sm:h-32 opacity-[0.08]"
          style={{
            backgroundImage: "url('/static/images/himalayan-silhouette.svg')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-[url('/static/images/noise-pattern.svg')] opacity-[0.08] mix-blend-overlay" />
      </motion.div>

      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white"
      >
        <motion.span
          {...reveal(0)}
          className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.35em] text-white/60 mb-6"
        >
          The way of the Yatri
        </motion.span>

        <motion.div {...reveal(0.1)} className="w-10 h-px bg-primary/50 mx-auto mb-8" />

        <motion.h2
          {...reveal(0.2)}
          className="text-3xl sm:text-5xl md:text-6xl font-medium font-brandSerif mb-10 leading-[1.12] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.65)]"
        >
          The Himalayas are not asking
          <span className="block text-white/70">to be visited.</span>
        </motion.h2>

        {/* Primary + secondary actions — full-width at thumb reach on mobile */}
        <motion.div
          {...reveal(0.4)}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto"
        >
          <YatriCircleLink
            location="final_cta"
            label="Begin as a Yatri"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-10 py-7 text-base sm:text-lg font-medium bg-white text-zinc-900 hover:bg-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.18)] hover:shadow-[0_10px_45px_rgba(255,255,255,0.3)] hover:scale-[1.03] transition-all duration-300"
            >
              Begin as a Yatri
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </YatriCircleLink>
          <Link href="/library" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full px-10 py-7 text-base sm:text-lg font-medium bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/60 hover:text-white transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Open the Library
            </Button>
          </Link>
        </motion.div>

        <motion.p
          {...reveal(0.6)}
          className="mt-10 text-xs sm:text-sm text-white/40 font-brandSerif italic tracking-wide"
        >
          Walk softly, listen deeply.
        </motion.p>
      </div>
    </section>
  );
}
