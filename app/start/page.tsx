import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import siteMetadata from "@/data/siteMetadata";
import { genPageMetadata } from "@/app/seo";
import SectionContainer from "@/components/common/SectionContainer";
import ResponsiveImage from "@/components/common/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { StartLink, PortalBridgeLink } from "./start-links";

const reader = createReader(process.cwd(), keystaticConfig);

/**
 * /start — the orientation page.
 *
 * Every cold arrival (Instagram bio link, the printed QR on /scan-me, a
 * brand-name search) currently lands on the homepage, which is written for
 * people who already know what this is. GA4 shows the cost of that: 83 users
 * and 7 chapter reads in 28 days. This page has one job — get a stranger from
 * "what is this" to an open chapter — and `start_page_click` reports which
 * section actually does it.
 *
 * Server component on purpose: headings, copy, chapter links and schema all
 * need to be in the HTML without waiting on client JS. Only the tracked links
 * are client-side.
 */

const FEATURED_BOOK_SLUG = "parvati-valley-beyond-kasol";

// Verified against data/chapters/ before being listed here. A named place with
// no standalone chapter is omitted rather than linked to something close —
// shipping a 404 from the page built to welcome strangers is the one failure
// this page cannot afford.
const POPULAR_CHAPTER_SLUGS = [
    "kasol-weekend",
    "tosh-village-above-the-valley",
    "kalga-slow-mountain-life",
    "pulga-forests-and-silence",
    "kheerganga-buni-buni-pass",
    "grahan-protects-its-traditions",
    "kamrunag-the-lake-of-oaths",
    "parashar-lake-trek",
] as const;

// The portal is a separate property with a separate job. `utm_medium=bridge`
// keeps this out of Instagram Reel attribution; `utm_campaign` is per-page so
// later bridges (a chapter, the Yatri Code) don't collide with this one.
const PORTAL_CAMPAIGN = "start-page";
const PORTAL_URL =
    "https://app.pahariyatri.com/en" +
    "?utm_source=pahariyatri-site" +
    "&utm_medium=bridge" +
    `&utm_campaign=${PORTAL_CAMPAIGN}` +
    "&utm_content=plan-your-journey-cta";

const WHY_POINTS = [
    {
        title: "Places, not destinations",
        body: "Every chapter is about one real place with a name, people and rules. Not a list, not a ranking, not somewhere to tick off.",
    },
    {
        title: "Local truth over scenery",
        body: "The part a visitor would not know: what a village runs on, what a temple asks of you, why a lake is treated the way it is.",
    },
    {
        title: "Claims are hedged, not embellished",
        body: "Cultural and devta claims are marked as local belief until a named local source confirms them. Where we do not know, we say so.",
    },
    {
        title: "Understand before you arrive",
        body: "Reading first changes how you behave when you get there. That is the whole argument of this library.",
    },
];

export async function generateMetadata() {
    return genPageMetadata({
        title: "Start Here — Where to Begin in the Himalayas",
        description:
            "New to Pahari Yatri? Start here: the Parvati Valley book, the chapters yatris actually read, and how to travel Himachal with local context instead of guesswork.",
        alternates: { canonical: "/start" },
    });
}

export default async function StartPage() {
    const [book, chapters] = await Promise.all([
        reader.collections.books.read(FEATURED_BOOK_SLUG),
        Promise.all(
            POPULAR_CHAPTER_SLUGS.map(async (slug) => {
                const entry = await reader.collections.chapters.read(slug);
                return entry ? { slug, entry } : null;
            })
        ),
    ]);

    // A slug that has been renamed or unpublished drops out silently rather
    // than rendering a dead card.
    type PopularChapter = NonNullable<(typeof chapters)[number]>;
    const popular: PopularChapter[] = chapters.filter(
        (c): c is PopularChapter => c !== null
    );

    const siteUrl = siteMetadata.siteUrl;

    const ld = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${siteUrl}/start`,
            url: `${siteUrl}/start`,
            name: "Start Here — Where to Begin in the Himalayas",
            description:
                "An orientation page for readers new to Pahari Yatri: the featured book, the most-read chapters, and what this Himalayan library is for.",
            isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl },
            inLanguage: "en",
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Pahari Yatri", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Start Here", item: `${siteUrl}/start` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Chapters to start with",
            itemListElement: popular.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.entry.title,
                url: `${siteUrl}/chapters/${c.slug}`,
            })),
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            />

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <SectionContainer className="pt-24 md:pt-32 pb-4">
                <div className="max-w-2xl">
                    <p className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">
                        Start Here
                    </p>
                    <h1 className="text-4xl md:text-6xl font-brandSerif font-bold text-foreground leading-[1.05] mb-6">
                        Where to begin with the Himalayas.
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                        You have arrived from a Reel, a search, or a printed code. This is the
                        short version of what Pahari Yatri is: a Himalayan library organised as
                        books, chapters and the stories of people who live in these valleys.
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Yatri, not tourist. Read a place first. Then decide whether to go.
                    </p>
                </div>
            </SectionContainer>

            {/* ── Featured book ────────────────────────────────────────── */}
            <SectionContainer className="py-12 md:py-16">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-6">
                    Start with this book
                </p>
                <StartLink
                    href={`/books/${FEATURED_BOOK_SLUG}`}
                    section="featured_book"
                    label={book?.title ?? FEATURED_BOOK_SLUG}
                    pageTurn
                    className="group grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-center rounded-2xl border border-border/40 bg-card/40 p-5 md:p-7 transition-colors hover:border-primary/40"
                >
                    <ResponsiveImage
                        src={
                            book?.coverImage ??
                            "/static/images/books/parvati-valley-beyond-kasol/coverImage.jpg"
                        }
                        alt={book?.title ?? "Parvati Valley, Beyond Kasol"}
                        aspectRatio="4:3"
                        rounded="lg"
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div>
                        <h2 className="text-2xl md:text-4xl font-brandSerif font-bold text-foreground mb-4">
                            {book?.title ?? "Parvati Valley, Beyond Kasol"}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-5">
                            {book?.excerpt ??
                                "Villages, trails, people and stories beyond the famous gateway."}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary">
                            Open the book
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                &rarr;
                            </span>
                        </span>
                    </div>
                </StartLink>
            </SectionContainer>

            {/* ── Popular chapters ─────────────────────────────────────── */}
            <SectionContainer className="py-12 md:py-16">
                <div className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">
                        Chapters to start with
                    </p>
                    <h2 className="text-2xl md:text-4xl font-brandSerif font-bold text-foreground">
                        Eight places, eight different sets of rules.
                    </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {popular.map(({ slug, entry }) => (
                        <StartLink
                            key={slug}
                            href={`/chapters/${slug}`}
                            section="popular_chapter"
                            label={entry.title}
                            pageTurn
                            className="group block rounded-xl overflow-hidden border border-border/40 bg-card/40 transition-colors hover:border-primary/40"
                        >
                            <ResponsiveImage
                                src={entry.image ?? "/static/images/himalaya-fallback.jpg"}
                                alt={entry.title}
                                aspectRatio="3:2"
                                rounded="none"
                                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                                className="transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="p-4">
                                {entry.location && (
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                                        {entry.location}
                                    </p>
                                )}
                                <h3 className="text-base font-brandSerif font-medium text-foreground leading-snug transition-colors group-hover:text-primary">
                                    {entry.title}
                                </h3>
                            </div>
                        </StartLink>
                    ))}
                </div>

                <div className="mt-10">
                    <StartLink
                        href="/chapters"
                        section="popular_chapter"
                        label="All chapters"
                        className="inline-flex"
                    >
                        <Button
                            variant="outline"
                            className="rounded-full px-7 py-5 border-primary/20 hover:bg-primary/5 text-foreground"
                        >
                            Read every chapter
                        </Button>
                    </StartLink>
                </div>
            </SectionContainer>

            {/* ── Why Pahari Yatri ─────────────────────────────────────── */}
            <SectionContainer className="py-12 md:py-16">
                <div className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">
                        Why Pahari Yatri
                    </p>
                    <h2 className="text-2xl md:text-4xl font-brandSerif font-bold text-foreground">
                        Sacred, not scenic.
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {WHY_POINTS.map((p) => (
                        <div
                            key={p.title}
                            className="rounded-xl border border-border/40 bg-card/40 p-5"
                        >
                            <h3 className="text-lg font-brandSerif font-medium text-foreground mb-2">
                                {p.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {p.body}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <StartLink
                        href="/why-pahari-yatri"
                        section="why_pahari_yatri"
                        label="Why Pahari Yatri"
                        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary"
                    >
                        The longer answer
                        <span aria-hidden>&rarr;</span>
                    </StartLink>
                </div>
            </SectionContainer>

            {/* ── Plan your journey — the soft bridge to the portal ─────
                Copy reviewed by portal-brand-bridge-editor. Deliberately does
                NOT use the word "verified": CLAUDE.md forbids a verification
                claim without a real verification process behind it, and that
                process has not been confirmed. See docs/growth/. */}
            <SectionContainer className="py-12 md:py-16">
                <div className="rounded-2xl border border-border/40 bg-card/40 p-6 md:p-10">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">
                        When you&rsquo;re ready
                    </p>
                    <h2 className="text-2xl md:text-4xl font-brandSerif font-bold text-foreground mb-5">
                        Plan your journey.
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
                        A chapter helps you understand a place. Planning the trip is a separate
                        step, for whenever you get there. When you do, our local travel platform
                        can connect you with partners across Himachal &mdash; homestays, guides and
                        taxis run by people who actually know these routes.
                    </p>
                    <PortalBridgeLink
                        href={PORTAL_URL}
                        campaign={PORTAL_CAMPAIGN}
                        className="inline-flex"
                    >
                        <Button className="rounded-full px-8 py-6">Request local options</Button>
                    </PortalBridgeLink>
                    <p className="mt-4 text-xs text-muted-foreground">
                        This continues on app.pahariyatri.com &mdash; a separate site Pahari Yatri
                        built for practical trip planning, not more stories.
                    </p>
                </div>
            </SectionContainer>

            {/* ── Join the community ───────────────────────────────────── */}
            <SectionContainer className="py-12 md:py-20">
                <div className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">
                        The Yatri Circle
                    </p>
                    <h2 className="text-2xl md:text-4xl font-brandSerif font-bold text-foreground mb-5">
                        Walk with people who read first.
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                        The Yatri Circle is where new chapters go out, where locals and creators
                        send in what we got wrong, and where the next book gets argued about. No
                        schedule to keep up with. Join when you want to be part of the reading,
                        not the marketing list.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <StartLink
                        href="/apply"
                        section="community"
                        label="Join the Yatri Circle"
                        className="inline-flex"
                    >
                        <Button className="rounded-full px-8 py-6">Join the Yatri Circle</Button>
                    </StartLink>
                    <StartLink
                        href="/community"
                        section="community"
                        label="See the community"
                        className="inline-flex"
                    >
                        <Button
                            variant="outline"
                            className="rounded-full px-8 py-6 border-primary/20 hover:bg-primary/5 text-foreground"
                        >
                            See what the community does
                        </Button>
                    </StartLink>
                </div>
            </SectionContainer>
        </>
    );
}
