import type { Metadata } from "next";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import ChaptersClientPage from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

// Without this the page inherited the root layout's title and description, making
// /chapters a verbatim metadata duplicate of the homepage — the only one on the site.
export const metadata: Metadata = {
  title: "All Chapters | Himalayan Trails, Temples and Villages",
  description:
    "Every chapter in the Pahari Yatri library — sacred lakes, devta temples, shepherd routes and village trails across Himachal Pradesh, written to be understood before you walk them.",
  alternates: { canonical: "/chapters" },
};

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
