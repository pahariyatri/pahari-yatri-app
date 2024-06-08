import SectionContainer from "./common/SectionContainer";
import PackageCard, { PackageCardProps } from "./cards/PackageCard";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

interface PackageProps {
    packages: Array<PackageCardProps>;
}

export default function Package({ packages }: PackageProps) {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Packages
                </p>
                <PageTitle>
                    Explore Our Unexplored Treks!
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">Join Us For Our Next Advantures
                </p>
            </div>

            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden">
                <CarouselContent>
                    {packages.map((pkg, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <PackageCard
                                    key={index}
                                    title={pkg.title}
                                    description={pkg.description}
                                    href={pkg.href}
                                    imageSrc={pkg.imageSrc}
                                    price={pkg.price}
                                    duration={pkg.duration}
                                    location={pkg.location}
                                    difficulty={pkg.difficulty}
                                />
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
