import PackageCard from "./cards/PackageCard";
import Image from "./common/Image";
import { Button } from "./ui/button";

const HeroBanner = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <Image
                alt={'title'}
                src={'/static/images/logo.png'}
                className="object-cover object-center md:h-36 lg:h-48"
                width={1800}
                height={1300}
                priority={false}
            />

            {/* Hero Banner Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-center mb-6">Embark on Your Adventure</h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center mb-8">Explore breathtaking trekking and mountaineering experiences</p>
                <Button className=" font-bold py-3 px-6 rounded-full transition duration-300">Discover Now</Button>
            </div>
        </section>
    )
}
export default HeroBanner;