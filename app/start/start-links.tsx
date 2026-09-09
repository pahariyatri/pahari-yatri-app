"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import PageTurnLink from "@/components/common/PageTurnLink";
import { track } from "@/lib/analytics";
import type { EventParams } from "@/lib/analytics";

type StartSection = EventParams["start_page_click"]["section"];

/**
 * Internal link on /start that reports which block of the page did the work.
 *
 * /start exists to answer one question — does an orientation page convert a
 * cold Reel/QR visitor into a chapter read? — so every internal link here
 * carries its section. Without that the page's own `page_view` tells us it
 * was seen and nothing about which section earned the click.
 *
 * Chapter and book destinations use `PageTurnLink` (the page-turn view
 * transition used across /chapters), everything else uses a plain link:
 * the transition is a reading metaphor and looks wrong on a CTA.
 */
export function StartLink({
    href,
    section,
    label,
    pageTurn = false,
    className,
    children,
}: {
    href: string;
    section: StartSection;
    label: string;
    pageTurn?: boolean;
    className?: string;
    children: ReactNode;
}) {
    const onClick = () =>
        track("start_page_click", { section, label, destination: href });

    if (pageTurn) {
        // PageTurnLink owns its own onClick (it intercepts for the view
        // transition), so the event fires from a wrapper instead of being
        // passed down — passing it would be dropped silently.
        return (
            <span onClick={onClick} className="contents">
                <PageTurnLink href={href} className={className}>
                    {children}
                </PageTurnLink>
            </span>
        );
    }

    return (
        <NextLink href={href} className={className} onClick={onClick}>
            {children}
        </NextLink>
    );
}

/**
 * The soft bridge out to the app portal.
 *
 * Deliberately NOT `components/common/Link`, which would fire the generic
 * `outbound_click`. The portal is our own second property, so this is a
 * funnel step rather than link attrition, and it gets its own event.
 *
 * The href carries UTMs so the portal's own middleware (which writes
 * `utm_source` to a 7-day cookie) can attribute the session on its side.
 * Keep `utm_medium=bridge` distinct from `reel` so main-site bridge traffic
 * never gets folded into Instagram Reel attribution.
 */
export function PortalBridgeLink({
    href,
    campaign,
    className,
    children,
}: {
    href: string;
    campaign: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            onClick={() =>
                track("portal_redirect_click", {
                    location: "start",
                    destination: href,
                    campaign,
                })
            }
        >
            {children}
        </a>
    );
}
