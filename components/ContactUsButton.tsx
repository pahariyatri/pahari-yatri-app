"use client"

import Image from "./common/Image";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function ContactUsButton() {
    const handleWhatsAppClick = () => {
        window.open("https://api.whatsapp.com/send?phone=6280888188&text=Hello%20Pahari%20Yatri,%20I%20would%20like%20to%20inquire%20about%20your%20trekking%20services.", "_blank");
    };

    const handlePhoneClick = () => {
        window.open("tel:6280888188");
    };

    const handleEmailClick = () => {
        window.open("mailto:example@example.com");
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="fixed bottom-4 right-4 z-50 animate-pulse">
                    <Image src={'/static/logo.jpg'} height={60} width={60} alt="" className="rounded-full" />
                </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
                <SheetHeader>
                    <SheetTitle>Contact Us</SheetTitle>
                    <SheetDescription>
                        Have questions or want to book a trek? Reach out to us!
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        Phone: <a href="tel:6280888188" onClick={handlePhoneClick}>+1234567890</a>
                    </div>
                    <div>
                        WhatsApp: <a href="https://api.whatsapp.com/send?phone=6280888188" onClick={handleWhatsAppClick}>+1234567890</a>
                    </div>
                    <div>
                        Email: <a href="mailto:example@example.com" onClick={handleEmailClick}>example@example.com</a>
                    </div>
                    <form id="contactForm">
                        <div className="mb-6">
                            <div className="mx-0 mb-1 sm:mb-4">
                                <div className="mx-0 mb-1 sm:mb-4">
                                    <label htmlFor="name"
                                        className="pb-1 text-xs uppercase tracking-wider"></label><input
                                        type="text" id="name" autoComplete="given-name" placeholder="Your name"
                                        className="mb-2 w-full focus:outline-0 rounded-md border border-gray-400 py-2 pl-2 pr-4  shadow-md dark:text-gray-300 sm:mb-0"
                                        name="name" />
                                </div>
                                <div className="mx-0 mb-1 sm:mb-4">
                                    <label htmlFor="email"
                                        className="pb-1 text-xs uppercase tracking-wider"></label><input
                                        type="email" id="email" autoComplete="email"
                                        placeholder="Your email address"
                                        className="mb-2 w-full focus:outline-0 rounded-md border border-gray-400 py-2 pl-2 pr-4  shadow-md dark:text-gray-300 sm:mb-0"
                                        name="email" />
                                </div>
                            </div>
                            <div className="mx-0 mb-1 sm:mb-4">
                                <label htmlFor="textarea"
                                    className="pb-1 text-xs uppercase tracking-wider"></label><textarea
                                        id="textarea" name="textarea"
                                        placeholder="Write your message..."
                                        className="mb-2 w-full focus:outline-0 rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  dark:text-gray-300 sm:mb-0"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Call Me</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    );
};
