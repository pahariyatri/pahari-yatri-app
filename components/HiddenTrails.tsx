import { Button } from "./ui/button";
import Link from "./common/Link";
import SectionContainer from "./common/SectionContainer";
import Image from "./common/Image";

type Props = { id?: string };

const HIDDEN_LOCATIONS = [
    { name: "The Silent Valley", image: "/static/images/hidden-1.jpg", description: "Where the wind carries ancient prayers." },
    { name: "Monk's Cave", image: "/static/images/hidden-2.jpg", description: "A sanctuary carved by time and devotion." },
    { name: "The Forbidden Lake", image: "/static/images/hidden-3.jpg", description: "Reflecting the stars of a thousand nights." },
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {HIDDEN_LOCATIONS.map((location, index) => (
                        <div key={index} className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
                            <Image
                                src={location.image}
                                alt={location.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Blur Overlay */}
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-md group-hover:backdrop-blur-none group-hover:bg-black/40 transition-all duration-700 flex flex-col items-center justify-center p-6 text-center">
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                                    <h3 className="text-2xl font-brandSerif font-bold text-foreground group-hover:text-white mb-2 transition-colors">
                                        {location.name}
                                    </h3>
                                    <p className="text-muted-foreground group-hover:text-white/80 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {location.description}
                                    </p>
                                </div>
                                <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    <span className="text-white text-xs uppercase tracking-widest border-b border-white/50 pb-1">
                                        Discover
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/journeys">
                        <Button variant="outline" className="rounded-full px-8 py-6 border-primary/20 hover:bg-primary/5 text-foreground">
                            Explore All Hidden Trails
                        </Button>
                    </Link>
                </div>
            </div>
        </SectionContainer>
    );
}
