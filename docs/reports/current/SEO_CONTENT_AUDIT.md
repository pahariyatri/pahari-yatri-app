# SEO & Content Audit — Pahari Yatri (Phase 1)

**Date:** 2026-09-08 · **Snapshot:** `b33712f` · **Live crawl:** 2026-09-07, 89/89 sitemap URLs
**Status:** Audit only. No content was rewritten to produce this file.

Evidence for every claim below lives in `docs/audit-evidence/` (live crawl, HTTP checks, artifact checks, asset checks, reader counts) and `content-inventory.json` (field-level content ledger). Where a claim comes from a prior audit rather than a measurement taken here, it is labelled as such.

**Labels used:** `PASS` · `WARNING` · `NEEDS CONTENT` · `NEEDS RESEARCH` · `NEEDS TECHNICAL FIX`

---

## 0. Headline

The site is **technically healthy and editorially under-built**. Every one of the 89 sitemap URLs returns 200, canonicals are correct, nothing is orphaned, and typecheck/lint/build all pass. There are no crawl-blocking emergencies.

The real problems are narrower and more specific than "the site needs SEO":

1. **One hub page (`/stories`) serves an empty loading screen to crawlers** — 83 visible words, no `<h1>`, zero story links in server HTML.
2. **Eight hub pages emit `og:title` ending in `| undefined`** because a CMS singleton that the metadata helper reads has never been created.
3. **23 structured-data `image` URLs return 404** — every district, every place, the region hero, and one chapter.
4. **Chapter depth is capped by the renderer, not the writing.** 24 of 25 chapters land in a 526–657 visible-word band; the one researched chapter reaches 1,715. Writing more YAML will not change this until the renderer shows it.
5. **The strongest measured search signal on the site — `/temples`, 151 impressions, 0 clicks, position 54.7 — points at ~60 named temples the page does not contain.** That is a content and research problem, not a technical one.

---

## 1. Technical SEO

### PASS

| Check | Result | Evidence |
|---|---|---|
| HTTP status | 89/89 sitemap URLs return 200. Zero non-200, zero redirect chains in-sitemap | `crawl-summary.json` |
| Orphan pages | Zero. Every sitemap URL has at least one internal inbound link | `crawl-summary.json` |
| Canonical | Zero canonical mismatches across 89 URLs. `/books/{book}/{chapter}` correctly canonicalises to `/chapters/{slug}` | `technical-artifact-summary.json`; `app/books/[book]/[chapter]/page.tsx:35-39` |
| Title present | 89/89 | `crawl-summary.json` |
| Meta description present | 89/89 | `crawl-summary.json` |
| Sitemap integrity | 89 entries, 89 unique, no missing artifacts, matches crawl exactly | `technical-artifact-summary.json` |
| `robots.txt` | Serves correctly; disallows `/keystatic/` and `/api/keystatic/` only; declares sitemap and host | `live-robots.txt`; `app/robots.ts` |
| Build health | `tsc --noEmit`, `npm run lint`, `npm run build` all exit 0 | `technical-qa-results.json` |
| Googlebot access | `/` and chapter routes return 200 with full HTML to `Googlebot` and `OAI-SearchBot` | `technical-http-check.log` |
| Rendered images | 134/135 crawled image assets return 200 | `asset-link-check.json` |
| `llms.txt` / `llms-full.txt` | Both present and served | `live-llms.txt`, `live-llms-full.txt` |

### NEEDS TECHNICAL FIX

**T1 — `/stories` serves a loading screen to crawlers.** `HIGH`

The Stories hub — the entry point to all 20 stories, and one of only four pages with 87 inbound internal links — returns **83 visible words, zero `<h1>`, and zero story links outside the RSC script payload**. Verified live against a Googlebot user-agent: server HTML contains only "Loading Himalayan stories…".

Root cause: `app/stories/client-page.tsx` uses an **early return** — `if (isLoading) return <Loading/>` — that replaces the entire page, gated behind an artificial `setTimeout(..., 800)`. The story data is already fetched server-side and passed in as props; it is simply not rendered.

The same file's sibling, `app/chapters/client-page.tsx:63`, does this correctly: `{isLoading ? <Loading/> : ...}` gates only the list region, leaving the `<h1>` and page copy in server HTML. That page renders 711 words. The fix is to match the pattern the team already got right.

**T2 — Eight hub pages emit `og:title` ending in `| undefined`.** `HIGH (cheap)`

Affected: `/temples`, `/folklore`, `/community`, `/contribute`, `/films`, `/journal`, `/library`, `/responsible-travel`.

Root cause: `app/seo.tsx:25,28` interpolates `seo?.title` into `openGraph.title` and `siteName`. The `seo` singleton is declared at `keystatic.config.ts:654-668` with `path: "data/seo/"` — **but `data/seo/` does not exist**. `reader.singletons.seo.read()` returns `null`, so every consumer gets `undefined`.

Two of the eight affected pages (`/temples`, `/folklore`) are the site's #1 and #3 content pages by impressions. This is a broken social/AI preview on exactly the pages worth sharing.

Second-order risk in the same helper: `description: description || seo?.description` means any future page that omits a description gets **none at all**. All eight currently pass their own, so no page is affected today.

**T3 — 23 structured-data `image` URLs return 404.** `MEDIUM`

Every `TouristDestination` (13 districts), every `Place` (8), the `Place` region hero, and the `himachal-temple-etiquette` chapter reference image paths that do not exist. Five sampled live: all 404.

```
404  /static/images/regions/himachal/hero.jpg
404  /static/images/destinations/mandi.jpg
404  /static/images/places/manikaran.jpg
404  /static/images/pahari-yatri-banner.png   (VideoObject thumbnailUrl, homepage)
404  /static/images/chapters/himachal-temple-etiquette/image.jpg
```

Full list: `technical-schema-image-issues.json`. On-page `<img>` elements mostly survive via `lib/images.ts` fallback resolution — only **one** rendered image is actually broken (`himachal-temple-etiquette` hero). But JSON-LD does not go through the fallback, so structured data advertises 23 dead images to Google.

Also note these are **relative paths** in JSON-LD (`/static/...`). Absolute URLs are preferred for schema image fields.

**T4 — `/chapters` duplicates the homepage title and description verbatim.** `MEDIUM`

`app/chapters/page.tsx` exports no `metadata`, so it inherits the root layout's. Both `/` and `/chapters` serve:

> `Pahari Yatri — Learn the Himalayas Before You Walk Them`

This is the site's **only** duplicate title and **only** duplicate description across 89 URLs. `/chapters` is a genuine hub with 711 words and 87 inbound links; it deserves its own.

**T5 — Missing and duplicated `<h1>`.** `MEDIUM`

- **Zero `<h1>`:** `/stories` (consequence of T1), `/apply`, `/why-pahari-yatri`.
- **Two identical `<h1>`:** all five book pages (`lost-trails`, `monsoon`, `summer`, `winter`, `temples-traditions`) render their title twice.
- **Heading order:** book pages jump `h1 → h3` with no `h2`. `/why-pahari-yatri` starts at `h2`.

**T6 — 35 images with empty `alt`.** `PASS — false positive, no action`

The crawl flagged 35 images with `alt=""`: one per chapter page (26), 6 on `/films`, 4 on `/`. I inspected each source before changing anything, and **all 35 are correct usage**:

- **Chapter pages** (`app/chapters/[...slug]/client-page.tsx:390-397`) — a grayscale, `opacity-20`, `absolute inset-0` background behind the closing CTA. Purely decorative; `alt=""` is the right answer, and adding alt text would make screen readers announce a meaningless image.
- **`/films` and homepage reels** (`components/ReelCard.tsx:163`, `components/InstagramReelCard.tsx:59`) — thumbnails nested inside a `<button>` that already carries a descriptive `aria-label` (`Play ${film.title}` / `Play reel: ${caption}`). Alt text here would duplicate the announcement.

The audit tool's own note said as much — *"Empty alt can be appropriate for decorative images; review context."* **Nothing was changed.** Recording this so a future pass doesn't "fix" working accessibility markup.

### WARNING

**T7 — `middleware.ts` blocks `ChatGPT-User`, contradicting its own stated policy.** `WARNING — needs a founder decision, not a silent fix`

`middleware.ts:5-13` carries this comment:

> *"AI/AEO crawlers (GPTBot, Google-Extended, anthropic-ai) and FacebookBot … are intentionally NOT blocked here — they're allowed in robots.ts and blocking them at the middleware layer contradicted that."*

…and then lists `ChatGPT-User` in `BLOCKED_USER_AGENTS`. Confirmed live: `OAI-SearchBot` → 200, `ChatGPT-User` → 403.

`ChatGPT-User` is the agent OpenAI sends **when a user explicitly asks ChatGPT to open a Pahari Yatri link**. Blocking it means a person who pastes a chapter URL into ChatGPT gets "access denied" instead of the chapter. That is a different thing from blocking a bulk training scraper, and it works against the Phase 10 AI-visibility goal.

I am not changing this unilaterally — bot policy is a founder call. But the code and its comment currently disagree, and one of them should win.

**T8 — Headless browser QA could not be performed against production.** `WARNING — limitation, not a defect`

`SUSPICIOUS_PATTERNS` in `middleware.ts:16-21` blocks `HeadlessChrome`. Every route in the previous session's browser QA returned **403 on both desktop and mobile**; all 16 screenshots in `docs/audit-evidence/` are captures of the "Access Denied" JSON, not of the site. `browser-qa.json` should not be read as rendering evidence.

This is the bot protection working as designed. It does mean Phase 13's "verify production in a real browser, desktop and mobile" cannot be satisfied by automation from this environment without a founder-approved allowance.

**T9 — 20 of 30 external links return 403 to `HEAD`.** `PASS in practice`

All are `twitter.com/intent/tweet` share links. Twitter rejects `HEAD` from non-browser clients; this is not evidence of breakage. No action.

---

## 2. Content architecture

### PASS

| Check | Result |
|---|---|
| Reader integrity | Source file count equals reader count for all 7 collections (regions 1, destinations 13, places 8, books 5, chapters 25, stories 20, films 3) — `technical-reader-check.log` |
| Required fields | All 75 records have non-empty required scalar/relationship/image fields |
| Excerpt lengths | All 50 book/chapter/story excerpts fall within configured ranges |
| Relationship integrity | Zero dangling relationships. All 20 story→chapter links resolve; 19/20 resolve onward to a book |
| Duplicate content | Zero exact body duplicates across all collections |
| Banned language | One `package` match sitewide (`bhaba-moon-road:16`) — used to *reject* a package tour, not sell one |

### WARNING

**A1 — Two classification systems coexist, and the CMS calls the newer one "legacy".**

`region → destination → place` and `Book → Chapter → Story` both exist and both work. But `keystatic.config.ts:9-12` labels books/chapters **"Journeys (Legacy)"**, while `docs/content-model-migration-2026-08.md` calls that same hierarchy the future model. The CMS UI is telling editors the opposite of the strategy.

**A2 — Hierarchy has two runtime authorities that must be changed together.**

Story→book derives through `chapter.parentBook` (`lib/keystatic/stories.ts:29-46`). But chapter display-parent, next-chapter, and nested-route access all derive from `book.relatedChapters` (`lib/keystatic/chapterView.ts:157-183`; `app/books/[book]/[chapter]/page.tsx:25-30`).

There is **no data mismatch today**. The risk is prospective: the migration doc recommends updating `parentBook` alone, which would leave navigation and display pointing at the old book. Any approved book restructuring must update both and test both URL families.

**A3 — New book fields are stored but never rendered.**

`Temples & Traditions` is the only book with `thesis`, `bookType`, `priority`, `seoTitle`, `metaDescription`, `region` and `description` filled in. `app/books/[...slug]/page.tsx:19-27,41-48` reads none of them — it uses title/excerpt/invitation only. `lib/keystatic/getLibraryData.ts:13-23` also drops `bookType` and `priority`.

**Consequence:** the fifth book was authored as a "primary" book but is indistinguishable from a seasonal one in navigation, and its hand-written `metaDescription` and `seoTitle` are not what ships. `/books/temples-traditions` serves 216 visible words with 3 inbound links — the weakest book page on the site despite being the flagship.

**A4 — `pin-bhaba-pass` has no parent book.**

Deliberate, per `docs/content-model-migration-2026-08.md:107-114` (awaiting a High Passes decision). Its story `bhaba-moon-road` is the only story with no derived book. Not a defect; an open decision.

**A5 — District taxonomy has three internal contradictions.** *(Also NEEDS RESEARCH — see §4.)*

| Chapter | `district` field | Contradicting label | Source |
|---|---|---|---|
| `echoing-caves` | `lahaul-spiti` (Spiti/Tabo/Dhankar) | Folklore card says **Sirmaur** | `data/chapters/echoing-caves.yaml:2-10`; `app/folklore/page.tsx:45-49` |
| `baga-sarahan-bashleo-pass` | `kullu` | Temple + folklore cards say **Shimla**, framed as "Bhima Kali line" | `data/chapters/baga-sarahan-bashleo-pass.yaml:2`; `app/temples/page.tsx:53-59` |
| `forgotten-shrine` | `kinnaur` | Route text describes Jeori → Sarahan/Bhimakali | `data/chapters/forgotten-shrine.yaml:2,34-39` |

The Baga Sarahan / Sarahan (Bhimakali) conflation is the one to resolve first — they are different places and the temple card currently merges them.

**A6 — `manali` is modeled as a district but is not one.**

`Manali` sits in the `destinations` collection alongside twelve actual districts, and `solstice-snow` points at it while `meadow-walks`, `sunlit-passes`, Sajla and Naggar point at `kullu`. This is why the Manali hub shows few linked chapters despite Manali appearing throughout the prose. Destination/city/district roles need defining before more region pages are built.

### NEEDS CONTENT

**A7 — Three districts have zero content; the region layer is nearly unlinked.**

| Hub | Chapters | Places | Stories | Visible words | Inbound links |
|---|---:|---:|---:|---:|---:|
| `bilaspur` | 0 | 0 | 0 | 163 | 2 |
| `hamirpur` | 0 | 0 | 0 | 164 | 2 |
| `solan` | 0 | 0 | 0 | 165 | 2 |
| `una` | 0 | 1 | 0 | 166 | 2 |
| `kangra` | 0 | 2 | 0 | 169 | 2 |
| `kullu` | 10 | 4 | 10 | 409 | 2 |

Two observations, and they point in different directions:

- **Every district page has exactly 2 inbound links** and every place page exactly 3, versus 87 for the static hubs. The `/himachal` tree is structurally isolated from the site's main navigation. That is a linking problem (Phase 7), fixable without writing a word.
- **Five districts have no content to link to at all.** Those pages are titled "Travel Guide" and deliver 163–169 words. That is a promise the page does not keep.

**Recommendation: do not write five district guides to fill the table.** Bilaspur, Hamirpur, Solan and Una are not in the brand's demonstrated territory and there is no measured demand for them. Either link the districts that *do* have content properly, or `noindex` the empty ones until there is something real to say. Creating five thin district guides for coverage is exactly the "hundreds of SEO pages" outcome this brief forbids.

**A8 — Place pages cannot hold a guide in the current schema.**

`keystatic.config.ts:62-87` gives places only title, region, district, description, image, coordinates. Rendering (`app/[...slug]/page.tsx:431-465`) is description plus a coordinate badge. All 8 place pages land at 107–122 visible words.

This is a **schema decision, not a writing task**. Padding a 20–35 word `description` field will not produce a place guide.

**A9 — Chapter depth is capped by the renderer.**

24 of 25 chapters render **526–657 visible words**. The exception, `himachal-temple-etiquette`, renders 1,715. That band is too tight to be a writing coincidence.

Two renderer-level causes, both already documented in the codebase:
- `app/chapters/[...slug]/client-page.tsx:18-23,115-135` splits narrative into plain paragraphs — **markdown headings become plain paragraph text**, so no chapter can have visible sub-structure.
- The `overview` field is deliberately routed to JSON-LD instead of a visible section (`lib/keystatic/chapterView.ts:38-46`).

That second one has a measurable cost. `SEO_OPPORTUNITY_MAP.md:41` flags `kheerganga history` (position 11.0) as a query the `overview` field already answers — in markup a human never sees.

**Implication for Phase 5: writing longer chapters will not increase page depth until the renderer is fixed.** Fix the render first, then expand content where research supports it.

**A10 — Films are placeholder records.**

All three use `EXAMPLE001/002/003` video URLs (`data/films/*.yaml:3`) with captions instructing replacement. `/films` ranks at position 4.0 with 22 impressions and 0 clicks. It is indexed, well-positioned, and shipping placeholders.

---

## 3. Trust, authorship and E-E-A-T

### NEEDS RESEARCH — this is the site's real bottleneck

**E1 — No chapter or story is verified. `verificationStatus` is not a publication gate.** `P0`

24 chapters default to `unverified`, 1 is `needs-local-source`, all 20 stories are `unverified`. No record carries `verified` or `published` status. `data/chapters/himachal-temple-etiquette.yaml:17-36` states outright that status does not block publication — file existence alone is enough for route generation.

**Do not respond by filtering unverified content out of the sitemap.** That would deindex the entire library. The correct fix is to separate *draft/publication state* from *claim-verification state* as two independent fields, with a founder-approved triage plan.

**E2 — Zero named individual authors across 20 stories.** `P0`

Three stories carry a byline; all three say "Pahari Yatri Editorial". Seventeen have a detailed anonymous `voice` and no author at all. `docs/content-psychology-map.md:16,48-53` confirms these narrators are **designed archetypes** intended to be replaced by real contributions.

The brief's Phase 6 asks for real experience signals. The honest position today: this inventory **cannot** be presented as 20 documented first-hand testimonies, and the fix is not to invent 20 names. The founder must classify each story as permissioned contribution / founder experience / editorial reflection / composite, and the site should disclose which.

Two specific claims need resolving before they can stand:
- `data/stories/why-locals-avoid-manali-in-peak-season.mdx:26` — *"for those of us who live here"*, under an editorial byline.
- `data/stories/tirthan-the-slow-valley-reflections.mdx:4-5` — promises *"A local's view"*.

**E3 — Cultural claims requiring a source before they can stay as written.**

Full register in `docs/audit-evidence/content-audit.md` §4. The highest-risk items:

| Claim | Location | Label |
|---|---|---|
| Kamrunag bank "never been robbed"; taking offerings "never ends well" | `kamrunag-the-lake-of-oaths.yaml:70,82` | **Unsafe as absolute.** Curse-framing plus a universal negative |
| "Every roof they built for her fell down" | `devidarh-shikari-devi.yaml:66` | Needs local source; stated as fact in narrative |
| Parashar island: unknown depth, divers gave up, asserted physical mechanism | `parashar-floating-island.mdx:17,23`; `app/temples/page.tsx:44-49` | Needs source; mixes observation, belief and pseudo-explanation |
| Devta Shikru / nine generations of grazing, attributed to a named shepherd | `chandernahan-lake-trek.yaml:89` | Needs the original interview record, date and consent |
| Tirthan "never been dammed" + fishing/permit rules | `river-sutra.yaml:20,50` | Needs authoritative river/administration source |
| Kheerganga Kartikeya origin + current pool/camping rules | `kheerganga-buni-buni-pass.yaml:19,52` | Legend and current site rules conflated |
| Six temple cards + six folklore cards | `app/temples/page.tsx:15-70`; `app/folklore/page.tsx:15-58` | No source, author or reviewer field exists on any of them |

**E4 — Research is complete for exactly one topic.**

`docs/audit-evidence/research-record.md` is a full Kamrunag dossier: six independent source groups (Mandi District Administration, The Tribune, Times of India, a peer-reviewed NTFP journal, HT/IANS, a named botanist's field account), with every fact classified VERIFIED FACT / LOCAL TRADITION / ORAL HISTORY / EDITORIAL INTERPRETATION / UNVERIFIED CLAIM, and seven claims explicitly held.

It also surfaced an **unresolved conflict that must not be silently averaged**: the district page gives 3,334 m and ~6 km from Rohanda; a named botanist's GPS reading gives ~2,900 m and 5.5 km; TOI reports 8 km; HT reports 5 km. Different endpoints, different methods. The chapter must cite one baseline with attribution, not split the difference.

**24 other chapters have no equivalent dossier.** Per the brief's own rule — *if research is insufficient, stop and report it* — those chapters cannot be substantially rewritten yet.

**E5 — Photography is thematically-matched stock, and documented as such.**

`docs/pahari-yatri-status-and-roadmap.md:41-55` states plainly that chapter and cover images are stock, not photographs of the named locations. No image credit, license or photographer field exists in any schema. These must not be presented as field evidence.

---

## 4. Search demand (Phase 2 — see also §5)

### WARNING — no live GSC access from this environment

Google Search Console could not be opened in this session: the browser automation MCP is disconnected, and no GSC export exists anywhere in the repository (`historical-gsc-export-discovery.json` — recursive filename search plus a git tracked-file query both returned nothing).

**What I am using instead:** the real GSC export pulled on **2026-09-05** and preserved in `SEO_OPPORTUNITY_MAP.md`, cross-checked against `PAHARI_YATRI_FINAL_SEO_AUDIT.md`. That is measured data, three days old at time of writing. No keyword in this audit is invented.

The founder's stated baseline (24 clicks / 1.15K impressions / 2.1% CTR / position 16.9 / 37 indexed / 90 not indexed) is consistent with that export (23–24 clicks / 1.1K impressions / 2.1% CTR / position 17).

Full demand analysis and the indexing classification (buckets A–F) are in **`CONTENT_PRIORITY_MATRIX.md`**.

---

## 5. Internal linking

### PASS
Zero orphans. Every URL has an inbound internal link. All 20 story→chapter relationships resolve.

### NEEDS CONTENT / WARNING

**L1 — Link equity is extremely uneven.**

| Page class | Inbound internal links |
|---|---:|
| Static hubs (`/temples`, `/folklore`, `/about`, …) | 87 |
| Chapters | 3–11 |
| Stories | 3–4 |
| Places | 3 |
| **Districts** | **2** |
| **`/books/temples-traditions`** (flagship book) | **3** |
| **`/chapters/himachal-temple-etiquette`** (deepest page) | **2** |

The two best pages on the site — the flagship book and the only fully-researched chapter — have the weakest internal linking of any content page. The 87-link tier is just the global header/footer.

**L2 — Sideways linking is barely used.**

Only 7 of 25 chapters set `relatedChapters` at all; 4 meet the 2–4 target; **18 have none**. No chapter links *to* `himachal-temple-etiquette`, though etiquette links out to four.

A **complete literal-link scan of every MDX body found zero markdown links** in any story or destination body. All cross-linking is derived from relationship fields, so a chapter that doesn't set them is a dead end.

**L3 — The clusters the brief asks for are absent as links, though the content exists.**

Temple ↔ village ↔ folklore ↔ trek ↔ lake ↔ season ↔ story is a real and achievable graph here — Kamrunag alone connects a lake, a temple, two chapters, a district and a story. Almost none of it is wired.

**This is the single highest-value, lowest-risk, zero-research improvement available.** It needs no new content and no new pages.

---

## 6. AI visibility (Phase 10)

### PASS
`llms.txt` and `llms-full.txt` both present and served. `robots.ts:12-20` explicitly allows eight AI crawlers. `OAI-SearchBot` receives full HTML (200). Canonicals are clean.

### WARNING
- **`ChatGPT-User` is 403'd** (T7) — user-initiated ChatGPT fetches of Pahari Yatri links fail.
- **`og:title` reads "… | undefined"** on the eight hub pages most likely to be cited (T2).
- **Chapter `overview` — the most quotable, answer-first text on each page — exists only in JSON-LD** (A9). An AI summariser reading rendered text never sees it.
- **No page carries a named human author** (E2), which is the signal that most distinguishes a knowledge source from generated travel copy.

---

## 7. Brand safety

### WARNING

**B1 — `/why-pahari-yatri` reads like a tour operator.** Rendered headings: *"Hidden Trails"*, *"Intimate Groups"*, *"Selective Guest Policy"*, *"Not Just Treks. Transformations."*

"Hidden Trails" sits directly against the banned "hidden gem / secret trail" family, and "Selective Guest Policy" is package-selling language on a page whose job is explaining the brand. The page also has no `<h1>` (T5). Rewriting it is a copy decision for the founder, not something to change unilaterally.

**B2 — Legacy commercial remnants.**
- `data/data.js:3-23` retains package/customize-trip banner links and six old category objects. Inspected as source only — no import/render trace was performed, so this is **not** a claim that it ships.
- `data/chapters/parashar-lake-trek.yaml:39` — `gettingThere` promises pickup after application acceptance. Stored commercial copy; the field is not in the visible chapter body today.

---

## 8. Summary by label

| Label | Count | Items |
|---|---:|---|
| `PASS` | 17 | Status codes, canonicals, sitemap, robots, build, reader integrity, required fields, relationships, zero orphans, zero duplicates, banned-language sweep, llms.txt, AI crawler allowances |
| `NEEDS TECHNICAL FIX` | 5 | T1 `/stories` loading screen · T2 `og:title undefined` · T3 23 schema image 404s · T4 `/chapters` duplicate metadata · T5 missing/duplicate H1 — **all five implemented and verified, see §10** |
| `WARNING` | 11 | T7 ChatGPT-User · T8 browser QA blocked · A1 legacy label · A2 dual authority · A3 unrendered book fields · A4 unplaced chapter · A5 district contradictions · A6 Manali taxonomy · B1 off-brand page · B2 legacy commercial · L1/L2 link equity |
| `NEEDS CONTENT` | 5 | A7 empty districts · A8 place schema · A9 renderer-capped chapters · A10 placeholder films · L3 unwired clusters |
| `NEEDS RESEARCH` | 5 | E1 verification gate · E2 authorship · E3 cultural claims · E4 24 chapters undocumented · E5 image provenance |

---

## 9. What I recommend doing first

Ordered by value ÷ risk, not by phase number.

1. **T2, T4** — create the `data/seo/` singleton and give `/chapters` its own metadata. Two small changes; fixes broken OG on the site's best pages. Zero content risk.
2. **T1** — make `/stories` render like `/chapters`. Restores an `<h1>` and 20 links to server HTML.
3. **T3, T5, T6** — schema image paths, H1 duplication, alt text.
4. **A9 (renderer)** — surface `overview` and render markdown headings in chapters. This unblocks depth for all 25 chapters at once and directly serves the `kheerganga history` query. **Prepare and propose; do not ship without founder review** — it changes every chapter's visible layout.
5. **L1/L2/L3** — wire the clusters. No research required, no new pages.
6. **`/temples`** — the largest measured opportunity, and strictly research-gated. See `CONTENT_PRIORITY_MATRIX.md`.
7. **E1/E2** — founder decisions on verification state and story authorship. Everything in Phase 6 is blocked behind these.

**Not recommended:** creating district guides for Bilaspur / Hamirpur / Solan / Una, launching new books, or rewriting chapters that have no research dossier.

---

## 10. Implementation status (Phase 12)

Items 1–3 above were implemented and verified against a production build. **No content, no URL, no sitemap entry and no canonical was changed.** Sitemap remains 89 URLs.

| Fix | Files | Verified in build |
|---|---|---|
| T1 `/stories` | `app/stories/client-page.tsx` | **83 → 447** visible words · `<h1>` restored · **0 → 20** story links in server HTML |
| T2 `og:title \| undefined` | `app/seo.tsx`, `data/seo/index.yaml` (new) | `/temples` → `Temples & Traditions of the Himalayas \| Pahari Yatri`; all 8 hub pages clean |
| T3 schema image 404s | `lib/schema.ts` | All schema `image` / `thumbnailUrl` values now absolute and resolving (`mountains-bg.jpg`, live 200) |
| T4 `/chapters` duplicate metadata | `app/chapters/page.tsx` | Own title + description + canonical; no duplicate remains among the 89 |
| T5 H1 | `app/books/[...slug]/client-page.tsx`, `app/apply/page.tsx`, `app/why-pahari-yatri/page.tsx` | **0 pages with multiple `<h1>`**; every sitemap URL now has exactly one |

QA gate: `tsc --noEmit` 0 · `eslint` 0 errors (1 pre-existing warning, untouched) · `npm run build` 0.

**Two caveats worth stating plainly:**

1. **T3 makes structured data honest, not good.** All 23 schema images now resolve — to the same generic fallback. Schema currently advertises one stock mountain photo as the image for every district and place. That is strictly better than a 404, but the real fix is real photographs with credit and license (E5).
2. **`/stories` and `/chapters` still inherit the root `og:title`.** Both define their own `metadata` export rather than using `genPageMetadata`, and neither sets `openGraph`. No longer "undefined", but not page-specific either. Low priority; noted rather than fixed, since it needs an OG copy decision.
