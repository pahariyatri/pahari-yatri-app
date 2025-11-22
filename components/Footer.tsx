import Link from "./common/Link";
import Image from './common/Image';
import SocialLinks from "./common/SocialLinks";
import siteMetadata from "@/data/siteMetadata";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">

        {/* Logo & Quote */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <div className="w-12 h-12 rounded-full bg-primary/5 mx-auto flex items-center justify-center">
              <Image src="/static/logo.jpg" height={32} width={32} alt="Pahari Yatri" className="rounded-full opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </Link>
          <p className="text-lg font-brandSerif italic text-muted-foreground max-w-md mx-auto">
            "The mountains are calling and I must go."
          </p>
        </div>

        {/* Social Links */}
        <SocialLinks
          facebook={siteMetadata.facebook}
          instagram={siteMetadata.instagram}
          twitter={siteMetadata.twitter}
          youtube={siteMetadata.youtube}
          linkedin={siteMetadata.linkedin}
          className="opacity-70 hover:opacity-100 transition-opacity"
          iconSize="md"
        />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground/60 font-light">
          <p>© {new Date().getFullYear()} Pahari Yatri. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
