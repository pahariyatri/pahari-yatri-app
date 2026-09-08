'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { track, type ClickLocation } from '@/lib/analytics';

interface Props {
    /** Where this CTA sits, so we can see which placement actually converts. */
    location: ClickLocation;
    /** The visible button text, kept as a param for reporting. */
    label?: string;
    href?: string;
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}

/**
 * Any call to action that leads into the Yatri Circle application.
 *
 * Exists as a client component so server-rendered sections (FinalCTA, the
 * community page) can still emit `join_yatri_circle_click` without being
 * converted to client components themselves.
 */
export default function YatriCircleLink({
    location,
    label,
    href = '/apply',
    className,
    children,
    onClick,
}: Props) {
    return (
        <Link
            href={href}
            className={className}
            onClick={() => {
                track('join_yatri_circle_click', { location, label });
                onClick?.();
            }}
        >
            {children}
        </Link>
    );
}
