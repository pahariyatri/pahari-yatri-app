/**
 * Direct Instagram integration (optional).
 *
 * When INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID are set, the
 * site pulls the latest reels from the connected @pahariyatri account at
 * build/revalidate time via the Instagram Graph API (accessed through
 * graph.facebook.com, since the token comes from the Facebook Login for
 * Business flow, not a standalone Instagram-scoped token) — no manual CMS
 * entry needed. Without them, everything falls back to the Keystatic
 * `films` collection.
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
  const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!token || !igUserId) return null;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${igUserId}/media?fields=${FIELDS}&limit=${limit * 2}&access_token=${token}`,
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
