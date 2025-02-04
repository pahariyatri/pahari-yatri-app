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
    return {
        title,
        openGraph: {
            title: `${title} | ${seo?.title}`,
            description: description || seo?.description,
            url: './',
            siteName: seo?.title,
            images: image ? [image] : ['https://i.pinimg.com/736x/63/27/9d/63279d93bdd63862256bb4c7e500e10b.jpg' ],
            locale: settings?.locale,
            type: 'website',
        },
        twitter: {
            title: `${title} | ${seo?.title}`,
            card: 'summary_large_image',
            images: image ? [image] : ['https://i.pinimg.com/736x/63/27/9d/63279d93bdd63862256bb4c7e500e10b.jpg'],
        },
        ...rest,
    }
}