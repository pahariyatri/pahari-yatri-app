# Connecting your Instagram account (@pahariyatri) directly to the site

The site can pull your latest reels **automatically** from Instagram — new reels appear on `/films` within an hour of posting, with real thumbnails, playable right on the page. No CMS entry needed.

Until the token is configured, the site simply shows the curated films from Keystatic (`/admin` → Films & Reels), so nothing breaks either way.

## How it works

- `lib/instagram.ts` calls the **Instagram Graph API** (`graph.instagram.com/me/media`) at build/revalidate time (refreshes hourly).
- It picks the latest video posts (reels), with `thumbnail_url` (poster) and `media_url` (a direct .mp4 the browser can play).
- `/films` renders them in a "Latest from @pahariyatri" section via `components/InstagramReelCard.tsx` — tap the poster and the reel plays in-page; every card also links out to the post.

## One-time setup (about 20 minutes)

1. **Make the Instagram account a Professional account** (Creator or Business): Instagram app → Settings → Account type. (Required by Meta for API access.)
2. **Create a Meta app**: go to [developers.facebook.com](https://developers.facebook.com) → *My Apps* → *Create App* → type **Business**.
3. In the app dashboard, add the product **"Instagram" → API setup with Instagram login**.
4. Under *Generate access tokens*, click **Add account** and log in with the @pahariyatri Instagram account, approving the `instagram_business_basic` permission.
5. Click **Generate token** next to the account — copy the **long-lived access token** (valid ~60 days).
6. Add it to the environment:
   - Local: `.env.local` → `INSTAGRAM_ACCESS_TOKEN=IGAxxxxxxxx`
   - Vercel: Project → Settings → Environment Variables → `INSTAGRAM_ACCESS_TOKEN` (Production + Preview), then redeploy.

## Keeping the token alive

Long-lived tokens expire after ~60 days. Refresh options:

- **Simplest**: regenerate from the app dashboard when reels stop updating (the site silently falls back to curated films — nothing breaks).
- **Automatic** (later): call `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=<token>` before expiry — e.g. from a monthly scheduled job — and update the env var.

## Notes

- **Never** commit the token to git or put it in `NEXT_PUBLIC_*` — server-side env only (that's how `lib/instagram.ts` reads it).
- YouTube needs no setup: paste any YouTube/Shorts URL into a Films entry in `/admin` and the thumbnail + in-page player work automatically.
- For Instagram reels added manually in `/admin`, upload a **Thumbnail** image on the entry for a proper poster (Instagram doesn't expose thumbnails without the API).
