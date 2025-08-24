import Link from "../common/Link";
import BaseCard from "../common/BaseCard";
import ResponsiveImage from "../common/ResponsiveImage";
import CustomBadge from "../common/CustomBadge";

export interface BlogCardProps {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    tags?: string[];
}

const BlogCard = ({ title, description, imageSrc, href, tags = [] }: BlogCardProps) => {
    // Check for mobile viewport
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const header = (
        <div className="relative w-full h-40 sm:h-48 overflow-hidden rounded-t-lg">
            <ResponsiveImage 
                src={imageSrc} 
                alt={title} 
                className="w-full h-40 sm:h-48 transition-transform duration-500 hover:scale-105" 
                aspectRatio="16:9"
                overlay={true}
                overlayColor="black"
                overlayOpacity={0.2}
            />
            {/* Mountain icon overlay */}
            <div className="absolute bottom-2 right-2 text-white/30 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                </svg>
            </div>
        </div>
    );

    const showReadMore = description.length > 100;

    return (
        <BaseCard
            className="overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300"
            hoverEffect="scale"
            header={header}
        >
            <div className="text-start space-y-3 p-1">
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, index) => (
                            <CustomBadge key={index} variant="secondary" className="text-xs sm:text-sm py-0.5 px-2">{tag}</CustomBadge>
                        ))}
                    </div>
                )}
                <h3 className="text-lg sm:text-xl font-bold font-brandSerif text-foreground line-clamp-2">{title}</h3>
                
                <div className="pt-1">
                    <Link 
                        href={href} 
                        className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition duration-300"
                    >
                        <span>Read story</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </BaseCard>
    );
}

export default BlogCard;
