import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import FilmsList from "@/components/FilmsList";
import { getInstagramReels } from "@/lib/instagram";
import { getFilms } from "@/lib/keystatic/films";
import { Button } from "@/components/ui/button";
import { genPageMetadata } from "@/app/seo";
import siteMetadata from "@/data/siteMetadata";
import { Instagram, Youtube } from "lucide-react";

export async function generateMetadata() {
  return genPageMetadata({
    title: "Films & Reels from the Himalayas",
    description:
      "Short films and reels from Pahari Yatri: the light, weather, temples, and quiet moments of the Himalayas. Watch the mountains move.",
    alternates: { canonical: "/films" },
  });
}

export default async function FilmsPage() {
  // Live reels pulled straight from the connected Instagram account
  // (only when INSTAGRAM_ACCESS_TOKEN is configured — see docs/instagram-integration.md)
  const instagramReels = await getInstagramReels(6);
  const films = await getFilms();

  return (
    <div>
      <PageHero
        kicker="Films & Reels"
        title="Watch the mountains move."
        subtitle="Short films and reels from the trail: the light, the weather, the temples, and the quiet moments that photos cannot hold."
        image="/static/images/pages/films.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        {/* Direct channels — always visible, films or not */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 rounded-2xl border border-border/50 bg-muted/20 p-6 sm:p-8">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light max-w-xl text-center sm:text-left">
            New films land on our channels first. Follow along for reels from
            the trail every season.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link href={siteMetadata.instagram}>
              <Button className="rounded-full px-6 gap-2">
                <Instagram className="h-4 w-4" />
                @pahariyatri
              </Button>
            </Link>
            <Link href={siteMetadata.youtube}>
              <Button variant="outline" className="rounded-full px-6 gap-2">
                <Youtube className="h-4 w-4" />
                YouTube
              </Button>
            </Link>
          </div>
        </div>

        {/* Dynamic Filterable Film List */}
        <FilmsList initialFilms={films} instagramReels={instagramReels} />

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Filmed something in the mountains? Share it with us →
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
