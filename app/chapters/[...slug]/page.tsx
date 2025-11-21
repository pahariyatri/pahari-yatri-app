import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import JourneyPageClient from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const chapter = await reader.collections.chapters.read(slug);
  if (!chapter) notFound();

  const journeyData = {
    title: chapter.title,
    excerpt: chapter.excerpt,
    image: chapter.image,
    location: chapter.location,
  };

  return <JourneyPageClient journey={journeyData} />;
}

export async function generateStaticParams() {
  const slugs = await reader.collections.chapters.list();
  return slugs.map((slug: string) => ({ slug: [slug] }));
}
