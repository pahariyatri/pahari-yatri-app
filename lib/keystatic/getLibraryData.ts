import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getAllBooks() {
  const slugs = await reader.collections.books.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.books.read(slug);
      if (!entry) return null;
      return {
        id: slug,
        slug,
        title: entry.title || "Untitled Book",
        year: entry.year || null,
        excerpt: entry.excerpt || "",
        invitation: entry.invitation || "",
        coverImage: entry.coverImage || "/static/images/placeholder.png",
        relatedChapters: entry.relatedChapters || [],
        link: `/books/${slug}`,
      };
    })
  );
  return entries.filter(Boolean);
}

export async function getAllChapters() {
  const slugs = await reader.collections.chapters.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.chapters.read(slug);
      if (!entry) return null;
      return {
        id: slug,
        slug,
        title: entry.title || "Untitled Chapter",
        description: entry.description || "",
        coverImage: entry.coverImage || "/static/images/placeholder.png",
        relatedStories: entry.relatedStories || [],
        link: `/chapters/${slug}`,
      };
    })
  );
  return entries.filter(Boolean);
}

export async function getAllStories() {
  const slugs = await reader.collections.stories.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.stories.read(slug);
      if (!entry) return null;
      return {
        id: slug,
        slug,
        title: entry.title || "Untitled Story",
        content: entry.content || "",
        image: entry.image || "/static/images/placeholder.png",
        quote: entry.quote || "",
        link: `/stories/${slug}`,
      };
    })
  );
  return entries.filter(Boolean);
}
