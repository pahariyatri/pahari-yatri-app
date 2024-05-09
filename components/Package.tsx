import SectionContainer from "./SectionContainer";
import PackageCard from "./cards/PackageCard";
import PageTitle from "./common/PageTitle";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function Package() {
    const packages = [
        {
            title: 'Adventure Trekking',
            description: 'Explore breathtaking trails and majestic mountains with our guided trekking adventures.',
            href: '/packages/adventure-trekking',
            imageSrc: '/static/favicons/android-chrome-512x512.png' // Update with the actual path to your image
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/packages/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png' // Update with the actual path to your image
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/packages/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png' // Update with the actual path to your image
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/packages/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png' // Update with the actual path to your image
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/packages/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png' // Update with the actual path to your image
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/packages/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png' // Update with the actual path to your image
        },
        // Add more package objects as needed
    ];

    return (
        <SectionContainer>
            <PageTitle>
                <h1 className="text-4xl font-bold mb-8">Explore Our Unexplored Treks!</h1>
            </PageTitle>
            <Carousel opts={{ align: "start", }} className="relative w-full h-screen overflow-hidden">
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
