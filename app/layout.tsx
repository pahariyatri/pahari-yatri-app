import "./globals.css";
import { Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import Footer from "@/components/Footer";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import ContactUsButton from "@/components/ContactUsButton";

const reader = createReader(process.cwd(), keystaticConfig);
const currentDate = new Date().toDateString();

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

async function getMetadata() {
  const seo = await reader.singletons.seo.read();
  const settings = await reader.singletons.settings.read();

  const title = seo?.title ?? 'Pahari Yatri';
  const description = seo?.description ?? 'Pahari Yatri offers exceptional trekking and mountaineering experiences, connecting adventure seekers with nature, culture, and their adventurous spirit.';
  const keywords = seo?.keywords ?? 'Pahari Yatri, keywords';
  const socialBanner = `https://pahari-yatri-app.vercel.app/api/og?title='Pahari Yatri` ?? settings?.logo;
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

export const metadata = getMetadata();

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
      "url": `https://pahari-yatri-app.vercel.app/api/og?title='Pahari Yatri'`,
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
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProviders>
          {/* <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} /> */}
          <div className={'mx-auto max-w-3xl px-4 sm:px-6 mt-4 xl:max-w-5xl xl:px-0'}>
            <div className="flex flex-col justify-between font-sans">
              {/* <SearchProvider searchConfig={siteMetadata.search as SearchConfig}> */}
              <Header title={settings?.headerTitle || "Pahari Yatri"} />
              <main className="mb-auto relative">{children}</main>
              {/* </SearchProvider> */}
              <ContactUsButton></ContactUsButton>
              <Footer />
            </div>
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}
