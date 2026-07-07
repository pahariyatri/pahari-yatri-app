'use client';

import Link from './common/Link';
import { DesktopNav } from './DesktopNav';
import Image from './common/Image';
import dynamic from 'next/dynamic';

import { usePathname } from 'next/navigation';

// Lazy load MobileNav since it's only needed on mobile/tablet
const MobileNav = dynamic(() => import('./MobileNav'), {
    loading: () => (
        <button className="p-2" aria-label="Loading menu">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </button>
    )
});

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    const pathname = usePathname();
    if (pathname === '/apply') return null;

    return (
        <header
            role="banner"
            className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
            aria-label="Pahari Yatri Global Navigation"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <div className="flex items-center justify-between py-3 px-6 backdrop-blur-md bg-background/85 border border-border/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            aria-label="Pahari Yatri Home - Authentic Himalayan Journeys"
                            className="group transition-transform hover:scale-105 active:scale-95"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 overflow-hidden rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors shadow-inner">
                                    <Image
                                        src="/static/logo.jpg"
                                        fill
                                        sizes="40px"
                                        alt="Pahari Yatri Official Brand Mark"
                                        className="object-cover"
                                    />
                                </div>
                                <span className="text-xl font-brandSerif font-bold tracking-tighter text-foreground decoration-primary/30 underline-offset-4 group-hover:underline">
                                    {title}
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden lg:block">
                            <DesktopNav />
                        </nav>
                        <div className="h-6 w-px bg-border/40 mx-2 hidden lg:block" />
                        <div className="lg:hidden">
                            <MobileNav />
                        </div>
                        <Link href="/about" className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-primary/70 hover:text-primary transition-colors hover:bg-primary/5 px-4 py-2 rounded-full border border-transparent hover:border-primary/10">
                            The Collective
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
