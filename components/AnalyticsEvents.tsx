'use client';

import { useEffect } from 'react';
import { trackReelSourceVisit } from '@/lib/analytics';

/**
 * Fires the events that belong to a page load rather than to a click.
 *
 * Right now that is only `reel_source_visit`, which reads UTM parameters off
 * the landing URL. It reads `window.location.search` directly instead of
 * `useSearchParams()` on purpose: the hook would opt every page into dynamic
 * rendering, and we want these pages to stay static.
 */
export default function AnalyticsEvents() {
    useEffect(() => {
        trackReelSourceVisit();
    }, []);

    return null;
}
