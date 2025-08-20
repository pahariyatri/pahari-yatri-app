'use client'

import { useState } from 'react'
import Link from './common/Link'
import headerNavLinks from '@/data/headerNavLinks'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <Sheet open={navShow} onOpenChange={setNavShow}>
      <SheetTrigger asChild>
        <button aria-label="Toggle Menu" className="sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8 text-foreground">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] sm:w-[360px] bg-background/95 backdrop-blur-md border-l border-border">
        <SheetHeader>
          <SheetTitle className="font-brandSerif text-lg">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-2">
          {headerNavLinks.map((link) => (
            <div key={link.title}>
              <Link href={link.href} className="block py-3 text-xl font-semibold" onClick={() => setNavShow(false)}>
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav