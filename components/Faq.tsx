import SectionContainer from "./common/SectionContainer";
import PageTitle from "./common/TitleCover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const faqs = [
    {
        id: 1,
        question: "Q. What is Pahari Yatri's mission?",
        answer: "A. Our mission at Pahari Yatri is to provide exhilarating trekking and mountaineering experiences that connect individuals with the breathtaking beauty of North India and beyond. We are passionate about promoting sustainable tourism practices and curating personalized adventures for our clients."
    },
    {
        id: 2,
        question: "Q. What types of travel experiences does Pahari Yatri offer?",
        answer: "A. Pahari Yatri specializes in adventure travel. Our offerings include thrilling adventure expeditions, camping in picturesque landscapes, adventure tours that combine activities and cultural immersions, and opportunities for cultural immersion in local traditions."
    },
    {
        id: 3,
        question: "Q. How can I book a trip with Pahari Yatri?",
        answer: "A. Booking a trip with Pahari Yatri is easy. You can explore our travel packages on our website, select the one that suits your preferences, and follow the booking instructions. Our team is also available to assist you if you have any questions or need personalized recommendations."
    },
    {
        id: 4,
        question: "Q. Is safety a priority at Pahari Yatri?",
        answer: "A. Absolutely! Your safety is our top priority. We adhere to rigorous safety protocols and provide expert guidance to ensure secure and enriching experiences for all our travelers. Our experienced guides and staff are trained to handle various situations and prioritize your well-being."
    },
    {
        id: 5,
        question: "Q. What sets Pahari Yatri apart from other travel companies?",
        answer: "A. Pahari Yatri stands out for its unique blend of cutting-edge technology and a deep love for adventure. We offer personalized adventures that cater to your preferences, and our commitment to sustainability ensures that your travel has a positive impact on the environment and local communities."
    },
    // Add more FAQs as needed
];

export default function Faq() {
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