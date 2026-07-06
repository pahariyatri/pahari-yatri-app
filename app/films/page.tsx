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

        {/* Instagram setup helper (only visible in development) */}
        {process.env.NODE_ENV === "development" && !instagramReels && (
          <div className="mt-16 p-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 max-w-2xl mx-auto">
            <h3 className="font-brandSerif text-lg font-medium text-foreground mb-2 flex items-center gap-2">
              <Instagram className="h-5 w-5 text-primary" />
              Direct Instagram API Setup
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              To directly integrate with your @pahariyatri Instagram account and pull real-time reels (with direct play support), follow these steps:
            </p>
            <div className="bg-background/80 rounded-xl p-4 text-xs font-mono border border-border/40 space-y-2">
              <p className="text-primary font-semibold"># Setup guide:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground">
                <li>Convert @pahariyatri to a Professional/Creator account in Instagram settings.</li>
                <li>Go to developers.facebook.com, create a Business app, and set up Instagram Login.</li>
                <li>Generate a long-lived access token for the account.</li>
                <li>Add it to your <code>.env.local</code>: <code>INSTAGRAM_ACCESS_TOKEN=your_token_here</code></li>
              </ol>
            </div>
            <p className="mt-4 text-xs text-muted-foreground/80">
              * The system currently renders Keystatic fallback films since no token is defined. Direct video uploads are supported natively in Keystatic!
            </p>
          </div>
        )}

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
