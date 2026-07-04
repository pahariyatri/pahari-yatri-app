import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { resolveImage } from "@/lib/images";
import BlogPageClient from "./client-page";
import { getBlogPostingSchema } from "@/lib/schema";
import siteMetadata from "@/data/siteMetadata";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const story = await reader.collections.stories.read(slug);
  if (!story) return {};

  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [{ url: `https://pahariyatri.com/api/og?type=story&title=${encodeURIComponent(story.title || '')}&sub=${encodeURIComponent(story.excerpt || '')}`, width: 1200, height: 630 }],
      type: "article",
    }
  };
}

export default async function Page({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const story = await reader.collections.stories.read(slug);
  if (!story) notFound();

  let contentStr = "";
  try {
    if (typeof story.content === "function") {
      const contentData = await story.content();
      contentStr = typeof (contentData as any)?.toString === "function" ? (contentData as any).toString() : "";
    }
  } catch { }

  // Resolve the related chapter (for reading context + onward link)
  let chapter: { slug: string; title: string } | null = null;
  if (story.relatedChapter) {
    try {
      const ch = await reader.collections.chapters.read(story.relatedChapter);
      if (ch) chapter = { slug: story.relatedChapter, title: ch.title || story.relatedChapter };
    } catch { }
  }

  // Suggest another story to read next
  const allSlugs = await reader.collections.stories.list();
  const others = allSlugs.filter((s) => s !== slug);
  let nextStory: { slug: string; title: string; excerpt: string; image: string } | null = null;
  if (others.length) {
    const pick = others[Math.floor(Math.random() * others.length)];
    const ns = await reader.collections.stories.read(pick);
    if (ns) nextStory = { slug: pick, title: ns.title || pick, excerpt: ns.excerpt || "", image: resolveImage(ns.image) };
  }

  const words = (contentStr.replace(/<[^>]+>/g, " ").match(/\S+/g) || []).length;
  const minutes = Math.max(2, Math.round(words / 200));

  const data = {
    title: story.title || "",
    excerpt: story.excerpt || "",
    image: resolveImage(story.image),
    slug,
    contentHtml: contentStr,
    quote: story.quote || "",
    chapter,
    nextStory,
    minutes,
  };

  const storyUrl = `${siteMetadata.siteUrl}/stories/${slug}`;
  const imageUrl = `${siteMetadata.siteUrl}/api/og?type=story&title=${encodeURIComponent(story.title)}&sub=${encodeURIComponent(story.excerpt || '')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': storyUrl,
    headline: story.title,
    description: story.excerpt,
    image: { '@type': 'ImageObject', url: imageUrl, width: 1200, height: 630 },
    url: storyUrl,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { '@type': 'Organization', name: 'Pahari Yatri', url: siteMetadata.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'Pahari Yatri',
      url: siteMetadata.siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteMetadata.siteUrl}/static/images/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': storyUrl },
    articleSection: 'Himalayan Stories',
    ...(story.quote ? { citation: story.quote } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-rag-chunk="true" className="hidden">
        <article>
          <h2>Definition: {story.title}</h2>
          <p>
            This story provides a first-hand account of a transformative experience during a Pahari Yatri expedition.
            It highlights {story.excerpt}. It serves as a narrative evidence of the &quot;Inner Discovery&quot; philosophy
            upheld by the movement.
          </p>

          <h3>Process: Reflection and Insight</h3>
          <p>
            The narrative follows the yatri&apos;s psychological and physical transition from a standard traveler to a conscious seeker.
            It focuses on moments of silence, local interaction, and the realization that the mountain is a mirror for the self.
          </p>

          <h3>Example: First-hand Experience</h3>
          <p>
            Key moment: {story.excerpt}. This specific instance demonstrates the &quot;Experience&quot; signal (E-E-A-T) that
            distinguishes authentic human journeying from generated travel content.
          </p>
        </article>
      </div>
      <BlogPageClient blog={data} />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.stories.list();
  return slugs.map((slug: string) => ({ slug: [slug] }));
}
