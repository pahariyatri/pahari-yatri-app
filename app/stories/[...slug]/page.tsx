import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { resolveImage } from "@/lib/images";
import BlogPageClient from "./client-page";
import siteMetadata from "@/data/siteMetadata";
import { markdownToHtml, demoteHeadings } from "@/lib/markdown";

const reader = createReader(process.cwd(), keystaticConfig);

/** Real publish/modified dates from the content file on disk (flat .mdx or
 *  folder entry), instead of claiming "today" on every build. */
function storyDates(slug: string): { published: string; modified: string } {
  const candidates = [
    path.join(process.cwd(), "data/stories", `${slug}.mdx`),
    path.join(process.cwd(), "data/stories", slug, "index.yaml"),
  ];
  for (const p of candidates) {
    try {
      const st = fs.statSync(p);
      return {
        published: (st.birthtime ?? st.mtime).toISOString(),
        modified: st.mtime.toISOString(),
      };
    } catch {}
  }
  const now = new Date().toISOString();
  return { published: now, modified: now };
}

async function readStoryContent(story: any): Promise<string> {
  try {
    if (typeof story.content === "function") {
      const raw = await story.content();
      return typeof raw === "string" ? raw : String(raw ?? "");
    }
  } catch {}
  return "";
}

export async function generateMetadata({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const story = await reader.collections.stories.read(slug);
  if (!story) return {};

  const image = resolveImage(story.image);

  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/stories/${slug}` },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [
        { url: `${siteMetadata.siteUrl}${image}`, width: 1200, height: 630 },
      ],
      type: "article",
    },
  };
}

export default async function Page({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const story = await reader.collections.stories.read(slug);
  if (!story) notFound();

  const rawContent = await readStoryContent(story);
  const contentHtml = rawContent ? demoteHeadings(markdownToHtml(rawContent)) : "";

  // Resolve the related chapter (for reading context + onward link)
  let chapter: { slug: string; title: string } | null = null;
  if (story.relatedChapter) {
    try {
      const ch = await reader.collections.chapters.read(story.relatedChapter);
      if (ch) chapter = { slug: story.relatedChapter, title: ch.title || story.relatedChapter };
    } catch {}
  }

  // Suggest the next story deterministically (alphabetical neighbour), so the
  // static build is stable and readers can walk the whole archive in order.
  const allSlugs = (await reader.collections.stories.list()).sort();
  const idx = allSlugs.indexOf(slug);
  const nextSlug = allSlugs.length > 1 ? allSlugs[(idx + 1) % allSlugs.length] : null;
  let nextStory: { slug: string; title: string; excerpt: string; image: string } | null = null;
  if (nextSlug) {
    const ns = await reader.collections.stories.read(nextSlug);
    if (ns) nextStory = { slug: nextSlug, title: ns.title || nextSlug, excerpt: ns.excerpt || "", image: resolveImage(ns.image) };
  }

  const words = (contentHtml.replace(/<[^>]+>/g, " ").match(/\S+/g) || []).length;
  const minutes = Math.max(2, Math.round(words / 200));
  const dates = storyDates(slug);
  const image = resolveImage(story.image);

  const data = {
    title: story.title || "",
    excerpt: story.excerpt || "",
    image,
    slug,
    contentHtml,
    quote: story.quote || "",
    voice: (story as any).voice || "",
    chapter,
    nextStory,
    minutes,
    publishedAt: dates.published,
  };

  const storyUrl = `${siteMetadata.siteUrl}/stories/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': storyUrl,
    headline: story.title,
    description: story.excerpt,
    image: { '@type': 'ImageObject', url: `${siteMetadata.siteUrl}${image}` },
    url: storyUrl,
    datePublished: dates.published,
    dateModified: dates.modified,
    author: { '@type': 'Organization', name: 'Pahari Yatri', url: siteMetadata.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'Pahari Yatri',
      url: siteMetadata.siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteMetadata.siteUrl}/static/images/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': storyUrl },
    articleSection: 'Himalayan Stories',
    wordCount: words,
    ...(story.quote ? { citation: story.quote } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPageClient blog={data} />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.stories.list();
  return slugs.map((slug: string) => ({ slug: [slug] }));
}
