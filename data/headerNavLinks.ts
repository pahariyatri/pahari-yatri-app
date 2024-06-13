const headerNavLinks = [
    { href: '/', title: 'Home' },
    {
        href: '/package', title: 'Packages', submenu: [
            { href: '/package/standard', title: 'Standard', description: 'Standard Package' },
            { href: '/package/premium', title: 'Premium', description: 'Premium Package' },
            { href: '/package/custom', title: 'Custom', description: 'Custom Package' },
        ]
    },
    {
        href: '/blog', title: 'Blog',
    },
    { href: '/about-us', title: 'About Us' },
];

export default headerNavLinks;
