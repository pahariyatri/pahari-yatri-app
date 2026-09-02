# Pahari Yatri — SEO, Content & Authority Refactor Report

Status: **Phase 1 (audit) complete. One zero-risk data fix applied. Everything else is a staged plan awaiting founder approval.**
Last updated: 2026-09-02

---

## 0. How this report was produced

The growth loop for this task was run via `growth-orchestrator`. The orchestrator itself hit a session-level API rate limit partway through (this is an account/session quota, unrelated to code) and did not get to run every specialist in the original scope (content-architect, analytics-tracking-agent, portal-brand-bridge-editor, nextjs-production-engineer, qa-security-reviewer). Before it failed, it had already dispatched one specialist pass that completed a full, live-verified technical SEO / information-architecture / GEO audit. That audit is Part 1 below, reproduced with corrections (see 0.1).

Everything in this report is either (a) directly verified against the live repo/build in this session, or (b) carried over from the specialist audit and flagged where verified vs. not yet independently re-checked.

### 0.1 Correction to the specialist audit

The audit states the site has no mechanism for chapter-to-chapter sideways links or per-chapter SEO title/meta overrides, and recommends adding `seoTitle`, `pageType`, and a `district` relationship field to the `chapters` schema.

**This is incorrect as stated.** `keystatic.config.ts` (chapters collection, comment: "Chapter architecture & SEO — added 2026-08") already defines: `seoTitle`, `metaDescription`, `targetKeyword`, `secondaryKeywords`, `trackType` (enum: lake/temple/village/trail/pass/town/cultural — functionally the same as the proposed `pageType`), `region` (relationship to a `regions` collection), and **`relatedChapters`** (array relationship to `chapters`, described in-schema as *"2–4 sideways links to genuinely related places. Builds the cluster."* — this is exactly the sideways-linking mechanism the audit says is missing).

Verified: **zero of the 24 chapter YAML files populate any of these fields**, and `lib/keystatic/chapterView.ts` does not read `seoTitle`, `metaDescription`, `trackType`, `region`, or `targetKeyword` anywhere (confirmed by grep — no matches). So the real situation is: **the schema was built ahead of both the data and the rendering code**, then abandoned mid-build. This changes the implementation plan — the work is "wire the existing fields into the view layer and populate them," not "design and add new schema."

This is exactly the kind of stale-assumption error `CLAUDE.md` warns about re-verifying rather than trusting. Treat every fact below the same way — re-check before acting on it if time has passed.

---

## 1. Executive summary

Pahari Yatri's content is stronger than its rendering and linking layer. The best individual asset on the site (`data/destinations/manali.mdx`) is being served to users and to Google as literal, unrendered Markdown source (`**bold**`, `## heading` visible as text) because of a rendering bug, not a content gap. Three of the most literally-titled, search-shaped stories on the site have zero internal links pointing at them. Seven chapters (including two of the three flagship "Sacred Mandi" chapters) point at story slugs that don't exist, so those links silently render as nothing. Two soft-404 utility pages receive 21 internal links combined. And 21 live pages carry an identical, fabricated "local knowledge" sentence ("locals shop at the Tuesday mandi," "the real viewpoint is 200m behind the temple") asserted as fact regardless of whether it's true for that place — a direct violation of this project's own local-verification standard, and the single most urgent fix in the report.

None of this requires new pages, a redesign, or more Local Connect promotion. It requires: fixing what's broken, wiring up schema that already exists, removing fabricated claims, and expanding roughly 8 chapters and 3 stories that already have the strongest keyword fit and the weakest competition.

## 2. Current-state audit (technical + IA)

See the full specialist findings below (Part A). Headline items, live-verified:

- **Indexation**: ~70 URLs in the sitemap, an estimated ~19 indexed (per the specialist's GSC read — not independently re-verified this session).
- **Rendering bug**: `app/[...slug]/page.tsx` renders destination-page MDX via `.toString()` into `dangerouslySetInnerHTML` instead of an MDX/HTML renderer. Confirmed live on `/himachal/travel-guide/manali` — visible body text contains literal `##` and `**` markdown syntax. Zero `<h2>` tags on any of the 13 destination pages or 8 place pages.
- **Soft 404s**: `/himachal/travel-guide` and `/himachal/places` return HTTP 200 with ~80 words of chrome and the generic homepage `<title>`. Linked from every destination/place page's breadcrumbs (21 internal links total pointing at empty pages).
- **Broken relatedStories**: 7 of 24 chapters referenced story slugs that don't exist in `data/stories/`. **Fixed this session** — see Part 3.
- **Orphan stories**: `why-locals-avoid-manali-in-peak-season`, `kinnaur-beyond-the-pass-reality`, `tirthan-the-slow-valley-reflections` have no `relatedChapter` set and are linked from nowhere, despite being the three most literally search-shaped stories on the site.
- **Fabricated local-knowledge boilerplate**: identical unverified claims hardcoded into the destination/place page template, live on 21 URLs.
- **llms.txt**: already exists at `/llms.txt`, well-formed, but links only hub pages — no chapters. Low-cost, low-but-real value; not a ranking mechanism.
- **Redirects, canonicals, JSON-LD FAQPage on chapters, AI-crawler robots access**: all already correct — explicitly confirmed as "don't touch, don't redo."

## 3. What was actually changed this session

| Change | Files | Live effect | Risk |
|---|---|---|---|
| Removed 7 dead `relatedStories: [nonexistent-slug]` entries | `data/chapters/{saroa-to-kamrunag, devidarh-shikari-devi, baga-sarahan-bashleo-pass, chandernahan-lake-trek, mural-danda-trek, echoing-caves, shepherds-path}.yaml` | **None** — these already rendered zero story links (the null result was silently filtered), so removing the dead reference changes no user-visible output. It only removes invalid data that could cause wasted resolution attempts. | None |

Verified: `git diff --stat` shows only these 7 files, 2 lines removed each, no other changes. `npm run build` completed clean — 116 pages, same route list as before (`/chapters/*` all 24 present, `/stories/*` all 20 present, `/books/*` all present, sitemap/robots/manifest all generated).

**Nothing else was implemented.** Every other finding below is a proposal awaiting approval.

## 4. Content authority audit

- Strongest asset: `data/destinations/manali.mdx` — real "who this is for / who should avoid it" framing, named villages, a genuine FAQ block. Undermined entirely by the rendering bug in §2.
- Weakest tier: the 8 `places` collection entries. The schema has **no content field at all** (`title`, `parentRegion`, `description`, `image`, `coordinates` only) — these pages are structurally incapable of holding more than ~40 unique words, independent of any writing effort.
- Duplicate/fabricated concept: the 21-page local-knowledge boilerplate (§2) is simultaneously a duplicate-content problem and a trust/brand-standard violation — it asserts unverified specific local claims as fact, which is exactly what `local-verification-editor` exists to prevent, applied here to destination-page template copy instead of chapter narrative.
- 10 of 24 chapters are intentionally "reflection" pieces (poetic titles: `Echoing Caves`, `Rain Prayer`, `River Sutra`, etc.) — these are correctly brand texture, not search assets, but the current title template falsely asserts "— Himalayan Trek in [location]" on several of them where no trek is described.
- Median story length is ~360 words; the 3 orphan stories are the thinnest (155–275 words) *and* the most literal/searchable — link equity is currently inverted (poetic, unsearchable stories get the links).

## 5. AI-search / GEO readinesss

- No submission mechanism exists for ChatGPT/Gemini/Perplexity/etc. — none is claimed or should be.
- Real levers, in priority order: (1) third-party citations — currently near zero, the actual bottleneck; (2) extractable single-sentence factual claims per section (chapters' `overview` field already does this well; it's just not exposed as visible headed sections); (3) FAQPage JSON-LD — already implemented well on all 24 chapters, absent on destination/place pages; (4) heading structure — currently zero `<h2>` on 21 pages, same bug as §2; (5) AI-crawler robots access — already correct, no action needed.
- `llms.txt` recommendation: keep it, add a curated 8–12 chapter list with one-line literal descriptions (currently links zero chapters). Do not oversell its impact — it is a hedge, not a growth lever.

## 6. Information architecture

Recommended structure uses **only URL patterns that already exist** — no new URL shapes, no programmatic page generation:

```
/himachal → /himachal/travel-guide/{district} → /chapters/{slug} → /stories/{slug}
cross-cutting: /temples, /folklore, /responsible-travel
reading axis (secondary): /books/{book}/{chapter}
```

Explicit recommendation against programmatic pages: the site has ~70 URLs and roughly ~19 indexed — the constraint is quality per URL, not URL count. Every one of the 13 destination pages and 8 place pages should be preserved (none deleted, none redirected, none 410'd) but reclassified: destination pages become real "district index" pages (150–250 words of honest orientation + a real link block to every chapter/story/place in that district), not attempted 2,000-word guides.

One new page is recommended: a temple/etiquette chapter. It's a structural prerequisite — the rule "every sacred chapter links to the etiquette page" cannot be implemented because the page doesn't exist yet.

## 7. Local Connect boundary

Not audited in depth this session (scope ran out of budget before `portal-brand-bridge-editor` ran). Existing CTA discipline in the destination/chapter templates was not found to be a problem in what was reviewed — no evidence of over-promotion or sales-page tone was flagged by the specialist pass. Flag for a follow-up run once approved changes are implemented, so cross-linking copy can be reviewed together with the new pillar links.

## 8. Analytics audit

**Not run this session** — `analytics-tracking-agent` did not get to execute before the orchestrator hit its rate limit. This is an open item, not a "no issues found."

## 9. Performance audit

**Not run in depth this session.** The one relevant data point gathered: production build is clean, 116 static pages, no build-time errors or warnings surfaced in the output reviewed.

## 10. Staged implementation plan — everything below needs founder approval

Per this repo's approval policy (`CLAUDE.md`) and the explicit guardrail on this loop ("stop after the plan if it touches more than ~10 files or any live URL"), nothing past §3 has been implemented. Batches are ordered by impact-to-risk ratio, each sized to stay implementable and reviewable independently.

**Batch 1 — Remove the fabricated local-knowledge boilerplate.** Highest urgency, lowest risk. Touches the destination/place page template (`app/[...slug]/page.tsx`) — one shared component, 21 live pages affected. This is a trust/brand-standard fix, not just SEO.

**Batch 2 — Fix the MDX rendering bug.** `app/[...slug]/page.tsx`, destination + place rendering path. Repairs 21 live pages from literal-markdown-as-text to actual HTML. No content changes — same words, correctly rendered. Should ship together with or immediately after Batch 1.

**Batch 3 — Wire the 3 orphan stories in.** Set `relatedChapter` on `why-locals-avoid-manali-in-peak-season` → `solstice-snow`, `tirthan-the-slow-valley-reflections` → `river-sutra`, `kinnaur-beyond-the-pass-reality` → `rupin-pass-trek` (best geographic fit — Sangla/Kinner Kailash), and add each as a second `relatedStories` entry on that chapter. 6 files. Adds new visible links to 3 live chapter pages — flagged as public-facing even though it's a correctness fix, not a copy change.

**Batch 4 — Wire the existing `relatedChapters` schema field into `chapterView.ts` and populate it for the highest-priority cluster.** Makes real the "2–4 sideways links" the schema already promises. First use: bidirectional Kamrunag ↔ Saroa link, then the Sacred Lakes triangle (Kamrunag / Parashar / Chandernahan). Code change (`chapterView.ts` + the chapter page template) plus data on ~6 chapter files.

**Batch 5 — Fix the chapter title/meta-description template.** Use the existing (already-in-schema, currently-unused) `seoTitle`/`metaDescription`/`trackType` fields with sensible fallbacks (de-dupe "Trek Trek," prefer `overview` over `excerpt` for meta description). Code change in `chapterView.ts`, populate `seoTitle` by hand only for the ~8 priority chapters. Changes the `<title>`/meta of 24 indexed URLs — expect 4–8 weeks of noisy CTR data. **Needs explicit sign-off given the live-SERP impact.**

**Batch 6 — District hub reclassification.** Rewrite the 13 destination pages down from "attempted guide" to "honest orientation + real link block," starting with Mandi/Kullu/Manali. Removes boilerplate (covered by Batch 1), adds internal links to chapters. Public copy change on 13 live URLs — needs approval and ideally `chapter-editor`/`local-verification-editor` involvement for the orientation paragraphs.

**Batch 7 — Build `/himachal/travel-guide` and `/himachal/places` as real index pages**, converting the two soft-404s. New route content, not new URLs.

**Batch 8 — Write the temple/etiquette chapter.** One new URL. Needs `local-verification-editor` before publishing (cultural/ritual claims).

**Batch 9 — Content expansion.** The ~8 chapters and 3 stories identified as best keyword-fit/lowest-competition (Kamrunag pillar, Parashar, Shikari Devi, Churdhar, Chandernahan, Kheerganga hot spring angle, the 3 orphan stories, the new Parvati-villages-beyond-Kasol chapter). Owned by `chapter-editor` + `local-verification-editor`, run as its own loop per existing project process (`chapter-upgrade-loop`), not bundled into this SEO batch.

**Not recommended, flagged explicitly so it isn't attempted by accident:** merging the two Kamrunag chapters, redirecting/deleting any of the 13 destination or 8 place pages, any programmatic page generation, renaming `manali`'s URL to fit under `kullu` more "correctly."

## 11. QA verdict

`qa-security-reviewer` ran against the only change actually made this session (§3, the 7-file dead-reference cleanup).

**Verdict: PASS WITH NOTES. No blocking issues.**

The "zero live rendering difference" claim was verified empirically, not just argued: QA built the repo post-fix, stashed the fix, rebuilt pre-fix, and diffed the two output trees. All 24 chapter pages and all 27 book-route pages were byte-identical except the build ID and build timestamp. `tsc --noEmit` clean, `npm run build` clean (116 pages), sitemap byte-identical (86 URLs, all 7 affected chapters present with unique titles, not soft-404s), redirects unchanged, no secrets in the diff, no banned brand language, no content/prose changed — only a machine-readable relationship key removed.

Non-blocking notes surfaced, worth acting on:

1. **The change is uncommitted and unstaged.** `git diff --cached` is empty. Nothing has been committed — see §13 for the exact state.
2. **This report file itself is untracked** and not in `.gitignore`. A future `git add .` would sweep it in — decide deliberately whether it should ship in a commit.
3. **A latent repeat of this exact bug class exists in dead code**: `lib/schema.ts:85-86` (`getTouristTripSchema`) reads the raw, unfiltered `relatedStories` array and would build JSON-LD `TouristTrip` URLs straight from it — no resolution, no null-filtering. It has zero callers today, which is the only reason it never shipped broken structured data. If anyone wires this function up later, the same dangling-slug bug returns in JSON-LD. Worth a one-line filter fix if that code is ever activated.
4. **`lib/keystatic/chapters.ts` is an entirely unimported module** duplicating logic that lives for real in `chapterView.ts`. Its own `relatedStories` handling can silently drift from the live path. Candidate for deletion — flagged, not acted on (founder call).
5. Pre-existing and unrelated to this change: `app/layout.tsx:161-162` sets JSON-LD `datePublished`/`dateModified` to build time, so every page reports as "modified" on every deploy. Noted only because it's what produced the byte-diff noise QA had to normalize past.
6. **Open question, not yet resolved**: were the 7 dangling story slugs (`ridge-to-vows`, `shikari-bells-in-wind`, etc.) meant to eventually become real stories, rather than being dead typos? Deleting the reference is correct either way for the *data*, but it does drop the only remaining record of those intended slugs. If they were planned content, note it before this gets forgotten — Batch 3/9 story-writing work should account for it if so.

## 12. Rollback

Nothing is committed — the 7-file change is an unstaged working-tree edit. To discard it entirely:
```bash
git restore data/chapters/
```
This is exact — only those 7 files are modified under `data/chapters/`. No commit exists yet to revert.

## 13. What to do next

1. Review Batches 1–9 above and tell me which to approve, in what order. My recommendation: **1 → 2 → 3 → 4** first (all low-risk correctness fixes, no new copy to write), then decide on 5 (title/meta — has SERP-visible risk) and 6 (needs editorial time) separately, 7–9 after.
2. Once approved, implementation resumes through `nextjs-production-engineer`, gated by `qa-security-reviewer` again before anything is pushed, per the standard loop.
3. Analytics (§8) and Local Connect boundary (§7) audits are still open — worth a follow-up loop even before the implementation batches land, since they don't depend on the code changes above.
