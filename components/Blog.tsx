import SectionContainer from "./common/SectionContainer";
import BlogCard, { BlogCardProps } from "./cards/BlogCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SectionHeading from "./common/SectionHeading";

interface BlogProps {
    blogs: Array<BlogCardProps>;
}

export default function Blog({ blogs }: BlogProps) {
    return (
        <SectionContainer>
            <SectionHeading title={"Himalyan Insights"}>
            </SectionHeading>
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
