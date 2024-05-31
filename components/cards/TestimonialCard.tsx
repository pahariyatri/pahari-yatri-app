import { Card, CardContent } from "../ui/card";

interface TestimonialCardProps {
    title: string;
    body: string;
    author: string;
}

const TestimonialCard = ({ title, body, author }: TestimonialCardProps) => {
    return (
        <Card className="rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
                <h2 className="text-xl text-center font-bold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
                <div className="text-center">
                    <p className="text-lg italic text-gray-700 dark:text-gray-400 mb-4">{body}</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">- {author}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default TestimonialCard;
