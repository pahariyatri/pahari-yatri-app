# Entity Alignment Report — Pahari Yatri

**Date:** 2026-09-09
**Goal being audited against:** Google, AI search engines (ChatGPT, Gemini, Perplexity) and human visitors should all resolve to the same entity — *Pahari Yatri = a Himalayan storytelling platform + authentic travel experiences* — regardless of which surface they land on.
**Status: AUDIT ONLY. No file was edited to produce this report, and nothing described as a fix below has been applied. Do not edit until approved.**

This report reuses verified facts from `marketing/SOCIAL_MEDIA_AUDIT.md`, `docs/growth/september-audit.md`, `docs/growth/chapter-upgrade-queue.md` and `docs/growth/september-final-report.md` rather than re-deriving them — those are cited, not repeated in full. What's new in this pass is a **code-level structured-data audit** (§1) that hadn't been done yet, and the explicit **entity-resolution framing** across every surface (§9).

---

## 0. The one-sentence finding

**The site's visible copy has been getting more careful about not sounding like a travel agency. Its structured data has not.** Every one of the 39 chapter pages — including the Kamrunag chapter that just had its `itinerary`/`duration`/`difficulty` fields removed specifically to stop reading as a package tour — still emits `"@type": "TouristTrip"` schema.org markup with a `provider`/`seller` Organization block, on every single page, unconditionally. That is the literal schema.org type for a bookable trip product. Google and any AI crawler reading structured data (which they weight *more* heavily than visible copy for entity classification, not less) currently sees a storytelling library that has structurally declared all 39 of its core content pages to be tour products. This one code-level fact is more consequential than any bio, category or CTA audited below, because it's invisible to a human proofreading the page and it's site-wide.

---

## 1. Website schema — the part nobody was reading

Audited directly against the code in `app/layout.tsx`, `lib/keystatic/chapterView.ts`, `lib/schema.ts`, `app/start/page.tsx`, `app/stories/[...slug]/page.tsx`. Every `@type` currently emitted anywhere on the site, by count:

```
8  Organization      6  Place              5  ListItem
3  WebPage           3  ImageObject        2  WebSite
2  TouristTrip       2  Person             2  ItemList
2  GeoCoordinates    2  BreadcrumbList     1  VideoObject
1  TouristDestination 1  Question          1  PostalAddress
1  Offer             1  FAQPage           1  CreativeWork
1  ContactPoint      1  Brand             1  BlogPosting
1  Answer
```

### 1.1 Every chapter page declares itself a bookable trip

`lib/keystatic/chapterView.ts:52-120` builds this for all 39 chapters, unconditionally:

```
"@type": "TouristTrip"
touristType: ["Spiritual Seekers", "Adventure Travelers", "Cultural Travelers"]
itinerary: { "@type": "ItemList", ... }        ← populated for the ~7 chapters that
                                                   still carry legacy itinerary fields
                                                   (chapter-upgrade-queue.md §D.8)
offers: { "@type": "Offer", name: "Energy Exchange", ... }   ← code exists, currently
                                                                 DORMANT — zero of 39
                                                                 chapters set the
                                                                 `offering` field that
                                                                 would populate it
provider: { "@type": "Organization", name: "Pahari Yatri", url: siteUrl }
```

This is not a copy problem, it's a schema-type problem. `TouristTrip` is schema.org's type for "a tour or other guided walk... typically a movable feast" — the direct machine-readable equivalent of "this is a trip you can book," `Offer` and all. The comment above it in the code even says the quiet part: `// TouristTrip schema — helps Google surface this page for trek searches`. That's true and it's also the exact identity the rest of this sprint has been trying to move away from.

**The dormant landmine:** the `offers` block only activates if a chapter sets `offering:` — currently zero do. The moment any future chapter (or an editor following an old template) adds that field, it ships a live schema.org `Offer` with no review gate, because nothing currently checks for it. It's not a live contradiction today; it's a trap set for the next content pass.

### 1.2 Chapters carry their own disconnected "Pahari Yatri" Organization node

`chapterView.ts`'s `provider`, `seller`, and the editorial-fallback `author` all write a fresh, anonymous Organization object — `{ "@type": "Organization", name: "Pahari Yatri", url: siteUrl }` — with **no `@id`**. The canonical Organization entity is defined once in `app/layout.tsx:168` as `"@id": "${siteUrl}/#organization"`. Every chapter should be *referencing* that node (`{ "@id": "${siteUrl}/#organization" }`), not re-declaring a same-named-but-unlinked duplicate 39 times. Search engines are generally good at deduplicating identical name+url pairs, but this is exactly the kind of ambiguity entity resolution is bad at when anything drifts even slightly (a trailing slash, a future rename) — and it is trivially fixable by using `@id` references instead of fresh objects.

### 1.3 A dangling reference: `/start` points at a `WebSite` node that doesn't exist

`app/start/page.tsx`'s schema declares:

```js
isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl }
```

But the site's actual `WebSite` object, defined once in `app/layout.tsx:129-163`, **never sets `"@id": "${siteUrl}/#website"` — it has no `@id` at all.** `/start`'s schema graph references a node the rest of the site's graph doesn't declare. This is a small, mechanical break, and it's the kind of thing that quietly degrades how confidently a knowledge graph links a page back to its parent site.

### 1.4 The `author` field uses `Person` for a name that isn't a person's name

`app/layout.tsx:153-156`:

```js
author: { "@type": "Person", name: siteMetadata.author }   // siteMetadata.author = "Pahari Yatri"
```

`siteMetadata.author` is `"Pahari Yatri"` — the brand name, not an individual. Declaring it `Person` tells any entity-resolution system "the author of this website is an individual named Pahari Yatri," which is a different, wrong claim from "Pahari Yatri is an organization." This directly muddies the exact question this whole report exists to answer. Should be `Organization`, referencing the same `@id: siteUrl+"/#organization"` node as everything else.

### 1.5 Books — the second-highest content type on the site — carry zero structured data

`app/books/[...slug]/page.tsx` emits **no `@type` at all.** Chapters get `TouristTrip` + `FAQPage` + `BreadcrumbList`; stories get `BlogPosting`; regions/places/destinations get `Place`/`TouristDestination`; books get nothing. There are 6 books (3 published) and this is the collection page that groups chapters into the "library" framing — the exact structure the brand's storytelling-platform identity depends on — and it's structurally invisible to anything reading JSON-LD. A `Book` or `CollectionPage` schema, `hasPart` linking to its chapters, would do more for the "this is a library, not a tour catalogue" claim than any copy change, because it's the one schema type built for exactly this framing and it's currently unused.

### 1.6 A second, parallel, thinner content system exists and duplicates at least one real place

This is the most significant new finding in this pass. The site has **two separate, independently-schemad content systems covering overlapping Himachal geography**:

| System | Where | Depth | Schema | Example |
|---|---|---|---|---|
| Books → Chapters → Stories | `data/chapters/`, `data/books/`, `data/stories/` | 400–2,000+ words, sourced, hedged, verification-gated | `TouristTrip` + `FAQPage` + `BreadcrumbList` | `data/chapters/manikaran-sahib-and-its-culture.yaml`, 549 words, sourced |
| Regions → Districts → Places | `data/regions/`, `data/destinations/`, `data/places/`, served by `app/[...slug]/page.tsx` | ~30–60 words, no sourcing, no verification field | `Place` / `TouristDestination` (`lib/schema.ts`) | `data/places/manikaran.yaml`, 34 words: *"The holy hot springs. A sacred convergence for Sikhs and Hindus, known for its boiling waters and deep spiritual vibrations..."* |

**Manikaran has two live, indexed, unlinked entities on the same site**, at two different URLs (`/chapters/manikaran-sahib-and-its-culture` and `/{region}/places/manikaran`), with two different `@id`s, two different descriptions, two different depths of care, and — worth naming directly — the thin one uses "sacred convergence... deep spiritual vibrations," the kind of scenic/mystical framing the chapter system explicitly avoids ("sacred not scenic" is a standing brand rule; the `places` entry reads exactly like the thing that rule was written against).

The `destinations` collection (13 district-level `.mdx` files — Mandi, Kullu, Shimla, etc.) is **not** part of this problem: `chapterView.ts` already resolves a chapter's `district` field against `destinations` and builds a real `districtLink` back to the hub page. That layer is integrated by design and shouldn't be touched.

The 8-entry `places` collection (`chintpurni`, `jibhi`, `kalpa`, `manikaran`, `mcleod-ganj`, `naggar`, `sajla`, `triund`) is **not** integrated. None of it is referenced from `relatedChapters`, none of it links to or from the book/chapter system, and at least one entry (`manikaran`) duplicates a real, carefully-sourced chapter with a thin, unsourced, scenic-toned stand-in. Two other place names (`jibhi`, `kalpa`) are mentioned *inside* existing chapters (`jalori-lake-trek`, `cloud-forest-paths`, `echoing-caves`) without being that chapter's dedicated subject — worth a second look but lower priority than the direct Manikaran duplicate.

**Why this matters more than a normal internal-linking gap:** two independently-schemad pages about the same named place, with no `sameAs` or canonical relationship between them, is close to the textbook description of what confuses entity resolution. It's not that Google can't find Pahari Yatri's Manikaran content — it's that it has two candidates to choose from, of different quality, and no signal for which one the brand considers canonical.

---

## 2. Google Business Profile

Not re-audited this pass — verified live, logged-in, 2026-09-09, in `marketing/SOCIAL_MEDIA_AUDIT.md` §7. Carried forward as-is:

- **Verified**, category **"Tour operator"**, 5.0★ from **29 real named reviews** of actual delivered treks.
- Service area: Mandi, Chamba + 5 other areas (full list not yet pulled).
- Phone `062808 88188` — matches Facebook and LinkedIn exactly (the one NAP element that *is* consistent everywhere).
- Hours read "Closed · Opens 12 am Thu" — almost certainly a data-entry default, not real hours.

**Entity-alignment read:** GBP is the single highest-authority, most evidenced claim about what Pahari Yatri *is*, of anything audited in this whole report — and it says "tour operator," backed by real customer proof, while the website's schema (§1.1) independently and separately also says "tour operator" (`TouristTrip`) via a completely different, uncoordinated mechanism. These two systems agree with each other by accident, not by design, and both disagree with the stated goal. Fixing the website's `TouristTrip` schema without resolving what GBP says (or vice versa) leaves the contradiction in place, just relocated.

---

## 3. Social profiles (Instagram, Facebook)

Not re-audited this pass — verified live, logged-in, 2026-09-09, in `marketing/SOCIAL_MEDIA_AUDIT.md` §3–4. The relevant entity-alignment facts, carried forward:

- Instagram bio: *"Not tourism. A movement of Yatris 🌿 Hidden valleys, sacred lakes & secret trails. Limited journeys guided by Himalayan experts."* — category **"Travel Service."**
- Facebook: category **"Travel company,"** bio *"A 'Pahari Yatri Who a one avid Traveler, a day-night dreamer and a soul wandering in the Himalayas."*
- Facebook page is live at `facebook.com/fb.pahariyatri` — the site's own links pointed at the wrong URL (`facebook.com/pahariyatri`, dead) until fixed in the last sprint pass.

**Entity-alignment read:** neither platform-native self-description ("Travel Service" / "Travel company") matches "storytelling platform." Both match "tour operator" more closely than they match the website's own H1 ("Experience the Himalayas like a Yatri, not a tourist"). This is the same identity split as §2, expressed a third time, independently.

---

## 4. LinkedIn

Not re-audited this pass — verified live, logged-in, 2026-09-09, in `marketing/SOCIAL_MEDIA_AUDIT.md` §6. Carried forward:

- Company page Overview: *"Experiential storytelling brand curating purposeful Himalayan journeys with community collaboration, cultural preservation & environmental respect."* — **this is the best-aligned self-description of any surface audited, anywhere, including the website's own metadata fallback.**
- Industry field: **"Travel Arrangements"** — the platform-level taxonomy still says trip logistics, even though the free-text Overview says storytelling.
- A live public job posting for a Content Creator role: *"a venture dedicated to curating unparalleled trekking and mountaineering experiences in untouched landscapes."* — directly contradicts the page's own Overview, and "untouched landscapes" is a close cousin of the explicitly banned "untouched paradise."

**Entity-alignment read:** LinkedIn is proof the "storytelling platform" framing can be written well — it already has been, in one place. It's also proof that writing it well in one field doesn't propagate: the same page's structured taxonomy field (Industry) and its own live job posting both say something else, on the same page, at the same time.

---

## 5. Portal (app.pahariyatri.com)

Not re-audited this pass — verified live against `local-connect-app` @ `e57cefd`, 2026-09-09, in `docs/growth/september-audit.md` and recorded in `CLAUDE.md`'s Portal section. The facts most relevant to entity alignment:

- The portal's real live product name is **"Travel Platform by Pahari Yatri"** — not "Local Connect," which exists only in planning docs. Anything that names the portal "Local Connect" publicly is naming a product that isn't the live one.
- `"verified"` appears **25+ times** on the portal with no verification process anywhere in the code, including a live listing rendering as `ZZQAPendingApproval Cottage` under the heading "Verified local taxi operators."
- The portal's own copy claims both `"Request-Based Booking"` and `"Direct booking"` on the same site.
- The main site's new `/start` → portal bridge (built last sprint) deliberately avoids the word "verified" for exactly this reason — but that discipline exists on one new page, not on the portal itself, which is the surface actually making the claim.

**Entity-alignment read:** the portal is a second Pahari Yatri property making trust claims (`verified`) the main brand's own rules explicitly prohibit without a real process behind them (`CLAUDE.md`: *"'verified' without an actual verification process"* is on the banned-language list). This is the same brand, under one name, contradicting its own stated standard on its own second property.

---

## 6. Metadata

- `data/siteMetadata.js` and the `app/layout.tsx` fallback keywords string were already de-banned this sprint (removed "hidden places in Himachal").
- `data/seo/index.yaml` (Keystatic-editable) is the actual source of truth per the code comment in `siteMetadata.js`; the two hardcoded fallbacks exist for when it's unset. Worth confirming the live singleton doesn't still carry old copy — not checked this pass.
- Per-chapter `seoTitle`/`metaDescription`: **19 of 20 in-scope chapters have neither field set** (`chapter-upgrade-queue.md` §D.5-6), so `buildChapterMetadata` falls back to an auto-generated pattern — `"X: Himalayan Trek in Y, Parvati Valley | Pahari Yatri"` — which is itself a small entity problem: it labels a *village* (e.g. Tulga) as a "Himalayan Trek," asserting a trip-shaped claim in the `<title>` tag independent of, and in addition to, the `TouristTrip` schema issue in §1.1. Two separate mechanisms, one visible in the tab title and one invisible in JSON-LD, both currently push the same "this is a trek" framing.
- `app/layout.tsx`'s `sameAs` array (`facebook`, `instagram`, `twitter`, `youtube`) still doesn't include **LinkedIn**, which demonstrably exists (§4) and is the best-aligned surface in the whole audit. An entity's `sameAs` list is one of the more direct signals used for cross-platform entity resolution — leaving out the one profile that agrees with the brand's own positioning is a missed, low-effort win, not just an oversight.
- GBP is not referenced anywhere in the site's schema (no `sameAs`, no `hasMap`, no local-business linkage) despite being the single most-evidenced entity claim about the business (§2). There's a real design question buried here, not just a missing link: adding GBP as a `sameAs` on an `Organization` schema implicitly leans toward `LocalBusiness`, which pulls the entity further toward "tour operator" — this shouldn't be added mechanically without resolving §0/§9's identity question first.

---

## 7. Internal linking

Covered in depth in `docs/growth/chapter-upgrade-queue.md` §C for the chapter-to-chapter graph (headline: `himachal-temple-etiquette` has 4 inbound links and *zero* of the 16 Parvati Valley chapters link to it, despite every one of them making a devta or temple claim that rule is supposed to gate). Not repeated here. Two additions specific to entity alignment:

- **Nothing links the `places`/`destinations` system to the `chapters`/`books` system in either direction** except the one integrated `districtLink` (§1.6). A visitor or crawler on `/himachal/places/manikaran` has no path to the real chapter about Manikaran, and vice versa.
- **Nothing on the main site links to the LinkedIn company page or the Google Business Profile at all** — not in the footer, not in `sameAs` (§6), not anywhere a human or a crawler would find them from `pahariyatri.com`. The two best-evidenced entities in this whole report (GBP's real reviews, LinkedIn's well-written Overview) are structurally invisible from the site whose identity they're supposed to reinforce.

---

## 8. Conversion paths

- **Main site → portal (`/start` → `app.pahariyatri.com`):** built last sprint specifically to avoid overclaiming — no "verified" language, names the destination descriptively rather than branding it "Local Connect" (§5). This is the one conversion path in the whole audit that was built *with* the identity question in mind. It's also the only one.
- **`/apply` (Yatri Circle):** not re-audited this pass structurally, but its SEO title was flagged in the earlier live audit as rendering **"Apply to Walk — Join a Pahari Yatri Himalayan Trek"** in search results — trip-framed, at odds with the community-framing the page is meant to represent.
- **`/about`:** flagged in the same earlier pass as rendering **"About Us — Trekking & Spiritual Yatras in the Himalayas"** — again trip-framed at the metadata layer, independent of whatever the page body says.
- **Portal's own funnel:** request-first vs. payment-first is unresolved and the copy claims both simultaneously (§5) — a conversion-path contradiction in its own right, on the property with live Razorpay checkout already shipped.

**Entity-alignment read:** the two SEO titles above are further instances of §6's pattern — a `<title>` tag independently asserting "this is a trek" on pages whose visible body copy has been written to say otherwise. Metadata keeps quietly re-introducing the identity the copy layer keeps trying to remove.

---

## 9. Contradictions — the complete list, ranked

| # | Contradiction | Where | Severity |
|---|---|---|---|
| 1 | Every chapter's structured data (`TouristTrip` + `Offer`/`provider`) declares the page a bookable trip product, site-wide, invisibly to a copy read | `lib/keystatic/chapterView.ts` | **Highest — structural, site-wide, invisible to normal review** |
| 2 | Two independently-schemad, unlinked entities exist for at least one real place (Manikaran); one is sourced and hedged, the other is thin and scenic-toned | `data/places/manikaran.yaml` vs `data/chapters/manikaran-sahib-and-its-culture.yaml` | **High — direct entity duplication** |
| 3 | GBP (verified, "Tour operator," 29 real reviews) and the website's own schema (`TouristTrip`) independently agree with each other and both disagree with the stated brand identity | §1.1, §2 | High — same contradiction, arrived at twice, uncoordinated |
| 4 | Books — the core "library" structure — carry zero schema; chapters, stories, places and destinations all have some | `app/books/[...slug]/page.tsx` | Medium-high — the identity-defining structure is the least machine-legible one |
| 5 | Portal makes 25+ unbacked "verified" claims, directly contradicting the parent brand's own explicit banned-language rule | `local-connect-app`, per `docs/growth/september-audit.md` | High — same brand, self-contradicting its own written standard |
| 6 | LinkedIn's Overview (best-aligned copy in the audit) sits on the same page as an Industry taxonomy field and a live job posting that both say the opposite | `marketing/SOCIAL_MEDIA_AUDIT.md` §6 | Medium |
| 7 | Auto-generated `<title>` tags label villages "Himalayan Trek in X" on 14+ chapter pages, and the same pattern independently shows up on `/apply` and `/about`'s SEO titles | `chapter-upgrade-queue.md` §D.5, this report §6/§8 | Medium — visible in search results, not just JSON-LD |
| 8 | Instagram ("Travel Service") and Facebook ("Travel company") both self-categorize closer to "tour operator" than to "storytelling platform" | `marketing/SOCIAL_MEDIA_AUDIT.md` §3-4 | Medium |
| 9 | `sameAs` omits LinkedIn (the best-aligned profile) and never references GBP (the most-evidenced entity) | `app/layout.tsx` | Medium — cheap to fix, meaningfully helps entity resolution |
| 10 | A schema `@id` reference (`/start` → `#website`) points at a node the site's own `WebSite` schema never declares | `app/start/page.tsx` vs `app/layout.tsx` | Low-medium — mechanical, easy, no judgment call needed |
| 11 | The site's `author` schema uses `Person` for the brand name "Pahari Yatri," asserting an individual authored the site | `app/layout.tsx:154` | Low-medium — mechanical, easy |
| 12 | Chapter-level schema re-declares a fresh, unlinked "Pahari Yatri" Organization object instead of referencing the canonical `@id` | `lib/keystatic/chapterView.ts` | Low — search engines likely deduplicate this correctly today, but it's fragile |
| 13 | Portal's funnel copy claims "Request-Based Booking" and "Direct booking" simultaneously | `docs/growth/september-audit.md` §3.8 | Medium — conversion-path level, not entity level, but same root cause |

**Everything in this list traces back to one unanswered question, already logged as decision #1 in `docs/growth/september-final-report.md`: is Pahari Yatri, canonically, a storytelling platform, a tour operator, or an explicit both-with-a-stated-boundary?** Items 1, 2, 3, 5, 6, 8 and 13 are all versions of that same unresolved question surfacing independently in seven different systems that don't talk to each other. Items 4, 7, 9, 10, 11 and 12 are mechanical and don't require that decision first — they can be fixed once approved, in any order, without waiting on it.

---

## 10. What this report is not

This is an audit. Per the instruction it was run under, **nothing has been edited.** No schema field, no YAML file, no `sameAs` array, and no metadata string was changed to produce this report — everything above was read, not written. A fix pass, if approved, would separate cleanly into:

- **No identity decision required:** items 4, 7 (the metadata half only), 9, 10, 11, 12 — all mechanical, all low-risk, all reversible.
- **Blocked on the identity decision (item 1 in the master decision list):** items 1, 2, 3, 5, 6, 8, 13 — because the "right" fix for `TouristTrip` schema, the Manikaran duplicate, GBP's category, and the portal's "verified" language all depend on which identity the founder chooses, not on anything this report can decide on its own.
