import SectionContainer from "@/components/common/SectionContainer";
import Image from "@/components/common/Image";
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Booking from "@/components/Booking";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join("/"));
  const seo = await reader.singletons.seo.read();
  const settings = await reader.singletons.settings.read();
  const getPackageDetails = (await reader.collections.packages.all()).find((pkg => pkg.slug == slug))?.entry;

  if (!getPackageDetails) return undefined;

  return {
    title: getPackageDetails?.title,
    description: getPackageDetails?.excerpt,
    openGraph: {
      title: getPackageDetails?.title,
      description: getPackageDetails?.excerpt,
      siteName: settings?.headerTitle || 'Pahari Yatri',
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date().toISOString(),
      url: `${settings?.domain}/package/${slug}`,
      images: [
        {
          url: getPackageDetails?.image || `https://pahari-yatri-app.vercel.app/api/og?title='Pahari Yatri`,
          alt: getPackageDetails?.title,
        },
      ],
      authors: [seo?.author || "Pahari Yatri"],
    },
    twitter: {
      card: 'summary_large_image',
      title: getPackageDetails?.title,
      description: getPackageDetails?.excerpt,
      images: [getPackageDetails?.image || ""],
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  const seo = await reader.singletons.seo.read();
  const settings = await reader.singletons.settings.read();
  const getPackageDetails = await (await reader.collections.packages.all()).find((pkg => pkg.slug == slug))?.entry;

  if (!getPackageDetails) {
    return <div>Package not found</div>;
  }

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${settings?.domain}/package/${slug}`,
    },
    "headline": getPackageDetails?.title,
    "image": [
      {
        "@type": "ImageObject",
        "url": getPackageDetails?.image.includes('http') ? getPackageDetails?.image : settings?.domain + getPackageDetails?.image,
        "width": 800,
        "height": 400,
      },
    ],
    "offers": {
      "@type": "Offer",
      "price": getPackageDetails?.price ? getPackageDetails.price : null,
      "priceCurrency": "INR",
      "url": `${settings?.domain}/package/${slug}`,
    },
    "itinerary": getPackageDetails?.itinerary.map(item => ({
      "@type": "TouristTrip",
      "name": `Day ${item.day}: ${item.title}`,
    })),
    "touristType": "Adventurous travelers",
    "location": {
      "@type": "Place",
      "name": getPackageDetails?.location,
    },
    "tripDuration": {
      "@type": "Duration",
      "name": getPackageDetails?.duration,
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
    "description": getPackageDetails?.excerpt,
  };

  return (
    <SectionContainer>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-11 sm:px-6 lg:px-8 lg:py-10">
        {/* Package Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative w-full h-96">
            <Image
              src={getPackageDetails.image}
              alt={getPackageDetails.title}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{getPackageDetails.title}</h2>
              <p className="mt-4 text-gray-600 dark:text-slate-400">{getPackageDetails.excerpt}</p>
              <ul className="mt-6 space-y-4">
                <li className="text-gray-900 dark:text-white">
                  <strong>Price:</strong> {getPackageDetails.price} INR
                </li>
                <li className="text-gray-900 dark:text-white">
                  <strong>Duration:</strong> {getPackageDetails.duration} Days
                </li>
                <li className="text-gray-900 dark:text-white">
                  <strong>Location:</strong> {getPackageDetails.location}
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Booking />
            </div>
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Itinerary</h3>
          <Accordion type="multiple" className="w-full">
            {getPackageDetails.itinerary.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>Day {item.day}: {item.title}</AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionContainer>
  );
}
