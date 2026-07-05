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
import {
  MapPin,
  Clock,
  Footprints,
  Mountain,
  Gauge,
  CalendarDays,
  Check,
  X,
  Backpack,
  ArrowRight,
  ArrowLeft,
  Leaf,
} from "lucide-react";
type Fact = { icon: any; label: string; value?: string };

function paragraphs(text?: string) {
  return (text || "")
    .split(/\n{2,}|\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function JourneyPageClient({ journey }: any) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const facts: Fact[] = [
    { icon: MapPin, label: "Region", value: journey.location },
    { icon: Clock, label: "Duration", value: journey.duration },
    { icon: Footprints, label: "Distance", value: journey.distance },
    { icon: Mountain, label: "Max Altitude", value: journey.maxAltitude },
    { icon: Gauge, label: "Difficulty", value: journey.difficulty },
    { icon: CalendarDays, label: "Best Time", value: journey.bestTime },
  ].filter((f) => f.value);

  const overview = paragraphs(journey.overview);
  const gettingThere = paragraphs(journey.gettingThere);
  const itinerary = (journey.itinerary || []).filter(
    (d: any) => d?.title || d?.detail || d?.day
  );
  const included = (journey.included || []).filter(Boolean);
  const excluded = (journey.excluded || []).filter(Boolean);
  const packing = (journey.packing || []).filter(Boolean);
  const gifts = (journey.giftsFromMountains || []).filter(Boolean);
  const themes = (journey.themes || []).filter(Boolean);
  const faqs = (journey.faqs || []).filter(
    (f: any) => f?.question && f?.answer
  );
  const relatedStories = (journey.relatedStories || []).filter(Boolean);

  // Always give the reader an opening paragraph, even for sparse chapters.
  const intro = overview.length > 0 ? overview : journey.excerpt ? [journey.excerpt] : [];

  return (
    <div className="bg-background text-foreground font-sans">
      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Back */}
      <nav className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40">
        <Link
          href="/library"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">The Library</span>
        </Link>
      </nav>

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
        {/* Quick Facts */}
        {facts.length > 0 && (
          <SectionContainer className="pt-20 sm:pt-24">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="bg-background p-5 flex flex-col items-center text-center gap-2"
                  >
                    <f.icon className="w-5 h-5 text-primary" />
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70">
                      {f.label}
                    </span>
                    <span className="text-sm font-medium leading-snug">
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionContainer>
        )}

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

        {/* Overview (practical, SEO) — always shows at least the excerpt */}
        {intro.length > 0 && (
          <SectionContainer className="py-12 sm:py-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-brandSerif mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-primary" />
                About the Trail
              </h2>
              <div className="space-y-6 text-lg leading-[1.85] text-muted-foreground">
                {intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </SectionContainer>
        )}

        {/* How to Reach */}
        {gettingThere.length > 0 && (
          <section className="py-16 bg-muted/30 border-y border-border/40">
            <SectionContainer>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-brandSerif mb-8 flex items-center gap-4">
                  <MapPin className="w-7 h-7 text-primary" />
                  How to Reach
                </h2>
                <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                  {gettingThere.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </SectionContainer>
          </section>
        )}

        {/* Day-by-Day Itinerary */}
        {itinerary.length > 0 && (
          <SectionContainer className="py-20 sm:py-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-brandSerif mb-12 flex items-center gap-4">
                <span className="w-8 h-px bg-primary" />
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-8">
                {itinerary.map((d: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative pl-10 border-l-2 border-primary/30 pb-2"
                  >
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary" />
                    {d.day && (
                      <span className="text-xs uppercase tracking-widest text-primary font-bold">
                        {d.day}
                      </span>
                    )}
                    {d.title && (
                      <h3 className="text-xl font-brandSerif font-medium mt-1 mb-2">
                        {d.title}
                      </h3>
                    )}
                    {d.detail && (
                      <p className="text-muted-foreground leading-relaxed">
                        {d.detail}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionContainer>
        )}

        {/* Included / Excluded */}
        {(included.length > 0 || excluded.length > 0) && (
          <section className="py-20 bg-muted/30 border-y border-border/40">
            <SectionContainer>
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {included.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-brandSerif mb-6">
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {included.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {excluded.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-brandSerif mb-6">
                      Not Included
                    </h3>
                    <ul className="space-y-3">
                      {excluded.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </SectionContainer>
          </section>
        )}

        {/* Packing Essentials */}
        {packing.length > 0 && (
          <SectionContainer className="py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-brandSerif mb-8 flex items-center gap-4">
                <Backpack className="w-7 h-7 text-primary" />
                Packing Essentials
              </h2>
              <div className="flex flex-wrap gap-3">
                {packing.map((item: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full border border-border bg-muted/40 text-sm text-muted-foreground"
                  >
                    {item}
                  </span>
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
                  Frequently Asked Questions
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
                Stories from This Trail
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
              <Link href="/apply">
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
