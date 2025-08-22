import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import BlogPageClient from "./client-page";
import Markdoc from "@markdoc/markdoc";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page({ params }: any) {
  const paramsData = await params;
  const slugArr = Array.isArray(paramsData) ? paramsData : paramsData.slug;
  const slug = decodeURIComponent(slugArr.join("/"));

  const blog = await reader.collections.blogs.read(slug);
  if (!blog) notFound();
  
  // Define a type that includes only serializable properties
  type BlogData = {
    title: string;
    excerpt: string;
    image: string;
    slug: string;
    tags: string[];
    relatedJourneys: (string | null)[];
    contentHtml?: string; // Pre-rendered HTML content
  };

  // Pre-render the content on the server
  let contentHtml = '';
  try {
    if (typeof blog.content === 'function') {
      const contentData = await blog.content();
      if (contentData) {
        // Convert the content to a string if possible
        const contentStr = typeof contentData.toString === 'function' 
          ? contentData.toString() 
          : '';
        
        // Parse and transform with Markdoc
        if (contentStr) {
          const ast = Markdoc.parse(contentStr);
          const transformed = Markdoc.transform(ast);
          // Convert to HTML string
          contentHtml = JSON.stringify(transformed);
        }
      }
    }
  } catch (error) {
    console.error('Error pre-rendering content:', error);
  }
  
  // Create a new object with only serializable properties
  const blogData: BlogData = {
    title: blog.title || '',
    excerpt: blog.excerpt || '',
    image: blog.image || '',
    slug: slug,
    tags: [...(blog.tags || [])],
    relatedJourneys: [...(blog.relatedJourneys || [])],
    contentHtml: contentHtml
  };

  return <BlogPageClient blog={blogData} />;
}


export async function generateStaticParams() {
  const slugs = await reader.collections.blogs.list();
  return slugs.map((slug: string) => ({ slug: [slug] }));
}
