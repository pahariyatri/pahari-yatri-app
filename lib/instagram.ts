/**
 * Direct Instagram integration (optional).
 *
 * When INSTAGRAM_ACCESS_TOKEN is set, the site pulls the latest reels from
 * the connected @pahariyatri account at build/revalidate time via the
 * Instagram Graph API — no manual CMS entry needed. Without the token,
 * everything falls back to the Keystatic `films` collection.
 *
 * Setup guide: docs/instagram-integration.md
 */

export type InstagramReel = {
  id: string;
  caption: string;
  mediaUrl: string;      // direct .mp4 — playable in a <video> tag
  thumbnailUrl: string;  // poster image
  permalink: string;     // instagram.com link
  timestamp: string;
};

const FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";

export async function getInstagramReels(limit = 6): Promise<InstagramReel[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${limit * 2}&access_token=${token}`,
      // Refresh once an hour so new reels appear without a redeploy
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const json = await res.json();
    const items: any[] = Array.isArray(json?.data) ? json.data : [];

    return items
      .filter((m) => m.media_type === "VIDEO" && m.media_url)
      .slice(0, limit)
      .map((m) => ({
        id: m.id,
        caption: (m.caption || "").split("\n")[0].slice(0, 140),
        mediaUrl: m.media_url,
        thumbnailUrl: m.thumbnail_url || "",
        permalink: m.permalink || "https://www.instagram.com/pahariyatri/",
        timestamp: m.timestamp || "",
      }));
  } catch {
    return null;
  }
}
