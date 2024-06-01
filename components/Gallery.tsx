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
