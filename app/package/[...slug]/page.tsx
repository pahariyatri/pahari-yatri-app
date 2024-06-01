import SectionContainer from "@/components/common/SectionContainer";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import siteMetadata from "@/data/siteMetadata";
import { Metadata } from "next";
import ReviewCard from "@/components/cards/ReviewCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";

const packageDetails = {
  title: 'Cultural Tours',
  description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
  href: '/packages/cultural-tours',
  imageSrc: '/static/favicons/android-chrome-512x512.png',
  price: '$999',
  duration: '7 Days',
  location: 'Himalayas',
  difficulty: 'Hard',
  itinerary: [
    { day: 1, activity: 'Arrival and welcome dinner', details: 'Arrive at the designated meeting point and enjoy a warm welcome dinner with your fellow travelers.' },
    { day: 2, activity: 'City tour and museum visit', details: 'Explore the vibrant city streets and visit renowned museums to delve deeper into the local history and culture.' },
    { day: 3, activity: 'Visit to historical monuments', details: 'Discover ancient landmarks and monuments that narrate captivating tales of the region\'s past.' },
    { day: 4, activity: 'Cultural show and local market visit', details: 'Cultural show and local market visit. Witness mesmerizing cultural performances and immerse yourself in the bustling atmosphere of local markets.' },
    { day: 5, activity: 'Hiking and nature walk', details: 'Embark on an exhilarating hike through scenic trails and immerse yourself in the natural beauty of the Himalayas.' },
    { day: 6, activity: 'Free day for leisure activities', details: 'Enjoy a day at your leisure to explore the surroundings or engage in optional activities of your choice.' },
    { day: 7, activity: 'Departure', details: 'Bid farewell to the Himalayas as you depart for your onward journey with unforgettable memories.' },
  ],
  inclusions: [
    'Accommodation in 3-star hotels',
    'Daily breakfast and dinner',
    'Entrance fees to attractions',
    'Local guide and transportation',
  ],
  exclusions: [
    'International airfare',
    'Lunch',
    'Personal expenses',
    'Travel insurance',
  ],
  reviews: [
    {
      name: 'John Doe',
      rating: 5,
      comment: 'An amazing experience! Highly recommended.',
    },
    {
      name: 'Jane Smith',
      rating: 4,
      comment: 'Great tour with a fantastic guide.',
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));

  return {
    title: packageDetails.title,
    description: packageDetails.description,
    openGraph: {
      title: packageDetails.title,
      description: packageDetails.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date().toISOString(),
      url: `${siteMetadata.siteUrl}/package/${slug}`,
      images: [
        {
          url: packageDetails.imageSrc.includes('http') ? packageDetails.imageSrc : siteMetadata.siteUrl + packageDetails.imageSrc,
          alt: packageDetails.title,
        },
      ],
      authors: [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: packageDetails.title,
      description: packageDetails.description,
      images: [packageDetails.imageSrc],
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'));
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
        "url": packageDetails.imageSrc.includes('http') ? packageDetails.imageSrc : siteMetadata.siteUrl + packageDetails.imageSrc,
        "width": 800,
        "height": 400,
      },
    ],
    "offers": {
      "@type": "Offer",
      "price": packageDetails.price.replace('$', ''),
      "priceCurrency": "USD",
      "url": `https://pahariyatri.com${packageDetails.href}`
    },
    "itinerary": packageDetails.itinerary.map(item => ({
      "@type": "TouristTrip",
      "name": `Day ${item.day}: ${item.activity}`
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
    "description": packageDetails.description,
  };
  return (
    <SectionContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 py-11 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative w-full h-96">
            <Image
              src={packageDetails.imageSrc}
              alt={packageDetails.title}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full" />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{packageDetails.title}</h2>
              <p className="mt-4 text-gray-600 dark:text-slate-400">{packageDetails.description}</p>
              <ul className="mt-6 space-y-4">
                <li className="text-gray-900 dark:text-white"><strong>Price:</strong> {packageDetails.price}</li>
                <li className="text-gray-900 dark:text-white"><strong>Duration:</strong> {packageDetails.duration}</li>
                <li className="text-gray-900 dark:text-white"><strong>Location:</strong> {packageDetails.location}</li>
                <li className="text-gray-900 dark:text-white"><strong>Difficulty:</strong> {packageDetails.difficulty}</li>
              </ul>
            </div>
            <div className="mt-6">
              <Booking></Booking>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Itinerary</h3>
          <Accordion type="multiple" className="w-full">
            {packageDetails.itinerary.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger> Day {item.day}: {item.activity}</AccordionTrigger>
                <AccordionContent>
                  {item.details}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">Gallery</h3>
          <Gallery></Gallery>
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
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reviews</h3>
          <div className="space-y-6">
            {packageDetails.reviews.map((review, index) => (
              <ReviewCard key={index} name={review.name} comment={review.comment} rating={review.rating}></ReviewCard>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
