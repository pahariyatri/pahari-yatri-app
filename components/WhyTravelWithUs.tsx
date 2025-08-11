import SectionContainer from "./common/SectionContainer";
import Image from "./common/Image";
import PageTitle from "./common/TitleCover";
import Link from "./common/Link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";

export default function WhyTravelWithUs() {
    return (
        <SectionContainer>
            <div className="text-center">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Why Travel With Us
                </p>
                <PageTitle>
                    Why Choose Pahari Yatri?
                </PageTitle>
                <p className="text-lg my-4">
                    By choosing Pahari Yatri, you’re not just signing up for a trek—you’re stepping into a world of transformative experiences. Whether it’s connecting with the spiritual energy of the Himalayas, immersing yourself in the untouched beauty of the mountains, or pushing your physical limits on a challenging trek, we are here to guide you every step of the way.
                </p>

                <div className="grid gap-6 sm:grid-cols-3 mt-2 mb-2">
                    <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
                        <CardHeader className="flex flex-col items-center p-4 md:p-6">
                            <CardTitle className="text-xl md:text-2xl font-bold text-center">
                                Certified Experts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-full flex flex-col justify-between">
                            <CardDescription className="text-center text-sm md:text-base">
                                Our team comprises mountaineering-certified professionals who ensure both safety and an enriched experience.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
                        <CardHeader className="flex flex-col items-center p-4 md:p-6">
                            <CardTitle className="text-xl md:text-2xl font-bold text-center">
                                Eco-Friendly
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-full flex flex-col justify-between">
                            <CardDescription className="text-center text-sm md:text-base">
                                We are committed to preserving the natural and cultural beauty of the Himalayas through sustainable trekking practices.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl h-full">
                        <CardHeader className="flex flex-col items-center p-4 md:p-6">
                            <CardTitle className="text-xl md:text-2xl font-bold text-center">
                                Tailored Experiences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-full flex flex-col justify-between">
                            <CardDescription className="text-center text-sm md:text-base">
                                From affordable group treks to customized expeditions, we create unique experiences that align with your personal goals and fitness level.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </SectionContainer>
    );
}
