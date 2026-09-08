import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

const reader = createReader(process.cwd(), keystaticConfig);

/**
 * A story's book is DERIVED, never stored.
 *
 *   story.relatedChapter → chapter.parentBook → book
 *
 * Storing `relatedBook` on the story would let it drift out of sync with the
 * chapter it belongs to: move a chapter into a different book and every story
 * underneath it would silently keep pointing at the old one. Deriving it means
 * there is exactly one place that decides which book a story lives in — the
 * chapter — so the hierarchy can be reorganised without touching stories.
 *
 * Returns null when the chain is incomplete (story with no chapter, or a
 * chapter that has not been assigned a parent book yet). Callers should treat
 * null as "not placed in a book yet", not as an error — most existing stories
 * are in exactly that state and that is expected during the migration.
 */
export type DerivedBook = {
  slug: string;
  title: string;
  bookType: string;
  link: string;
};

export async function getBookForChapter(
  chapterSlug: string | null | undefined
): Promise<DerivedBook | null> {
  if (!chapterSlug) return null;

  const chapter = await reader.collections.chapters.read(chapterSlug);
  const bookSlug = chapter?.parentBook;
  if (!bookSlug) return null;

  const book = await reader.collections.books.read(bookSlug);
  if (!book) return null;

  return {
    slug: bookSlug,
    title: book.title || "Untitled Edition",
    bookType: book.bookType || "seasonal",
    link: `/books/${bookSlug}`,
  };
}

/** Derive the book for a single story slug. */
export async function getBookForStory(
  storySlug: string
): Promise<DerivedBook | null> {
  const story = await reader.collections.stories.read(storySlug);
  if (!story) return null;
  return getBookForChapter(story.relatedChapter);
}

/**
 * Derive books for many stories at once, reading each chapter and book only
 * once no matter how many stories share them. A chapter with twelve stories
 * under it should cost one chapter read, not twelve.
 */
export async function getBooksForStories(
  storySlugs: readonly string[]
): Promise<Record<string, DerivedBook | null>> {
  const stories = await Promise.all(
    storySlugs.map(async (slug) => ({
      slug,
      entry: await reader.collections.stories.read(slug),
    }))
  );

  const chapterSlugs = Array.from(
    new Set(
      stories
        .map((s) => s.entry?.relatedChapter)
        .filter((c): c is string => Boolean(c))
    )
  );

  const chapterToBook = new Map<string, DerivedBook | null>();
  await Promise.all(
    chapterSlugs.map(async (c) => {
      chapterToBook.set(c, await getBookForChapter(c));
    })
  );

  const result: Record<string, DerivedBook | null> = {};
  for (const { slug, entry } of stories) {
    const chapterSlug = entry?.relatedChapter;
    result[slug] = chapterSlug
      ? chapterToBook.get(chapterSlug) ?? null
      : null;
  }
  return result;
}
