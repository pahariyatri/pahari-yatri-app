import type { Metadata } from "next";
import Link from "@/components/common/Link";
import PageIntro from "@/components/common/PageIntro";
import SectionContainer from "@/components/common/SectionContainer";
import ChannelLink from "@/components/common/ChannelLink";
import SocialLinks from "@/components/common/SocialLinks";
import { Button } from "@/components/ui/button";
import siteMetadata from "@/data/siteMetadata";
import { Mail, Volume2 } from "lucide-react";

// Thin, contact-only utility page for people who scan the printed QR code —
// not meant to compete in search against real content pages, so it's kept
// out of the sitemap and explicitly noindexed rather than left to inherit
// the homepage's title/description as an accidental duplicate.
export const metadata: Metadata = {
  title: "Quick Contact",
  description:
    "Scanned the Pahari Yatri code? Here's the fastest way to reach us — join the community channels, start the library, or send an email.",
  alternates: { canonical: "/scan-me" },
  robots: { index: false, follow: true },
};

// Real, currently-used community channels (same URLs as the Yatri Circle
// thank-you flow in components/application/steps/ThankYouStep.tsx), not the
// unverified personal phone number this page used to show.
const whatsappChannelUrl = "https://whatsapp.com/channel/0029VbBQ3PLElagxCgWywv1S";
const discordUrl = "https://discord.gg/uxyqQjjesU";

export default function ScanMePage() {
  return (
    <div>
      <PageIntro
        kicker="Quick Contact"
        title="You scanned the code. Here's where to go."
        subtitle="Join the community channels, start the library, or send us a note directly."
        align="center"
      />

      <SectionContainer className="pt-2 sm:pt-4 pb-16 sm:pb-24">
        <div className="max-w-md mx-auto space-y-4">
          <ChannelLink
            channel="whatsapp"
            href={whatsappChannelUrl}
            location="scan_me"
            className="block"
          >
            <Button size="lg" className="w-full rounded-xl gap-3 justify-center">
              <Volume2 className="h-4.5 w-4.5 shrink-0" />
              Join the WhatsApp Channel
            </Button>
          </ChannelLink>

          <ChannelLink
            channel="discord"
            href={discordUrl}
            location="scan_me"
            className="block"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-xl gap-3 justify-center"
            >
              Join the Discord
            </Button>
          </ChannelLink>

          <Link href="/start" className="block">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-xl gap-3 justify-center"
            >
              Start the Library
            </Button>
          </Link>

          <a href={`mailto:${siteMetadata.email}`} className="block">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-xl gap-3 justify-center"
            >
              <Mail className="h-4.5 w-4.5 shrink-0" />
              {siteMetadata.email}
            </Button>
          </a>

          <div className="pt-4 flex justify-center">
            <SocialLinks
              instagram={siteMetadata.instagram}
              youtube={siteMetadata.youtube}
              facebook={siteMetadata.facebook}
              threads={siteMetadata.threads}
              linkedin={siteMetadata.linkedin}
              iconSize="md"
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
