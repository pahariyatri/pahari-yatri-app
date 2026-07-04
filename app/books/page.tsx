import type { Metadata } from "next";
import { getAllBooks } from "@/lib/keystatic/getLibraryData";
import BooksClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Seasonal Trail Journals of the Himalayas | Himachal Pradesh",
  description:
    "Browse Pahari Yatri's seasonal editions across the Himalayas: monsoon, summer, winter, and lost-trail journeys in Himachal Pradesh. Find your next chapter by season and theme.",
  alternates: { canonical: "/books" },
};

export default async function Books() {
  const raw = await getAllBooks();
  const books = raw.map((b) => ({
    title: b.title,
    description: b.excerpt,
    coverImage: b.coverImage,
    href: b.link,
    chapterCount: Array.isArray(b.relatedChapters)
      ? b.relatedChapters.filter(Boolean).length
      : undefined,
  }));
  return <BooksClientPage books={books} />;
}
