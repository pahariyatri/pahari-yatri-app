import BlogCard from "@/components/cards/BlogCard";

const blogData = [
  {
    title: "Top 10 Trekking Destinations in the Himalayas",
    description: "Explore the breathtaking beauty of the Himalayan mountains with our guide to the top trekking destinations.",
    imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    href: "",
    tags: ["Trekking", "Himalayas", "Adventure"],
  },
  {
    title: "A Beginner's Guide to Mountaineering Equipment",
    description: "Discover the essential gear you need for your first mountaineering adventure, from ropes to ice axes.",
    imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    href: "",
    tags: ["Mountaineering", "Equipment", "Adventure"],
  },
  {
    title: "10 Must-Have Items for Adventure Travelers",
    description: "Pack smart for your next adventure trip with our list of essential items for every adventure traveler.",
    imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    href: "",
    tags: ["Adventure", "Travel Gear", "Packing"],
  },
  {
    title: "Title 4",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    href: "",
  },
  {
    title: "Title 5",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    href: "",
  },
  {
    title: "Title 6",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    imageSrc: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    href: "",
  },
];

export default function Blog() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Blogs
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Showcase your projects with a hero image (16 x 9)
        </p>
      </div>
      <div className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {blogData.map((blog, index) => (
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
    </div>
  );
}
