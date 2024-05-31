import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const categories = [
    { id: 1, title: "Adventure", imageSrc: "/images/adventure.jpg" },
    { id: 2, title: "Beach", imageSrc: "/images/beach.jpg" },
    { id: 3, title: "Cultural", imageSrc: "/images/cultural.jpg" },
    { id: 4, title: "Wildlife", imageSrc: "/images/wildlife.jpg" },
    { id: 5, title: "Hiking", imageSrc: "/images/hiking.jpg" },
    { id: 6, title: "City Tours", imageSrc: "/images/city.jpg" }
];

export default function Category() {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Category
                </p>
                <PageTitle>
                    Popular Categories
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    Discover the most popular travel categories curated just for you.
                </p>
            </div>
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden">
                <CarouselContent className="-ml-4">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="basis-1/3 md:basis-1/3 lg:basis-1/6 pl-4">
                            <div key={category.id} className="relative overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105">
                                <img
                                    src={category.imageSrc}
                                    alt={category.title}
                                    className="w-full h-32 sm:h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h3 className="text-white text-sm sm:text-lg font-semibold">{category.title}</h3>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </SectionContainer>
    );
}
