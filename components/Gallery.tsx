import SectionContainer from "./SectionContainer";
import PageTitle from "./common/PageTitle";

export default function Gallery() {
    return (
        <SectionContainer>
            <PageTitle>
                Gallery
            </PageTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Replace the URLs in src attribute with actual image URLs */}
                <img src="/static/favicons/android-chrome-512x512.png" alt="Gallery Image 1" className="rounded-lg shadow-lg" />
                <img src="/static/favicons/android-chrome-512x512.png" alt="Gallery Image 2" className="rounded-lg shadow-lg" />
                <img src="/static/favicons/android-chrome-512x512.png" alt="Gallery Image 3" className="rounded-lg shadow-lg" />
                <img src="/static/favicons/android-chrome-512x512.png" alt="Gallery Image 4" className="rounded-lg shadow-lg" />
                {/* Add more images as needed */}
            </div>
        </SectionContainer>
    );
}
