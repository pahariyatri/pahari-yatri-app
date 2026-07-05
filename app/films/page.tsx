import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import ReelCard, { type Film } from "@/components/ReelCard";
import { Button } from "@/components/ui/button";
import { genPageMetadata } from "@/app/seo";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import siteMetadata from "@/data/siteMetadata";
import { Instagram, Youtube } from "lucide-react";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata() {
  return genPageMetadata({
    title: "Films & Reels from the Himalayas",
    description:
      "Short films and reels from Pahari Yatri: the light, weather, temples, and quiet moments of the Himalayas. Watch the mountains move.",
    alternates: { canonical: "/films" },
  });
}

export default async function FilmsPage() {
  const slugs = await reader.collections.films.list();
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
    .sort((a: any, b: any) => a.order - b.order) as (Film & { order: number })[];

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

        {films.length > 0 ? (
          <>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {films.map((film) => (
                <ReelCard key={film.slug} film={film} />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-xl mx-auto text-center py-16">
            <h2 className="text-2xl font-brandSerif font-medium mb-4">
              The first films are being cut.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Reels from the trail arrive soon. In the meantime, follow the
              journey on{" "}
              <Link
                href="https://www.instagram.com/pahariyatri/"
                className="text-primary underline-offset-4 hover:underline"
              >
                Instagram
              </Link>
              .
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/contribute"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Filmed something in the mountains? Share it with us →
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
