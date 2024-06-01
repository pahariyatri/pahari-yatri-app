import AboutUs from "@/components/AboutUs";
import Accommodation from "@/components/Accommodation";
import Blog from "@/components/Blog";
import Category from "@/components/Category";
import ConactUs from "@/components/ContactUs";
import Faq from "@/components/Faq";
import FeaturedPackage from "@/components/FeaturedPackage";
import Gallery from "@/components/Gallery";
import HeroBanner from "@/components/HeroBanner";
import Package from "@/components/Package";
import Service from "@/components/Service";
import Testimonials from "@/components/Testimonials";
import { title } from "process";

const heroBanner = {
  title: "Embark on Your Adventure",
  description: "Explore breathtaking trekking and mountaineering experiences",
  buttonText: "Discover Now",
  buttonLink: "/package",
}
const customizeBanner = {
  title: "Customized Holidays",
  description: "Holidays for you! Tell us what you want and we will design it for you or explore our special packages.",
  buttonText: "Customize Now",
  buttonLink: "/package",
}
const packages = [
  {
    title: 'Adventure Trekking',
    description: 'Explore breathtaking trails and majestic mountains with our guided trekking adventures.',
    href: '/package/adventure-trekking',
    price: '$999',
    duration: '7 Days',
    location: 'Himalayas',
    difficulty: 'Hard',
    imageSrc: '/static/favicons/android-chrome-512x512.png'
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

export default function Home() {
  return (
    <main className=" min-h-screen">
      <HeroBanner
        title={heroBanner.title}
        description={heroBanner.description}
        buttonText={heroBanner.buttonText}
        buttonLink={heroBanner.buttonLink}
      />
      <Package packages={packages} />
      <Category></Category>
      <FeaturedPackage></FeaturedPackage>
      {/* <Gallery></Gallery> */}
      <Service></Service>
      <HeroBanner
        title={customizeBanner.title}
        description={customizeBanner.description}
        buttonText={customizeBanner.buttonText}
        buttonLink={customizeBanner.buttonLink}
      />
      <Accommodation></Accommodation>
      {/* <AboutUs></AboutUs> */}
      <Blog></Blog>
      <Testimonials></Testimonials>
      <Faq></Faq>
      {/* <ConactUs></ConactUs> */}
    </main>
  );
}
