import SectionContainer from "./common/SectionContainer";
import BlogCard from "./cards/BlogCard";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function Blog() {
    const blogs = [
        {
            title: 'Adventure Trekking',
            description: 'Explore breathtaking trails and majestic mountains with our guided trekking adventures.',
            href: '/blog/adventure-trekking',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            tags: ['Adventure', 'Trekking', 'Mountains']
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/blog/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            tags: ['Adventure', 'Trekking', 'Mountains']
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/blog/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
            tags: ['Adventure', 'Trekking', 'Mountains']
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/blog/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/blog/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
        },
        {
            title: 'Cultural Tours',
            description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
            href: '/blog/cultural-tours',
            imageSrc: '/static/favicons/android-chrome-512x512.png',
        },
        // Add more package objects as needed
    ];

    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    blogs
                </p>
                <PageTitle>
                    Our Recent Blogs
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">In hac
                    Some Advanter Story
                </p>
            </div>
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden">
                <CarouselContent>
                    {blogs.map((blog, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <BlogCard
                                    key={index}
                                    title={blog.title}
                                    description={blog.description}
                                    href={blog.href}
                                    imageSrc={blog.imageSrc}
                                    tags={blog.tags} // Pass tags to BlogCard
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
