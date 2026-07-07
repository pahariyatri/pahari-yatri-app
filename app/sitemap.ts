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
        'library',
        'books',
        'himachal',
        'stories',
        'responsible-travel',
        'temples',
        'folklore',
        'community',
        'contribute',
        'journal',
        'films',
        'about',
        'apply',
        'why-pahari-yatri',
    ].map((route) => ({
        url: `${siteUrl}/${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes: Regions
    const regions = await reader.collections.regions.list()
    const regionRoutes = regions.map((slug) => ({
        url: `${siteUrl}/${slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    // Dynamic routes: Destinations
    const destinations = (await reader.collections.destinations.all())
    const destRoutes = destinations.map((d) => ({
        url: `${siteUrl}/${d.entry.parentRegion}/travel-guide/${d.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic routes: Places
    const places = (await reader.collections.places.all())
    const placeRoutes = places.map((p) => ({
        url: `${siteUrl}/${p.entry.parentRegion}/places/${p.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Dynamic routes: Stories
    const stories = (await reader.collections.stories.all())
    const storyRoutes = stories.map((s) => ({
        url: `${siteUrl}/${(s.entry as any).parentRegion || 'himachal'}/stories/${s.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...regionRoutes, ...destRoutes, ...placeRoutes, ...storyRoutes]
}