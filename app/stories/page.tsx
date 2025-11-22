import { getAllStories } from '@/lib/keystatic/getLibraryData';
import BlogClientPage from './client-page';

export default async function Blog() {
  const stories = await getAllStories();
  const blogData = stories.map((story) => ({
    title: story?.title || "",
    description: story?.excerpt || "",
    imageSrc: `${story?.image}`,
    href: `/stories/${story?.slug}`,
    tags: [],
  }));

  return <BlogClientPage blogData={blogData} />;
}
