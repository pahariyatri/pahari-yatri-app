'use client';

import { useEffect, useState } from 'react';
import BlogCard from "@/components/cards/BlogCard";
import FeaturedCard from "@/components/cards/FeaturedCard";
import SectionContainer from "@/components/common/SectionContainer";
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Loading from '../looding';

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
  // State for mobile viewport detection and loading state
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're on the client-side
    if (typeof window !== 'undefined') {
      // Set initial mobile state
      setIsMobile(window.innerWidth < 768);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);

      // Simulate content loading for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
      };
    }
  }, []);

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

  // Loading state with mountain-themed loader
  if (isLoading) {
    return (
      <Loading message='Loading Himalayan stories...'></Loading>

    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="blog-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <SectionContainer>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
              className="space-y-3 pb-6 pt-4 md:pb-8 md:pt-6 md:space-y-5 relative"
            >
              {/* Mountain silhouette background with parallax effect */}
              <motion.div
                className="absolute top-0 right-0 opacity-5 pointer-events-none hidden md:block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{ scale: 1.05, opacity: 0.08 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "120" : "200"} height={isMobile ? "120" : "200"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                </svg>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-brandSerif leading-tight tracking-tight text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2">
                  <span>Explore Himalayan Adventures</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary hidden sm:inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                  </motion.svg>
                </span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Discover transformative journeys and insights from our Himalayan trekking and mountaineering experiences.
              </motion.p>
            </motion.div>

            {/* Featured Post */}
            <motion.div
              className="py-4 sm:py-6 md:py-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: isMobile ? 1 : 1.01 }}
            >
              <FeaturedCard
                title={featuredBlog.title}
                description={featuredBlog.description}
                imageSrc={featuredBlog.imageSrc}
                href={featuredBlog.href}
              />
            </motion.div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {blogData.length > 1 && blogData.slice(1).map((blog, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: isMobile ? 0.4 : 0.6,
                    delay: 0.1 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  {/* Mountain icon badge */}
                  <div className="absolute -top-2 -right-2 z-10 bg-primary/10 rounded-full p-1 shadow-sm hidden sm:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                    </svg>
                  </div>

                  {/* Journey number badge */}
                  <div className="absolute top-3 left-3 z-10 bg-primary/80 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                    {index + 2}
                  </div>

                  <BlogCard
                    title={blog.title}
                    description={blog.description}
                    imageSrc={blog.imageSrc}
                    href={blog.href}
                    tags={blog.tags}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </motion.div>
    </AnimatePresence>
  );
}