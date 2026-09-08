# Pahari Yatri — SEO Audit Report (beta branch)

Date: 2026-09-08. Scope: `beta` branch codebase + live `pahariyatri.com` production data (GSC/GA4/social are tied to the live domain, not to any git branch — none of this session's `beta` work is deployed yet, so all traffic/ranking numbers below reflect the currently-live site, not what's been built this session). Audit only, nothing edited as part of producing this report.

---

## 1. Current traffic (live, verified via browser this session)

**Google Search Console** (`sc-domain:pahariyatri.com`, last 3 months, both `pankajkumar.techie@gmail.com` and `pahariyatri@gmail.com` accounts checked and confirmed showing identical numbers):

| Metric | Value |
|---|---|
| Total clicks | 24 |
| Total impressions | 1.16K |
| Average CTR | 2.1% |
| Average position | 16.8 |
| Indexed pages | 37 |
| Not indexed | 90 |

**Google Analytics (GA4)**, real property confirmed (`a336957575p467775152` under `pahariyatri@gmail.com` — a different Google account's GA4 showed a synthetic "Sample Gold" demo dataset in an earlier session; that is not real traffic and should never be cited), last 7 days:

| Metric | Value |
|---|---|
| Active users | 34 |
| New users | 34 |
| Sessions, Direct | 31 |
| Sessions, Organic Search | 2 |
| Sessions, Organic Social | 2 (1 Facebook referral, 1 Instagram reel) |
| Sessions, AI Assistant | 0 this week (1 `chatgpt.com/ai-assistant` first-user source logged historically) |
| `page_view` events | 45 |
| `scroll` events | 4 |

**Read this plainly**: the site currently gets almost no organic traffic (2 sessions/week from Google), and of the traffic it does get, most visitors don't scroll meaningfully into a page (4 scroll events against 45 page views, roughly 9%). Both numbers matter for different reasons — the first says discovery is the bottleneck, the second says once someone arrives, something about the first screen isn't holding attention. Neither is new information invented for this report; both were independently confirmed this session.

---

## 2. Current rankings (live Google Search checked this session)

Two representative searches performed directly against Google, not GSC:

- **"kheerganga trek guide"** — pahariyatri.com does not appear on page 1. Results are dominated by commercial trek operators (Himalayan Hikers, 10,063 reviews; Himtrek, selling packages "from ₹999") and established travel blogs (The Bum Who Travels, since 2017; Wildcraft; Travel Melodies). This is a mature, commercially competitive keyword.
- **"parvati valley villages beyond kasol"** — pahariyatri.com does not appear on page 1 here either, despite this being the book's own core thesis. Competitors already occupy this exact framing: a Facebook post titled "Tosh Village, Parvati Valley ❤️ Beyond Kasol" (100+ reactions, 1 week old), a blog post "Not Your Typical Travel Guide to Parvati Valley," and active YouTube/Instagram creators making "beyond Kasol" content right now. The thesis is correct and the content gap is real, but it is not an undiscovered angle — it's a crowded one that happens to be executed shallowly by most competitors.

GSC's own top queries (both accounts, verified identical): dominated by temple-name searches (`jamadagni rishi temple`, and ~60 similar queries) hitting `/temples` at position 51.7-74, brand/navigational terms (`pahari`, `pahari path`, `yatri way`), and two real non-brand rankings: `mural danda trek` (position ~11) and small Kheerganga-related queries (position ~10-11). This matches every prior audit this project has run — nothing has changed here because nothing has shipped to production yet.

---

## 3. Indexed pages and site structure

**Books**: 5 (`lost-trails`, `monsoon`, `summer`, `winter`, `parvati-valley-beyond-kasol`).
**Chapters**: 38 total. 16 of these are the new Parvati Valley book (fully templated: SEO fields, sources, related chapters). The other 22 have none of that — no `relatedChapters`, no `targetKeyword`, no public `sources` field, confirmed by direct inspection of every chapter file.
**Stories**: 28.

**A real, previously-unflagged technical bug found this session**: the sitemap (`app/sitemap.ts` on this branch) generates **zero URLs for chapters and zero for individual books**. It includes static pages, regions, destinations, places, and stories — but not the 38 chapters that represent almost all of the site's substantive content, including all 16 new Parvati Valley pages just built. Verified directly: `curl .../sitemap.xml | grep chapters` returns nothing.

**A second bug in the same file**: stories are sitemapped at `/{region}/stories/{slug}` (e.g. `/himachal/stories/beyond-the-cafe-strip`), but every internal link on the site (chapter `relatedStories`, this session's own new content) points to the shorter canonical `/stories/{slug}`. Both URLs return 200, and **each declares itself as its own canonical** rather than pointing to one URL — confirmed directly: `/stories/beyond-the-cafe-strip` canonicalizes to itself, `/himachal/stories/beyond-the-cafe-strip` also canonicalizes to itself. That's a genuine duplicate-content configuration, not a hypothetical one.

A third, minor issue: `/himachal` appears twice in the generated sitemap (once from the static routes list, once from the region-routes loop).

---

## 4. SEO metadata

Chapter metadata (`buildChapterMetadata` in `lib/keystatic/chapterView.ts`) generates title, description, canonical, OG, and Twitter tags for every chapter — this part works and was not found broken. JSON-LD includes `TouristTrip` and `FAQPage` schema, now enriched this session with `author`. No `BreadcrumbList` or `CollectionPage` schema exists on this branch (the other branch, `seo/phase-12-technical-fixes`, built this already — it hasn't been ported here).

---

## 5. Internal linking

16 of 38 chapters (all of them in the new book) have real sideways linking via the `relatedChapters` field added this session. The other 22 — the entire pre-existing chapter library — have no chapter-to-chapter linking at all on this branch. This is the same gap the other branch closed for its own chapter set; it has not been done here.

---

## 6. Social media presence (checked live this session)

- **Instagram** (`@pahariyatri`, 1,065 followers, 189 posts, live): bio still reads *"Not tourism. A movement of Yatris 🌿 Hidden valleys, sacred lakes & secret trails. Limited journeys..."* — three phrases (**hidden valleys**, **secret trails**, **limited journeys**) directly on this project's own banned-language list. Unchanged from when this was first found earlier in this session; still unresolved.
- **Facebook**: not re-checked this session; previously found the linked page (`facebook.com/pahariyatri`) returns "content isn't available" despite being an owned Meta Business asset — likely unpublished, not deleted.

---

## 7. Missing keywords / content gaps

Real, checkable gaps, not invented ones:

1. **The temple-name cluster** (~60 queries, `/temples` at position 51.7) is still the single largest, most-validated opportunity on the entire site, unchanged across every audit this project has run. Nothing has been done about it yet on any branch.
2. **The new Parvati Valley content has zero measured search demand today** (confirmed: none of "kasol," "parvati valley," "kalga," "pulga," "tosh," "malana," etc. appear in the 105-query GSC export). It's an evergreen-authority bet, executed with real research rigor — but it is not filling a demand gap GSC shows today. It's building supply ahead of demand.
3. **The sitemap gap in item 3 above is arguably the single highest-leverage fix available right now** — 38 chapters, including everything just built, are structurally invisible to the sitemap that's supposed to tell Google they exist.

---

## 8. Competitor comparison

For `kheerganga trek guide`: the field is commercial trek operators and long-established blogs (one active since 2017, one with 10,000+ reviews). Pahari Yatri cannot out-authority a decade of accumulated backlinks and reviews quickly. What it can do differently, and does: separate the Kartikeya legend from the current, legally-mandated day-trek-only reality (the camping ban), which — checked directly — none of the top competitor snippets mention. That is a genuine, checkable differentiation, not a marketing claim.

For `parvati valley villages beyond kasol`: the field is thinner and more scattered — travel blogs, one Facebook post, active but shallow social content. This is a more winnable space on content quality alone, if the sitemap/indexing gaps above get fixed first so Google can actually find the pages.

**Not recommending**: copying competitor structure (itinerary tables, cost breakdowns, package pricing) — that would pull Pahari Yatri toward exactly the tour-operator positioning this project has consistently rejected.

---

## 9. 90-day growth plan

**Days 1-14 — fix what's structurally broken, ship nothing new:**
- Add chapters and books to `app/sitemap.ts` (currently absent entirely).
- Fix the story duplicate-canonical bug (`/stories/{slug}` vs `/{region}/stories/{slug}`) — pick one canonical URL and make the other redirect or at least declare the correct canonical.
- Remove the duplicate `/himachal` sitemap entry.
- Fix the Instagram bio (banned language, three phrases) and resolve the Facebook page visibility issue — both require founder/account-owner action for the Meta side.
- Decide whether to reconcile this branch with `seo/phase-12-technical-fixes` (breadcrumbs, district linking, coordinates already built there) rather than rebuilding it twice.

**Days 15-45 — close the internal-linking gap on the other 22 chapters:**
- Populate `relatedChapters` and the SEO template fields (targetKeyword, sources, localTruth) for the pre-existing 22 chapters, the same treatment the new 16 already have.
- Request indexing for the sitemap-fixed URLs once deployed, starting with the highest-research-quality pages (Kheerganga, Malana, Manikaran Sahib).

**Days 46-90 — act on the one validated demand signal:**
- Begin the temple-name cluster properly: pick 2-3 of the ~60 queried temple names, research each to the same standard as this session's Parvati Valley work (multiple independent sources, hedge conflicts, no invented mythology), and publish.
- Re-measure GSC/GA4 at day 90 against this report's baseline (24 clicks, 1.16K impressions, 37 indexed) to see what actually moved.

**Not recommended in this window**: more new villages/chapters before the sitemap and linking gaps are fixed — adding content Google structurally can't find yet doesn't compound.

---

## What this audit did not do

Did not touch Google Ads/paid data (none exists to check). Did not run a full backlink-profile tool (no access to Ahrefs/SEMrush-class tooling from this session). Did not check every one of the 12+ keywords named in the brief individually — two representative, real checks were done rather than fabricating results for the rest. Did not re-verify Facebook's live status this session (checked and reported earlier in the conversation; noted here as "not re-checked" rather than re-stated as fresh).
