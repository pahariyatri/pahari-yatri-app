import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";

export default function YatriPass() {
  const membershipTiers = [
    {
      name: "Yatri Explorer",
      description: "Perfect for first-time Himalayan adventurers",
      price: "₹25,000",
      benefits: [
        "Access to 3 seasonal treks per year",
        "Priority booking for popular routes",
        "Exclusive pre-trek preparation guide",
        "Member-only gear recommendations",
        "Quarterly Himalayan insights newsletter"
      ]
    },
    {
      name: "Yatri Seeker",
      description: "For those seeking deeper spiritual connections",
      price: "₹45,000",
      benefits: [
        "Access to 6 premium treks per year",
        "Exclusive access to sacred sites",
        "Personalized spiritual guidance",
        "Advanced trekking skills workshops",
        "Direct access to certified guides",
        "Member-only cultural immersion events"
      ]
    },
    {
      name: "Yatri Master",
      description: "Ultimate Himalayan transformation experience",
      price: "₹75,000",
      benefits: [
        "Unlimited access to all treks",
        "Custom-designed spiritual journeys",
        "One-on-one mentorship with senior guides",
        "Exclusive access to hidden trails",
        "Annual retreat with like-minded seekers",
        "Lifetime membership benefits"
      ]
    }
  ];

  return (
    <SectionContainer>
      <div className="text-center mb-16">
        <p className="text-base font-semibold uppercase tracking-widest text-himalayan-saffron mb-4">
          Membership
        </p>
        <PageTitle className="font-brandSerif text-himalayan-green">
          Yatri Pass
        </PageTitle>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground leading-relaxed">
          Join an exclusive community of Himalayan seekers. Our membership program offers more than just treks—it's a gateway to transformation.
        </p>
      </div>

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {membershipTiers.map((tier, index) => (
          <Card key={index} className="relative border-himalayan-mist hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {index === 1 && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-himalayan-saffron text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center pb-4">
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
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/contact" className="block w-full">
                  <Button className="w-full bg-himalayan-green hover:bg-himalayan-green-600 text-white">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-himalayan-mist rounded-2xl p-8 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold font-brandSerif text-himalayan-green mb-6">
            Why Choose Yatri Pass?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-himalayan-saffron rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-himalayan-green">Exclusive Access</h4>
                  <p className="text-sm text-muted-foreground">Visit sacred sites and hidden trails not accessible to regular trekkers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-himalayan-saffron rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-himalayan-green">Community</h4>
                  <p className="text-sm text-muted-foreground">Connect with like-minded seekers and build lasting friendships.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-himalayan-saffron rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-himalayan-green">Personal Growth</h4>
                  <p className="text-sm text-muted-foreground">Structured programs designed for spiritual and physical transformation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-himalayan-saffron rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-himalayan-green">Sustainability</h4>
                  <p className="text-sm text-muted-foreground">Your membership supports local communities and environmental conservation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold font-brandSerif text-himalayan-green mb-4">
          Ready to Begin Your Transformation?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join our community of Himalayan seekers and discover the path to your true self through sacred journeys and spiritual awakening.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button className="bg-himalayan-green hover:bg-himalayan-green-600 text-white px-8 py-3">
              Apply for Yatri Pass
            </Button>
          </Link>
          <Link href="/package">
            <Button variant="outline" className="border-himalayan-green text-himalayan-green hover:bg-himalayan-green hover:text-white px-8 py-3">
              View All Yatras
            </Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
