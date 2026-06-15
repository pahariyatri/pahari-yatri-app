import siteMetadata from '@/data/siteMetadata'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og/*'],
        disallow: ['/keystatic/', '/api/keystatic/'],
      },
      // Allow major AI crawlers for AEO (Answer Engine Optimisation)
      { userAgent: 'OAI-SearchBot', allow: '/' },       // ChatGPT
      { userAgent: 'PerplexityBot', allow: '/' },        // Perplexity
      { userAgent: 'anthropic-ai', allow: '/' },         // Claude
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Googlebot-Extended', allow: '/' },   // Google Gemini
      { userAgent: 'DuckAssistant', allow: '/' },        // DuckDuckGo AI
      { userAgent: 'Diffbot', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },               // You.com
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
