import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "@/components/common/Image";
import Link from "@/components/common/Link";
import { Button } from "@/components/ui/button";
import BrandStory from "@/components/BrandStory";

export default function WhyPahariYatri() {
  return (
    <SectionContainer>
      <BrandStory></BrandStory>
      <div className="text-center mb-14">
        <p className="text-xs md:text-sm font-medium uppercase tracking-[0.15em] text-primary mb-4 animate-fade-in">
          The Yatri Way
        </p>
        <PageTitle>
          Our Approach
        </PageTitle>
        <p className="text-base md:text-lg mx-auto max-w-2xl text-muted-foreground leading-relaxed animate-fade-in">
          Not tourism. Not crowds.
          Just sacred Himalayan journeys—raw, personal, and unforgettable.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12 animate-fade-in">
        {/* Card 1 - Apple-style minimal design with hover animation */}
        <Card className="group bg-card/50 backdrop-blur-xl border border-border/40 shadow-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/40 hover:transform hover:scale-105">
          <CardHeader className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
              </svg>
            </div>
            <CardTitle className="text-xl md:text-2xl font-semibold text-center transition-all duration-300 group-hover:text-primary">
              Hidden Trails
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <CardDescription className="text-center text-base text-muted-foreground">
              Beyond maps, into the unseen.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="group bg-card/50 backdrop-blur-xl border border-border/40 shadow-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/40 hover:transform hover:scale-105">
          <CardHeader className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <CardTitle className="text-xl md:text-2xl font-semibold text-center transition-all duration-300 group-hover:text-primary">
              Intimate Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <CardDescription className="text-center text-base text-muted-foreground">
              We keep it small, to keep it real
            </CardDescription>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="group bg-card/50 backdrop-blur-xl border border-border/40 shadow-md rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/40 hover:transform hover:scale-105">
          <CardHeader className="flex flex-col items-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <CardTitle className="text-xl md:text-2xl font-semibold text-center transition-all duration-300 group-hover:text-primary">
              Rooted in Culture
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <CardDescription className="text-center text-base text-muted-foreground">
              Travel with respect, live the stories.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Brand Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 mt-20">

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
