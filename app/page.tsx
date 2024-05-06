import HeroBanner from "@/components/HeroBanner";
import PackageCard from "@/components/PackageCard";
import SectionContainer from "@/components/SectionContainer";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroBanner></HeroBanner>
      <Carousel
        opts={{
          align: "start",
        }} className="relative w-full h-screen overflow-hidden"

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
    </main>
  );
}
