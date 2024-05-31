import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import TestimonialCard from "./cards/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const testimonials = [
    {
        id: 1,
        title: "Amazing Experience",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        author: "John Doe"
    },
    {
        id: 2,
        title: "Highly Recommended",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        author: "Jane Smith"
    },
    {
        id: 3,
        title: "Great Guides",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        author: "Michael Johnson"
    },
];

export default function Testimonials() {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Customer Reviews
                </p>
                <PageTitle>
                    What Our Clients Say
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    Hear from our satisfied customers about their experiences with us.
                </p>
            </div>
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden">
                <CarouselContent className="-ml-4">
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                            <TestimonialCard
                                key={testimonial.id}
                                title={testimonial.title}
                                body={testimonial.body}
                                author={testimonial.author}
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
