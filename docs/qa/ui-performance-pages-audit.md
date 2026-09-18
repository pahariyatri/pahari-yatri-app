# UI/Performance/SEO Audit — Library, Films, Community, About, Temples, Folklore, Contribute + /chapters Removal

Date: 2026-09-18
Branch: `beta`
Scope: `/library`, `/films`, `/community`, `/about`, `/temples`, `/folklore`, `/contribute`, and full removal of the public `/chapters` index page.

Out of scope (untouched): `/journal`, `/responsible-travel` (both still use `PageHero`, deliberately left alone), `/chapters/[...slug]` individual chapter pages, `FilmsList`/`ReelCard`/`ContributeForm`/`BookCarousel` business logic.

---

## 1. What changed

### New shared component
- **`components/common/PageIntro.tsx`** (new) — an image-free, server-rendered editorial header: optional kicker, `h1`, intro paragraph. No `next/image`, no `framer-motion`, no client JS. Shares `SectionContainer`'s max-width so it lines up with the cards/content below it.
- **`components/common/PageHero.tsx`** was left untouched — it is still used by `/journal` and `/responsible-travel`, which are out of scope for this pass.

### Page-by-page

| Page | Before | After |
|---|---|---|
| `/library` | `PageHero` full-bleed `library.jpg`, `priority`, 62svh | `PageIntro`, no image. Duplicate top padding on the following section trimmed so the shelf carousel sits right under the intro. |
| `/films` | `PageHero` full-bleed `films.jpg`, `priority` | `PageIntro`. Added an `h2` ("Latest films & reels") directly above `FilmsList` — see Accessibility below. |
| `/community` | `PageHero` full-bleed `community.jpg`, `priority` | `PageIntro`, same copy carried forward. |
| `/temples` | `PageHero` full-bleed `temples.jpg`, `priority`, plus a separate duplicate intro paragraph below it | `PageIntro` — the two intro paragraphs were merged into one so the page doesn't say the same thing twice. |
| `/folklore` | `PageHero` full-bleed `folklore.jpg`, `priority`, plus a separate duplicate intro paragraph | `PageIntro` — merged, and the intro now explicitly states folklore is "clearly separated from verified historical facts" per the brand's local-verification standard. |
| `/contribute` | `PageHero` full-bleed `contribute.jpg`, `priority`, plus a separate intro paragraph wrapping `ContributeForm` | `PageIntro` — merged; `ContributeForm` untouched (it already self-centers with its own `max-w-xl mx-auto`). |
| `/about` | Bespoke 80vh client-rendered hero: grayscale `mountains-bg.jpg` at `priority`, plus 3 staggered `framer-motion` entrance animations (kicker, `h1`, subtitle) | Same content replaced with `PageIntro` (no image, no entrance animation). The rest of the page (`The Awakening` founder story, `Our Covenant` values grid) is untouched, including its existing `whileInView` scroll-reveal motion — that's content-section polish, not hero media, and wasn't part of this task's target. Metadata also got a missing `alternates.canonical` (see SEO section). |

### `/chapters` removal
- Deleted `app/chapters/page.tsx` and `app/chapters/client-page.tsx` (the public index). This was a dated, separate card-grid page (client-rendered banner image, `AnimatePresence`/`motion` on every card, a decorative SVG mountain silhouette) that duplicated what `/library` already does with a better, on-brand design.
- `app/chapters/[...slug]/*` (individual chapter pages) is **fully untouched** — different files, different data flow (`getChapterView`), no shared imports with the deleted index.
- Added a 301 redirect `/chapters → /library` in `next.config.mjs`, following the exact precedent already in this file for the `/books → /library` consolidation.
- Removed `'chapters'` from the static route list in `app/sitemap.ts`. The dynamic `chapterRoutes` block (all 39 individual `/chapters/[slug]` URLs) is untouched and still emitted with `priority: 0.9`.
- Removed the "All Chapters" link from `components/Footer.tsx` (redundant with the existing "Open the Library" link).
- Changed the "Read every chapter" / `/chapters` button on `/start` to "Open the library" / `/library`, so internal links point at the canonical destination directly instead of relying on the redirect.
- Full repo-wide audit for other references (nav, breadcrumbs, JSON-LD, `lib/schema.ts`, `lib/keystatic/*`, homepage) found no other route pointing at the `/chapters` index — only individual `/chapters/[slug]` links, which are correct and unaffected. `keystatic.config.ts`'s `public/static/images/chapters` is an unrelated CMS upload-directory path, not a route.

---

## 2. Media removed

Removed as page-hero backgrounds (stopped referencing in code; **files left on disk**, see "Remaining issues"):

| File | Source size | Was used by |
|---|---|---|
| `public/static/images/pages/library.jpg` | 268K | `/library` hero |
| `public/static/images/pages/films.jpg` | 289K | `/films` hero |
| `public/static/images/pages/community.jpg` | 197K | `/community` hero |
| `public/static/images/pages/temples.jpg` | 115K | `/temples` hero |
| `public/static/images/pages/folklore.jpg` | 79K | `/folklore` hero |
| `public/static/images/pages/contribute.jpg` | 620K | `/contribute` hero |
| `public/static/images/journey-banner.jpg` | 1.6M | deleted `/chapters` index banner (now fully unreferenced anywhere in the repo) |

All seven were `fill` + `priority` (or, for the old `/chapters` banner, `priority` inside a client-rendered `motion.div`) — each one was an artificially forced LCP candidate on its page, purely decorative (generic Himalaya stock-style mood shots, no captions, no informational content), each used exactly once. Removing them means these 7 routes now have **zero above-the-fold images** to fetch, decode, or paint before text becomes the LCP element.

`mountains-bg.jpg` on `/about`: stopped using it in the hero, but the file stays — it's actively used elsewhere (`Manifesto.tsx`, `HeroBanner.tsx`, `lib/images.ts` fallback, `/why-pahari-yatri`, chapter-page image fallbacks).

## 3. Media retained and why

- All card/content images inside `BookCarousel`, `FilmsList`/`ReelCard`, and the individual `/chapters/[slug]` pages are untouched — they're informational (book covers, film thumbnails, chapter photography), not decorative page dressing, and already go through `ResponsiveImage`/`next/image` with proper `sizes`.
- `/temples` and `/folklore` never had per-card images to begin with (text-only cards) — nothing to remove or add there.
- `/about`'s founder-story and covenant sections keep their existing layout (no images there either).

## 4. Animation removed

- `/about`: removed the 3 staggered entrance `motion.span`/`motion.h1`/`motion.p` animations tied to the deleted hero. Left the two `whileInView` scroll-reveal blocks in "The Awakening" and "Our Covenant" untouched — pre-existing content-section polish, not hero media, and not implicated by "no unnecessary animation" in the same way a mandatory-on-load hero animation is.
- Deleting the `/chapters` index removes its `AnimatePresence` loading-state simulation (a fake 500ms `setTimeout` loading screen), a `motion.div` banner fade-in, and per-card staggered `whileInView` animations (up to `index * 0.15`s delay per card) — all gone with the page.

## 5. `/chapters` references removed — full list

- `app/chapters/page.tsx`, `app/chapters/client-page.tsx` — deleted.
- `components/Footer.tsx` — "All Chapters" nav link removed.
- `app/start/page.tsx` — "Read every chapter" CTA repointed from `/chapters` to `/library`.
- `app/sitemap.ts` — `'chapters'` removed from the static-routes array.

Confirmed **not** present anywhere: a `/chapters` reference in `app/robots.ts`, `lib/schema.ts` structured data, breadcrumb generation (`lib/keystatic/chapterView.ts` — breadcrumbs already went `Home → Library → [Book] → Chapter`, never through a `/chapters` index), the homepage, `Header`/`DesktopNav`/`MobileNav`, or any site-search component (there isn't one).

## 6. Redirects / canonical changes

- **New 301**: `/chapters` → `/library` (`next.config.mjs`), verified live: `curl -I` returns `301 Moved Permanently` / `location: /library`.
- Individual chapter canonicals are unchanged: `chapterCanonical(slug) = /chapters/${slug}` in `lib/keystatic/chapterView.ts` was never touched, and each `/chapters/[slug]` page still 200s and self-canonicalizes.
- No new duplicate canonicals introduced — `/library`'s own canonical stays `/library`; the redirect does not create a second URL claiming that canonical.

## 7. SEO changes

Recorded before changing anything (all via `generateMetadata`/`genPageMetadata`, all preserved as-is unless noted):

| Page | Title | Canonical | Robots |
|---|---|---|---|
| `/library` | "The Library" | `/library` | index,follow (default) |
| `/films` | "Films & Reels from the Himalayas" | `/films` | index,follow |
| `/community` | "The Community: Become a Pahari Yatri" | `/community` | index,follow |
| `/temples` | "Temples & Traditions of the Himalayas" | `/temples` | index,follow |
| `/folklore` | "Himalayan Folklore: Myths and Legends of the Pahari World" | `/folklore` | index,follow |
| `/contribute` | "Contribute a Story to the Himalayan Library" | `/contribute` | index,follow |
| `/about` | "About Pahari Yatri — Yatri, Not Tourist" | **missing** (bug, pre-existing) | index,follow |

None of the above titles, descriptions, or OG/Twitter blocks were changed — only page bodies (hero removal) and, for `/about`, the missing canonical.

**Fix applied**: `/about` was the only page on the site building its own metadata object by hand instead of via `genPageMetadata`, and it never set `alternates.canonical`. Added `alternates: { canonical: '/about' }`. Verified live: `<link rel="canonical" href="https://pahariyatri.com/about"/>` now present.

Post-change verification (all 7 pages, via production build + `curl`):
- Canonical tag present and correct on every page — no duplicates, no accidental changes to any other page's canonical.
- `<meta name="robots">` reads `index, follow, ...` on every page — no accidental `noindex` introduced anywhere.
- Titles unchanged on all 7 pages.
- Global `WebSite` JSON-LD (from root layout) still renders correctly on every page (2 `<script type="application/ld+json">` blocks per page, unchanged by this work).
- `sitemap.xml`: zero entries for `/chapters` (index), all 39 `/chapters/[slug]` entries still present at `priority: 0.9`.
- `robots.txt`: unchanged, still `Allow: /`, no new disallow needed since `/chapters` now redirects rather than 404s.

## 8. Performance improvements

- **7 fewer forced-priority hero images** across `/library`, `/films`, `/community`, `/temples`, `/folklore`, `/contribute`, and `/about` — each was `next/image`'s `fill` + `priority` (or, for `/about`, a `priority` image behind 30%-opacity + grayscale filters, i.e. paying full decode cost for a barely-visible background). These were the LCP candidate on each page; now the LCP element is text, which paints as soon as CSS/fonts are ready — no network round-trip for a hero image required.
- **1 fewer route entirely**: `/chapters` index page (with its `AnimatePresence`, fake loading-state timer, and per-card scroll animations) no longer builds or ships JS for that route at all — confirmed absent from the production build's route list.
- **`/about` no longer needs 3 mount-time `framer-motion` animations** in its most prominent (first-paint) section.
- No new client components were introduced — `PageIntro` is a plain server component with zero JS.
- Verified in the production build (`next build`) that all 7 pages still prerender statically (`○` Static) and the `/chapters/[...slug]` dynamic route still SSGs all 39 chapters (`●`).

No before/after Lighthouse trace was captured (no CI/Lighthouse tooling wired into this repo's scripts), so the improvement is reported structurally (fewer bytes, fewer requests, fewer animations, fewer forced-priority images) rather than as a delta in a specific score — see "Remaining issues."

## 9. Accessibility fixes

- **Heading order fix on `/films`**: the page previously went `h1` → `h3` (film-card titles inside `ReelCard`/`FilmsList` render as `h3`), skipping `h2`. Added a small `h2` ("Latest films & reels") directly above `FilmsList`. Verified: `/films` now runs `h1 → h2 → h3` cleanly.
- All other modified pages already had (or now have via `PageIntro`) a single `h1` followed by content `h2`s before any `h3`s — verified per-page via the rendered HTML's heading sequence.
- `PageIntro` renders a real `<header>` with a real `<h1>`, keeping one `h1` per page (verified: exactly one `h1` on every modified route).
- No images were added, so no new alt-text surface was introduced. Removed hero images obviously removed their alt text along with them (no orphaned empty-alt landmark left behind).
- Kept the existing focus/keyboard behavior of `Button`/`Link` untouched — no new custom interactive elements were introduced by `PageIntro` (it renders no buttons or links).

## 10. Tests performed

- `npx tsc --noEmit` — clean, no errors, after a full `.next` cache clear.
- `npx eslint` on every changed file — clean.
- `npm run build` (production, Turbopack) — succeeded twice (before and after the `/films` heading fix). `/chapters` confirmed absent from the route table; `/chapters/[...slug]` confirmed still generating all 39 chapter pages.
- `next start` production server, crawled with `curl`:
  - HTTP status for all 7 modified pages: `200`.
  - `/chapters`: `301` → `/library`.
  - A sample of 6 individual `/chapters/[slug]` pages linked from `/temples`: all `200`.
  - Canonical, robots meta, and JSON-LD block count checked on all 7 pages (table above).
  - Sitemap and robots.txt content checked directly.
  - Heading sequence (`h1`...`h6`) extracted and checked for skips on all 7 pages.
  - Footer HTML checked for any residual `/chapters` link — none found.
- Visual QA via browser screenshots (desktop viewport) on `/library`, `/about`, `/temples`, `/films`, `/contribute`: confirmed clean editorial layout, immediate content visibility, no empty hero gap, no broken overlay, no layout shift artifacts.

## 11. Remaining issues (need your call, or are pre-existing/out of scope)

1. **Mobile-viewport screenshot QA could not be completed.** This sandbox's browser window is managed by a tiling window manager that ignored programmatic resize requests (screenshots kept returning the same ~1568px-wide desktop capture regardless of the requested window size). I verified the mobile/tablet path at the code level instead — `PageIntro` and every edited page reuse the exact same `sm:`/`md:`/`xl:` Tailwind breakpoints and `SectionContainer` container already used everywhere else on the site, with no fixed pixel widths — but a real narrow-viewport visual pass is worth doing in a normal browser before you ship this.
2. **Orphaned image files left on disk**: the 7 files listed in §2 are no longer referenced by any code but weren't deleted from `public/`. I left them since deleting assets is a content decision, not a code one, and they cost nothing at runtime (Next never serves an image no page requests). Delete them if you want the repo tidy, or keep them in case any of them get reused.
3. **Pre-existing heading-order quirk (not caused by this work, not fixed)**: `components/Footer.tsx` renders its 3 nav columns as `h3`. On any page whose own body has no `h2` before the footer (this was already true of `/contribute` and `/apply`, for example, before this pass), that produces an `h1 → h3` skip at the very bottom of the page. This is a sitewide Footer pattern, not specific to the 7 pages here, and fixing it means judgment-calling every page on the site, not just this batch — flagging it for a separate pass rather than changing a global component under this task's scope.
4. **No quantified before/after performance score.** This repo has no Lighthouse/CI performance tooling wired in, so the performance win above is reported structurally (removed priority images, removed a route, removed animations) rather than as a measured score delta. If you want a number, running Lighthouse against the previous commit and this one on a real network profile would give you one.
5. **`/about`'s founder-narrative copy** (first-person "I found something...", "Est. 2018") was left as-is — it's real content, not hero media, and rewriting the actual story is outside this task's brief ("preserve tone," "don't over-design"). Flagging only because its voice ("I," a single founder narrator) reads differently from the "we/Yatri" voice used elsewhere in the brand system; that's a copy decision, not a UI one.
