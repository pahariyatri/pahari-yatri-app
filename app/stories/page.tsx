import { getAllStories } from '@/lib/keystatic/getLibraryData';
import BlogClientPage from './client-page';


export default async function Blog() {
  const stories = await getAllStories();
  const blogData = stories.map(blog => ({
    title: blog?.title,
    description: blog?.content,
    imageSrc: `${blog?.image}`,
    href: `/blog/${blog?.slug}`,
  }));
  
  return <BlogClientPage blogData={blogData} />;
}
