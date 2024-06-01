import Link from "./common/Link";
import { Button } from "./ui/button";

interface HeroBannerProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

const HeroBanner = ({ title, description, buttonText, buttonLink }: HeroBannerProps) => {
    return (
        <section className="relative w-full h-[50vh] sm:h-screen overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-center mb-6">{title}</h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center mb-8">{description}</p>
                <Link href={buttonLink}>
                    <Button className="font-bold py-3 px-6 rounded-full transition duration-300">{buttonText}</Button>
                </Link>
            </div>
        </section>
    )
}

export default HeroBanner;
