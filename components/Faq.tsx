import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface FaqProps {
    faqs: Array<{
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
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
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