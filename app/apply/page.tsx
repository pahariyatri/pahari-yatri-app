import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import ApplicationForm from "@/components/application/ApplicationForm";

export default function Apply() {
  return (
    <SectionContainer>
      <div className="text-center mb-16 animate-fade-in">
        <p className="text-base font-semibold uppercase tracking-widest text-primary mb-4 animate-pulse bg-clip-text">
          Begin Your Journey
        </p>
        {/* <PageTitle>
          Application Form
        </PageTitle>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
          Ready to embark on a transformative Himalayan journey? Complete the form below to start your adventure with Pahari Yatri.
        </p> */}
      </div>

      <div className="max-w-3xl mx-auto mb-20">
        <ApplicationForm />
      </div>
    </SectionContainer>
  );
}