import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
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
      images: [story.image || "/static/images/placeholder.jpg"],
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
    image: story.image || "/static/images/placeholder.jpg",
    slug,
    contentHtml: contentStr,
  };

  const chapter = story.relatedChapter ? await reader.collections.chapters.read(story.relatedChapter) : null;
  const jsonLd = getBlogPostingSchema({ ...story, slug }, chapter, siteMetadata.siteUrl);

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
