import { getAllBooks } from "@/lib/keystatic/getLibraryData";
import BooksClientPage from "./client-page";

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
