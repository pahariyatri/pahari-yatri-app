# Parvati Valley — Beyond Kasol: Book Plan

Date: 2026-09-08. Status: book launched, 3 chapters live (one new, two reparented), 11 chapters planned but not yet written. Companion: `docs/audit-evidence/research-record-parvati-valley.md` (research notes, addendum added this session).

---

## 1. Core concept

Thesis: **Kasol is the entrance, not the destination.** Most travel content collapses "Parvati Valley" into "Kasol" — this book's entire reason to exist is treating that as a category error and giving the villages past it their own identity, the way this library already treats every place: verified fact separated from local belief, nothing published without research behind it.

## 2. A structural decision made before writing anything

Two of this outline's requested chapters — **Kasol** and **Kheerganga** — already exist as published, indexed chapters in the Monsoon book (`kasol-weekend`, `kheerganga-buni-buni-pass`), the second one already fully upgraded to this project's current template (author/sources/keywords/practical-info) two sessions ago. Writing new "Kasol" and "Kheerganga" chapters for this book would have created duplicate content competing against pages that already have search visibility — directly against this project's own rule against duplicate pages for the same subject.

**What I did instead:** reparented both existing chapters into the new book (removed them from Monsoon's `relatedChapters`, added them to this book's) rather than forking them. This preserves whatever SEO equity those URLs have and avoids the exact "dual book membership silently reparents to whichever book sorts alphabetically first" bug this project's own architecture audit already documented. Monsoon now holds 5 chapters instead of 7 (`cloud-forest-paths`, `rain-prayer`, `mist-valleys`, `jalori-lake-trek`, `parashar-lake-trek`) — a real change to an existing book's composition, done under this session's direct instruction to build this book with Kasol and Kheerganga as chapters in it. Flagging it explicitly rather than treating it as a silent side effect.

I also found and fixed a live problem while researching Kheerganga for this book: **overnight camping there has been banned since July 2024** (Himachal Pradesh Forest Department, High Court directive) — the published chapter still described a 2-day/1-night itinerary. Fixed in the same pass (commit `c48c0eb`).

## 3. Chapter outline and publishing status

Per this project's own rule: publish where research clears the bar, placeholder-with-honesty where it doesn't, never invent to fill a gap. Status reflects what's actually been researched this session, not what would be nice to have.

| # | Chapter | Status | Notes |
|---|---|---|---|
| 1 | Parvati Valley — Beyond the Crowd | **Published** (`parvati-valley-beyond-the-crowd`) | New chapter, introduces the whole valley, sourced Kasol history. |
| 2 | Kasol — The Gateway, Not the Destination | **Published** (reparented `kasol-weekend`) | Existing chapter, enhanced with sourced history and SEO fields, not rewritten. |
| 3 | Chalal — The First Step Away | **Not published — partial coverage exists** | Already described inside `kasol-weekend`'s narrative (real content, not fabricated). Not enough independent research for a standalone chapter yet. |
| 4 | Kalga — Where Time Moves Slowly | **Researched, not yet written** | First-pass research exists (`research-record-parvati-valley.md`): altitude, village size, economy. Needs a second source before some specifics (crowd-season claim) are stated as fact. |
| 5 | Pulga — Forests, Waterfalls and Silence | **Researched, not yet written** | Same file; altitude and the "Hummus Trail" phenomenon sourced across three independent outlets. |
| 6 | Tosh — The Famous Village Above the Valley | **Researched, not yet written** | Altitude, history, and cultural-character claims sourced; the "Tibetan influence" claim specifically flagged as needing a second, more authoritative source. |
| 7 | Kheerganga — The Hot Spring Trail | **Published** (reparented `kheerganga-buni-buni-pass`) | Fully templated, legend hedged, camping-ban corrected this session. |
| 8 | Bunbuni Pass — The Trail Beyond Kheerganga | **Not published — partial coverage exists** | Currently a route variant inside the Kheerganga chapter, not researched as its own place. |
| 9 | Grahan — The Village That Protects Its Traditions | **Researched, not yet written — one claim held** | Altitude, deity, temple architecture sourced. The "only alcohol-free village in India" / "zero cell signal" superlatives are **not independently verified** — repeated across travel blogs, not confirmed by any government or ethnographic source found. Do not publish those two claims as fact; hedge as "widely reported" or omit. |
| 10 | Rasol — The Remote Mountain Village | **Not published — partial coverage exists** | Same situation as Chalal: real content already inside `kasol-weekend`, not yet researched as a standalone place. |
| 11 | Malana — Between Myth and Reality | **Researched, not yet written — two claims held** | Location, language (Kanashi), and self-governance structure sourced. "Possibly the oldest democracy in the world" and the Alexander's-army origin story are explicitly flagged unverified even by the sources reporting them — see the research file's "handle with extra care" section. "Malana Cream" is out of scope entirely; a responsible-travel chapter has no reason to describe a controlled substance. |
| 12 | Waichin Valley — The Meadow Above | **Not researched** | Zero searches done this session. Honest placeholder only if published before research happens. |
| 13 | Magic Valley / Lesser Known Trails | **Not researched** | Same. This is also the vaguest brief of the fourteen — "lesser known trails" isn't a single place, and per this project's own no-doorway-spam rule, this should probably become 2-3 named trail chapters once specific routes are researched, not one catch-all page. |
| 14 | Sar Pass and Trekking Culture | **Not researched** | Zero searches done this session. |

**Recommendation:** continue chapter by chapter in roughly this order — Kalga and Pulga next (already researched, geographically adjacent, natural pair), then Tosh, then Malana (needs the most editorial care of the three), then a second research pass for Chalal/Rasol/Bunbuni Pass (upgrading existing partial coverage rather than starting cold), and only then Grahan, Waichin Valley, Sar Pass, and the "lesser known trails" question — which should be resolved as "which specific trails" before any writing starts.

## 4. SEO keyword map

| Chapter | Primary keyword | Supporting keywords |
|---|---|---|
| Parvati Valley — Beyond the Crowd | parvati valley travel guide | parvati valley villages, beyond kasol, villages near kasol |
| Kasol | kasol travel guide | kasol to kheerganga, chalal kasol, parvati valley villages |
| Kheerganga | kheerganga trek | kheerganga hot spring, buni buni pass, kheerganga history, parvati valley trek |
| Kalga (planned) | kalga village guide | kalga homestay, kalga to kheerganga, apple village parvati valley |
| Pulga (planned) | pulga village guide | pulga trek, hummus trail parvati valley, kalga pulga tosh |
| Tosh (planned) | tosh village guide | tosh himachal, last village parvati valley |
| Malana (planned) | malana village guide | malana himachal, jamlu devta, malana culture (do not target "malana cream" — out of scope) |

**Reality check on this table, per `LIBRARY_SEO_AUDIT.md`'s and `CONTENT_AUDIT.md`'s prior findings:** none of these terms currently show measurable demand in the site's real GSC export (checked earlier this session — zero "kasol," "parvati valley," "kalga," "pulga," "tosh," or "malana" queries in 105 real rows). This book is an evergreen-authority bet, not a response to existing search demand. Worth continuing anyway — new content can't have impressions before it exists — but don't expect a ranking move on the timeline the temple cluster or Mural Danda Trek could plausibly deliver.

## 5. Research notes

See `docs/audit-evidence/research-record-parvati-valley.md` — covers Kalga, Pulga, Tosh, Malana (first pass, this session's earlier turn) and Kasol, Grahan, the Kheerganga camping-ban correction (addendum, this turn). Every claim is labeled VERIFIED FACT / LOCAL TRADITION / UNVERIFIED CLAIM with a source. Chalal, Rasol, Waichin Valley, Magic Valley trails, Sar Pass, and Bunbuni Pass are explicitly marked as under-researched — do not treat their brief mentions inside other chapters as equivalent to a research pass on the place itself.

## 6. Book experience — reading flow, reconciled against the real schema

The brief's flow (`Book → Chapter → Place → Stories → Related places`) doesn't map onto a fourth "Place" layer inside a chapter — that layer doesn't exist in this codebase's content model (confirmed in `CHAPTER_TEMPLATE.md` earlier this session). The real flow is:

```
Book (Parvati Valley — Beyond Kasol)
  → Chapter (one real, nameable place — a village, trail, or the valley itself)
      → relatedStories (human perspectives on that specific chapter)
      → relatedChapters (sideways links to other places in the valley)
      → parentBook backlink + next-chapter navigation
      → district hub backlink (Kullu)
```

This is already fully wired for the 3 live chapters — verified live this session (breadcrumbs, related-chapter links, and parent-book resolution all confirmed correct against a production build).

## 7. "Become a Yatri" CTA — review, as requested

Current state (checked this session): "Begin as a Yatri" / "Become a Yatri" links to `/apply`, a form that posts to a Discord webhook (`/api/discord`) — a community-application flow, not a booking or commerce flow, and not wired to `app.pahariyatri.com` at all today.

**Recommendation: keep it community-focused.** Three reasons:
1. It already matches the site's stated goal (brand awareness, community, not package-selling) and the "never force selling" instruction in this brief.
2. Redirecting it to the app-portal builder would be a real product decision (does the portal's traveller-request flow actually want raw Yatri Circle applicants?) that belongs to `portal-conversion-strategist` and needs its own review, not a one-line CTA swap.
3. `CLAUDE.md`'s own portal rules require the main site → portal bridge to be "a soft bridge, never sales pressure" — a primary CTA redirect would be the opposite of soft.

If a portal bridge is wanted, add it as a **second, clearly distinct** CTA next to "Begin as a Yatri" (e.g., "Planning a trip? Request local options →"), not a replacement — matching the cross-linking pattern `CLAUDE.md` already specifies for main-site-to-portal links.

## 8. Social media system

Per chapter, as requested — done for the 3 live chapters:

**Parvati Valley — Beyond the Crowd**
- Hook: "Everyone says they've been to Parvati Valley. Most of them mean Kasol."
- Visual sequence: Kasol's cafe strip (crowded, warm) → the road narrowing → a single uphill footpath → a village with no cafes, real orchards, real quiet.
- Voice-over: lead with the category error, not the scenery — the hook is the argument, not the view.
- Caption: soft link to the chapter, no "hidden gem" framing (explicitly banned language).

**Kasol**
- Hook: "Kasol is famous for a reason. It's just not the reason most people think."
- Visual sequence: Hebrew signage next to Hindi → a chai stall → the footbridge to Chalal → the road ending.
- Voice-over: name the real backpacker history plainly, then pivot to "and that's still not the whole valley."

**Kheerganga**
- Hook: "Kheerganga used to be an overnight. As of 2024, it isn't anymore — and that's worth knowing before you plan around outdated advice."
- Visual sequence: dawn climb → Rudranag shrine → the meadow → the hot spring, day-lit not dusk-lit (matching the corrected day-trek reality).
- Voice-over: practical-first (the ban, the timing), legend second, hedged.

## 9. What I did not do

Did not write chapters 3-14. Did not invent research for Waichin Valley, Sar Pass, or "Magic Valley" to hit a chapter count. Did not create a fourth content-model layer that doesn't exist in this codebase. Did not silently reparent Kasol/Kheerganga without explaining why, or leave them in two books at once.
