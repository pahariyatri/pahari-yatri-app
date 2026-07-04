import type { Metadata } from 'next';
import { getAllStories } from '@/lib/keystatic/getLibraryData';
import BlogClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Himalayan Trek Stories & Trip Reports from Real Yatris',
  description:
    'First-person stories and trip reports from Yatris who walked the Himalayan trails of Himachal Pradesh — real experiences from Parashar, Kheerganga, Churdhar, Buran Ghati and more.',
  alternates: { canonical: '/stories' },
};

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
