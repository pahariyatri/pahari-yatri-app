import Head from 'next/head';
import SectionContainer from "@/components/common/SectionContainer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import Link from '@/components/common/Link';

// SEO Metadata Generation
export async function generateMetadata() {
  const title = 'About Us - Pahari Yatri | Trekking and Spiritual Yatras in the Himalayas';
  const description = 'Discover authentic, sustainable, and personalized trekking experiences in the Himalayas with Pahari Yatri. Specializing in spiritual yatras to Manimahesh, Shrikhand Mahadev, and Kinnaur Kailash.';
  const url = `https://pahariyatri.com/about`;
  const image = `https://pahariyatri.com/static/images/pahari-yatri-banner.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Pahari Yatri',
      url,
      images: [
        {
          url: image,
          alt: 'Pahari Yatri - Trekking and Spiritual Yatras in the Himalayas',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}




export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pahari Yatri",
    "url": `https://pahariyatri.com`,
    "logo": {
      "@type": "ImageObject",
      "url": `https://pahariyatri.com/static/logo.png`,
      "width": 600,
      "height": 60,
    },
    "description": "Pahari Yatri offers authentic, sustainable, and personalized trekking experiences in the Himalayas. We specialize in spiritual yatras to sacred places like Manimahesh, Shrikhand Mahadev, and Kinnaur Kailash.",
    "sameAs": [
      "https://facebook.com/fb.pahariyatri",
      "https://instagram.com/pahariyatri",
      "https://twitter.com/pahariyatri"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-6280888188",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "founder": {
      "@type": "Person",
      "name": "Pankaj Kumar",
      "jobTitle": "Founder and Chief Trek Guide",
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Himachal Pradesh",
      "addressCountry": "IN",
    }
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[40vh] sm:h-[50vh]" style={{ backgroundImage: "url('/static/images/pahari-yatri-banner.png')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white">About Us</h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl">Welcome to Pahari Yatri, your gateway to transformative journeys in the majestic Himalayas.</p>
        </div>
      </div>

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
              <BreadcrumbPage>{'About Us'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Content */}
        <div className="px-4 sm:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
          {/* Vision and Mission Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 ">Our Vision and Mission</h2>
            <p className="text-lg sm:text-xl leading-relaxed  ">
              At Pahari Yatri, we envision a world where every trekker connects deeply with the untouched beauty and spiritual essence of Himachal Pradesh. Our mission is to bring the Himalayan experience to life through personalized treks and sacred yatras that rejuvenate body, mind, and soul.
            </p>
          </section>

          {/* The Story Behind Pahari Yatri Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 ">The Story Behind Pahari Yatri</h2>
            <p className="text-lg sm:text-xl leading-relaxed  ">
              Pahari Yatri was born from my personal journey of self-discovery through the Himalayas. In 2018, during the Shrikhand Mahadev Yatra, I experienced a profound spiritual awakening. This sacred journey marked a turning point in my life, where I realized the Himalayas are not just physical challenges but sacred spaces that hold the essence of Shiva.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed   mt-4">
              Over the years, my passion led me to places like <strong className="">Manimahesh</strong>, <strong className="">Kinnaur Kailash</strong>, and <strong className="">Shrikhand Mahadev</strong>, the three sacred Kailash peaks of Himachal Pradesh. These aren’t just trekking destinations—they are places where one can feel the divine presence of Shiva. Of these, Shrikhand Mahadev holds a special place in my heart, and I return every year to feel most alive and connected to the spiritual energy radiating from the mountains.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed   mt-4">
              Drawing from these personal experiences and my mountaineering certification, I formed a team of highly skilled, certified experts who specialize in creating safe, sustainable, and transformative Himalayan adventures. <strong className="">Pahari Yatri</strong> is more than a trekking agency—we offer a doorway into the sacred Himalayas, combining adventure with spirituality in every journey.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed  mt-4">
                Our treks are designed for everyone, from seasoned trekkers to first-timers. We believe that the Himalayas should be accessible to all, and we strive to create experiences that resonate with each individual’s spiritual journey. 
                Whether you seek adventure, spirituality, or a deeper connection with nature, we are here to guide you every step of the way.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed   mt-4">
            In addition to trekking, Pahari Yatri also hosts stays in some of Himachal's untouched and unexplored locations, offering guests the chance to experience the serene beauty and spiritual tranquility of these hidden gems. These offbeat locations, away from the crowd, are perfect for those seeking peace and a deeper connection with nature.
            </p>
          </section>

          {/* Turning Treks into Himalayan Yatras Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 ">Turning Treks into Himalayan Yatras</h2>
            <p className="text-lg sm:text-xl leading-relaxed  ">
              At Pahari Yatri, we redefine trekking by offering Himalayan Yatras—spiritual pilgrimages that connect you with the divine energy of the mountains. Our yatras are designed to be soulful journeys that enhance your connection with nature, spirituality, and yourself.
            </p>
          </section>

          {/* Our Commitment Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Commitment to You</h2>
            <p className="text-lg sm:text-xl leading-relaxed mb-4">
              At Pahari Yatri, we are driven by three core values: <strong className="">Safety</strong>, <strong className="">Sustainability</strong>, and <strong className="">Personalization</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
                <CardHeader className="flex flex-col items-center p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl font-bold text-center">
                    {'Safety First'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-between">
                  <CardDescription className="text-center text-sm md:text-base">
                    {'Your safety is paramount. Our treks are led by certified guides with extensive experience navigating the Himalayan terrain.'}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
                <CardHeader className="flex flex-col items-center p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl font-bold text-center">
                    {'Sustainability'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-between">
                  <CardDescription className="text-center text-sm md:text-base">
                    {' We are committed to preserving the beauty of the Himalayas. Our eco-friendly practices minimize environmental impact and support local communities.'}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
                <CardHeader className="flex flex-col items-center p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl font-bold text-center">
                    {'Personalized Experiences'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-between">
                  <CardDescription className="text-center text-sm md:text-base">
                    {"We create unique experiences tailored to your needs, whether you're looking for a spiritual yatra or an adventurous trek."}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed mt-6 text-center">
              Our commitment to these values ensures that every trek is meaningful, sustainable, and safe for adventurers of all levels.
            </p>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 ">Why Choose Pahari Yatri?</h2>
            <p className="text-lg sm:text-xl leading-relaxed   mb-4">
              By choosing Pahari Yatri, you’re not just signing up for a trek—you’re stepping into a world of transformative experiences. Whether it’s connecting with the spiritual energy of Shiva, immersing yourself in the untouched beauty of the Himalayas, or pushing your physical limits on a challenging trek, we are here to guide you every step of the way.
            </p>
            <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
              <CardHeader className="flex flex-col items-center p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl font-bold text-center">
                  {'Certified Experts'}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col justify-between">
                <CardDescription className="text-center text-sm md:text-base">
                  {"Our team comprises mountaineering-certified professionals who ensure both safety and an enriched experience."}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
              <CardHeader className="flex flex-col items-center p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl font-bold text-center">
                  {'Eco-Friendly'}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col justify-between">
                <CardDescription className="text-center text-sm md:text-base">
                  {"We are committed to preserving the natural and cultural beauty of the Himalayas through sustainable trekking practices."}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
              <CardHeader className="flex flex-col items-center p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl font-bold text-center">
                  {'Tailored Experiences'}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col justify-between">
                <CardDescription className="text-center text-sm md:text-base">
                  {"From affordable group treks to customized expeditions, we create unique experiences that align with your personal goals and fitness level."}
                </CardDescription>
              </CardContent>
            </Card>
          </section>
        </div>
      </SectionContainer>
    </>
  );
}
