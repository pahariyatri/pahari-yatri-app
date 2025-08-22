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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><Link href="/">Home</Link></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><Link href="/blog">Blogs</Link></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{blog.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center mb-12">
          <PageTitle>{blog.title}</PageTitle>
          <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">{blog.excerpt}</p>
          <div className="mt-4 text-gray-500 dark:text-gray-400">
            <span>By {siteMetadata.author} | {new Date().toDateString()}</span>
          </div>
        </div>

        <div className="relative w-full h-96 mb-12">
          <Image
            src={blog.image || `${siteMetadata.siteUrl}/static/og-image.jpg`}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {renderable && (
          <div className="prose prose-lg max-w-none dark:prose-dark">
            {Markdoc.renderers.react(renderable, React)}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
