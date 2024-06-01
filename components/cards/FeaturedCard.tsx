import Link from "../common/Link";
import Image from "../common/Image";
import { Card, CardContent } from "../ui/card";

interface FeaturedCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
}

const FeaturedCard = ({ title, description, imageSrc, href }: FeaturedCardProps) => {
    return (
        <Card className="rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CardContent className="p-4">
                <div className="relative flex flex-col md:flex-row items-center md:items-start rounded-lg overflow-hidden">
                    <Image src={imageSrc} alt={title} width={400} height={400} className="w-full md:w-1/2 h-48 object-cover md:h-72" />
                    <div className="p-4 w-full md:w-1/2 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
                            <p className="mt-2 text-sm md:text-base">{description}</p>
                        </div>
                        <Link href={href} className="inline-block font-bold mt-6 text-blue-600 dark:text-blue-400 hover:underline transition duration-300">
                            {'Read more'}
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default FeaturedCard;
