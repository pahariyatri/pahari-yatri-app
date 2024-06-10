import siteMetadata from '@/data/siteMetadata'
import type { MetadataRoute } from 'next'

// export default function robots(): MetadataRoute.Robots {
//     return {
//         rules: [
//             {
//                 userAgent: 'Googlebot',
//                 allow: ['/'],
//                 disallow: '/private/',
//             },
//             {
//                 userAgent: ['Applebot', 'Bingbot'],
//                 disallow: ['/'],
//             },
//         ],
//         sitemap: 'https://pahariyatri.com/sitemap.xml',
//     }
// }

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/api/og/*'],
        },
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
        host: siteMetadata.siteUrl,
    }
}