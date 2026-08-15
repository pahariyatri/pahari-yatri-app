/**
 * Pahari Yatri analytics.
 *
 * One entry point for every tracked interaction. Everything goes through
 * `track()`, which pushes a named event onto the GTM dataLayer. GA4 and the
 * Meta Pixel both live inside the GTM container (GTM-N953C62X) and listen for
 * these event names, so this file never calls `gtag()` or `fbq()` directly —
 * doing that would bypass the container and double-fire.
 *
 * Adding an event:
 *   1. Add the name + its params to `EventParams` below.
 *   2. Call `track('name', { ... })` from the component.
 *   3. Create a matching Custom Event trigger + GA4 Event tag in GTM.
 *
 * The funnel these events describe:
 *   Instagram Reel -> chapter -> WhatsApp / Yatri Circle
 */

/** Where a click happened, so the same event can be told apart by placement. */
export type ClickLocation =
    | 'chapter'
    | 'footer'
    | 'thank_you'
    | 'community'
    | 'final_cta'
    | 'mobile_nav'
    | 'why_pahari_yatri'
    | 'scan_me'
    | 'other';

export interface EventParams {
    /** A chapter page was opened. The core "did the Reel land?" metric. */
    chapter_view: {
        chapter_slug: string;
        chapter_title?: string;
        book?: string;
        region?: string;
    };
    /** Clicked through to the WhatsApp channel. */
    whatsapp_join_click: { location: ClickLocation; url?: string };
    /** Clicked through to the Discord circle. */
    discord_join_click: { location: ClickLocation; url?: string };
    /** Clicked any CTA that leads into the Yatri Circle application. */
    join_yatri_circle_click: { location: ClickLocation; label?: string };
    /** Opened the application and answered the first question. */
    apply_start: { location?: ClickLocation };
    /** Application submitted successfully. Mapped to Meta `Lead`. */
    apply_submit: {
        intent?: string;
        preferred_region?: string;
        join_path?: string;
    };
    /** Landed from a Reel / social post carrying UTM parameters. */
    reel_source_visit: {
        source: string;
        medium?: string;
        campaign?: string;
        content?: string;
        landing_path: string;
    };
    /** Clicked one of our own social profile links. */
    social_click: { platform: string; location: ClickLocation; url?: string };
    /** Clicked any other link leaving the site. */
    outbound_click: { url: string; domain: string };
}

export type AnalyticsEvent = keyof EventParams;

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

/**
 * Push an event to the GTM dataLayer.
 *
 * Safe to call during SSR (no-op) and safe to call when GTM is absent or
 * blocked — the dataLayer array is created regardless, so nothing throws.
 */
export function track<E extends AnalyticsEvent>(
    event: E,
    params: EventParams[E],
): void {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
}

/**
 * Events that must only fire once per page view. `chapter_view` runs from an
 * effect, and React strict mode double-invokes effects in development, so
 * without this the dev numbers would be doubled.
 */
const fired = new Set<string>();

export function trackOnce<E extends AnalyticsEvent>(
    key: string,
    event: E,
    params: EventParams[E],
): void {
    if (typeof window === 'undefined') return;
    if (fired.has(key)) return;
    fired.add(key);
    track(event, params);
}

/** Normalise a URL to its hostname; returns '' for anything unparseable. */
export function domainOf(url: string): string {
    try {
        return new URL(url, window.location.origin).hostname.replace(/^www\./, '');
    } catch {
        return '';
    }
}

/** True when the href points somewhere outside pahariyatri.com. */
export function isOutbound(url: string): boolean {
    if (!url || url.startsWith('#') || url.startsWith('/')) return false;
    if (url.startsWith('mailto:') || url.startsWith('tel:')) return false;
    const d = domainOf(url);
    return !!d && d !== window.location.hostname.replace(/^www\./, '');
}

/**
 * Read UTM parameters off the current URL and, if the visit came from a
 * tagged social link, emit `reel_source_visit`.
 *
 * Fires once per landing. Reels should link with, for example:
 *   ?utm_source=instagram&utm_medium=reel&utm_campaign=buran-ghati&utm_content=hook-a
 */
export function trackReelSourceVisit(): void {
    if (typeof window === 'undefined') return;

    const qs = new URLSearchParams(window.location.search);
    const source = qs.get('utm_source');
    if (!source) return;

    trackOnce(`reel_source_visit:${window.location.pathname}:${source}`, 'reel_source_visit', {
        source,
        medium: qs.get('utm_medium') || undefined,
        campaign: qs.get('utm_campaign') || undefined,
        content: qs.get('utm_content') || undefined,
        landing_path: window.location.pathname,
    });
}
