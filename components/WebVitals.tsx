'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
    useReportWebVitals((metric) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Web Vitals]', metric);
        }

        // In production, you would send this to your analytics service
        // Example: sendToAnalytics(metric)

        // Performance thresholds for alerts
        const thresholds = {
            FCP: 1800,  // First Contentful Paint
            LCP: 2500,  // Largest Contentful Paint
            FID: 100,   // First Input Delay
            CLS: 0.1,   // Cumulative Layout Shift
            TTFB: 800,  // Time to First Byte
            INP: 200,   // Interaction to Next Paint
        };

        // Alert if metric exceeds threshold
        const threshold = thresholds[metric.name as keyof typeof thresholds];
        if (threshold && metric.value > threshold) {
            console.warn(
                `⚠️ Performance Alert: ${metric.name} (${metric.value.toFixed(2)}) exceeds threshold (${threshold})`
            );
        }

        // Store in localStorage for debugging
        if (typeof window !== 'undefined') {
            const vitals = JSON.parse(localStorage.getItem('webVitals') || '[]');
            vitals.push({
                ...metric,
                timestamp: new Date().toISOString(),
            });
            // Keep only last 50 measurements
            if (vitals.length > 50) vitals.shift();
            localStorage.setItem('webVitals', JSON.stringify(vitals));
        }
    });

    return null;
}

// Helper function to get stored vitals (for debugging)
export function getStoredVitals() {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('webVitals') || '[]');
}

// Helper function to clear stored vitals
export function clearStoredVitals() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('webVitals');
    }
}
