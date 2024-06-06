import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import TestimonialCard from "./cards/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

interface TestimonialProps {
    testimonials: Array<{
        title: string;
        body: string;
        author: string;
    }>;
}

export default function Testimonials({ testimonials }: TestimonialProps) {
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
            <Carousel opts={{ align: "start", }} className="relative w-full overflow-hidden mt-4">
                <CarouselContent className="-ml-4">
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                            <TestimonialCard
                                key={index}
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
