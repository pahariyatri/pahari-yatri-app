import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { resolveImage } from "@/lib/images";
import BlogPageClient from "./client-page";

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

  const data = {
    title: story.title || "",
    excerpt: story.excerpt || "",
    image: resolveImage(story.image),
    slug,
    contentHtml: contentStr,
  };

  const storyUrl = `https://pahariyatri.com/stories/${slug}`;
  const imageUrl = `https://pahariyatri.com/api/og?type=story&title=${encodeURIComponent(story.title)}&sub=${encodeURIComponent(story.excerpt || '')}`;

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
    author: {
      '@type': 'Organization',
      name: 'Pahari Yatri',
      url: 'https://pahariyatri.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pahari Yatri',
      url: 'https://pahariyatri.com',
      logo: { '@type': 'ImageObject', url: 'https://pahariyatri.com/static/images/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': storyUrl },
    articleSection: 'Himalayan Stories',
    keywords: 'Himalayan trek, spiritual journey, Himachal Pradesh, Pahari Yatri, mountain story',
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
