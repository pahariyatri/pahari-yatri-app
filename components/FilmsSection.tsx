import Link from "@/components/common/Link";
import SectionContainer from "@/components/common/SectionContainer";
import ReelCard from "@/components/ReelCard";
import { Button } from "@/components/ui/button";
import { getFilms, splitByFormat } from "@/lib/keystatic/films";
import siteMetadata from "@/data/siteMetadata";
import { Instagram, Youtube } from "lucide-react";

export default async function FilmsSection() {
  const all = await getFilms();
  if (!all.length) return null;

  // One consistent format per row keeps the grid from breaking: prefer a
  // full row of reels; fall back to videos if that's all we have.
  const { reels, videos } = splitByFormat(all);
  const films = (reels.length >= 3 ? reels : reels.length ? reels : videos).slice(0, 3);
  const isReelRow = reels.length > 0;

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              Films &amp; Reels
            </span>
            <h2 className="text-3xl md:text-5xl font-brandSerif font-medium text-foreground leading-tight">
              Watch the mountains move.
            </h2>
          </div>
          <Link href="/films" className="shrink-0">
            <Button variant="outline" className="rounded-full px-6">
              Watch all films
            </Button>
          </Link>
        </div>

        <div
          className={
            isReelRow
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
              : "grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          }
        >
          {films.map((film) => (
            <ReelCard key={film.slug} film={film} />
          ))}
        </div>

        {/* Direct channels — new films land here first */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={siteMetadata.instagram}>
            <Button className="rounded-full px-6 gap-2">
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </Button>
          </Link>
          <Link href={siteMetadata.youtube}>
            <Button variant="outline" className="rounded-full px-6 gap-2">
              <Youtube className="h-4 w-4" />
              Watch on YouTube
            </Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
