import PageIntro from "@/components/common/PageIntro";
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
      <PageIntro
        kicker="Add your voice"
        title="Your story can become a chapter."
        subtitle="Help document the Himalaya through stories, photographs, knowledge and local voices. Write the way you'd tell it by a fire, honestly, in your own voice — we read every contribution, and the ones that belong become part of the digital Himalayan library, credited to you."
      />

      <SectionContainer className="pt-2 sm:pt-4 pb-16 sm:pb-24">
        <ContributeForm />
      </SectionContainer>
    </div>
  );
}
