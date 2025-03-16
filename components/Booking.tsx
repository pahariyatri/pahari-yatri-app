"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function Booking({ packageName }: { packageName: string }) {
    const [name, setName] = useState("");
    const [dates, setDates] = useState("");
    const [participants, setParticipants] = useState("1"); // Default to 1 participant

    const handleBooking = () => {
        if (!name || !dates) {
            alert("Please enter your name and preferred trek dates.");
            return;
        }

        const whatsappNumber = "6280888188";
        const message = `Hey *Pahari Yatri*!

I’d like to book *${packageName}* for *${participants}* people on ${dates}.
Could you share the details—stay, food, trek guide, and booking process?

Thanks,
${name}`;

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full py-3 px-6 font-bold rounded-lg bg-green-600 hover:bg-green-700 transition duration-300">
                    Book Now
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[360px] sm:w-[450px]">
                <SheetHeader>
                    <SheetTitle>Book Your Package</SheetTitle>
                    <SheetDescription>Fill in your details & book instantly via WhatsApp.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dates">Preferred Dates *</Label>
                        <Input type="date" id="dates" value={dates} onChange={(e) => setDates(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="participants">Number of Participants</Label>
                        <Input type="number" id="participants" value={participants} min="1" onChange={(e) => setParticipants(e.target.value)} />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="button" onClick={handleBooking} className="bg-green-600 hover:bg-green-700 transition duration-300">
                            Book on WhatsApp
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
