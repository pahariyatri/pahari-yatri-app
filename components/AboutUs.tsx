import SectionContainer from "./SectionContainer";
import PageTitle from "./common/PageTitle";

export default function AboutUs() {
    return (
        <SectionContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <PageTitle>
                        About Us
                    </PageTitle>
                    <p className="text-lg mb-4">
                        Pahari Yatri is your ticket to Himalayan adventures. We prioritize safety, sustainability, and personalized experiences. Join us to explore the hidden treasures of the Himalayas in a remarkable and sustainable way.
                    </p>
                </div>
                <div>
                    <img src="/static/favicons/android-chrome-512x512.png" alt="About Us Image" className="rounded-lg shadow-lg" />
                </div>
            </div>
        </SectionContainer>
    );
}
