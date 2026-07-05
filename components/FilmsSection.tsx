import Link from "@/components/common/Link";
import SectionContainer from "@/components/common/SectionContainer";
import ReelCard, { type Film } from "@/components/ReelCard";
import { Button } from "@/components/ui/button";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import siteMetadata from "@/data/siteMetadata";
import { Instagram, Youtube } from "lucide-react";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function FilmsSection() {
  const slugs = await reader.collections.films.list();
  if (!slugs.length) return null;

  const films = (
    await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections.films.read(slug);
        if (!entry) return null;
        return {
          slug,
          title: entry.title || slug,
          platform: entry.platform || "instagram",
          url: entry.url || "",
          description: entry.description || "",
          region: entry.region || "",
          order: entry.order ?? 0,
        };
      })
    )
  )
    .filter(Boolean)
    .sort((a: any, b: any) => a.order - b.order)
    .slice(0, 3) as (Film & { order: number })[];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
