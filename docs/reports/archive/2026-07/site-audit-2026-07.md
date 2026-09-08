# Pahari Yatri — Full Site Audit (5 July 2026)

Scope: entire codebase on branch `claude/brand-ecosystem-revamp`, including the uncommitted Films & Reels work. Typecheck passes (`tsc --noEmit` clean). Stack: Next.js 16.1.1, React 19, Tailwind 3, Keystatic (local), Radix/shadcn, framer-motion.

---

## 1. Current inventory

**Routes (22 public):** `/` · `/library` · `/books` + `/books/[slug]` · `/chapters` + `/chapters/[slug]` · `/stories` + `/stories/[slug]` · `/films` (new, uncommitted) · `/temples` · `/folklore` · `/journal` · `/community` · `/contribute` · `/responsible-travel` · `/about` · `/contact` · `/apply` · `/why-pahari-yatri` · `/scan-me` · region catch-all `/[region]`, `/[region]/travel-guide/[slug]`, `/[region]/places/[slug]`, `/[region]/stories/[slug]` · `/admin` (Keystatic).

**Content:** 4 books, 25 chapters, 20 stories (mixed `.mdx` files and folder-based entries), 3 films (seed), 1 region (himachal), 13 destination folders, places data. Temples / Folklore / Journal are still hard-coded page content, not CMS collections.

**APIs:** `/api/discord` (apply + contact + story webhooks, env-based URL — good), `/api/og`, `/api/keystatic`.

---

## 2. Critical issues (fix before the next feature push)

### 2.1 Middleware blocks the AI crawlers robots.txt invites
`middleware.ts` returns **403** to `anthropic-ai`, `Google-Extended`, `GPTBot`, `CCBot`, `FacebookBot`, etc. — while `app/robots.ts` explicitly *allows* `anthropic-ai`, `ClaudeBot`, `Googlebot-Extended` "for AEO". The middleware wins: those crawlers get 403s and the whole AEO strategy (and the FAQ/schema work) is dead on arrival. Also `FacebookBot` being blocked likely breaks WhatsApp/Facebook link previews — a real problem for a brand whose traffic plan is Instagram/WhatsApp-first.
**Fix:** pick one policy. Recommended: drop the UA blocklist entirely (or keep only scraper tools like Selenium/Puppeteer patterns) and let robots.txt be the single source of truth.

### 2.2 Sitemap contradicts the site's real URLs
- Story cards link to **`/stories/{slug}`**, but the sitemap publishes **`/{region}/stories/{slug}`**. Two live routes for the same content = duplicate-content split; Google indexes the wrong one or neither well.
- The sitemap has **no chapter detail URLs, no book detail URLs, no canonical story URLs, and no `/chapters` listing** — the deepest, most SEO-valuable pages on the site are invisible to it.
- `lastModified: new Date()` on every URL means every page claims to change daily; crawlers learn to distrust it. Use real dates (frontmatter `dateAdded` / git mtime).
**Fix:** one canonical URL per content type, sitemap generated from the same link helpers the cards use, real lastModified. Add `<link rel="canonical">` / redirects from the losing route.

### 2.3 Structured data misrepresents the brand (and violates guidelines)
In `app/layout.tsx`, injected on **every page**:
- `TouristInformationCenter` with fabricated `openingHours: "Mo-Su 09:00-18:00"`, `priceRange: "₹₹"`, a Manali postal address and geo pin. For a brand whose whole story is "not a business selling trips," this is both off-brand and risky (fake local-business data is a manual-action magnet).
- Sitewide `FAQPage` JSON-LD with no visible FAQ on the page — against Google's guidance (FAQ markup must match on-page content).
- A hardcoded `BreadcrumbList` (Home → Books → Stories) rendered on every page regardless of where you are.
- `WebSite.datePublished/dateModified` = build timestamp.
- `sameAs` links to Facebook/Twitter accounts that may not exist.
**Fix:** keep `Organization` + `WebSite` sitewide; move Breadcrumb/Article/FAQ JSON-LD to per-page components fed by real data; delete `TouristInformationCenter` or replace with `Organization` only.

### 2.4 Missing referenced assets
- `siteMetadata.socialBanner` → `/static/images/twitter-card.png` **does not exist** (falls back to `/api/og` in layout, but siteMetadata is used elsewhere).
- Verify `/static/favicons/*` and `logo.png` dimensions claimed in JSON-LD (600×60).

---

## 3. Performance

Public folder is **38 MB**; the heavy offenders ship to real users:

| Asset | Size | Note |
|---|---|---|
| `static/videos/banners/media.mp4` | 8.1 MB | homepage hero video |
| `static/image.jpg` | 3.3 MB | orphan? verify usage, likely junk |
| `static/videos/hidden.mp4` | 3.1 MB | |
| `static/images/hidden-trails-poster.jpg` | 2.8 MB | poster should be ~100 KB |
| `static/images/chapters/kam/image.png` | 2.1 MB | PNG photo — convert to JPG/WebP |
| `static/images/mountains-bg.jpg` | 2.0 MB | |
| `static/images/placeholder.jpg` | 1.9 MB | the universal fallback — loads often! |
| `static/images/pahari-yatri-banner copy.png` | 1.9 MB | filename says "copy" — junk |
| `static/images/journey-banner.jpg` | 1.6 MB | |
| `static/images/logo.png` | 576 KB | a logo should be <30 KB |

Actions: delete orphans, re-encode videos (H.264 CRF 28, ~1–2 MB, or move to a CDN/YouTube), compress every hero to <300 KB WebP, shrink logo and placeholder. This alone is probably the biggest UX win available.

Also:
- **Homepage Instagram/YouTube iframes** (`FilmsSection` → `ReelCard`): `loading="lazy"` is set (good), but each Instagram embed still pulls ~1 MB+ of third-party JS when scrolled into view, on the homepage. Recommend a **facade**: show a thumbnail + play icon, inject the iframe only on click. Keep real embeds on `/films` if you want.
- Google Fonts ×3 (Space Grotesk, Inter, Playfair) — fine, but check actual usage; drop any unused family.

---

## 4. Dead code & hygiene

- `app/blog/` — leftover: `client-page.tsx` plus an **empty** `[...slug]` directory, no `page.tsx`. Delete.
- `npm run lint` is **broken**: Next 16 removed `next lint` (errors with "Invalid project directory … /lint"). Combined with `eslint.ignoreDuringBuilds: true`, nothing is ever linted. Migrate to the ESLint CLI (`eslint .`) and re-enable in builds.
- `devDependencies` drift: `eslint-config-next@15` / `@next/bundle-analyzer@15` against `next@16`.
- `data/stories/` mixes two formats: flat `.mdx` files and folder entries (`index.yaml` + `content.mdx`) — pick one so the reader/schema stays predictable.
- Two story detail systems exist (`app/stories/[...slug]` and region catch-all `stories` branch) — consolidate (see 2.2).
- `pliny` is a dependency; verify what's actually used (siteMetadata type, Analytics?) — it's a heavy transitive tree if only used for a type.

---

## 5. Content & product gaps (unchanged from roadmap doc, still true)

1. **Chapters are shells** — schema has distance/altitude/season/how-to-reach fields; almost all empty. 6–8 flagship chapters filled in would transform the depth of the site.
2. **Temples / Folklore / Journal are hard-coded** — no CMS collections, no detail pages, no cross-links, no SEO surface (a temple like Kamrunag could rank on its own).
3. **The region layer is orphaned**: 13 destinations + places under `/himachal/...` exist and are in the sitemap, but **nothing in the nav, library, or footer links to them**. Either surface them (a "Regions" shelf in the Library) or noindex/remove until ready — right now they're crawlable orphan pages.
4. **Contribute** posts to Discord with no moderation → publish pipeline.
5. **Newsletter** (buttondown) stubbed in siteMetadata, never wired to a form.
6. **Films** (new): no per-film sitemap entries or `VideoObject` schema; consider adding `publishedAt` + `chapter` relationship fields to the collection now, before content grows.

---

## 6. Trust, security, a11y

- **No rate limiting / spam protection** on `/api/discord` — the contribute/contact/apply forms can be scripted to flood your Discord. Add a honeypot field + simple in-memory or KV rate limit + payload size cap.
- Discord webhook correctly server-side via `DISCORD_WEBHOOK_URL` (not `NEXT_PUBLIC_`) ✅.
- No `Content-Security-Policy` / security headers beyond caching ones; add CSP (must allow instagram.com/youtube.com frames), `X-Frame-Options`, `Referrer-Policy`.
- A11y not yet audited in depth: run a keyboard-nav + contrast pass; check `prefers-reduced-motion` for framer-motion sections and iframes; ensure ReelCard iframes have `title` attributes.

---

## 7. Recommended plan

### Phase 1 — Repair the foundations (1–2 days of work)
1. Fix middleware vs robots contradiction (2.1).
2. Canonical URL decision + sitemap rewrite with chapters/books/stories/films detail URLs and real dates (2.2).
3. JSON-LD cleanup: remove TouristInformationCenter + sitewide FAQ/Breadcrumb; add per-page Article/Breadcrumb (2.3).
4. Asset diet: delete junk, compress videos/images/logo/placeholder (3).
5. Delete `app/blog/`, fix lint script, align dev deps (4).
6. Rate-limit + honeypot on `/api/discord` (6).

### Phase 2 — Make the archive real
7. Keystatic collections for **Temples, Folklore, Journal** + `[slug]` detail pages; migrate the seeded content; cross-link chapters ↔ temples ↔ folklore.
8. Decide the fate of the region/destination layer: surface it as a Library shelf or park it behind noindex.
9. Newsletter capture form (buttondown) in Footer + FinalCTA.

### Phase 3 — New features (the fun ones)
10. **Site search** — a small client-side index (title/excerpt/region/season) over books/chapters/stories/temples; the library is now big enough to need it.
11. **Season & region filters** on `/chapters` and `/stories`.
12. **Map view** — chapters and temples on an interactive Himachal map (Leaflet + OSM, static-friendly).
13. **Contribute → publish pipeline** — Keystatic GitHub storage so submissions become draft entries a human approves.
14. **Per-page dynamic OG images** — extend `/api/og` to take title/kicker params; wire into `genPageMetadata`.
15. **Films growth**: `VideoObject` schema per film, facade embeds on homepage, film ↔ chapter links ("watch, then read").
16. **Umami events** on the CTAs that matter (Open the Library, Contribute start/submit, newsletter join).

---

*Companion docs: `docs/pahari-yatri-status-and-roadmap.md` (brand/social), `docs/brand-website-plan.md` (content models).*
