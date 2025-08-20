import SectionContainer from "./common/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "./common/Link";
import Image from "./common/Image";

export default function BrandStory() {
    return (
        <SectionContainer className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Desktop layout with image and text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image with animation */}
                    <div className="relative overflow-hidden rounded-2xl animate-fade-in">
                        <Image 
                            src="/static/images/pahari-yatri-banner.png" 
                            alt="Pahari Yatri Journey" 
                            width={600} 
                            height={400} 
                            className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-60"></div>
                    </div>
                    
                    {/* Content with luxury spacing */}
                    <div className="flex flex-col space-y-6 animate-slide-in-right">
                        {/* Short bold statement */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-brandSerif text-foreground mb-4">
                            Born from the Himalayas
                        </h2>
                        
                        {/* Supporting copy */}
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            Pahari Yatri began with a single yatra in 2018. A journey of devotion that became a movement of transformation. Our story is rooted in the ancient wisdom of the Himalayas and a deep connection to spiritual heritage.
                        </p>
                        
                        {/* <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            We don't just offer packages - we create transformative experiences that honor the sacred mountains and the traditions they hold.
                        </p> */}
                        
                        <Link href="/about-us" className="inline-block">
                            <Button 
                                variant="outline" 
                                className="group relative overflow-hidden border-primary hover:border-primary/80 hover:bg-primary/5"
                            >
                                <span className="relative z-10">Read Our Full Story</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
