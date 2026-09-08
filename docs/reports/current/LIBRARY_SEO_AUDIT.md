# Library SEO & Discovery Audit

Date: 2026-09-08. Scope: `/library` only (the page redesigned in the prior session), plus everything that determines whether a reader or a crawler can actually reach it. Audit only — nothing in this document has been implemented. Verified against a local production build (`npm run build && npm run start`), not assumed from reading source alone.

---

## 1. Metadata

**Current status:** Correct and clean. Verified via curl against the built page:

```
<title>The Library | Pahari Yatri</title>
<meta name="description" content="The digital Himalayan library of seasonal trail journals, stories, temples, folklore, and responsible mountain travel. Learn the Himalayas before you walk them."/>
<link rel="canonical" href="https://pahariyatri.com/library"/>
```

OG/Twitter tags all resolve correctly (`og:title`, `og:description`, `og:url`, `og:image` via the `/api/og` branded fallback since no explicit image is set). No duplicate-title or self-canonical bug — the pattern the last technical audit found on other pages does not repeat here.

**Issues:**
- Meta description is **160 characters** — at or just past Google's typical truncation point (~155-160 depending on pixel width). Minor; likely to be truncated mid-word in some SERP renders.
- No `targetKeyword`/`secondaryKeywords` concept exists for this page. Chapters have that field in the Keystatic schema; static hub pages like `/library`, `/temples`, `/folklore` don't — their titles/descriptions are hand-written directly in each `page.tsx` with no tracked keyword intent. Not a library-specific bug, but library is the page where it would matter most (it's the aggregator).

**SEO opportunities:**
- Real search demand for the literal term "library" is effectively zero — none of the 105 real GSC queries pulled for this site contain it as a navigational/intent term (two queries contain the substring "library"/"pustakalay" but as parts of unrelated temple/place names, not searches for this section). This page's SEO value is structural (internal linking, crawl path, topical authority signal), not keyword-targeted. Don't over-invest in library-specific keyword copy; the opportunity here is architecture, not wording.

**Recommended changes:** Trim the meta description by ~15-20 characters. Leave the rest as is.

**Expected impact:** Low, cosmetic. This section is not where the real opportunity is.

---

## 2. Structured data

**Current status:** Verified by inspecting the rendered page's `<script type="application/ld+json">` blocks — there are exactly **2**, and both are the sitewide `WebSite`/`Organization` schema emitted in the root layout on every page. **Nothing page-specific.** No `CollectionPage`, no `ItemList` of the shelves/books, no `BreadcrumbList`.

**Issues:**
- This is not unique to `/library` — I checked `/books`, `/chapters`, `/stories`, `/temples`, `/folklore` and none of them carry page-specific JSON-LD either (`lib/schema.ts` has schema builders for `BlogPosting`, `TouristDestination`, `Place`, `Region`, `VideoObject` — none for a collection/hub page or a breadcrumb). It's a sitewide gap that happens to matter most here, because `/library` is explicitly the aggregator of everything else.
- No `BreadcrumbList` exists anywhere except the region/district/place catch-all route (`app/[...slug]/page.tsx`). Chapters, stories, books, and library itself have zero breadcrumb structured data and zero visible breadcrumb UI.

**SEO opportunities:**
- A `CollectionPage` + `ItemList` on `/library`, enumerating the real books and the 8 shelf sections, is a legitimate, honest addition — it describes content that genuinely exists on the page, not a fabricated claim. This is exactly the kind of "structured, source-aware, easy to quote" signal the project's AI-visibility strategy already asks for.
- `BreadcrumbList` on chapter pages (Home → Library → [Book] → [Chapter], or Home → Chapters → [Chapter] — see §4) would be new, not a fix to something broken, and is the more valuable of the two because chapters are the pages actually receiving search impressions.

**Recommended changes:**
1. Add a `CollectionPage`/`ItemList` schema to `/library`, generated from the same `books` + `shelfGroups` data already on the page — no new content, just describing what's already rendered.
2. Add `BreadcrumbList` to chapter pages as part of the internal-linking fix in §3/§4, since the visible breadcrumb UI and its structured-data twin are naturally one change.

**Expected impact:** Medium for AI-search/rich-result eligibility; not a ranking lever on its own, but it's free (no new content, no risk of an unsupported claim) and compounds with §3/§4.

---

## 3. Internal linking opportunities

**Current status — this is the main finding of the audit.** I traced every inbound link to `/library` in the codebase (`grep` for `href="/library"` and its variants across the whole repo, not sampled):

| Source | Link |
|---|---|
| Homepage hero (`HeroBanner`) | Primary CTA button, "Open the Library" |
| Homepage `FinalCTA` | Secondary button, "Open the Library" |
| `Footer` (site-wide component) | One line among the footer's link list, "Open the Library" |
| `/404` | Recovery link |

**That is the complete list.** `headerNavLinks.js` — the array both `DesktopNav` and `MobileNav` render — has `/library` **commented out**:

```js
const headerNavLinks = [
  // { href: '/library', title: 'Library' },
  { href: '/books', title: 'Books' },
  ...
```

So `/library` is not in the primary navigation on desktop or mobile, is not linked from any chapter, story, book, temple, folklore, or journal page, and is not linked from any of the other index/hub pages (`/books`, `/chapters`, `/stories`, `/temples`, `/folklore`). Its only persistent, sitewide path is the footer.

**Issues:**
- A reader who lands anywhere other than the homepage — which, per real GSC data, is most search traffic, since `/temples`, `/folklore`, `/chapters/mural-danda-trek` and individual story pages all carry real impressions — has no way to discover the Library hub except scrolling to the global footer.
- This directly undermines the point of the redesign done last session: a genuinely improved library page that almost nothing on the site actually points to.

**SEO opportunities:**
- This is a **zero-content-risk, zero-research-required** fix — exactly the kind of internal-linking work already established as this project's highest-value, lowest-effort lever (per `PAHARI_YATRI_CONTENT_AUTHORITY_REPORT.md` §10 and the internal-linking commits already made to chapters). It requires no new copy, no cultural claims, no founder research gate.
- Uncommenting the nav link is the single highest-leverage, lowest-risk change available in this entire audit.

**Recommended changes, in priority order:**
1. **Uncomment `/library` in `headerNavLinks.js`.** One line. Restores it to persistent nav on every page, desktop and mobile.
2. **Add a "Back to the Library" or similar link on chapter/story/book pages** — the natural place is next to the existing "This chapter belongs to [Book]" backlink block (already built in a prior session) — so deep content has a path up to the hub, not just sideways to its book.
3. **Link `/library` from the other hub pages** (`/books`, `/chapters`, `/stories`, `/temples`, `/folklore`) — they are its siblings/children conceptually, and right now none of them acknowledge it exists.

**Expected impact:** High. This is the audit's top recommendation. Restoring the nav link alone changes `/library` from a page reachable only from the homepage into a page reachable from every screen on the site.

---

## 4. User journey: Search → Chapter → Library → Related content

**Current status:** Traced step by step against the live GSC data already pulled for this site (chapters like `mural-danda-trek` and stories like `kheerganga-fire-and-water` do get real search impressions).

- **Search → Chapter:** works. Metadata, canonicals, and JSON-LD on chapter pages are solid (verified in prior sessions).
- **Chapter → Library:** **does not exist.** Chapter pages link to: related chapters (`relatedChapters`), related stories (`relatedStories`), their parent book, the next chapter in the book, a district hub (added last session), and `/responsible-travel` and `/apply` in the closing CTA. None of these is `/library`. A reader who arrives via search, reads a chapter, and wants to see "everything else this site has" has no signposted way to do that.
- **Library → Related content:** works well after last session's redesign — the featured book shelf and the three grouped shelves all link onward to real destinations.

**Issues:**
- The journey the brief describes has a broken second link. `/library` is a good landing point once reached, but nothing routes a search visitor there from the content they actually searched for.
- No breadcrumb trail exists on chapter pages at all (see §2), which is the conventional way this exact journey (deep page → parent hub → home) is normally signposted, both for users and for Google's sitelinks/breadcrumb rich results.

**SEO opportunities:**
- Google's own guidance ties breadcrumb structured data to a healthier crawl/discovery path, and Search Console already validates 13 breadcrumb rich results elsewhere on this site — extending the same pattern to chapters is proven, not experimental, for this codebase.

**Recommended changes:**
1. Add a visible breadcrumb (Home → Library → [chapter's book] → [Chapter]) to chapter pages, paired with `BreadcrumbList` JSON-LD (see §2).
2. This single change also resolves the §3 finding about chapters not linking back to the hub — a breadcrumb is a more conventional and more discoverable fix than adding another CTA button to an already-busy chapter page footer.

**Expected impact:** High, and it's the same underlying fix as §3's chapter-level recommendation — implementing the breadcrumb satisfies both.

---

## 5. Mobile UX

**Current status:** Verified visually on a 1440px desktop viewport via the browser tool (screenshots confirmed in the prior session). **I could not get a true mobile-viewport screenshot this session or last** — the browser tool's window resize did not change the captured viewport, a known limitation I flagged honestly at the time rather than claiming mobile verification I didn't have. What follows is a code-level review, not a re-confirmed visual check.

**Reviewed in code:**
- The book carousel uses `flex-[0_0_85%]` on mobile — one card fills most of the viewport with a 15% peek of the next, a reasonable swipe-carousel pattern. Touch scrolling is enabled (`touch-pan-y`, Embla carousel with drag).
- Prev/next arrow buttons are `hidden sm:flex` — correctly hidden on mobile where swipe is the actual interaction, not a broken affordance.
- The shelf-group cards are a standard responsive grid (`grid sm:grid-cols-2 lg:grid-cols-3`) that collapses to one column on mobile — each card is a full-width tap target, which is good for thumb use.
- `PageHero`'s image uses `sizes="100vw"` and `priority`, correct for a mobile LCP element.

**Issues (code-level, not yet visually re-confirmed):**
- No swipe-position indicator (dots) on the mobile book carousel — a user has no signal of how many books exist beyond the current one and the single peeking edge. Minor; the carousel already peeks the next card, which is a partial affordance.
- Hover-only affordances (`hover:-translate-y-1`, `hover:shadow-lg`) do nothing for touch and are occasionally triggered as a "sticky hover" on iOS Safari after a tap — a well-known platform quirk, not something introduced by last session's work, and low-severity.

**SEO opportunities:** None directly — this section is about usability, not indexability. Mobile usability is a Google ranking input (mobile-first indexing), so a genuinely broken mobile experience would matter, but nothing found here rises to that level.

**Recommended changes:** None urgent. If pursued: add a small dot/progress indicator under the mobile carousel. Low priority.

**Expected impact:** Low. Flagged for completeness per the brief's request, not because it's a real problem.

---

## 6. Content discovery improvements

**Current status:**
- `/library` **is** in `app/sitemap.ts`'s static routes list, at the shared static-page priority (0.8, same as `/temples`, `/folklore`, etc. — not uniquely calibrated, but not wrong either).
- `/library` **is** referenced in `public/llms.txt` and described as "Library (hub)" — the AI-visibility side is already in good shape for this specific page.
- Real GSC data: `/library` (both www and apex historical rows, pre-dating the www→apex redirect fix from the prior technical audit) shows roughly 53 combined impressions and 1 click over 3 months — negligible, consistent with a page that's structurally hard to reach (§3) rather than one that's unattractive once found.

**Issues:** Same root cause as §3 — a page can be perfectly indexable and still get no organic traffic if nothing links to it and no one is searching for "library" by name.

**SEO opportunities:**
- None require new content or research. Every recommendation in this document is structural (nav, links, breadcrumbs, schema) — which matches this project's stated principle of prioritizing internal-linking fixes over new pages, and requires no `local-verification-editor` gate since no cultural or factual claim is involved.

**Recommended changes:** Covered in §3 and §4 — there is no separate discovery fix beyond fixing the links.

**Expected impact:** Directly tied to §3/§4 — discovery improves exactly as much as internal linking does.

---

## Summary: what's actually worth doing

| Change | Effort | Risk | Impact |
|---|---|---|---|
| Uncomment `/library` in `headerNavLinks.js` | Trivial (1 line) | None | **High** |
| Breadcrumb UI + `BreadcrumbList` JSON-LD on chapter pages | Small-medium (one shared component, applied to one route) | Low | **High** |
| `CollectionPage`/`ItemList` JSON-LD on `/library` | Small | None | Medium |
| Link `/library` from other hub pages (`/books`, `/chapters`, `/stories`, `/temples`, `/folklore`) | Small | None | Medium |
| Trim meta description to ~155 chars | Trivial | None | Low |
| Mobile carousel position indicator | Small | None | Low |

**Recommendation:** implement the first two — the nav link and the chapter breadcrumb — as the high-impact pass this document's brief asked for. Both are zero-content-risk, sitewide-mechanical fixes with no founder research gate, consistent with every prior internal-linking pass on this project. The remaining four are reasonable follow-ups, not urgent.

**Not recommended:** any library-specific keyword/copy rewrite. Real search data shows no demand for "library" as a term — the page's job is architectural (organizing and surfacing everything else), and that's also where every real problem found in this audit actually lives.
