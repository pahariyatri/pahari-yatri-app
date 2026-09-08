import { Metadata } from 'next'
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import siteMetadata from '@/data/siteMetadata';

const reader = createReader(process.cwd(), keystaticConfig);

// The brand suffix used in OG/Twitter titles. This must match the `title.template`
// in app/layout.tsx (`%s | Pahari Yatri`) so a shared card and its document title
// read identically. Deliberately a constant rather than `seo?.title`: the SEO
// singleton is optional, and when it was absent every hub page shipped an
// og:title ending in "| undefined".
const SITE_NAME = 'Pahari Yatri'

interface PageSEOProps {
    title: string
    description?: string
    image?: string
    [key: string]: any
}

export async function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Promise<Metadata> {
    const seo = await reader.singletons.seo.read();
    const settings = await reader.singletons.settings.read();
    // Every hub page that doesn't pass its own `image` used to fall back to a
    // hotlinked, likely-unlicensed Pinterest image. /api/og generates a real
    // branded card from the page's own title instead.
    const fallbackImage = `/api/og?title=${encodeURIComponent(title)}`;
    const resolvedDescription = description || seo?.description || siteMetadata.description;
    return {
        title,
        description: resolvedDescription,
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description: resolvedDescription,
            url: './',
            siteName: SITE_NAME,
            images: [image || fallbackImage],
            locale: settings?.locale,
            type: 'website',
        },
        twitter: {
            title: `${title} | ${SITE_NAME}`,
            card: 'summary_large_image',
            images: [image || fallbackImage],
        },
        ...rest,
    }
}