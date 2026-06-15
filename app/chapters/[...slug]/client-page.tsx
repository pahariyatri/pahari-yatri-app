"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";
import { useRef } from "react";

type Fact = { icon: any; label: string; value?: string };

function paragraphs(text?: string) {
  return (text || "")
    .split(/\n{2,}|\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function JourneyPageClient({ journey }: any) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground font-sans"
    >
      {/* Sticky Hero / Chapter Title */}
      <div className="relative h-screen w-full sticky top-0 z-0 overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 w-full h-full"
        >
          <ResponsiveImage
            src={journey.image}
            alt={journey.title}
            fill
            sizes="100vw"
            priority
            fallbackSrc="/static/images/mountains-bg.jpg"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
        >
          <span className="block text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6 text-white/80">
            {journey.location ? journey.location : "Chapter Selection"}
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-brandSerif font-medium mb-8 leading-tight">
            {journey.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
            {journey.excerpt}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-0 right-0 text-center text-white/60 animate-bounce"
        >
          <span className="text-xs uppercase tracking-widest">
            Scroll to Read
          </span>
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 bg-background min-h-screen rounded-t-[3rem] -mt-20 shadow-[0_-20px_40px_rgba(0,0,0,0.2)] border-t border-white/10">
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

        {/* Overview (practical, SEO) */}
        {overview.length > 0 && (
          <SectionContainer className="py-12 sm:py-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-brandSerif mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-primary" />
                About This Trek
              </h2>
              <div className="space-y-6 text-lg leading-loose text-muted-foreground">
                {overview.map((p, i) => (
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

        {/* Offering + Final CTA */}
        <section className="py-28 sm:py-32 text-center bg-zinc-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <ResponsiveImage
              src={journey.image}
              alt=""
              fill
              sizes="100vw"
              className="grayscale"
              fallbackSrc="/static/images/mountains-bg.jpg"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-6">
            {journey.offering && (
              <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
                {journey.offering}
              </p>
            )}
            <h2 className="text-4xl sm:text-5xl font-brandSerif mb-8">
              The Mountain Calls
            </h2>
            <p className="text-lg text-white/70 mb-12 font-light">
              This chapter is waiting to be written. Will you be the one to write
              it?
            </p>
            <Link href="/apply">
              <Button
                size="lg"
                className="rounded-full px-12 py-8 text-xl bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Begin Your Yatra
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
