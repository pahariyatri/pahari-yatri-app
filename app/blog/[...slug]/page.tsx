import SectionContainer from "@/components/common/SectionContainer";
import PageTitle from "@/components/common/TitleCover";
import siteMetadata from "@/data/siteMetadata";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import React from "react";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join("/")); // Join the array into a string
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

  return (
    <>
      <SectionContainer>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center mb-12">
            <PageTitle>{blog.title}</PageTitle>
            <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">{blog.excerpt}</p>
            <div className="mt-4 text-gray-500 dark:text-gray-400">
              <span>By {siteMetadata.author} | {new Date().toDateString()}</span>
            </div>
          </div>
          <div className="relative w-full h-96 mb-12">
            {/* Uncomment and use your Image component */}
            {/* <Image
              src={blog.image ? blog.image : `${siteMetadata.siteUrl}${blog.image}`}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            /> */}
          </div>
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

  // Return slugs as an array, even if it's a single level slug
  return slugs.map((slug: any) => ({
    slug: [slug],  // Wrap each slug string in an array to match the expected catch-all route structure
  }));
}
