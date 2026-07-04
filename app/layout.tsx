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
    `${siteMetadata.siteUrl}/api/og`;

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
      template: `%s | Pahari Yatri`,
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
          url: `${siteUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "Pahari Yatri - Himalayan Treks & Spiritual Journeys",
        },
      ],
      locale: settings?.locale || "en_US",
      type: "website",
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
        url: `${siteMetadata.siteUrl}/static/images/logo.png`,
        width: 600,
        height: 60,
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${siteMetadata.siteUrl}/api/og`,
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
    logo: `${siteUrl}/static/images/logo.png`,
    sameAs: [
      "https://facebook.com/pahariyatri",
      "https://instagram.com/pahariyatri",
      "https://twitter.com/pahariyatri",
      "https://www.youtube.com/@pahariyatri",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@pahariyatri.com",
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
        name: "Books",
        item: `${siteUrl}/books`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Stories",
        item: `${siteUrl}/stories`,
      },
    ],
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Pahari Yatri",
    description: seo?.description || "Transformative Himalayan treks and spiritual journeys in Himachal Pradesh, India.",
    url: siteUrl,
    logo: `${siteUrl}/static/images/logo.png`,
    image: `${siteUrl}/api/og`,
    email: "info@pahariyatri.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manali",
      addressRegion: "Himachal Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.2396,
      longitude: 77.1887,
    },
    areaServed: {
      "@type": "Place",
      name: "Himachal Pradesh, India",
    },
    openingHours: "Mo-Su 09:00-18:00",
    priceRange: "₹₹",
    sameAs: [
      "https://instagram.com/pahariyatri",
      "https://facebook.com/pahariyatri",
      "https://www.youtube.com/@pahariyatri",
    ],
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Pahari Yatri?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pahari Yatri is a transformative trekking company based in Manali, Himachal Pradesh. We offer small-group Himalayan treks focused on spiritual growth, cultural immersion, and authentic mountain experiences. We call our journeys 'Chapters' — grouped into seasonal 'Books'.",
        },
      },
      {
        "@type": "Question",
        name: "Are Pahari Yatri treks suitable for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We have Chapters (journeys) for all experience levels, from first-time trekkers to experienced mountaineers. When you apply, we match you to a trek that fits both your spirit and your physical readiness.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best season for trekking in Himachal Pradesh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All seasons have their character. Monsoon (July–September) brings lush green trails. Autumn (October–November) offers clear skies and golden light. Winter (December–February) is for those who seek silence and snow. Spring (March–May) is for renewal. Pahari Yatri runs curated treks year-round.",
        },
      },
      {
        "@type": "Question",
        name: "How do I join a Pahari Yatri trek?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Browse our Books (seasonal trek editions) at pahariyatri.com/books, read the Chapters to find your journey, then apply at pahariyatri.com/apply. We review every application and respond within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "How many people are in a Pahari Yatri group?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We keep groups intentionally small — typically 6 to 12 Yatris per Chapter. Intimacy and genuine connection are core to the Pahari Yatri experience.",
        },
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
              jsonLdLocalBusiness,
              jsonLdFAQ,
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
