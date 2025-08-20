import ResponsiveImage from "../common/ResponsiveImage";
import BaseCard from "../common/BaseCard";
import IconButton from "../common/IconButton";

export interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
    const header = (
        <div className="flex flex-col items-center p-4 md:p-6">
            <ResponsiveImage src={icon} alt={`icon-${title}`} className="w-[50px] h-[50px] mb-4" aspectRatio="1:1" rounded="full" />
            <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">
                {title}
            </h3>
        </div>
    );

    return (
        <BaseCard 
            header={header}
            hoverEffect="scale"
            contentClassName="p-4 md:p-6 flex flex-col justify-between"
        >
            <div className="flex flex-col h-full">
                <p className="mt-2 text-center text-sm md:text-base text-muted-foreground">
                    {description}
                </p>
                <div className="mt-4 flex justify-center">
                    <IconButton variant="default" iconPosition="right" iconType="info">
                        Learn More
                    </IconButton>
                </div>
            </div>
        </BaseCard>
    );
}

export default ServiceCard;
