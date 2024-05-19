import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface BlogCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    tags?: string[]; // Make tags optional
}

const BlogCard = ({ title, description, imageSrc, href, tags = [] }: BlogCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CardHeader>
                <img src={imageSrc} alt="Blog Image" className="w-full h-40 object-cover" />
            </CardHeader>
            <CardContent className="p-6">
                <div className="text-start">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap mt-4">
                            {tags.map((tag, index) => (
                                <Badge key={index} className="px-2 py-1 mr-2 mb-2">{tag}</Badge>
                                // <span key={index} className="inline-block  text-sm font-medium text-white bg-indigo-600 rounded-md">{tag}</span>
                            ))}
                        </div>
                    )}
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</CardTitle>
                    <CardDescription className="mt-2 text-gray-700 dark:text-gray-300">{description}</CardDescription>
                    <Button className=" font-bold mt-6 py-3 px-6  transition duration-300">Read More</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default BlogCard;
