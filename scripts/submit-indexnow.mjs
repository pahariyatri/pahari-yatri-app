#!/usr/bin/env node
/**
 * Submit the site's real sitemap URLs to IndexNow (api.indexnow.org), which
 * fans out to every participating search engine (Bing, Yandex, Seznam —
 * and by extension anything that reads Bing's index) without needing an
 * account at any of them. The only "proof of ownership" IndexNow requires
 * is that the key file below is reachable at https://pahariyatri.com/{KEY}.txt
 * — already true, since it's committed under public/.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs                  # submit every sitemap URL
 *   node scripts/submit-indexnow.mjs /chapters/foo /stories/bar   # submit specific URLs
 *
 * Run this after publishing new/changed content. It is NOT wired into the
 * build automatically — IndexNow is for "this changed, come look sooner",
 * not a replacement for the sitemap itself, and submitting on every build
 * regardless of whether content changed would be noise.
 */

const SITE_URL = "https://pahariyatri.com";
const INDEXNOW_KEY = "6f9ae0f91e3ef7e65a5d9fa4559cf0c1";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function getSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Failed to fetch sitemap.xml: ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1]);
}

async function submit(urls) {
  const body = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200 (or 202) on success, no response body.
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Response body:", text);
    process.exitCode = 1;
  }
}

const argUrls = process.argv.slice(2);

(async () => {
  const urls = argUrls.length > 0
    ? argUrls.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p}`))
    : await getSitemapUrls();

  console.log(`Submitting ${urls.length} URL(s) to IndexNow...`);
  await submit(urls);
})().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
