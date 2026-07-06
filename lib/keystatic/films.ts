import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import type { Film, FilmContextLink } from "@/components/ReelCard";

const reader = createReader(process.cwd(), keystaticConfig);

/** Load all films with their related chapter/story resolved to real titles,
 *  sorted by editor-defined order. Shared by the homepage section and /films. */
export async function getFilms(): Promise<Film[]> {
  const slugs = await reader.collections.films.list();

  const films = await Promise.all(
    slugs.map(async (slug) => {
      const entry = (await reader.collections.films.read(slug)) as any;
      if (!entry) return null;

      const related: FilmContextLink[] = [];
      if (entry.relatedChapter) {
        try {
          const ch = await reader.collections.chapters.read(entry.relatedChapter);
          if (ch)
            related.push({
              href: `/chapters/${entry.relatedChapter}`,
              label: ch.title || entry.relatedChapter,
              kind: "chapter",
            });
        } catch {}
      }
      if (entry.relatedStory) {
        try {
          const st = await reader.collections.stories.read(entry.relatedStory);
          if (st)
            related.push({
              href: `/stories/${entry.relatedStory}`,
              label: st.title || entry.relatedStory,
              kind: "story",
            });
        } catch {}
      }

      return {
        slug,
        title: entry.title || slug,
        platform: entry.platform || "instagram",
        url: entry.url || "",
        description: entry.description || "",
        region: entry.region || "",
        thumbnail: entry.thumbnail || null,
        related,
        order: entry.order ?? 0,
        directUrl: entry.directUrl || "",
        directVideo: entry.directVideo || null,
      };
    })
  );

  return (films.filter(Boolean) as (Film & { order: number })[]).sort(
    (a, b) => a.order - b.order
  );
}

/** Reels (vertical 9:16) and films (horizontal 16:9) break a shared grid, so
 *  listing pages render them as separate groups. */
export function splitByFormat(films: Film[]) {
  const isYouTube = (f: Film) =>
    f.platform === "youtube" || /youtu\.?be/.test(f.url);
  return {
    reels: films.filter((f) => !isYouTube(f)),
    videos: films.filter(isYouTube),
  };
}
