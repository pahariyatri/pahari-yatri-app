import { Metadata, ResolvingMetadata } from "next"
import Script from "next/script";


type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const dummyBlogData = {
  title: "Sample Blog Title",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  author: "John Doe",
  date: "2024-04-27",
  tags: ["sample", "test", "dummy"],
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  // const blog = await fetch(`https://.../${slug}`).then((res) => res.json());
  const blog = dummyBlogData;
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []


  return {
    title: blog.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Page({ params, searchParams }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: dummyBlogData.title,
    image: "",
    description: dummyBlogData.content,
  }
  return (
    <section>
      {/* Add JSON-LD to your page */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  )
}

