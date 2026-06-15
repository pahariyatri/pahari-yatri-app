import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import siteMetadata from "@/data/siteMetadata";
import { resolveImage } from "@/lib/images";
import type { Metadata } from "next";

const reader = createReader(process.cwd(), keystaticConfig);

/** Canonical home for every chapter is `/chapters/[slug]`, so the same trek
 *  reachable at `/books/[book]/[chapter]` points its canonical here and we
 *  avoid duplicate-content penalties. */
export const chapterCanonical = (slug: string) => `/chapters/${slug}`;

export function chapterOgImage(chapter: any) {
  return `${siteMetadata.siteUrl}/api/og?type=chapter&title=${encodeURIComponent(
    chapter.title
  )}&sub=${encodeURIComponent(
    chapter.location || chapter.invitation || chapter.excerpt || ""
  )}`;
}

/** Build the data + JSON-LD a chapter detail page needs. Returns null if the
 *  chapter does not exist. Shared by `/chapters/[...slug]` and
 *  `/books/[book]/[chapter]`. */
export async function getChapterView(slug: string) {
  const chapter = await reader.collections.chapters.read(slug);
  if (!chapter) return null;

  const chapterUrl = `${siteMetadata.siteUrl}${chapterCanonical(slug)}`;
  const imageUrl = chapterOgImage(chapter);

  // TouristTrip schema — helps Google surface this page for trek searches
  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: chapter.title,
    description: chapter.excerpt || chapter.invitation || "",
    url: chapterUrl,
    image: imageUrl,
    touristType: [
      "Spiritual Seekers",
      "Adventure Travelers",
      "Cultural Travelers",
    ],
    itinerary: {
      "@type": "ItemList",
      name: `${chapter.title} Itinerary`,
      numberOfItems: (chapter.itinerary || []).length || undefined,
      itemListElement: (chapter.itinerary || []).map((d: any, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        name: [d.day, d.title].filter(Boolean).join(": ") || `Day ${i + 1}`,
        description: d.detail || "",
      })),
    },
    offers: chapter.offering
      ? {
          "@type": "Offer",
          name: "Energy Exchange",
          description: chapter.offering,
          seller: {
            "@type": "Organization",
            name: "Pahari Yatri",
            url: siteMetadata.siteUrl,
          },
        }
      : undefined,
    provider: {
      "@type": "Organization",
      name: "Pahari Yatri",
      url: siteMetadata.siteUrl,
    },
    location: chapter.location
      ? {
          "@type": "Place",
          name: chapter.location,
          address: {
            "@type": "PostalAddress",
            addressRegion: "Himachal Pradesh",
            addressCountry: "IN",
          },
        }
      : undefined,
    keywords: (chapter.themes || []).join(", "),
  };

  // FAQPage schema — wins AI answer boxes & Google "People also ask"
  const faqs = (chapter.faqs || []).filter(
    (f: any) => f?.question && f?.answer
  );
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f: any) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  // Resolve related stories for internal linking (SEO) + cross-discovery
  const relatedStories = (
    await Promise.all(
      (chapter.relatedStories || []).map(async (s: any) => {
        const storySlug = typeof s === "string" ? s : null;
        if (!storySlug) return null;
        const story = await reader.collections.stories.read(storySlug);
        return story
          ? {
              slug: storySlug,
              title: story.title,
              excerpt: story.excerpt,
              image: resolveImage(story.image),
              link: `/stories/${storySlug}`,
            }
          : null;
      })
    )
  ).filter(Boolean);

  // Strip the raw `image` from the spread so only the resolved (verified)
  // path is serialized to the client.
  const { image: _rawImage, ...chapterRest } = chapter;
  const journeyData = {
    ...chapterRest,
    image: resolveImage(chapter.image),
    relatedStories,
  };
  const ldArray = faqJsonLd ? [jsonLd, faqJsonLd] : [jsonLd];

  return { chapter, journeyData, ldArray };
}

/** Metadata for a chapter detail page. `canonicalPath` lets the books route
 *  point back to the canonical `/chapters/[slug]` URL. */
export async function buildChapterMetadata(
  slug: string,
  canonicalPath: string = chapterCanonical(slug)
): Promise<Metadata> {
  const chapter = await reader.collections.chapters.read(slug);
  if (!chapter) return {};

  const title = chapter.location
    ? `${chapter.title} — Himalayan Trek in ${chapter.location}`
    : `${chapter.title} — Himalayan Trek`;
  const description = chapter.excerpt || chapter.invitation || "";
  const ogImage = chapterOgImage(chapter);

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
