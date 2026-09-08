import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import BookCarousel from "@/components/BookCarousel";
import { genPageMetadata } from "@/app/seo";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { getAllBooks } from "@/lib/keystatic/books";
import {
  Feather,
  Leaf,
  Landmark,
  Sparkles,
  Users,
  PenLine,
  ScrollText,
  Film,
  ArrowRight,
} from "lucide-react";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata() {
  return genPageMetadata({
    title: "The Library",
    description:
      "The digital Himalayan library of seasonal trail journals, stories, temples, folklore, and responsible mountain travel. Learn the Himalayas before you walk them.",
    alternates: { canonical: "/library" },
  });
}

export default async function LibraryPage() {
  const [allBooks, chapters, stories] = await Promise.all([
    getAllBooks(),
    reader.collections.chapters.list(),
    reader.collections.stories.list(),
  ]);
  const books = allBooks.filter((b) => b.published);

  // Grouped like sections of a reading room rather than one flat grid — each
  // group gets its own shelf line beneath it.
  const shelfGroups = [
    {
      label: "Voices from the trail",
      items: [
        {
          href: "/stories",
          icon: Feather,
          title: "Stories from the Mountains",
          count: `${stories.length} stories`,
          desc: "Traveller reflections, village memories, and quiet moments from the trail.",
        },
        {
          href: "/journal",
          icon: ScrollText,
          title: "The Journal",
          count: "Essays & reflections",
          desc: "Longer writing on slow travel, seasons, and the philosophy of walking well.",
        },
      ],
    },
    {
      label: "Culture & belief",
      items: [
        {
          href: "/temples",
          icon: Landmark,
          title: "Temples & Traditions",
          count: "Cultural archive",
          desc: "The deities, fairs, and living beliefs that give the Himalayas their sacred grammar.",
        },
        {
          href: "/folklore",
          icon: Sparkles,
          title: "Folklore",
          count: "Myths & legends",
          desc: "The stories the mountains tell about themselves, passed down village to village.",
        },
      ],
    },
    {
      label: "Practice & community",
      items: [
        {
          href: "/responsible-travel",
          icon: Leaf,
          title: "Responsible Travel",
          count: "The Yatri Code",
          desc: "How to walk softly, respecting people, temples, forests, and the weather of the mountains.",
        },
        {
          href: "/films",
          icon: Film,
          title: "Films & Reels",
          count: "Watch the mountains",
          desc: "Short films and reels of the light, weather, temples, and quiet of the Himalayas.",
        },
        {
          href: "/community",
          icon: Users,
          title: "The Community",
          count: "Become a Yatri",
          desc: "A slow, intentional circle of people learning to travel the Himalayas with respect.",
        },
        {
          href: "/contribute",
          icon: PenLine,
          title: "Contribute a Story",
          count: "Add your voice",
          desc: "Walked a trail, met a village, heard a legend? Your story can become a chapter.",
        },
      ],
    },
  ];

  return (
    <div>
      <PageHero
        kicker="A digital Himalayan library"
        title="Everything the mountains have to teach, in one place."
        subtitle="Read slowly. Every trail here is a chapter, every season a book. The mountains are in no hurry, and neither are we."
        image="/static/images/pages/library.jpg"
      />

      {/* The featured shelf — real book covers standing side by side, so the
          page reads as an actual library shelf before it reads as a site
          directory. Same component and physical-book treatment as the
          homepage, for one consistent Pahari Yatri "shelf" everywhere. */}
      <SectionContainer className="pt-16 sm:pt-24 pb-4 sm:pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.06] via-background to-background -z-10" />
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            The seasonal editions
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-brandSerif font-medium leading-tight">
            Begin with a season.
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {books.length} books, {chapters.length} chapters between them.
            Summer, Monsoon, Winter, and the Lost Trails — each a curated
            yatra, read one chapter at a time.
          </p>
        </div>
        <BookCarousel books={books} />
      </SectionContainer>

      {/* The rest of the reading room, grouped like shelves rather than one
          undifferentiated grid */}
      <SectionContainer className="pt-4 sm:pt-8 pb-16 sm:pb-24">
        <div className="max-w-2xl mb-14">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            The rest of the room
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-brandSerif font-medium leading-tight">
            Where else would you like to begin?
          </h2>
        </div>

        {shelfGroups.map((group) => (
          <div key={group.label} className="mb-14 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-muted-foreground/70 whitespace-nowrap">
                {group.label}
              </span>
              <span className="h-px flex-1 bg-border/50" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {group.items.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg"
                >
                  <s.icon className="w-6 h-6 text-primary mb-5" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                    {s.count}
                  </span>
                  <h3 className="text-xl font-brandSerif font-medium mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {s.desc}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Open
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            {/* The shelf ledge — marks the end of this section like the edge
                of a shelf, without pretending every card sits flush on it
                (grids reflow across breakpoints, a literal merge wouldn't).
                A dark shadow reads on a light background; on this site's
                near-black default it would vanish, so dark mode gets a
                faint light catch-line instead — like light along a shelf
                edge rather than a shadow under one. */}
            <div className="mt-2 h-px rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="h-2 bg-gradient-to-b from-black/[0.07] to-transparent dark:from-white/[0.06]" />
          </div>
        ))}
      </SectionContainer>
    </div>
  );
}
