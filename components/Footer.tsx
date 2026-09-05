'use client';

import Link from "./common/Link";
import Image from './common/Image';
import siteMetadata from "@/data/siteMetadata";
import dynamic from 'next/dynamic';

// Lazy load SocialLinks since it's below the fold
const SocialLinks = dynamic(() => import("./common/SocialLinks"), {
  loading: () => <div className="h-8 w-32 bg-muted/20 rounded animate-pulse" />
});

const columns = [
  {
    label: "The Library",
    links: [
      { href: "/library", title: "Open the Library" },
      { href: "/books", title: "Seasonal Books" },
      { href: "/chapters", title: "All Chapters" },
      { href: "/stories", title: "Stories" },
      { href: "/films", title: "Films & Reels" },
      { href: "/journal", title: "Journal" },
    ],
  },
  {
    label: "Explore",
    links: [
      { href: "/himachal", title: "Himachal Pradesh" },
      { href: "/temples", title: "Temples" },
      { href: "/folklore", title: "Folklore" },
      { href: "/responsible-travel", title: "The Yatri Code" },
    ],
  },
  {
    label: "The Movement",
    links: [
      { href: "/about", title: "About" },
      { href: "/community", title: "Community" },
      { href: "/contribute", title: "Contribute a Story" },
      { href: "/apply", title: "Become a Yatri" },
    ],
  },
];

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/apply') return null;

  return (
    <footer
      role="contentinfo"
      className="bg-background border-t border-border/20 py-16 sm:py-20 mt-24 sm:mt-32 relative overflow-hidden"
      aria-label="Pahari Yatri Footer"
    >
      {/* Decorative Gradient Fog */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-14 sm:mb-16">

          {/* Brand Block */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block group" aria-label="Pahari Yatri Home">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 overflow-hidden rounded-full border border-primary/20 group-hover:border-primary/50 transition-colors shadow-inner">
                  <Image src="/static/logo.jpg" fill sizes="48px" alt="Pahari Yatri logo" className="object-cover" />
                </div>
                <span className="text-2xl font-brandSerif font-bold tracking-tighter">Pahari Yatri</span>
              </div>
            </Link>
            <p className="text-base sm:text-lg font-brandSerif italic text-muted-foreground/80 leading-relaxed max-w-sm">
              A digital Himalayan library and community. Learn the mountains
              before you walk them.
            </p>
            <div className="pt-2 space-y-4">
              <SocialLinks
                instagram={siteMetadata.instagram}
                youtube={siteMetadata.youtube}
                facebook={siteMetadata.facebook}
                threads={siteMetadata.threads}
                className="opacity-70 hover:opacity-100 transition-all"
                iconSize="sm"
              />
              <a
                href={`mailto:${siteMetadata.email}`}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {siteMetadata.email}
              </a>
            </div>
          </div>

          {/* Site map */}
          <nav className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-12" aria-label="Footer Site Map">
            {columns.map((col) => (
              <div key={col.label} className="space-y-5">
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60">
                  {col.label}
                </h4>
                <ul className="space-y-3.5 text-sm font-medium">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-primary transition-colors">
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom line */}
        <div className="pt-8 border-t border-border/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest text-muted-foreground/50">
          <p>© {new Date().getFullYear()} Pahari Yatri. Walk softly, listen deeply.</p>
          <div className="flex gap-6">
            <Link href="/why-pahari-yatri" className="hover:text-primary transition-colors">Why Pahari Yatri</Link>
            <Link href="/apply" className="hover:text-primary transition-colors">Apply</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
