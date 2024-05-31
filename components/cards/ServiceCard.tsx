import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface ServiceCardProps {
    title: string;
    body: string;
    icon: JSX.Element;
}

const ServiceCard = ({ title, body, icon }: ServiceCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
            <CardContent className="p-4 md:p-6 h-full flex flex-col justify-between">
                <div className="text-start">
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-3">
                        {icon}
                        <span>{title}</span>
                    </CardTitle>
                    <CardDescription className="mt-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                        {body}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceCard;
