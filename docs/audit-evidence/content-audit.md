# Content and architecture audit — repository evidence

**Status: audit/proposals only; founder approval required for public changes.**

Snapshot: `b33712ff3181f50c4bff007fd9548b65347ce4d9`, working tree content inspected in `/home/pankaj-kumar/Workspace/pahari-yatri-app`. This report owns content inventory and book planning, not the companion live crawl, Search Console, external source research or technical audit. No secrets, credentials or `.openclaw-cli-images` were read. No book, chapter, story, destination, place, region, slug, image or public code was edited.

## 1. Verified inventory and the four-book misconception

| Collection | Flat records | Meaning |
|---|---:|---|
| Books | 5 | Four seasonal editions plus the primary **Temples & Traditions** book |
| Chapters | 25 | Includes **Himachal Temple Etiquette** |
| Stories | 20 | All have an existing primary chapter relationship |
| Destinations | 13 | Twelve district slugs plus Manali; not thirteen administrative districts |
| Places | 8 | Description-only records with coordinates |
| Regions | 1 | Himachal Pradesh |
| **Core total** | **72** | Books + chapters + stories + destinations + places + regions |
| Films | 3 | Separate collection, all still use example video URLs |
| **All collection records** | **75** | Not a URL/sitemap total |

Also enumerated separately: **6 temple seed cards, 6 folklore seed cards, 4 journal seed cards**. These are arrays on three existing index pages, not sixteen CMS entries or sixteen additional detail URLs.

The complete machine-readable ledger is [`../../content-inventory.json`](../../content-inventory.json): every source path, field line, stored value, body, required/optional field check, relationships, asset existence, word metrics, verification state, cultural screening candidates and duplicate tests. Tables below enumerate every core record, plus films and all hardcoded seeds.

The user's four-book assumption matches the **four original seasonal books**, not today's entire inventory. `data/books/temples-traditions.yaml:1-29` explicitly adds a primary fifth book and lists `himachal-temple-etiquette`; `data/chapters/himachal-temple-etiquette.yaml:38-46` points back. The old “Four books, four moods” statement remains in `app/journal/page.tsx:25-28`. The proposed seven primary books in `.claude/agents/content-architect.md:20-24` and `docs/content-model-migration-2026-08.md:203-230` are planning records, **not seven currently existing books**. None of those seven named books has its own data file in this snapshot. Preserve the fifth book; decide its relationship to Sacred Mandi and Yatri Code before proposing another overlapping shelf. See [`docs/reports/current/BOOK_PROPOSALS.md`](../reports/current/BOOK_PROPOSALS.md) (moved here 2026-09-08 during the workspace cleanup; was `BOOK_PROPOSALS.md` at repo root when this evidence file was written).

### Current book → chapter map

- **Lost Trails** (`lost-trails`; seasonal (schema default); 7 chapters), `data/books/lost-trails.yaml:10`: `forgotten-shrine`, `shepherds-path`, `echoing-caves`, `churdhar-sacred-ascent`, `baga-sarahan-bashleo-pass`, `mural-danda-trek`, `devidarh-shikari-devi`.
- **Monsoon** (`monsoon`; seasonal (schema default); 7 chapters), `data/books/monsoon.yaml:10`: `cloud-forest-paths`, `rain-prayer`, `mist-valleys`, `kheerganga-buni-buni-pass`, `jalori-lake-trek`, `parashar-lake-trek`, `kasol-weekend`.
- **Summer** (`summer`; seasonal (schema default); 6 chapters), `data/books/summer.yaml:10`: `sunlit-passes`, `meadow-walks`, `river-sutra`, `buran-ghati-trek`, `rupin-pass-trek`, `saroa-to-kamrunag`.
- **Temples & Traditions** (`temples-traditions`; primary; 1 chapters), `data/books/temples-traditions.yaml:27`: `himachal-temple-etiquette`.
- **Winter** (`winter`; seasonal (schema default); 3 chapters), `data/books/winter.yaml:10`: `kamrunag-the-lake-of-oaths`, `solstice-snow`, `chandernahan-lake-trek`.

`pin-bhaba-pass` has no `parentBook` and is not in a book's list (`data/chapters/pin-bhaba-pass.yaml:1-13`); this was deliberately left for a future High Passes decision (`docs/content-model-migration-2026-08.md:107-114`). Its story `bhaba-moon-road` is the sole story with no derived book. All other story chains resolve. No chapter is claimed by two existing books, and all populated book→chapter links agree with chapter.parentBook.

## 2. Architecture: what is built versus what is only modeled

- **Two coexisting classification systems:** region → destination/place and Book → Chapter → Story. CMS labels books/chapters “Journeys (Legacy)” (`keystatic.config.ts:9-12`) while the migration calls the hierarchy the future model. This is a positioning/configuration inconsistency, not justification to delete the region layer.
- **The schema is mostly ahead of the entries.** Author fields and chapter SEO/source fields already exist (`keystatic.config.ts:209-325,489-550`). Old agent notes saying they do not exist are stale (`.claude/agents/content-architect.md:42-49`). Most fields are optional by explicit migration policy (`docs/content-model-migration-2026-08.md:30-34`), so a successful schema read does not demonstrate editorial completeness.
- **Hierarchy has two runtime authorities.** Story→book derives through `chapter.parentBook` (`lib/keystatic/stories.ts:29-46`); chapter display parent and next chapter use the first `book.relatedChapters` match (`lib/keystatic/chapterView.ts:157-183`). Nested chapter route access also relies on `book.relatedChapters` (`app/books/[book]/[chapter]/page.tsx:25-30`). There is no present data mismatch, but changing only `parentBook`, as the migration recommends, would leave display/navigation wrong. Founder-approved migration must reconcile both, preserve seasonal membership separately and test both URL families.
- **New book fields do not flow to book pages.** `app/books/[...slug]/page.tsx:19-27,41-48` uses title/excerpt/invitation, not `seoTitle`, `metaDescription`, thesis or description. `lib/keystatic/getLibraryData.ts:13-23` similarly omits bookType/priority/thesis. A populated new primary book is not automatically a primary-versus-seasonal navigation implementation.
- **Chapter depth is constrained by the renderer.** `app/chapters/[...slug]/client-page.tsx:18-23,115-135` splits narrative into plain paragraphs; markdown headings become plain paragraph text. Overview is expressly retained for JSON-LD instead of visible page sections (`lib/keystatic/chapterView.ts:38-46`). Route/distance/season fields are stored but the chapter's main view is a narrative + FAQ, not a practical reference layout. Do not claim all YAML prose is visible HTML body depth.
- **Place pages cannot hold a guide in today's schema.** Only title, region, district, description, image and coordinates exist (`keystatic.config.ts:62-87`); display is description and coordinate badge (`app/[...slug]/page.tsx:431-465`). Fixing this requires an approved model/rendering decision, not padding the same short field.
- **District hubs now have real links.** Chapters use explicit `district`; story membership is derived from primary chapter, not prose place mentions (`app/[...slug]/page.tsx:40-81`). Bilaspur, Hamirpur and Solan still have no assigned chapter/place/story. Kangra has two places but no chapter/story; do not repeat the stale assertion that it has no content at all.
- **Canonical duplication is intentional at the route level.** `/books/{book}/{chapter}` renders the same chapter but points its canonical to `/chapters/{slug}` (`app/books/[book]/[chapter]/page.tsx:35-39`). This is not a second original article. HTTP redirects/canonicals and sitemap exposure are owned by the technical/live audit.

## 3. Required fields, authored coverage and missing trust metadata

**Programmatic source validation:** all 75 records have nonempty explicitly required scalar/relationship/image-path fields; all 50 book/chapter/story excerpts fall within their configured length ranges. This is a raw-source check, not a claim that a Keystatic build has been run here. File existence is a separate test: an image path can be nonempty yet missing.

| Collection / target fields | Authored coverage | Interpretation |
|---|---|---|
| Books: thesis, region, description, priority, bookType, SEO title, meta description, CTA | 1/5 each | Only Temples & Traditions fills these. Other books default to seasonal. |
| Chapters: parentBook | 24/25 | Pin Bhaba intentionally unplaced. |
| Chapters: place and region | 0/25 each | All have free-text location, but the new structured fields are empty. Do not conclude that every chapter lacks a real place. |
| Chapters: trackType | 23/25 | Kasol and Mural Danda default to trail; Kasol's town/village intent needs a decision. |
| Chapters: targetKeyword, secondaryKeywords, metaDescription, localTruth, verificationStatus, sourcesToVerify, migrationStatus, reelHook, CTA | 1/25 each | Temple etiquette only. Many narratives contain “Local truth:” but not the structured field. |
| Chapters: SEO title | 2/25 | Temple etiquette and Rupin. |
| Chapters: FAQs | 25/25 | Presence is not proof of PAA research, correctness or local review. No FAQ question-source ledger is stored. |
| Chapters: explicit relatedChapters | 7/25 | Four meet the 2–4 sideways-link target; three have one; eighteen have none. |
| Stories: named byline | 3/20 | All three say **Pahari Yatri Editorial**; zero named individual authors. |
| Stories: relatedChapter | 20/20 | All resolve; zero primary chapter orphans. |
| Stories: place / CTA | 0/20 each | Body place mentions and renderer CTA defaults are not authored fields. |
| Destinations: description, MDX body, image path | 13/13 | All present, but bodies and assets remain thin/missing. |
| Places: district, description, image path, coordinates | 8/8 | Completeness does not establish coordinate accuracy or photographic provenance. |

References: actual required/title/relationship/image definitions `keystatic.config.ts:17-87,90-172,191-198,428-432,460-477`; source coverage comes from every row in the JSON inventory.

**No structured visit date, reviewer identity/date, source URL ledger, consent record, author profile or image credit/license record exists in these seven collection schemas.** Chapters lack authorName entirely. Stories can store names/types but do not establish identities or permission. File birthtime/mtime supplies story publication dates (`app/stories/[...slug]/page.tsx:13-30`); these are filesystem timestamps, not independently confirmed publication or field-visit dates. A story's own pull quote becomes `citation` in Article JSON-LD (`app/stories/[...slug]/page.tsx:153`), which is not supporting external provenance.

## 4. Trust findings: address before authority claims or scaling

### P0 — Archetypal narrators are not verified contributors

`docs/content-psychology-map.md:16,48-53` explicitly describes narrator personas and says real contributed stories will replace archetypes. Seventeen stories have a detailed anonymous `voice`, no authorName and no explicit verificationStatus. The remaining three are marked editorial/unverified. It is therefore unsupported to market this inventory as twenty documented first-hand testimonies or a network of named local contributors.

This audit does **not** decide which events really happened. Names inside prose (e.g. the guide Chhotu Ram or shepherd Chatru) are not, on their own, interview records or consent evidence. The founder must classify each piece: permissioned contribution, founder experience, editorial reflection, composite or fiction. A pseudonym may be appropriate with disclosure and private permission; inventing full names to satisfy E-E-A-T is not.

The editorial Manali story says “for those of us who live here” (`data/stories/why-locals-avoid-manali-in-peak-season.mdx:26`); the Tirthan excerpt promises “A local's view” (`data/stories/tirthan-the-slow-valley-reflections.mdx:4-5`). Their editorial bylines are not proof of residence. Mark these as unresolved local-identity claims for founder review, not as verified local opinion.

### P0 — Verification status is not a publication gate

All chapters/stories remain unverified or needs-local-source by stored/default status: **24 chapters default unverified, 1 needs-local-source; all 20 stories unverified**. No local-source/published status is populated. Temple etiquette has meaningful review notes and an eleven-item verification backlog; it is not locally confirmed. Its own header warns explicitly that status does not block publication (`data/chapters/himachal-temple-etiquette.yaml:17-36,65-112`). The presence of a file is enough for existing collection loaders and route generation; a comment saying “draft” cannot hold a page back.

Do not suddenly filter every unverified entry from sitemap/navigation. That would affect the entire chapter/story library. Propose explicit draft/publication state separately from claim-verification state, with a founder-approved grandfathering/triage plan and URL-by-URL impact review.

### Cultural claim register — exact evidence, not fresh fact-checking

The following high-risk examples were inspected directly. Labels describe what can be defended **from repository evidence only**. No official site was visited and no local person was contacted in this subtask. The inventory includes additional claim-screening lines for every record. Official source mentions in comments are leads, not a renewed source verification.

| Claim / risk | Evidence | Audit label and next step |
|---|---|---|
| Kamrunag bank “never been robbed”; “no one takes it out. Ever”; taking offerings “never ends well” | `data/chapters/kamrunag-the-lake-of-oaths.yaml:82`; `data/chapters/kamrunag-the-lake-of-oaths.yaml:70` | **Unsafe framing / needs local source.** Hold universal and curse/punishment-style language for approval to remove; ask temple committee which offering practice can be stated and attributed. Do not amplify treasure content as mystery. |
| Shikari Devi narrative opens “Every roof they built for her fell down” despite a hedged overview | `data/chapters/devidarh-shikari-devi.yaml:66` | **Needs-local-source.** Clearly attribute as a locally reported belief only after recording whose account; do not treat narrative placement as exemption. |
| Parashar unknown depth / divers gave up / asserted physical explanation for island drift | `data/stories/parashar-floating-island.mdx:17`; `data/stories/parashar-floating-island.mdx:23`; `app/temples/page.tsx:44-49` | **Needs-local-source / unsupported mechanism.** Separate observation, belief and scientific explanation. The local-verification agent itself flags the explanation as unverified (`.claude/agents/local-verification-editor.md:53-54`). |
| Devta Shikru / nine generations of grazing, attributed to Chatru only within narrative | `data/chapters/chandernahan-lake-trek.yaml:89` | **Needs-local-source.** Obtain the original interview record, date, context and permission; retain the narrative name only if genuine and permissioned. |
| Kheerganga's Kartikeya/kheer origin and current pool/camping rules | `data/chapters/kheerganga-buni-buni-pass.yaml:19`; `data/chapters/kheerganga-buni-buni-pass.yaml:52` | **Needs-local-source.** Distinguish reported legend from operational rules; seek named shrine/administration guidance and current dates. |
| Rain Prayer generalises outsiders' entry and recommends monsoon after “everyone advises against” | `data/chapters/rain-prayer.yaml:49`; `data/chapters/rain-prayer.yaml:70` | **Needs-local-source; safety review.** Temple-specific access cannot be generalised; weather/road risk should not be aestheticised. |
| Tirthan “never been dammed”, fishing/permit rules and hydro-project history | `data/chapters/river-sutra.yaml:20`; `data/chapters/river-sutra.yaml:50` | **Needs authoritative checking.** Obtain river/environment/administrative sources; no claim here that the assertions are false. |
| Six temple cards and six folklore cards have no source/author/reviewer fields | `app/temples/page.tsx:15-70`; `app/folklore/page.tsx:15-58` | **Needs-local-source.** A “Legend” label is useful context but not evidence of which community tells it. “Every village” and “every roof” remain universals. |
| Etiquette's judicial authority and broad access/behaviour norms | `data/chapters/himachal-temple-etiquette.yaml:20-25,66-112,239-245` | **Needs-local-source.** Preserve the prior omission of menstruation/community-entry blocks. Ask the listed committees/local women; do not reintroduce unsafe generalisations. |
| High-altitude/medical-recovery stories imply broadly suitable journeys | `data/stories/jalori-small-circle.mdx:16-18`; `data/stories/meadow-reverie.mdx:18`; `data/chapters/parashar-lake-trek.yaml:88` | **Safety/source review.** Personal recovery prose is not medical suitability evidence. Avoid blanket reassurance and source route/season/access facts with current local information. |

### P1 — Thin guide answers, not merely short writing

Approximate source word counts distinguish narrative from total editorial text; counts exclude title/navigation/cards/metadata. FAQ answers are included in the potential editorial total even when collapsed. They are not a live browser count.

- **24 older chapters: 384–474 potential visible editorial words**. Narratives across all 25 are 232–1,222 words. Temple etiquette is the exception at **1,998 potential editorial words including FAQ**, so do not repeat “every chapter is under 1,000 words.” Its long plain-paragraph presentation is still hard to scan.
- **Stories: 152–406 body words.** The three editorial recoveries are shortest (Kinnaur 152, Tirthan 154, Manali 269). Short reflections can be legitimate; do not inflate them to generic travel guides. Their credibility and distinct voice matter more than hitting a count.
- **Destination bodies: 51–310 words**. Twelve are only 51–72 words; Manali has 310. Adding the description yields 75–344 words before derived link cards. “Travel Guide” titles promise more than these bodies deliver: access/current constraints, cultural source context, precise subplaces, visitor decisions and sources are missing.
- **Places: 20–35 description words**; Himachal region's description is 45 words plus a collection listing. Coordinate badges are not useful substitute guide content.

The chapter-editor's 1,500–2,000-word range (`.claude/agents/chapter-editor.md:10-14`) is an internal editorial target, **not a Google minimum or evidence of a ranking penalty**. Approve research-led expansions of useful answers, not a word-count factory.

### P1 — Real asset/provenance gap hidden by fallback

**23 missing referenced images:** all 13 destinations, all 8 places, the Himachal region hero and the temple-etiquette chapter. Every path and source line is in the inventory. The Temples & Traditions book cover **does exist**. Missing source assets may render a fallback; this is not a claim of 23 visibly broken `<img>` elements. `lib/images.ts` resolves fallback paths; the live audit owns rendered outcomes.

Historical documentation openly calls chapter/cover photography thematically matched stock, not actual GPS locations (`docs/pahari-yatri-status-and-roadmap.md:41-55`). Do not label these photographs as proof of visiting the specific place. Request owned/permissioned photos with photographer, place, date and license/consent evidence; do not manufacture field imagery or fake captions.

### P1 — Local geography and district taxonomy need reconciliation

- Echoing Caves' chapter is Spiti/Tabo/Dhankar and has `district: lahaul-spiti`, but its folklore card says **Sirmaur** (`data/chapters/echoing-caves.yaml:2-10`; `app/folklore/page.tsx:45-49`). This is an internal contradiction, not a research-dependent ranking hypothesis.
- Baga Sarahan/Bashleo is `district: kullu`, but temple/folklore seeds label **Shimla** and use a “Bhima Kali line” framing (`data/chapters/baga-sarahan-bashleo-pass.yaml:2`; `app/temples/page.tsx:53-59`; `app/folklore/page.tsx:52-56`). Do not conflate Baga Sarahan with the Sarahan/Bhimakali town without verification.
- Forgotten Shrine is assigned `district: kinnaur`, while its route describes Jeori → Sarahan/Bhimakali (`data/chapters/forgotten-shrine.yaml:2,34-39`). The district tag/actual shrine identity requires a founder/local decision before new Sarahan targeting. No invented name for the unnamed shrine.
- “district” relationships point to destinations, including Manali; **Manali is modeled as a district-like hub, not a verified administrative district**. `solstice-snow` points to Manali while meadow-walks/sunlit-passes and Sajla/Naggar point to Kullu. This explains missing Manali hub links despite those names appearing in its prose; define destination/city/district roles before more region pages.
- Eight coordinate strings parse and are present; location accuracy was **not externally verified**. Do not attach authoritative location/entity claims merely because strings have valid decimal syntax.

## 5. Linking, duplicate depth and commercial remnants

**Relationship integrity:** no dangling stored relationships; all twenty primary story→chapter links have corresponding chapter lists. Story→book resolves 19/20. Primary story distribution is **8 chapters with none, 14 with one, 3 with two**. The displayed lists add temple etiquette's two cross-topic story recommendations, making **7 with none, 14 with one, 4 with two**. Those are different metrics, not a counting error. `small-god` and `bell-and-thunder` remain owned by Forgotten Shrine and Rain Prayer respectively, even while recommended under etiquette (`data/chapters/himachal-temple-etiquette.yaml:122-124`). These are not proof of two original etiquette testimonies.

No chapter explicitly links sideways to `himachal-temple-etiquette`; etiquette links out to four sacred chapters. Only Chandernahan, etiquette, Kamrunag and Parashar meet the 2–4 explicit sideways-link target. Seventeen named-place mentions elsewhere in prose are not a measured link count: the complete **MDX literal-link scan finds no Markdown links in any story/destination body**. All sixteen hardcoded seed destinations map to known local routes. This is local route membership, not a full HTTP crawl.

**Duplicate tests:** zero exact normalized substantive-body duplicates; four chapter/story pairs reuse a full quote (Kasol, Meadow, Parashar, Sunlit; exact source lines in inventory). Low five-token shingle similarity identifies related chapter/story echoes, not plagiarism. The real issue is **intent and repeated narrative framing**: the same place's chapter speaks as a traveller, then its story speaks as another undocumented traveller. Keep chapters as sourced reference pages and stories as transparently attributed individual/editorial perspectives. Kamrunag destination versus Saroa approach deserves separate intent, not an automatic merge; Manali guide versus peak-season editorial also can coexist if distinct and cross-linked.

The ten poetic chapters are not all locationless today: prose names Jibhi, Tirthan, Lama Dugh, Tabo, Bharmour, Manali and others. Their titles/new `place` fields lag those anchors. The founder must confirm whether these are actual trips or composites before retitling/reclassifying. Moving all ten now would affect **ten primary attached stories**, not the old eight stated in agent docs: the Tirthan and Manali editorial recoveries were subsequently attached. Nothing should be orphaned, deleted or silently renamed.

The strict banned-phrase sweep of collection sources finds one `package` match in `bhaba-moon-road` (line 16), used to **reject** a package tour, not sell one. Do not report this as a booking CTA. Separately, the Parashar `gettingThere` field still promises pickup after application acceptance (`data/chapters/parashar-lake-trek.yaml:39`); it is stored commercial copy even though that field is not in the visible chapter body. `data/data.js:3-23` retains old package/customize-trip banner links and six old category objects; that module was inspected as legacy source, not asserted live without an import/render trace.

All three film records use `EXAMPLE001/002/003` URLs (`data/films/*.yaml:3`) and captions instructing replacement in `/admin`. The film collection is seed content, not three verified productions or functioning external media links. Existing valid relationship targets do not rescue placeholder video URLs.

## 6. Every-record ledger

Field-level omissions, relationship/asset line evidence and full prose are in the JSON. “Words” below means potential editorial words described above, not total YAML tokens. “Unverified” includes schema-default status. Missing-image flags denote source files, not observed HTTP failures.


### Books

| Entry / evidence | Words | Ownership / local context | Findings |
|---|---:|---|---|
| `lost-trails` — `data/books/lost-trails.yaml:1` | 34 | seasonal (default); 7 chapters | secondary shelf proposed; new architecture fields empty |
| `monsoon` — `data/books/monsoon.yaml:1` | 40 | seasonal (default); 7 chapters | secondary shelf proposed; new architecture fields empty |
| `summer` — `data/books/summer.yaml:1` | 45 | seasonal (default); 6 chapters | secondary shelf proposed; new architecture fields empty |
| `temples-traditions` — `data/books/temples-traditions.yaml:1` | 48 | primary; 1 chapters | new architecture fields populated but renderer omits them |
| `winter` — `data/books/winter.yaml:1` | 27 | seasonal (default); 3 chapters | secondary shelf proposed; new architecture fields empty |

### Chapters

| Entry / evidence | Words | Ownership / local context | Findings |
|---|---:|---|---|
| `baga-sarahan-bashleo-pass` — `data/chapters/baga-sarahan-bashleo-pass.yaml:1` | 435 | lost-trails; district=kullu | narrative 271w; unverified; 0 sideways links |
| `buran-ghati-trek` — `data/chapters/buran-ghati-trek.yaml:1` | 421 | summer; district=shimla | narrative 251w; unverified; 1 sideways links |
| `chandernahan-lake-trek` — `data/chapters/chandernahan-lake-trek.yaml:1` | 414 | winter; district=shimla | narrative 261w; unverified; 2 sideways links |
| `churdhar-sacred-ascent` — `data/chapters/churdhar-sacred-ascent.yaml:1` | 419 | lost-trails; district=sirmour | narrative 255w; unverified; 0 sideways links |
| `cloud-forest-paths` — `data/chapters/cloud-forest-paths.yaml:1` | 410 | monsoon; district=kullu | narrative 253w; unverified; 0 sideways links; poetic classification: founder review |
| `devidarh-shikari-devi` — `data/chapters/devidarh-shikari-devi.yaml:1` | 445 | lost-trails; district=mandi | narrative 274w; unverified; 0 sideways links |
| `echoing-caves` — `data/chapters/echoing-caves.yaml:1` | 432 | lost-trails; district=lahaul-spiti | narrative 268w; unverified; 0 sideways links; poetic classification: founder review |
| `forgotten-shrine` — `data/chapters/forgotten-shrine.yaml:1` | 440 | lost-trails; district=kinnaur | narrative 292w; unverified; 0 sideways links; poetic classification: founder review |
| `himachal-temple-etiquette` — `data/chapters/himachal-temple-etiquette.yaml:38` | 1998 | temples-traditions | narrative 1222w; needs-local-source; 4 sideways links; image missing |
| `jalori-lake-trek` — `data/chapters/jalori-lake-trek.yaml:1` | 411 | monsoon; district=kullu | narrative 263w; unverified; 0 sideways links |
| `kamrunag-the-lake-of-oaths` — `data/chapters/kamrunag-the-lake-of-oaths.yaml:1` | 425 | winter; district=mandi | narrative 275w; unverified; 3 sideways links |
| `kasol-weekend` — `data/chapters/kasol-weekend.yaml:1` | 426 | monsoon; district=kullu | narrative 267w; unverified; 0 sideways links |
| `kheerganga-buni-buni-pass` — `data/chapters/kheerganga-buni-buni-pass.yaml:1` | 399 | monsoon; district=kullu | narrative 233w; unverified; 0 sideways links |
| `meadow-walks` — `data/chapters/meadow-walks.yaml:1` | 418 | summer; district=kullu | narrative 257w; unverified; 0 sideways links; poetic classification: founder review |
| `mist-valleys` — `data/chapters/mist-valleys.yaml:1` | 404 | monsoon; district=kullu | narrative 243w; unverified; 0 sideways links; poetic classification: founder review |
| `mural-danda-trek` — `data/chapters/mural-danda-trek.yaml:1` | 409 | lost-trails; district=shimla | narrative 253w; unverified; 1 sideways links |
| `parashar-lake-trek` — `data/chapters/parashar-lake-trek.yaml:1` | 474 | monsoon; district=mandi | narrative 263w; unverified; 2 sideways links |
| `pin-bhaba-pass` — `data/chapters/pin-bhaba-pass.yaml:1` | 415 | —; district=kinnaur | narrative 257w; unverified; 0 sideways links; unplaced |
| `rain-prayer` — `data/chapters/rain-prayer.yaml:1` | 429 | monsoon; district=kullu | narrative 263w; unverified; 0 sideways links; poetic classification: founder review |
| `river-sutra` — `data/chapters/river-sutra.yaml:1` | 429 | summer; district=kullu | narrative 267w; unverified; 0 sideways links; poetic classification: founder review |
| `rupin-pass-trek` — `data/chapters/rupin-pass-trek.yaml:1` | 438 | summer; district=kinnaur | narrative 262w; unverified; 0 sideways links |
| `saroa-to-kamrunag` — `data/chapters/saroa-to-kamrunag.yaml:1` | 384 | summer; district=mandi | narrative 232w; unverified; 1 sideways links |
| `shepherds-path` — `data/chapters/shepherds-path.yaml:1` | 404 | lost-trails; district=chamba | narrative 255w; unverified; 0 sideways links; poetic classification: founder review |
| `solstice-snow` — `data/chapters/solstice-snow.yaml:1` | 399 | winter; district=manali | narrative 252w; unverified; 0 sideways links; poetic classification: founder review |
| `sunlit-passes` — `data/chapters/sunlit-passes.yaml:1` | 421 | summer; district=kullu | narrative 251w; unverified; 0 sideways links; poetic classification: founder review |

### Stories

| Entry / evidence | Words | Ownership / local context | Findings |
|---|---:|---|---|
| `bell-and-thunder` — `data/stories/bell-and-thunder.mdx:2` | 383 | rain-prayer | archetypal voice; byline/provenance unresolved; body 347w |
| `bhaba-moon-road` — `data/stories/bhaba-moon-road.mdx:2` | 397 | pin-bhaba-pass | archetypal voice; byline/provenance unresolved; body 359w |
| `buran-first-light` — `data/stories/buran-first-light.mdx:2` | 428 | buran-ghati-trek | archetypal voice; byline/provenance unresolved; body 381w |
| `churdhar-bell-echo` — `data/stories/churdhar-bell-echo.mdx:2` | 374 | churdhar-sacred-ascent | archetypal voice; byline/provenance unresolved; body 335w |
| `forest-chants` — `data/stories/forest-chants.mdx:2` | 404 | cloud-forest-paths | archetypal voice; byline/provenance unresolved; body 367w |
| `jalori-small-circle` — `data/stories/jalori-small-circle.mdx:2` | 441 | jalori-lake-trek | archetypal voice; byline/provenance unresolved; body 406w |
| `kasol-slow-saturday` — `data/stories/kasol-slow-saturday.mdx:2` | 401 | kasol-weekend | archetypal voice; byline/provenance unresolved; body 365w |
| `kheerganga-fire-and-water` — `data/stories/kheerganga-fire-and-water.mdx:2` | 420 | kheerganga-buni-buni-pass | archetypal voice; byline/provenance unresolved; body 379w |
| `kinnaur-beyond-the-pass-reality` — `data/stories/kinnaur-beyond-the-pass-reality.mdx:2` | 184 | rupin-pass-trek | editorial/unverified; body 152w |
| `meadow-reverie` — `data/stories/meadow-reverie.mdx:2` | 413 | meadow-walks | archetypal voice; byline/provenance unresolved; body 372w |
| `mirror-of-stillness` — `data/stories/mirror-of-stillness.mdx:2` | 389 | kamrunag-the-lake-of-oaths | archetypal voice; byline/provenance unresolved; body 352w |
| `parashar-floating-island` — `data/stories/parashar-floating-island.mdx:2` | 420 | parashar-lake-trek | archetypal voice; byline/provenance unresolved; body 377w |
| `quiet-compass` — `data/stories/quiet-compass.mdx:2` | 374 | mist-valleys | archetypal voice; byline/provenance unresolved; body 338w |
| `river-hymn` — `data/stories/river-hymn.mdx:2` | 384 | river-sutra | archetypal voice; byline/provenance unresolved; body 349w |
| `rupin-waterfall-days` — `data/stories/rupin-waterfall-days.mdx:2` | 411 | rupin-pass-trek | archetypal voice; byline/provenance unresolved; body 374w |
| `small-god` — `data/stories/small-god.mdx:2` | 366 | forgotten-shrine | archetypal voice; byline/provenance unresolved; body 335w |
| `solstice-fire` — `data/stories/solstice-fire.mdx:2` | 392 | solstice-snow | archetypal voice; byline/provenance unresolved; body 357w |
| `sunlit-song` — `data/stories/sunlit-song.mdx:2` | 418 | sunlit-passes | archetypal voice; byline/provenance unresolved; body 377w |
| `tirthan-the-slow-valley-reflections` — `data/stories/tirthan-the-slow-valley-reflections.mdx:2` | 186 | river-sutra | editorial/unverified; body 154w |
| `why-locals-avoid-manali-in-peak-season` — `data/stories/why-locals-avoid-manali-in-peak-season.mdx:2` | 310 | solstice-snow | editorial/unverified; body 269w |

### Destinations

| Entry / evidence | Words | Ownership / local context | Findings |
|---|---:|---|---|
| `bilaspur` — `data/destinations/bilaspur.mdx:2` | 79 | himachal | body 56w; no author/source/reviewer model; image missing |
| `chamba` — `data/destinations/chamba.mdx:2` | 98 | himachal | body 72w; no author/source/reviewer model; image missing |
| `hamirpur` — `data/destinations/hamirpur.mdx:2` | 80 | himachal | body 60w; no author/source/reviewer model; image missing |
| `kangra` — `data/destinations/kangra.mdx:2` | 77 | himachal | body 52w; no author/source/reviewer model; image missing |
| `kinnaur` — `data/destinations/kinnaur.mdx:2` | 82 | himachal | body 62w; no author/source/reviewer model; image missing |
| `kullu` — `data/destinations/kullu.mdx:2` | 88 | himachal | body 64w; no author/source/reviewer model; image missing |
| `lahaul-spiti` — `data/destinations/lahaul-spiti.mdx:2` | 87 | himachal | body 67w; no author/source/reviewer model; image missing |
| `manali` — `data/destinations/manali.mdx:2` | 344 | himachal | body 310w; no author/source/reviewer model; image missing |
| `mandi` — `data/destinations/mandi.mdx:2` | 88 | himachal | body 65w; no author/source/reviewer model; image missing |
| `shimla` — `data/destinations/shimla.mdx:2` | 83 | himachal | body 59w; no author/source/reviewer model; image missing |
| `sirmour` — `data/destinations/sirmour.mdx:2` | 75 | himachal | body 51w; no author/source/reviewer model; image missing |
| `solan` — `data/destinations/solan.mdx:2` | 81 | himachal | body 59w; no author/source/reviewer model; image missing |
| `una` — `data/destinations/una.mdx:2` | 76 | himachal | body 58w; no author/source/reviewer model; image missing |

### Places

| Entry / evidence | Words | Ownership / local context | Findings |
|---|---:|---|---|
| `chintpurni` — `data/places/chintpurni.yaml:1` | 20 | himachal; district=una | description-only; coordinates unverified; image missing |
| `jibhi` — `data/places/jibhi.yaml:1` | 35 | himachal; district=kullu | description-only; coordinates unverified; image missing |
| `kalpa` — `data/places/kalpa.yaml:1` | 27 | himachal; district=kinnaur | description-only; coordinates unverified; image missing |
| `manikaran` — `data/places/manikaran.yaml:1` | 24 | himachal; district=kullu | description-only; coordinates unverified; image missing |
| `mcleod-ganj` — `data/places/mcleod-ganj.yaml:1` | 20 | himachal; district=kangra | description-only; coordinates unverified; image missing |
| `naggar` — `data/places/naggar.yaml:1` | 32 | himachal; district=kullu | description-only; coordinates unverified; image missing |
| `sajla` — `data/places/sajla.yaml:1` | 28 | himachal; district=kullu | description-only; coordinates unverified; image missing |
| `triund` — `data/places/triund.yaml:1` | 20 | himachal; district=kangra | description-only; coordinates unverified; image missing |

### Regions

| Entry / evidence | Words | Ownership / local context | Findings |
|---|---:|---|---|
| `himachal` — `data/regions/himachal.yaml:1` | 45 | — | short introduction plus lists; no source model; image missing |

### Films

| Entry / evidence | Words | Ownership / local context | Findings |
|---|---:|---|---|
| `monsoon-mist-tirthan` — `data/films/monsoon-mist-tirthan.yaml:1` | 17 | river-sutra | EXAMPLE video URL; not verified media |
| `summer-light-kinnaur` — `data/films/summer-light-kinnaur.yaml:1` | 25 | sunlit-passes | EXAMPLE video URL; not verified media |
| `temple-bells-mandi` — `data/films/temple-bells-mandi.yaml:1` | 22 | kamrunag-the-lake-of-oaths | EXAMPLE video URL; not verified media |

### Hardcoded editorial seeds (not independent detail pages)

| Group / title | Evidence | Links to | Review |
|---|---|---|---|
| temple-seeds: Kamrunag | `app/temples/page.tsx:16` | `/chapters/kamrunag-the-lake-of-oaths` | No stored source/reviewer; needs local claim review |
| temple-seeds: Shikari Devi | `app/temples/page.tsx:25` | `/chapters/devidarh-shikari-devi` | No stored source/reviewer; needs local claim review |
| temple-seeds: Churdhar (Chureshwar Mahadev) | `app/temples/page.tsx:34` | `/chapters/churdhar-sacred-ascent` | No stored source/reviewer; needs local claim review |
| temple-seeds: Parashar Rishi | `app/temples/page.tsx:43` | `/chapters/parashar-lake-trek` | No stored source/reviewer; needs local claim review |
| temple-seeds: Baga Sarahan (Bhima Kali line) | `app/temples/page.tsx:52` | `/chapters/baga-sarahan-bashleo-pass` | No stored source/reviewer; needs local claim review |
| temple-seeds: Forgotten village shrines | `app/temples/page.tsx:61` | `/chapters/forgotten-shrine` | No stored source/reviewer; needs local claim review |
| folklore-seeds: The Lake That Keeps Oaths | `app/folklore/page.tsx:16` | `/chapters/kamrunag-the-lake-of-oaths` | No stored source/reviewer; needs local claim review |
| folklore-seeds: The Shrine the Sky Refused to Cover | `app/folklore/page.tsx:23` | `/chapters/devidarh-shikari-devi` | No stored source/reviewer; needs local claim review |
| folklore-seeds: The Island That Drifts | `app/folklore/page.tsx:30` | `/chapters/parashar-lake-trek` | No stored source/reviewer; needs local claim review |
| folklore-seeds: The Small God at the Village Edge | `app/folklore/page.tsx:37` | `/chapters/forgotten-shrine` | No stored source/reviewer; needs local claim review |
| folklore-seeds: The Caves That Answer Back | `app/folklore/page.tsx:44` | `/chapters/echoing-caves` | No stored source/reviewer; needs local claim review |
| folklore-seeds: The Palanquin That Chooses Its Bearers | `app/folklore/page.tsx:51` | `/chapters/baga-sarahan-bashleo-pass` | No stored source/reviewer; needs local claim review |
| journal-seeds: Why we walk slowly | `app/journal/page.tsx:16` | `/responsible-travel` | Index-link teaser, not a separate essay |
| journal-seeds: Four books, four moods of the mountain | `app/journal/page.tsx:23` | `/books` | Index-link teaser, not a separate essay |
| journal-seeds: Gods as neighbours | `app/journal/page.tsx:30` | `/temples` | Index-link teaser, not a separate essay |
| journal-seeds: The voices of the trail | `app/journal/page.tsx:37` | `/stories` | Index-link teaser, not a separate essay |

### District-derived content coverage

| Destination hub | Chapters | Places | Primary stories |
|---|---:|---:|---:|
| `bilaspur` | 0 | 0 | 0 |
| `chamba` | 1 | 0 | 0 |
| `hamirpur` | 0 | 0 | 0 |
| `kangra` | 0 | 2 | 0 |
| `kinnaur` | 3 | 1 | 4 |
| `kullu` | 10 | 4 | 10 |
| `lahaul-spiti` | 1 | 0 | 0 |
| `manali` | 1 | 0 | 2 |
| `mandi` | 4 | 0 | 2 |
| `shimla` | 3 | 0 | 1 |
| `sirmour` | 1 | 0 | 1 |
| `solan` | 0 | 0 | 0 |
| `una` | 0 | 1 | 0 |

## 7. Approval-ready sequence and boundaries

1. **Founder content-truth decisions first:** classify every archetypal narrative; establish permission/source records; resolve Sarahan/Baga Sarahan, Echoing Caves and Manali taxonomy. Do not manufacture a field visit or named author.
2. **Prepare claim-by-claim verification packs**, beginning with Kamrunag, Shikari Devi, Parashar and temple etiquette; distinguish beliefs, site rules and physical facts. Cite named/official sources or retain honest hedging/omission. Recheck dynamic access/safety information before any publication.
3. **Approve presentation/model fixes separately:** chapter headings and visible useful practical context; book metadata/thesis fields; place long-form choice; author/reviewer/source fields; genuine image credits; explicit draft/publication state. Do not equate `unverified` with unpublished or auto-noindex existing records.
4. **Approve one content upgrade at a time**, starting from an existing canonical page, not seven empty book launches. Match clear search intent with actual questions verified by the research/GSC agents. No volumes, difficulty scores, ranking guarantees or “all thin pages cannot rank” claims are supplied here.
5. **Approve book consolidation/primary navigation only after** `BOOK_PROPOSALS.md` decisions. Freeze `parashar-lake-trek`, `kamrunag-the-lake-of-oaths` and `saroa-to-kamrunag` campaign URLs. If a future approved move changes a URL, plan explicit single-hop 301s, canonical/sitemap/internal-link changes and UTM regression checks.
6. **Acceptance tests after approved implementation:** reader `.all()` count equals source count; every record's canonical content route renders substantive expected text; source/author disclosures visible; no draft leakage; all relationship and image targets resolve; duplicate URL canonicals intentional; four-season shelves retained; no story orphaned; no unsupported local claims. This audit did not run a build or deploy.

## 8. Evidence discipline and prior-doc drift

Read the project system, content architect, chapter editor, local verification, SEO and reputation agents, architecture command, migration/brand/growth/content-psychology/chapter-pack docs and relevant content sections of previous root audits. Previous reports are context, not current measurements. Specifically:

- The four-book and 17-story snapshots are obsolete; current counts are 5 and 20.
- “No author fields” and “every chapter is 640–976 words” are obsolete/model-versus-render confusions. Field coverage and distinct word metrics are above.
- “All stories map 1:1” is obsolete; three chapters now have two primary stories. Etiquette adds cross-topic recommendations, not two new primary testimonies.
- Reclassifying the poetic set now touches ten primary stories, not eight.
- Earlier claims about uncommitted etiquette, broken destination Markdown and orphan recovered stories must not be copied as current. This snapshot contains etiquette, a shared markdown renderer and recovered primary links.
- `docs/SEO_STRATEGY_2026.md:38-46` claims Organization linking “proves” narrative authority and fast loading makes AI citations exponentially more likely. These are not established evidence. Technical markup and speed do not prove first-hand experience, provenance or guaranteed AI citations.

**Limitations:** this is an exhaustive file-level inventory of the named collections, not an exhaustive external fact-check or measured crawl/indexing report. Public homepage/support pages and runtime technical issues are covered by the companion audits; static legacy copy is noted without claiming deployment. All source files were parsed; relationships/counts/field and local-asset checks were computed, not estimated. No local knowledge was invented to fill a gap.
