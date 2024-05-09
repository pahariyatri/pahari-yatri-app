import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface PackageCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
}

const PackageCard = ({ title, description, imageSrc, href }: PackageCardProps) => {
    return (
        <Card>
            <CardHeader>
                <img src={imageSrc} alt="Package Image" className="w-full h-40 object-cover" />
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                    <a href={href} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 block mt-4">Learn More</a>
                </div>
            </CardContent>
        </Card>
    );
}

export default PackageCard;
