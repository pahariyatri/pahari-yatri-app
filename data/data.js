// src/data/data.js

export const heroBanner = {
    title: "Embark on Your Adventure",
    description: "Explore breathtaking trekking and mountaineering experiences",
    buttonText: "Discover Now",
    buttonLink: "/package",
};

export const customizeBanner = {
    title: "Explore New Places",
    description: "Our Highly Experienced, Qualified Team Will Guide You For Best Offbeat Feasible Budget Friendly Trip For You.",
    buttonText: "Customize Trip",
    buttonLink: "/customize-trip",
};

export const packages = [
    {
        title: 'Malana-Devroopa Trek',
        description: 'Explore breathtaking trails and majestic mountains with our guided trekking adventures.',
        href: '/package/adventure-trekking',
        price: '$999',
        duration: '7 Days',
        location: 'Himalayas',
        difficulty: 'Hard',
        imageSrc: '/static/favicons/android-chrome-512x512.png'
    },
    {
        title: 'Bushal Peak Trek Expedition',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/package/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        price: '$999',
        duration: '7 Days',
        location: 'Himalayas',
        difficulty: 'Hard'
    },
    {
        title: 'Shikari Devi Expedition',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/package/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        price: '$999',
        duration: '7 Days',
        location: 'Himalayas',
        difficulty: 'Hard'
    },
    {
        title: 'Kamrunag Lake Weekend Gateway',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/package/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        price: '$999',
        duration: '7 Days',
        location: 'Himalayas',
        difficulty: 'Hard'
    },
    {
        title: 'Devidarh Expedition',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/package/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        price: '$999',
        duration: '7 Days',
        location: 'Himalayas',
        difficulty: 'Hard'
    },
    {
        title: 'Cultural Tours',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/package/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        price: '$999',
        duration: '7 Days',
        location: 'Himalayas',
        difficulty: 'Hard'
    },
    // Add more package objects as needed
];

export const featuredPackages = [
    {
        title: 'Shrikhand Mahadev Yatra',
        description: 'Embark on a sacred pilgrimage to the revered Shrikhand Mahadev peak in the Himalayas. The journey to this holy site is not just a physical trek but a spiritual quest, where devotees seek blessings and enlightenment. Trek through rugged terrain, dense forests, and alpine meadows, passing by ancient temples and holy lakes along the way. Join us on this transformative journey to connect with the divine.',
        href: '/package/shrikhand-mahadev-yatra',
        imageSrc: '/static/images/pahari-yatri-banner.png'
    },
    {
        title: 'Manimahesh Yatra',
        description: 'Experience the divine beauty and serenity of the sacred Manimahesh Lake nestled amidst the towering peaks of the Himalayas. This spiritual pilgrimage takes you on a journey of self-discovery and devotion as you trek through pristine valleys, lush forests, and alpine meadows. Witness breathtaking vistas, offer prayers at ancient temples, and immerse yourself in the peaceful ambiance of this sacred land.',
        href: '/package/manimahesh-yatra',
        imageSrc: '/static/images/pahari-yatri-banner.png'
    },
    {
        title: 'Kinnaur Kailash Yatra',
        description: 'Embark on a pilgrimage to the sacred Kinnaur Kailash peak and explore the enchanting Kinnaur region. This spiritual journey takes you through picturesque valleys, quaint villages, and ancient monasteries, offering glimpses of traditional Himachali culture and lifestyle. Trek to remote mountain passes, visit sacred sites, and witness panoramic views of the Himalayas, making this pilgrimage a truly transformative experience.',
        href: '/package/kinnaur-kailash-yatra',
        imageSrc: '/static/images/pahari-yatri-banner.png'
    },
];

export const categories = [
    { id: 1, title: "Adventure", href: '/package/', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 2, title: "Beach", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 3, title: "Cultural", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 4, title: "Wildlife", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 5, title: "Hiking", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" },
    { id: 6, title: "City Tours", href: '', imageSrc: "/static/images/pahari-yatri-banner.png" }
];

export const services = [
    {
        id: 1,
        title: 'Camping',
        body: 'Enjoy organized camping trips with modern amenities and beautiful surroundings.',
        icon: '/static/icons/camping-tent-svgrepo-com.svg'
    },
    {
        id: 2,
        title: 'Trekking',
        body: 'Explore picturesque trails and stunning landscapes on our trekking adventures.',
        icon: '/static/icons/camping-tent-svgrepo-com.svg'
    },
    {
        id: 3,
        title: 'Mountaineering',
        body: 'Professionally guided mountaineering expeditions led by experienced climbers.',
        icon: '/static/icons/camping-tent-svgrepo-com.svg'
    },
    {
        id: 4,
        title: 'Adventure Tours',
        body: 'Exciting tours combining adventure activities with cultural exploration.',
        icon: '/static/icons/camping-tent-svgrepo-com.svg'
    },
    {
        id: 5,
        title: 'Photography Expeditions',
        body: 'Guided photography tours for enthusiasts to capture stunning landscapes and wildlife.',
        icon: '/static/icons/camping-tent-svgrepo-com.svg'
    },
    {
        id: 6,
        title: "Cultural Immersion",
        body: "Themed tours that offer a deep understanding of local cultures, traditions, and cuisine.",
        icon: '/static/icons/camping-tent-svgrepo-com.svg'
    }
]

export const accommodations = [
    {
        id: 1001,
        name: "Tranquil Stays: Gayatri Lodge, Kasauli",
        description: "Discover serenity and unmatched comfort at Gayatri Lodge, nestled in the heart of Kasauli.",
        imageSrc: "/static/images/pahari-yatri-banner.png",
        imageAlt: "Gayatri Lodge",
        href: "https://gayatrilodge.com/",
        location: "Kasauli, Himachal Pradesh"
    },
    {
        id: 987,
        name: "Tranquil Stays: Cedar Valley, Saroa",
        description: "Creating dynamic and responsive web applications with Angular",
        imageSrc: "/static/images/pahari-yatri-banner.png",
        imageAlt: "Cedar Valley",
        href: "#",
        location: "Saroa, Himachal Pradesh"
    },
    {
        id: 30092,
        name: "Tranquil Stays: Alpine Cafe, Devidarh",
        description: "Crafting interactive and modern user interfaces with React",
        imageSrc: "/static/images/pahari-yatri-banner.png",
        imageAlt: "Alpine Cafe",
        href: "#",
        location: "Devidarh, Himachal Pradesh"
    },
];

export const blogs = [
    {
        title: 'Adventure Trekking',
        description: 'Explore breathtaking trails and majestic mountains with our guided trekking adventures.',
        href: '/blog/adventure-trekking',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        tags: ['Adventure', 'Trekking', 'Mountains']
    },
    {
        title: 'Cultural Tours',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/blog/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        tags: ['Adventure', 'Trekking', 'Mountains']
    },
    {
        title: 'Cultural Tours',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/blog/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
        tags: ['Adventure', 'Trekking', 'Mountains']
    },
    {
        title: 'Cultural Tours',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/blog/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
    },
    {
        title: 'Cultural Tours',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/blog/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
    },
    {
        title: 'Cultural Tours',
        description: 'Immerse yourself in the rich culture and heritage of the Himalayan region with our curated tours.',
        href: '/blog/cultural-tours',
        imageSrc: '/static/favicons/android-chrome-512x512.png',
    },
    // Add more package objects as needed
];

export const testimonials = [
    {
        id: 1,
        title: "Amazing Experience",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        author: "John Doe"
    },
    {
        id: 2,
        title: "Highly Recommended",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        author: "Jane Smith"
    },
    {
        id: 3,
        title: "Great Guides",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        author: "Michael Johnson"
    },
];

export const faqs = [
    {
        id: '1',
        question: "Q. What is Pahari Yatri's mission?",
        answer: "A. Our mission at Pahari Yatri is to provide exhilarating trekking and mountaineering experiences that connect individuals with the breathtaking beauty of North India and beyond. We are passionate about promoting sustainable tourism practices and curating personalized adventures for our clients."
    },
    {
        id: '2',
        question: "Q. What types of travel experiences does Pahari Yatri offer?",
        answer: "A. Pahari Yatri specializes in adventure travel. Our offerings include thrilling adventure expeditions, camping in picturesque landscapes, adventure tours that combine activities and cultural immersions, and opportunities for cultural immersion in local traditions."
    },
    {
        id: '3',
        question: "Q. How can I book a trip with Pahari Yatri?",
        answer: "A. Booking a trip with Pahari Yatri is easy. You can explore our travel packages on our website, select the one that suits your preferences, and follow the booking instructions. Our team is also available to assist you if you have any questions or need personalized recommendations."
    },
    {
        id: '4',
        question: "Q. Is safety a priority at Pahari Yatri?",
        answer: "A. Absolutely! Your safety is our top priority. We adhere to rigorous safety protocols and provide expert guidance to ensure secure and enriching experiences for all our travelers. Our experienced guides and staff are trained to handle various situations and prioritize your well-being."
    },
    {
        id: '5',
        question: "Q. What sets Pahari Yatri apart from other travel companies?",
        answer: "A. Pahari Yatri stands out for its unique blend of cutting-edge technology and a deep love for adventure. We offer personalized adventures that cater to your preferences, and our commitment to sustainability ensures that your travel has a positive impact on the environment and local communities."
    },
    // Add more FAQs as needed
];
