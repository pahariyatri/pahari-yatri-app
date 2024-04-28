import { MetadataRoute } from 'next'
type Sitemap = Array<{
    url: string
    lastModified?: string | Date
    changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
    priority?: number
    // alternates?: {
    //   languages?: Languages<string>
    // }
}>

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://pahariyatri.com/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://pahariyatri.com/package',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://pahariyatri.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://pahariyatri.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        }
    ]
}