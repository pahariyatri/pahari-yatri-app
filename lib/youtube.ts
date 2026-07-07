/**
 * Direct YouTube integration (optional).
 *
 * When YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID are set, the site pulls the
 * latest uploads from the connected channel at build/revalidate time via the
 * YouTube Data API — no manual CMS entry needed. Without them, everything
 * falls back to the Keystatic `films` collection.
 *
 * Setup guide: docs/youtube-integration.md
 */

import type { Film } from "@/components/ReelCard";

export async function getYouTubeVideos(limit = 6): Promise<Film[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return null;

  try {
    // 1. Resolve the channel's "uploads" playlist ID.
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=contentDetails&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!channelRes.ok) return null;
    const channelJson = await channelRes.json();
    const uploadsPlaylistId =
      channelJson?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) return null;

    // 2. Fetch the latest videos from that playlist.
    const itemsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsPlaylistId}&part=snippet&maxResults=${limit}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!itemsRes.ok) return null;
    const itemsJson = await itemsRes.json();
    const items: any[] = Array.isArray(itemsJson?.items) ? itemsJson.items : [];

    return items
      .filter((it) => it.snippet?.resourceId?.videoId)
      .map((it): Film => {
        const videoId = it.snippet.resourceId.videoId;
        return {
          slug: `youtube-${videoId}`,
          title: it.snippet.title || "Pahari Yatri video",
          platform: "youtube",
          url: `https://youtu.be/${videoId}`,
          description: it.snippet.description || "",
          thumbnail:
            it.snippet.thumbnails?.high?.url ||
            it.snippet.thumbnails?.default?.url ||
            null,
        };
      });
  } catch {
    return null;
  }
}
