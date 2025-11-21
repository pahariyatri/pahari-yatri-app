import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import BlogPageClient from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

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
  } catch {}

  const data = {
    title: story.title || "",
    excerpt: story.excerpt || "",
    image: story.image || "/static/images/stories/placeholder.jpg",
    slug,
    contentHtml: contentStr,
  };

  return <BlogPageClient blog={data} />;
}

export async function generateStaticParams() {
  const slugs = await reader.collections.stories.list();
  return slugs.map((slug: string) => ({ slug: [slug] }));
}
