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
    const header = (
        <div className="relative w-full h-40 overflow-hidden">
            <ResponsiveImage 
                src={imageSrc} 
                alt={title} 
                className="w-full h-40" 
                aspectRatio="16:9"
            />
        </div>
    );

    const showReadMore = description.length > 120;

    return (
        <BaseCard
            className="overflow-hidden h-full"
            hoverEffect="scale"
            header={header}
        >
            <div className="text-start space-y-3">
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <CustomBadge key={index} variant="secondary">{tag}</CustomBadge>
                        ))}
                    </div>
                )}
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                
                {showReadMore && (
                    <Link href={href} className="inline-block font-medium text-primary hover:underline transition duration-300">
                        Read more
                    </Link>
                )}
            </div>
        </BaseCard>
    );
}

export default BlogCard;
