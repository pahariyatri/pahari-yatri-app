import SectionContainer from "./common/SectionContainer";
import Image from "./common/Image";
import PageTitle from "./common/TitleCover";
import Link from "./common/Link";

export default function AboutUs() {
    return (
        <SectionContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
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
                <div className='flex items-center justify-center'>
                    <Image src={"/static/images/pahari-yatri-banner.png"} alt={"Pahari Yatri About Us Image"} height={500} width={500} className="rounded-lg object-cover h-72 w-72 shadow-lg"></Image>
                </div>
            </div>
        </SectionContainer>
    );
}
