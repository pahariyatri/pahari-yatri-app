import Link from "./common/Link";
import SectionContainer from "./common/SectionContainer";
import SectionHeading from "./common/SectionHeading";
import PageTitle from "./common/TitleCover";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function Membership() {

    return (
        <SectionContainer>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title="Yatri Pass Membership">
                </SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            name: "Yatri Explorer",
                            description: "Perfect for first-time Himalayan adventurers",
                            price: "₹25,000",
                            benefits: ["3 seasonal treks per year", "Priority booking", "Exclusive guides"]
                        },
                        {
                            name: "Yatri Seeker",
                            description: "For those seeking deeper spiritual connections",
                            price: "₹45,000",
                            benefits: ["6 premium treks per year", "Sacred site access", "Personal guidance"]
                        },
                        {
                            name: "Yatri Master",
                            description: "Ultimate Himalayan transformation experience",
                            price: "₹75,000",
                            benefits: ["Unlimited access", "Custom journeys", "Lifetime benefits"]
                        }
                    ].map((tier, index) => (
                        <Card key={index} className="text-center border-himalayan-mist hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold font-brandSerif text-himalayan-green">
                                    {tier.name}
                                </CardTitle>
                                <p className="text-muted-foreground text-sm">
                                    {tier.description}
                                </p>
                                <div className="mt-4">
                                    <span className="text-3xl font-bold text-himalayan-green">{tier.price}</span>
                                    <span className="text-muted-foreground">/year</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 mb-6">
                                    {tier.benefits.map((benefit, benefitIndex) => (
                                        <li key={benefitIndex} className="text-sm text-muted-foreground">
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/yatri-pass" className="block w-full">
                                    <Button className="w-full bg-himalayan-green hover:bg-himalayan-green-600 text-white">
                                        Learn More
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/yatri-pass">
                        <Button className="bg-himalayan-green hover:bg-himalayan-green-600 text-white px-8 py-3">
                            Apply for Yatri Pass
                        </Button>
                    </Link>
                </div>
            </div>
        </SectionContainer>
    )
}
