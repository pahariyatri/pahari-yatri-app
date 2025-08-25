import "./globals.css";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import siteMetadata from "@/data/siteMetadata";
import { ThemeProviders } from "./theme-providers";
import Footer from "@/components/Footer";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

// Base fonts (mapped to Tailwind variables)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

async function getMetadata() {
  const seo = await reader.singletons.seo.read();
  const settings = await reader.singletons.settings.read();

  const title = seo?.title ?? "Pahari Yatri";
  const description =
    seo?.description ??
    "Pahari Yatri offers transformative Himalayan journeys — not tourism, but a movement.";
  const keywords = seo?.keywords ?? "Pahari Yatri, Himalaya, Yatri, journeys";
  const socialBanner =
    settings?.logo ||
    `${siteMetadata.siteUrl}/static/images/pahari-yatri-banner.png`;

  const siteUrl = settings?.domain ?? siteMetadata.siteUrl;

  let metadataBase: URL;
  try {
    metadataBase = new URL(siteUrl);
  } catch {
    metadataBase = new URL(siteMetadata.siteUrl);
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
      url: siteUrl,
      siteName: title,
      images: [socialBanner],
      locale: settings?.locale || "en_US",
      type: "website",
    },
    alternates: {
      canonical: siteUrl,
      types: {
        "application/rss+xml": `${siteUrl}/feed.xml`,
      },
    },
    robots:
      "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    twitter: {
      title,
      card: "summary_large_image",
      images: [socialBanner],
    },
  };
}

export async function generateMetadata() {
  return getMetadata();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await reader.singletons.settings.read();
  const seo = await reader.singletons.seo.read();

  const currentDate = new Date().toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: settings?.domain || siteMetadata.siteUrl,
    name: seo?.title || "Pahari Yatri",
    description:
      seo?.description ||
      "Pahari Yatri offers transformative Himalayan journeys — not tourism, but a movement.",
    publisher: {
      "@type": "Organization",
      name: siteMetadata.title,
      logo: {
        "@type": "ImageObject",
        url: `${siteMetadata.siteUrl}/static/logo.png`,
        width: 600,
        height: 60,
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${siteMetadata.siteUrl}/static/images/pahari-yatri-banner.png`,
      width: 800,
      height: 400,
    },
    author: {
      "@type": "Person",
      name: siteMetadata.author,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": settings?.domain || siteMetadata.siteUrl,
    },
    datePublished: currentDate,
    dateModified: currentDate,
  };

  return (
    <html
      lang={settings?.language || "en"}
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/static/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#ffffff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000000"
        />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
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
  );
}
