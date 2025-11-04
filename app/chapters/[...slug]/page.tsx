import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import JourneyPageClient from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page({ params }: any) {
  // Next 15 internal types may pass slug differently
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const allJourneys = await reader.collections.packages.all();
  const journey = allJourneys.find((p) => p.slug === slug)?.entry;

  if (!journey) notFound();
  
  const journeyData = {
    title: journey.title,
    excerpt: journey.excerpt,
    image: journey.image,
    duration: journey.duration,
    itinerary: journey.itinerary || []
  };

  return <JourneyPageClient journey={journeyData} />;
}

export async function generateStaticParams() {
  const slugs = await reader.collections.packages.list();
  return slugs.map((slug: string) => ({ slug: [slug] }));
}
