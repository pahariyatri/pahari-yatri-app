# Connecting your Instagram account (@pahariyatri) directly to the site

The site can pull your latest reels **automatically** from Instagram — new reels appear on `/films` within an hour of posting, with real thumbnails, playable right on the page. No CMS entry needed.

Until the token is configured, the site simply shows the curated films from Keystatic (`/admin` → Films & Reels), so nothing breaks either way.

## How it works

- `lib/instagram.ts` calls the **Instagram Graph API via `graph.facebook.com/v21.0/{INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`** at build/revalidate time (refreshes hourly). This is the Facebook Login for Business flow — the token is a Facebook user token with `instagram_basic` permission, scoped to the Instagram account through its linked Facebook Page, rather than a standalone `graph.instagram.com`-only token.
- It picks the latest video posts (reels), with `thumbnail_url` (poster) and `media_url` (a direct .mp4 the browser can play).
- `/films` renders them in a "Latest from @pahariyatri" section via `components/InstagramReelCard.tsx` — tap the poster and the reel plays in-page; every card also links out to the post.

## One-time setup (about 20 minutes)

1. **Make the Instagram account a Professional account** (Creator or Business): Instagram app → Settings → Account type. (Required by Meta for API access.)
2. **Create a Meta app**: go to [developers.facebook.com](https://developers.facebook.com) → *My Apps* → *Create App* → type **Business**.
3. In the app dashboard, add the product **"Instagram" → API setup with Instagram login**, and connect/generate a token for the account (approve `instagram_basic` at minimum). Copy the **long-lived access token** (valid ~60 days). It may come back as a Facebook user token (starts `EAA...`) rather than an Instagram-scoped one (starts `IGA...`) — both work with the flow below.
4. **Find the linked Instagram Business Account ID** — the token alone isn't enough; the API needs the numeric ID too:
   ```bash
   # 1. Confirm the token and see which Page(s) it manages
   curl "https://graph.facebook.com/me/accounts?access_token=YOUR_TOKEN"
   # → note the Page "id" in the response

   # 2. Get the Instagram Business Account linked to that Page
   curl "https://graph.facebook.com/v21.0/PAGE_ID?fields=instagram_business_account&access_token=YOUR_TOKEN"
   # → the "instagram_business_account.id" is what you need
   ```
5. Add both to the environment:
   - Local: `.env.local` →
     ```
     INSTAGRAM_ACCESS_TOKEN=EAAxxxxxxxx
     INSTAGRAM_BUSINESS_ACCOUNT_ID=178414xxxxxxxxx
     ```
   - Vercel: Project → Settings → Environment Variables → add both (Production + Preview), then redeploy.

## Keeping the token alive

Long-lived tokens expire after ~60 days. The Business Account ID is stable and never needs to change. Refresh options for the token:

- **Simplest**: regenerate from the app dashboard when reels stop updating (the site silently falls back to curated films — nothing breaks).
- **Automatic** (later): call `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=<app_id>&client_secret=<app_secret>&fb_exchange_token=<token>` before expiry — e.g. from a monthly scheduled job — and update the env var.

## Notes

- **Never** commit the token to git or put it in `NEXT_PUBLIC_*` — server-side env only (that's how `lib/instagram.ts` reads it).
- YouTube needs no setup: paste any YouTube/Shorts URL into a Films entry in `/admin` and the thumbnail + in-page player work automatically.
- For Instagram reels added manually in `/admin`, upload a **Thumbnail** image on the entry for a proper poster (Instagram doesn't expose thumbnails without the API).
