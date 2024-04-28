import Template from "./template";

async function getProjects() {
  // const res = await fetch(`https://...`, { cache: 'no-store' })
  // const projects = await res.json()

  // return projects
}

export default async function Blog() {
  // const posts = await reader.collections.posts.all();
  // const projects = await getProjects()
  return (
    <Template>
      <div className="post-grid">
        <h1>Echo</h1>
        {/* {posts.map((post) => (
          <BlogCard key={post.slug} postId={post.slug} title={post.entry.title} ></BlogCard>
        ))} */}
      </div>
    </Template>
  );
}
