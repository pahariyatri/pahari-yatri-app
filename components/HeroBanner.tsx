import PackageCard from "./PackageCard";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

const HeroBanner = () => {
    return (
        <>
            <section className="relative w-full h-screen overflow-hidden shadow-md">
                {/* Hero Banner Image */}
                {/* <Image
        src="/mountain-landscape.jpg"
        alt="Mountain Landscape"
        layout="fill"
        objectFit="cover"
    /> */}

                {/* Hero Banner Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-center mb-6">Embark on Your Adventure</h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-center mb-8">Explore breathtaking trekking and mountaineering experiences</p>
                    <Button className=" font-bold py-3 px-6 rounded-full transition duration-300">Discover Now</Button>
                </div>
            </section>
            <Carousel
                opts={{
                    align: "start",
                }}

            >
                <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <PackageCard></PackageCard>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}
export default HeroBanner;