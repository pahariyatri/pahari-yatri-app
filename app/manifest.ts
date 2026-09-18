import { MetadataRoute } from 'next'

// This is the site's one PWA manifest (Next.js auto-serves it at
// /manifest.webmanifest and auto-injects the <link rel="manifest"> tag).
// A second, hand-written manifest at public/static/favicons/site.webmanifest
// used to be linked in app/layout.tsx at the same time — two manifest links
// on one page, with different icons and colors, is undefined behavior across
// browsers. That link was removed; this is the only one now.
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pahari Yatri — Learn the Himalayas Before You Walk Them',
        short_name: 'Pahari Yatri',
        description:
            'A digital Himalayan library and community. Trail journals, temple stories, folklore, and responsible travel across Himachal and the wider Himalayas.',
        start_url: '/',
        display: 'standalone',
        // Matches the site's actual dark default (siteMetadata.theme) and the
        // dark `theme-color` meta already declared in app/layout.tsx, instead
        // of the white this previously declared for an all-dark brand.
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/static/favicons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/static/favicons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}