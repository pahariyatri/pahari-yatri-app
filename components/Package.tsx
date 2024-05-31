import SectionContainer from "./common/SectionContainer";
import PackageCard from "./cards/PackageCard";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function Package() {
    const packages = [
        {
            title: 'Adventure Trekking',
            description: 'Explore breathtaking trails and majestic mountains with our guided trekking adventures.',
            href: '/package/adventure-trekking',
            price: '$999',
            duration: '7 Days',
            location: 'Himalayas',
            difficulty: 'Hard',
            imageSrc: '/static/favicons/android-chrome-512x512.png'
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/package/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            price: '$999',
            duration: '7 Days',
            location: 'Himalayas',
            difficulty: 'Hard'
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/package/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            price: '$999',
            duration: '7 Days',
            location: 'Himalayas',
            difficulty: 'Hard'
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/package/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            price: '$999',
            duration: '7 Days',
            location: 'Himalayas',
            difficulty: 'Hard'
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/package/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            price: '$999',
            duration: '7 Days',
            location: 'Himalayas',
            difficulty: 'Hard'
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/package/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            price: '$999',
            duration: '7 Days',
            location: 'Himalayas',
            difficulty: 'Hard'
        },
        // Add more package objects as needed
    ];

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
