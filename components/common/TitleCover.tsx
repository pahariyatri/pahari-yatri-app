'use client';

import { ReactNode } from "react"
import { useEffect, useState } from "react"

interface Props {
    children: ReactNode
}

export default function TitleCover({ children }: Props) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <h2 className="text-2xl mb-4 md:mb-6 font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 md:text-4xl md:leading-12 lg:text-5xl lg:leading-14 relative">
            {children}
        </h2>
    )
}