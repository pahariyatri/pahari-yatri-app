import Image from "./common/Image";
import Link from "./common/Link";
import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const categories = [
    { id: 1, title: "Adventure", href: '/package/', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 2, title: "Beach", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 3, title: "Cultural", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 4, title: "Wildlife", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 5, title: "Hiking", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 6, title: "City Tours", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" }
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
                            <Link href={category.href} className="inline-block font-bold py-3  text-blue-600 dark:text-blue-400 hover:underline transition duration-300">
                                <div key={category.id} className="relative overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105">
                                    <Image src={category.imageSrc} alt={category.title} height={502} width={280} className="w-full h-32 sm:h-48 object-cover"></Image>
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <h3 className="text-white text-sm sm:text-lg font-semibold">{category.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </SectionContainer>
    );
}
