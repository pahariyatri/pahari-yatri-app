import AboutUs from "@/components/AboutUs";
import Accommodation from "@/components/Accommodation";
import Blog from "@/components/Blog";
import Category from "@/components/Category";
import ConactUs from "@/components/ContactUs";
import Faq from "@/components/Faq";
import Gallery from "@/components/Gallery";
import HeroBanner from "@/components/HeroBanner";
import Package from "@/components/Package";
import Service from "@/components/Service";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className=" min-h-screen">
      <HeroBanner></HeroBanner>
      {/* <AboutUs></AboutUs> */}
      <Package></Package>
      <Category></Category>
      {/* <Gallery></Gallery> */}
      <Accommodation></Accommodation>
      <Service></Service>
      <Blog></Blog>
      <Testimonials></Testimonials>
      <Faq></Faq>
      <ConactUs></ConactUs>
    </main>
  );
}
