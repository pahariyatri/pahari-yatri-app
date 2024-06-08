import headerNavLinks from '@/data/headerNavLinks'
import Link from './common/Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig);
const Header = async () => {
    const config = await reader.singletons.config.read();
    return (
        <header className="flex items-center sticky top-0 z-50 justify-between py-0 sm:py-10">
            <div>
                <Link href="/" aria-label={config?.headerTitle}>
                    <div className="flex items-center justify-between">
                        <div className="mr-3">
                        </div>
                        {typeof config?.headerTitle === 'string' ? (
                            <div className="hidden h-6 text-2xl font-semibold sm:block">
                                {config?.headerTitle}
                            </div>
                        ) : (
                            config?.headerTitle
                        )}
                    </div>
                </Link>
            </div >
            <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                {headerNavLinks
                    .map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
                        >
                            {link.title}
                        </Link>
                    ))}
                {/* <SearchButton /> */}
                <ThemeSwitch />
                <MobileNav />
            </div>
        </header >
    )
}

export default Header