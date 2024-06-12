import Image from "../common/Image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
            <CardHeader className="flex flex-col items-center p-4 md:p-6">
                <Image src={icon} alt={`icon-${title}`} height={50} width={50} className="rounded-full mb-4" />
                <CardTitle className="text-xl md:text-2xl font-bold text-center">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 h-full flex flex-col justify-between">
                <CardDescription className="mt-2 text-center text-sm md:text-base">
                    {description}
                </CardDescription>
                <div className="mt-4 flex justify-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors">
                        Learn More
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceCard;
