import AboutUs from "@/components/AboutUs";
import Blog from "@/components/Blog";
import ConactUs from "@/components/ContactUs";
import Faq from "@/components/Faq";
import Gallery from "@/components/Gallery";
import HeroBanner from "@/components/HeroBanner";
import Package from "@/components/Package";

export default function Home() {
  return (
    <main className=" min-h-screen">
      <HeroBanner></HeroBanner>
      <AboutUs></AboutUs>
      <Package></Package>
      <Gallery></Gallery>
      <Blog></Blog>
      <Faq></Faq>
      <ConactUs></ConactUs>
    </main>
  );
}
