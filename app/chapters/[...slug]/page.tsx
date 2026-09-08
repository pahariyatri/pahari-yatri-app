import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import JourneyPageClient from "./client-page";
import { getChapterView, buildChapterMetadata } from "@/lib/keystatic/chapterView";
import type { Metadata } from "next";

const reader = createReader(process.cwd(), keystaticConfig);

function slugFrom(paramsData: any): string {
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  return decodeURIComponent(slugArr.join("/"));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = slugFrom(await params);
  return buildChapterMetadata(slug);
}

export default async function Page({ params }: any) {
  const slug = slugFrom(await params);
  const view = await getChapterView(slug);
  if (!view) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(view.ldArray) }}
      />
      <JourneyPageClient journey={view.journeyData} slug={slug} />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.chapters.list();
  return slugs.map((slug: string) => ({ slug: [slug] }));
}
