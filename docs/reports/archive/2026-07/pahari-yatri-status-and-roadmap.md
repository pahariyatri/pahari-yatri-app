# Pahari Yatri — Status, Roadmap, Brand & Social Handoff

> One document for three audiences: paste into **ChatGPT** for further planning, hand to a **developer** for the technical roadmap, and share with the **team** for brand + social direction.
> Last updated: 5 July 2026. Stack: Next.js 15 (App Router), Tailwind, shadcn/ui, framer-motion, Keystatic (local) + MDX.

---

## PART 1 — AUDIT: What has been done

### Brand & positioning shift (from "sells trips" → "teaches the Himalayas")
- Rewrote the core promise everywhere: hero, final CTA, nav, footer, SEO title/description.
- **Removed the "Yatri Pass"** concept entirely (page, form, nav item, sitemap entry, FAQ schema, webhook handler, hero link) — it read like a paid, exclusive membership funnel.
- **Removed all scarcity/sales language** — "Limited spots available", "Seats are few", "Begin Your Journey" → replaced with awareness/community CTAs: *Open the Library, Become a Yatri, Read the Yatri Code, Contribute a story, Walk with awareness.*
- New hero: **"Experience the Himalayas like a Yatri, not a tourist."** + a one-line brand explainer + dual CTAs (Open the Library / Become a Yatri).
- New closing line: **"The Himalayas are not asking to be visited. They are asking to be understood."**

### New ecosystem pages built (7)
| Route | Purpose |
|---|---|
| `/library` | The hub — front door to every shelf, shows real book/chapter/story counts |
| `/responsible-travel` | The **Yatri Code** — 8 principles for walking softly |
| `/temples` | Cultural archive — seeded with real Himachal temples (Kamrunag, Shikari Devi, Churdhar, Parashar…) linked to chapters |
| `/folklore` | Myths & legends, seeded with real Pahari tales, linked to chapters |
| `/community` | The movement page — what a Yatri is, how to join |
| `/contribute` | Working story-submission form (posts to Discord webhook) |
| `/journal` | Essays/reflections hub linking into existing content |

- New shared `PageHero` component (static, readable, gradient overlay) powers all of them.
- Navigation updated: **Library · Books · Stories · Responsible Travel · Community · About** (nav switches to a clean mobile sheet below `lg` to avoid tablet crowding). Footer now carries the full ecosystem link row.
- All new routes added to `sitemap.ts`.

### The `/apply` flow — rebuilt as a calm mobile-first "journey"
- Was a busy dashboard (gradient header, snow-cap progress bar, floating quote). Now: one question at a time, slim progress, a **visual icon guide per step**, large editorial prompt.
- Multi-choice questions became **swipe-friendly horizontal chip rows** so steps fit a phone screen without vertical scrolling.
- Fewer fields (less-is-more), compact review step, sticky thumb-reach CTA.

### Detail pages
- **Chapter detail**: replaced a fragile sticky+parallax hero (the scroll/overlay/"text overriding" bug) with a **static, always-readable hero** (strong gradient, `svh` mobile height). Added reading-progress bar, back-to-Library nav, an always-present intro (so sparse chapters aren't empty), and a **"Walk this chapter with awareness" responsible note on every chapter**.
- **Story detail**: premium long-form reading — readable hero, reading-time, drop-cap first paragraph, pull-quote, "belongs to chapter" link, "keep reading" next-story card, and a "Write your own story" CTA.

### Imagery (real photos)
- ~34 chapter/story cards previously referenced **missing image files** (broken/grey cards) — fixed.
- **4 book covers** and **25 chapter heroes** now use **real, license-free Himalayan photos** (Unsplash), mapped by theme (winter/lake/forest/dusk/sacred/summer/monsoon) and evenly distributed to avoid repetition.
- The universal fallback (`placeholder.jpg`) is now a real Himalayan photo — **no more grey placeholders anywhere**.
- Hidden Trails section: real photos + real chapter links + region/season/hook.

### Fixes & polish
- The "floating circular N" = the **Next.js dev-mode indicator** (dev only). Disabled via `devIndicators: false`.
- Fixed a low-contrast selected-state bug in the apply options.
- SEO title/description no longer lead with "Treks".

### Known limitations (be honest with the team)
- **Chapter data is sparse** — most chapters only have title/invitation/excerpt/location/theme in the CMS. Practical fields (distance, altitude, day-by-day, how-to-reach, best season) exist in the schema but are mostly empty.
- **Temples / Folklore / Journal are hard-coded seed content**, not yet CMS collections.
- **Photos are thematically-matched stock**, not the actual GPS locations. Authentic per-place photography still needed.
- **Contribute** notifies via Discord but has no moderation→publish pipeline yet.

---

## PART 2 — NEXT PLAN (prioritised roadmap)

### Phase A — Content depth (highest impact, no new code)
1. Fill 6–8 **flagship chapters** with real detail via Keystatic `/admin`: overview, best season, how to reach, day-by-day, what to respect, local insight, a longer narrative. (Fields already exist.)
2. Write **3–5 real Journal essays** (slow travel, seasons, temples, responsible travel).
3. Expand the thin MDX **stories** into fuller pieces, or seed via `/contribute`.

### Phase B — Make the archive real (CMS)
4. Add Keystatic collections for **Temples, Folklore, Contributors, Journal** (schemas drafted in `docs/brand-website-plan.md`), and convert the seeded pages to data-driven lists + `[slug]` detail pages.
5. Add relationships: chapter → temples, chapter → folklore (cross-linking + SEO).

### Phase C — Contribution & community loop
6. Turn `/contribute` submissions into a **moderation → publish** flow (Keystatic GitHub storage so non-devs can approve; or a lightweight admin).
7. Add **newsletter capture** ("get the next seasonal edition") — provider already stubbed in `siteMetadata`.

### Phase D — Craft & trust
8. **Real photography** — owned images or Unsplash API for variety; caption with location + photographer credit.
9. **Design-system pass** — lock the earthy palette into Tailwind tokens (charcoal, warm off-white, mist gray, pine, earth brown, muted gold, stone beige); typographic scale; button/card variants.
10. **SEO/schema** — per-page OG images, extend Organization/Website/Breadcrumb/Article/FAQ JSON-LD, internal-linking sweep.
11. **Perf & a11y** — image sizes, contrast audit, keyboard nav, reduced-motion; Lighthouse pass on mobile.

### Phase E — Analytics & iteration
12. Wire Umami events (CTA clicks, contribute starts, reads). Review what content pulls people deeper.

---

## PART 3 — BRAND TONE & CONTENT GUIDE (for writers / dev / ChatGPT)

**Voice:** a calm mountain guide, not a salesperson. Quiet not loud, deep not dramatic, premium not flashy, spiritual not fake, poetic but clear, educational not commercial.

**Every sentence should make the reader feel:** *slow down; learn before you travel; the Himalayas are living culture, not scenery; I can belong to this movement.*

**Use:** Open the Library · Read the Journey · Begin as a Yatri · Explore the Chapter · Walk With Awareness · Read the Trail Journal · Contribute Your Story · Learn Before You Travel.

**Avoid:** book now, limited spots, packages, deals, tour, itinerary-first framing, exclamation-mark hype, mystical fluff with no meaning, low-contrast text on images.

**One-liner:** *Pahari Yatri is a digital Himalayan library and community for people who want to experience the mountains with respect, awareness, culture, and inner purpose.*

**Taglines:** Learn the Himalayas before you travel them · Not a trip, a way of walking · A digital Himalayan library for true Yatris · Walk softly, listen deeply.

**Every page needs:** a clear purpose, an emotional hook, practical meaning, natural SEO, and one next-step CTA.

---

## PART 4 — SOCIAL MEDIA PRESENCE PLAN

**Positioning for social:** a Himalayan editorial/journal brand — calm, cinematic, cultural. Not a trip-selling travel agency. Every post teaches something.

### Handles (keep identical everywhere)
`@pahariyatri` — Instagram, YouTube, Threads, Pinterest; a WhatsApp Channel "Pahari Yatri".

### Bio (Instagram)
> Pahari Yatri — a digital Himalayan library & community.
> Trails · temples · folklore · seasons · responsible travel.
> Learn the mountains before you walk them. 🏔️
> ↓ Open the Library
> `pahariyatri.com/library`

### Platform roles
- **Instagram (primary):** Reels for reach, carousels for depth, Stories for community. Most traffic will start here.
- **YouTube:** long-form trail journals, temple/folklore mini-docs, elder voices.
- **WhatsApp Channel:** the intimate inner circle — seasonal dispatches, new chapters, quiet reflections.
- **Pinterest:** SEO/discovery engine — pin every chapter cover and story (evergreen search traffic).
- **Threads:** short reflections, folklore snippets, brand voice.

### Content pillars (rotate; ~1 idea each per week)
1. **Trail Journals** — one place, told as a chapter (carousel/reel).
2. **Temples & Folklore** — a legend, a belief, an etiquette note.
3. **Responsible Yatri Code** — one principle per post (highly shareable).
4. **Seasonal Editions** — Summer/Monsoon/Winter/Lost Trails as "book drops".
5. **Local Voices** — village stories, elders, homestays.
6. **Behind the Movement** — why we walk slowly; brand philosophy.

### Reel formats that fit the tone
- Slow cinematic B-roll + one line of text + a single quiet takeaway.
- "One rule of the mountains" (Yatri Code, 1 principle, 7–12s).
- "The story of this place in 30 seconds" (a chapter teaser → link in bio to `/chapters/...`).
- Temple/folklore "did you know" (the roofless shrine, the lake that keeps oaths).

### Caption template
> [One poetic line that sets the scene.]
> [2–3 lines of real insight — the story, the belief, the responsible note.]
> [Soft CTA: "Read the full chapter in the Library — link in bio." / "Save this for your next walk."]
> #Himalayas #Himachal #ResponsibleTravel #PahariYatri #SlowTravel #HimalayanCulture #Trekking #Folklore

### Cadence (sustainable)
- 3–4 posts/week (mix: 2 reels, 1 carousel, 1 story-only); 3–5 Stories/week; 1 WhatsApp dispatch/week; pin everything to Pinterest.

### Link-in-bio → `/library` (the hub does the routing to books, stories, responsible travel, contribute).

### Launch sequence (first 3 weeks)
- **Week 1 — "What is Pahari Yatri":** the manifesto reel + the one-liner + the Yatri Code carousel (8 slides = 8 principles).
- **Week 2 — "The Library opens":** introduce the 4 seasonal editions as book covers; 1 flagship chapter journal.
- **Week 3 — "The mountains speak":** a folklore post + a temple etiquette post + first "Contribute your story" call.

### Metrics that matter (not vanity)
- Saves & shares (depth of resonance) > likes.
- Link-in-bio clicks to `/library`.
- Contribute-form submissions.
- WhatsApp channel joins (the truest "movement" signal).

---

## Appendix — where things live in the code
- Homepage sections: `components/HeroBanner.tsx`, `BookCardLayout.tsx`, `LegendsAndCulture.tsx`, `HiddenTrails.tsx`, `Manifesto.tsx`, `FinalCTA.tsx`.
- Ecosystem pages: `app/{library,responsible-travel,temples,folklore,community,contribute,journal}/page.tsx`.
- Detail pages: `app/chapters/[...slug]/`, `app/stories/[...slug]/`, `app/books/[...slug]/`.
- Content: `data/{books,chapters,stories,banners}/`, schema in `keystatic.config.ts`, CMS at `/admin`.
- Nav/brand: `data/headerNavLinks.ts`, `data/siteMetadata.js`, `components/{Header,MobileNav,Footer}.tsx`.
- Strategy detail & content models: `docs/brand-website-plan.md`.
