import AboutUs from "@/components/AboutUs";
import Accommodation from "@/components/Accommodation";
import Blog from "@/components/Blog";
import ConactUs from "@/components/ContactUs";
import Faq from "@/components/Faq";
import Gallery from "@/components/Gallery";
import HeroBanner from "@/components/HeroBanner";
import Package from "@/components/Package";
import Service from "@/components/Service";

export default function Home() {
  return (
    <main className=" min-h-screen">
      <HeroBanner></HeroBanner>
      <AboutUs></AboutUs>
      <Package></Package>
      {/* <Gallery></Gallery> */}
      <Accommodation></Accommodation>
      <Service></Service>
      <Blog></Blog>
      <Faq></Faq>
      <ConactUs></ConactUs>
    </main>
  );
}
