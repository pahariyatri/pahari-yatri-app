import AboutUs from "@/components/AboutUs";
import Accommodation from "@/components/Accommodation";
import Blog from "@/components/Blog";
import Category from "@/components/Category";
import Faq from "@/components/Faq";
import FeaturedPackage from "@/components/FeaturedPackage";
import HeroBanner from "@/components/HeroBanner";
import Package from "@/components/Package";
import Service from "@/components/Service";
import Testimonials from "@/components/Testimonials";

import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const heroBannersData = await reader.singletons.banners.read();
  const blogsData = await reader.collections.blogs.all();
  const packageData = await reader.collections.packages.all();
  const accommodationsData = await reader.collections.accommodations.all();
  const categoryData = await reader.collections.categories.all();
  const faqsList = await reader.singletons.faqs.readOrThrow();
  const testimonialsList = await reader.singletons.testimonials.readOrThrow();
  const serviceList = await reader.singletons.services.readOrThrow();

  const heroBanners = heroBannersData?.data.map(banner => ({
    title: banner.title,
    description: banner.description,
    buttonText: banner.buttonText,
    buttonLink: banner.buttonLink,
    image: banner.image
  })) || [];

  const blogs = blogsData.map(blog => ({
    title: blog.entry.title,
    description: blog.entry.excerpt,
    href: `/blog/${blog.slug}`,
    imageSrc: blog.entry.image || "`https://pahariyatri.com/api/og?title='Pahari Yatri`",
    tags: [...blog.entry.tags]
  }));
  const packages = packageData.map(pkg => ({
    title: pkg.entry.title,
    description: pkg.entry.excerpt,
    imageSrc: pkg.entry.image,
    href: `/package/${pkg.slug}`,
    price: pkg.entry.price ?? 0,
    location: pkg.entry.location,
  }));
  const accommodations = accommodationsData.map(accommodation => ({
    name: accommodation.entry.name,
    description: accommodation.entry.description,
    imageSrc: accommodation.entry.image || `https://pahariyatri.com/api/og?title='Pahari Yatri`,
    href: `/accommodation/${accommodation.slug}`,
    location: accommodation.entry.location,
  }))
  const featuredPackages = packageData
    .filter(pkg => pkg.entry.isFeatured === true)
    .map(pkg => ({
      title: pkg.entry.title,
      description: pkg.entry.excerpt,
      imageSrc: pkg.entry.image,
      href: `/package/${pkg.slug}`,
      price: pkg.entry.price ?? 0,
      location: pkg.entry.location,
    }))
  const categories = categoryData.filter(category => category.entry.title !== null).map(category => ({
    title: category.entry.title,
    href: `/package?category=${category.slug}`,
    imageSrc: category.entry.image
  }))
  const faqs = faqsList.faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));
  const testimonials = testimonialsList.data.map(testimonial => ({
    title: testimonial.title,
    description: testimonial.description,
    author: testimonial.author,
  }));
  const services = serviceList.data.map(service => ({
    title: service.title,
    description: service.description,
    icon: service.icon
  }))

  return (
    <div className=" min-h-screen">
      <HeroBanner heroBanners={heroBanners} />
      <Package packages={packages} />
      <Category categories={categories}></Category>
      <FeaturedPackage featuredPackages={featuredPackages}></FeaturedPackage>
      <Service services={services}></Service>
      <AboutUs></AboutUs>
      <Accommodation accommodations={accommodations}></Accommodation>
      <Blog blogs={blogs}></Blog>
      <Testimonials testimonials={testimonials}></Testimonials>
      <Faq faqs={faqs}></Faq>
    </div>
  );
}
