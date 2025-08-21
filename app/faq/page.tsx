import SectionContainer from "@/components/common/SectionContainer";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import Link from '@/components/common/Link';
import Faq from '@/components/Faq';
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function About() {
  const faqsData = await reader.singletons.faqs.readOrThrow();
  const faqs = faqsData.faqs ? faqsData.faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer,
  })) : [];

  return (
    <SectionContainer>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" className="block">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{'FAQs'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Faq faqs={faqs}></Faq>

    </SectionContainer>
  );
}
