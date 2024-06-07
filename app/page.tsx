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

import { heroBanner, customizeBanner, packages, featuredPackages, categories, services, accommodations, testimonials, faqs } from "@/data/data";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const blogsData = await reader.collections.blogs.all();
  const blogs = blogsData.map(blog => ({
    title: blog.entry.title,
    description: blog.entry.description,
    href: `/blog/${blog.slug}`,
    imageSrc: blog.entry.image || blog.entry.image || "/static/images/default-image.png",
    tags: [] 
  }));

  return (
    <div className=" min-h-screen">
      <HeroBanner
        title={heroBanner.title}
        description={heroBanner.description}
        buttonText={heroBanner.buttonText}
        buttonLink={heroBanner.buttonLink}
      />
      <Package packages={packages} />
      <Category categories={categories}></Category>
      <FeaturedPackage featuredPackages={featuredPackages}></FeaturedPackage>
      {/* <Gallery></Gallery> */}
      <Service services={services}></Service>
      <HeroBanner
        title={customizeBanner.title}
        description={customizeBanner.description}
        buttonText={customizeBanner.buttonText}
        buttonLink={customizeBanner.buttonLink}
      />
      <Accommodation accommodations={accommodations}></Accommodation>
      {/* <AboutUs></AboutUs> */}
      <Blog blogs={blogs}></Blog>
      <Testimonials testimonials={testimonials}></Testimonials>
      <Faq faqs={faqs}></Faq>
      {/* <ConactUs></ConactUs> */}
    </div>
  );
}
