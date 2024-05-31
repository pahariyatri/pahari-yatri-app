import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface ReviewCardProps {
    name: string;
    comment: string;
    rating: number;
}

const ReviewCard = ({ name, comment, rating }: ReviewCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden ">
            <CardContent className="p-6">
                <CardTitle className="flex items-center mb-2">
                    {name}
                    <div className="ml-2 text-yellow-500">
                        {'★'.repeat(rating)}
                        {'☆'.repeat(5 - rating)}
                    </div>
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">{comment}</CardDescription>
            </CardContent>
        </Card>
    );
}

export default ReviewCard;
