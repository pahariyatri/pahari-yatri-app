import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import { getAllBooks } from '@/lib/keystatic/books';
import { resolveImage } from '@/lib/images';
import { getAllChapters, getAllStories } from '@/lib/keystatic/getLibraryData';
import StoriesClientPage, { type StoryBook, type StoryCard } from './client-page';

const reader = createReader(process.cwd(), keystaticConfig);

// "Real Yatri journals" / "from Yatris who walked" overclaimed: most stories
// are written in a composite narrator voice, and their authorship
// classification is still a founder decision. Describe what the page holds.
export const metadata: Metadata = {
  title: 'Himalayan Stories from the Trails of Himachal',
  description:
    'First-person Himalayan stories tied to the places in our books: village memories, temple bells and quiet moments from Parashar, Kheerganga, Churdhar, Buran Ghati, Kasol and more.',
  alternates: { canonical: '/stories' },
};

/** ~200 wpm over the MDX body (frontmatter stripped), matching the story page. */
function readingMinutes(slug: string): number | null {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'data/stories', `${slug}.mdx`), 'utf8');
    const words = raw.replace(/^---[\s\S]*?---/, '').split(/\s+/).filter(Boolean).length;
    return Math.max(2, Math.round(words / 200)); // same floor as the story page
  } catch {
    return null;
  }
}

export default async function StoriesPage() {
  const [stories, chapters, allBooks, chapterEntries] = await Promise.all([
    getAllStories(),
    getAllChapters(),
    getAllBooks(),
    reader.collections.chapters.all(),
  ]);

  const chapterLocation = new Map(
    chapterEntries.map((c) => [c.slug, ((c.entry as any).location as string) || ''])
  );

  // A story belongs to a book when its own chapter is in that book, or when
  // a chapter in the book lists it as a related story.
  const books: StoryBook[] = allBooks
    .filter((book) => book.published)
    .map((book) => {
      const bookChapters = new Set(book.relatedChapters.filter(Boolean) as string[]);
      const viaChapters = chapters
        .filter((chapter) => bookChapters.has(chapter.slug))
        .flatMap((chapter) => chapter.relatedStories)
        .filter((slug): slug is string => typeof slug === 'string');
      const viaStory = stories
        .filter((story) => story.relatedChapter && bookChapters.has(story.relatedChapter))
        .map((story) => story.slug);
      return {
        slug: book.slug,
        title: book.title,
        excerpt: book.excerpt,
        href: book.link,
        imageSrc: resolveImage(book.coverImage),
        storySlugs: [...new Set([...viaStory, ...viaChapters])],
      };
    });

  const storyCards: StoryCard[] = stories.map((story) => ({
    slug: story.slug,
    title: story.title,
    description: story.excerpt,
    quote: story.quote,
    imageSrc: story.image,
    href: story.link,
    voice: story.voice,
    place: chapterLocation.get(story.relatedChapter) || '',
    minutes: readingMinutes(story.slug),
    books: books
      .filter((book) => book.storySlugs.includes(story.slug))
      .map(({ slug, title, href }) => ({ slug, title, href })),
  }));

  return <StoriesClientPage stories={storyCards} books={books} />;
}
