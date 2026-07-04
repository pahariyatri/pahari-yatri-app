import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import { genPageMetadata } from "@/app/seo";

export async function generateMetadata() {
  return genPageMetadata({
    title: "The Journal: Reflections on Slow Himalayan Travel",
    description:
      "Essays and reflections on slow travel, seasons, temples, and the philosophy of walking the Himalayas well. The thinking behind the Pahari Yatri movement.",
    alternates: { canonical: "/journal" },
  });
}

const ENTRIES = [
  {
    kicker: "On walking well",
    title: "Why we walk slowly",
    body: "One valley understood is worth ten photographed. A reflection on trading the checklist for the conversation, and the checklist's quiet cost.",
    href: "/responsible-travel",
    cta: "Read the Yatri Code",
  },
  {
    kicker: "On the seasons",
    title: "Four books, four moods of the mountain",
    body: "Summer light, Monsoon mist, Winter silence, and the Lost Trails maps forgot. Why we organise the library by season, not by difficulty.",
    href: "/books",
    cta: "Open the editions",
  },
  {
    kicker: "On the sacred",
    title: "Gods as neighbours",
    body: "In the Himalayas, deities travel in palanquins and lakes keep oaths. What it means to visit a temple that is not, and never was, a viewpoint.",
    href: "/temples",
    cta: "Enter the archive",
  },
  {
    kicker: "On listening",
    title: "The voices of the trail",
    body: "The best guides to a mountain are the people who live inside it. Reading the stories travellers and locals have left behind.",
    href: "/stories",
    cta: "Read the stories",
  },
];

export default function JournalPage() {
  return (
    <div>
      <PageHero
        kicker="The Journal"
        title="The thinking behind the walking."
        subtitle="Essays and reflections on slow travel, seasons, and the philosophy of experiencing the Himalayas with respect."
        image="/static/images/pages/journal.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto space-y-4">
          {ENTRIES.map((e) => (
            <Link
              key={e.title}
              href={e.href}
              className="group block rounded-2xl border border-border/60 bg-card p-8 transition-colors hover:border-primary/40"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-primary/80">
                {e.kicker}
              </span>
              <h2 className="mt-2 text-2xl font-brandSerif font-medium group-hover:text-primary transition-colors">
                {e.title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{e.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {e.cta} →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-muted-foreground/70">
          More reflections are written each season.{" "}
          <Link
            href="/contribute"
            className="text-primary underline-offset-4 hover:underline"
          >
            Contribute yours →
          </Link>
        </p>
      </SectionContainer>
    </div>
  );
}
