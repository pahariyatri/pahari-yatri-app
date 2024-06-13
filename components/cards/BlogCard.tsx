import Link from "../common/Link";
import Image from "../common/Image";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export interface BlogCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    tags?: string[];
}

const BlogCard = ({ title, description, imageSrc, href, tags = [] }: BlogCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CardHeader>
                <Image src={imageSrc} alt={title} width={500} height={500} className="w-full h-40 object-cover"></Image>
            </CardHeader>
            <CardContent className="p-6">
                <div className="text-start">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap mt-4">
                            {tags.map((tag, index) => (
                                <Badge key={index} className="px-2 py-1 mr-2 mb-2">{tag}</Badge>
                            ))}
                        </div>
                    )}
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</CardTitle>
                    <CardDescription className="mt-2 text-gray-700 dark:text-gray-300">
                        {description.length > 120 ? `${description.slice(0, 120)}...` : description}
                    </CardDescription>
                    {description.length > 120 && (
                        <Link href={href} className="inline-block font-bold py-3 text-blue-600 dark:text-blue-400 hover:underline transition duration-300">
                            Read more
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default BlogCard;
