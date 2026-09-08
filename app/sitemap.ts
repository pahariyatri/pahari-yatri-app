import siteMetadata from '@/data/siteMetadata'
import { MetadataRoute } from 'next'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const reader = createReader(process.cwd(), keystaticConfig)

// Real per-file "last modified" date: prefer the file's last git commit date
// (accurate even across a shallow clone, since it reads the commit that
// touched the file, not just HEAD), falling back to filesystem mtime, and
// finally to a fixed date — never `new Date()`, which just reports build time
// for every URL and trains crawlers to ignore the field.
const FALLBACK_DATE = '2026-01-01'
const gitDateCache = new Map<string, string>()

function findEntryFile(collectionDir: string, slug: string): string | null {
    const dir = path.join(process.cwd(), collectionDir)
    let files: string[]
    try {
        files = fs.readdirSync(dir)
    } catch {
        return null
    }
    const match = files.find((f) => path.parse(f).name === slug)
    return match ? path.join(dir, match) : null
}

function lastModifiedFor(collectionDir: string, slug: string): string {
    const filePath = findEntryFile(collectionDir, slug)
    if (!filePath) return FALLBACK_DATE
    if (gitDateCache.has(filePath)) return gitDateCache.get(filePath)!

    let result = FALLBACK_DATE
    try {
        const out = execFileSync(
            'git',
            ['log', '-1', '--format=%aI', '--', filePath],
            { cwd: process.cwd(), encoding: 'utf8' }
        ).trim()
        if (out) result = out.split('T')[0]
    } catch {
        try {
            result = fs.statSync(filePath).mtime.toISOString().split('T')[0]
        } catch {
            result = FALLBACK_DATE
        }
    }
    gitDateCache.set(filePath, result)
    return result
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = siteMetadata.siteUrl

    // Static routes ('himachal' is deliberately not listed here — it's a
    // region slug and already produced, with region priority, by
    // regionRoutes below; listing it twice duplicated the sitemap entry)
    // use the repo's own last-relevant-commit date as a reasonable stand-in
    // for "when this static page last changed", since they aren't Keystatic
    // entries with their own content file.
    const routes = [
        '',
        'library',
        'books',
        'chapters',
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
        lastModified: lastModifiedFor(route === '' ? 'app' : `app/${route}`, 'page'),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes: Regions
    const regions = await reader.collections.regions.list()
    const regionRoutes = regions.map((slug) => ({
        url: `${siteUrl}/${slug}`,
        lastModified: lastModifiedFor('data/regions', slug),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    // Dynamic routes: per-region Travel Guides / Places index pages —
    // real pages now (see app/[...slug]/page.tsx), not the soft-404s they
    // used to be, so they belong in the sitemap.
    const regionIndexRoutes = regions.flatMap((slug) => [
        {
            url: `${siteUrl}/${slug}/travel-guide`,
            lastModified: lastModifiedFor('data/regions', slug),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${siteUrl}/${slug}/places`,
            lastModified: lastModifiedFor('data/regions', slug),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
    ])

    // Dynamic routes: Destinations
    const destinations = (await reader.collections.destinations.all())
    const destRoutes = destinations.map((d) => ({
        url: `${siteUrl}/${d.entry.parentRegion}/travel-guide/${d.slug}`,
        lastModified: lastModifiedFor('data/destinations', d.slug),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic routes: Places
    const places = (await reader.collections.places.all())
    const placeRoutes = places.map((p) => ({
        url: `${siteUrl}/${p.entry.parentRegion}/places/${p.slug}`,
        lastModified: lastModifiedFor('data/places', p.slug),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Dynamic routes: Books (seasonal editions)
    const books = await reader.collections.books.list()
    const bookRoutes = books.map((slug) => ({
        url: `${siteUrl}/books/${slug}`,
        lastModified: lastModifiedFor('data/books', slug),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Dynamic routes: Chapters — the landing pages Reels point at, so they
    // matter more for discovery than anything else in the library.
    const chapters = await reader.collections.chapters.list()
    const chapterRoutes = chapters.map((slug) => ({
        url: `${siteUrl}/chapters/${slug}`,
        lastModified: lastModifiedFor('data/chapters', slug),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Dynamic routes: Stories.
    // Canonical form is /stories/{slug}. The older /{region}/stories/{slug}
    // form 301s here (see `redirects()` in next.config.mjs), so only the
    // canonical URL is listed.
    const stories = (await reader.collections.stories.all())
    const storyRoutes = stories.map((s) => ({
        url: `${siteUrl}/stories/${s.slug}`,
        lastModified: lastModifiedFor('data/stories', s.slug),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        ...routes,
        ...regionRoutes,
        ...regionIndexRoutes,
        ...destRoutes,
        ...placeRoutes,
        ...bookRoutes,
        ...chapterRoutes,
        ...storyRoutes,
    ]
}