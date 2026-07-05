import type { Metadata } from 'next';
import { getAllStories } from '@/lib/keystatic/getLibraryData';
import BlogClientPage from './client-page';

export const metadata: Metadata = {
  title: 'Stories from the Himalayas | Real Yatri Journals',
  description:
    'First-person Himalayan stories from Yatris who walked the trails of Himachal Pradesh. Village memories, temple bells, and quiet moments from Parashar, Kheerganga, Churdhar, Buran Ghati, and more.',
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
