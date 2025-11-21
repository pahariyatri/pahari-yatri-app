import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import ChaptersClientPage from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Chapters() {
  const chapterData = await reader.collections.chapters.all();

  const chapters = chapterData.map((c) => ({
    title: c.entry.title || "Untitled Chapter",
    description: c.entry.excerpt || "A path into the Himalayas.",
    imageSrc: c.entry.image || "/static/images/journey-banner.jpg",
    href: `/chapters/${c.slug}`,
  }));

  return <ChaptersClientPage chapters={chapters} />;
}
