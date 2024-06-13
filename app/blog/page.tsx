import BlogCard from "@/components/cards/BlogCard";
import FeaturedCard from "@/components/cards/FeaturedCard";
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Blog() {
  const blogs = await reader.collections.blogs.all();
  const blogData = blogs.map(blog => ({
    title: blog.entry.title,
    description: blog.entry.excerpt,
    imageSrc: `${blog.entry.image}`,
    href: `/blog/${blog.slug}`,
    tags: [...blog.entry.tags]
  }));
  const featuredBlog = blogData[0];
  return (
    <div className="space-y-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Explore Himalayan Adventures with Pahari Yatri
        </h1>
        <p className="text-lg leading-7">
          Explore the latest insights and adventures in Himalayan trekking and mountaineering.
        </p>
      </div>

      {/* Featured Post */}
      <div className="py-12">
        <FeaturedCard title={featuredBlog.title} description={featuredBlog.description} imageSrc={featuredBlog.imageSrc} href={featuredBlog.href}>
        </FeaturedCard>
      </div>
      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogData.slice(1).map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            description={blog.description}
            imageSrc={blog.imageSrc}
            href={blog.href}
            tags={blog.tags}
          />
        ))}
      </div>
    </div>
  );
}
