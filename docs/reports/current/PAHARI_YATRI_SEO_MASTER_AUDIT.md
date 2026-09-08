# Pahari Yatri — SEO + Organic Growth Master Audit

Date: 2026-09-05 · **Audit and planning only. No code was changed, nothing was deployed, no social/profile change was published.** Per this repo's golden rule (`docs/agents/pahari-yatri-agent-system.md`), everything below stops at **Approve** — implementation is a separate, explicitly-approved next step.

Scope: `pahariyatri.com` (this repo, `pahari-yatri-app`) and `app.pahariyatri.com` (`local-connect-app`, audited against `origin/main`, not a stale local checkout). Methods: live Search Console data pulled via browser for both properties (2026-09-05), a full source read of both repos, live `curl` verification against production for every claim below, and a live crawl of both sites. Detailed supporting reports (full command output, line numbers, every table) are held by the three specialist passes this synthesizes: main-site technical/content audit, portal technical SEO audit, and analytics/tracking audit — this document is the cross-referenced, prioritized summary the founder asked for.

**Companion file:** `SEO_OPPORTUNITY_MAP.md` — the query-level Search Console breakdown.

---

## 0. The finding that reframes the entire audit

**Two separate "code exists but isn't live" gaps mean both properties are running noticeably worse than their own repos suggest — and this has to be resolved before any of the technical fixes below have value.**

- **Main site:** 9 commits of SEO/content fixes (Batches 0–8, all QA-gated and documented in `PAHARI_YATRI_SEO_REFACTOR_REPORT.md`) sit unpushed on local `main`, 9 commits ahead of `origin/main`. Verified live: every bug those batches fixed is still present in production — 404s still return 200, destination pages still render literal `## Markdown` as text, a fabricated "Tuesday mandi" claim is still live, district hub pages are still dead ends.
- **Portal:** the entire analytics/tracking foundation (`lib/analytics.ts`, the GTM loader, the Dockerfile build arg, all 14 event call sites) exists only as 2 unpushed commits on one local machine, absent from `origin/main` and therefore absent from production. `app.pahariyatri.com` currently has **zero analytics of any kind** live.

**Recommendation before anything else ships: confirm which branch/commit each property's production actually builds from, and get both pending bodies of work merged to the branch that deploys.** This is a founder decision (repo/deploy-pipeline ownership), not something an agent should assume. Every fix below that says "already fixed, unpushed" depends on this.

---

## 1. Current SEO health

### Main site (pahariyatri.com)
| Metric (90 days) | Value |
|---|---|
| Clicks | 23 |
| Impressions | 1,100 |
| Avg. CTR | 2.1% |
| Avg. position | 17 (flattered by brand queries; real destination queries sit at 40–90) |
| Indexed pages | 33 |
| Not indexed | 94 |
| Sitemap | 86 URLs submitted, last read successfully |

### Portal (app.pahariyatri.com)
| Metric | Value |
|---|---|
| Clicks / impressions / CTR / position | **No data — property has never had a sitemap submitted** |
| Sitemap | 0 ever submitted to Search Console |
| Indexing coverage | Unprocessed |

The portal's "no data" is not a Search Console lag. As established in §4, it is the accurate reading of a property with no submitted sitemap that also serves no server-rendered content and declares every URL's canonical as its own homepage.

---

## 2. Existing strengths (worth naming, not just problems)

- **Main-site content model is genuinely well designed.** The Book → Chapter → Story schema (`keystatic.config.ts`) already carries `district`, `trackType`, `targetKeyword`, `secondaryKeywords`, `seoTitle`, `metaDescription`, `relatedChapters`, `verificationStatus` — the schema is ahead of the content, not the reverse. This is a fixable population problem, not a redesign.
- **Crawlable HTML on the main site is solid.** Every content page is a server component; full text is in the initial HTML. This is the harder problem to solve architecturally and it's already done right.
- **`/temples` (main site) is unknowingly ranking for ~60 real temple-name searches** — the strongest organic-demand signal in the entire dataset, and it lines up exactly with the brand's own Sacred Mandi / devta-culture thesis.
- **Two ranking assets already exist and are earning clicks**: `/stories/jalori-small-circle` (position 2.2) and `/stories/churdhar-bell-echo` (position 3.6) — proof the content approach works when it ships.
- **The banned-language discipline is holding in content.** A full sweep across `app/`, `components/`, `data/` on the main site found the banned-phrase list clean except two meta descriptions (§3.9) — the guardrail is working where it's supposed to.
- **The portal's sitemap and robots.txt reference the correct production domain** — a previously-documented bug (wrong sitemap domain from a stale checkout) is confirmed absent on current `origin/main`.
- **The portal's route-protection *pattern* is right for the routes it covers** — `/*/auth/`, `/*/admin`, `/*/vendor/dashboard` etc. are correctly disallowed and correctly redirect. The gaps found (§6) are additions, not a redesign.
- **`llms.txt`/`llms-full.txt` exist on the main site, are well-formed, and are genuinely on-brand** ("not a travel agency, does not sell trips first").

---

## 3. Technical problems

### Main site

| # | Problem | File(s) | Severity |
|---|---|---|---|
| 1 | Every 404 returns HTTP 200 — **including missing static images**, which serve 45KB of HTML instead of failing. 21 destination/place hero images referenced in content don't exist on disk | `app/loading.tsx` (root Suspense lock); fixed in unpushed `main` | **P0** |
| 2 | `middleware.ts` hard-blocks `Google-Extended`, `GPTBot`, `anthropic-ai`, `FacebookBot` with 403 — while `robots.txt` explicitly allows `anthropic-ai`/`Googlebot-Extended`. Opts the site out of AI Overviews/Gemini grounding, breaks WhatsApp/Facebook link previews. Open since the July audit | `middleware.ts:5-14` | **P0** |
| 3 | Fabricated `TouristInformationCenter` schema on every page — fake Manali address, geo coordinates, opening hours, price range. Violates `CLAUDE.md` §2/§9 by name. Open since July | `app/layout.tsx:235-266` | **P0** |
| 4 | Hidden (`class="hidden"`) keyword-stuffed H1 block on the homepage — duplicate H1, package-selling copy, and asserts the brand operates **"in Uttarakhand"** (wrong region) | `app/page.tsx:28-32` | **P0** |
| 5 | Sitewide `FAQPage` JSON-LD collides with chapters' own legitimate FAQPage (two on one page); hardcoded sitewide `BreadcrumbList` asserts a fake navigation trail on every page | `app/layout.tsx:210-233, 268-313` | P1 |
| 6 | Ten hub pages (`/temples`, `/folklore`, `/journal`, `/library`, etc.) get no unique meta description — inherit the homepage's generic one — and a hotlinked, likely-unlicensed Pinterest image as the default social card | `app/seo.tsx:14-34` | P1 |
| 7 | 13 destination + 8 place pages inherit the homepage's Open Graph card wholesale (wrong URL, wrong image) on every social share | `app/[...slug]/page.tsx:100-116` | P1 |
| 8 | Sitemap `lastModified` is always `new Date()` (build time) on all 86 URLs — every page claims to change on every deploy, so crawlers learn to discount the field | `app/sitemap.ts` | P1 |
| 9 | Two meta descriptions describe the brand as a trekking/tour service, in the exact register `CLAUDE.md` bans | `app/about/page.tsx:6`, `app/why-pahari-yatri/layout.tsx:6` | P1 |
| 10 | Heading hierarchy broken on destination pages (Markdown renders as literal `## text`, zero real `<h2>`) and duplicated on story pages (hero H1 + MDX body H1) | destination MDX rendering; `demoteHeadings()` fix unpushed | P1 |
| 11 | www→apex duplicate is **already fixed** at the Vercel edge (308 redirect) — GSC's split-signal rows are legacy and should decay. Canonical tags are correct and consistent. No action needed beyond monitoring | — | Resolved, monitor only |

### Portal

| # | Problem | File(s) | Severity |
|---|---|---|---|
| 1 | **Every public route serves ~69 characters of visible text** — an empty React Suspense shell, no headings, no copy, no nav, no footer, no internal links. Root cause candidates: root `app/loading.tsx` locking the tree in Suspense, and `"use client"` on 46 of 50 route files. This is the single most severe finding across both properties | `app/loading.tsx`, near-universal `"use client"` | **P0** |
| 2 | **Every URL on the portal declares its canonical as the homepage** (`https://app.pahariyatri.com/en`) — an explicit instruction to Google to drop every other URL from the index | `app/layout.tsx` `generateMetadata` sits above the `[lang]` segment, never receives the locale param | **P0** |
| 3 | A real auth bypass: middleware derives the locale from the `Accept-Language` header instead of the URL path, so `Accept-Language: hi` on `/en/admin` (or `/profile`, `/vendor/dashboard`, `/vendor/payouts`) returns **200 instead of a redirect to login**. Not a demonstrated data leak today only because of problem #1 (empty client shell) — becomes a real one the moment SSR is restored, so must be fixed in the same pass | `middleware.ts` | **P0 — security** |
| 4 | `/{lang}/bookings/*` and `/{lang}/checkout` (payment surfaces) have **no server-side route protection at all** — robots-disallowed only, which is an indexing directive, not access control | `middleware.ts` `isProtected` list | **P0** |
| 5 | `/explore/[destination]/[activity]` — the only ~90 purpose-built SEO pages in the app, with real metadata/schema/headings already written — silently serve none of it, because `params` is read synchronously while Next.js 16 makes it a Promise. Same bug means `notFound()` never fires, so `/en/explore/atlantis/rafting` returns 200: an unbounded soft-404 URL space, shipped silently because `next.config.mjs` sets `ignoreBuildErrors: true` | `app/[lang]/explore/[destination]/[activity]/page.tsx` | **P0** |
| 6 | Zero structured data live anywhere on the property (the one JSON-LD block that exists never reaches production, per #5) | — | P1 |
| 7 | `/vendor/onboarding` is listed in the sitemap as public/indexable, described in a `robots.ts` comment as intentionally public, and simultaneously hard-redirected to a noindex login page by middleware — three parts of the repo disagree with each other | `app/sitemap.ts`, `app/robots.ts`, `middleware.ts` | **P0 — founder decision needed** |
| 8 | `/vendor/community` is protected by neither robots.txt nor middleware — crawlable and unguarded | `robots.ts`, `middleware.ts` | P1 |
| 9 | hreflang advertises 6 locales on every page, all resolving to English content, all canonicalizing to `/en`; sitemap lists only `/en` — a duplicate-content surface | `app/layout.tsx` | P1 |
| 10 | The banned CTA "Create My Package" is still live on the trip-builder's highest-intent screen | `app/[lang]/builder/page.tsx:430` | P1 — brand/copy, owned by `portal-brand-bridge-editor` |
| 11 | `typescript: { ignoreBuildErrors: true }` in `next.config.mjs` is the direct reason problem #5 shipped silently and will hide the next one | `next.config.mjs` | P1 |

---

## 4. Indexation problems and root causes

### Main site — 94 not-indexed, broken down and root-caused

| GSC bucket | Count | Root cause |
|---|---|---|
| Discovered — currently not indexed | 63 | Primary: the sitewide 200-on-404 bug (§3 main #1) destroys Google's ability to trust any URL on the domain. Secondary: thin content (~400–500 words/chapter, 90 words/destination, 40 words/place) and near-zero internal links into chapters |
| Crawled — currently not indexed | 10 | Quality threshold — the 8 place pages (33–48 words, structurally incapable of more, see §5) and two soft-404 hub pages |
| Page with redirect | 8 | **Working as intended** — `/{region}/stories/{slug}` → `/stories/{slug}` 301 |
| Excluded by noindex tag | 6 | Not explainable from current code — no `noindex` found anywhere in `app/`, `lib/`, `components/`. Likely Keystatic admin routes or a legacy branch deploy. Needs GSC URL Inspection on the specific URLs to resolve |
| Duplicate, different canonical chosen | 4 | Historical www-vs-apex split; redirect is now live at the Vercel edge, expect these to decay |
| Alternate page, proper canonical | 3 | **Working as intended** — `/books/{book}/{chapter}` correctly canonicalizes to `/chapters/{slug}` |

**Reframe: only 6 of 94 are an actual mystery.** ~73 trace to one bug plus thin content; 15 are the site behaving correctly.

### Portal — effectively 100% unindexed, and for a different reason

Not a coverage-bucket problem — there is no coverage data because no sitemap was ever submitted. But even if one were submitted today, every URL would fail to index meaningfully because (a) every page canonicalizes to the homepage (§3 portal #2) and (b) every page serves no server-rendered content (§3 portal #1). **Submitting a sitemap before fixing these two would waste the crawl budget on URLs Google is instructed to discard.**

---

## 5. Content gaps

### Main site — destination cluster coverage vs. the founder's target list

| Destination | Status | Note |
|---|---|---|
| Mandi | **Deepest cluster on the site** | 4 chapters + 2 stories + a hub, but hub page itself is 100 words. Matches the Sacred Mandi thesis |
| Parashar Lake, Kamrunag, Shikari Devi, Churdhar, Jalori, Kheerganga | Thin but present, some already ranking | Churdhar and Jalori stories are already earning positions 3.6 and 2.2 — best expansion ROI outside Mandi |
| Kasol, Parvati Valley | Partial / no hub page | Kasol isn't a district in the current IA, so it has nowhere to live; Parvati Valley (a P1 founder cluster) has zero dedicated landing surface |
| Manali | Content exists and is the best destination copy on the site (374 words) — **but renders as literal broken Markdown live** (unpushed fix exists) | Broken, not thin |
| Shimla, Kinnaur, Spiti | Thin hubs (90–100 words), 1-2 chapters each, some poetically-titled (not search-shaped) | Kinnaur has two orphan pages (zero inbound links) |
| Tirthan Valley | Content exists but is mislabelled — the only chapter never mentions "Tirthan" in its title | Effectively invisible to search |
| Jibhi | Structurally capped at 48 words (places schema has no content field) | |
| Kangra | Empty hub — zero chapters, zero stories | |
| Dharamshala/McLeod Ganj, Triund | Barely present (33-34 words) | Effectively missing |
| Sangla, Chitkul | Mentioned only in passing inside unrelated chapters | Missing |
| Malana | **Zero occurrences anywhere in the content data** | Missing |
| Sarahan | **Entity collision** — the one chapter tagged to this name is actually "Baga Sarahan" in a different district from the historic Sarahan Bhimakali temple the name usually refers to | Needs `local-verification-editor` before any content is built here — do not write to this name until the collision is resolved |
| Bilaspur, Solan, Hamirpur (district hubs, not on founder's list but structurally present) | No chapter, place, or story assigned to any of them | Permanent dead ends until content exists |

**The structural ceiling behind all of the above:** the chapter `overview` field — the best, most factual, most AI-extractable writing on the site — is never rendered on the page (it only feeds the meta description and JSON-LD). And the `places` collection schema has no content field at all, so place pages are capped at ~40 words regardless of who writes them. Both are one-time structural fixes that unblock every destination above, not a per-destination rewrite.

**Ten chapters have poetic, non-search-shaped titles** (`echoing-caves`, `river-sutra`, `cloud-forest-paths`, etc.) — correctly kept as brand texture per the "content is never deleted" rule, but flagged because some are currently the *only* asset for a founder-priority destination (e.g., `river-sutra` is the only Tirthan chapter, `cloud-forest-paths` the only Jibhi chapter) and carry no searchable entity in the title.

### Portal — content gap is a rendering gap, not a writing gap

The `/explore/{destination}/{activity}` matrix (~90 URLs, 9×10) already has metadata, schema, and headings written in code for every combination — the content strategy work here is *already done* and simply isn't reaching the browser (§3 portal #5). Building more content here before fixing rendering would multiply the same invisible-page problem.

---

## 6. Search opportunities

See `SEO_OPPORTUNITY_MAP.md` for the full query-level breakdown. Headline items:

1. **`/temples` is ranking (badly) for ~60 real temple-name searches it doesn't answer** — 151 impressions, 0 clicks, position 54.7, on a page hardcoding six temples. This is the single clearest, largest content opportunity in the dataset, and it's a natural fit for the Sacred Mandi/devta-culture identity — gated on `local-verification-editor` for factual accuracy per temple.
2. **`mural danda trek`** — 14 impressions at position 10.6, the site's one genuine non-brand destination query, blocked from moving up only by missing chapter metadata (quick fix once code is deployed).
3. **Two stories already rank well** (Jalori at 2.2, Churdhar at 3.6) proving the format works — worth using as the template for the next expansion round rather than starting from theory.
4. **Portal has no query data to act on yet.** The founder's target portal keyword list (verified homestays, local guides, taxi routes) is a reasonable structural plan for the existing `/explore` matrix, but should wait until that matrix is actually rendering and crawlable, and ideally until 4-6 weeks of real impressions exist post-fix.

---

## 7. Internal-linking opportunities

### Main site

| Gap | Detail |
|---|---|
| Orphan pages (0 inbound links) | `/chapters` (the entire chapters index — not in header nav or any footer column), `/chapters/pin-bhaba-pass`, `/stories/bhaba-moon-road` (424 words, the strongest first-person voice in the archive) |
| Near-orphans | 14 of 20 stories have exactly one inbound link (their parent chapter) |
| District hub → content | **Broken, total dead end.** Code to link district hubs to their chapters/places/stories exists (`getDistrictLinks()`) but is unpushed |
| Chapter → district hub | Missing entirely — chapter breadcrumbs go to `/himachal`, never to the specific district page |
| Chapter → sideways chapters (`relatedChapters`) | Populated on only 4 of 24 chapters |
| Chapter → practical guide (`/responsible-travel`) | Missing entirely — not one chapter links to the Yatri Code |
| Anchor text | `/temples` (the site's #2 impression page) uses generic "Read the chapter →" ×6 instead of the destination name as anchor text |

### Portal

Not yet meaningfully assessable — with every page rendering ~69 characters of visible text (§3 portal #1), there is effectively no internal linking to audit yet; it will need a fresh pass once rendering is fixed.

### Cross-property

**Zero links exist from the main site to the portal, in either direction, anywhere in the code.** The founder's desired funnel (main site → destination intent → Local Connect → verified partners) does not exist as a single link today. This has to ship before any bridge-event tracking (`local_connect_click` etc.) has anything to measure.

---

## 8. AI-search / generative-search readiness

| Factor | Main site | Portal |
|---|---|---|
| Crawlable HTML | **Solid** — full text in initial server-rendered HTML | **Fails** — 69 characters of visible text per page |
| Blocking AI crawlers | **Yes, contradictorily** — middleware 403s `Google-Extended`/`GPTBot`/`anthropic-ai`/`FacebookBot` while `robots.txt` allows some of them. `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot` do get through | Not yet assessable — no analytics or crawl-blocking issue found, but nothing to crawl regardless |
| Entity/knowledge-graph anchoring | Partial — 25 entities mapped to WikiData IDs, but 6 of 13 destinations, 4 of 8 places, and **all 24 chapters** have no WikiData anchor | None found |
| Extractable first-answer facts | **The best asset on the site (`overview` field) is invisible** — feeds only meta tags, never renders as read text | The one JSON-LD block that exists never renders (rendering bug) |
| Named authorship / E-E-A-T | Effectively zero — all articles attributed to the Organization, not a person; a hardcoded "Pahari Yatri Original · Lived Reality" badge is an unattributed authority claim | Not assessed |
| Freshness signals | All synthetic — every `lastModified`/`datePublished` is build time, not real change history | Not assessed |

**Bottom line: the main site's biggest AI-readiness problem is self-inflicted policy (blocking the crawlers it wants) and a hidden content field, both fixable without new writing. The portal's AI-readiness problem is the same rendering bug blocking everything else — there is no separate AI-search work to do there until pages render.**

---

## 9. Analytics gaps

| | Main site | Portal |
|---|---|---|
| Is GTM actually live in production? | **Yes** — verified three independent ways (server-rendered `ns.html` tag, shipped client chunk, published container contents). An initial `gtm.js` grep looked like a false negative; the correct live-check is the `ns.html` tag, not the client-injected loader | **No** — verified by curl: zero occurrences of GTM, GA4, Meta Pixel, Vercel Analytics, or any other vendor in the served HTML. This is a true negative, not "built but unconfigured" |
| Why | Working as designed — `GTM-N953C62X`, GA4 `G-VLHVCQKQM0`, Meta Pixel all live in the published container | **The entire tracking foundation (`lib/analytics.ts`, GTM loader, Dockerfile build arg, all 14 event call sites) exists only as 2 unpushed local commits, absent from `origin/main`.** This is the same class of problem as §0 — code that exists but never shipped |
| Event coverage vs. code | 9/9 main-site events verified present in code and in the published container — nothing here was left unpublished | 14 events written locally; 0 live. A legacy, separate event stream (`sessionService.ts`, ~68 events, different vocabulary) is confirmed present on `origin/main` but inert (gated behind unset env vars) |
| Founder's requested taxonomy (`page_view`, `destination_view`, `plan_trip_start`, `booking_start`, etc.) | Partially mapped — `article_view` ≈ existing `chapter_view`; `search`, `destination_view`, `local_connect_click` don't exist yet anywhere | Mostly unmapped — `service_view`, `booking_start`, `booking_complete` have no equivalent in the 14 planned events at all. **Razorpay checkout is live and completely untracked** — money moves with zero attribution |
| UTM/attribution capture | Client-side, works correctly, silently produces nothing on untagged links (by design) | Middleware **does** capture `ref`/`utm_source` into cookies on `origin/main` right now — but the code that would read those cookies into events is on the unpushed branch. Production has been setting attribution cookies with nothing consuming them |
| A collision risk worth flagging before enabling the portal's GTM | — | The legacy `sessionService.ts` stream includes a literal `page_view` event name that will double-count against GA4's automatic pageview tracking the moment `NEXT_PUBLIC_GTM_ID` is set — both streams share one gate. Needs an exclusion or rename decided *before* enabling, not after |

**The content→portal funnel the founder wants measured doesn't exist to measure yet** — per §7, there isn't a single link from the main site to the portal today, so the four "bridge" events (`portal_cta_click`, `request_local_options_click`, `vendor_apply_click`, `app_landing_view`) have nothing to attach to. Cross-linking has to ship before bridge-event tracking is meaningful.

---

## 10. Priority roadmap

Classification per the founder's brief: **P0 = blocking · P1 = high value · P2 = improvement · P3 = future.** Everything here is a recommendation. Nothing is implemented. Per the golden rule, anything public-facing or touching more than ~10 files stops at **Approve** and needs an explicit founder go-ahead before `nextjs-production-engineer` (main site) or the equivalent portal engineer touches code.

### P0 — blocking, do these before anything else has value

| # | Fix | Property | Depends on |
|---|---|---|---|
| 1 | Confirm which branch/commit each property's production deploys from; get the unpushed work (9 main-site commits, 2 portal commits) merged to it | Both | **Founder decision** |
| 2 | Fix sitewide 200-on-404 (incl. missing images); add a real `not-found.tsx` | Main site | #1 |
| 3 | Resolve the contradictory AI-crawler blocking in `middleware.ts` vs `robots.txt` — pick one policy | Main site | Public-facing change, needs approval |
| 4 | Remove the fabricated `TouristInformationCenter` schema (fake address/geo/hours/price) | Main site | Brand-integrity violation, live now |
| 5 | Remove the hidden keyword-stuffed H1 block (also fixes the "Uttarakhand" factual error) | Main site | Brand-integrity + factual-accuracy violation, live now |
| 6 | Restore server-rendered HTML on all public portal routes (currently 69 chars/page) | Portal | Root-caused to `app/loading.tsx` + near-universal `"use client"` — needs `nextjs-production-engineer` diagnosis |
| 7 | Fix the sitewide `canonical=/en` bug so every page doesn't declare itself the homepage | Portal | Same metadata-resolution layer as #6 |
| 8 | Fix the `Accept-Language`-based auth bypass on `/admin`, `/profile`, `/vendor/dashboard`, `/vendor/payouts` | Portal | **Security** — must land with or before #6 |
| 9 | Add `/bookings/*` and `/checkout` to server-side route protection | Portal | Payment surfaces currently client-guarded only |
| 10 | Resolve the `/vendor/onboarding` three-way contradiction (sitemap says public, robots comment says public, middleware redirects to login) | Portal | **Founder decision** |
| 11 | Fix the `/explore/[destination]/[activity]` params bug (unblocks the ~90 SEO pages and their soft-404 space) | Portal | Same class as #6/#7 |
| 12 | Merge and deploy the portal's tracking foundation; add `booking_start`/`booking_complete` before or alongside — Razorpay is live and fully untracked | Portal | #1 |

### P1 — high value, safe, mostly additive

| # | Fix | Property |
|---|---|---|
| 13 | Submit the main-site sitemap dedupe (`/himachal` listed twice) and real `lastModified` values | Main site |
| 14 | Give hub pages (`/temples`, `/folklore`, etc.) unique meta descriptions; replace hotlinked Pinterest OG image | Main site |
| 15 | Give destination/place pages real per-page OpenGraph | Main site |
| 16 | Render the chapter `overview` field as visible content — unblocks Kheerganga/Kamrunag/etc. answer-first search value | Main site |
| 17 | Populate `targetKeyword`/`metaDescription`/`seoTitle` on the Mandi cluster first | Main site |
| 18 | Expand `/temples` with verified content on the ~60 already-searched temple names | Main site — gated on `local-verification-editor` |
| 19 | Submit the portal sitemap to GSC — **after** #10 is resolved, so a redirecting URL isn't submitted | Portal |
| 20 | Add `/vendor/community` to route protection (currently guarded by neither robots nor middleware) | Portal |
| 21 | Give each portal route its own title/description (9 distinct URLs currently share one) | Portal |
| 22 | Ship main-site → portal cross-links before building bridge-event tracking around them | Both |
| 23 | Resolve the legacy-vs-new event vocabulary collision (`page_view` double-count risk) before enabling portal GTM | Portal |
| 24 | Fix two meta descriptions that describe the brand as a trekking service | Main site |

### P2 — structural improvements

| # | Fix | Property |
|---|---|---|
| 25 | Link `/chapters` from nav/footer; resolve the 3 orphan pages | Main site |
| 26 | Add chapter → district hub, chapter → `/responsible-travel` links | Main site |
| 27 | Add a content field to the `places` schema (currently capped at ~40 words structurally) | Main site |
| 28 | Extend WikiData entity mapping to all chapters, not just some destinations | Main site |
| 29 | Add real 404s and a dynamic sitemap section for `/vendor/[id]` once server-rendered | Portal |
| 30 | Add `LocalBusiness` schema to `/vendor/[id]` — only with real, server-side verified review data, never `localStorage`-only data | Portal |
| 31 | Fix hreflang (currently identical 6-locale block on every page, no `x-default`) | Portal |
| 32 | Add read/scroll-depth and `search` events on the main site | Main site |
| 33 | Build the portal keyword/page plan against the founder's target queries — only after rendering is fixed and real GSC data exists | Portal |

### P3 — future / hygiene

| # | Fix | Property |
|---|---|---|
| 34 | Founder decision on the drafted-but-uncommitted temple-etiquette chapter | Main site |
| 35 | Source the 22 missing destination/place/region hero images (`public/static/images/{destinations,places,regions}/` don't exist — includes the `/himachal` region hero itself, which is also serving 45KB of HTML with a 200) | Main site |
| 36 | Resolve the Sarahan entity collision before any content is built on that name | Main site |
| 37 | Remove dead code (`app/blog/`, unused `getTouristTripSchema`, duplicate keystatic helpers) | Main site |
| 38 | Remove `ignoreBuildErrors: true` from `next.config.mjs` — it's why the params bug shipped silently | Portal |
| 39 | Add a 1200×630 OG image; fix the double `/` → `/en/` → `/en` redirect hop | Portal |
| 40 | Move internal engineering docs (`/docs`) off the public origin | Portal |

---

## 11. Explicitly out of scope / not recommended

- No new content pages are proposed by this audit — that's a separate, approved content pass.
- Do not rename `parashar-lake-trek` or `kamrunag-the-lake-of-oaths` — live UTM campaigns point at them.
- Do not merge the two Kamrunag chapters — different search intents, one is a live campaign URL.
- Do not delete, redirect, or noindex any of the 13 destination or 8 place pages — the constraint is quality per URL, not URL count.
- No programmatic page generation on either property — 63 main-site URLs and effectively the entire portal are already sitting unindexed; adding volume before fixing the underlying causes would make both worse.
- Do not add a second www→apex redirect on the main site — the existing Vercel-level 308 is working; a duplicate risks a redirect chain.
- Do not add a `verificationStatus` publish filter on the main site without an explicit founder decision — all 24 live chapters currently default to unverified, so a hard gate would deindex the entire library.
- Do not build the portal's destination/service keyword pages until rendering is fixed and real demand data exists — building content before Google can read it multiplies the current invisible-page problem instead of fixing it.
- No ranking-improvement claims are made anywhere in this document. Every fix above needs to be measured through Search Console and analytics over the following weeks, per the founder's own instruction.

---

## 12. What happens next

Per the repo's golden rule (Inspect → Report → Plan → **Approve** → Implement → Test → QA → Document → Recommend), this document and its companion opportunity map complete step 3 (Plan) for both properties. Recommended next step: the founder reviews the P0 lists in §10 for both properties, makes the three explicit decisions this audit surfaced (deploy-branch confirmation, `/vendor/onboarding` public-vs-gated, AI-crawler blocking policy), and approves a scoped implementation pass — main-site fixes to `nextjs-production-engineer`, portal fixes to the equivalent portal engineer, both gated by `qa-security-reviewer` before anything is pushed.
