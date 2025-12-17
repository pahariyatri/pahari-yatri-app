import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. List of known bad bot User-Agents (Extensible)
const BLOCKED_USER_AGENTS = [
    'GPTBot',
    'CCBot',
    'ChatGPT-User',
    'Google-Extended',
    'anthropic-ai',
    'Omgilibot',
    'FacebookBot',
    'Bytespider',
]

// 2. Patterns that look like automated scraping tools
const SUSPICIOUS_PATTERNS = [
    'HeadlessChrome',
    'PhantomJS',
    'Selenium',
    'Puppeteer',
]

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || ''

    // A. Check for known blocked bots
    const isBlockedBot = BLOCKED_USER_AGENTS.some(bot =>
        userAgent.includes(bot)
    )

    // B. Check for scraping tools
    const isScraper = SUSPICIOUS_PATTERNS.some(tool =>
        userAgent.includes(tool)
    )

    if (isBlockedBot || isScraper) {
        // Return 403 Forbidden with a JSON response or simple text
        return new NextResponse(
            JSON.stringify({ message: 'Access Denied: Automated access restricted.' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
    }

    // C. Rate Limiting Placeholder (For future expansion)
    // Real rate limiting requires a KV store (Redis/Vercel KV). 
    // For now, we allow organic traffic.

    return NextResponse.next()
}

// Configure paths to match (exclude static files to save resources)
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes - optional, maybe you want to protect them too?)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - static (public static folder)
         */
        '/((?!_next/static|_next/image|static|favicon.ico).*)',
    ],
}
