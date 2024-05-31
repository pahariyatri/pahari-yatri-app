import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import ServiceCard from "./cards/ServiceCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const services = [
    {
        id: 1,
        title: 'Camping',
        body: 'Enjoy organized camping trips with modern amenities and beautiful surroundings.',
    },
    {
        id: 2,
        title: 'Trekking',
        body: 'Explore picturesque trails and stunning landscapes on our trekking adventures.',
    },
    {
        id: 3,
        title: '4x4 Expedition',
        body: 'Experience thrilling off-road adventures with our 4x4 expeditions.',
    },
    {
        id: 4,
        title: 'Skiing',
        body: 'Ski on various slopes suitable for all skill levels, from beginners to experts.',
    },
] as const;

const serviceIcons: Record<(typeof services)[number]['title'], JSX.Element> = {
    Camping: (
        <svg width="32" height="32" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M0 725.333333S149.589333 192 512 192c362.666667 0 512 469.333333 512 469.333333l-362.666667 170.666667-661.333333-106.666667z" fill="#FFC107" /><path d="M0 725.333333l41.6 6.698667 0.213333-0.725333C43.264 726.336 190.4 234.666667 512 234.666667c321.813333 0 468.970667 429.077333 470.442667 433.408l3.690666 11.093333L1024 661.333333S872.896 192.042667 513.962667 192.042667C151.104 192.042667 0 725.333333 0 725.333333z" fill="#FFA000" /><path d="M505.749333 198.250667l-30.165333 30.165333C591.850667 344.682667 661.333333 626.602667 661.333333 832l42.261334-19.904c-4.117333-209.322667-73.024-489.024-197.845334-613.845333z" fill="#FFA000" /><path d="M983.744 563.712l-325.141333 155.413333L36.693333 623.018667C11.776 683.370667 0 725.333333l661.333333 106.666667 362.666667-170.666667s-11.989333-42.261333-40.256-97.621333z" fill="#607D8B" /><path d="M490.624 804.458667C490.026667 689.408 488.384 448 361.664 448c-112.170667 0-164.032 204.288-182.976 306.176l311.936 50.282667z" fill="#37474F" /><path d="M41.813333 731.306667c0.426667-1.429333 12.906667-43.093333 38.037334-101.632l-43.136-6.677334-0.618667 1.514667C20.672 658.005333 0 725.333333 0 725.333333l41.6 6.698667 0.213333-0.725333zM945.621333 581.909333c24.341333 49.792 36.394667 84.928 36.821334 86.165334l3.690666 11.093333L1024 661.333333s-12.885333-40.448-40.256-97.621333l-38.122667 18.197333zM696.149333 701.461333l-37.546666 17.664-3.648-0.554666c4.138667 39.253333 6.378667 77.546667 6.378666 113.429333l42.261334-19.904a1182.506667 1182.506667 0 0 0-7.445334-110.634667z" fill="#455A64" /></svg>
    ),
    Trekking: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 3.84L18.2 19H5.8L12 5.84zM12 15a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
    ),
    '4*4 Expedition': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 3.84L18.2 19H5.8L12 5.84zM12 15a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
    ),
    Skiing: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 3.84L18.2 19H5.8L12 5.84zM12 15a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
    ),
};

export default function Service() {
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
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden">
                <CarouselContent className="-ml-2 md:ml-0">
                    {services.map((service, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 p-2">
                            <ServiceCard
                                key={service.id}
                                title={service.title}
                                body={service.body}
                                icon={serviceIcons[service.title as keyof typeof serviceIcons]}
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
