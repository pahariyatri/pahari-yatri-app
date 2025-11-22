import AboutClient from "./client-page";

// SEO Metadata Generation
export async function generateMetadata() {
  const title = 'About Us - Pahari Yatri | Trekking and Spiritual Yatras in the Indian Himalayas';
  const description = 'Discover authentic, sustainable, and personalized trekking experiences across the Indian Himalayas with Pahari Yatri. Specializing in spiritual yatras to sacred peaks and destinations throughout the Himalayan belt.';
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
          alt: 'Pahari Yatri - Trekking and Spiritual Yatras in the Indian Himalayas',
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
  return <AboutClient />;
}
