# Connecting your YouTube channel directly to the site

The site can pull your latest uploads **automatically** from YouTube — new videos appear on `/films` and the homepage Films section within an hour of posting. No CMS entry needed.

Until it's configured, the site simply shows the curated films from Keystatic (`/admin` → Films & Reels), so nothing breaks either way. You can also always paste a YouTube/Shorts URL directly into a Films entry in `/admin` — that already works today with no API key required, since `ReelCard.tsx` parses any YouTube URL for its embed.

## How it works

- `lib/youtube.ts` calls the **YouTube Data API v3** (`channels.list` then `playlistItems.list` on the channel's uploads playlist) at build/revalidate time (refreshes hourly).
- Results are mapped straight into the same `Film` shape the Keystatic `films` collection uses, so no new video component was needed — `ReelCard.tsx` already fully supports the `youtube` platform (embed, poster, play/pause).
- `/films` and the homepage Films section merge live uploads with curated Keystatic entries.

## One-time setup (about 10 minutes)

1. **Create a Google Cloud project** (or reuse one) at [console.cloud.google.com](https://console.cloud.google.com).
2. **Enable the "YouTube Data API v3"** for that project (APIs & Services → Library → search "YouTube Data API v3" → Enable).
3. **Create an API key** (APIs & Services → Credentials → Create Credentials → API Key). Restrict it to the YouTube Data API v3 — no HTTP referrer restriction needed since this runs server-side.
4. **Find your channel ID**: go to your channel → About → Share channel → Copy channel ID (starts with `UC...`). If you only have a handle (`@pahariyatri`), you can also resolve the ID via `https://www.googleapis.com/youtube/v3/channels?forHandle=pahariyatri&part=id&key=YOUR_KEY`.
5. Add both to the environment:
   - Local: `.env.local` → `YOUTUBE_API_KEY=...` and `YOUTUBE_CHANNEL_ID=UC...`
   - Vercel: Project → Settings → Environment Variables (Production + Preview), then redeploy.

## Notes

- **Never** commit the API key to git or put it in `NEXT_PUBLIC_*` — server-side env only.
- YouTube API keys have a daily quota (10,000 units/day on the free tier); this integration uses ~3 units per revalidation, so normal traffic won't come close to the limit.
