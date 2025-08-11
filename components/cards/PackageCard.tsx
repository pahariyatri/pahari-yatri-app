import Link from "../common/Link";
import Image from "../common/Image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

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

const PackageCard = ({ title, description, imageSrc, href, price, location, duration }: PackageCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CardHeader className="relative">
                <Image src={imageSrc} alt={title} width={500} height={500} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-sm text-gray-300">{location}</p>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardDescription className="text-muted-foreground">{description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                    {duration !== undefined && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {duration} Days
                        </span>
                    )}
                    {/* <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {price ? `${price} INR` : 'Contact for price'}
                    </span> */}
                    {location && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {location}
                        </span>
                    )}
                </div>
                {/* <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Price: {price}</p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Duration: {duration}</p>
                        </div>
                        {difficulty && (
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Difficulty: {difficulty}</p>
                            </div>
                        )}
                    </div> */}
            </CardContent>
            <CardFooter>
                <Link href={href} className="block w-full mt-6 transition duration-300">
                    <Button className="font-bold py-3 px-6 rounded-lg w-full transition duration-300">{"View Details"}</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default PackageCard;
