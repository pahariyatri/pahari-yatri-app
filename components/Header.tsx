'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import MobileNav from './MobileNav'
import { DesktopNav } from './DesktopNav'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'flex items-center sticky top-0 z-50 justify-between py-3 px-4 sm:px-8 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-xl bg-background/90 border-b border-border/50 shadow-[0_1px_20px_rgba(0,0,0,0.15)]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      {/* Logo */}
      <Link href="/" aria-label={title} className="flex items-center gap-3 group">
        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-border/40 group-hover:ring-primary/50 transition-all duration-300">
          <NextImage
            src="/static/images/logo.png"
            fill
            alt="Pahari Yatri"
            className="object-cover"
            priority
          />
        </div>
        <span className="text-base font-bold text-foreground font-brandSerif tracking-tight hidden sm:block group-hover:text-primary transition-colors duration-300">
          {title}
        </span>
      </Link>

      {/* Desktop nav + CTA */}
      <div className="hidden sm:flex items-center gap-2">
        <DesktopNav />
        <div className="w-px h-4 bg-border/50 mx-2" />
        <Link href="/apply">
          <Button
            size="sm"
            className="rounded-full px-5 text-sm font-medium shadow-none transition-all duration-300 hover:scale-105"
          >
            Begin Your Journey
          </Button>
        </Link>
      </div>

      {/* Mobile: Apply link + hamburger */}
      <div className="flex items-center gap-3 sm:hidden">
        <Link href="/apply">
          <Button size="sm" className="rounded-full px-4 text-xs font-medium h-8">
            Apply
          </Button>
        </Link>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
