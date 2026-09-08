'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { track, domainOf } from '@/lib/analytics'

/**
 * Shared link component.
 *
 * Internal (`/…`) and anchor (`#…`) links are untracked — page views and
 * dedicated events already cover those. Anything pointing off-site fires
 * `outbound_click`. Social profile links use `SocialIcon`, which sends the more
 * specific `social_click`, so they don't come through here and can't double-count.
 */
const CustomLink = ({ href, onClick, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternalLink = href && href.startsWith('/')
    const isAnchorLink = href && href.startsWith('#')

    if (isInternalLink) {
        return <Link href={href} onClick={onClick} {...rest} />
    }

    if (isAnchorLink) {
        return <a href={href} onClick={onClick} {...rest} />
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const url = String(href ?? '')
        if (url && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
            track('outbound_click', { url, domain: domainOf(url) })
        }
        onClick?.(e)
    }

    return <a target="_blank" rel="noopener noreferrer" href={href} onClick={handleClick} {...rest} />
}

export default CustomLink
