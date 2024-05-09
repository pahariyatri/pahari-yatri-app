import SectionContainer from "./SectionContainer";
import PageTitle from "./common/PageTitle";
import { Button } from "./ui/button";

export default function ContactUs() {
    return (
        <SectionContainer>
            <PageTitle>
                Contact Us
            </PageTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
                    <form className="space-y-4">
                        
                        <Button className=" font-bold py-3 px-6 rounded-full transition duration-300">Send Now</Button>
                    </form>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                    <p className="mb-2">123 Main Street</p>
                    <p className="mb-2">City, State, ZIP</p>
                    <p className="mb-2">Phone: (123) 456-7890</p>
                    <p>Email: info@example.com</p>
                </div>
            </div>
        </SectionContainer>
    );
}
