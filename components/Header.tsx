import Link from './common/Link';
import MobileNav from './MobileNav';
import { DesktopNav } from './DesktopNav';
import Image from './common/Image';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <header className="flex items-center sticky top-0 z-50 justify-between py-4 px-4 sm:px-8 backdrop-blur-xl bg-background/70 border-b border-border/40 transition-all duration-300">
            <div>
                <Link href="/" aria-label={title}>
                    <div className="flex items-center gap-3">
                        <Image src="/static/logo.jpg" height={40} width={40} alt="Pahari Yatri Logo" className="rounded-full shadow-sm" />
                        <span className="text-xl font-bold text-foreground font-brandSerif tracking-tight hidden sm:block">{title}</span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="hidden sm:block">
                    <DesktopNav />
                </div>
                <div className="sm:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    );
};

export default Header;
