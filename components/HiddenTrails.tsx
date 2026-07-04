import { Button } from "./ui/button";
import Link from "./common/Link";
import SectionContainer from "./common/SectionContainer";
import Image from "./common/Image";

type Props = { id?: string };

const HIDDEN_LOCATIONS = [
    {
        name: "The Forgotten Shrine",
        image: "/static/images/himalaya-fallback.jpg",
        region: "Mandi · Lost Trails",
        season: "Monsoon",
        description: "Where a small god still keeps the village's quiet grammar.",
        href: "/chapters/forgotten-shrine",
    },
    {
        name: "The Echoing Caves",
        image: "/static/images/trail-night-peaks.jpg",
        region: "Sirmaur · Lost Trails",
        season: "Winter",
        description: "Stone corridors that answer the voice you bring to them.",
        href: "/chapters/echoing-caves",
    },
    {
        name: "Mist Valleys",
        image: "/static/images/trail-alpine-lake.jpg",
        region: "Kullu · Lost Trails",
        season: "Monsoon",
        description: "Cloud forests where the path dissolves and the mind clears.",
        href: "/chapters/mist-valleys",
    },
];

export default function HiddenTrails({ id }: Props) {
    return (
        <SectionContainer id={id} className="py-24 md:py-32 bg-muted/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                        For the Seekers
                    </span>
                    <h2 className="text-3xl md:text-5xl font-brandSerif font-bold text-foreground mb-6">
                        Secret Valleys. Forgotten Trails.
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                        Beyond the maps, where only a Yatri knows the way.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {HIDDEN_LOCATIONS.map((location, index) => (
                        <Link
                            key={index}
                            href={location.href}
                            className="group relative h-[26rem] rounded-2xl overflow-hidden block"
                        >
                            <Image
                                src={location.image}
                                alt={location.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Readable gradient scrim — content always legible, no blur-gate */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                                        {location.region}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/80 border border-white/25 rounded-full px-2.5 py-1">
                                        {location.season}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-brandSerif font-medium text-white mb-2">
                                    {location.name}
                                </h3>
                                <p className="text-white/75 text-sm font-light leading-relaxed mb-4">
                                    {location.description}
                                </p>
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">
                                    Read the Chapter
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/books">
                        <Button variant="outline" className="rounded-full px-8 py-6 border-primary/20 hover:bg-primary/5 text-foreground">
                            Open the full Library
                        </Button>
                    </Link>
                </div>
            </div>
        </SectionContainer>
    );
}
