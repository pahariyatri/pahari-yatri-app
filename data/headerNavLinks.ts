const headerNavLinks = [
    { href: '/', title: 'Home' },
    {
        href: '/package', title: 'Packages', submenu: [
            { href: '/package/standard', title: 'Standard' },
            { href: '/package/premium', title: 'Premium' },
            { href: '/package/custom', title: 'Custom' },
        ]
    },
    {
        href: '/blog', title: 'Blog', submenu: [
            { href: '/blog/news', title: 'News' },
            { href: '/blog/tutorials', title: 'Tutorials' },
            { href: '/blog/reviews', title: 'Reviews' },
        ]
    },
    { href: '/about-us', title: 'About Us' },
];

export default headerNavLinks;
