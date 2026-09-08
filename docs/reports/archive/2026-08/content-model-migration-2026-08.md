# Content model migration — August 2026

Status: Loops 1 and 2 complete. Loop 3 (primary books) prepared, not executed.

This documents the move from the seasonal/package-tour content model to the
**Book → Chapter → many-Stories** architecture, and the recovery of content that
had been invisible to the site.

---

## The architecture

```
Book      a region, theme or circuit (e.g. Sacred Mandi)
 └─ Chapter    ONE real, searchable place (a lake, temple, village, pass)
     └─ Story      one person's experience of that place
     └─ Story      a different person, a different voice
     └─ Story      …
```

Two rules keep this from drifting:

1. **A Chapter must name a real place.** If a piece has no searchable place, it
   is a Story or a Library piece — never a Chapter. Place names are never
   invented to make something rank.
2. **A Story's book is derived, never stored.** See below.

---

## Loop 1 — additive schema (complete)

All fields added in this loop are **optional**. Nothing was made required,
nothing was renamed, nothing was removed. Existing entries continue to validate
and render unchanged.

### Books (`data/books/*.yaml`)

| Field | Purpose |
| --- | --- |
| `thesis` | The one-line argument the book makes. |
| `bookType` | `primary` (main navigation) or `seasonal` (secondary filter). Defaults to `seasonal`. |
| `region`, `description`, `priority` | Editorial planning. |
| `seoTitle`, `metaDescription`, `cta` | Search + one CTA per book. |

`invitation` is **kept as-is** for backward compatibility. `thesis` was added
alongside it rather than renaming it. A migration from one to the other can
happen later, deliberately.

### Chapters (`data/chapters/*.yaml`)

| Field | Purpose |
| --- | --- |
| `parentBook` | Which book this chapter belongs to. **The single source of truth for the hierarchy.** |
| `place`, `trackType`, `region` | What real place this is. Blank `place` usually means this should be a Story. |
| `targetKeyword`, `secondaryKeywords`, `seoTitle`, `metaDescription` | Search. The H1 can stay literary; these must be literal. |
| `localTruth` | The thing a tourist would not know. |
| `verificationStatus`, `sourcesToVerify` | Cultural safety gate — see below. |
| `migrationStatus` | `settled` / `needs-founder-review` / `should-be-story`. |
| `reelHook`, `cta`, `relatedChapters` | Distribution and internal linking. |

### Stories (`data/stories/*.mdx`)

`authorName`, `authorType`, `storyType`, `verificationStatus`, `place`,
`migrationStatus`, `cta`.

**`authorName` is optional and stays optional for now.** Existing stories may
leave it blank. It exists because one Chapter holds many Stories from different
people — three stories under one chapter only work if they carry three
different names, otherwise it reads as one writer repeating themselves.

`voice` (an unnamed descriptor, e.g. "a product manager from Gurgaon, 34") is
retained and is distinct from `authorName` (an actual attributed person).

### Legacy package-tour fields

`duration`, `difficulty`, `itinerary`, `included`, `excluded`, `packing` are
**relabelled `(legacy)` and documented as such — not deleted.** Existing data is
untouched and still renders. They should not be filled for new content.

---

## `relatedBook` is derived, not stored

There is deliberately **no `relatedBook` field on stories**. The book is
computed:

```
story.relatedChapter → chapter.parentBook → book
```

Implemented in `lib/keystatic/stories.ts`:

- `getBookForStory(slug)` — one story
- `getBooksForStories(slugs)` — batched; reads each chapter and book once
  regardless of how many stories share them
- `getBookForChapter(slug)` — the underlying hop

Storing the book on the story would let it drift: move a chapter into a
different book and every story underneath would silently keep pointing at the
old one. Deriving it means exactly one place decides the hierarchy — the
chapter — so books can be reorganised without touching a single story.

`null` means "not placed in a book yet". That is a normal state, not an error.

### Backfill performed

`chapter.parentBook` was empty on all 24 chapters while `book.relatedChapters`
was fully populated, so the chain was broken in the middle. `parentBook` was
backfilled from the existing book→chapter mapping: 23 of 24 chapters, no
conflicts (no chapter was claimed by two books), no invented data.

`pin-bhaba-pass` was **left blank on purpose** — no existing book claims it. It
is a high pass and belongs to *The High Passes*, which does not exist yet
(Loop 3). Its story `bhaba-moon-road` therefore derives `null` until then.

---

## Loop 2 — recovering invisible content (complete)

### The bug

Keystatic collections are configured as `path: "data/destinations/*"` — a
**flat file per entry** (`data/destinations/manali.mdx`). But 16 entries had
been written in **directory format** (`data/destinations/manali/index.yaml` +
`content.mdx`), which that path never matches.

Verified by probe: a directory-format entry added to `data/destinations/` does
not appear in `reader.collections.destinations.list()` at all.

Several of those `index.yaml` files were also malformed — they contained the
frontmatter *and* the markdown body in one file separated by `---`.

**Consequence: 16 pages were hard 404s.** They were absent from the sitemap,
absent from the site, and had never been indexed.

### The fix

All 16 converted to the flat `.mdx` format the config actually reads. Content
preserved byte-for-byte (verified by comparing old `index.yaml` + `content.mdx`
against each new file).

Two files additionally needed a YAML fix — an unquoted title containing a colon
is invalid YAML and broke the build once the files became visible:

```yaml
title: Kinnaur: Beyond the Pass Reality      # invalid
title: "Kinnaur: Beyond the Pass Reality"    # fixed
```

### URLs recovered (16)

13 destinations, previously 404 → now 200:

```
/himachal/travel-guide/{bilaspur, chamba, hamirpur, kangra, kinnaur, kullu,
 lahaul-spiti, manali, mandi, shimla, sirmour, solan, una}
```

3 stories, previously 404 → now 200:

```
/stories/kinnaur-beyond-the-pass-reality
/stories/tirthan-the-slow-valley-reflections
/stories/why-locals-avoid-manali-in-peak-season
```

**No redirects were needed.** No URL changed — these paths never resolved
before, so this is purely additive recovery. Nothing was de-indexed.

The three recovered stories were backfilled as editorial per the approved
default: `authorName: Pahari Yatri Editorial`, `authorType: editorial`,
`storyType: reflection`, `verificationStatus: unverified`.

---

## Cultural safety

`verificationStatus` exists on both chapters and stories and defaults to
`unverified`. It **does not block publishing** yet — it marks claims for audit.

Devta, temple, mythology and ritual claims must not be stated as fact until a
named local source confirms them. Travel blogs are not sources. Anything
touching these should surface a warning in QA rather than being quietly
published or rewritten as fact.

---

## Verification results

| Check | Result |
| --- | --- |
| `tsc --noEmit` | clean |
| `next build` | exit 0, no prerender errors |
| Sitemap URLs | 86, **all return 200** (no soft-404s) |
| Recovered URLs | 16/16 serving real content |
| Live campaign URLs | `parashar-lake-trek`, `kamrunag-the-lake-of-oaths`, `saroa-to-kamrunag` — all 200, unchanged |
| Story→book derivation | 16/20 resolve; 4 nulls are correct and explained above |
| App/component files changed | none — no redesign |
| Content deleted | none |

---

## Loop 3 — prepared, awaiting execution

The seven primary books to create (`bookType: primary`):

1. Sacred Mandi
2. Parvati Valley Beyond Kasol
3. Manali Beyond Mall Road
4. Dharamshala, Triund & Bir
5. Shimla–Solan Slow Belt
6. Yatri Code
7. The High Passes — approved as the seventh book. High-pass treks stay here
   and are **not** folded into Shimla–Solan.

The four existing books (`lost-trails`, `monsoon`, `summer`, `winter`) stay as
**secondary seasonal collections/filters**. They are not deleted and keep
`bookType: seasonal`.

Notes for that loop:

- `coverImage` is currently `isRequired` on books, so each new book needs an
  image before it will validate.
- Creating a book publishes a public `/books/{slug}` page. Seven empty books
  appearing in navigation is a public-surface change and should be confirmed
  before it ships.
- Chapters will need reassigning from seasonal books to primary ones. Because
  `parentBook` is the single source of truth, that is a one-field edit per
  chapter and stories follow automatically.
- `pin-bhaba-pass` should get `parentBook: the-high-passes`.
- Poetic chapters with no real searchable place (candidates:
  `cloud-forest-paths`, `meadow-walks`, `mist-valleys`, `rain-prayer`,
  `river-sutra`, `sunlit-passes`, `echoing-caves`, `shepherds-path`,
  `solstice-snow`) should be triaged with `migrationStatus:
  needs-founder-review` rather than deleted or forced into an SEO chapter.
