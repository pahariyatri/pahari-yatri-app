import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import TestimonialCard, { TestimonialCardProps } from "./cards/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import Link from "./common/Link";
import { SectionHeader } from "./common/SectionHeader";

interface TestimonialProps {
    testimonials: Array<TestimonialCardProps>;
}

export default function Testimonials({ testimonials }: TestimonialProps) {
    // Sample trek names to associate with testimonials
    const trekNames = [
        "Kinner Kailash Yatra",
        "Manimahesh Kailash",
        "Shrikhand Mahadev",
        "Bhrigu Lake Trek",
        "Beas Kund Trek",
        "Prashar Lake Trek",
        "Hampta Pass",
        "Chandrakhani Pass",
        "Triund Trek"
    ];

    // Sample image paths for testimonials
    const imagePaths = [
        "/static/images/testimonial-default.jpg",
        "/static/images/about-us.jpg"
    ];

    // Enhance testimonials with trek names and images
    const enhancedTestimonials = testimonials.map((testimonial, index) => ({
        ...testimonial,
        trekName: trekNames[index % trekNames.length],
        imageSrc: imagePaths[index % imagePaths.length]
    }));

    return (
        <SectionContainer className="bg-gradient-to-b from-background-light to-muted/30 dark:from-background-dark dark:to-muted/10 py-24">
            <SectionHeader
                eyebrow="Transformative Experiences"
                title={<PageTitle>What Our Yatris Say</PageTitle>}
            />

            <Carousel
                opts={{
                    align: "start",
                    loop: true
                }}
                className="relative w-full overflow-hidden mt-12"
            >
                <CarouselContent className="-ml-4">
                    {enhancedTestimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4 pb-8 transition-opacity duration-300 hover:opacity-100 opacity-90">
                            <TestimonialCard
                                key={index}
                                title={testimonial.title}
                                description={testimonial.description}
                                author={testimonial.author}
                                imageSrc={testimonial.imageSrc}
                                trekName={testimonial.trekName}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-gold text-himalayan-green-900 dark:text-white hover:bg-gold/90 border-none shadow-md transition-transform duration-300 hover:scale-105" />
                <CarouselNext className="bg-gold text-himalayan-green-900 dark:text-white hover:bg-gold/90 border-none shadow-md transition-transform duration-300 hover:scale-105" />
            </Carousel>
        </SectionContainer>
    );
}
