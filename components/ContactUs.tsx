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
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Name</label>
                            <input type="text" id="name" name="name" className="mt-1 p-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium">Message</label>
                            <textarea id="message" name="message" rows="4" className="mt-1 p-2 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                        </div>
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
