'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import headerNavLinks from '@/data/headerNavLinks'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

/**
 * Deliberately plain fullscreen menu: a fixed, fully opaque layer with its
 * own z-index, portalled to <body>.
 *
 * The portal is load-bearing: the header pill uses backdrop-filter, and a
 * backdrop-filter ancestor becomes the containing block for position:fixed
 * descendants — rendered inline, this menu would be trapped inside the
 * pill's box instead of covering the viewport.
 */
const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Lock page scroll while the menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const menu = (
      <div
        className={cn(
          'fixed inset-0 z-[999] flex flex-col bg-white dark:bg-zinc-950 transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        {/* Head */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-border/20">
          <div>
            <span className="font-brandSerif text-2xl font-bold text-foreground">
              Pahari Yatri
            </span>
            <p className="text-xs text-muted-foreground/70 font-brandSerif italic mt-0.5">
              The mountains are calling
            </p>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {headerNavLinks.map((link, i) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium transition-colors duration-200',
                isActive(link.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/85 hover:bg-muted hover:text-foreground'
              )}
            >
              <span>{link.title}</span>
              <span className="text-xs text-muted-foreground/50 font-brandSerif italic">
                0{i + 1}
              </span>
            </Link>
          ))}
        </nav>

        {/* Foot */}
        <div className="px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 border-t border-border/20 space-y-3">
          <Link href="/apply" onClick={() => setOpen(false)} className="block">
            <Button className="w-full rounded-full py-6 text-base font-medium">
              Become a Yatri
            </Button>
          </Link>
          <p className="text-center text-xs text-muted-foreground/60 font-brandSerif italic">
            Learn the mountains before you walk them.
          </p>
        </div>
      </div>
  )

  return (
    <>
      <button
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="p-2 -mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6 text-foreground"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Portalled to <body>: escapes the header pill's backdrop-filter
          containing block so inset-0 really means the whole viewport. */}
      {mounted && createPortal(menu, document.body)}
    </>
  )
}

export default MobileNav
