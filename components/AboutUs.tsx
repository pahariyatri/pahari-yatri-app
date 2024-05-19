import SectionContainer from "./SectionContainer";
import PageTitle from "./common/PageTitle";

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
                </div>
                <div className='flex items-center justify-center'>
                    <img src="/static/images/pahari-yatri-banner.png" alt="About Us Image" className="rounded-lg object-cover h-72 w-72 shadow-lg" />
                </div>
            </div>
        </SectionContainer>
    );
}
