import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import BookPageClient from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const allBooks = await reader.collections.books.all();
  const bookEntry = allBooks.find((b) => b.slug === slug)?.entry;

  if (!bookEntry) return {};

  return {
    title: bookEntry.title,
    description: bookEntry.excerpt,
    openGraph: {
      title: bookEntry.title,
      description: bookEntry.excerpt,
      images: [bookEntry.coverImage || "/static/images/placeholder.jpg"],
      type: "book",
    },
  };
}

export default async function Page({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

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
    (bookData.relatedChapters || [])
      .filter((s: string | null): s is string => typeof s === "string")
      .map(async (slug: string) => {
        const chapter = await reader.collections.chapters.read(slug);
        return chapter
          ? {
            slug,
            title: chapter.title,
            description: chapter.excerpt,
            coverImage: chapter.image,
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

