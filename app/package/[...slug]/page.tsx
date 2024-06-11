import SectionContainer from "@/components/common/SectionContainer";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import siteMetadata from "@/data/siteMetadata";
import { Metadata } from "next";
import ReviewCard from "@/components/cards/ReviewCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const packageDetails = await reader.collections.packages.read(slug);

  if (!packageDetails) {
    return undefined;
  }

  const { title, excerpt, image } = packageDetails;

  const imageUrl = image.includes('http') ? image : `${siteMetadata.siteUrl}${image}`;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date().toISOString(),
      url: `${siteMetadata.siteUrl}/package/${slug}`,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
      authors: [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'));
  const packageDetails = await reader.collections.packages.read(slug);

  if (!packageDetails) {
    return undefined;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteMetadata.siteUrl}/blog/${slug}`,
    },
    "headline": packageDetails.title,
    "image": [
      {
        "@type": "ImageObject",
        "url": packageDetails.image.includes('http') ? packageDetails.image : `${siteMetadata.siteUrl}${packageDetails.image}`,
        "width": 800,
        "height": 400,
      },
    ],
    "offers": {
      "@type": "Offer",
      "price": packageDetails.price || null,
      "priceCurrency": "INR",
      "url": `${siteMetadata.siteUrl}/package/${slug}`
    },
    "itinerary": packageDetails.itinerary.map(item => ({
      "@type": "TouristTrip",
      "name": `Day ${item.day}: ${item.title}`
    })),
    "touristType": "Adventurous travelers",
    "inclusion": packageDetails.inclusions,
    "exclusion": packageDetails.exclusions,
    "location": {
      "@type": "Place",
      "name": packageDetails.location
    },
    "tripDuration": {
      "@type": "Duration",
      "name": packageDetails.duration
    },
    "difficulty": packageDetails.difficulty,
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": siteMetadata.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteMetadata.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteMetadata.siteUrl}/static/logo.png`,
        "width": 600,
        "height": 60,
      },
    },
    "description": packageDetails.excerpt,
  };

  return (
    <SectionContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-11 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative w-full h-96">
            <Image
              src={packageDetails.image}
              alt={packageDetails.title}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{packageDetails.title}</h2>
              <p className="mt-4 text-gray-600 dark:text-slate-400">{packageDetails.excerpt}</p>
              <ul className="mt-6 space-y-4">
                <li className="text-gray-900 dark:text-white"><strong>Price:</strong> {packageDetails.price}</li>
                <li className="text-gray-900 dark:text-white"><strong>Duration:</strong> {packageDetails.duration}</li>
                <li className="text-gray-900 dark:text-white"><strong>Location:</strong> {packageDetails.location}</li>
                <li className="text-gray-900 dark:text-white"><strong>Difficulty:</strong> {packageDetails.difficulty}</li>
              </ul>
            </div>
            <div className="mt-6">
              <Booking />
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Itinerary</h3>
          <Accordion type="multiple" className="w-full">
            {packageDetails.itinerary.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger> Day {item.day}: {item.title}</AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Inclusions</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-900 dark:text-white">
              {packageDetails.inclusions.map((inclusion, index) => (
                <li key={index}>{inclusion}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Exclusions</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-900 dark:text-white">
              {packageDetails.exclusions.map((exclusion, index) => (
                <li key={index}>{exclusion}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">Gallery</h3>
          <Gallery />
        </div>
        {/* <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reviews</h3>
          <div className="space-y-6">
            {packageDetails.reviews.map((review, index) => (
              <ReviewCard key={index} name={review.name} comment={review.comment} rating={review.rating} />
            ))}
          </div>
        </div> */}
      </div>
    </SectionContainer>
  );
}
