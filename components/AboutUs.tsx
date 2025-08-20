import SectionContainer from "./common/SectionContainer";
import ResponsiveImage from "./common/ResponsiveImage";
import PageTitle from "./common/TitleCover";
import Link from "./common/Link";

export default function AboutUs() {
    return (
        <SectionContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
                <div className='flex items-center justify-center'>
                    <ResponsiveImage src={"/static/images/pahari-yatri-banner.png"} alt={"Pahari Yatri About Us Image"} className="h-72 w-72 shadow-lg" aspectRatio="1:1" rounded="lg"></ResponsiveImage>
                </div>
                <div>
                    <PageTitle>
                        About Us
                    </PageTitle>
                    <p className="text-lg my-4">
                        Pahari Yatri is your ticket to Himalayan adventures. We prioritize safety, sustainability, and personalized experiences. Join us to explore the hidden treasures of the Himalayas in a remarkable and sustainable way.
                    </p>
                    <Link href={'/about-us'} className="inline-block font-bold mt-6 text-blue-600 dark:text-blue-400 hover:underline transition duration-300">
                        {'Read more'}
                    </Link>
                </div>

            </div>
        </SectionContainer>
    );
}
