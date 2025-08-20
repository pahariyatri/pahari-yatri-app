import { Card, CardContent } from "../ui/card";
import ResponsiveImage from "../common/ResponsiveImage";

export interface TestimonialCardProps {
    title: string;
    description: string;
    author: string;
    imageSrc?: string;
    trekName?: string;
}

const TestimonialCard = ({ title, description, author, imageSrc, trekName }: TestimonialCardProps) => {
    // Default image if none provided
    const defaultImage = "/static/images/testimonial-default.jpg";
    
    return (
        <Card className="rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
            {/* Image Section with Gradient Overlay */}
            <div className="relative h-48 w-full overflow-hidden">
                <ResponsiveImage 
                    src={imageSrc || defaultImage} 
                    alt={`${author}'s testimonial`} 
                    className="w-full h-full transition-transform duration-500 hover:scale-105"
                    aspectRatio="16:9"
                    overlay={true}
                    overlayColor="transparent"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalayan-green-900/80 to-transparent"></div>
                
                {/* Trek Name Badge */}
                {trekName && (
                    <div className="absolute top-4 right-4 bg-himalayan-saffron/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {trekName}
                    </div>
                )}
                
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-himalayan-mist-100/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                    </svg>
                </div>
            </div>
            
            <CardContent className="p-6 flex-grow flex flex-col">
                <div className="mb-3 h-0.5 w-16 bg-himalayan-saffron mx-auto"></div>
                <h2 className="text-xl text-center font-bold text-himalayan-green-800 dark:text-himalayan-mist-100 mb-4 font-brandSerif">{title}</h2>
                <div className="text-center flex-grow">
                    <p className="text-base italic text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>
                    <p className="text-lg font-semibold text-himalayan-green-700 dark:text-himalayan-mist-200">— {author}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default TestimonialCard;
