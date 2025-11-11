import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

const reader = createReader(process.cwd(), keystaticConfig);

// ✅ Get all chapters
export async function getAllChapters() {
  const entries = await reader.collections.chapters.list();

  return Promise.all(
    entries.map(async (entry) => {
      const data = await reader.collections.chapters.read(entry.slug);

      return {
        id: entry.slug,
        title: data?.title || "",
        excerpt: data?.excerpt || "",
        image: data?.image || "/static/images/placeholder.png",
        location: data?.location || "",
        link: `/chapters/${entry.slug}`,
        relatedStories: data?.relatedStories || [],
      };
    })
  );
}

// ✅ Get one chapter with its stories
export async function getChapterBySlug(slug: string) {
  const chapter = await reader.collections.chapters.read(slug);
  if (!chapter) return null;

  // Fetch related stories
  const stories = await Promise.all(
    (chapter.relatedStories || []).map(async (s) => {
      const storySlug = typeof s === "string" ? s : s?.slug;
      if (!storySlug) return null;
      const story = await reader.collections.stories.read(storySlug);
      return story
        ? {
            id: storySlug,
            title: story.title,
            excerpt: story.excerpt,
            image: story.image,
            quote: story.quote,
            link: `/stories/${storySlug}`,
          }
        : null;
    })
  );

  return {
    ...chapter,
    stories: stories.filter(Boolean),
  };
}
