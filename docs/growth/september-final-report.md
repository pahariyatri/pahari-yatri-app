# September Growth Sprint — Final Report

**Date:** 2026-09-09
**Sprint:** September Growth Sprint, 8 phases
**Branch:** `beta`
**Status:** **NOT DEPLOYED. NOT COMMITTED. NOT PUSHED. Nothing published to any platform.**

Everything in this sprint exists as uncommitted working-tree changes plus documentation, exactly as instructed: *"Do not deploy automatically. Prepare all changes and provide summary before production release."*

---

## 0. QA GATE

**Status at time of writing: running.** This section is replaced with the verdict before handoff. If you are reading this line in a delivered document, the gate did not complete and nothing here should be released.

---

## 1. What actually shipped into the working tree

### Code — 6 files changed, 2 files added

| File | Change | Risk |
|---|---|---|
| `data/siteMetadata.js` | Removed banned phrase "hidden places in Himachal" from `keywords`; replaced with "local voices Himachal". Added a comment tying it to the two other copies of this string. | None — metadata only |
| `app/layout.tsx` | Same removal in the hardcoded fallback `keywords`. Facebook URL corrected to `facebook.com/fb.pahariyatri`. | None |
| `app/scan-me/page.tsx` | Facebook URL corrected. | None |
| `components/HiddenTrails.tsx` | Visible `<h2>` "Secret Valleys. Forgotten Trails." → "Forgotten Trails. Living Stories." | Copy only |
| `components/Footer.tsx` | Added one link: "Start Here" → `/start`. | One nav item |
| `lib/analytics.ts` | **Additive only.** Two new events, `start_page_click` and `portal_redirect_click`; `'start'` added to `ClickLocation`. Nothing existing altered. | None |
| `app/sitemap.ts` | Added `'start'` to static routes, priority 0.9. | None |
| **`app/start/page.tsx`** *(new)* | The `/start` orientation route. Server component. | New route, no collisions |
| **`app/start/start-links.tsx`** *(new)* | Client component for the tracked links. | — |

### Content — 1 chapter upgraded

`data/chapters/kamrunag-the-lake-of-oaths.yaml` — 114 lines → 354 lines. **12 fields added, 3 legacy package-tour fields removed.** Detail in §3.

### Documents — 10 files

| File | Phase | New or updated |
|---|---|---|
| `docs/growth/september-audit.md` | 0 | New — synthesis + the portal audit, which existed nowhere before |
| `docs/growth/chapter-upgrade-queue.md` | 4/5 | New — the prioritized queue, plus a record of what shipped |
| `docs/growth/september-final-report.md` | 8 | New — this file |
| `marketing/SOCIAL_MEDIA_AUDIT.md` | 0 | Updated — §9 competitor section refreshed to v3 |
| `marketing/INSTAGRAM_REELS_PLAN.md` | 2 | Updated — §9 September plan appended |
| `marketing/september-content-calendar.md` | 2 | New — day-by-day, Sep 9–30 |
| `marketing/linkedin-september-plan.md` | 3 | New — 4 founder + 8 company posts, written in full |
| `marketing/MONTHLY_GROWTH_REPORT.md` | 6 | Rewritten as edition #2 — **the first edition with real numbers** |
| `CLAUDE.md` | 7 | Updated — day-of-week mapping, reconciliations, three stale-fact corrections |

---

## 2. The `/start` page

**What it is.** A new route at `pahariyatri.com/start`, built as the destination for cold arrivals — the Instagram bio link, the printed QR on `/scan-me`, and brand-name search. Until now all of those landed on the homepage, which is written for people who already know what Pahari Yatri is.

**Sections, in order:** hero → Featured Book (*Parvati Valley, Beyond Kasol*, read live from Keystatic so the title and cover can never drift) → Popular Chapters → Why Pahari Yatri → Plan Your Journey (the portal bridge) → Join the Community.

**Verified, not assumed:**

- All eight chapter slugs the sprint named were checked against `data/chapters/` before being linked: `kasol-weekend`, `tosh-village-above-the-valley`, `kalga-slow-mountain-life`, `pulga-forests-and-silence`, `kheerganga-buni-buni-pass`, `grahan-protects-its-traditions`, `kamrunag-the-lake-of-oaths`, `parashar-lake-trek`. All eight exist and all eight build to real pages. Nothing was linked on faith.
- The page **prerenders as static** (`○` in the build output). Title, canonical, meta description, one `<h1>`, five `<h2>`s and the JSON-LD are all in the SSR HTML — no crawler waits on client JS.
- Schema: `WebPage` + `BreadcrumbList` + an `ItemList` carrying all eight chapter URLs.
- It is in the generated sitemap (110 URLs total).

**One thing caught late and fixed.** `/start` had **zero inbound internal links**. It was in the sitemap but orphaned in navigation — which, on a site where 90 of 127 pages are already unindexed, is the exact profile Google skips. A single footer link ("Start Here", first item under The Library) now points at it.

### The portal bridge — and the one word deliberately not used

Copy was drafted by `portal-brand-bridge-editor`. Two decisions worth stating plainly:

1. **The section does not use the word "verified."** The drafted copy said "verified partners," which is sanctioned brand language. It was removed because the portal audit run the same day found **"verified" used 25+ times on `app.pahariyatri.com` with no verification process anywhere in the code** — and a live listing named `ZZQAPendingApproval Cottage` rendering under the heading "Verified local taxi operators." CLAUDE.md forbids a verification claim without a real process behind it. Making that claim on the main site would have exported a false claim from a property that at least has the excuse of not knowing.
2. **The destination is not named as a product.** The portal's real live name is "Travel Platform by Pahari Yatri," not "Local Connect." The copy refers to it descriptively instead of branding it, because the naming question is unresolved (§6, decision 4).

Outbound URL, with attribution intact:

```
https://app.pahariyatri.com/en?utm_source=pahariyatri-site&utm_medium=bridge&utm_campaign=start-page&utm_content=plan-your-journey-cta
```

`utm_medium=bridge` is deliberately distinct from `reel`, so main-site bridge traffic never gets folded into Instagram Reel attribution. `/en` was verified live: the portal root 307-redirects to `/en/`, and `/en` returns 200.

---

## 3. The Kamrunag chapter — one chapter, done properly

**This is the deliberate scope decision of the sprint, and it is not a shortfall.**

The spec asked to restructure "all important chapters" across two books in one pass. This repo runs a documented one-chapter-at-a-time discipline (`chapter-upgrade-loop`, the "fix one thing per week" rule), with `local-verification-editor` gating every cultural claim. Attempting twenty chapters would have produced twenty shallow, unverified rewrites — the precise failure mode that discipline exists to prevent, on a site whose actual bottleneck is that 90 of 127 pages are not indexed.

**So: one chapter upgraded properly, and a prioritized queue for the rest** (`docs/growth/chapter-upgrade-queue.md`), which future loops consume one at a time.

**What changed in `kamrunag-the-lake-of-oaths`:**

- **8 real cited sources**, every one previously fetched and quoted in `docs/audit-evidence/research-citation-ledger.json`: the Mandi district administration's tourism page, three Tribune reports, Times of India, Hindustan Times, a 2018 peer-reviewed floristic study of the Kamrunag Sacred Grove, and Hill Post. No source was added that had not actually been read.
- **The title split.** `title` stays literary ("Kamrunag – The Lake of Oaths", still the `<h1>`). `seoTitle` is literal ("Kamrunag Lake, Mandi: Trek, Temple and Local Truth") and is now the `<title>`. This is the pattern the rest of the queue should follow.
- **FAQs 3 → 8**, rendering as `FAQPage` schema.
- **3 LEGACY package-tour fields removed:** `duration`, `difficulty`, `itinerary`.
- **`verificationStatus: needs-local-source`** — deliberately not `local-source`. Every named local in the file is quoted, via published journalism, on an *administrative* fact: a road, a langar, a stall rule, a cleaning window, a board meeting. **Not one is quoted on the cosmology.** Six `sourcesToVerify` entries name the real institutions that could close that gap.

**The verification gate did real work.** `local-verification-editor` returned **two UNSAFE items and 19 required edits. All 19 were applied before anything was written to disk.** The two unsafe items:

1. *"Nobody has ever measured the depth, and nobody has tried to audit it."* — a banned "nobody has ever" absolute that laundered one devotee's offhand remark, quoted in a newspaper, into a fact stated in the brand's own voice.
2. The `reelHook` used **"khazana"** (treasure) — the exact register the chapter spends four hundred words arguing against. Rewritten to "Woh khazana nahi, vaade hain" — not treasure, promises.

Other things the gate caught that would otherwise have shipped: an inference that the temple committee kept stalls off the premises "at a direct cost to their own neighbours' earnings" (the source says the reason was *cleanliness*); an assertion that a change to the fair is one "the community is still living with" (nobody at Pahari Yatri has asked them); a claim that the grove was kept intact by devta custom (unsupported causal history); and a plain factual error — **Kiratpur has no broad-gauge railhead**, the Bhanupli–Bilaspur line is unbuilt.

It also confirmed a genuine improvement: the previous live file stated "Dev Kamrunag, the rain god" as flat fact in two places. Both are gone; the rain association now appears only as a local name attributed to a published source, and as an open item on `sourcesToVerify`.

### Open founder question — this chapter is not finished until it is answered

**Did the founder personally make this visit?**

The narrative is first person and quotes an unnamed tea-stall shopkeeper ("Woh unka hai"). **That passage is pre-existing live content, not written this pass.**

The upgrade originally added `authorName: Pahari Yatri Editorial` / `authorType: editorial`. The gate flagged that an editorial byline over a first-person interview creates a narrator who does not exist, and `keystatic.config.ts:311` says explicitly: *"Do not invent a contributor."*

**Both fields were therefore left absent**, matching the previous live file exactly. Nothing was invented, and nothing pre-existing was deleted — deleting live content is a hard stop that requires the founder.

- **If the visit was real** → the byline must be a named human, with their permission.
- **If it was composite or illustrative** → the shopkeeper quote, the grandmother and "I threw no coin" come out, and the narrative moves to third person.

Do not add a byline until this is answered.

---

## 4. Two scope corrections made, and why

### 4.1 There is no "Sacred Lakes Book" — and none was invented

The spec's Phase 4 priority list read: 1. Parvati Valley Book, 2. Winter Himalaya Book, 3. Sacred Lakes Book. Priorities 1 and 2 map cleanly onto real, published books (`parvati-valley-beyond-kasol`, `winter`). **Priority 3 does not exist**, and creating it would have meant inventing a content structure to satisfy a document rather than a reader.

The lake chapters are already housed: Kamrunag sits in the published `winter` book. Prashar Lake was briefed to this sprint as an orphan chapter — **that turned out to be wrong, and the correction matters.**

`parashar-lake-trek` **is** assigned to a book: `data/books/monsoon.yaml`, line 15 (verified directly). It receives three inbound chapter links. Its real problem is worse than orphaning: **`monsoon` has no `published: true`**, so `/books/monsoon` serves `noindex, follow`. The chapter's only breadcrumb parent is a page Google is instructed to ignore.

That is a homelessness problem, not a linking problem, and the fix is a founder decision — **publish `monsoon`** — not a new book. Recorded in §6, decision 6.

### 4.2 Instagram Reel 5 cannot quote a local voice, and does not

The spec's Reel 5 was "Local voice: 'A village where time moves slowly.'" That collides directly with a blocking finding: **zero of the 28 stories in `data/stories/` carry a named human source.** Eight are correctly labelled editorial composites; twenty are unlabelled and read as real interviewed people.

A composite written in third person is a labelling problem. **The same composite spoken in first person on camera is a fabricated testimonial.**

So every week of the September Instagram plan gives slot 5 in two forms:

- **(a) the real-voice version, marked BLOCKED**, with the exact consent and sourcing needed to unblock it, routed through `OUTREACH_SYSTEM.md`'s existing consent terms;
- **(b) a shippable editorial/narrated fallback** that carries, verbatim on screen in the first three seconds and again in the caption: *"This is Pahari Yatri reading the valley, not a resident speaking."*

Named people already appear inside chapter narratives — `chandernahan-lake-trek` names a shepherd "Chatru", `parashar-lake-trek` has "an old man with a brass pot", `tosh-village-above-the-valley` has "a shopkeeper". **None of these are consented sources.** They must not be voiced, captioned, or put on screen.

An empty slot 5 is a scheduling gap. A fabricated one is a trust incident — and this account has 29 real, named 5-star Google reviewers who would be the first to notice.

---

## 5. Reconciliations recorded so they are not re-litigated

Recorded in `CLAUDE.md` alongside the existing LinkedIn and Instagram cadence reconciliations.

**Report files.** The spec asked for both a monthly GA4 growth report (Phase 6) and a September final report (Phase 8). A `marketing/MONTHLY_GROWTH_REPORT.md` already existed and was already wired into CLAUDE.md's monthly loop. Creating a third competing monthly-report file would have left the repo with two documents each claiming to be the recurring artefact.

- **`marketing/MONTHLY_GROWTH_REPORT.md`** is **the** recurring monthly growth report — numbered by edition, regenerated by the monthly loop, compared against the previous edition. Satisfies Phase 6. It is now **edition #2, the first with real numbers.**
- **`docs/growth/september-final-report.md`** (this file) is a **one-off sprint retrospective.** Different purpose, different lifecycle. Satisfies Phase 8.
- **`docs/growth/september-audit.md`** is the sprint's one-off Phase 0 baseline.

**Weekly workflow.** CLAUDE.md already had a "Growth Marketing Automation Workflow" with a 10-step weekly loop mapped to real agents and explicit data-access honesty rules. Phase 7 asked for a Monday/Tuesday/Wednesday/Friday cadence with agents named "SEO Agent / Content Agent / Social Agent / Growth Agent." Rather than create a second parallel system, **a day-of-week mapping was layered onto the existing 10 steps** — Monday steps 1–4, Tuesday steps 5 and 7, Wednesday steps 6 and 8–9, Friday the report generation. No new steps, no new agents, and the founder-supplied-data rule for steps 1–3 is unchanged.

**LinkedIn cadence.** Already recorded, applied unchanged: founder posts stay capped at 1/week; "3 posts/week" is met as 1 founder + 2 company-page posts.

---

## 6. Founder decisions — nothing proceeds past these

| # | Decision | Why it is blocking | Source |
|---|---|---|---|
| 1 | **The identity question.** Is the canonical self-description "Himalayan story library", "tour operator", or an explicit both-with-a-boundary? | The brand describes itself five different ways across five platforms it owns. The most-reviewed version — Google Business Profile, category "Tour operator" — is backed by 29 real 5-star reviews of real delivered treks. Both identities are true. Nothing tells a reader which one they are looking at. This cannot be fixed by editing copy in six places. | audit §1.1, §7 |
| 2 | **Do the 30 non-Himachal portal pages come down?** | `app.pahariyatri.com/en/explore/goa/rafting` returns HTTP 200 right now and lists Shimla, GHNP, Triund, Kangra and Spiti inventory as Goa inventory. 30 of 90 generated pages claim service in states the business does not serve. This is the "fake locations / doorway spam" hard-no in CLAUDE.md, currently shipped. **Recommend: yes, this week.** | audit §3.4 |
| 3 | **What does "verified" actually mean?** Build a real process, or replace the word with what is true? | 25+ instances on the portal with no process found in code — including a hardcoded "Verified Partner • 100% Acceptance", an invented fallback vendor name "Verified Mountain Host", anonymous reviews defaulting to author "Verified Traveler", and a **vehicle-safety claim** that all vehicles undergo verified checks. Live proof it is untrue: `ZZQAPendingApproval Cottage` rendering under "Verified local taxi operators." | audit §3.6 |
| 4 | **Request-first or payment-first?** And is the portal's product name permanent? | The portal ships live Razorpay checkout while the strategy documents "manual confirmation first, payment later" — and the copy currently claims **both** ("Request-Based Booking" and "Direct booking" on the same site). Separately, the live product name is "Travel Platform by Pahari Yatri"; "Local Connect" exists only in planning docs. | audit §3.8, §3.2 |
| 5 | **Who sets `NEXT_PUBLIC_GTM_ID` at Docker build time, and where does the production build run?** | All 14 portal events are wired correctly and are pushing into a `dataLayer` with **no GTM container behind it**. Verified by `curl`, not assumed. Until this is fixed, no portal decision is measurable. `.github/workflows/ci.yml` only lints/typechecks/build-tests, so it is not possible to say who needs to pass the build arg. | audit §3.10 |
| 6 | **Publish `data/books/monsoon.yaml`?** | `parashar-lake-trek` lives in it, so the Prashar cluster is invisible in the published library. | §4.1 |
| 7 | **Did the Kamrunag visit really happen?** | Determines whether the chapter gets a named byline or moves to third person. | §3 |
| 8 | **Story sourcing.** Label the 20 unlabelled stories, or begin real outreach? | The single largest credibility exposure. Blocks Voice of Himalaya, Instagram slot 5, and every chapter local-voice section. The 29 real GBP reviewers are the most plausible first outreach list. | audit §10 |
| 9 | **GBP hours** read "Closed · Opens 12 am Thu" | Very likely a data-entry default, on the highest-trust asset in the presence. Cheap fix. | audit §7 |
| 10 | **SafarCabby listing ownership** — founder-created, third-party, or scraped? | A street address in Solan that appears nowhere else in the presence. | audit §8 |
| 11 | **Approve before publishing:** the new Instagram bio, the LinkedIn job-posting rewrite, and every LinkedIn post draft. | All are live public surfaces. Nothing was published. Founder post F1 references the job-posting fix and **must not go out before that fix is live.** | LinkedIn plan §4 |
| 12 | **Main-site bridge event naming.** `portal_redirect_click` vs CLAUDE.md's listed `portal_cta_click` / `request_local_options_click`. | Rename one or the other. **Do not add a second overlapping event** — it would double-count the same click. | CLAUDE.md §8 |

---

## 7. The honest gap list — what this sprint did NOT do

1. **Nothing was published anywhere.** No Instagram post, no LinkedIn post, no GBP update, no bio change, no job-posting edit. All drafts.
2. **Nothing was committed, pushed, or deployed.**
3. **Nineteen chapters were queued, not upgraded.** Deliberate (§3). The queue is real and ordered.
4. **The portal was audited but not changed.** Not one line of `local-connect-app` was edited. Its three blocking issues (§6, decisions 2, 3, 5) all need founder sign-off, and two of them are live public-facing problems.
5. **Core Web Vitals, image weight, video weight and mobile speed were not measured.** No Lighthouse or field-data tooling was available in this environment. **No performance score is claimed, invented or estimated.** This is a manual check the founder must run — the honest position is that the sprint does not know.
6. **YouTube Studio internals** (traffic sources, retention) were not opened. The public channel page was sufficient for the audit's purposes.
7. **Reddit mentions were not re-checked.** The earlier "zero known mentions, not exhaustive" stands.
8. **No named local voice was secured**, so Instagram slot 5 ships editorial-only for all four September weeks (§4.2).
9. **`verificationStatus` renders nowhere.** It is authored in `keystatic.config.ts:272` and referenced nowhere under `app/`, `components/` or `lib/`. Setting it warns no reader — which is exactly why the 19 prose edits mattered. Surfacing it is an unscoped UI change.
10. **`saroa-to-kamrunag.yaml` still asserts 3,334 m flatly**, while Kamrunag now openly flags the conflict with a published 2,900 m GPS reading. One-line follow-up, deliberately not bundled into this pass.

---

## 8. The real baseline — carried forward, not re-derived

Read live off real dashboards on 2026-09-09. Full detail in `marketing/SOCIAL_MEDIA_AUDIT.md`; do not re-derive these.

| Metric | Value |
|---|---|
| Organic clicks (3 months) | **24** |
| Organic impressions (3 months) | **1,160** |
| Average CTR | **2.1%** |
| Average position | **16.8** |
| Pages indexed | **37 of 127** — 90 not indexed |
| GA4 users (28 days) | **83** |
| `chapter_view` (28 days) | **7** |
| `reel_source_visit` (28 days) | **2** |
| Instagram followers | **1,065**, net **−7** over 90 days |
| Instagram content published (28 days) | **2 pieces** |
| Best Instagram reel (28 days) | 2,828 views / 2,240 reach |
| Best 90-day performer | 2,961 views — **a repost of another creator**, not original content |
| Facebook | 36 followers, reach of **1** in 7 days, live since Aug 2023 |
| YouTube | 2 subscribers, **1 Short ever** |
| LinkedIn | 77 followers, **0 posts ever** |
| Google Business Profile | Verified, **5.0★, 29 real reviews**, category "Tour operator" |

**None of the six keywords the sprint named appears in the real top-10 queries.** Those are `pahari`, `pahari path`, `mural danda trek`, `mural hills`, `pahadi log`, `jamadagni rishi temple`, `yatri way`, `patiyayatri`, `यात्री`, `himalayan folklore` — half of them brand-name confusion with the Pahari language and people.

---

## 9. The next 90 days

**The organising principle: indexing and trust before volume.** 90 unindexed pages and a portal claiming verification it cannot evidence are the two real constraints. More content on top of either makes the problem bigger, not smaller.

### Days 1–30 — stop the bleeding

1. **Take down the 30 non-Himachal portal pages** and filter QA fixtures out of public inventory. Highest severity, lowest effort, currently live. (Decision 2)
2. **Set `NEXT_PUBLIC_GTM_ID` in the portal's production Docker build.** One build arg. Until it lands, nothing on the portal is measurable. (Decision 5)
3. **Publish the new Instagram bio and repoint the bio link to `/start`** with its UTM. Highest-leverage change available on the only channel with real reach.
4. **Publish LinkedIn's first post ever.** 77 followers, the best-written brand description the company owns, zero cost. Drafts are ready.
5. **Answer the identity question** (decision 1). Everything downstream — GBP category, bios, job posting, portal copy — is blocked on it.
6. **Fix the GBP hours.**

### Days 31–60 — make the library findable

7. **Work the indexing problem directly.** Submit `/start` and the upgraded Kamrunag chapter, then diagnose the 90 systematically rather than assuming a cause.
8. **Run the chapter-upgrade queue, one chapter per loop, verification-gated.** The queue's top five are `kheerganga-buni-buni-pass`, `malana-myth-and-reality`, `parashar-lake-trek` (gated on publishing `monsoon`), `chandernahan-lake-trek`, `understanding-parvati-valley`.
9. **Roll out the `title`/`seoTitle` split** to every poetic chapter. Kamrunag is the worked example.
10. **Label the 20 unlabelled stories**, then begin real outreach to the 29 GBP reviewers — with consent asked properly, per `OUTREACH_SYSTEM.md`. This is what unblocks slot 5, and it is a slow path by design.
11. **Decide what "verified" means on the portal** and rewrite every instance to match reality. (Decision 3)

### Days 61–90 — build on something real

12. **Resolve request-first vs payment-first**, then fix the traveller flow to capture name, WhatsApp, notes and consent. Today an abandoned builder session leaves **zero** recoverable lead, on a page that promises "No sign-up needed" and then hits an auth wall. (Decision 4)
13. **Add the missing vendor onboarding fields**, location first — without it there is no local SEO, no geographic matching, and no basis for verifying that anyone is local.
14. **Build the portal → main-site trust bridge.** The portal currently links to `pahariyatri.com` three times and never to a single chapter, book or the Yatri Code.
15. **Re-run `/platform-presence-audit` and generate edition #3** of the monthly report, compared against edition #2. The first real month-over-month comparison this brand will have.

### What success looks like at day 90

Measured against the real baseline in §8, not an aspiration:

- Pages indexed: **37 → meaningfully above 60.** The single most important number.
- `reel_source_visit`: **2 → above 10 per 28 days.**
- `chapter_view`: **7 → above 30 per 28 days.**
- Instagram net follower change: **−7 → non-negative.**
- LinkedIn posts published: **0 → at least 12.**
- Portal pages making an unbacked "verified" claim: **25+ → 0.**
- Portal pages advertising states the business does not serve: **30 → 0.**
- Stories with a named, consented human source: **0 → at least 1.** One real voice is worth more than twenty composites.

---

## 10. Rollback

Every change is uncommitted. Nothing is live.

To discard the entire sprint's code and content changes:

```bash
cd /home/pankaj-kumar/Workspace/pahari-yatri-app
git checkout -- CLAUDE.md app/layout.tsx app/scan-me/page.tsx app/sitemap.ts \
  components/HiddenTrails.tsx components/Footer.tsx \
  data/chapters/kamrunag-the-lake-of-oaths.yaml data/siteMetadata.js lib/analytics.ts
rm -rf app/start
```

To discard only the documentation:

```bash
rm -rf marketing docs/growth/september-audit.md \
  docs/growth/chapter-upgrade-queue.md docs/growth/september-final-report.md
```

Per-change rollback notes are in the QA section (§0).
