import AboutClient from "./client-page";

// SEO Metadata Generation
export async function generateMetadata() {
  const title = 'About Pahari Yatri — Yatri, Not Tourist';
  const description = 'Pahari Yatri is a digital Himalayan library and community for people who want to understand the mountains before they travel — not a trekking company. Read our story and the Yatri Code for responsible travel across Himachal and the Indian Himalayas.';
  const url = `https://pahariyatri.com/about`;
  const image = `https://pahariyatri.com/api/og?title=About+Pahari+Yatri&sub=Not+Tourism.+A+Movement.`;

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
          alt: 'Pahari Yatri — Himalayan stories and responsible travel',
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
