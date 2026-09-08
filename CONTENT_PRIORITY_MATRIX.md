# Content Priority Matrix — Pahari Yatri (Phases 2 + 9)

**Date:** 2026-09-08 · **Companion to:** `SEO_CONTENT_AUDIT.md`

---

## 0. Data provenance — read this before using any number below

**Search Console was not opened in this session.** The browser automation MCP is disconnected, and a recursive search of the repository (filenames matching csv/xlsx/zip/gsc/search-console/query/performance, plus a git tracked-file query) found **no GSC export** anywhere — `docs/audit-evidence/historical-gsc-export-discovery.json`.

Every impression, click and position figure in this document comes from the **real GSC export pulled on 2026-09-05** and preserved in `SEO_OPPORTUNITY_MAP.md` / `PAHARI_YATRI_FINAL_SEO_AUDIT.md`. That data is three days old at time of writing and covers a 90-day window.

**No keyword or metric here is invented.** Where a URL has no GSC row, the cell reads `no data` — which means *not measured*, not *zero demand*. At 1.1K total impressions across 104 queries, most URLs on this site genuinely have no row.

Founder-stated baseline (24 clicks / 1.15K impressions / 2.1% CTR / position 16.9 / 37 indexed / 90 not indexed) is consistent with the preserved export (23–24 clicks / 1.1K impressions / 2.1% CTR / position 17).

Two structural facts measured directly in this session:
- **89 sitemap URLs, all returning 200** (`crawl-summary.json`).
- **`https://www.pahariyatri.com/` now 308-redirects to the apex**, and `/nonexistent` correctly returns 404. Both were flagged as defects in earlier audits; both verified fixed today.

---

## 1. Phase 2 — Classifying the ~90 non-indexed URLs

**This is a structural hypothesis, not a measured classification.** I could not read the GSC "Why pages aren't indexed" report. What follows is derived from the live crawl, the sitemap, and the redirect behaviour verified above. **Confirm against GSC before acting on buckets C or F.**

The arithmetic that makes this tractable: 37 indexed + 90 not indexed = 127 known URLs, against a sitemap of only 89. The ~38 URL surplus has to come from somewhere, and there are exactly two large sources.

### Bucket B — Correctly excluded (largest bucket, expect ~55–70 URLs) — **no action**

**B1. Nested chapter URLs — 25 URLs.** `/books/{book}/{chapter}` returns 200 for all 25 chapters with a book, and correctly canonicalises to `/chapters/{slug}` (`app/books/[book]/[chapter]/page.tsx:35-39`). Verified live: `/books/winter/kamrunag-the-lake-of-oaths` → 200.

These are **not in the sitemap** and — confirmed by a full internal-link scan of all 89 pages — **not linked from anywhere on the site**. Google knows them from earlier crawls. They will report as *"Alternate page with proper canonical tag."* This is the system working correctly.

**B2. Legacy `www.` host URLs — expect ~30.** The 2026-09-05 export still shows `www.pahariyatri.com/` (431 impressions), `/journal` (17), `/community` (26) as separate rows. The 308 to apex is now in place, so these will report as *"Page with redirect"* and decay naturally.

**B3. Keystatic admin.** `/keystatic/`, `/api/keystatic/` — disallowed in `robots.ts:10`. Correct.

### Bucket E — Crawled/discovered, not yet indexed — **wait, don't act**

Recently published URLs. `himachal-temple-etiquette` and `/books/temples-traditions` shipped in commit `b33712f` and are the newest content on the site. `/books/temples-traditions` has only **3 inbound internal links** and the chapter has **2** — weak discovery signals for new pages.

**Action: fix the internal linking (§4, L1), then wait.** Requesting indexing on a page with 2 inbound links is treating the symptom.

### Bucket C — Needs content improvement before it deserves indexing — **~13–21 URLs**

| URLs | Visible words | Inbound links | Why |
|---|---:|---:|---|
| 8 place pages | 107–122 | 3 | Schema holds only a 20–35 word description + coordinates. There is no page here to index yet (`SEO_CONTENT_AUDIT.md` A8) |
| 5 empty district pages (bilaspur, hamirpur, solan, una, kangra) | 163–169 | 2 | Zero chapters, zero stories. Titled "Travel Guide", deliver ~165 words |
| 8 populated district pages | 191–468 | 2 | Have content to link to, but barely link to it |

**These are the pages most likely sitting in "Crawled – currently not indexed", and Google is not wrong.** The answer is *not* to request indexing. It is either to make them substantial or to accept they're navigational.

### Bucket F — Low-value / dead — **expect very few**

`/apply` (26 visible words, no `<h1>`) is the only sitemap URL that genuinely looks like a soft-404 to a crawler. It is a form page with 88 inbound links.

**Recommendation:** keep it indexable but give it a real `<h1>` and a sentence of context, or `noindex` it deliberately. Right now it is neither.

### Bucket D — Duplicate/canonical issue — **1 URL, real**

**`/chapters` duplicates the homepage title *and* description verbatim** (`SEO_CONTENT_AUDIT.md` T4). It is the only true metadata duplicate across 89 URLs. Google may treat it as a near-duplicate of the homepage. **Fix the metadata, then re-inspect.**

### Bucket A — Should be indexed but isn't — **cannot determine without GSC**

Any chapter or story missing from the index would land here. **This is the one bucket that genuinely requires opening Search Console**, and it is the reason to prioritise getting access.

### Summary

| Bucket | Est. count | Action |
|---|---:|---|
| A — Should be indexed | Unknown | **Requires GSC access** |
| B — Correctly excluded | ~55–70 | None |
| C — Needs content first | ~13–21 | Fix depth or accept navigational role |
| D — Duplicate/canonical | 1 | Fix `/chapters` metadata |
| E — Not yet crawled | ~2–5 | Improve internal links, then wait |
| F — Low-value | ~1 | Decide `/apply`'s role |

**The honest headline: most of the 90 are fine.** The founder's instinct not to assume they're all problems is correct — the nested-chapter and legacy-www families alone plausibly account for two thirds.

---

## 2. Phase 9 — Priority matrix

**Column meanings.** *Content quality* = live visible word count + structural state. *Research availability* = whether credible sources exist to write from **today**, per `docs/audit-evidence/research-record.md` and the source classes in §3. *Internal-link strength* = measured inbound internal links from the 89-page crawl. *Authority potential* = whether this page can plausibly become the best page on the web for its topic.

### P0 — Measured demand, unblocked or cheaply unblocked

| URL | Type | Impr. | Clicks | Pos. | Content quality | Research | Links | Authority | Action |
|---|---|---:|---:|---:|---|---|---:|---|---|
| `/temples` | Hub | **151** | 0 | 54.7 | 450w, 6 hardcoded temples, no source fields | **Per-temple research required** | 87 | **Very high** — no strong Pahari-devta source exists on the web | **Biggest opportunity on the site.** ~60 named-temple queries already land here. Research-gated: add only temples with named sources; hedge or omit the rest |
| `/chapters/mural-danda-trek` | Chapter | 14–30 | 0 | 10.6–11.1 | 556w, renderer-capped | Not started | 5 | Medium | Closest thing to a page-1 win. Meta description is live and good. Needs `trackType` set and the renderer fix (A9) before more writing helps |
| `/folklore` | Hub | 42 (+66 www) | 0 | 11.5 (query) | 429w, 6 cards, no source fields | Partial | 87 | High — on-brand and matches measured demand | Metadata now unique ✅. Blocked only by `og:title \| undefined` (T2). Then deepen with sourced material |
| `/chapters` | Hub | no data | — | — | 711w, **duplicate homepage metadata** | n/a | 87 | Medium | **Fix metadata.** Cheapest correctness fix on the site |
| `/stories` | Hub | no data | — | — | **83w, no `<h1>`, no links in server HTML** | n/a | 87 | Medium | **Fix the render (T1).** The entire story library's entry point is invisible without JS |

### P1 — Strong pages held back by structure, not writing

| URL | Type | Impr. | Clicks | Pos. | Content quality | Research | Links | Authority | Action |
|---|---|---:|---:|---:|---|---|---:|---|---|
| `/chapters/kheerganga-buni-buni-pass` | Chapter | 1 (`kheerganga history`) | 0 | 11.0 | 566w | Needs source: Kartikeya origin + current pool/camping rules | 5 | High | The `overview` field already answers this query — **but renders only into JSON-LD**. Fixing A9 unblocks it with no new writing |
| `/chapters/kamrunag-the-lake-of-oaths` | Chapter | no data | — | — | 657w, best-linked chapter (11) | ✅ **Full dossier complete** | 11 | **Very high** | **The one chapter ready to upgrade now.** Also carries the "never robbed" / "never ends well" absolutes that must go |
| `/chapters/himachal-temple-etiquette` | Chapter | no data | — | — | **1,715w — deepest page on the site** | Own 11-item backlog, unresolved | **2** | **Very high** | Best content, near-worst linking. Wire it into the temple/devta cluster before anything else |
| `/books/temples-traditions` | Book | no data | — | — | **216w, 3 links** — weakest book page | n/a | 3 | High | Flagship book, invisible. Its authored `thesis`/`seoTitle`/`metaDescription` **are never rendered** (A3) |
| `/chapters/parashar-lake-trek` | Chapter | no data | — | — | 641w, 10 links | Needs source: depth/divers/island mechanism | 10 | High | Well-linked, but carries an unsupported physical explanation. Research before expanding |
| `/films` | Hub | 22 | 0 | **4.0** | 375w, **3 placeholder `EXAMPLE00x` videos** | n/a | 87 | Low-medium | Position 4 with placeholder content. Either ship real films or reduce its prominence |
| `/community` | Hub | 26 | 0 | **4.7** | 243w | n/a | 87 | Low-medium | Position 4.7, 0% CTR. Title/description appeal, not content depth |

### P2 — Real content, structurally isolated

| URL group | Type | Impr. | Content quality | Research | Links | Action |
|---|---|---|---|---|---:|---|
| 22 remaining chapters | Chapter | no data | 526–657w, renderer-capped | **Not started (24 of 25)** | 3–11 | **Do not rewrite.** Fix the renderer (A9), wire `relatedChapters` (18 have none), research before expanding |
| 20 stories | Story | ~2 rows | 372–630w | n/a | 3–4 | Blocked on the authorship decision (E2). `kheerganga-fire-and-water` already ranks 9.1 |
| 8 populated districts | District | no data | 191–468w | Varies | **2** | Linking first. Kullu (10 chapters, 10 stories) and Mandi (4 chapters) are the only two with enough to justify a real hub |
| 4 seasonal books | Book | no data | 216–321w, **duplicate `<h1>`** | n/a | 5–9 | H1 fix; render the book fields |

### P3 — Do not prioritise

| URL group | Why |
|---|---|
| 5 empty districts (bilaspur, hamirpur, solan, una, kangra) | Zero content, 2 links, no measured demand, outside the brand's demonstrated territory. **Writing these is exactly the "hundreds of SEO pages" outcome the brief forbids** |
| 8 place pages | Blocked on a schema decision (A8), not a writing task |
| Brand-confusion queries (`pahari`, `pahadi log`, …) | >95 impressions but wrong intent — people searching the Pahari language/identity. `SEO_OPPORTUNITY_MAP.md:63` reaches the same conclusion. Homonymy, not a content gap |
| `/why-pahari-yatri` | 251w, no `<h1>`, and reads like a tour operator ("Hidden Trails", "Selective Guest Policy"). Needs a **founder copy decision**, not an SEO pass |
| `/apply` | 26w. Decide its role (§1, Bucket F) |

---

## 3. Research availability by cluster

Honest assessment of what can be written **today** without inventing anything.

| Cluster | Research state | Verdict |
|---|---|---|
| **Kamrunag** | ✅ Six independent source groups, every fact classified, 7 claims explicitly held | **Ready.** The only cluster that is |
| **Temples / devta** | ❌ Not started. ~60 queries measured, six hardcoded cards with no source fields | **Highest value, highest research cost.** Official district pages + HP Language/Art & Culture Dept + temple committees are viable sources. Budget per-temple research; do not batch-write |
| **Folklore** | ⚠️ Partial. Measured demand, on-brand, but every card lacks provenance | Viable — folklore can be published as *"this community tells it this way"* with a named source. Never as history |
| **Treks** | ⚠️ Route facts (distance, elevation, duration) are the **hardest** to source honestly | The Kamrunag dossier found four conflicting figures for one route (3,334 m vs ~2,900 m GPS; 5 / 6 / 8 km). **Do not publish trek numbers without attribution.** Cite a baseline, name it, never average |
| **Lakes** | ⚠️ Kamrunag ✅, Parashar contested, others not started | Parashar's island mechanism needs a real source or must be dropped |
| **Villages / places** | ❌ Schema-blocked before research matters | Decide the model first |
| **Real Yatri experiences** | ❌ **Blocked on E2** — zero named authors; 17 of 20 narrators are documented archetypes | **Cannot be fixed by research.** Needs a founder decision, then real contributions |
| **Seasons** | ⚠️ Existing seasonal recommendations are unverified | Kamrunag's own dossier rates fixed safe-season claims *low confidence* |

---

## 4. Sequenced plan

**Stage 1 — Technical correctness (no content risk, no research).**
`/chapters` metadata · `data/seo/` singleton · `/stories` render · H1 fixes · schema image paths · alt text.

**Stage 2 — Internal linking (no research, no new pages).**
Wire `himachal-temple-etiquette` and `/books/temples-traditions` into the site. Populate `relatedChapters` for the 18 chapters with none. Connect districts to their chapters. **Highest value-to-risk ratio of anything in this document.**

**Stage 3 — Renderer (founder approval required).**
Surface chapter `overview`; render markdown headings. Unblocks depth for all 25 chapters at once and directly serves `kheerganga history`. Changes every chapter's visible layout — propose, don't ship.

**Stage 4 — Founder decisions (blocking, cannot be researched around).**
Story authorship classification (E2) · verification vs publication state (E1) · district taxonomy contradictions (A5/A6) · `ChatGPT-User` bot policy (T7) · `/why-pahari-yatri` copy (B1).

**Stage 5 — Research-led content, one topic at a time.**
Kamrunag (ready now) → `/temples` per-temple → folklore provenance. Never batch.

**Stage 6 — Re-pull GSC after 4–6 weeks** and rebuild this matrix against measured movement rather than the 2026-09-05 snapshot.

---

## 5. Metrics to watch

| Metric | Now (2026-09-05) | Why it matters |
|---|---|---|
| `/temples` position | 54.7, 0 clicks, 151 impr. | The single clearest content-quality signal on the site |
| `mural danda trek` position | 10.6–11.1 | Page-1 crossover is the first real ranking win available |
| `/stories` impressions | no data | Should move once it stops serving a loading screen |
| Indexed page count | 37 | Watch the *direction*, not the number. Bucket B growth is fine |
| Pages with named authors | **0 of 20** | The E-E-A-T metric that actually matters here |
| Chapters with a research dossier | **1 of 25** | The real ceiling on everything in Phase 5 |
| Chapters with ≥2 `relatedChapters` | **4 of 25** | Cluster health |
