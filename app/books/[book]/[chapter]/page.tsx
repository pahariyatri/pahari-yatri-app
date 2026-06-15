import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import JourneyPageClient from "@/app/chapters/[...slug]/client-page";
import {
  getChapterView,
  buildChapterMetadata,
  chapterCanonical,
} from "@/lib/keystatic/chapterView";
import type { Metadata } from "next";

const reader = createReader(process.cwd(), keystaticConfig);

async function resolve(paramsData: any) {
  const bookParam = Array.isArray(paramsData?.book)
    ? paramsData.book[0]
    : paramsData?.book;
  const chapterParam = Array.isArray(paramsData?.chapter)
    ? paramsData.chapter[0]
    : paramsData?.chapter;
  const bookSlug = decodeURIComponent(bookParam || "");
  const chapterSlug = decodeURIComponent(chapterParam || "");
  if (!bookSlug || !chapterSlug) return null;

  const book = await reader.collections.books.read(bookSlug);
  if (!book) return null;

  // Only allow chapters that actually belong to this book.
  const allowed = (book.relatedChapters || []).includes(chapterSlug);
  if (!allowed) return null;

  return { bookSlug, chapterSlug };
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const r = await resolve(await params);
  if (!r) return {};
  // Canonical points to the chapter's home URL to avoid duplicate content.
  return buildChapterMetadata(r.chapterSlug, chapterCanonical(r.chapterSlug));
}

export default async function Page({ params }: any) {
  const r = await resolve(await params);
  if (!r) notFound();

  const view = await getChapterView(r.chapterSlug);
  if (!view) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(view.ldArray) }}
      />
      <JourneyPageClient journey={view.journeyData} />
    </>
  );
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
