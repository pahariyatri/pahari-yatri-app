import SectionContainer from "./SectionContainer";
import PageTitle from "./common/PageTitle";

export default function Gallery() {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Contact
                </p>
                <PageTitle>
                    Gallery
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">In hac
                    habitasse platea
                    dictumst
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                </div>
            </div>

        </SectionContainer>
    );
}
