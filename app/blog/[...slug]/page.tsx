import SectionContainer from "@/components/common/SectionContainer";
import Image from "next/image";
import PageTitle from "@/components/common/TitleCover";
import siteMetadata from "@/data/siteMetadata";
import { Metadata } from "next";
import keystaticConfig from "../../../keystatic.config";
import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import React from "react";

const reader = createReader(process.cwd(), keystaticConfig);
const currentDate = new Date().toISOString();

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  console.log(`Attempting to fetch blog with slug: ${slug}`);

  try {
    const blog = await reader.collections.blogs.readOrThrow(slug);
    console.log('Blog fetched successfully:', blog);

    const imageUrl = blog.image.startsWith('http')
      ? blog.image
      : `${siteMetadata.siteUrl}${blog.image}`;

    return {
      title: blog.entry.title,
      description: blog.entry.excerpt,
      openGraph: {
        title: blog.entry.title,
        description: blog.entry.excerpt,
        siteName: siteMetadata.title,
        locale: 'en_US',
        type: 'article',
        publishedTime: currentDate,
        url: `${siteMetadata.siteUrl}/blog/${slug}`,
        images: [
          {
            url: imageUrl,
            alt: blog.entry.title,
          },
        ],
        authors: [siteMetadata.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.entry.title,
        description: blog.entry.excerpt,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error(`Error fetching blog with slug "${slug}":`, error);
    return undefined;
  }
}

export default async function Page({ params }) {
  const slug = decodeURI(params.slug.join('/'));
  console.log('Fetching page for slug:', slug);

  try {
    const blog = await reader.collections.blogs.read(slug);

    if (!blog) {
      console.warn(`No blog found for slug: ${slug}`);
      return <div>No Post Found</div>;
    }

    const { node } = await blog.content();
    const errors = Markdoc.validate(node);
    if (errors.length) {
      console.error('Markdoc validation errors:', errors);
      throw new Error('Invalid content');
    }
    const renderable = Markdoc.transform(node);

    const imageUrl = blog.image.startsWith('http')
      ? blog.image
      : `${siteMetadata.siteUrl}${blog.image}`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteMetadata.siteUrl}/blog/${slug}`,
      },
      "headline": blog.title,
      "image": [
        {
          "@type": "ImageObject",
          "url": imageUrl,
          "width": 800,
          "height": 400,
        },
      ],
      "datePublished": currentDate,
      "dateModified": currentDate,
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
      "description": blog.excerpt,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SectionContainer>
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center mb-12">
              <PageTitle>{blog.title}</PageTitle>
              <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">{blog.excerpt}</p>
              <div className="mt-4 text-gray-500 dark:text-gray-400">
                <span>By {siteMetadata.author} | {new Date(blog.datePublished).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="relative w-full h-96 mb-12">
              <Image
                src={imageUrl}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="prose prose-lg max-w-none dark:prose-dark">
              {Markdoc.renderers.react(renderable, React)}
            </div>
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Populate with related articles */}
              </div>
            </div>
          </div>
        </SectionContainer>
      </>
    );
  } catch (error) {
    console.error(`Error rendering page for slug "${slug}":`, error);
    return <div>There was an error loading the blog post.</div>;
  }
}
