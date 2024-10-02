"use client";

import Image from "./common/Image";

export default function WhatsAppButton() {
    const handleWhatsAppClick = () => {
        window.open("https://api.whatsapp.com/send?phone=6280888188&text=Hello%20Pahari%20Yatri,%20I%20would%20like%20to%20inquire%20about%20your%20trekking%20services.", "_blank");
    };

    return (
        <div className="fixed bottom-4 right-2 z-50" onClick={handleWhatsAppClick}>
            <Image src={'/static/WhatsApp-Logo.png'} height={80} width={80} alt="Pahari Yatri Contact Us" className="rounded-full" />
        </div>
    );
}
