import Link from "../common/Link";
import BaseCard from "../common/BaseCard";
import { Button } from "../ui/button";
import ResponsiveImage from "../common/ResponsiveImage";
import { formatCurrency, formatDuration, formatDifficulty } from '@/lib/format-utils';

export interface PackageCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    price: number;
    duration?: number;
    difficulty?: string;
    location: string;
}

const PackageCard = ({ title, description, imageSrc, href, price, location, duration, difficulty }: PackageCardProps) => {
    const header = (
        <div className="relative">
            <ResponsiveImage src={imageSrc} alt={title} width={500} height={500} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-sm text-gray-300">{location}</p>
            </div>
        </div>
    );

    const footer = (
        <Link href={href} className="block w-full transition duration-300">
            <Button className="font-bold py-3 px-6 rounded-lg w-full bg-primary hover:bg-primary/90 text-primary-foreground transition duration-300">{"View Details"}</Button>
        </Link>
    );

    return (
        <BaseCard
            header={header}
            footer={footer}
            hoverEffect="translate"
            headerClassName="p-0"
        >
            <div>
                <p className="text-muted-foreground">{description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {price && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {formatCurrency(price)}
                        </span>
                    )}
                    {duration !== undefined && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {formatDuration(duration)}
                        </span>
                    )}
                    {difficulty && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            Difficulty: {formatDifficulty(difficulty)}
                        </span>
                    )}
                    {location && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {location}
                        </span>
                    )}
                </div>
            </div>
        </BaseCard>
    );
}

export default PackageCard;
