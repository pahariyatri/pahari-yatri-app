import headerNavLinks from '@/data/headerNavLinks'
import Link from './common/Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { DektopNav } from './DesktopNav';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <header className="flex items-center sticky top-0 z-50 justify-between py-0 sm:py-10">
            <div>
                <Link href="/" aria-label={title}>
                    <div className="flex items-center justify-between">
                        <div className="mr-3">
                        </div>
                        {typeof title === 'string' ? (
                            <div className="hidden h-6 text-2xl font-semibold sm:block">
                                {title}
                            </div>
                        ) : (
                            title
                        )}
                    </div>
                </Link>
            </div >
            <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                <div className="hidden sm:block">
                    <DektopNav></DektopNav>
                </div>
                <ThemeSwitch />
                <MobileNav />
            </div>
        </header >
    )
}

export default Header