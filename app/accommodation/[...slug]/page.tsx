import SectionContainer from "@/components/common/SectionContainer";
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Booking from "@/components/Booking";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Link from "@/components/common/Link";
import Gallery from "@/components/Gallery";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join("/"));
  const seo = await reader.singletons.seo.read();
  const settings = await reader.singletons.settings.read();
  const accommodationDetails = (await reader.collections.accommodations.all()).find((acc) => acc.slug === slug)?.entry;

  if (!accommodationDetails) return undefined;

  return {
    title: accommodationDetails?.name,
    description: accommodationDetails?.description,
    openGraph: {
      title: accommodationDetails?.name,
      description: accommodationDetails?.description,
      siteName: settings?.headerTitle || "Pahari Yatri",
      locale: "en_US",
      type: "article",
      url: `${settings?.domain}/accommodation/${slug}`,
      images: [
        {
          url: accommodationDetails?.image || `https://pahari-yatri-app.vercel.app/api/og?title=Pahari Yatri`,
          alt: accommodationDetails?.name,
        },
      ],
      authors: [seo?.author || "Pahari Yatri"],
    },
    twitter: {
      card: "summary_large_image",
      title: accommodationDetails?.name,
      description: accommodationDetails?.description,
      images: [accommodationDetails?.image || ""],
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  const seo = await reader.singletons.seo.read();
  const settings = await reader.singletons.settings.read();
  const accommodationDetails = (await reader.collections.accommodations.all()).find((acc) => acc.slug === slug)?.entry;

  if (!accommodationDetails) {
    return <div>Accommodation not found</div>;
  }

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": accommodationDetails?.name,
    "image": [
      {
        "@type": "ImageObject",
        "url": accommodationDetails?.image.includes("http") ? accommodationDetails?.image : settings?.domain + accommodationDetails?.image,
        "width": 800,
        "height": 400,
      },
    ],
    "address": {
      "@type": "PostalAddress",
      // "streetAddress": accommodationDetails?.address || "",
      "addressLocality": accommodationDetails?.location || "",
      "addressRegion": "Himachal Pradesh",
      "addressCountry": "IN",
    },
    // "priceRange": `INR ${accommodationDetails?.price || "Varies"}`,
    "starRating": {
      "@type": "Rating",
      // "ratingValue": accommodationDetails?.rating || "4",
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": seo?.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": seo?.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${settings?.domain}/static/logo.png`,
        "width": 600,
        "height": 60,
      },
    },
    "description": accommodationDetails?.description,
  };

  return (
    <SectionContainer>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="block">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/accommodation" className="block">
              Accommodations
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{accommodationDetails.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-11 sm:px-6 lg:px-8 lg:py-10">
        {/* Accommodation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Gallery images={accommodationDetails.gallery || []} />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{accommodationDetails.name}</h2>
              <p className="mt-4 text-gray-600 dark:text-slate-400">{accommodationDetails.description}</p>
              <ul className="mt-6 space-y-4">
                <li><strong>Address:</strong> {accommodationDetails.address.street}, {accommodationDetails.address.city}</li>
                <li><strong>Capacity:</strong> {accommodationDetails.capacity || "N/A"}</li>
                <li><strong>Amenities:</strong> {accommodationDetails.amenities?.join(", ") || "N/A"}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nearby Attractions</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {accommodationDetails.attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg p-4 flex justify-center">
        <Booking packageName={accommodationDetails.name} />
      </div>
    </SectionContainer >
  );
}

// Generate static params with slug as an array
export async function generateStaticParams() {
  const slugs = await reader.collections.accommodations.list();

  return slugs.map((slug: any) => ({
    slug: [slug],
  }));
}
