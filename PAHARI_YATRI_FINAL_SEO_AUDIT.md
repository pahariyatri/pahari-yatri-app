# Pahari Yatri — Final SEO Infrastructure & AI Visibility Audit

Date: 2026-09-05 · Scope: `pahariyatri.com` only. `app.pahariyatri.com`/Local Connect not touched.

**No code was changed in this pass.** Everything below is a verification audit — done live, in the browser and against the real accounts, not inferred from code or from the sitemap being submitted. Where a prior session's fix is referenced, it was re-verified live here, not assumed still correct.

Status legend: **PASS** · **FAIL** · **NEEDS ACTION** · **WAITING FOR GOOGLE** · **NOT APPLICABLE**

---

## A. TECHNICAL SEO

| Item | Status | Evidence |
|---|---|---|
| Sitemap | PASS | GSC: submitted, last read Aug 31 2026, "Success", 86 pages discovered |
| robots.txt | PASS | Live-fetched: correct disallows (`/keystatic/`, `/api/keystatic/`), explicit allow rules for AI crawlers |
| Canonicals | PASS | Homepage self-canonical bug (was `/index`) fixed last session — re-verified via **Google's own live URL Inspection fetch**: `User-declared canonical: https://pahariyatri.com/` |
| Indexability | PASS | Homepage: "URL is available to Google" (live test, Sep 5 2026 2:22 PM) |
| URL Inspection | PASS | Ran live test + requested indexing for the homepage only (not blanket-requested) |
| 404 / redirects | PASS | Real 404s confirmed (`/this-page-does-not-exist` → 404); `www` → apex 308 confirmed live |
| Metadata (titles/descriptions) | PASS | Verified across homepage, library, temples — unique, no truncation issues |
| OpenGraph | PASS | `og:title`/`og:url` match canonical post-fix |
| Twitter/X cards | PASS | `summary_large_image` present |
| Favicon | PASS | Broken `mask-icon` (nonexistent SVG) removed last session; all remaining favicon assets 200 |
| JSON-LD | PASS | **Google Rich Results Test (live)**: "2 valid items detected" — Organization, Videos. No fabricated schema. |
| Breadcrumbs | PASS | GSC Enhancements: 18 valid, 0 invalid |
| Internal linking | PASS | `/chapters` orphan fixed last session (added to footer) |
| Orphan pages | PASS | No further orphans found in this pass's sampling |
| Image alt text | PASS | Content images have real alt text; decorative/background images correctly use `alt=""` (verified this isn't a miss — adjacent captions/aria-labels carry the accessible name) |
| SSR / rendered HTML | PASS | Real content confirmed server-rendered (page-text extraction matches visible content, no client-only gating) |
| Mobile SEO | PASS (partial verification) | Viewport meta tag and Tailwind responsive classes confirmed correct in code; **device emulation via this session's browser tooling did not reliably resize the viewport**, so this is a code-level confirmation, not a live mobile screenshot |
| Core Web Vitals | WAITING FOR GOOGLE | GSC Core Web Vitals report shows "No data" (mobile and desktop) — traffic volume is too low for Chrome UX Report field data to populate. Not a code issue; nothing to fix |
| PageSpeed / Lighthouse | NEEDS ACTION | No PageSpeed Insights API key configured, and the public unauthenticated quota is exhausted (`429` on every attempt, this session and last). Real Lighthouse numbers require either an API key or a manual run at pagespeed.web.dev |

---

## B. GOOGLE INDEXING

| Item | Status | Evidence |
|---|---|---|
| Property ownership | PASS | GSC Users & Permissions: 2 verified Owners — `pankajkumar.techie@gmail.com` and `pahariyatri@gmail.com` |
| Sitemap status | PASS | See Track A |
| Indexing coverage | WAITING FOR GOOGLE | 33 indexed / 94 not indexed. Reviewed all 8 exclusion buckets individually (not just the summary count): |
| — Discovered/crawled not indexed (63+10) | WAITING FOR GOOGLE | Root-caused last session to the sitewide 200-on-404 bug, now fixed — expect this bucket to shrink over the next several weeks as Google recrawls |
| — Page with redirect (8) | NOT APPLICABLE | Working as intended (`/{region}/stories/{slug}` → `/stories/{slug}` 301) |
| — Alternate, proper canonical (3) | NOT APPLICABLE | Working as intended (`/books/{book}/{chapter}` → `/chapters/{slug}`) |
| — Excluded by noindex (6) | NOT APPLICABLE | Investigated each URL: all 6 are dead legacy pages from a pre-restructure site version (`/home`, `/hi`, `/blog/...`, `/chapters/undefined`). Confirmed all now correctly 404 — no fix needed, Google will drop them from its records over time |
| — Duplicate, Google chose different canonical (4) | WAITING FOR GOOGLE | Included `pahariyatri.com/index` — direct confirmation the canonical bug was real; fixed and reindex requested. The other 3 (`jalori-small-circle`, `churdhar-bell-echo`, `bell-and-thunder`) are residual www-split noise, expected to decay |
| Valid indexed pages | PASS | 33, including the two ranking assets (`jalori-small-circle` pos. 2.2, `churdhar-bell-echo` pos. 3.6 per prior GSC performance pull) |
| URL Inspection on important pages | PASS | Homepage live-tested and reindex requested. Did not blanket-request all 87 URLs, per instruction |

---

## C. GA4 / GTM / ANALYTICS

| Item | Status | Evidence |
|---|---|---|
| Correct GA4 property | PASS | Property "pahariyatri.com" (account "Google Ads Account", property ID 467775152) — confirmed by name match and **live traffic data** (20 active users / 70 events / 20 new users, last 7 days) |
| Production measurement ID | PASS | Data stream `pahariyatri.com` (stream ID 9956110093) → **Measurement ID `G-VLHVCQKQM0`**, confirmed both in GA4's own admin panel and independently inside the actual `gtm.js` payload fetched live from `googletagmanager.com` — the two match exactly |
| GTM installed | PASS | Container `GTM-N953C62X` loads server-side (`ns.html` noscript tag present) and is a real, non-empty 367KB script, confirmed via direct fetch |
| GTM tag configuration | PASS | Inspected the container directly in Tag Manager (full account access confirmed): **5 tags** — `GA4 - Google Tag` (Initialization, All Pages), `GA4 - PY custom events` (Custom Event trigger), `Meta Pixel - Base + PageView` (All Pages), `Meta Pixel - Contact` (channel join), `Meta Pixel - Lead` (apply_submit) |
| No duplicate tracking | PASS | Only **one** tag fires the base page_view (`GA4 - Google Tag`, All Pages trigger); the custom-events tag fires only on named app events, matching the codebase's own stated rule ("app code never pushes a raw page_view") |
| Real-time traffic | NEEDS ACTION (inconclusive, not a production issue) | This session's own real-time test was inconclusive: `window.google_tag_manager` never initialized in this specific browser-automation profile, and a direct `fetch()` to `googletagmanager.com` failed outright — consistent with an ad-blocking/privacy extension active in this Chrome profile, not a site bug (curl and GTM's own server-side "receiving traffic in past 48 hours" status both confirm the container and tag are healthy in real users' browsers) |
| Organic/referral attribution | PASS | Client-side UTM capture confirmed present in code (`reel_source_visit` event), functioning by design |
| Stray/unused GA4 property | NEEDS ACTION | A second, unrelated GA4 property (Measurement ID `G-P6B1L1JFH9`, different account) is visible in this Google identity's GA4 access, showing "No data received from your website yet." This is not connected to the live site. Recommend the founder confirm what it is and delete it if unused, to avoid future confusion — **not deleted here**, since deleting a GA4 property is a real account action I won't take without explicit sign-off |

---

## D. PERFORMANCE

| Item | Status | Evidence |
|---|---|---|
| Real Lighthouse/PSI scores | NOT APPLICABLE (unavailable) | No API key; public quota exhausted. Not fabricated. |
| Real browser proxy metrics (homepage) | PASS (informational) | TTFB ~75ms, DOMContentLoaded ~473ms, load event ~1069ms, ~163KB initial transfer, ~748KB decoded JS across 20 scripts — measured via live `performance.getEntriesByType()`, same numbers as the prior session (no regressions, no changes attempted this pass since nothing new was found) |
| Core Web Vitals field data | WAITING FOR GOOGLE | See Track A — traffic too low for CrUX data yet |

---

## E. AI SEO / AI VISIBILITY

| Item | Status | Evidence |
|---|---|---|
| AI crawler accessibility | PASS | Live UA tests, all 200: GPTBot, anthropic-ai, ClaudeBot, PerplexityBot, Google-Extended, FacebookBot |
| robots.txt AI crawler rules | PASS | Explicit `Allow: /` for OAI-SearchBot, PerplexityBot, anthropic-ai, ClaudeBot, Googlebot-Extended, DuckAssistant, Diffbot, YouBot |
| llms.txt | PASS | Well-formed, on-brand, no fabrication — matches the live site's actual identity and structure |
| llms-full.txt | PASS | Exists, 200 |
| Server-rendered content | PASS | Confirmed real content in initial HTML (see Track A SSR) |
| Structured data / entity info | PASS | Organization schema valid (Rich Results Test) |
| Destination/entity relationships | NEEDS ACTION (pre-existing, content-level) | WikiData entity mapping covers only some destinations/chapters (documented in `PAHARI_YATRI_SEO_MASTER_AUDIT.md` — not a technical-SEO bug, a content-population task) |
| Authorship | NEEDS ACTION (pre-existing) | All content attributed to the Organization, not a named person — reduces E-E-A-T signal for AI citation. Same finding as the original master audit, unchanged; a brand/content decision, not a technical fix |
| Topical clusters | PASS | Book → Chapter → Story model with a clear Sacred Mandi thesis, already well-structured |
| Internal linking (AI discovery) | PASS | Chapters/stories/district hubs cross-linked (verified last session) |
| Citation-worthy content | PARTIAL | Several destinations remain thin (documented in the master audit's content-gap section) — a content-writing task, out of this audit's technical scope |

**No new AI-SEO pages, keyword stuffing, or fabricated authority were created or recommended.**

---

## F. SEARCH ENGINE TOOLS

| Tool | Status | Notes |
|---|---|---|
| Bing Webmaster Tools | NEEDS ACTION | Checked live: landed on the public signup page, no site registered. Real value (Bing/Yahoo/DuckDuckGo indexing, free) — recommended. See Permissions below. |
| IndexNow | NEEDS ACTION | Not configured. Pairs with Bing Webmaster Tools setup (same account); near-zero effort once Bing is set up, pushes instant crawl notifications instead of waiting for Bing's own crawl schedule. |
| Microsoft Clarity | NOT APPLICABLE (optional) | Not installed. Real value exists (free heatmaps/session replay) but is marginal at current traffic volume (20 active users/week) — recommend revisiting once traffic grows, not urgent now. |
| Google Business Profile | NOT APPLICABLE | Pahari Yatri's main site is a content library/community, not a location-based or service-area business — GBP eligibility is already owned separately by `google-business-profile-strategist` per CLAUDE.md, and is a different workstream from this technical-SEO audit. |
| Rich Results Test | PASS | Verified live this session — 2 valid items, no errors. |
| PageSpeed monitoring | NEEDS ACTION | Recommend Vercel Speed Insights (one-line install, same platform already hosting the site) — would give real CWV field data instead of GSC's current "No data". |
| Uptime monitoring | NOT APPLICABLE (optional) | Vercel's own infrastructure has high uptime by default; a free external monitor (e.g. UptimeRobot) is a reasonable but non-urgent add if the founder wants alerting independent of Vercel. |

---

## G. PERMISSIONS REQUIRED

Only one genuine permission boundary was hit this session — everything else (GSC, GA4, GTM) was already accessible under the current Google identity.

```
SERVICE: Bing Webmaster Tools (and IndexNow, which shares the same account)
ACCOUNT: A Microsoft account with ownership rights over pahariyatri.com
CURRENT ACCESS: None — this session has no Microsoft account signed in; the live check landed on Bing's public signup page with no site registered
REQUIRED ACCESS: Site added to Bing Webmaster Tools, verified (DNS TXT record or HTML file, same pattern as Search Console)
WHY IT IS REQUIRED: To submit the sitemap to Bing/Yahoo/DuckDuckGo, monitor Bing indexing coverage, and enable IndexNow for instant crawl notification
ACTION I NEED TO TAKE: Sign in with (or create) the Microsoft account tied to the business, add pahariyatri.com as a site at bing.com/webmasters, complete verification — then let me know and I can configure IndexNow submission from there
```

```
SERVICE: Google Analytics 4 — the stray property
ACCOUNT: A different Google Ads/GA4 account than the live pahariyatri.com one (Measurement ID G-P6B1L1JFH9)
CURRENT ACCESS: View access already exists under the currently authenticated identity
REQUIRED ACCESS: None to investigate further — I can already see it. Deleting or archiving it is an account action I won't take without your explicit go-ahead, since it's hard to reverse.
WHY IT IS REQUIRED: N/A — this is a confirm-and-decide item, not a permission gap
ACTION I NEED TO TAKE: Awaiting your confirmation on whether this property is still needed before touching it
```

No other service required stepping past a permission boundary. GSC, GA4 (the real property), and GTM were all already accessible and were verified directly.

---

## H. FIXES COMPLETED

**This session: none required.** Every item audited was either already fixed and re-verified live (canonical bug, favicon, orphan page — all from the prior session, confirmed still correct) or came back as a genuine account/config/content item rather than a code bug. Nothing was pushed or deployed in this pass because nothing needed to be.

For reference, what carried over from the prior technical-SEO pass and was re-verified live today: homepage canonical fix, broken favicon asset removal, `/chapters` internal link, working `next lint`/`analyze` scripts, 6 lint errors fixed, sitemap real dates, real 404 status, clean JSON-LD, AI crawler access.

---

## I. REMAINING ISSUES

1. **PageSpeed/Lighthouse numbers unavailable** — needs a PSI API key or a manual pagespeed.web.dev run; no code blocker.
2. **Core Web Vitals field data unavailable** — traffic-volume-gated, not a bug; will populate once Vercel Speed Insights or enough real traffic exists.
3. **Bing Webmaster Tools / IndexNow not configured** — needs your Microsoft account (see Permissions).
4. **Stray unused GA4 property** — needs your decision (see Permissions).
5. **Entity/authorship/content-depth gaps** (WikiData mapping, named authorship, thin destinations) — pre-existing, content-strategy items already tracked in `PAHARI_YATRI_SEO_MASTER_AUDIT.md`, not technical-SEO bugs.
6. **94 not-indexed pages** — largely expected to resolve as Google recrawls post-fix; genuinely nothing left to do but wait and monitor.

---

## J. NEXT SEO GROWTH PLAN

Ordered by effort-to-value:

1. **Set up Bing Webmaster Tools + IndexNow** (your action, ~15 min) — free additional discovery surface, especially since some AI answer engines (Copilot, some Perplexity indexes) partially lean on Bing's index.
2. **Decide on the stray GA4 property** — either confirm it's unused and archive it, or explain what it's for.
3. **Add Vercel Speed Insights** — closes the Core Web Vitals data gap without waiting on organic traffic growth.
4. **Monitor GSC's indexing coverage over the next 2–4 weeks** — the 63+10 "not indexed" bucket should visibly shrink now that the 200-on-404 and canonical bugs are both fixed; if it doesn't move, that's a signal worth a fresh look.
5. **Named authorship** — attributing chapters/stories to a real person (even a pen name tied to a real bio) rather than only "Pahari Yatri Original" would meaningfully strengthen E-E-A-T for both traditional and AI search citation.
6. **Continue the content-depth work already tracked** in `PAHARI_YATRI_SEO_MASTER_AUDIT.md` (WikiData entity mapping, thin destinations, `/temples` expansion) — unchanged priority, not re-litigated here since it's a content workstream, not this audit's scope.
