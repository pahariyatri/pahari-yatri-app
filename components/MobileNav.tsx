'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import headerNavLinks from '@/data/headerNavLinks'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Toggle Menu" className="p-2 -mr-2">
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
      </SheetTrigger>

      <SheetContent
        side="right"
        // Explicit solid colors on top of bg-background: this surface must
        // never be transparent, even if a theme token breaks again.
        className="w-[85vw] sm:w-[340px] bg-background bg-white dark:bg-zinc-950 border-l border-border/40 p-0 flex flex-col overflow-y-auto"
      >
        <SheetHeader className="px-6 pt-8 pb-6 border-b border-border/20">
          <SheetTitle className="font-brandSerif text-2xl text-left text-foreground">
            Pahari Yatri
          </SheetTitle>
          <p className="text-xs text-muted-foreground/60 font-brandSerif italic mt-1">
            The mountains are calling
          </p>
        </SheetHeader>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {headerNavLinks.map((link, i) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200',
                isActive(link.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/80 hover:bg-muted/60 hover:text-foreground'
              )}
            >
              <span>{link.title}</span>
              <span className="text-xs text-muted-foreground/40 font-brandSerif italic">
                0{i + 1}
              </span>
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-10 pt-4 border-t border-border/20 space-y-3">
          <Link href="/apply" onClick={() => setOpen(false)}>
            <Button className="w-full rounded-full py-6 text-base font-medium">
              Become a Yatri
            </Button>
          </Link>
          <p className="text-center text-xs text-muted-foreground/50 font-brandSerif italic">
            Learn the mountains before you walk them.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
