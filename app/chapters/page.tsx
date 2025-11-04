import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import ChaptersClientPage from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Chapters() {
  const journeyData = await reader.collections.packages.all();

  const chapters = journeyData.map((j) => ({
    title: j.entry.title || "Untitled Journey",
    description: j.entry.excerpt || "A path into the Himalayas.",
    imageSrc: j.entry.image || "/static/images/journey-banner.jpg",
    href: `/chapters/${j.slug}`,
  }));

  return (
    <ChaptersClientPage chapters={chapters} />
  );
}
