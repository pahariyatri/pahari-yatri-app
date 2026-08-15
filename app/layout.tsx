import "./globals.css";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import siteMetadata from "@/data/siteMetadata";
import { ThemeProviders } from "./theme-providers";
import Footer from "@/components/Footer";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from "@/components/GoogleTagManager";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { WebVitals } from "@/components/WebVitals";
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
    "Pahari Yatri — Learn the Himalayas Before You Walk Them";
  const description =
    seo?.description ??
    "Pahari Yatri is a digital Himalayan library and community for people who want to understand the mountains before they travel. Read trail journals, temple stories, folklore, and responsible travel guides from Himachal and the wider Himalayas.";
  const keywords =
    seo?.keywords ??
    "Pahari Yatri, Himalayan travel guide, responsible travel Himalayas, Himachal travel stories, Himalayan culture, Himalayan temples, Himalayan folklore, spiritual travel Himalayas, seasonal Himalayan trails, slow travel Himalayas, hidden places in Himachal, Himalayan village stories, travel like a local Himalayas, Pahari culture";
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
    // "./" resolves against metadataBase + the current route, so every page gets
    // its own canonical rather than all of them pointing at the homepage.
    alternates: {
      canonical: "./",
    },
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
          alt: "Pahari Yatri — a digital Himalayan library and responsible travel community",
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
      // Meta Business domain verification for pahariyatri.com. Public token —
      // Meta re-scrapes the homepage <head> to confirm domain ownership.
      "facebook-domain-verification": "gh95ztf6xe7jx5k1mrb19aepkk8zfy",
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
      "Pahari Yatri is a digital Himalayan library and community for responsible travellers, not a trip-selling travel agency.",
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
    "@id": `${siteUrl}/#organization`,
    name: "Pahari Yatri",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/static/images/logo.png`,
      width: 600,
      height: 60,
    },
    description:
      "A digital Himalayan library and community for people who want to experience the mountains with respect, awareness, culture, and inner purpose.",
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
    knowsAbout: [
      "Himachal Pradesh",
      "Uttarakhand",
      "Kinnaur",
      "Spiti Valley",
      "Lahaul",
      "Tirthan Valley",
      "Responsible Himalayan travel",
      "Himalayan temples and folklore",
    ],
    brand: {
      "@type": "Brand",
      "@id": `${siteUrl}/#brand`,
      name: "Pahari Yatri",
      slogan: "Learn the Himalayas before you walk them.",
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
    description: seo?.description || "A digital Himalayan library and community teaching responsible travel, culture, and folklore across Himachal Pradesh and the wider Himalayas.",
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
          text: "Pahari Yatri is a digital Himalayan library and community that teaches people how to experience the Himalayas with respect, awareness, culture, and inner purpose. It is a responsible-travel movement based in Himachal Pradesh, India, not a trip-selling travel agency.",
        },
      },
      {
        "@type": "Question",
        name: "What does 'Yatri' mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Yatri (Hindi: यात्री) is a traveller or pilgrim. A Pahari Yatri travels to learn and to listen, not simply to sightsee. The idea is to understand the mountains before you travel them.",
        },
      },
      {
        "@type": "Question",
        name: "How is the Pahari Yatri library organised?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Content is organised into seasonal Editions (Books): Summer, Monsoon, Winter, and the Lost Trails. Each Book holds Chapters, and each Chapter tells the story of one place, its region, season, and what to respect there. Travellers add first-person Stories to the archive.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best season to travel in Himachal Pradesh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every season has its character. Monsoon (July to September) brings lush green trails. Autumn (October to November) offers clear skies and golden light. Winter (December to February) is for silence and snow. Spring (March to May) is for renewal. The library has an edition for each.",
        },
      },
      {
        "@type": "Question",
        name: "How is Pahari Yatri different from a travel agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It teaches before it invites. The focus is awareness, culture, folklore, and responsible travel, not packages, discounts, or booking. You learn how to walk the Himalayas respectfully, and you can contribute your own story to the library.",
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
        <GoogleTagManagerNoScript />
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
        <GoogleTagManagerScript />
        <AnalyticsEvents />
        <VercelAnalytics />
        <WebVitals />
      </body>
    </html>
  );
}
