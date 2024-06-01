import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import FeaturedCard from "./cards/FeaturedCard";

const packages = [
    {
        title: 'Shrikhand Mahadev Yatra',
        description: 'Embark on a sacred pilgrimage to the revered Shrikhand Mahadev peak in the Himalayas. The journey to this holy site is not just a physical trek but a spiritual quest, where devotees seek blessings and enlightenment. Trek through rugged terrain, dense forests, and alpine meadows, passing by ancient temples and holy lakes along the way. Join us on this transformative journey to connect with the divine.',
        href: '/package/shrikhand-mahadev-yatra',
        imageSrc: '/static/images/pahari-yatri-banner.png'
    },
    {
        title: 'Manimahesh Yatra',
        description: 'Experience the divine beauty and serenity of the sacred Manimahesh Lake nestled amidst the towering peaks of the Himalayas. This spiritual pilgrimage takes you on a journey of self-discovery and devotion as you trek through pristine valleys, lush forests, and alpine meadows. Witness breathtaking vistas, offer prayers at ancient temples, and immerse yourself in the peaceful ambiance of this sacred land.',
        href: '/package/manimahesh-yatra',
        imageSrc: '/static/images/pahari-yatri-banner.png'
    },
    {
        title: 'Kinnaur Kailash Yatra',
        description: 'Embark on a pilgrimage to the sacred Kinnaur Kailash peak and explore the enchanting Kinnaur region. This spiritual journey takes you through picturesque valleys, quaint villages, and ancient monasteries, offering glimpses of traditional Himachali culture and lifestyle. Trek to remote mountain passes, visit sacred sites, and witness panoramic views of the Himalayas, making this pilgrimage a truly transformative experience.',
        href: '/package/kinnaur-kailash-yatra',
        imageSrc: '/static/images/pahari-yatri-banner.png'
    },
];

export default function FeaturedPackage() {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Featured
                </p>
                <PageTitle>
                    Kailash Yatra with Pahari Yatri
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    Embark on a Spiritual Journey to Shrikhand, Manimahesh, and Kinnaur Kailash
                </p>
            </div>

            <Carousel opts={{ align: "start" }} className="relative w-full overflow-hidden">
                <CarouselContent>
                    {packages.map((pkg, index) => (
                        <CarouselItem key={index} className="basis-full sm:basis-1/1.1 lg:basis-1/1 p-2">
                            <FeaturedCard
                                key={index}
                                title={pkg.title}
                                description={pkg.description}
                                href={pkg.href}
                                imageSrc={pkg.imageSrc}
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
