import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import siteMetadata from "@/data/siteMetadata";
import { markdownToHtml, demoteHeadings } from "@/lib/markdown";
import {
    getRegionSchema,
    getDestinationSchema,
    getPlaceSchema,
    getBlogPostingSchema
} from "@/lib/schema";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata({ params }: any) {
    const { slug } = await params;
    if (!slug || slug.length === 0) return {};

    const regionSlug = slug[0];
    const region = await reader.collections.regions.read(regionSlug);
    if (!region) return {};

    if (slug.length === 1) {
        return {
            title: region.title,
            description: region.description,
            openGraph: {
                title: region.title,
                description: region.description,
                images: [region.heroImage || ""],
            }
        };
    }

    if (slug.length === 3) {
        const type = slug[1];
        const itemSlug = slug[2];

        if (type === "travel-guide") {
            const dest = await reader.collections.destinations.read(itemSlug);
            if (dest) return { title: `${dest.title} Travel Guide | ${region.title}`, description: dest.description };
        }
        if (type === "places") {
            const place = await reader.collections.places.read(itemSlug);
            if (place) return { title: `${place.title} | Places in ${region.title}`, description: place.description };
        }
        if (type === "stories") {
            const story = await reader.collections.stories.read(itemSlug);
            if (story) return { title: story.title, description: story.excerpt };
        }
    }

    return {};
}

import Image from "@/components/common/Image";
import Link from "next/link";
import SectionContainer from "@/components/common/SectionContainer";
import { ChevronRight, MapPin, Sparkles } from "lucide-react";

// Helper for Breadcrumbs. `href: null` renders a plain, non-clickable crumb —
// used for the "Guides"/"Places"/"Stories" middle crumb, which has no real
// page behind it yet (see Batch 7 in PAHARI_YATRI_SEO_REFACTOR_REPORT.md).
function Breadcrumbs({ items }: { items: { label: string, href: string | null }[] }) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground/60 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            {items.map((item, i) => (
                <div key={item.label} className="flex items-center">
                    {i > 0 && <ChevronRight className="w-3 h-3 mx-2 opacity-30" />}
                    {item.href ? (
                        <Link href={item.href} className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">
                            {item.label}
                        </Link>
                    ) : (
                        <span>{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}

export default async function Page({ params }: any) {
    const { slug } = await params;
    if (!slug || slug.length === 0) notFound();

    const regionSlug = slug[0];
    const region = await reader.collections.regions.read(regionSlug);
    if (!region) notFound();

    const siteUrl = siteMetadata.siteUrl;

    // 1. Region Page
    if (slug.length === 1) {
        const jsonLd = getRegionSchema({ ...region, slug: regionSlug }, siteUrl);
        const breadcrumbItems = [{ label: "Home", href: "/" }, { label: region.title, href: `/${regionSlug}` }];

        // Fetch children for navigation
        const destinations = (await reader.collections.destinations.all()).filter(d => d.entry.parentRegion === regionSlug);
        const places = (await reader.collections.places.all()).filter(p => p.entry.parentRegion === regionSlug);

        return (
            <main className="min-h-screen bg-background text-foreground">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                {/* Hero - Mobile First Optimized */}
                <div className="relative h-[65vh] md:h-[85vh] flex items-end overflow-hidden pt-40 md:pt-32">
                    <Image
                        src={region.heroImage || "/static/images/placeholder.jpg"}
                        alt={region.title}
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <SectionContainer className="relative z-10 pb-16 md:pb-24">
                        <div className="mb-12">
                            <Breadcrumbs items={breadcrumbItems} />
                        </div>
                        <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-brandSerif tracking-tighter leading-[0.9] mb-8 max-w-[90%]">
                            {region.title}
                        </h1>
                        <div className="border-l border-primary/30 pl-8 py-3">
                            <p className="text-lg md:text-xl font-light text-muted-foreground/90 max-w-2xl leading-relaxed">
                                {region.description}
                            </p>
                        </div>
                    </SectionContainer>
                </div>

                <SectionContainer className="py-16 md:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                        <div className="md:col-span-8">
                            <div className="prose prose-lg md:prose-2xl dark:prose-invert font-brandSerif mb-12">
                                <div data-rag-chunk="true">
                                    <p>{region.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Bridge - Responsive Layout */}
                        <div className="md:col-span-4 space-y-16">
                            <div className="relative p-8 rounded-3xl border border-border bg-muted/30">
                                <div className="absolute -top-4 left-6 px-4 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold rounded-full">
                                    Explore {region.title}
                                </div>
                                <div className="space-y-12">
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-muted-foreground">Detailed Guides</h4>
                                        <div className="grid grid-cols-1 gap-6">
                                            {destinations.map(d => (
                                                <Link key={d.slug} href={`/${regionSlug}/travel-guide/${d.slug}`} className="group block">
                                                    <span className="text-xl font-brandSerif group-hover:text-primary transition-colors flex items-center justify-between">
                                                        {d.entry.title}
                                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                    </span>
                                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{d.entry.description}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-muted-foreground">Entity Nodes</h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            {places.map(p => (
                                                <Link key={p.slug} href={`/${regionSlug}/places/${p.slug}`} className="flex items-center gap-4 group">
                                                    <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                                                        <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                                    </div>
                                                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{p.entry.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionContainer>
            </main>
        );
    }

    // 2. Hierarchical Pages (Travel Guide / Places / Stories)
    if (slug.length === 3) {
        const type = slug[1];
        const itemSlug = slug[2];
        const breadcrumbItems = [
            { label: "Home", href: "/" },
            { label: region.title, href: `/${regionSlug}` },
            { label: type === "travel-guide" ? "Guides" : type === "places" ? "Places" : "Stories", href: null }
        ];

        if (type === "travel-guide") {
            const dest = await reader.collections.destinations.read(itemSlug);
            if (!dest || dest.parentRegion !== regionSlug) notFound();

            let contentHtml = "";
            try {
                if (typeof dest.content === "function") {
                    const raw = await dest.content();
                    const rawStr = typeof raw === "string" ? raw : String(raw ?? "");
                    contentHtml = rawStr ? demoteHeadings(markdownToHtml(rawStr)) : "";
                }
            } catch (e) { }

            const jsonLd = getDestinationSchema({ ...dest, slug: itemSlug }, region, siteUrl);
            return (
                <main className="min-h-screen">
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                    <div className="relative h-[55vh] md:h-[75vh] flex items-end overflow-hidden pt-40 md:pt-32">
                        <Image src={dest.image || "/static/images/placeholder.jpg"} alt={dest.title} fill className="object-cover scale-105" />
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/40 to-transparent" />
                        <SectionContainer className="relative pb-16">
                            <div className="mb-10">
                                <Breadcrumbs items={[...breadcrumbItems, { label: dest.title, href: `/${regionSlug}/travel-guide/${itemSlug}` }]} />
                            </div>
                            <h1 className="text-[clamp(3rem,9vw,6.5rem)] font-brandSerif mb-6 tracking-tighter leading-[0.9] max-w-4xl">
                                {dest.title}
                            </h1>
                            <div className="flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-primary bg-primary/5 w-fit px-4 py-2 rounded-full border border-primary/10">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                <span>Official Guide Hub</span>
                            </div>
                        </SectionContainer>
                    </div>

                    <SectionContainer className="py-16 md:py-24 max-w-4xl">
                        <div className="prose prose-xl md:prose-2xl dark:prose-invert font-brandSerif mb-12 border-l-4 border-primary/20 pl-8">
                            <p className="leading-relaxed text-muted-foreground">{dest.description}</p>
                        </div>

                        <div className="prose prose-lg md:prose-xl dark:prose-invert font-sans mt-12">
                            {contentHtml && <div dangerouslySetInnerHTML={{ __html: contentHtml }} />}
                        </div>
                    </SectionContainer>
                </main>
            );
        }

        if (type === "places") {
            const place = await reader.collections.places.read(itemSlug);
            if (!place || place.parentRegion !== regionSlug) notFound();

            const jsonLd = getPlaceSchema({ ...place, slug: itemSlug }, region, siteUrl);
            return (
                <main className="min-h-screen">
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                    <div className="relative h-[50vh] md:h-[60vh] bg-muted/30 border-b border-border/50 overflow-hidden pt-40 md:pt-32">
                        {place.image && <Image src={place.image} alt={place.title} fill className="object-cover opacity-70 scale-110 blur-[2px] md:blur-none" />}
                        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/60 to-transparent" />
                        <SectionContainer className="relative h-full flex flex-col justify-end pb-16">
                            <div className="mb-10">
                                <Breadcrumbs items={[...breadcrumbItems, { label: place.title, href: `/${regionSlug}/places/${itemSlug}` }]} />
                            </div>
                            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-brandSerif flex items-center gap-4 tracking-tighter leading-[0.9] max-w-3xl text-balance">
                                {place.title}
                            </h1>
                        </SectionContainer>
                    </div>

                    <SectionContainer className="py-16 md:py-24 max-w-3xl">
                        <div className="space-y-16">
                            <div className="prose prose-xl md:prose-2xl dark:prose-invert font-brandSerif">
                                <p className="leading-relaxed opacity-90">{place.description}</p>
                                {place.coordinates && (
                                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mt-12 border border-primary/20">
                                        <MapPin className="w-4 h-4" />
                                        Point: {place.coordinates}
                                    </div>
                                )}
                            </div>
                        </div>
                    </SectionContainer>
                </main>
            );
        }

        if (type === "stories") {
            const story = await reader.collections.stories.read(itemSlug);
            if (!story || (story as any).parentRegion !== regionSlug) notFound();

            const jsonLd = getBlogPostingSchema({ ...story, slug: itemSlug }, region, siteUrl);
            return (
                <main className="min-h-screen">
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                    <SectionContainer className="py-20 md:py-32 max-w-4xl">
                        <Breadcrumbs items={[...breadcrumbItems, { label: story.title, href: `/${regionSlug}/stories/${itemSlug}` }]} />
                        <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-brandSerif mb-10 tracking-tight leading-[1.1]">{story.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-16 px-4 py-2 border border-border rounded-full w-fit">
                            <span className="text-primary italic">Pahari Yatri Original</span>
                            <span className="opacity-30">|</span>
                            <span>Lived Reality</span>
                        </div>
                        <div className="prose prose-xl md:prose-2xl dark:prose-invert font-brandSerif mb-16 opacity-80 border-l-2 border-primary/30 pl-8">
                            <p className="italic leading-relaxed">&quot;{story.excerpt}&quot;</p>
                        </div>
                    </SectionContainer>
                </main>
            );
        }
    }

    notFound();
}

export async function generateStaticParams() {
    const regions = await reader.collections.regions.list();
    const destinations = await reader.collections.destinations.all();
    const places = await reader.collections.places.all();

    const paths: { slug: string[] }[] = [];

    regions.forEach(r => {
        paths.push({ slug: [r] });
    });

    destinations.forEach(d => {
        paths.push({ slug: [d.entry.parentRegion, "travel-guide", d.slug] });
    });

    places.forEach(p => {
        paths.push({ slug: [p.entry.parentRegion, "places", p.slug] });
    });

    // Stories are deliberately not prerendered here. /{region}/stories/{slug}
    // now 301s to the canonical /stories/{slug} (see next.config.mjs), so
    // building these would only produce pages nothing can reach.

    return paths;
}
