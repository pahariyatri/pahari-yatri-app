'use client';

import type { ReactNode } from 'react';
import { track, type ClickLocation } from '@/lib/analytics';

interface Props {
    channel: 'whatsapp' | 'discord';
    href: string;
    location: ClickLocation;
    className?: string;
    children: ReactNode;
}

/**
 * A link into one of the community channels (WhatsApp / Discord).
 *
 * Client component so server-rendered pages can still fire the join events.
 */
export default function ChannelLink({ channel, href, location, className, children }: Props) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            onClick={() =>
                track(
                    channel === 'whatsapp' ? 'whatsapp_join_click' : 'discord_join_click',
                    { location, url: href },
                )
            }
        >
            {children}
        </a>
    );
}
