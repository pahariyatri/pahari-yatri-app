import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import AccommodationCard, { AccommodationCardProps } from "./cards/AccommodationCard";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

interface AccommodationProps {
    accommodations: Array<AccommodationCardProps>;
}

export default function Accommodation({ accommodations }: AccommodationProps) {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Accommodation
                </p>
                <PageTitle>
                    Our Luxury Homestays
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    Luxury Stay at Kasauli, Devidarh & Saroa
                </p>
            </div>
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden mt-4">
                <CarouselContent className="-ml-4">
                    {accommodations.map((accommodation, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <AccommodationCard
                                key={index}
                                name={accommodation.name}
                                description={accommodation.description}
                                imageSrc={accommodation.imageSrc}
                                href={accommodation.href}
                                location={accommodation.location}
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
