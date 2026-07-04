import PageHero from "@/components/common/PageHero";
import SectionContainer from "@/components/common/SectionContainer";
import ContributeForm from "./contribute-form";
import { genPageMetadata } from "@/app/seo";

export async function generateMetadata() {
  return genPageMetadata({
    title: "Contribute a Story to the Himalayan Library",
    description:
      "Walked a trail, met a village, heard a legend? Contribute your Himalayan story, local knowledge, or folklore to the Pahari Yatri library. Your words can become a chapter.",
    alternates: { canonical: "/contribute" },
  });
}

export default function ContributePage() {
  return (
    <div>
      <PageHero
        kicker="Add your voice"
        title="Your story can become a chapter."
        subtitle="The library grows through the people who walk it. Share a trail, a village memory, a temple, or a piece of folklore."
        image="/static/images/pages/contribute.jpg"
      />

      <SectionContainer className="py-16 sm:py-24">
        <div className="max-w-xl mx-auto mb-14 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            Write the way you&apos;d tell it by a fire, honestly, in your own
            voice. We read every contribution, and the ones that belong become
            part of the digital Himalayan library, credited to you.
          </p>
        </div>
        <ContributeForm />
      </SectionContainer>
    </div>
  );
}
