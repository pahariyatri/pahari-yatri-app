# Social & Content Strategy — Pahari Yatri

**Date:** 2026-09-09
**Status:** plan and drafts only. Nothing here is published, scheduled, or sent.
**Built from:** existing `instagram-shorts-strategist`, `linkedin-brand-strategist`, `reddit-community-researcher`, `chapter-editor`, `seo-research-strategist`, `local-verification-editor`, `reputation-local-trust-agent`. This document **coordinates** those standards; it does not replace or re-invent any of them.

---

## 1. Positioning

**Pahari Yatri is a Himalayan knowledge and community platform. It is not a travel agency.**

The product is a library: Books, Chapters, and many Stories from different people. Growth is measured in engagement, Instagram reach, YouTube Shorts reach, organic Google traffic, and Yatri Circle signups. It is not measured in bookings, because there is nothing to book.

| We are | We are not |
|---|---|
| A story library about the Himalayas | A tour operator |
| A place to understand before you go | A place to book what you go on |
| Local truth, named or honestly hedged | Mystification and secrets |
| Yatri | Tourist |

**Local Connect does not exist.** It is a future intent. It is stated as intent, never as a product, on every platform, in every message, without exception.

**Live positioning conflict, flagged in the audit and unresolved:** two of the site's three top-ranking pages currently present the brand as a trekking operator (`/apply` → "Join a Pahari Yatri Himalayan Trek"; `/about` → "Trekking & Spiritual Yatras in the Himalayas"), and a third-party directory lists it as a Solan trekking company. Every plan below assumes the library positioning. If the founder intends to actually run guided treks, this strategy needs revisiting before execution, not after.

---

## 2. The one identity, and the bio pack

Every platform agrees on these four lines:

- **Identity:** Yatri, not tourist.
- **Description:** Himalayan stories, sacred places, local culture and responsible travel from Himachal and the Indian Himalayas.
- **CTA:** Join the Yatri Circle / Read the latest chapter.
- **Voice:** sacred not scenic, local truth, understand before you visit, travel slower.

### Instagram bio — replacement draft (needs founder approval to publish)

**Current, live 2026-09-09:**
> Not tourism. A movement of Yatris 🌿 Hidden valleys, sacred lakes & secret trails. Limited journeys guided by Himalayan…

Three banned phrases (`hidden valleys`, `secret trails`, `limited journeys`) plus manufactured scarcity plus a contradiction with its own first line.

**Proposed:**
> Pahari Yatri
> Yatri, not tourist.
> Himalayan stories, sacred places, and what a place asks of you before you arrive.
> Himachal and the Indian Himalayas.
> New chapter ↓

Link in bio moves off the homepage. Per the standing rule, Instagram sends people to a **chapter**, tagged:

```
https://pahariyatri.com/chapters/{slug}?utm_source=instagram&utm_medium=bio&utm_campaign={campaign}
```

Lowercase throughout. An untagged link is an untracked link and `reel_source_visit` will not fire.

Full cross-platform bio pack: run `/social-copy-pack`, which already exists and owns this output.

---

## 3. The weekly cross-platform content engine

One chapter is the root of the week. Everything else is that chapter, refracted.

| Channel | Volume | Owner | Role |
|---|---|---|---|
| Instagram Reels | 5/week | `instagram-shorts-strategist` | Primary reach |
| YouTube Shorts | 5/week (reposts, within 48h) | `instagram-shorts-strategist` | Second discovery surface |
| Facebook | 3/week (adapted reposts) | repost layer per CLAUDE.md §5 | Trust, older audience, Meta infrastructure |
| LinkedIn | 3/week total = **1 founder + 2 company** | `linkedin-brand-strategist` | Credibility, partners |
| Reddit | 2 discussions/week | `reddit-community-researcher` | Listening. Replies only when genuinely useful |
| Long-form chapter | 1/week | `chapter-editor` + `local-verification-editor` | The actual asset |

### Two reconciliations, stated plainly rather than silently applied

**1. Instagram: the founder asked for 5 Reels/week. The existing `instagram-shorts-strategist` cadence rule is 4/week.** Going to 5 is an increase in volume, not a change in standard: the four defined weekly slots stay exactly as they are, and the fifth is an additional slot. The existing collapse rule still governs — **if a week falls apart, ship slots 2 and 3 and drop the rest**, because those two carry the brand.

| Slot | Type | Purpose |
|---|---|---|
| 1 | Place / trail | Reach |
| 2 | **Local truth** | Differentiation — never dropped |
| 3 | **Culture / folklore / temple** | The moat — never dropped |
| 4 | Yatri lesson | Filter |
| 5 | **NEW: Voice of Himalaya** | Credibility — a real person, see §6 |

Slot 5 is deliberately the new one, because it is the only slot whose supply the brand does not yet have (see §6 and the audit's §10). It ships when a real consented voice exists and **is left empty when one does not**. An empty slot 5 is correct. A fabricated slot 5 is a trust incident.

**2. LinkedIn: the founder asked for 3 posts/week. The existing `linkedin-brand-strategist` rule is 1 post per week, drafts only.** These are not compatible as written, so this is not silently overridden. **Reconciliation: 1 founder post + 2 company-page posts = 3 per week.** The existing 1/week cap is a rule about the *founder's personal voice*, which is scarce, specific, and loses credibility when mass-produced. It stays capped at 1. Company-page posts are a different surface with a different voice and are not covered by that cap. Detail in `LINKEDIN_PLAN.md`.

### The weekly rhythm

| Day | Action |
|---|---|
| Mon | Chapter of the week chosen. `seo-research-strategist` confirms the query. `local-verification-editor` gates any cultural claim before anything is drafted. |
| Tue | Chapter drafted/upgraded by `chapter-editor`. Reels 1–2 scripted. |
| Wed | Reels 3–4 scripted. Company LinkedIn post 1 drafted. |
| Thu | Reddit listening pass. Founder LinkedIn post drafted. |
| Fri | Facebook adaptations. Shorts reposts queued with their own UTMs. |
| Sat | Voice of Himalaya outreach — founder sends personally, per `OUTREACH_SYSTEM.md`. |
| Sun | Measurement: 24h/72h/7d bars on last week's Reels. |

Nothing on this calendar auto-publishes. Every item is a draft handed to the founder.

### Per-item content spec

Every content item in this system, on every channel, carries all seven fields. An item missing any of them is not ready:

**hook · story angle · caption · visual idea · CTA · SEO keywords · hashtags**

Worked examples for all five Reels are in `INSTAGRAM_REELS_PLAN.md`.

---

## 4. AI / answer-engine and social SEO

### The honest framing

This section **documents and extends standards this repo already has**. It does not invent an "AEO strategy". The chapter standard already in force — real facts, hedged claims, named sources, FAQs pulled from People-also-ask, internal links, local perspective — is *already* what answer engines reward. The work is applying it consistently and adding author identity, which is the one genuine gap.

What LLM answer engines and AI Overviews actually surface: specific, attributable, factual passages that directly answer a question. `kamrunag-the-lake-of-oaths.yaml` already contains "3,334 m (10,938 ft)", "Dev Kamrunag, the rain god of Mandi", "the Saranahuli fair", and "~6 km one way from Rohanda". Those are extractable answers. A poetic paragraph is not.

### Target keywords the founder named

| Target | Assessment | Existing asset | Action |
|---|---|---|---|
| Himachal travel guide | High volume, high competition, low intent match. Aggregator-owned. | none | **Do not chase directly.** Win the specific queries first. |
| Parvati Valley villages | Strong match. Competitive but the framing is open. | `understanding-parvati-valley`, `kalga-slow-mountain-life`, `pulga-forests-and-silence`, `tosh-village-above-the-valley`, `tulga-the-forgotten-neighbour`, plus a published book | **P1.** The assets exist. Interlink them and lead with "inhabited villages with rules". |
| Kasol hidden places | **Contains banned language.** | `kasol-weekend` | Target the *intent*, never the wording. The standing rule: never put a banned phrase in a title, meta, or anchor text even when it is the exact query. Serve it with "Kasol is only the trailer" and the villages past it. |
| Kheerganga trek guide | Strong, high intent. | `kheerganga-buni-buni-pass`, `bunbuni-pass-trail-beyond-kheerganga` | **P1.** Needs the sacred-context angle, not another route description. |
| Kamrunag Lake story | **Best opportunity in the entire set.** Weak SERP: Wikipedia, a government page, aggregators, no editorial competitor. Confirmed again in this audit. | `kamrunag-the-lake-of-oaths`, `saroa-to-kamrunag`, plus `mirror-of-stillness` | **P0. Start here.** |
| Winter Himachal travel | Seasonal, and the season is arriving. | `winter` book (published), `solstice-snow`, `churdhar-sacred-ascent` | **P1, time-sensitive.** Build in October, not December. |

### Two structural fixes that unlock all of the above

**Title vs H1.** The H1 may be literary. The `<title>` must be literal. `kamrunag-the-lake-of-oaths` currently carries the title "Kamrunag – The Lake of Oaths", which is a beautiful H1 and an unrankable title tag. Nobody searches it. The fix is a literal `seoTitle` alongside the poetic `title` — the pattern **already exists and already works** in `books/parvati-valley-beyond-kasol.yaml`, which pairs the title "Parvati Valley, Beyond Kasol" with `seoTitle: "Parvati Valley Beyond Kasol: Villages, Trails & Culture Guide"`. Extend the pattern that is already proven in this repo rather than inventing one.

**Author identity.** Answer engines and Google's quality systems both reward identifiable authorship. Stories currently have **no author model** — `voice` is a descriptor, not a person. This is the same gap that blocks Voice of Himalaya. Fixing it once serves both. Structural work belongs to `content-architect`; it is not attempted here.

### FAQs

Pull from People-also-ask, never from imagination. Already captured for Kamrunag: *What is Kamrunag known for? · Is Khatu Shyam and Kamrunag the same? · Is the temple open today? · How far is the trek?* Those are free, real, and currently unanswered by any editorial page.

---

## 5. Reddit

Listening and research. Never promotion, never astroturf, never a bare link.

Subreddits: r/himachal, r/IndiaTravel, r/travel, r/backpacking, r/solotravel.

"2 discussions per week" means **2 threads engaged with genuinely** — a reply that stands on its own with the link removed, or more often no reply at all and a content idea instead. It does not mean 2 posts promoting the brand. Most weeks the correct output is zero replies and several FAQ ideas.

No Pahari Yatri brand mentions were found on Reddit this session. Category listening did confirm a real, recurring theme: tension between visitors and residents in Parvati Valley, including reported incidents in Kasol. That is a genuine content gap and it aligns exactly with the brand's argument. It is handled with care and with sources, not as an engagement hook.

---

## 6. "Voice of Himalaya" — series specification

The credibility series. One real person, one real place, one real thing they know.

### The three voices

| Voice | Who | What makes it real |
|---|---|---|
| **Local voice** | Elder, temple committee member, homestay host, guide, shopkeeper, shepherd | Named, consented, from that place. Gated by `local-verification-editor`. |
| **Traveller voice** | A yatri who actually walked it | Named or explicitly anonymous by their own choice. Never a composite presented as a person. |
| **Founder voice** | The founder | First person, own experience only. No claims about others' beliefs. |

### Every entry needs four things

**person + place + emotion + lesson.** Missing any one, it is not a Voice of Himalaya entry.

- **Person** — a real, identifiable human who agreed to this.
- **Place** — a specific, searchable place. Not "a village in the mountains".
- **Emotion** — what it actually felt like. This is what travels on Instagram.
- **Lesson** — what the place asks of a visitor. This is what makes it Pahari Yatri.

### Sourcing rules — non-negotiable

1. **Named source, or explicitly hedged, or omitted.** Same standard as chapters.
2. **No fabricated testimonials.** Ever, on any platform, for any reason.
3. **Consent is captured before drafting**, and it covers: how the story is used, whether their name appears, and their right to stay anonymous or withdraw.
4. **"Verified local" is a promise.** It is never attached to a contributor whose local status has not actually been confirmed.
5. Any devta, temple, ritual or belief claim goes through `local-verification-editor` before it exists in a draft, not before it publishes.

### The blocker, stated honestly

**The existing 28-story library cannot supply a single Voice of Himalaya entry.** Not one story carries a named human source. Eight are correctly labelled editorial composites; the other twenty read as real interviewed individuals but are not labelled as anything. See the audit §10.

So the series **starts from outreach, not from the archive.** `OUTREACH_SYSTEM.md` is the supply chain for this series. Until a first real consented voice exists, Reel slot 5 stays empty and that is the correct outcome.

### The structural bonus

`chapters.relatedStories` is already an array. Many stories per chapter works today and has never been used — every story is 1:1 with a chapter. Voice of Himalaya is the natural first real use: three different people on `kamrunag-the-lake-of-oaths` — an elder, a yatri, the founder — costs nothing structurally and is the single clearest demonstration of what this library is that no competitor can copy.

### Cadence

One entry per week when supply exists. Zero when it does not. Supply is never manufactured.
