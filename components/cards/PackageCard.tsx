import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface PackageCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    price: string;
    duration: string;
    location: string;
    difficulty?: string;
}

const PackageCard = ({ title, description, imageSrc, href, price, duration, location, difficulty }: PackageCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CardHeader className="relative">
                <img src={imageSrc} alt="Package Image" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black opacity-20"></div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="text-start">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</CardTitle>
                    <CardDescription className="mt-2 text-gray-700 dark:text-gray-300">{description}</CardDescription>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                            <p className="text-sm font-semibold">Price: {price}</p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                            <p className="text-sm font-semibold">Duration: {duration}</p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            <p className="text-sm font-semibold">Location: {location}</p>
                        </div>
                        {difficulty && (
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                                <p className="text-sm font-semibold">Difficulty: {difficulty}</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PackageCard;
