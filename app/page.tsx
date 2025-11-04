import HeroBanner from "@/components/HeroBanner";

import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import FinalCTA from "@/components/FinalCTA";
import HiddenTrails from "@/components/HiddenTrails";
import LegendsAndCulture from "@/components/LegendsAndCulture";
import ManifestoSection from "@/components/Manifesto";
import TitleCover from "@/components/common/TitleCover";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const heroBanner = await reader.singletons.banners.readOrThrow();


  return (
    <div className="min-h-screen">
      {/* <ScarcityStrip /> */}
      {heroBanner && (
        <HeroBanner
          title={heroBanner.title}
          description={heroBanner.description}
          buttonText={ "Start Your Yatra"}
          media={heroBanner.media || "/static/videos/default-banner.mp4"}
        />
      )}
      {/* ✨ Content Section BELOW the video */}
      <div className="rounded-t-3xl shadow-lg">
        <div className="max-w-4xl mx-auto px-2 py-4 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold font-brandSerif mb-8 text-white animate-fade-in-up">
            Be a Yatri
          </h1>
        </div>
      </div>
      <ManifestoSection />
      <HiddenTrails id="hidden-trails" />
      <LegendsAndCulture />
      <FinalCTA />
      {/* <ProgressRail sections={['hero-banner', 'manifesto', 'legends-culture', 'yatri-way', 'insights']} /> */}
    </div>
  );
}
