import Image from "@/components/common/Image";
import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import siteMetadata from "@/data/siteMetadata";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import React from "react";

const reader = createReader(process.cwd(), keystaticConfig);

// SEO Metadata Generation
export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  const blog = await reader.collections.blogs.read(slug);
  if (!blog) return undefined;

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      siteName: siteMetadata.title || 'Pahari Yatri',
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      images: [
        {
          url: blog.image || `${siteMetadata.siteUrl}/static/og-image.jpg`,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image || `${siteMetadata.siteUrl}/static/og-image.jpg`],
    },
  };
}

// Blog Page Component
export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/"));
  console.log('Slug in Page:', slug);

  const blog = await reader.collections.blogs.read(slug);

  if (!blog) {
    console.warn(`No blog found for slug: ${slug}`);
    return <div>No Post Found</div>;
  }

  const { node } = await blog.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }
  const renderable = Markdoc.transform(node);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteMetadata.siteUrl}/blog/${slug}`,
    },
    "headline": blog.title,
    "image": [
      {
        "@type": "ImageObject",
        "url": blog.image ? blog.image : `${siteMetadata.siteUrl}/static/og-image.jpg`,
        "width": 800,
        "height": 400,
      },
    ],
    "author": {
      "@type": "Person",
      "name": siteMetadata.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteMetadata.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteMetadata.siteUrl}/static/logo.png`,
        "width": 600,
        "height": 60,
      },
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "description": blog.excerpt,
  };

  return (
    <>
      <SectionContainer>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* Blog Title and Meta Info */}
          <div className="text-center mb-12">
            <PageTitle>{blog.title}</PageTitle>
            <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">{blog.excerpt}</p>
            <div className="mt-4 text-gray-500 dark:text-gray-400">
              <span>By {siteMetadata.author} | {new Date().toDateString()}</span>
            </div>
          </div>

          {/* Blog Featured Image */}
          <div className="relative w-full h-96 mb-12">
            <Image
              src={blog.image ? blog.image : `${siteMetadata.siteUrl}/static/og-image.jpg`}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none dark:prose-dark">
            {Markdoc.renderers.react(renderable, React)}
          </div>
        </div>
      </SectionContainer>
    </>
  );
}

// Generate static params with slug as an array
export async function generateStaticParams() {
  const slugs = await reader.collections.blogs.list();

  // Return slugs as an array, even if it's a single-level slug
  return slugs.map((slug: any) => ({
    slug: [slug],
  }));
}
