import "./globals.css";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import siteMetadata from "@/data/siteMetadata";
import { ThemeProviders } from "./theme-providers";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
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

  const title =
    seo?.title ??
    "Pahari Yatri | Transformative Himalayan Treks & Spiritual Journeys";
  const description =
    seo?.description ??
    "Join Pahari Yatri to discover untouched Himalayan trails, sacred peaks, and authentic yatras. Not tourism. A movement of Yatri.";
  const keywords =
    seo?.keywords ??
    "Pahari Yatri, Spiritual trekking India, Himalayan yatra packages, Silent meditation treks, Authentic Himalaya, Conscious travel, Inner journey";
  const socialBanner =
    (seo as any)?.ogImage ||
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
      siteName: "Pahari Yatri",
      images: [
        {
          url: `${siteUrl}/static/images/pahari-yatri-banner.png`,
          width: 1200,
          height: 630,
          alt: "Pahari Yatri - Himalayan Treks & Spiritual Journeys",
        },
        {
          url: `${siteUrl}/static/images/pahari-yatri-thumbnail.png`,
          width: 600,
          height: 315,
          alt: "Pahari Yatri Logo",
        },
      ],
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
      card: "summary_large_image",
      title,
      description,
      images: [socialBanner],
      creator: "@pahariyatri", // update if you have
      site: "@pahariyatri",
    },
    other: {
      author: siteMetadata.author,
      publisher: siteMetadata.title,
      copyright: `© ${new Date().getFullYear()} Pahari Yatri`,
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
  const seo = await reader.singletons.seo.read();

  const siteUrl = siteMetadata.siteUrl;
  const currentDate = new Date().toISOString();

  // Schema.org JSON-LD
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
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
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: siteMetadata.author,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteUrl,
    },
    datePublished: currentDate,
    dateModified: currentDate,
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pahari Yatri",
    url: siteUrl,
    logo: `${siteUrl}/static/logo.png`,
    sameAs: [
      "https://facebook.com/pahariyatri",
      "https://instagram.com/pahariyatri",
      "https://twitter.com/pahariyatri",
      "https://www.youtube.com/@pahariyatri",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-XXXXXXXXXX",
      contactType: "Customer Support",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journeys",
        item: `${siteUrl}/journeys`,
      },
    ],
  };

  return (
    <html
      lang={"en"}
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
        {/* Canonical + alternate languages */}
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="hi" href={`${siteUrl}/hi`} />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        {/* Schema JSON */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              jsonLdWebsite,
              jsonLdOrg,
              jsonLdBreadcrumbs,
            ]),
          }}
        />
        <ThemeProviders>
          <Header title={"Pahari Yatri"} />
          <main className="mb-auto relative">{children}</main>
          <Footer />
        </ThemeProviders>
        <Analytics />
      </body>
    </html>
  );
}
