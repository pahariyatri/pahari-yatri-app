import siteMetadata from '@/data/siteMetadata'
import { MetadataRoute } from 'next'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = siteMetadata.siteUrl

    // Static routes
    const routes = [
        '',
        'books',
        'stories',
        'about',
        'contact',
        'apply',
        'yatri-pass',
        'why-pahari-yatri'
    ].map((route) => ({
        url: `${siteUrl}/${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes: Books
    const books = await reader.collections.books.list()
    const bookRoutes = books.map((slug) => ({
        url: `${siteUrl}/books/${slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Dynamic routes: Stories
    const stories = await reader.collections.stories.list()
    const storyRoutes = stories.map((slug) => ({
        url: `${siteUrl}/stories/${slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...bookRoutes, ...storyRoutes]
}