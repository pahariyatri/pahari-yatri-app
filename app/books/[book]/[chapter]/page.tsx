import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import JourneyPageClient from "@/app/chapters/[...slug]/client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page({ params }: any) {
  const paramsData = await params;
  const bookParam = Array.isArray(paramsData?.book) ? paramsData.book[0] : paramsData?.book;
  const chapterParam = Array.isArray(paramsData?.chapter) ? paramsData.chapter[0] : paramsData?.chapter;
  const bookSlug = decodeURIComponent(bookParam || "");
  const chapterSlug = decodeURIComponent(chapterParam || "");

  if (!bookSlug || !chapterSlug) notFound();

  const book = await reader.collections.books.read(bookSlug);
  if (!book) notFound();

  const allowed = (book.relatedChapters || []).includes(chapterSlug);
  if (!allowed) notFound();

  const chapter = await reader.collections.chapters.read(chapterSlug);
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
  const bookSlugs = await reader.collections.books.list();
  const params: { book: string; chapter: string }[] = [];
  for (const b of bookSlugs) {
    const book = await reader.collections.books.read(b);
    const chapters = (book?.relatedChapters || []).filter(
      (c): c is string => typeof c === "string"
    );
    for (const c of chapters) {
      params.push({ book: b, chapter: c });
    }
  }
  return params;
}