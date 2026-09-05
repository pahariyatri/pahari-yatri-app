import { Metadata } from 'next'
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

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
    return {
        title,
        description: description || seo?.description,
        openGraph: {
            title: `${title} | ${seo?.title}`,
            description: description || seo?.description,
            url: './',
            siteName: seo?.title,
            images: [image || fallbackImage],
            locale: settings?.locale,
            type: 'website',
        },
        twitter: {
            title: `${title} | ${seo?.title}`,
            card: 'summary_large_image',
            images: [image || fallbackImage],
        },
        ...rest,
    }
}