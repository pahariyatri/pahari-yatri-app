import Link from "@/components/common/Link";
import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import { genPageMetadata } from "@/app/seo";

export async function generateMetadata() {
  return genPageMetadata({
    title: "Himalayan Folklore — Myths & Legends of the Pahari World",
    description:
      "The myths, legends, and village beliefs of the Himalayas — floating islands, roofless shrines, oaths kept by sacred lakes, and the small gods of cedar and stone. Folklore from Himachal, told with respect.",
    alternates: { canonical: "/folklore" },
  });
}

const TALES = [
  {
    title: "The Lake That Keeps Oaths",
    region: "Kamrunag, Mandi",
    type: "Legend",
    body: "For centuries, pilgrims have thrown gold and silver into the small lake at Kamrunag. No one takes it back. The mountain, they say, holds every promise ever made to it — and returns nothing but rain.",
    chapter: "/chapters/kamrunag-the-lake-of-oaths",
  },
  {
    title: "The Shrine the Sky Refused to Cover",
    region: "Shikari Devi, Mandi",
    type: "Myth",
    body: "Every roof built over the goddess Shikari Devi has fallen or failed. The devi, the elders say, will not be shut away from her snow and her open sky. And so the shrine sits roofless to this day.",
    chapter: "/chapters/devidarh-shikari-devi",
  },
  {
    title: "The Island That Drifts",
    region: "Parashar, Mandi",
    type: "Legend",
    body: "On Parashar's sacred lake floats an island of grass that moves on its own, and no one has found its bottom. Sage Parashar meditated here; the mountain still keeps his stillness.",
    chapter: "/chapters/parashar-lake-trek",
  },
  {
    title: "The Small God at the Village Edge",
    region: "Across the Lost Trails",
    type: "Village belief",
    body: "An orange flag, a bell, a stone beneath an old deodar — every village keeps a guardian at its threshold. Bow as you pass, and the hill agrees to keep you.",
    chapter: "/chapters/forgotten-shrine",
  },
  {
    title: "The Caves That Answer Back",
    region: "Sirmaur",
    type: "Folk tale",
    body: "In the echoing caves, they say the stone returns the voice you bring to it — a whisper for a whisper, a shout for a shout. Speak kindly, and the mountain remembers you kindly.",
    chapter: "/chapters/echoing-caves",
  },
  {
    title: "The Palanquin That Chooses Its Bearers",
    region: "Bashleo, Shimla",
    type: "Living tradition",
    body: "During the fairs, village devtas travel in palanquins — and it is the deity, not the men, who decides who carries them and where they will go. The gods govern the valleys still.",
    chapter: "/chapters/baga-sarahan-bashleo-pass",
  },
];

export default function FolklorePage() {
  return (
    <div>
      <PageHero
        kicker="Folklore"
        title="The stories the mountains tell about themselves."
        subtitle="Passed down village to village, fire to fire — the myths that explain why a lake keeps oaths and a shrine refuses a roof."
        image="/static/images/pages/folklore.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            Folklore is how the Himalayas remember. These tales are not
            decoration — they are the operating instructions of the mountains,
            told by the people who live inside them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TALES.map((t) => (
            <article
              key={t.title}
              className="rounded-2xl border border-border/60 bg-card p-7 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] uppercase tracking-widest text-primary bg-primary/10 rounded-full px-3 py-1">
                  {t.type}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground/70">
                  {t.region}
                </span>
              </div>
              <h2 className="text-2xl font-brandSerif font-medium mb-3">{t.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t.body}</p>
              <Link
                href={t.chapter}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Walk the chapter →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contribute"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Heard a tale worth keeping? Contribute it →
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
