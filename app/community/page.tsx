import Link from "@/components/common/Link";
import YatriCircleLink from "@/components/common/YatriCircleLink";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import { genPageMetadata } from "@/app/seo";
import { Compass, PenLine, Leaf } from "lucide-react";

export async function generateMetadata() {
  return genPageMetadata({
    title: "The Community: Become a Pahari Yatri",
    description:
      "Pahari Yatri is a slow, intentional community of people learning to travel the Himalayas with respect, awareness, and story. Join the movement, free to belong and deep to walk.",
    alternates: { canonical: "/community" },
  });
}

const WAYS = [
  {
    icon: Compass,
    title: "Learn before you travel",
    body: "Read the trail journals, the temple archive, and the Yatri Code. Arrive already knowing how to walk well.",
  },
  {
    icon: PenLine,
    title: "Share what you know",
    body: "A trail, a village kindness, a temple bell. Your story becomes a chapter others learn from.",
  },
  {
    icon: Leaf,
    title: "Walk with awareness",
    body: "Travel slowly, support local homes, and leave the mountain more sacred than you found it.",
  },
];

export default function CommunityPage() {
  return (
    <div>
      <PageHero
        kicker="The Movement"
        title="Not a trip. A way of walking."
        subtitle="Pahari Yatri is a slow, intentional community for people who want to understand the Himalayas, not just visit them."
        image="/static/images/pages/community.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-brandSerif font-medium mb-6 leading-tight">
            We are Yatris, not tourists.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            A Yatri travels to learn, not to collect. To listen, not to consume.
            To belong to the mountains for a while, and to carry their lessons
            back down. There is no fee to belong, only a way of moving through
            the world.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          {WAYS.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-border/60 bg-card p-7 text-center"
            >
              <w.icon className="w-6 h-6 text-primary mx-auto mb-5" strokeWidth={1.5} />
              <h3 className="text-lg font-brandSerif font-medium mb-2">{w.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <div className="w-12 h-px bg-primary/30 mx-auto mb-10" />
          <h2 className="text-2xl sm:text-3xl font-brandSerif font-medium mb-5">
            Walk with us.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Tell us your intention and become part of the circle, or add your
            voice to the library by contributing a story.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <YatriCircleLink location="community" label="Become a Yatri">
              <Button size="lg" className="rounded-full px-8 py-6">
                Become a Yatri
              </Button>
            </YatriCircleLink>
            <Link href="/contribute">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6"
              >
                Contribute a story
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
