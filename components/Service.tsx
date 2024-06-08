import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import ServiceCard, { ServiceCardProps } from "./cards/ServiceCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

interface ServiceProps {
    services: Array<ServiceCardProps>;
}

export default function Service({ services }: ServiceProps) {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Service
                </p>
                <PageTitle>
                    Popular Activities
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    Our activities include camping, trekking, skiing, and 4x4 expeditions.
                </p>
            </div>
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden mt-4">
                <CarouselContent className="-ml-2 md:ml-0">
                    {services.map((service, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 p-2">
                            <ServiceCard
                                key={index}
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </SectionContainer>
    );
}
