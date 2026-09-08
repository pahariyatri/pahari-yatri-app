# Pahari Yatri chapter template (v2)

This is the target structure for a fully-realized chapter: what already exists in the schema, what's proposed as new, and what's deliberately excluded because it's marked legacy/off-brand in `keystatic.config.ts`. It reconciles the brief's requested fields (author, location entity, region, related stories, FAQ, sources, practical information) against what the CMS actually has today — most of it already exists but is either unused in the data or unrendered on the page. See "Why this template, not a bigger rewrite" at the bottom.

## Sections, in reading order

1. **Hook** (`invitation`) — emotional, one or two sentences. Exists, working as intended.
2. **The place** (`overview`) — 2-4 plain paragraphs: where it is, why it matters, what makes it different. Exists. Currently reaches the page only via JSON-LD, not visible text — flagged as a known gap in `PAHARI_YATRI_CONTENT_AUTHORITY_REPORT.md`, not fixed by this template.
3. **The journey** (`narrative`) — first-person, the site's core voice. Exists, working as intended.
4. **Practical information** (`distance`, `maxAltitude`, `bestTime`, `gettingThere`) — **exists in every chapter's data and in the schema, but is never rendered anywhere on the live page or in JSON-LD.** This is the single biggest gap this template fixes: real data that's been sitting unused since these fields were written. Do **not** revive `duration`, `difficulty`, or `itinerary` — the schema explicitly marks these LEGACY / "off-brand" (2026-08 comment), and reintroducing them would undo that decision.
5. **Local truth** (`localTruth`) — exists in schema, blank in most chapter data files today. This is the field that should carry "what a Yatri should understand before going" — currently that idea lives informally inside `narrative` instead.
6. **FAQ** (`faqs`) — exists, rendering correctly. Keep to 3, genuinely different questions — not keyword variations of one question.
7. **Sources** (proposed new field, see schema section) — a short, public-facing "what this chapter draws on" list, distinct from the existing `sourcesToVerify` (which is an internal to-do list of who still needs to confirm a claim, not a citation list for readers/AI crawlers).
8. **Related chapters / stories** (`relatedChapters`, `relatedStories`) — exist, rendering correctly once populated (see this session's earlier internal-linking commits).
9. **Author** (proposed new field on Chapters, see schema section) — who wrote or verified this chapter. Chapters currently have no author field at all; only Stories do (`authorName`/`authorType`, added 2026-08, still at 0/20 populated).
10. **Location entity** (proposed new field, see schema section) — structured coordinates so the existing JSON-LD `Place` gets real `GeoCoordinates` instead of a name-only Place.

## What this template does NOT add

- No itinerary/day-by-day structure — explicitly marked off-brand in the schema.
- No "what's included/excluded/packing" — legacy package-tour fields, explicitly marked do-not-fill.
- No new content model layer (the brief's illustrative "Chapter → Place → Stories → Traveller Experiences → Local Voices" nesting). The real schema already separates these as Chapter ↔ Story (via `relatedStories`) and Chapter ↔ District/Region (via relationships) — restructuring that would be a content-architecture change requiring `content-architect` sign-off, not a template change.

## Why this template, not a bigger rewrite

Every field above already exists in `keystatic.config.ts` except the three proposed in the next message (author-on-chapters, sources, coordinates). The actual problem this template solves is **render and population gaps, not a missing schema** — five of nine requested improvements (region, relatedStories, FAQ, sources-as-a-concept, practical information) already have a home in the CMS; they're either empty in the data or dropped by the page template. Adding a parallel set of new fields on top of unused existing ones would make the drift worse, not better.
