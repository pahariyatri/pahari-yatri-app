import "./globals.css";
import { Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import Footer from "@/components/Footer";
import { Analytics, AnalyticsConfig } from "pliny/analytics/index.js";
import { SearchConfig, SearchProvider } from "pliny/search/index.js";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

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
  const keywords = seo?.keywords ?? 'default, keywords';
  const socialBanner = seo?.socialBanner ?? '/default-banner.png';
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
      locale: 'en_US',
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
  return (
    <html
      lang="en"
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
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <div className={'mx-auto max-w-3xl px-4 sm:px-6 mt-4 xl:max-w-5xl xl:px-0'}>
            <div className="flex flex-col justify-between font-sans">
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header title={''} />
                <main className="mb-auto relative">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}
