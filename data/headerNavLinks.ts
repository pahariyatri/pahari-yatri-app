const headerNavLinks = [
    { href: '/', title: 'Home' },
    {
        href: '/package', title: 'Packages', submenu: [
            { href: 'package?duration=3', title: 'Short Trips', description: 'Short & Easy Trails' },
            { href: '/package?duration=5', title: 'Moderate Trips', description: 'Multi-day Adventures' },
            { href: '/package?duration=7', title: 'Extended Trips', description: 'Challenging Journeys' },
        ]
    },
    {
        href: '/blog', title: 'Blog',
    },
    { href: '/about-us', title: 'About Us' },
];

export default headerNavLinks;
