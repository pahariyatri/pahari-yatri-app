import SectionContainer from "./common/SectionContainer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function Booking() {
    return (
        <Sheet>
            <SheetTrigger asChild><Button className="w-full py-3 px-6 font-bold rounded-lg"> Book Now</Button></SheetTrigger>
            <SheetContent className="w-[360px] sm:w-[450px]">
                <SheetHeader>
                    <SheetTitle>Book Your Trek</SheetTitle>
                    <SheetDescription>
                        Schedule a call with us to enquire about a trek in Jammu & Kashmir
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  gap-2">
                        <Label htmlFor="name" className="text-right">
                            Full Name
                        </Label>
                        <Input id="name" type="text" className="col-span-3" />
                    </div>
                    <div className="grid  gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone
                        </Label>
                        <Input type="tel" id="phone" className="col-span-3" />
                    </div>
                    <div className="grid  gap-4">
                        <Label htmlFor="participants" className="text-right">
                            Number of Participants
                        </Label>
                        <Input type="number" id="participants" className="col-span-3" required />
                    </div>
                    <div className="grid  gap-4">
                        <Label htmlFor="dates" className="text-right">
                            Preferred Trek Dates
                        </Label>
                        <Input type="date" id="dates" className="col-span-3" required />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Call Me</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    );
}
