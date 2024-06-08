import SectionContainer from "./common/SectionContainer";
import BlogCard, { BlogCardProps } from "./cards/BlogCard";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

interface BlogProps {
    blogs: Array<BlogCardProps>;
}

export default function Blog({ blogs }: BlogProps) {
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
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden mt-4">
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
                                    tags={blog.tags}
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
