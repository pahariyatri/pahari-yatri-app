import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import siteMetadata from "@/data/siteMetadata";
import { resolveImage } from "@/lib/images";
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
    // Unpublished books stay reachable (a chapter's parent-book link must
    // never 404) but shouldn't be indexed or surfaced until the founder
    // marks them published.
    robots: bookEntry.published ? undefined : { index: false, follow: true },
    openGraph: {
      title: bookEntry.title,
      description: bookEntry.excerpt,
      images: [{ url: `https://pahariyatri.com/api/og?type=book&title=${encodeURIComponent(bookEntry.title)}&sub=${encodeURIComponent(bookEntry.invitation || bookEntry.excerpt || '')}`, width: 1200, height: 630 }],
      type: "website",
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
    year: bookEntry.year || null,
    excerpt: bookEntry.excerpt,
    invitation: bookEntry.invitation,
    coverImage: resolveImage(bookEntry.coverImage),
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
            location: chapter.location || "",
            coverImage: resolveImage(chapter.image),
          }
          : null;
      })
  );

  const resolvedChapters = chapters.filter(Boolean) as NonNullable<
    (typeof chapters)[number]
  >[];

  // CollectionPage, not Book — this page collects other pages, it isn't
  // itself a purchasable/downloadable literary work (which is what
  // schema.org's own Book type implies: isbn, bookFormat, etc.). Chapters
  // already carry their own TouristTrip/FAQPage schema; this just needed to
  // exist at all, since a book page previously emitted none.
  const siteUrl = siteMetadata.siteUrl;
  const bookUrl = `${siteUrl}/books/${slug}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${bookUrl}#book`,
      url: bookUrl,
      name: bookEntry.title,
      description: bookEntry.excerpt,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website` },
      publisher: { "@id": `${siteUrl}/#organization` },
      hasPart: resolvedChapters.map((c) => ({
        "@type": "WebPage",
        name: c.title,
        url: `${siteUrl}/chapters/${c.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Pahari Yatri", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Library", item: `${siteUrl}/library` },
        { "@type": "ListItem", position: 3, name: bookEntry.title, item: bookUrl },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <BookPageClient book={bookData} chapters={resolvedChapters} />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.books.list();
  return slugs.map((slug: string) => ({ slug: [slug] })); // 👈 fix: wrap in array
}

