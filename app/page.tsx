import HeroBanner from "@/components/HeroBanner";

import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import FinalCTA from "@/components/FinalCTA";
import HiddenTrails from "@/components/HiddenTrails";
import LegendsAndCulture from "@/components/LegendsAndCulture";
import ManifestoSection from "@/components/Manifesto";
import BookCardLayout from "@/components/BookCardLayout";
import FilmsSection from "@/components/FilmsSection";

import { getVideoObjectSchema } from "@/lib/schema";
import siteMetadata from "@/data/siteMetadata";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const heroBanner = await reader.singletons.banners.readOrThrow();
  const videoSchema = heroBanner ? getVideoObjectSchema(heroBanner, siteMetadata.siteUrl) : null;

  return (
    <div className="min-h-screen">
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}
      <div data-rag-chunk="true" className="hidden">
        <h1>{heroBanner.title}</h1>
        <p>{heroBanner.description}</p>
        <p>Pahari Yatri offers transformative Himalayan journeys, focusing on spiritual discovery and authentic trekking experiences in Uttarakhand, India.</p>
      </div>
      {/* <ScarcityStrip /> */}
      {heroBanner && (
        <HeroBanner
          title={heroBanner.title}
          description={heroBanner.description}
          buttonText={"Open the Library"}
          buttonLink="/library"
          secondaryText={"Become a Yatri"}
          secondaryLink="/apply"
          media={heroBanner.media || "/static/videos/default-banner.mp4"}
        />
      )}
      {/* ✨ Content Section BELOW the video */}
      {/* <div className="rounded-t-3xl shadow-lg">
        <div className="max-w-4xl mx-auto px-2 py-4 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold font-brandSerif mb-8 text-white animate-fade-in-up">
            Be a Yatri
          </h1>
        </div>
      </div> */}
      <BookCardLayout />
      <LegendsAndCulture />

      <HiddenTrails id="hidden-trails" />
      <FilmsSection />
      {/* <ManifestoSection /> */}

      <FinalCTA />
      {/* <ProgressRail sections={['hero-banner', 'manifesto', 'legends-culture', 'yatri-way', 'insights']} /> */}
    </div>
  );
}
