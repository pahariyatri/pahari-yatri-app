# Chapter Upgrade Priority Queue

**Date:** 2026-09-09
**Run by:** `seo-research-strategist` methodology, as part of the September growth sprint. Everything below is verified against the repo at the time of writing and against live `pahariyatri.com`. No files were written or edited by this pass — it is audit and prioritization only.

**Why this file exists.** The September sprint originally asked to restructure "all important chapters" across the Parvati Valley and Winter books in one pass. That conflicts with this repo's own established discipline — one chapter at a time, verification-gated (see `chapter-upgrade-loop`, and the "fix one thing per week" rule in `/weekly-growth-review`). Rather than a shallow mass-rewrite, this document is the prioritized queue that discipline is supposed to run against, one chapter per loop.

**Keyword volume caveat, stated once, applying to everything below:** this repo has no keyword API. Every "opportunity" and "competition" judgement is a **directional judgement from live SERP inspection**, not a measured metric. Where a real number is cited, it comes from GSC, GA4, or a `curl` against production, and is labelled as such.

---

## Two corrections to how this queue was originally briefed

**1. `parashar-lake-trek` is not an orphan chapter.** It IS listed in `data/books/monsoon.yaml` (line 15), and receives three inbound chapter links — two from chapters inside *published* books (`kamrunag-the-lake-of-oaths` and `chandernahan-lake-trek`, both in `winter`), plus one from `himachal-temple-etiquette`. Its actual problem is different and worse: **its parent book, `monsoon`, is unpublished**, so `/books/monsoon` serves `noindex, follow` (verified live). The chapter's only breadcrumb parent is a page Google is told to ignore. That is a homelessness problem, not a linking problem — see §E.1 below.

**2. `solstice-snow` is the real orphan in scope.** Zero inbound chapter links from anywhere. Only reachable from the `winter` book page and `/chapters`.

---

## A. The queue

Scope: 16 chapters in `parvati-valley-beyond-kasol`, 2 remaining chapters in `winter`, plus `parashar-lake-trek`. `kamrunag-the-lake-of-oaths` is excluded as already in progress via a separate loop.

Word counts are visible editorial body (narrative + overview + excerpt + invitation + localTruth + FAQs), not raw file size.

| # | Chapter slug | Book | Target query | Why this rank | Missing fields | Effort | Verify? |
|---|---|---|---|---|---|---|---|
| 1 | `kheerganga-buni-buni-pass` | parvati (pub) | kheerganga trek | Highest-demand query in the book; the site already has real GSC impressions for Kheerganga terms at roughly position 10–11. The 2024 overnight camping ban is a live regulatory fact the chapter already holds with 4 sources; competitor page 1 is trek operators selling the thing that is now banned. 718 words vs. 2,000+ on competitors. | seoTitle, metaDescription, place, region, reelHook, cta, verificationStatus, authorName, authorType, coordinates | M-L | Y |
| 2 | `malana-myth-and-reality` | parvati (pub) | malana village | The only chapter in scope with a **verified bridge to a real GSC impression query**: `jamadagni rishi temple` is a live top-10 impression term currently landing on `/temples` at position 51–74. SERP inspection confirms Malana's devta Jamlu Devta *is* Jamdagni Rishi (Outlook, Tribune India). Chapter already carries `jamlu devta` as a secondary keyword and the strongest localTruth in the book. 824 words. | seoTitle, metaDescription, place, region, trackType, district, reelHook, cta, verificationStatus, authorName, coordinates, parentBook | M | **Y** |
| 3 | `parashar-lake-trek` | monsoon (**unpub**) | prashar lake | Mandi district — the one district with genuine GSC signal (`jamadagni rishi temple`, `mural danda trek` at ~pos 11). Sacred-lake cluster sibling to the Kamrunag upgrade already in progress; the link edge already exists. Maximum field gap: zero SEO fields at all. **Blocked on the founder book decision in §E.1 — do not upgrade until it has a published home.** | targetKeyword, secondaryKeywords, seoTitle, metaDescription, localTruth, sources, authorName, authorType, verificationStatus, coordinates, place, region, reelHook, cta | L | Y |
| 4 | `chandernahan-lake-trek` | winter (pub) | chandernahan lake trek | Published book, same "these lakes are not picnic spots" thesis as Kamrunag. SERP is 100% package operators (JustWravel, Backpack Hikers, Trekpole, Hindustan Travel Corp) with **zero editorial competitor**. Live SERP surfaced a devta angle the chapter does not yet contain: Devta Shikru Naharaj, and a local belief that Chandra Maa bathes in the lake once a decade. Zero SEO fields. 509 words. | same 14 as row 1 | L | **Y** |
| 5 | `understanding-parvati-valley` | parvati (pub) | parvati valley | The book's pillar, and it has **one** outbound related-chapter link against 15 siblings. It receives 7 inbound links and passes almost nothing back. Ranking upside is medium at best; the structural leverage is the highest number in this table, and the effort is the lowest. | seoTitle, metaDescription, place, region, trackType, district, reelHook, cta, verificationStatus, authorName, coordinates, parentBook, **14 relatedChapters** | S-M | N |
| 6 | `grahan-protects-its-traditions` | parvati (pub) | grahan village trek | SERP-verified that the alcohol ban is a decree of the village deity Yagya Maharishi, not a government rule — that distinction is the entire brand thesis and no page-1 result makes it properly. Competition is trek operators plus travelcoffee.in. 691 words. | seoTitle, metaDescription, place, region, trackType, district, reelHook, cta, verificationStatus, authorName, coordinates, parentBook | M | **Y** |
| 7 | `tosh-village-above-the-valley` | parvati (pub) | tosh village | High demand, hardest village SERP in the book: Wikipedia, MakeMyTrip, two Tripoto posts, five blogs. Winnable only on depth. 654 words. | as row 6 | M | N |
| 8 | `kasol-weekend` | parvati (pub) | kasol travel guide | Highest internal authority in the repo (8 inbound chapter links, verified). Its job is distribution plus catching head "kasol" demand and reframing it. Brutal commercial SERP. Carries legacy `itinerary`, `duration`, `difficulty` fields. 613 words. | seoTitle, metaDescription, place, region, trackType, reelHook, cta, verificationStatus, authorName, coordinates + **legacy field strip** | M | N |
| 9 | `kalga-slow-mountain-life` | parvati (pub) | kalga village | Direct competitor exists: travelcoffee.in runs a "Kalga Pulga Tulga" cluster page covering three of these chapters at once. Also the natural sleep-here alternative created by the Kheerganga camping ban (row 1), so it gains from that upgrade. 734 words. | as row 6, plus `duration` strip | M | N |
| 10 | `manikaran-sahib-and-its-culture` | parvati (pub) | manikaran sahib | High volume, but the SERP is institutional Sikh sites and NGOs with real authority on the Guru Nanak legend. Low differentiation available. The two-religions-one-spring angle is good but not unique. 549 words. | as row 6 | M | **Y** |
| 11 | `mantalai-lake-the-source` | parvati (pub) | mantalai lake trek | Genuinely low competition, genuinely low demand. Good cluster-completion piece, weak standalone. 524 words. | as row 6 | M | Y |
| 12 | `sar-pass-trekking-culture` | parvati (pub) | sar pass trek | Purely commercial SERP (YHAI/operator dominated). Only 1 inbound link. 554 words. Chasing this is chasing operators. | as row 6, plus `duration` strip | M | N |
| 13 | `pulga-forests-and-silence` | parvati (pub) | pulga village | Wikipedia has a Pulga entry; the travelcoffee cluster page competes. Solid chapter already, small upside. 651 words. | as row 6, plus `duration` strip | S-M | N |
| 14 | `bunbuni-pass-trail-beyond-kheerganga` | parvati (pub) | bunbuni pass trek | **Cannibalisation flag.** Overlaps `kheerganga-buni-buni-pass` and spells the pass differently ("Bunbuni" vs. "Buni Buni"). 423 words. Resolve the split before upgrading either — see §E.5. | as row 6 | S | N |
| 15 | `chalal-first-step-away` | parvati (pub) | chalal village kasol | Thin (457 words), low demand, but a clean easy win against a weak SERP. | as row 6 | S | N |
| 16 | `rasol-remote-mountain-village` | parvati (pub) | rasol village trek | 454 words, 1 inbound link, low demand. | as row 6 | S | N |
| 17 | `waichin-valley-high-meadow` | parvati (pub) | waichin valley trek | 373 words, 1 source, 1 inbound link, 1 outbound. **SERP-verified keyword gap: widely called "Magic Valley" and the chapter never says so.** AllTrails plus operators hold page 1. | as row 6 | S-M | N |
| 18 | `tulga-the-forgotten-neighbour` | parvati (pub) | tulga village | 385 words, deliberately short because research is genuinely thin, and the chapter says so honestly. SERP is equally thin (Holidify stub, a Facebook post, MakeMyTrip trio listing), so it's winnable — but there's almost nothing to win. Leave short. | as row 6 | S | N |
| 19 | `solstice-snow` | winter (pub) | **none** | **Do not upgrade. Reclassify.** No `place`, no `targetKeyword`, no `localTruth`, zero inbound links. `location` reads "Above Manali," which is not a nameable place. By the schema's own rule ("if a piece has no real searchable place, it is a Story"), this is a Story. Currently generating the live title `Solstice Snow, Above Manali, Himachal Pradesh`. | n/a | S (reclassify) | N |

---

## B. Top 5, in detail

### 1. `kheerganga-buni-buni-pass`
- `targetKeyword`: `kheerganga trek`
- `secondaryKeywords`: `kheerganga camping ban`, `kheerganga day trek rules`, `barshaini to kheerganga`, `kheerganga hot spring`, `where to stay near kheerganga`
- `seoTitle` (53 chars): `Kheerganga Trek: Day-Trek Rules After the Camping Ban`
- `metaDescription` (141 chars): `Overnight camping at Kheerganga is banned. What the day-trek rules now are, where to stay instead, and what the hot spring means locally.`
- Internal links to gain: `himachal-temple-etiquette` (currently missing and mandatory for a sacred-spring chapter), `kalga-slow-mountain-life` (the ban's practical answer to "where do I sleep"), `tosh-village-above-the-valley`, `understanding-parvati-valley` (already present — move into the first 200 words).

### 2. `malana-myth-and-reality`
- `targetKeyword`: `malana village`
- `secondaryKeywords`: `malana rules for visitors`, `jamlu devta malana`, `malana no touch rule`, `jamadagni rishi`, `malana village history`
- `seoTitle` (55): `Malana Village Rules: Jamlu Devta and the No-Touch Rule`
- `metaDescription` (127): `What Malana's no-touch rule actually is, who Jamlu Devta is, and which repeated claims about the village do not hold up.`
- Internal links to gain: `himachal-temple-etiquette` (missing, mandatory), the `/temples` hub (this is where `jamadagni rishi temple` impressions are already landing at position 51–74, with no depth behind them), `grahan-protects-its-traditions` (already present, keep — two devta-decree villages side by side is the strongest sideways pair in the book), `kasol-weekend`.

### 3. `parashar-lake-trek` (gated on §E.1)
- `targetKeyword`: `prashar lake` — note the spelling. Wikipedia, Indiahikes, AllTrails and Holidify all use **Prashar**; the repo uses **Parashar** everywhere including the slug. Lead with "Prashar" in the title, carry "Parashar" as a secondary. Do not change the slug.
- `secondaryKeywords`: `prashar lake trek from mandi`, `prashar lake floating island`, `parashar lake temple`, `baggi to prashar lake`, `prashar lake in winter`
- `seoTitle` (55): `Prashar Lake, Mandi: The Floating Island and Its Temple`
- `metaDescription` (140): `Prashar Lake sits at 2,730 m above Mandi, with a drifting island and a pagoda temple to Rishi Parashar. What the site is and how to reach it.`
- Internal links to gain: `mural-danda-trek` (Mandi cluster, and the site's single strongest non-brand GSC ranking at ~position 11 — this edge should exist in both directions), `devidarh-shikari-devi` (Mandi temple sibling), plus the existing `kamrunag-the-lake-of-oaths` and `himachal-temple-etiquette` edges retained.

### 4. `chandernahan-lake-trek`
- `targetKeyword`: `chandernahan lake trek`
- `secondaryKeywords`: `chandranahan lake`, `janglik to chandernahan`, `chandernahan trek route`, `chandernahan seven lakes`, `shikru devta rohru`
- `seoTitle` (50): `Chandernahan Lake Trek: Janglik Route and Its Devta`
- `metaDescription` (134): `The Chandernahan lakes above Janglik, Rohru: the route from the roadhead, the short season window, and why Rohru treats them as sacred.`
- Internal links to gain: `himachal-temple-etiquette` (missing, mandatory), `churdhar-sacred-ascent` (its nearest sacred-height sibling in the same broad Shimla belt), plus existing `kamrunag-the-lake-of-oaths`, `parashar-lake-trek`, `mural-danda-trek` retained.

### 5. `understanding-parvati-valley`
- `targetKeyword`: `parvati valley` (promote from the current long-tail `parvati valley travel guide`; the pillar is the only page that should hold the head term)
- `secondaryKeywords`: `parvati valley villages`, `villages beyond kasol`, `parvati valley kullu district`, `how many villages in parvati valley`, `parvati valley in winter`
- `seoTitle` (49): `Parvati Valley: The Villages Past Kasol, Explained`
- `metaDescription` (145): `Parvati Valley is more than Kasol. Kalga, Pulga, Tosh, Grahan and Malana each run on their own rules. Where each village is and what it asks.`
- Internal links to gain: **all 15 siblings**, plus `himachal-temple-etiquette`. This is the pillar-to-every-chapter rule and it is currently 1 of 15. It is a data edit in one YAML file and it is the cheapest high-value change available in this repo.

---

## C. Internal linking gaps

**Crawlability caveat, so this is not overstated:** `/chapters` renders links to all 39 chapters, verified live. Nothing in the repo is uncrawlable. "Orphan" below means *topically* unlinked, which is what affects ranking and Google's index-or-not decision, not reachability.

**Verified orphans and near-orphans, whole repo, from the link graph:**

| Chapter | In published book? | Inbound chapter links | Inbound from a published-book chapter |
|---|---|---|---|
| `solstice-snow` | winter (yes) | **0** | **0** |
| `pin-bhaba-pass` | **no book at all** | 2 | 1 |
| `meadow-walks` | summer (unpub) | 2 | **0** |
| `mist-valleys` | monsoon (unpub) | 1 | **0** |
| `river-sutra` | summer (unpub) | 2 | **0** |
| `sunlit-passes` | summer (unpub) | 1 | **0** |
| `waichin-valley-high-meadow` | parvati (yes) | 1 | 1 |
| `rasol-remote-mountain-village` | parvati (yes) | 1 | 1 |
| `sar-pass-trekking-culture` | parvati (yes) | 1 | 1 |

**The single biggest systematic gap:** `himachal-temple-etiquette` has exactly 4 inbound links (`kamrunag`, `devidarh-shikari-devi`, `churdhar-sacred-ascent`, `parashar-lake-trek`). **Not one of the 16 Parvati Valley chapters links to it** — including `malana` (governed by a devta), `grahan` (alcohol banned by a devta's decree), `manikaran-sahib` (gurudwara and temples), `kheerganga` (sacred spring), and `mantalai` (Shiva site). The stated rule is that every place chapter links to the temple etiquette chapter. Compliance in the flagship published book is zero.

**Edges to add, specifically:**

1. `understanding-parvati-valley` → all 15 sibling Parvati chapters (currently only `kasol-weekend`).
2. `himachal-temple-etiquette` ← from `malana`, `grahan`, `manikaran-sahib`, `kheerganga`, `mantalai`, `chandernahan`. Six edges, one line each.
3. `mural-danda-trek` ↔ `parashar-lake-trek` (Mandi cluster; connects the site's best real ranking to the lake cluster).
4. `waichin-valley-high-meadow` ← from `kasol-weekend` and `understanding-parvati-valley` (currently 1 inbound).
5. `rasol-remote-mountain-village` ← from `grahan` and `understanding-parvati-valley`.
6. `sar-pass-trekking-culture` ← from `tosh` and `understanding-parvati-valley`.
7. `solstice-snow` ← nothing. Do not manufacture links into it. Resolve by reclassification instead (§E.3).

**Anchor text:** every one of these should use the place name (`Grahan`, `Prashar Lake`, `Jamlu Devta at Malana`), never a generic phrase. The chapter template renders `relatedChapters` as title-linked cards, so anchor quality is inherited from the chapter title — another reason the literary titles need literal `seoTitle` companions.

**The `parashar-lake-trek` resolution, without inventing a book:** move its `parentBook` from `monsoon` to `temples-traditions`, and publish `temples-traditions`. Brand-safe and requires no invention because `temples-traditions.yaml` *already names Parashar in its own `metaDescription`* ("Kamrunag, Shikari Devi, Churdhar, Parashar"), and `himachal-temple-etiquette` already links to Parashar — the book was clearly written expecting it. The chapter's canonical URL is `/chapters/parashar-lake-trek` regardless of parent book (verified via `chapterCanonical` in `lib/keystatic/chapterView.ts`), so this is a zero-risk URL change. The alternative — publishing `monsoon` — drags four atmosphere pieces (`cloud-forest-paths`, `rain-prayer`, `mist-valleys`, `jalori-lake-trek`) into the index with it, three of which have no SEO fields at all.

---

## D. The indexing problem: 90 of 127 not indexed

### Verified in code and against live production this session

1. **The sitemap is fine and an earlier finding is stale — do not repeat it.** An earlier audit (`SEO_AUDIT_REPORT.md`) states the sitemap generates zero chapter URLs. That is no longer true in production: `curl https://pahariyatri.com/sitemap.xml` returns **109 URLs including 39 chapter URLs and 3 book URLs**. The fix is already deployed.
2. **`robots.ts` is clean.** `app/robots.ts` blocks only `/keystatic/` and `/api/keystatic/`. Nothing content-bearing is disallowed. AI crawlers are explicitly allowed.
3. **One real sitemap bug remains.** `/books` is listed in the static routes array of `app/sitemap.ts`, is present in the live sitemap, and **301s to `/library`**. A sitemap URL that redirects is a guaranteed "Page with redirect" not-indexed entry. Additionally, `/library` itself still renders `href="/books"`, so there's an internal link to a redirect on the library page.
4. **Legitimate not-indexed buckets account for a real share of the 90.** Verified: `/books/winter/kamrunag-the-lake-of-oaths` returns 200 with `<link rel="canonical" href="https://pahariyatri.com/chapters/kamrunag-the-lake-of-oaths">`. Every chapter with a `parentBook` has one of these duplicate forms. They are correctly canonicalised, are not internally linked (book pages link the canonical `/chapters/` form, verified), and will sit in "Alternate page with proper canonical tag." Old `/{region}/stories/{slug}` URLs correctly 301. `/books/monsoon` correctly serves `noindex, follow`. These are working as designed and should not be "fixed" — they're why 127 known pages exceed 109 sitemapped.
5. **Titles are auto-generated, wrong, and near-duplicate.** `trackType` is unset on 14 of 16 Parvati chapters, so `buildChapterMetadata` falls through to its `"trail"` default and produces "Himalayan Trek in X." Verified live: `/chapters/tulga-the-forgotten-neighbour` currently serves `<title>Tulga, The Forgotten Neighbour: Himalayan Trek in Tulga, Parvati Valley | Pahari Yatri</title>`. Tulga is a village. There is no Tulga trek. `/chapters/kalga-slow-mountain-life` serves the same pattern at 88 characters. Every Parvati chapter shares the shape "X: Himalayan Trek in Y, Parvati Valley | Pahari Yatri," a near-duplicate title cluster of 14 pages.
6. **Meta descriptions are truncated first paragraphs of `overview`, not written.** Zero of the 19 in-scope chapters set `metaDescription`. Verified live on four chapters.
7. **Content is thin, measured.** In-scope chapters run 373 to 824 visible editorial words. `himachal-temple-etiquette` at 2,185 words is the only chapter in the repo at competitor depth, and it's in an unpublished book.
8. **8 of 19 in-scope chapters carry legacy package fields** (`itinerary`, `included`, `excluded`, `packing`, `duration`, `difficulty`): `kasol-weekend`, `kheerganga-buni-buni-pass`, `kalga`, `pulga`, `tosh`, `sar-pass`, `solstice-snow`, `chandernahan` — plus `parashar`, which carries all six.

### Hypothesis, labelled as such

- **The dominant bucket is almost certainly "Crawled — currently not indexed," not any crawl blocker.** Nothing is blocking Google. The sitemap is complete, robots is clean, every chapter is linked from `/chapters`, canonicals are correct. Google is finding these pages and choosing not to index them — that points at content quality, not technical configuration. This is not confirmed against GSC's Page Indexing report directly.
- **Near-duplicate titles across 14 sibling pages plus 400–800 word bodies is the classic signature of that bucket.** Fixing `trackType` and `seoTitle` across the Parvati book is a small data change with plausibly large effect, worth doing ahead of or alongside the first content loop.
- **Site authority is the floor under all of it.** 24 clicks across 3 months means crawl budget is being rationed across 127 similarly-shaped URLs. Depth on 5 pages will do more than field-completeness on 19.

**Practical read:** the technical layer is in better shape than the traffic suggests. The 90 unindexed pages are mostly an editorial problem with one small sitemap bug attached, not a technical failure.

---

## E. Founder decisions this surfaces

1. **Where does `parashar-lake-trek` live?** Recommendation: `parentBook: temples-traditions`, then publish that book. Zero URL risk. Do not invent a Sacred Lakes book, and do not publish `monsoon` just to house one chapter — that would also index four atmosphere pieces with no SEO fields. **This blocks queue rank 3.**
2. **Does `temples-traditions` get published at all?** It currently holds one chapter. Publishing a one-chapter book is thin; adding `parashar` makes it two. `kamrunag` and `chandernahan` would fit thematically but already sit in the published `winter` book, and a chapter has one parent. Decision: is `temples-traditions` a real book with 4–6 chapters, or does `himachal-temple-etiquette` get rehomed and the book retired?
3. **`solstice-snow`: reclassify as a Story?** No place, no target keyword, no local truth, zero inbound links, and the schema's own rule says a piece with no searchable place is a Story. Set `migrationStatus: should-be-story`, or give it a real named place. It currently generates a location-shaped title for a location that doesn't exist.
4. **"Prashar" or "Parashar"?** Wikipedia, Indiahikes, AllTrails and Holidify all use Prashar. The repo uses Parashar in the slug, title and `location`. Recommendation: keep the slug (a URL change costs more than it returns here), lead with Prashar in `seoTitle` and `targetKeyword`.
5. **`kheerganga-buni-buni-pass` vs. `bunbuni-pass-trail-beyond-kheerganga`.** Two chapters, overlapping subject, two spellings of the same pass. Recommendation: retitle the Kheerganga chapter to Kheerganga only and let the Bunbuni chapter own the pass — a title and keyword change, not a slug change. Needs approval since it changes live public copy.
6. **Remove `'books'` from the sitemap static routes and repoint the `/library` link.** Small code change in `app/sitemap.ts` and the library page. Verified bug, needs approval to touch.
7. **Legacy package fields: strip per-loop, or one sweep?** 8 in-scope chapters carry them, including `kasol-weekend` and `kheerganga` — the two highest-intent pages in the flagship book. A sweep is data-only but touches published pages.
8. **`verificationStatus` is unset on all 19 in-scope chapters** (defaults to `unverified`), while at least six make devta or legend claims: Jamlu Devta / Jamdagni Rishi at Malana, Yagya Maharishi at Grahan, Devta Shikru Naharaj and the Chandra Maa bathing belief at Chandernahan, Rishi Parashar at Prashar, the Guru Nanak and Shiva-Parvati legends at Manikaran, and the Kartikeya association at Kheerganga. Does `local-verification-editor` run per-loop, or as one batch pass over the devta claims before any of these ship?
9. **`authorName` and `authorType` are blank on all 19.** Default everything to "Pahari Yatri Editorial," or hold until real contributors are attached? Blank means the JSON-LD carries no author at all.
10. **`coordinates` are blank on all 19**, so every chapter's JSON-LD `Place` is name-only with no `geo`. The schema explicitly says do not guess. Sourced from official/government maps, or left blank indefinitely?

**Suggested first three loops, if a default is wanted:** `kheerganga-buni-buni-pass`, then `malana-myth-and-reality`, then `parashar-lake-trek` once §E.1 is answered. Run the `understanding-parvati-valley` pillar link fix and the `trackType` fill as a separate small data pass alongside loop one — neither is a chapter upgrade, and both unblock everything downstream.

---

## F. Completed this pass — `kamrunag-the-lake-of-oaths`

Added 2026-09-09. Kamrunag was excluded from the queue above because it was upgraded during this sprint rather than queued for a future loop. Recorded here so the next loop does not redo it.

**What shipped** (working-tree only, not deployed):

- **12 fields added:** `targetKeyword` (`kamrunag lake`), `secondaryKeywords`, `seoTitle`, `metaDescription`, `place`, `localTruth`, `sources`, `sourcesToVerify`, `verificationStatus`, `reelHook`, `cta`, `migrationStatus`.
- **3 LEGACY package-tour fields removed:** `duration`, `difficulty`, `itinerary`. Anything useful from the itinerary was folded into `gettingThere` and `overview` as prose.
- **8 real cited sources**, all previously fetched and quoted in `docs/audit-evidence/research-citation-ledger.json`: the Mandi district administration's tourism page, three Tribune reports, Times of India, Hindustan Times, a 2018 peer-reviewed floristic study of the Kamrunag Sacred Grove, and Hill Post.
- **Title split applied.** `title` stays literary ("Kamrunag – The Lake of Oaths", still the `<h1>`); `seoTitle` is literal ("Kamrunag Lake, Mandi: Trek, Temple and Local Truth", now the `<title>`). This is the pattern the rest of the queue should follow.
- **8 FAQs**, up from 3, rendering as `FAQPage` schema.
- **`verificationStatus: needs-local-source`**, deliberately not `local-source`. Every named local in the file (Kahan Singh, Vishnu Thakur, Raj Kumar, Dr ML Thakur) is quoted via published journalism on an *administrative* fact — a road, a langar, a stall rule, a cleaning window, a board meeting. **Not one is quoted on the cosmology.** The Yaksha lineage, the rain association and the meaning of an oath still rest on a district tourism page and a botanist's travelogue. The six `sourcesToVerify` entries name the real institutions that could close that gap.

**Gated by `local-verification-editor`**, which returned **two UNSAFE items and 19 required edits. All 19 were applied before the file was written.** The two unsafe items were: a "nobody has ever measured the depth" absolute that laundered a devotee's offhand remark into fact in the brand's own voice, and a `reelHook` using "khazana" (treasure) — the exact register the chapter spends 400 words arguing against.

### Open founder decision — blocks nothing else, but blocks calling this chapter finished

**Did the founder personally make this visit?** The narrative is first person and contains a quoted line from an unnamed tea-stall shopkeeper ("Woh unka hai"). That passage is **pre-existing live content**, not written this pass.

- The upgrade originally added `authorName: Pahari Yatri Editorial` / `authorType: editorial`. The verification gate flagged that an editorial byline over a first-person interview creates a narrator who does not exist, and `keystatic.config.ts:311` explicitly says "Do not invent a contributor."
- **Both fields were therefore left absent**, matching the previous live file exactly. Nothing was invented and nothing pre-existing was deleted.
- **If the visit was real:** the byline must be a named human, with their permission.
- **If it was composite or illustrative:** the shopkeeper quote, the grandmother, and "I threw no coin" come out, and the narrative moves to third person.

Do not add a byline until this is answered.

### Follow-ups this pass generated

1. **`saroa-to-kamrunag.yaml`** asserts 3,334 m flatly (lines 24 and 32). Kamrunag now openly flags a conflict between the district administration's 3,334 m and a 2023 published GPS reading of ~2,900 m. The sibling should carry a matching one-line note so the site does not flag a dispute in one chapter and ignore it in the other.
2. **`parentBook: winter`** on a lake the chapter itself says freezes, with the forest usually shut December to March and best times of mid-June and September to November. Inherited, not introduced. Worth a founder look.
3. **`verificationStatus` renders nowhere.** It is authored in `keystatic.config.ts:272` but referenced nowhere under `app/`, `components/` or `lib/`. Setting it warns no reader. Every hedge has to survive in the prose itself — which is why the 19 edits mattered. If the founder wants readers to see the honesty signal, that is a UI change nobody has scoped.
