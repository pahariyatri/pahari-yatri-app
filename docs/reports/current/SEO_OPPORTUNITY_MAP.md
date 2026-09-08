# SEO Opportunity Map — Pahari Yatri

Date: 2026-09-05 · Source: live Search Console export (both properties, last 3 months, pulled via browser 2026-09-05) + code-level page inventory. Raw row-level export lives at the audit's supporting data; this file groups it into decisions.

**Read this alongside `PAHARI_YATRI_SEO_MASTER_AUDIT.md`.** That file explains *why* each recommendation below is scoped the way it is (e.g. why fixes are gated on unpushed code first). This file is the query-level view only.

---

## 0. Reading the data honestly

Total volume is very small — 23 clicks / 1,100 impressions / 2.1% CTR / position 17 avg, over 90 days, on a site with 33 indexed pages. Two consequences for how to read every row below:

- **Individual query positions are noisy at 1–5 impressions.** Treat clusters, not single rows, as the signal.
- **`app.pahariyatri.com` (the portal) has zero Search Console data** — no sitemap was ever submitted, so there is nothing to map yet. Its section below is a *structural keyword plan*, not measured demand. Do not read it as validated opportunity until a sitemap is submitted and 4–6 weeks of data exist.

---

## 1. Main site (pahariyatri.com) — clustered opportunity map

### Cluster A — Himalayan temples (the strongest real signal in the dataset)

| | |
|---|---|
| Intent | Informational — "does this specific temple exist / what is it" |
| Representative queries | `jamadagni rishi temple`, `indrunag temple`, `hari rai temple chamba`, `mrikula devi temple`, `shringa rishi temple`, `kalamuni temple`, `aadi brahma temple`, `lakshana devi temple`, `bering nag temple`, `shrai koti temple`, `mahunag temple naldehra`, `banthia devta temple`, `dhanu devta temple`, `rathi devta mandir`, `jathia devi temple`, `nabahi devi temple`, `awah devi mandir`, `magru mahadev`, `dhwaj temple`, `gallu temple`, `hurang narayan temple`, `tarna devi temple mandi`, `jamlu rishi temple`, `kunal pathri temple`, + ~40 more single-temple-name queries, plus generic `temples in himalayas` / `himalayas temples` / `temples in mountains` / `temples on mountains` / `temples in the himalayas` / `himalayan temples` |
| Query count | **~60 of the site's 104 total queries** |
| Existing URL | `/temples` |
| Impressions (this URL) | 151 (the site's #2 page after the homepage) |
| Clicks | 0 |
| Avg position | 54.7 |
| Root cause of the 0 clicks | `/temples` (`app/temples/page.tsx`) hardcodes **six** temples. Google is topic-matching the page to ~60 temple names it doesn't contain, because there is no better Pahari-devta editorial source on the web for most of these. Position 54.7 reflects "roughly the right topic, wrong specific answer" |
| Recommended action | Expand `/temples` (or split into a temple-per-entry structure) to cover the specific named temples already showing impressions, written to the same `verificationStatus`-gated, named-source standard as chapters (`local-verification-editor` gate applies — several of these are devta/mythology claims). Do **not** invent facts about temples not yet researched; add only what can be verified or clearly hedge as unverified per `CLAUDE.md` |
| Priority | **P1** — highest genuine content ROI in the dataset, but content-quality-gated, not a quick copy fix |

### Cluster B — Ranking destination content (already working, deepen it)

| Query | Impr. | Position | Page | Action | Priority |
|---|---|---|---|---|---|
| `mural danda trek` | 14 | 10.6 | `/chapters/mural-danda-trek` | Chapter has no `trackType` set (per main-site audit §4) and no `metaDescription`. Fix metadata; this is the single clearest "almost page 1" destination query on the site | **P1** |
| `pahadi yatra` | 3 | 10.0 | homepage / `/chapters/kasol-weekend` (thematically closest, not targeted) | No dedicated content; low volume, low priority to chase directly, but confirms "yatra" framing resonates | P3 |
| `kheerganga history` | 1 | 11.0 | `/chapters/kheerganga-buni-buni-pass` (indirect) | Chapter's `overview` field (the answer-first block) never renders in HTML (main-site audit §4) — this query is exactly what that field would answer if shown. Fixing the render unblocks this query for free | **P1** (rides on main-audit fix #9) |
| `kheerganga story` | 1 | 13.0 | `/stories/kheerganga-fire-and-water` (pos 9.1) | Already the right page, already reasonably placed. No action needed beyond general story-page health | P3 |
| `treks near me` | 1 | 19.0 | none specific | Not a chaseable query (too generic/local-intent, no page can target it honestly) | Not recommended |
| `mountain treck` / `free trks` | 1 each | 7–10 | none | Misspellings of generic intent, ignore | Not recommended |

### Cluster C — Folklore / mythology (thin but present, matches brand identity)

| | |
|---|---|
| Representative queries | `himalayan folklore` (4 impr, pos 11.5), `folktales of himachal pradesh` (3, 56.7), `folk tales of himachal pradesh` (2, 51.5), `traditional folk stories` (1, 1.0 — single impression, unreliable), `himalayan legends` (1, 10.0), `himalayan mythology` (1, 51.0) |
| Existing URL | `/folklore` |
| Impressions (this URL) | 42 (apex) + 66 (www legacy) |
| Current issue | Per master audit: `/folklore` has no unique meta description (inherits the sitewide default) and no dedicated OG image (hotlinked Pinterest fallback) |
| Recommended action | Fix `genPageMetadata` (main-audit fix #6) before any content expansion — the page is already earning impressions it can't convert on CTR alone. Content-wise, this is squarely on-brand (`local truth`, `sacred not scenic`) and worth deepening once metadata is fixed |
| Priority | **P1** for the metadata fix, **P2** for content deepening |

### Cluster D — Brand-name confusion (real volume, wrong intent — do not chase)

| Representative queries | Impr. | Note |
|---|---|---|
| `pahari`, `pahari path`, `pahadi log`, `pahariyan`, `phaari`, `paharai`, `phahari`, `paharita`, `pahari log`, `pahari website`, `pahari culture`, `pahari hut`, `patiyayatri`, `यात्री`, `mountain yatri`, `temple yatri` | 36+36+6+2+1+1+1+1+3+2+2+1+4+1+1 | Combined, this is the largest impression cluster (>95 impressions) and the site's only real click-through (`pahari`, 2 clicks, 5.6% CTR) |

**Do not build content chasing these.** Most of this traffic is people searching for the Pahari *language/ethnic identity*, not the brand. The 2 clicks on `pahari` are the exception — that's actual brand discovery working as intended. No action needed beyond continuing to exist under a clear brand name; this is not a content gap, it's homonymy.

### Cluster E — Founder's target destination list vs. actual query demand (reality check)

The founder's brief lists 20+ destinations to prioritize (Manali, Shimla, Spiti, Parvati Valley, Kasol, Malana, Kheerganga, Tirthan Valley, Jibhi, Dharamshala/McLeod Ganj, Kangra, Kinnaur, Sangla, Chitkul, Mandi, Parashar Lake, Churdhar, Jalori, Shikari Devi, Sarahan). **None of these destination names appear as a query in the current GSC data at all**, except indirectly through `mural danda trek` (Shimla district) and the Kheerganga/temple clusters above. This is expected at 1,100 total impressions and is not evidence those destinations lack demand — it means the site does not yet have enough indexed, ranking content on them to register impressions. Treat the destination cluster plan in `PAHARI_YATRI_SEO_MASTER_AUDIT.md` §5 (content gap table) as the operative guide here, not this query table — this table can only tell you what's already ranking, not what should exist.

---

## 2. Portal (app.pahariyatri.com) — structural plan, not measured data

GSC has nothing to report: 0 sitemaps submitted, 0 processed queries, 0 processed pages. The founder's brief lists target portal queries (`verified homestays in Himachal`, `local guide in Parvati Valley`, `taxi from Kasol to Barshaini`, `homestay in Kalga/Pulga/Tosh`, `local guide for Kamrunag`, `Mandi local travel support`, `list your homestay Himachal`, `join as local guide Himachal`). These map structurally to the `/explore/{destination}/{activity}` pages that already exist in code (~90 URLs, 9 destinations × 10 activities) — but per the portal audit, **every one of those pages currently serves 69 characters of visible text and canonicalizes to the homepage**, so none of them can earn any of this demand today regardless of which keywords are targeted.

| Recommended action | Priority |
|---|---|
| Do not plan portal keyword targeting yet. Fix rendering + canonical (portal audit P0-A, P0-B) first — a keyword plan against pages Google cannot read is wasted work | **Sequencing note, not a content task** |
| Once P0-A/B land and the sitemap is submitted (P0-F), re-pull GSC after 4–6 weeks and build a real portal opportunity map against actual impressions | **P1, deferred** |
| The founder's listed query set is a reasonable structural starting point for the `/explore/{destination}/{activity}` matrix once it's crawlable — but confirm actual homestay/guide/taxi supply exists per destination before writing pages, per the portal's own "no doorway spam" rule | **P2** |

---

## 3. High-impression / zero-click pages (both properties)

| URL | Impressions | Clicks | CTR | Position | Read |
|---|---|---|---|---|---|
| `/temples` | 151 | 0 | 0% | 54.7 | See Cluster A — biggest single opportunity |
| `www.pahariyatri.com/` (legacy) | 431 | 4 | 0.9% | 8.7 | Legacy www host, decaying post-redirect fix — monitor, don't act |
| `/chapters/mural-danda-trek` | 30 | 0 | 0% | 11.1 | See Cluster B |
| `www.pahariyatri.com/journal` | 17 | 0 | 0% | 19.9 | Low volume, not urgent |
| `www.pahariyatri.com/community` | 26 | 0 | 0% | 4.7 | Good position, 0% CTR — check title/description appeal, low volume to prioritize yet |
| `/films` | 22 | 0 | 0% | 4.0 | Good position, 0% CTR — same note as above |

---

## 4. Priority summary (cross-referenced with the master audit)

| Priority | Action | Depends on |
|---|---|---|
| P0 | None in this file — the P0s are all technical (200-on-404, blocked AI crawlers, fabricated schema, hidden H1) and live in the master audit, not here | — |
| P1 | Expand `/temples` with verified content on the ~60 already-searched temple names | `local-verification-editor` gate |
| P1 | Fix `mural danda trek` chapter metadata (`trackType`, `metaDescription`) | Master audit fix #13 |
| P1 | Render chapter `overview` field so Kheerganga/Kamrunag/etc. answer-first content is visible to Google | Master audit fix #9 |
| P1 | Fix `/folklore` and other hub-page metadata (no unique description, hotlinked OG image) | Master audit fix #6 |
| P2 | Deepen folklore/mythology content | After P1 metadata fix |
| P2 | Build the portal `/explore` keyword plan against founder's target queries | After portal P0-A/B/F ship and 4-6 weeks of real GSC data exist |
| P3 | Chase brand-confusion queries | Not recommended — wrong intent |
