import SectionContainer from "@/components/common/SectionContainer";
import Image from "@/components/common/Image";
import PageTitle from "@/components/common/TitleCover";
import siteMetadata from "@/data/siteMetadata";
import { Metadata } from "next";
import keystaticConfig from "../../../keystatic.config";
import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import React from "react";

const reader = createReader(process.cwd(), keystaticConfig);

const currentDate = new Date().toDateString();

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  console.log(`Fetching blog with slug: ${slug}`);
  const blog = (await reader.collections.blogs.all()).find((blog=> blog.slug== slug));
  const blogData = (blog: { entry: { title: any; excerpt: any; image: any; tags: any; }; slug: any; }) => ({
    title: blog.entry.title,
    description: blog.entry.excerpt,
    imageSrc: `${blog.entry.image}`,
    href: `/blog/${blog.slug}`,
    tags: [...blog.entry.tags]
  });

  if (!blog) {
    return undefined;
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: currentDate,
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      images: [
        {
          url: blog.image ? blog.image : siteMetadata.siteUrl + blog.image,
          alt: blog.title,
        },
      ],
      authors: [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image ?? ""],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURI(params.slug);
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
        "url": blog.image ? blog.image : siteMetadata.siteUrl + blog.image,
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
              <span>By {siteMetadata.author} | {currentDate}</span>
            </div>
          </div>
          <div className="relative w-full h-96 mb-12">
            <Image
              src={blog.image ? blog.image : siteMetadata.siteUrl + blog.image}
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
              {/* Example of related articles */}

            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
