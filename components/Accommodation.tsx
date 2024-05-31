import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import AccommodationCard from "./cards/AccommodationCard";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

const accommodations = [
    {
        id: 1001,
        name: "Tranquil Stays: Gayatri Lodge, Kasauli",
        description: "Discover serenity and unmatched comfort at Gayatri Lodge, nestled in the heart of Kasauli.",
        imageSrc: "/static/images/pahari-yatri-banner.png",
        imageAlt: "Gayatri Lodge",
        href: "https://gayatrilodge.com/",
        location: "Kasauli, Himachal Pradesh"
    },
    {
        id: 987,
        name: "Tranquil Stays: Cedar Valley, Saroa",
        description: "Creating dynamic and responsive web applications with Angular",
        imageSrc: "/static/images/pahari-yatri-banner.png",
        imageAlt: "Cedar Valley",
        href: "#",
        location: "Saroa, Himachal Pradesh"
    },
    {
        id: 30092,
        name: "Tranquil Stays: Alpine Cafe, Devidarh",
        description: "Crafting interactive and modern user interfaces with React",
        imageSrc: "/static/images/pahari-yatri-banner.png",
        imageAlt: "Alpine Cafe",
        href: "#",
        location: "Devidarh, Himachal Pradesh"
    },
];

export default function Accommodation() {
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
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden">
                <CarouselContent className="-ml-4">
                    {accommodations.map((accommodation, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <AccommodationCard
                                key={accommodation.id}
                                title={accommodation.name}
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
