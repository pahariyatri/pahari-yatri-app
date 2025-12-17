'use client'

import { useState } from 'react'
import Link from './common/Link'
import headerNavLinks from '@/data/headerNavLinks'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  return (
    <Sheet open={navShow} onOpenChange={setNavShow}>
      <SheetTrigger asChild>
        <button aria-label="Toggle Menu" className="sm:hidden p-2 -mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-foreground">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] sm:w-[360px] bg-background/98 backdrop-blur-xl border-l border-border/50 p-0">
        <SheetHeader className="px-6 py-8 border-b border-border/10 mb-2">
          <SheetTitle className="font-brandSerif text-3xl text-left text-primary">Index</SheetTitle>
        </SheetHeader>
        <nav className="px-6 py-6 space-y-6">
          {headerNavLinks.map((link, i) => (
            <div key={link.title} className="group">
              <Link
                href={link.href}
                className="flex items-baseline justify-between py-2 text-xl font-medium text-foreground/80 transition-colors group-hover:text-primary"
                onClick={() => setNavShow(false)}
              >
                <span>{link.title}</span>
                <span className="text-sm text-muted-foreground/40 font-brandSerif italic group-hover:text-primary/60">
                  0{i + 1}
                </span>
              </Link>
              <div className="h-px w-full bg-border/30 mt-2 group-hover:bg-primary/20 transition-colors" />
            </div>
          ))}
        </nav>
        <div className="absolute bottom-8 left-6 right-6">
          <p className="text-xs text-muted-foreground text-center font-brandSerif italic">
            &quot;The mountains are calling...&quot;
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav