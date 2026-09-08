# Book Proposals — Pahari Yatri (Phase 8)

**Date:** 2026-09-08 · **Companion to:** `SEO_CONTENT_AUDIT.md`, `CONTENT_PRIORITY_MATRIX.md`
**Status:** Proposal only. No book, chapter or relationship was modified.

---

## 0. Recommendation up front

**Do not create a new book. There are five, not four — and the fifth is the temple book the brief is asking for.**

The brief lists four books (Lost Trails, Monsoon, Summer, Winter) and asks whether a Temple/Devta collection — *"The Book of Sacred Mountains"* — is justified. That collection **already exists and already shipped**: `Temples & Traditions`, committed in `b33712f`, `data/books/temples-traditions.yaml`.

It is the best-authored book on the site. It is the only book with `thesis`, `bookType: primary`, `priority: p1`, `region`, `description`, `seoTitle`, `metaDescription` and `cta` filled in. Its description even carries its own verification caveat.

It has **one chapter**, **216 visible words**, and **3 inbound internal links** — the weakest book page on the site.

Creating "The Book of Sacred Mountains" now would produce two competing temple books. **The work is to fill the book that exists, and to fix the three structural reasons it currently cannot be filled.**

---

## 1. Current shelf

| Book | Type | Chapters | Visible words | Inbound links | Authored metadata |
|---|---|---:|---:|---:|---|
| Lost Trails | seasonal (schema default) | 7 | 306 | 9 | title/excerpt/invitation only |
| Monsoon | seasonal (default) | 7 | 321 | 9 | title/excerpt/invitation only |
| Summer | seasonal (default) | 6 | 317 | 8 | title/excerpt/invitation only |
| Winter | seasonal (default) | 3 | 216 | 5 | title/excerpt/invitation only |
| **Temples & Traditions** | **primary** | **1** | **216** | **3** | **complete** |

One chapter, `pin-bhaba-pass`, has no `parentBook` at all — deliberately held for a future High Passes decision (`docs/content-model-migration-2026-08.md:107-114`). Its story `bhaba-moon-road` is the only story with no derived book.

Also note: **"Lost Trails" is not a season.** The four-book shelf is already three seasons plus a thematic collection, so the "seasonal books vs primary books" split is looser than the migration docs assume.

---

## 2. Three blockers that must be fixed before any book decision

These are the reason this document does not simply say "move ten chapters into Temples & Traditions."

### Blocker 1 — Book metadata is authored but never rendered

`app/books/[...slug]/page.tsx:19-27,41-48` reads only `title`, `excerpt` and `invitation`. It never reads `thesis`, `description`, `seoTitle`, `metaDescription`, `bookType` or `priority`. `lib/keystatic/getLibraryData.ts:13-23` also drops `bookType` and `priority`.

**Consequence:** every field that makes Temples & Traditions a *primary* book is invisible. Its hand-written `seoTitle` and `metaDescription` are not what ships. In navigation it is indistinguishable from a seasonal shelf.

**Filling this book with chapters while its metadata stays unrendered would not fix its 216 words or its 3 inbound links.**

### Blocker 2 — Dual book membership silently breaks navigation

The schema *appears* to allow a chapter in two books: `book.relatedChapters` is an array, and `chapter.parentBook` is a single relationship. But `lib/keystatic/chapterView.ts:163-165` resolves the displayed parent with:

```js
const owner = books.find((b) => (b.entry.relatedChapters || []).includes(slug));
```

`books.all()` returns alphabetical order by slug: `lost-trails, monsoon, summer, temples-traditions, winter`.

**So if `kamrunag-the-lake-of-oaths` were added to `temples-traditions.relatedChapters` while staying in `winter.relatedChapters`, `temples-traditions` sorts before `winter` — and Kamrunag's displayed parent book would silently flip from Winter to Temples & Traditions.** Its "next chapter" link would come from the temples list too. Nobody would have chosen this; alphabetical order would have.

There is a second effect: `app/books/[book]/[chapter]/page.tsx:25-30` also gates route access on `book.relatedChapters`, so dual membership makes **both** nested URLs valid — adding more canonical-duplicate URLs to a set that already accounts for much of the non-indexed count.

**Dual membership is not currently safe.** Making a chapter belong to both a season and a theme requires an explicit ownership rule, not an extra array entry.

### Blocker 3 — Filling the temple book empties Lost Trails

Ten existing chapters are plausible temple/devta material:

| Chapter | Current book | `trackType` | District | Sacred anchor |
|---|---|---|---|---|
| `himachal-temple-etiquette` | Temples & Traditions | cultural | — | The book's spine |
| `kamrunag-the-lake-of-oaths` | **Winter** | lake | mandi | Dev Kamrunag temple + sacred lake |
| `saroa-to-kamrunag` | **Summer** | lake | mandi | Second approach to the same site |
| `devidarh-shikari-devi` | **Lost Trails** | temple | mandi | Shikari Devi |
| `churdhar-sacred-ascent` | **Lost Trails** | temple | sirmour | Churdhar / Shirgul |
| `parashar-lake-trek` | **Monsoon** | lake | mandi | Parashar rishi temple |
| `forgotten-shrine` | **Lost Trails** | cultural | kinnaur | Unnamed shrine (identity unresolved) |
| `baga-sarahan-bashleo-pass` | **Lost Trails** | pass | kullu | Temple line (district contested) |
| `rain-prayer` | **Monsoon** | cultural | kullu | Temple rain ritual |
| `kheerganga-buni-buni-pass` | **Monsoon** | pass | kullu | Kartikeya origin story |

Move all ten under exclusive ownership and the shelf becomes:

| Book | Before | After |
|---|---:|---:|
| Lost Trails | 7 | **2** |
| Monsoon | 7 | **4** |
| Summer | 6 | 5 |
| Winter | 3 | **2** |
| Temples & Traditions | 1 | **11** |

**Lost Trails is effectively dissolved.** That is not a side effect to discover mid-migration — it is the actual decision, and it belongs to the founder.

Note also that four of these ten carry **unresolved research or taxonomy problems** (`SEO_CONTENT_AUDIT.md` E3, A5): the Kamrunag absolutes, the Shikari Devi roof claim, the Parashar island mechanism, the Baga Sarahan / Sarahan-Bhimakali conflation, and the Forgotten Shrine district contradiction. Promoting them into a flagship temple book would concentrate the site's least-verified claims into its most authoritative-looking container.

---

## 3. Proposal 1 — Fill `Temples & Traditions` (recommended)

**Purpose.** Give Himachal's devta culture a single editorial home, and give the ~60 measured temple-name queries somewhere credible to land.

**Audience.** People who have found a temple name in search and want to know what it actually is; travellers who want to visit without giving offence.

**Theme.** Already written, and well: *"These are not monuments. They are houses the village still answers to."*

**Existing chapters.** 1 authored (`himachal-temple-etiquette`, 1,715 words — the deepest page on the site), plus the 10 candidates in §2.

**Missing chapters.** Named temples with measured impressions and no page: `jamadagni rishi temple` (6 impressions), `indrunag`, `hari rai temple chamba`, `mrikula devi`, `shringa rishi`, `kalamuni`, `aadi brahma`, `lakshana devi`, `bering nag`, `shrai koti`, `mahunag naldehra`, and ~50 more (`SEO_OPPORTUNITY_MAP.md:25`).

**Potential stories.** Four already exist and are attached to candidate chapters: `small-god`, `bell-and-thunder`, `mirror-of-stillness`, `churdhar-bell-echo`. **All four are `unverified` with no named author** (E2). They are not testimony until that is resolved.

**Search demand.** The strongest measured signal on the site. `/temples` — **151 impressions, 0 clicks, position 54.7** — the #2 page by impressions. Google is topic-matching a six-temple page to ~60 temple names it does not contain.

**Research availability.** ❌ **Not started for any temple.** Viable sources exist (district administration pages, HP Language/Art & Culture Department, temple committees, district gazetteers), but each temple needs its own dossier at the standard already set by `docs/audit-evidence/research-record.md`. Kamrunag took six independent source groups and still ended with seven claims on hold.

**Editorial value.** High and genuinely differentiated. Almost nothing on the open web treats Himachal's devta system as an institution with offices and obligations rather than as folklore colour.

**SEO value.** Highest on the site — and the slowest to realise honestly. **~60 queries is not ~60 pages.** Per-temple pages should exist only where per-temple research exists.

**Verdict: JUSTIFIED — the book already exists. Fill it, don't duplicate it.**

**Sequence:**
1. Render the book fields (Blocker 1). *Code change, no content risk.*
2. Wire `/books/temples-traditions` and `himachal-temple-etiquette` into internal linking — 3 and 2 inbound links today.
3. Decide the ownership rule (Blocker 2) **before** moving any chapter.
4. Founder decides the Lost Trails question (Blocker 3).
5. Move chapters only after their research and taxonomy issues are resolved.
6. Expand `/temples` per-temple, research-gated, one at a time.

---

## 4. Proposal 2 — "High Passes" — **not justified yet**

**Existing chapters:** `pin-bhaba-pass` (unplaced), `rupin-pass-trek`, `buran-ghati-trek`, `kheerganga-buni-buni-pass`, `baga-sarahan-bashleo-pass` — five with `trackType: pass`.

**Why not now.** Three of the five are already load-bearing elsewhere: Kheerganga and Baga Sarahan are temple-book candidates, and pulling passes out of Summer would leave it with three chapters. This is the same cannibalisation as Blocker 3, one shelf over.

More importantly, **pass content is the hardest to publish honestly.** The Kamrunag dossier found four irreconcilable figures for one route's distance and elevation (3,334 m official vs ~2,900 m GPS; 5 / 6 / 8 km). Pass chapters carry altitude, duration and difficulty claims where being wrong is a safety issue, not an accuracy issue — and `SEO_CONTENT_AUDIT.md` E3 already flags blanket fitness reassurance in existing chapters.

**Verdict: DEFER.** Revisit only after route facts can be sourced and attributed. `pin-bhaba-pass` stays unplaced — that is the correct state, not a gap.

---

## 5. Proposal 3 — "Sacred Waters" (lakes) — **not justified**

Four chapters carry `trackType: lake`: `kamrunag-the-lake-of-oaths`, `saroa-to-kamrunag`, `parashar-lake-trek`, `chandernahan-lake-trek`, plus `jalori-lake-trek`.

**Three of the five are the same two sacred sites** (two Kamrunag approaches, Parashar). Their sacred meaning is the *reason they matter*, which makes this a subset of the temple book, not a peer of it.

**Verdict: REJECT as a book.** Better served as a cluster *within* Temples & Traditions, and as internal linking (Phase 7). Do not create a shelf to hold five chapters that already have homes.

---

## 6. Proposal 4 — Region books (Sacred Mandi, Parvati Valley, …) — **reject for now**

Named in `.claude/agents/content-architect.md:20-24` and `docs/content-model-migration-2026-08.md:203-230` as part of a proposed seven-primary-book model. **None of the seven has a data file.** They are planning records, not existing books, and should not be reported as such.

Region already has a working URL family — `/himachal/travel-guide/{district}` — with 13 destination pages live. **Adding region books would create a second, competing region hierarchy** on a site that already has two coexisting classification systems (`SEO_CONTENT_AUDIT.md` A1).

And the existing region layer is starved: every district page has exactly **2 inbound internal links**, versus 87 for static hubs. The region layer's problem is that nothing links to it — a new book shelf would not fix that.

**Verdict: REJECT.** Fix district linking first. Revisit only if a district hub earns measured demand.

---

## 7. Decision summary

| Proposal | Verdict | Blocking on |
|---|---|---|
| **Fill `Temples & Traditions`** | ✅ **Justified** | Render book fields · ownership rule · Lost Trails decision · per-temple research |
| Create "The Book of Sacred Mountains" | ❌ **Reject** | Would duplicate the book that already exists |
| High Passes | ⏸ **Defer** | Route-fact sourcing; would cannibalise Summer |
| Sacred Waters | ❌ **Reject as a book** | Better as a cluster + internal links |
| Region books | ❌ **Reject** | Would create a third hierarchy; fix district linking first |
| **Any new book at all this quarter** | ❌ | The existing five average 3.5 chapters and 275 words |

---

## 8. What the founder needs to decide

1. **Does Temples & Traditions take chapters from the seasonal books, or can a chapter belong to both?** If both, an explicit ownership rule is required first — alphabetical order must not decide it.
2. **Is Lost Trails allowed to shrink to two chapters, or is it retired?** Retiring it means 301s, sitemap changes and internal-link updates for a live indexed URL.
3. **Do the four seasonal books get real metadata**, or is `bookType: primary` abandoned as a distinction?
4. **Where does `pin-bhaba-pass` live?** It is fine unplaced; it just needs a stated decision.

Until 1 and 2 are answered, **no chapter should be moved between books.** The migration doc's advice to update `parentBook` alone would leave display and navigation pointing at the old book (`SEO_CONTENT_AUDIT.md` A2).
