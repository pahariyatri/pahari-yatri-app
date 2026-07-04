"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import headerNavLinks from "@/data/headerNavLinks"

export function DesktopNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex items-center gap-1">
      {headerNavLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={cn(
            "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
            isActive(link.href)
              ? "text-primary bg-primary/8"
              : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
          )}
        >
          {link.title}
          {isActive(link.href) && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
          )}
        </Link>
      ))}
    </nav>
  )
}
