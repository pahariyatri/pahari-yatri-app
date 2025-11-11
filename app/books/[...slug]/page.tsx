import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import BookPageClient from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page({ params }: any) {
  const { slug } = params;

  const allBooks = await reader.collections.books.all();
  const bookEntry = allBooks.find((b) => b.slug === slug)?.entry;

  if (!bookEntry) notFound();

  const bookData = {
    title: bookEntry.title,
    excerpt: bookEntry.excerpt,
    invitation: bookEntry.invitation,
    coverImage: bookEntry.coverImage,
    relatedChapters: bookEntry.relatedChapters || [],
  };

  // Fetch full chapters
  const chapters = await Promise.all(
    (bookData.relatedChapters || []).map(async (slug: string) => {
      const chapter = await reader.collections.chapters.read(slug);
      return chapter
        ? {
            slug,
            title: chapter.title,
            description: chapter.description,
            coverImage: chapter.coverImage,
          }
        : null;
    })
  );

  return <BookPageClient book={bookData} chapters={chapters.filter(Boolean)} />;
}

export async function generateStaticParams() {
  const slugs = await reader.collections.books.list();
  return slugs.map((slug: string) => ({ slug: [slug] })); // 👈 fix: wrap in array
}

