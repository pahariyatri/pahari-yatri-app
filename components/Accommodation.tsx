import SectionContainer from "./SectionContainer";
import PageTitle from "./common/PageTitle";
import AccommodationCard from "./cards/AccommodationCard";

const accommodations = [
    {
        id: 1001,
        name: "Tranquil Stays: Gayatri Lodge, Kasauli",
        description: "Discover serenity and unmatched comfort at Gayatri Lodge, nestled in the heart of Kasauli.",
        imageSrc: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/462717126.jpg?k=0a09a8f39a458aa2160a678ffa42a0f9ac3f9936bd43496122b2a6bf3bd9ac58&o=&hp=1",
        imageAlt: "Gayatri Lodge",
        href: "https://gayatrilodge.com/",
        location: "Kasauli, Himachal Pradesh"
    },
    {
        id: 987,
        name: "Tranquil Stays: Cedar Valley, Saroa",
        description: "Creating dynamic and responsive web applications with Angular",
        imageSrc: "https://lh3.googleusercontent.com/p/AF1QipOugRhCFIA1xSv_Ayy4ThNDQPBCmtYk8B7b4Uae=s1360-w1360-h1020",
        imageAlt: "Cedar Valley",
        href: "#",
        location: "Saroa, Himachal Pradesh"
    },
    {
        id: 30092,
        name: "Tranquil Stays: Alpine Cafe, Devidarh",
        description: "Crafting interactive and modern user interfaces with React",
        imageSrc: "https://images.unsplash.com/photo-1597256817041-0c75c0633658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=849&q=80",
        imageAlt: "Alpine Cafe",
        href: "#",
        location: "Devidarh, Himachal Pradesh"
    },
];

export default function Accommodation() {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Accommodation
                </p>
                <PageTitle>
                    Our Luxury Homestays
                </PageTitle>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    Luxury Stay at Kasauli, Devidarh & Saroa
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {accommodations.map(accommodation => (
                    <AccommodationCard
                        key={accommodation.id}
                        title={accommodation.name}
                        description={accommodation.description}
                        imageSrc={accommodation.imageSrc}
                        href={accommodation.href}
                        location={accommodation.location}
                    />
                ))}
            </div>
        </SectionContainer>
    );
}
