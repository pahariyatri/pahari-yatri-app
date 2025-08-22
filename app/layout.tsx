import "./globals.css";
import { Space_Grotesk, Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/Header'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import Footer from "@/components/Footer";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);
const currentDate = new Date().toDateString();

// Base fonts (we map them to Tailwind theme variables)
const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand-sans', // ✅ mapped to brandSans in Tailwind
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand-serif', // ✅ mapped to brandSerif in Tailwind
})

async function getMetadata() {
  const seo = await reader.singletons.seo.read();
  const settings = await reader.singletons.settings.read();

  const title = seo?.title ?? 'Pahari Yatri';
  const description = seo?.description ?? 'Pahari Yatri offers exceptional trekking and mountaineering experiences, connecting adventure seekers with nature, culture, and their adventurous spirit.';
  const keywords = seo?.keywords ?? 'Pahari Yatri, keywords';
  const socialBanner = settings?.logo || `https://pahariyatri.com/_next/image?url=%2Fstatic%2Fimages%2Fpahari-yatri-banner.png&w=640&q=75`;

  const siteUrl = settings?.domain ?? 'https://pahariyatri.com';

  let metadataBase: URL;
  try {
    metadataBase = new URL(siteUrl);
  } catch (error) {
    metadataBase = new URL('https://pahariyatri.com');
  }

  return {
    metadataBase,
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: '/',
      siteName: title,
      images: [socialBanner],
      locale: settings?.locale || 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': `${siteUrl}/feed.xml`,
      },
    },
    robots: 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
    twitter: {
      title,
      card: 'summary_large_image',
      images: [socialBanner],
    },
  };
}

export async function generateMetadata() {
  return getMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await reader.singletons.settings.read();
  const seo = await reader.singletons.seo.read();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": `${settings?.domain}`,
    "name": seo?.title || "Pahari Yatri",
    "description": seo?.description || "Pahari Yatri offers exceptional trekking and mountaineering experiences, connecting adventure seekers with nature, culture, and their adventurous spirit.",
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
    "image": {
      "@type": "ImageObject",
      "url": `https://pahariyatri.com/_next/image?url=%2Fstatic%2Fimages%2Fpahari-yatri-banner.png&w=640&q=75`,
      "width": 800,
      "height": 400,
    },
    "author": {
      "@type": "Person",
      "name": siteMetadata.author,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${settings?.domain}`,
    },
    "datePublished": currentDate,
    "dateModified": currentDate,
  };

  return (
    <html
      lang={settings?.language || "en-us"}
      className={`${space_grotesk.variable} ${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      {/* Favicons */}
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <body
        className={`bg-background text-foreground antialiased font-brandSans dark:bg-himalayan-slate dark:text-white`}
      >
        {/* Schema JSON */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProviders>
          <Header title={settings?.headerTitle || "Pahari Yatri"} />
          <main className="mb-auto relative">{children}</main>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
