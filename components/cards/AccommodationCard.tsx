import Image from "../common/Image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export interface AccommodationCardProps {
    name: string;
    description: string;
    imageSrc: string;
    href: string;
    location: string;
}

const AccommodationCard = ({ name, description, imageSrc, href, location }: AccommodationCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CardHeader className="relative">
                <Image src={imageSrc} alt={name} width={500}
                    height={500} className="w-full h-48 object-cover"></Image>
                <div className="absolute inset-0 bg-black opacity-20"></div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="text-start">
                    <div className="flex items-center">
                        <p className="text-sm font-semibold"> {location}</p>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{name}</CardTitle>
                    <CardDescription className="mt-2 text-gray-700 dark:text-gray-300">{description}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

export default AccommodationCard;
