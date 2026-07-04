import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import { genPageMetadata } from "@/app/seo";

export async function generateMetadata() {
  return genPageMetadata({
    title: "Temples & Traditions of the Himalayas",
    description:
      "A cultural archive of Himalayan temples, deities, fairs, and living beliefs — Kamrunag, Shikari Devi, Churdhar, Parashar and more. Understand the sacred grammar of the Pahari world before you travel.",
    alternates: { canonical: "/temples" },
  });
}

const TEMPLES = [
  {
    name: "Kamrunag",
    region: "Mandi",
    deity: "Dev Kamrunag, the rain god",
    belief:
      "Pilgrims offer gold and coins to the sacred lake, which are never taken back — an oath of the mountains kept for centuries.",
    etiquette: "Do not disturb the lake's offerings. Walk the last stretch in silence.",
    chapter: "/chapters/kamrunag-the-lake-of-oaths",
  },
  {
    name: "Shikari Devi",
    region: "Mandi",
    deity: "Shikari Devi, goddess of the hunt",
    belief:
      "The shrine famously has no roof — legend says every attempt to build one has failed, for the goddess wishes to sit under open sky and snow.",
    etiquette: "Carry your waste back down. The summit is a temple, not a viewpoint.",
    chapter: "/chapters/devidarh-shikari-devi",
  },
  {
    name: "Churdhar (Chureshwar Mahadev)",
    region: "Sirmaur",
    deity: "Lord Shiva, as Chureshwar",
    belief:
      "The highest peak of the outer Himalayas, believed to be where Shiva watches over the plains. Bilaspur and beyond are visible on a clear dawn.",
    etiquette: "Respect the cold and the climb. Begin early; the mountain turns quickly.",
    chapter: "/chapters/churdhar-sacred-ascent",
  },
  {
    name: "Parashar Rishi",
    region: "Mandi",
    deity: "Sage Parashar",
    belief:
      "A floating island drifts across the sacred lake, and no one has measured its true depth. The three-tiered pagoda temple is said to be carved from a single tree.",
    etiquette: "Do not swim or litter in the lake. It is worship, not recreation.",
    chapter: "/chapters/parashar-lake-trek",
  },
  {
    name: "Baga Sarahan (Bhima Kali line)",
    region: "Shimla",
    deity: "Local devtas of the Bashleo region",
    belief:
      "Village deities travel in palanquins between temples during fairs, carried by those they choose — the mountains govern themselves through their gods.",
    etiquette: "Ask before joining a fair procession. Never photograph a deity without consent.",
    chapter: "/chapters/baga-sarahan-bashleo-pass",
  },
  {
    name: "Forgotten village shrines",
    region: "Across the Lost Trails",
    deity: "Small gods of cedar and stone",
    belief:
      "Every village keeps a guardian at its edge — an orange flag, a bell, a stone under an old deodar. They keep the quiet grammar of the hills.",
    etiquette: "Bow, don't barge. Leave the shrine's small offerings untouched.",
    chapter: "/chapters/forgotten-shrine",
  },
];

export default function TemplesPage() {
  return (
    <div>
      <PageHero
        kicker="Temples & Traditions"
        title="The sacred grammar of the mountains."
        subtitle="In the Himalayas, gods are neighbours. Before you visit a temple, learn what it means to those who have kept it for centuries."
        image="/static/images/pages/temples.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            These are not attractions. They are living places of faith, governed
            by devtas, fairs, and rules older than any map. This archive grows as
            travellers and locals contribute what they know.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TEMPLES.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl border border-border/60 bg-card p-7 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] uppercase tracking-widest text-primary bg-primary/10 rounded-full px-3 py-1">
                  {t.region}
                </span>
              </div>
              <h2 className="text-2xl font-brandSerif font-medium mb-1">{t.name}</h2>
              <p className="text-sm text-primary/80 mb-4">{t.deity}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{t.belief}</p>
              <p className="text-sm text-foreground/70 border-l-2 border-primary/30 pl-4 italic mb-6">
                {t.etiquette}
              </p>
              <Link
                href={t.chapter}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Read the chapter →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contribute"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Know a temple's story? Contribute it to the archive →
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
