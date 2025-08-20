import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "@/components/common/Image";
import Link from "@/components/common/Link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";

export default function WhyPahariYatri() {
  return (
    <SectionContainer>
      <SectionHeader
        eyebrow="Our Story"
        title={<PageTitle>Why Pahari Yatri?</PageTitle>}
        description="We don&apos;t just organize treks—we curate transformative journeys that connect you with the spiritual essence of the Himalayas."
      />

      {/* Brand Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative">
          <Image
            src="/static/logo.jpg"
            alt="Pahari Yatri Story"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-96"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-brandSerif text-himalayan-green">
            Not Just Treks. Transformations.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every journey with Pahari Yatri is designed to be more than a physical challenge—it&apos;s a spiritual awakening, a cultural immersion, and a personal transformation.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Certified mountain guides with deep spiritual and cultural knowledge</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Exclusive access to sacred sites and hidden trails</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Sustainable practices that preserve Himalayan culture and environment</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-himalayan-saffron rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">Personalized experiences tailored to your spiritual and physical goals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selective Guest Policy */}
      <div className="bg-himalayan-mist rounded-2xl p-8 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold font-brandSerif text-himalayan-green mb-4">
            Selective Guest Policy
          </h3>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            We carefully select our guests to ensure meaningful connections and shared values. Our journeys are not mass tourism—they are intimate gatherings of like-minded souls seeking transformation.
          </p>
          <Link href="/contact">
            <Button className="bg-himalayan-green hover:bg-himalayan-green-600 text-white px-8 py-3">
              Apply to Join
            </Button>
          </Link>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card className="text-center border-himalayan-mist hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-himalayan-green font-brandSerif">Authenticity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Genuine experiences that honor local traditions and preserve the sacred nature of Himalayan sites.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center border-himalayan-mist hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-himalayan-green font-brandSerif">Sustainability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Eco-conscious practices that minimize our footprint and support local communities.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center border-himalayan-mist hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-himalayan-green font-brandSerif">Transformation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Journeys that challenge, inspire, and transform—both physically and spiritually.
            </p>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
}
