import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import { Button } from "@/components/ui/button";
import { genPageMetadata } from "@/app/seo";

export async function generateMetadata() {
  return genPageMetadata({
    title: "Responsible Travel — The Yatri Code",
    description:
      "How to travel the Himalayas responsibly: respect local people and temples, travel slowly, support homestays, carry back your waste, and understand mountain risk. The Pahari Yatri code for walking softly.",
    alternates: { canonical: "/responsible-travel" },
  });
}

const CODE = [
  {
    n: "01",
    title: "Walk softly",
    body: "Move at the pace of the place. Lower your voice near shrines and villages. The mountains reward those who slow down.",
  },
  {
    n: "02",
    title: "Learn before you arrive",
    body: "Read the trail, its people, and its weather first. A little knowledge is the deepest form of respect.",
  },
  {
    n: "03",
    title: "Respect local people",
    body: "Ask before photographing faces or homes. Buy from the village, not the chain. Learn one word of the local tongue.",
  },
  {
    n: "04",
    title: "Honour the temples",
    body: "Sacred places are not photo spots. Follow local etiquette, remove shoes where asked, and give the gods their quiet.",
  },
  {
    n: "05",
    title: "Carry back what you carry in",
    body: "Leave no trace but footprints. Pack out every wrapper. The trail should be a little more sacred for your having passed.",
  },
  {
    n: "06",
    title: "Stay longer, rush less",
    body: "One valley understood is worth ten photographed. Trade the checklist for a conversation by the fire.",
  },
  {
    n: "07",
    title: "Support local homes",
    body: "Choose homestays over chains. Your night's stay keeps a family in the mountains and a tradition alive.",
  },
  {
    n: "08",
    title: "Understand the mountain",
    body: "Respect weather, altitude, and risk. The Himalayas are generous, but they do not forgive carelessness.",
  },
];

export default function ResponsibleTravelPage() {
  return (
    <div>
      <PageHero
        kicker="Responsible Travel"
        title="How to walk as a Yatri."
        subtitle="Eight quiet promises — to the mountains, the villages, the temples, and yourself."
        image="/static/images/pages/responsible.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light">
            The Himalayas are not scenery to be consumed. They are living
            landscapes of memory, faith, weather, and people. To travel here well
            is to listen first — and to leave the mountain as you found it, a
            little more whole.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10 max-w-4xl mx-auto">
          {CODE.map((c) => (
            <div key={c.n} className="flex gap-5">
              <span className="text-2xl font-brandSerif text-primary/50 leading-none pt-1">
                {c.n}
              </span>
              <div>
                <h2 className="text-xl font-brandSerif font-medium mb-2">
                  {c.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center max-w-2xl mx-auto">
          <div className="w-12 h-px bg-primary/30 mx-auto mb-10" />
          <h2 className="text-2xl sm:text-3xl font-brandSerif font-medium mb-5">
            Carry the code with you.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The Yatri Code is not a rulebook — it is a way of walking. Read the
            trail journals to see it in practice, or become part of the movement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/books">
              <Button size="lg" className="rounded-full px-8 py-6">
                Read the trail journals
              </Button>
            </Link>
            <Link
              href="/community"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
            >
              Join the community
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
