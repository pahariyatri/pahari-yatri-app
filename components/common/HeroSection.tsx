import Image from "@/components/common/Image";
import SectionContainer from "@/components/common/SectionContainer";
import { Sparkles } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface HeroSectionProps {
    title: string;
    description?: string;
    image: string;
    breadcrumbs: BreadcrumbItem[];
    badge?: {
        icon?: React.ReactNode;
        text: string;
    };
    variant?: "region" | "destination" | "place" | "story";
    children?: React.ReactNode;
}

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground/60 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide" aria-label="Breadcrumb">
            {items.map((item, i) => (
                <div key={item.href} className="flex items-center">
                    {i > 0 && <span className="mx-2 opacity-30">/</span>}
                    <a href={item.href} className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">
                        {item.label}
                    </a>
                </div>
            ))}
        </nav>
    );
}

export default function HeroSection({
    title,
    description,
    image,
    breadcrumbs,
    badge,
    variant = "region",
    children
}: HeroSectionProps) {
    const heightClasses = {
        region: "h-[65vh] md:h-[85vh]",
        destination: "h-[55vh] md:h-[75vh]",
        place: "h-[50vh] md:h-[60vh]",
        story: "h-[45vh] md:h-[65vh]"
    };

    const titleSizes = {
        region: "text-[clamp(2.5rem,10vw,7rem)]",
        destination: "text-[clamp(3rem,9vw,6.5rem)]",
        place: "text-[clamp(2.5rem,7vw,5rem)]",
        story: "text-[clamp(2.5rem,7vw,5.5rem)]"
    };

    const gradientIntensity = {
        region: "from-background via-background/20 to-transparent",
        destination: "from-background via-background/40 to-transparent",
        place: "from-background via-background/60 to-transparent",
        story: "from-background via-transparent to-transparent"
    };

    return (
        <div className={`relative ${heightClasses[variant]} flex items-end overflow-hidden pt-40 md:pt-32`}>
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover scale-105"
                priority={variant === "region"}
                sizes="100vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${gradientIntensity[variant]}`} />
            <SectionContainer className="relative z-10 pb-16 md:pb-24">
                <div className="mb-12">
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <h1 className={`${titleSizes[variant]} font-brandSerif tracking-tighter leading-[0.9] mb-8 max-w-[90%]`}>
                    {title}
                </h1>
                {description && (
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 border-l border-primary/30 pl-8 py-3">
                        <p className="text-lg md:text-xl font-light text-muted-foreground/90 max-w-2xl leading-relaxed">
                            {description}
                        </p>
                        {children}
                    </div>
                )}
                {badge && (
                    <div className="flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-primary bg-primary/5 w-fit px-4 py-2 rounded-full border border-primary/10 mt-6">
                        {badge.icon || <Sparkles className="w-4 h-4 animate-pulse" />}
                        <span>{badge.text}</span>
                    </div>
                )}
            </SectionContainer>
        </div>
    );
}
