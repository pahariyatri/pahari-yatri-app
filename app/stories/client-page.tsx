'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from '@/components/common/Image';
import { ArrowRight, BookOpen, Clock, MapPin, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BookLink = { slug: string; title: string; href: string };
export type StoryBook = BookLink & { excerpt: string; imageSrc: string; storySlugs: string[] };
export type StoryCard = {
  slug: string;
  title: string;
  description: string;
  quote: string;
  imageSrc: string;
  href: string;
  voice: string;
  place: string;
  minutes: number | null;
  books: BookLink[];
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function StoryMeta({ story, className }: { story: StoryCard; className?: string }) {
  if (!story.place && !story.minutes) return null;
  return (
    <p className={cn('flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground', className)}>
      {story.place && (
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {story.place}
        </span>
      )}
      {story.minutes && (
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {story.minutes} min read
        </span>
      )}
    </p>
  );
}

/** The whole card is one link (stretched over the title); the book link sits
 *  above it with its own z-index so it stays separately clickable. */
function StoryCardItem({ story, showBook = true }: { story: StoryCard; showBook?: boolean }) {
  const book = story.books[0];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={story.imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {showBook && book && (
          <Link
            href={book.href}
            className={cn(
              'relative z-10 mb-3 inline-flex items-center gap-1.5 self-start text-[11px] font-bold uppercase tracking-[0.16em] text-primary hover:underline underline-offset-4',
              focusRing
            )}
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {book.title}
          </Link>
        )}
        <h3 className="font-brandSerif text-xl sm:text-2xl font-medium leading-snug text-foreground">
          <Link
            href={story.href}
            className={cn('after:absolute after:inset-0 after:content-[""] group-hover:text-primary transition-colors', focusRing)}
          >
            {story.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{story.description}</p>
        {story.voice && (
          <p className="mt-3 text-xs italic text-muted-foreground/80 line-clamp-1">{story.voice}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <StoryMeta story={story} />
          <ArrowRight
            className="h-4 w-4 shrink-0 text-primary motion-safe:transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}

function StoryGrid({ stories, showBook = true }: { stories: StoryCard[]; showBook?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StoryCardItem key={story.slug} story={story} showBook={showBook} />
      ))}
    </div>
  );
}

export default function StoriesClientPage({ stories, books }: { stories: StoryCard[]; books: StoryBook[] }) {
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState('all');

  // Lead with a story that has its own photo (several borrow a chapter's
  // image), a pull quote, and a book — it shows the page's whole idea
  // (story → book) in one block.
  const ownImage = (s: StoryCard) => s.imageSrc.includes('/images/stories/');
  const featured =
    stories.find((s) => ownImage(s) && s.quote && s.books.length > 0) ??
    stories.find((s) => s.quote && s.books.length > 0) ??
    stories[0];

  // Biggest shelf first.
  const shelfBooks = books
    .map((book) => ({ book, count: stories.filter((s) => s.books[0]?.slug === book.slug).length }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .map(({ book }) => book);
  const browsing = selectedBook === 'all' && !query.trim();

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return stories.filter(
      (story) =>
        (selectedBook === 'all' || story.books.some((b) => b.slug === selectedBook)) &&
        (!q ||
          [story.title, story.description, story.voice, story.place, ...story.books.map((b) => b.title)]
            .join(' ')
            .toLocaleLowerCase()
            .includes(q))
    );
  }, [stories, selectedBook, query]);

  const selectedBookData = books.find((b) => b.slug === selectedBook);
  const looseStories = stories.filter((s) => s.books.length === 0);

  const clear = () => {
    setQuery('');
    setSelectedBook('all');
  };

  return (
    <div className="bg-background text-foreground">
      <header className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <Link href="/library" className={cn('hover:text-primary', focusRing)}>
            Library
          </Link>
          <span aria-hidden="true" className="mx-2 opacity-50">/</span>
          <span aria-current="page" className="text-foreground">Stories</span>
        </nav>
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <span className="mb-4 block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Stories from the trail
            </span>
            <h1 className="font-brandSerif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08]">
              Every chapter has a story <span className="italic text-primary">behind it.</span>
            </h1>
          </div>
          <p className="max-w-md text-base sm:text-lg font-light leading-relaxed text-muted-foreground">
            Short, first-person pieces set in the places our books walk through. Each takes a few minutes to read.
            Then follow it into its book.
          </p>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          {stories.length} stories · {shelfBooks.length} {shelfBooks.length === 1 ? 'book' : 'books'}
        </p>
      </header>

      {featured && (
        <section aria-labelledby="featured-story" className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <div className="group relative grid overflow-hidden rounded-3xl border border-border/60 bg-card md:grid-cols-[1.15fr_1fr]">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px] bg-muted">
              <Image
                src={featured.imageSrc}
                alt=""
                fill
                priority
                sizes="(min-width: 1152px) 600px, (min-width: 768px) 55vw, 100vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                Start here
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              {featured.books[0] && (
                <Link
                  href={featured.books[0].href}
                  className={cn(
                    'relative z-10 mb-4 inline-flex items-center gap-1.5 self-start text-xs font-bold uppercase tracking-[0.16em] text-primary hover:underline underline-offset-4',
                    focusRing
                  )}
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  From {featured.books[0].title}
                </Link>
              )}
              <h2 id="featured-story" className="font-brandSerif text-3xl sm:text-4xl font-medium leading-tight">
                <Link
                  href={featured.href}
                  className={cn('after:absolute after:inset-0 after:content-[""] group-hover:text-primary transition-colors', focusRing)}
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{featured.description}</p>
              {featured.quote && (
                <blockquote className="mt-6 border-l-2 border-primary/60 pl-4 font-brandSerif text-lg italic leading-relaxed text-foreground/90">
                  “{featured.quote}”
                </blockquote>
              )}
              <StoryMeta story={featured} className="mt-6" />
              <span className="mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">
                Read the story
                <ArrowRight className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </div>
        </section>
      )}

      <section
        id="stories"
        aria-labelledby="stories-heading"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 sm:px-6 pb-20"
      >
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="stories-heading" className="font-brandSerif text-3xl sm:text-4xl font-medium">
            Find your next story
          </h2>
          <div className="relative w-full sm:w-80">
            <label htmlFor="story-search" className="sr-only">
              Search stories
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="story-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a place, title or voice…"
              className={cn(
                'h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm placeholder:text-muted-foreground/70',
                focusRing
              )}
            />
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter stories by book"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[{ slug: 'all', title: 'All stories', count: stories.length }, ...shelfBooks.map((b) => ({
            slug: b.slug,
            title: b.title,
            count: stories.filter((s) => s.books.some((sb) => sb.slug === b.slug)).length,
          }))].map((chip) => {
            const active = selectedBook === chip.slug;
            return (
              <button
                key={chip.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedBook(chip.slug)}
                className={cn(
                  'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary hover:text-primary',
                  focusRing
                )}
              >
                {chip.title}
                <span className={cn('text-xs', active ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>

        <p role="status" className="sr-only">
          {browsing ? '' : `${filtered.length} ${filtered.length === 1 ? 'story' : 'stories'} found`}
        </p>

        {browsing ? (
          // Default view: one shelf per book, so every story is read in the
          // context of the book it belongs to.
          <div className="mt-10 space-y-16">
            {shelfBooks.map((book) => {
              // The featured story stays on its shelf, so shelf counts match
              // the filter chips.
              const shelf = stories.filter((s) => s.books[0]?.slug === book.slug);
              if (!shelf.length) return null;
              return (
                <section key={book.slug} aria-labelledby={`shelf-${book.slug}`}>
                  <div className="mb-6 flex flex-col gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded-r-md border-l-4 border-primary/60 shadow-md">
                        <Image src={book.imageSrc} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                          From the book · {shelf.length} {shelf.length === 1 ? 'story' : 'stories'}
                        </p>
                        <h3 id={`shelf-${book.slug}`} className="font-brandSerif text-2xl sm:text-3xl font-medium">
                          {book.title}
                        </h3>
                      </div>
                    </div>
                    <Link
                      href={book.href}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-primary hover:underline underline-offset-4 sm:self-auto',
                        focusRing
                      )}
                    >
                      Open the book
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <StoryGrid stories={shelf} showBook={false} />
                </section>
              );
            })}

            {looseStories.length > 0 && (
              <section aria-labelledby="shelf-more">
                <div className="mb-6 border-t border-border/60 pt-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                    Beyond the books · {looseStories.length} {looseStories.length === 1 ? 'story' : 'stories'}
                  </p>
                  <h3 id="shelf-more" className="font-brandSerif text-2xl sm:text-3xl font-medium">
                    More from the trail
                  </h3>
                </div>
                <StoryGrid stories={looseStories} showBook={false} />
              </section>
            )}
          </div>
        ) : (
          <div className="mt-8">
            {selectedBookData && (
              <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{selectedBookData.excerpt}</p>
                <Link
                  href={selectedBookData.href}
                  className={cn(
                    'inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4',
                    focusRing
                  )}
                >
                  Open {selectedBookData.title}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}
            {filtered.length > 0 ? (
              <>
                <p className="mb-6 text-sm text-muted-foreground" aria-hidden="true">
                  {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
                </p>
                <StoryGrid stories={filtered} showBook={selectedBook === 'all'} />
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border py-16 text-center">
                <BookOpen className="mx-auto mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="font-brandSerif text-2xl">No stories match that yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try a place name like Kasol, Kinnaur or Churdhar.</p>
                <button
                  type="button"
                  onClick={clear}
                  className={cn(
                    'mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground',
                    focusRing
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {books.length > 0 && (
        <section aria-labelledby="bookshelf" className="border-t border-border/60 bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Keep reading
                </span>
                <h2 id="bookshelf" className="font-brandSerif text-3xl sm:text-4xl font-medium">
                  A story is only the beginning.
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
                  The books hold the full chapters: the route, the history and the etiquette behind each place.
                </p>
              </div>
              <Link
                href="/library"
                className={cn('inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary', focusRing)}
              >
                Visit the library
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Link
                  key={book.slug}
                  href={book.href}
                  className={cn(
                    'group flex items-start gap-5 rounded-2xl border border-border/60 bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-primary/5',
                    focusRing
                  )}
                >
                  <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-r-md border-l-4 border-primary/60 shadow-md">
                    <Image src={book.imageSrc} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-brandSerif text-xl font-medium group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{book.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                      Open book
                      <ArrowRight className="h-3.5 w-3.5 motion-safe:transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
