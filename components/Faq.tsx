import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface FaqProps {
    faqs: Array<{
        id: string;
        question: string;
        answer: string;
    }>;
}

export default function Faq({ faqs }: FaqProps) {
    return (
        <SectionContainer>
            <div className="text-center">
                <PageTitle>
                    FAQs
                </PageTitle>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map(faq => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </SectionContainer>
    );
}