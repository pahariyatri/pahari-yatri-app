import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import { genPageMetadata } from "@/app/seo";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import {
  BookOpen,
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
  const [books, chapters, stories] = await Promise.all([
    reader.collections.books.list(),
    reader.collections.chapters.list(),
    reader.collections.stories.list(),
  ]);

  const shelves = [
    {
      href: "/books",
      icon: BookOpen,
      title: "Seasonal Editions",
      count: `${books.length} books · ${chapters.length} chapters`,
      desc: "Summer, Monsoon, Winter, and the Lost Trails. Each is a book of places, read as chapters.",
    },
    {
      href: "/stories",
      icon: Feather,
      title: "Stories from the Mountains",
      count: `${stories.length} stories`,
      desc: "Traveller reflections, village memories, and quiet moments from the trail.",
    },
    {
      href: "/responsible-travel",
      icon: Leaf,
      title: "Responsible Travel",
      count: "The Yatri Code",
      desc: "How to walk softly, respecting people, temples, forests, and the weather of the mountains.",
    },
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
    {
      href: "/journal",
      icon: ScrollText,
      title: "The Journal",
      count: "Essays & reflections",
      desc: "Longer writing on slow travel, seasons, and the philosophy of walking well.",
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
  ];

  return (
    <div>
      <PageHero
        kicker="A digital Himalayan library"
        title="Everything the mountains have to teach, in one place."
        subtitle="Read slowly. Every trail here is a chapter, every season a book. The mountains are in no hurry, and neither are we."
        image="/static/images/pages/library.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        <div className="max-w-2xl mb-14">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            The shelves
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-brandSerif font-medium leading-tight">
            Where would you like to begin?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shelves.map((s) => (
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
      </SectionContainer>
    </div>
  );
}
