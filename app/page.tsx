import HeroBanner from "@/components/HeroBanner";

import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import FinalCTA from "@/components/FinalCTA";
import HiddenTrails from "@/components/HiddenTrails";
import LegendsAndCulture from "@/components/LegendsAndCulture";
import ManifestoSection from "@/components/Manifesto";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const heroBanner = await reader.singletons.banners.readOrThrow();
  const blogsData = await reader.collections.blogs.all();
  const packageData = await reader.collections.packages.all();


  const blogs = blogsData.map(blog => ({
    title: blog.entry.title,
    description: blog.entry.excerpt,
    href: `/blog/${blog.slug}`,
    imageSrc: blog.entry.image || "`https://pahariyatri.com/api/og?title='Pahari Yatri`",
    tags: [...blog.entry.tags]
  }));
  const packages = packageData.map(pkg => ({
    title: pkg.entry.title,
    description: pkg.entry.excerpt,
    imageSrc: pkg.entry.image,
    href: `/package/${pkg.slug}`,
    price: pkg.entry.price ?? 0,
    location: pkg.entry.location,
  }));
  const featuredPackages = packageData
    .filter(pkg => pkg.entry.isFeatured === true)
    .map(pkg => ({
      title: pkg.entry.title,
      description: pkg.entry.excerpt,
      imageSrc: pkg.entry.image,
      href: `/package/${pkg.slug}`,
      price: pkg.entry.price ?? 0,
      location: pkg.entry.location,
    }))

  return (
    <div className="min-h-screen">
      {/* <ScarcityStrip /> */}
      {heroBanner && (
        <HeroBanner
          title={heroBanner.title}
          description={heroBanner.description}
          buttonText={heroBanner.buttonText || "Start Your Yatra"}
          buttonLink={heroBanner.buttonLink}
          media={heroBanner.media} // MP4 file from Keystatic
        />
      )}
      <ManifestoSection />
      <HiddenTrails id="hidden-trails" />
      <LegendsAndCulture />
      <FinalCTA />
      {/* <ProgressRail sections={['hero-banner', 'manifesto', 'legends-culture', 'yatri-way', 'insights']} /> */}
    </div>
  );
}
