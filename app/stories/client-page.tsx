'use client';

import BlogCard from "@/components/cards/BlogCard";
import SectionContainer from "@/components/common/SectionContainer";

interface BlogClientPageProps {
  blogData: {
    title: string;
    description: string;
    imageSrc: string;
    href: string;
    tags: string[];
    duration?: string;
    difficulty?: string;
    location?: string;
  }[];
}

export default function BlogClientPage({ blogData }: BlogClientPageProps) {
  if (!blogData || blogData.length === 0) {
    return (
      <SectionContainer>
        <div className="py-8 text-center">
          <h2 className="text-2xl font-bold">No blog posts found</h2>
        </div>
      </SectionContainer>
    );
  }
  
  const featuredBlog = blogData[0];
  
  return (
    <SectionContainer>
      <div className="space-y-8">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Explore Himalayan Adventures with Pahari Yatri
          </h1>
          <p className="text-lg leading-7">
            Explore the latest insights and adventures in Himalayan trekking and mountaineering.
          </p>
        </div>

       
        
        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blogData.length > 1 && blogData.slice(1).map((blog, index) => (
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
    </SectionContainer>
  );
}