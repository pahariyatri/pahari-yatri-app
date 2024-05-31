import SectionContainer from "./common/SectionContainer";
import Image from "./common/Image";
import PageTitle from "./common/TitleCover";

const imageUrls = [
    "/static/images/pahari-yatri-banner.png",
    "/static/images/pahari-yatri-banner.png",
    "/static/images/pahari-yatri-banner.png",
    "/static/images/pahari-yatri-banner.png",
    "/static/images/pahari-yatri-banner.png",
    "/static/images/pahari-yatri-banner.png",
];


export default function Gallery() {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Gallery
                </p>
                <PageTitle>
                    Our Gallery
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">In hac
                    habitasse platea
                    dictumst
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageUrls.map((url, index) => (
                    <div key={index} className="relative w-full h-48">
                        <Image
                            src={url}
                            alt={`Gallery Image ${index + 1}`}
                            height={500}
                            width={500}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
