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

/** Prefer the chapter's real photograph for social previews; fall back to the
 *  generated text card only when no photo exists. */
export function chapterOgImage(chapter: any) {
  const photo = resolveImage(chapter.image);
  if (photo && !photo.includes("mountains-bg")) {
    return `${siteMetadata.siteUrl}${photo}`;
  }
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
    // The overview no longer renders as a page section (chapters read as
    // stories), so its descriptive text lives on here for search engines.
    description:
      (chapter as any).overview || chapter.excerpt || chapter.invitation || "",
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

  // Resolve sideways cross-links to other genuinely related chapters (the
  // "2–4 sideways links" the schema already promises via relatedChapters —
  // this is what actually builds a topical cluster instead of leaving
  // chapters as book-order-only dead ends).
  const relatedChapters = (
    await Promise.all(
      (chapter.relatedChapters || []).map(async (c: any) => {
        const chapterSlug = typeof c === "string" ? c : null;
        if (!chapterSlug || chapterSlug === slug) return null;
        const rc = await reader.collections.chapters.read(chapterSlug);
        return rc
          ? {
              slug: chapterSlug,
              title: rc.title,
              excerpt: rc.excerpt || rc.invitation || "",
              location: rc.location || "",
              image: resolveImage(rc.image),
              link: `/chapters/${chapterSlug}`,
            }
          : null;
      })
    )
  ).filter(Boolean);

  // The book this chapter belongs to — a quiet backlink that keeps readers
  // inside the library — plus the next chapter in reading order, the open
  // loop that turns chapters into episodes rather than dead ends.
  let parentBook: { slug: string; title: string } | null = null;
  let nextChapter: { slug: string; title: string; excerpt: string; image: string } | null = null;
  try {
    const books = await reader.collections.books.all();
    const owner = books.find((b) =>
      ((b.entry.relatedChapters as any[]) || []).includes(slug)
    );
    if (owner) {
      parentBook = { slug: owner.slug, title: owner.entry.title || owner.slug };
      const order = ((owner.entry.relatedChapters as any[]) || []).filter(Boolean);
      const idx = order.indexOf(slug);
      const nextSlug = idx >= 0 && order.length > 1 ? order[(idx + 1) % order.length] : null;
      if (nextSlug) {
        const nc = await reader.collections.chapters.read(nextSlug);
        if (nc)
          nextChapter = {
            slug: nextSlug,
            title: nc.title || nextSlug,
            excerpt: nc.excerpt || "",
            image: resolveImage(nc.image),
          };
      }
    }
  } catch {}

  // Strip the raw `image` from the spread so only the resolved (verified)
  // path is serialized to the client.
  const { image: _rawImage, ...chapterRest } = chapter;
  const journeyData = {
    ...chapterRest,
    image: resolveImage(chapter.image),
    relatedStories,
    relatedChapters,
    parentBook,
    nextChapter,
  };
  const ldArray = faqJsonLd ? [jsonLd, faqJsonLd] : [jsonLd];

  return { chapter, journeyData, ldArray };
}

/** First paragraph of a multi-paragraph field, trimmed near `max` chars for
 *  a SERP-shaped meta description instead of the poetic `excerpt`. Prefers
 *  cutting at the end of a whole sentence — several `overview` fields hedge
 *  a devta/temple claim ("local belief holds...") in the sentence right
 *  after the fact that fits the char budget, and a raw word-boundary cut
 *  was landing mid-claim, before the hedge, which reads as an unqualified
 *  assertion in the search snippet. */
function firstParagraphTruncated(text: string, max: number): string {
  const first = (text || "").split(/\n{2,}/)[0].replace(/\s+/g, " ").trim();
  if (!first || first.length <= max) return first;
  const window = first.slice(0, max + 40); // allow a bit of overrun to find a sentence end
  const sentenceEnd = window.slice(0, max).match(/^.*[.!?](?=\s|$)/);
  if (sentenceEnd && sentenceEnd[0].length > max * 0.5) {
    return sentenceEnd[0].trim();
  }
  const cut = first.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

/** Metadata for a chapter detail page. `canonicalPath` lets the books route
 *  point back to the canonical `/chapters/[slug]` URL.
 *
 *  Prefers the per-chapter `seoTitle`/`metaDescription` overrides when a
 *  chapter sets them. Otherwise falls back to a `trackType`-aware template:
 *  temple chapters get pilgrimage framing, reflection ("cultural") chapters
 *  don't falsely claim to be a trek, and any title that already contains
 *  "Trek" isn't doubled up ("... Trek — Himalayan Trek in ..."). */
export async function buildChapterMetadata(
  slug: string,
  canonicalPath: string = chapterCanonical(slug)
): Promise<Metadata> {
  const chapter = await reader.collections.chapters.read(slug);
  if (!chapter) return {};

  const location = chapter.location || "";
  const locationNamesHimachal = /himachal/i.test(location);
  const rawTitle = chapter.title || "";
  const seoTitleOverride = ((chapter as any).seoTitle || "").trim();

  // Note: the root layout's metadata already applies `%s | Pahari Yatri` to
  // whatever string `title` resolves to here, so this builds the page-name
  // half only — appending the brand again would double it.
  let title: string;
  if (seoTitleOverride) {
    title = seoTitleOverride;
  } else {
    const trackType = (chapter as any).trackType || "trail";
    const alreadyNamesTrek = /trek/i.test(rawTitle);
    if (trackType === "temple") {
      title = location
        ? `${rawTitle} — Temple & Pilgrimage in ${location}${locationNamesHimachal ? "" : ", Himachal"}`
        : `${rawTitle} — Temple & Pilgrimage, Himachal`;
    } else if (
      (trackType === "trail" || trackType === "pass") &&
      !alreadyNamesTrek
    ) {
      title = location
        ? `${rawTitle} — Himalayan Trek in ${location}`
        : `${rawTitle} — Himalayan Trek`;
    } else {
      // lake / village / town / cultural (reflection pieces), or a title
      // that already names itself a Trek — don't repeat "Trek" or assert
      // one where no trek is described.
      title =
        location && !locationNamesHimachal
          ? `${rawTitle} — ${location}, Himachal Pradesh`
          : location
            ? `${rawTitle} — ${location}`
            : rawTitle;
    }
  }

  const metaDescriptionOverride = ((chapter as any).metaDescription || "").trim();
  const description =
    metaDescriptionOverride ||
    firstParagraphTruncated((chapter as any).overview || "", 155) ||
    chapter.excerpt ||
    chapter.invitation ||
    "";
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
