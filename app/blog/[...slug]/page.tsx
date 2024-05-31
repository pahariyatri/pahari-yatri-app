import SectionContainer from "@/components/common/SectionContainer";
import Image from "@/components/common/Image";
import PageTitle from "@/components/common/TitleCover";
import siteMetadata from "@/data/siteMetadata";
import { Metadata } from "next";

const blogDetails = {
  title: 'Exploring the Himalayas: A Journey of a Lifetime',
  description: 'Join us as we venture into the heart of the Himalayas, exploring the stunning landscapes and rich cultural heritage of this majestic mountain range.',
  imageSrc: '/static/images/himalayas.jpg',
  author: 'John Doe',
  date: 'May 19, 2024',
  content: `
    <p>The Himalayas, home to the world’s highest peaks, offer a breathtaking experience for adventurers and nature enthusiasts alike. From the serene valleys to the rugged mountain trails, every step in this region reveals a new wonder.</p>
    <h2>Day 1: Arrival and Acclimatization</h2>
    <p>Our journey begins with a scenic flight into the heart of the Himalayas. Upon arrival, we spend the day acclimatizing to the altitude and exploring the local markets.</p>
    <h2>Day 2: Trek to the Base Camp</h2>
    <p>We start our trek towards the base camp, surrounded by towering peaks and pristine landscapes. The trail offers stunning views and a chance to experience the tranquility of the mountains.</p>
    <h2>Day 3: Cultural Immersion</h2>
    <p>Today, we visit a local village to learn about the rich cultural heritage of the Himalayan people. From traditional dances to local cuisine, we immerse ourselves in their way of life.</p>
    <h2>Conclusion</h2>
    <p>The Himalayas are not just a destination; they are an experience that leaves a lasting impact on all who visit. Join us on this unforgettable journey and create memories that will last a lifetime.</p>
  `,
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));

  return {
    title: blogDetails.title,
    description: blogDetails.description,
    openGraph: {
      title: blogDetails.title,
      description: blogDetails.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: blogDetails.date,
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      images: [
        {
          url: blogDetails.imageSrc.includes('http') ? blogDetails.imageSrc : siteMetadata.siteUrl + blogDetails.imageSrc,
          alt: blogDetails.title,
        },
      ],
      authors: [blogDetails.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blogDetails.title,
      description: blogDetails.description,
      images: [blogDetails.imageSrc],
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
    "headline": blogDetails.title,
    "image": [
      {
        "@type": "ImageObject",
        "url": blogDetails.imageSrc.includes('http') ? blogDetails.imageSrc : siteMetadata.siteUrl + blogDetails.imageSrc,
        "width": 800,
        "height": 400,
      },
    ],
    "datePublished": blogDetails.date,
    "dateModified": blogDetails.date,
    "author": {
      "@type": "Person",
      "name": blogDetails.author,
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
    "description": blogDetails.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionContainer>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center mb-12">
            <PageTitle>{blogDetails.title}</PageTitle>
            <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">{blogDetails.description}</p>
            <div className="mt-4 text-gray-500 dark:text-gray-400">
              <span>By {blogDetails.author} | {blogDetails.date}</span>
            </div>
          </div>
          <div className="relative w-full h-96 mb-12">
            <Image
              src={blogDetails.imageSrc}
              alt={blogDetails.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="prose prose-lg max-w-none dark:prose-dark">
            <div dangerouslySetInnerHTML={{ __html: blogDetails.content }} />
          </div>
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Example of related articles */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Trekking in the Andes</h4>
                <p className="text-gray-600 dark:text-slate-400 mt-2">Discover the beauty of the Andes mountains with our detailed guide.</p>
                <a href="#" className="text-blue-600 dark:text-blue-400 mt-4 inline-block">Read More</a>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Safari Adventures in Africa</h4>
                <p className="text-gray-600 dark:text-slate-400 mt-2">Experience the thrill of a safari adventure with our expert tips.</p>
                <a href="#" className="text-blue-600 dark:text-blue-400 mt-4 inline-block">Read More</a>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Exploring the Australian Outback</h4>
                <p className="text-gray-600 dark:text-slate-400 mt-2">Join us on a journey through the rugged Australian outback.</p>
                <a href="#" className="text-blue-600 dark:text-blue-400 mt-4 inline-block">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
