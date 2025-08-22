import BlogClientPage from './client-page';
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
  
  return <BlogClientPage blogData={blogData} />;
}
