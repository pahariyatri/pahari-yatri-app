import BlogCard from "@/components/cards/BlogCard";
import FeaturedCard from "@/components/cards/FeaturedCard";

const blogData = [
  {
    title: "Top 10 Trekking Destinations in the Himalayas",
    description: "Explore the breathtaking beauty of the Himalayan mountains with our guide to the top trekking destinations.",
    imageSrc: "/static/images/pahari-yatri-banner.png",
    href: "",
    tags: ["Trekking", "Himalayas", "Adventure"],
  },
  {
    title: "A Beginner's Guide to Mountaineering Equipment",
    description: "Discover the essential gear you need for your first mountaineering adventure, from ropes to ice axes.",
    imageSrc: "/static/images/pahari-yatri-banner.png",
    href: "",
    tags: ["Mountaineering", "Equipment", "Adventure"],
  },
  {
    title: "10 Must-Have Items for Adventure Travelers",
    description: "Pack smart for your next adventure trip with our list of essential items for every adventure traveler.",
    imageSrc: "/static/images/pahari-yatri-banner.png",
    href: "",
    tags: ["Adventure", "Travel Gear", "Packing"],
  },
  {
    title: "Title 4",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    imageSrc: "/static/images/pahari-yatri-banner.png",
    href: "",
  },
  {
    title: "Title 5",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    imageSrc: "/static/images/pahari-yatri-banner.png",
    href: "",
  },
  {
    title: "Title 6",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    imageSrc: "/static/images/pahari-yatri-banner.png",
    href: "",
  },
];

const featuredPost = blogData[0];

export default function Blog() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Blogs
        </h1>
        <p className="text-lg leading-7">
          Showcase your projects with a hero image (16 x 9)
        </p>
      </div>

      {/* Featured Post */}
      <div className="py-12">
        <FeaturedCard title={featuredPost.title} description={featuredPost.description} imageSrc={featuredPost.imageSrc} href={featuredPost.href}>
        </FeaturedCard>
        {/* <div className="relative flex flex-col md:flex-row items-center rounded-lg overflow-hidden shadow-lg">
          <Image src={featuredPost.imageSrc} alt={featuredPost.title} width={400} height={400} className="w-full md:w-1/2 h-72 object-cover" />
          <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">{featuredPost.title}</h2>
              <p className="mt-2">{featuredPost.description}</p>
              <div className="mt-4 flex flex-wrap space-x-2">
                {featuredPost.tags && featuredPost.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{tag}</span>
                ))}
              </div>
            </div>
            <Link href={featuredPost.href} className="mt-4 inline-block text-blue-500 hover:text-blue-700">
              Read more
            </Link>
          </div>
        </div> */}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogData.slice(1).map((blog, index) => (
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
  );
}
