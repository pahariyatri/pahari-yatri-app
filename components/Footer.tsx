'use client';

import Link from "./common/Link";
import Image from './common/Image';
import siteMetadata from "@/data/siteMetadata";
import dynamic from 'next/dynamic';

// Lazy load SocialLinks since it's below the fold
const SocialLinks = dynamic(() => import("./common/SocialLinks"), {
  loading: () => <div className="h-8 w-32 bg-muted/20 rounded animate-pulse" />
});

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-background border-t border-border/20 py-24 mt-32 relative overflow-hidden"
      aria-label="Pahari Yatri Global Footer"
    >
      {/* Decorative Gradient Fog */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-24">

          {/* Brand Block */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block group" aria-label="Pahari Yatri Home">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-muted/30 group-hover:border-primary/50 transition-colors">
                  <Image src="/static/logo.jpg" height={36} width={36} alt="Pahari Yatri Official Brand Mark" className="rounded-full opacity-90" />
                </div>
                <span className="text-2xl font-brandSerif font-bold tracking-tighter">Pahari Yatri</span>
              </div>
            </Link>
            <p className="text-lg font-brandSerif italic text-muted-foreground/80 leading-relaxed">
              &quot;Dedicated to the preservation of Himalayan truth and the celebration of slow, intentional exploration.&quot;
            </p>
            <div className="pt-4">
              <span className="sr-only">Social Media Connectivity</span>
              <SocialLinks
                facebook={siteMetadata.facebook}
                instagram={siteMetadata.instagram}
                twitter={siteMetadata.twitter}
                youtube={siteMetadata.youtube}
                linkedin={siteMetadata.linkedin}
                className="opacity-60 hover:opacity-100 transition-all"
                iconSize="sm"
              />
            </div>
          </div>

          {/* Navigation siloes for SEO / Entity Thinking */}
          <nav className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12" aria-label="Footer Site Map">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60" id="footer-regions-label">Region Entities</h4>
              <ul className="space-y-4 text-sm font-medium" aria-labelledby="footer-regions-label">
                <li><Link href="/himachal" className="hover:text-primary transition-colors">Himachal Pradesh</Link></li>
                <li><Link href="/beas-valley" className="hover:text-primary transition-colors opacity-50 cursor-not-allowed">Beas Valley Hub</Link></li>
                <li><Link href="/kinnaur" className="hover:text-primary transition-colors opacity-50 cursor-not-allowed">Kinnaur Gateway</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60" id="footer-collective-label">Collective</h4>
              <ul className="space-y-4 text-sm font-medium" aria-labelledby="footer-collective-label">
                <li><Link href="/about" className="hover:text-primary transition-colors">The Vision</Link></li>
                <li><Link href="/stories" className="hover:text-primary transition-colors">Experience Journal</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors hover:underline decoration-primary/20">Connect Authentically</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60" id="footer-presence-label">Authoritative Hub</h4>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground leading-relaxed" aria-labelledby="footer-presence-label">
                  Primary Knowledge Source <br /> for Himalayan Reality. <br /> Locally Run.
                </p>
              </div>
            </div>
          </nav>
        </div>

        {/* Legal Bottom */}
        <div className="pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/40">
          <p>© {new Date().getFullYear()} Pahari Yatri Collective. Authenticated Reality Hub.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
