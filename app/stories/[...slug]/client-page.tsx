"use client";

import React from "react";
import Image from "next/image"; // Use next/image for optimization
import Link from "@/components/common/Link";
import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import siteMetadata from "@/data/siteMetadata";
import Markdoc from "@markdoc/markdoc";

interface BlogPageClientProps {
  blog: any;
}

export default function BlogPageClient({ blog }: BlogPageClientProps) {
  const [content, setContent] = React.useState<any>(null);
  const [renderable, setRenderable] = React.useState<any>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    // Check if we're on the client-side
    if (typeof window !== 'undefined') {
      // Set initial mobile state
      setIsMobile(window.innerWidth < 768);
      
      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  React.useEffect(() => {
    // Use the pre-rendered content HTML from the server
    if (blog.contentHtml) {
      try {
        const transformed = JSON.parse(blog.contentHtml);
        setRenderable(transformed);
      } catch (error) {
        console.error('Error parsing pre-rendered content:', error);
      }
    }
  }, [blog]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteMetadata.siteUrl}/blog/${blog.slug}` },
    headline: blog.title,
    image: [
      { "@type": "ImageObject", url: blog.image || `${siteMetadata.siteUrl}/static/og-image.jpg`, width: 800, height: 400 },
    ],
    author: { "@type": "Person", name: siteMetadata.author },
    publisher: {
      "@type": "Organization",
      name: siteMetadata.title,
      logo: { "@type": "ImageObject", url: `${siteMetadata.siteUrl}/static/logo.png`, width: 600, height: 60 },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    description: blog.excerpt,
  };

  return (
    <SectionContainer>
      <Breadcrumb className="text-xs sm:text-sm">
        <BreadcrumbList>
          <BreadcrumbItem><Link href="/">Home</Link></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><Link href="/stories">Stories</Link></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage className="truncate max-w-[150px] sm:max-w-none">{blog.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 relative">
          {/* Mountain silhouette background */}
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
          </div>
          
          <PageTitle>{blog.title}</PageTitle>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-slate-400">{blog.excerpt}</p>
          <div className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            <span>By {siteMetadata.author} | {new Date().toDateString()}</span>
          </div>
        </div>

        <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 sm:mb-12 overflow-hidden rounded-lg">
          <Image
            src={blog.image || `${siteMetadata.siteUrl}/static/og-image.jpg`}
            alt={blog.title}
            width={800}
            height={400}
            className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
          />
          
          {/* Mountain icon overlay */}
          <div className="absolute top-4 right-4 opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
        </div>

        {renderable && (
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-dark">
            {Markdoc.renderers.react(renderable, React)}
          </div>
        )}
        
        {/* Mountain journey footer */}
        <div className="pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-primary/70 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
            <span>Continue your journey with Pahari Yatri</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
