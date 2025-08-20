import SectionContainer from "./common/SectionContainer";
import BlogCard, { BlogCardProps } from "./cards/BlogCard";
import PageTitle from "./common/TitleCover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { SectionHeader } from "./common/SectionHeader";

interface BlogProps {
    blogs: Array<BlogCardProps>;
}

export default function Blog({ blogs }: BlogProps) {
    return (
        <SectionContainer>
            <SectionHeader
                eyebrow="Our Blog"
                title={<PageTitle>Himalyan Insights</PageTitle>}
            />
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
