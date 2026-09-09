# September Growth Sprint — Phase 0 Audit

**Date:** 2026-09-09
**Sprint:** September Growth Sprint (8 phases)
**Status:** Audit and synthesis only. Nothing was published, deployed, committed or sent.

---

## 0. What this document is, and what it is not

This is the **Phase 0 synthesis** for the September Growth Sprint. It does not re-run work that already exists. It joins three inputs into one picture:

| Input | Where it lives | Freshness |
|---|---|---|
| Website, Instagram, Facebook, LinkedIn, YouTube, Google Business Profile, off-site listings, Google Search appearance | `marketing/SOCIAL_MEDIA_AUDIT.md` (v2 platforms, v3 competitors) | Live logged-in pass, 2026-09-09 |
| Competitor landscape — Kamrunag, Parvati Valley, Prashar, Instagram attention | `marketing/SOCIAL_MEDIA_AUDIT.md` §9 | Refreshed live, 2026-09-09 |
| **App portal (`app.pahariyatri.com`)** | **This document, §3 — new work, nowhere else** | Fresh code + live audit, 2026-09-09 |

**The platform numbers are not restated here.** They are in `marketing/SOCIAL_MEDIA_AUDIT.md`, read live off real dashboards, and duplicating them into a second document is how two documents start disagreeing. This one summarises, links, and adds the portal.

**Data honesty.** Every figure below was read off a live dashboard, a live page, or the repository on 2026-09-09. Nothing is estimated. Where a thing could not be verified, it says so.

---

## 1. The one-paragraph version

Pahari Yatri owns seven public surfaces. Six of them are dormant, one of them (Instagram) is active but shrinking, and the most-trusted one (a verified Google Business Profile with 29 real 5-star reviews) describes the business as a **tour operator** while the strategy describes a **story library**. Search traffic is real but tiny — 24 clicks in three months — and, more importantly, **90 of 127 pages are not indexed by Google at all**, which means the content strategy is not being throttled by competitors, it is being throttled by discoverability. Meanwhile the app portal has shipped a great deal of correct engineering (14/14 tracking events wired, robots/canonical/middleware protection in good shape, the banned "Create my package" CTA already fixed) alongside three things that need to stop this week: **30 programmatic pages advertising services in states the business does not serve**, **QA test fixtures rendering publicly as live inventory**, and **"verified" claimed 25+ times with no verification process behind it**.

---

## 2. Main site and social — summary, with pointers

Full detail: `marketing/SOCIAL_MEDIA_AUDIT.md`. Read that file for the numbers; this is the sprint-level read of them.

### 2.1 The five findings that matter

1. **A five-way identity split, and the most-reviewed version says "tour operator."** Website, Instagram, Facebook, GBP, LinkedIn and YouTube each describe the brand differently. This is not drift risk — the GBP identity is backed by 29 real, named 5-star reviews of real delivered treks, with owner replies dating to September 2024. Both identities are true; nothing tells a reader which one they are looking at. **Founder decision, §7 of the audit.**
2. **Every channel except Instagram is dormant, and Instagram is net-losing followers** (23 follows vs 30 unfollows over 90 days).
3. **Search traffic does not touch a single named target keyword.** The real top-10 impression queries are brand-name confusion (`pahari`, `pahari path`, `pahadi log`) plus a few genuine topical signals (`mural danda trek`, `jamadagni rishi temple`, `himalayan folklore`).
4. **The Instagram → chapter bridge is barely functioning.** 2 `reel_source_visit` and 7 `chapter_view` events in 28 days, against 1,065 followers. This is the single number the sprint exists to move.
5. **GBP is the strongest trust asset in the entire presence and no current strategy accounts for it.**

### 2.2 The indexing bottleneck — the sprint's real constraint

**90 of 127 pages unindexed** reframes everything else. Competitor analysis (§9 of the audit) reaches the same conclusion independently and states it plainly: *"Competitor analysis is not this month's bottleneck; indexing is."*

Practical consequence for this sprint: **upgrading one chapter properly is worth more than touching twenty**, because a thin page that gets indexed and a thin page that does not are the same page commercially. That is the reasoning behind the chapter-upgrade queue (`docs/growth/chapter-upgrade-queue.md`) rather than a mass rewrite.

### 2.3 Competitor landscape — the short read

Full tables: `marketing/SOCIAL_MEDIA_AUDIT.md` §9.1–9.6. Three things changed since the prior pass:

- **"No editorial competitor in the Kamrunag cluster" now needs a qualifier.** Five editorial-ish pages rank. Not one cites a source or names a local informant, and none carries the fair calendar, the closure window, or the temple committee. The defensible verdict is narrower: *no competitor has **sourced** cultural depth.*
- **"Rules" has entered the Parvati SERP.** Overnight Kheerganga camping has been banned since July 2024 and is still in force. Competitors now use rules language — but frame rules as booking constraints, link no order, and never ask what the ban cost the ~400–500 local tent operators it displaced.
- **Two new competitor *types*.** AllTrails ranks #1 live for both `kamrunag lake` and `prashar lake`; an AI-generated encyclopaedia entry now ranks for Prashar. Neither can hold cultural context — which strengthens the gap while narrowing where it is winnable.

### 2.4 A correction to a fact this sprint was briefed on

`parashar-lake-trek` was described going into this sprint as an orphan chapter. **It is not.** Verified in the repository: it is listed in `data/books/monsoon.yaml` line 15. Its real problem is that `monsoon` has no `published: true`, so the chapter is assigned to an unpublished book. That is a homelessness problem, not a linking problem, and the fix is a founder decision about publishing `monsoon` — not a new book and not a re-link.

---

## 3. App portal — `app.pahariyatri.com` (new work this pass)

**Repo:** `/home/pankaj-kumar/Workspace/local-connect-app`, branch `main`, commit `e57cefd`, working tree clean, `0 0` against `origin/main`.

**Staleness check performed first, per CLAUDE.md.** The local checkout was **6 commits behind `origin/main`** when this sprint started and was pulled fresh before any finding was recorded. This matters: the prior audit's headline portal finding was already fixed in those six commits (see §3.2).

**Live verification:** `https://app.pahariyatri.com/en` returns HTTP 200. Live `sitemap.xml` `lastmod` is 2026-09-07T06:22:58Z, later than commit `e57cefd` (2026-09-07 00:46 +0530), so the deployed build is from after that commit and **live matches the checkout** on every page spot-checked.

### 3.1 Two CLAUDE.md facts are now stale and should be corrected

1. **`app/[lang]/layout.tsx` is no longer a client component.** It was converted to an async server component (its own comment records "Converted from a client component (2026-09)"). The "known issue" in CLAUDE.md §7 is **resolved**. Root `app/layout.tsx` still owns `generateMetadata`, fed the real path via an `x-pathname` header set in `middleware.ts:98`. Per-segment metadata now works — `results/layout.tsx` and `auth/layout.tsx` both export `robots` successfully.
2. **`robots.ts` no longer disallows `/*/vendor/onboarding`** — deliberately, per a documented founder decision (`middleware.ts:51-54`, `app/robots.ts:33-37`). It now also disallows `/*/docs`. `/*/journey/view` is gone because the route no longer exists.

### 3.2 The headline copy fix already landed

CLAUDE.md §2 records the trip-builder CTA as reading **"Create my package"** — the one banned word on the product's highest-intent screen, marked top-priority.

**It is fixed.** `dictionaries/en.json:468` now reads `"createPackage": "Create my Yatra plan"`, the French translation matches, and the accessible name on the step-6 button is `"Create my Yatra plan, ₹X"`. **"Create my package" is gone from all user-facing copy.** CLAUDE.md should be updated to stop describing it as outstanding.

Residual, low priority: the JSON *key* is still `createPackage` and the code path is still `PackageBuilderStep` / `handleCreatePackage` / `createPackage()`. Internal identifiers only, not user-facing — but it keeps the banned word alive in the codebase's vocabulary.

### 3.3 Route inventory

| Route | Purpose | Public/Private | Index/Noindex | Current issue | Recommendation |
|---|---|---|---|---|---|
| `/[lang]` | Landing | Public | Index, in sitemap | Client component; provider list + verified count fetched in `useEffect`, absent from SSR HTML | Move provider showcase to server fetch (ISR) so crawlers see real partners |
| `/[lang]/explore` | Service directory | Public | Index, in sitemap | Client component; listings not in SSR HTML | Convert listing render to server/ISR |
| `/[lang]/explore/[destination]` | — | — | — | **No `page.tsx` exists.** `/en/explore/kasol` returns a live 404 | Build destination hubs, or the 90 child pages stay orphaned |
| `/[lang]/explore/[destination]/[activity]` | Programmatic SEO — 9 destinations × 10 activities = 90 pages | Public | Index, **not in sitemap** | **Severe — see §3.4** | Cut non-Himachal destinations, fix the category filter, gate on real inventory, then add to sitemap |
| `/[lang]/about` | Brand / trust | Public | Index, in sitemap | Client component; multiple unbacked "verified" claims | Convert to server; rewrite verification claims |
| `/[lang]/vendor/onboarding` | Vendor signup | Public (founder decision) | Index, in sitemap | Client component — SSR HTML has no page-specific `<h1>`, copy or FAQ; serves the generic sitewide title | Add a server-rendered vendor pitch shell above the client form |
| `/[lang]/vendor/onboarding/confirmation` | Post-submit | Public | **Index** — not disallowed, no `robots` meta | Thin, no search value | `noindex` via a segment layout |
| `/[lang]/vendor/[id]` | Public partner profile | Public | Index (intentional) | Correct per CLAUDE.md §6 — keep it public | Not in sitemap; add real profiles once verification is real |
| `/[lang]/vendor/[id]/book/[serviceId]` | Booking form | Public | **Index** — not disallowed | Transactional page, zero search intent, indexable | `noindex` via segment layout |
| `/[lang]/vendor/community` | Community feed | Public | **Index** — not disallowed | User-generated feed, indexable, moderation surface not audited | `noindex` until moderated |
| `/[lang]/builder` | Trip builder | Public | Index, in sitemap | Client component; copy issues on the highest-intent screen (§3.5) | Server-render the pitch/FAQ shell around the client wizard |
| `/[lang]/results` | Generated plan | Public | **Noindex ✅** (`results/layout.tsx:11`) | Correct. But live returns 200 with no auth — anyone with a `packageId` sees the plan | Confirm intended shareability, not an IDOR |
| `/[lang]/sitemap` | Internal dev link directory | **Public, unprotected** | **Index** — not disallowed | Leaks internal structure; links to `/en/admin`, a non-existent `/en/broker`, and fabricated booking IDs | Delete, or protect and `noindex` |
| `/[lang]/docs`, `/docs/[slug]` | Internal engineering docs | Public | Robots-disallowed ✅ | **Live `/en/docs` returns HTTP 200** — a disallow is an indexing hint, not access control | Move behind auth or out of the public app |
| `/[lang]/privacy-policy`, `/terms-conditions` | Legal | Public | Index, in sitemap | Client components; Terms says "Last Updated: February 2026" while the Razorpay flow shipped after | Refresh legal copy to match the live payment flow |
| `/[lang]/auth/*` | Login / OTP / PIN | Private | Noindex ✅ + disallow ✅ | Fine | — |
| `/[lang]/profile`, `/profile/edit`, `/profile/vendor` | Account | Private (middleware ✅) | Disallow ✅ | Fine | — |
| `/[lang]/admin` | Admin | Private (middleware ✅) | Disallow ✅ | Fine | — |
| `/[lang]/bookings/**`, `/checkout` | Booking + payment | Private (middleware ✅) | Disallow ✅ | Fine | — |
| `/[lang]/vendor/{dashboard,payouts,calendar,contracts,partnerships,services,bookings}` | Vendor back office | Private (middleware ✅) | Disallow ✅ | Fine | — |

**Sitemap gap:** only 7 URLs, English only. Missing every `/explore/[destination]/[activity]` page and every `/vendor/[id]`. Separately, declared pages advertise `hreflang` alternates for `fr` and `he` that render untranslated English.

### 3.4 The most serious finding — fake-location programmatic pages are live

**Verified live, not inferred.** `https://app.pahariyatri.com/en/explore/goa/rafting` returns HTTP 200 with `<title>River Rafting in Goa | Pahari Yatri</title>` and lists: *Rafting 12 km — shimla*, *Brown Trout Angling & GHNP Nature Trail*, *Guided Triund Ridge Sunset Trek*, *Kangra Valley Heritage Homestay*, *Spiti Valley 4x4 Circuit Safari*. **It is presenting Himachal inventory as Goa inventory.**

Source: `app/[lang]/explore/[destination]/[activity]/page.tsx:6-16` includes `goa`, `rishikesh` and `kedarnath` — **30 of the 90 generated pages claim service in states the business does not serve.**

Compounding, on `/en/explore/kasol/taxi` (also verified live):
- The listing shows treks, domes, resorts and paragliding — the `categories=Transportation` filter at lines 96-99 is not being applied by the backend.
- It publicly exposes QA fixtures: **`QA E2E Test Room — Kasol`, `Content Audit Test Room`, `ZZQAPendingApproval Cottage`, `QA Regression Test Room`, `QA Post-Relogin Room`.**

Also on all 90 pages: JSON-LD declares `availability: "https://schema.org/InStock"` (false — the flow is request-based) and a `geo` object of type `GeoCoordinates` with no coordinates (invalid).

This is the exact **"fake locations / doorway spam" hard-no** in CLAUDE.md §11–12, currently shipped. Effort to fix is low (remove three map entries, add an empty-state guard, filter non-approved vendors). Impact of not fixing is high — this is the category of thing that earns a manual action.

### 3.5 Banned language and package-selling tone still live on the portal

| File:line | Exact current string | Why it matters |
|---|---|---|
| `dictionaries/en.json:483` | `"price": "Best Price Guarantee"` | Rendered on the **builder** page (`builder/page.tsx:380`) — the highest-intent screen. Guaranteed pricing is on CLAUDE.md §2's avoid-list and no mechanism backs it. |
| `app/[lang]/page.tsx:335` | `Verified locals. Direct booking.` | Contradicts the request-based flow the same site describes at `en.json` (`"messaging": "Request-Based Booking"`). |
| `app/[lang]/explore/page.tsx:375` | `Build your custom route and book verified local transit and stays seamlessly.` | Implies instant booking; the real flow is request → partner confirms → reservation fee. |
| `explore/[destination]/[activity]/page.tsx:122` | `Book verified ${act.keyword} in ${dest.display}, ${dest.state}` | Ships into JSON-LD `description` on all 90 pages. |
| `dictionaries/en.json:135` | `"Join 500+ legends and grow your business"` | **Fabricated traction number.** Not rendered (`partner_cta` has zero call sites) but still ships inside every page's RSC payload and is visible in page source. Delete the key. |
| `components/molecules/PackageSummary.tsx:17` | `Package Summary` | Banned word in an `<h3>`. **Dead code** — no importer. Delete rather than fix. |
| Live vendor data, `/en/explore/kasol/taxi` | `Family Homestay Package — kasol` | A **vendor-supplied** service name containing "Package" rendering on a public SEO page. There is no name-policy check on vendor listings. |

Credit where due: `explore/[destination]/[activity]/page.tsx:42-45` carries an explicit comment removing "Book Instantly" / "Instant booking" from title and description for exactly this reason. Someone has been doing this carefully — line 122 was simply missed. Similarly, `"24/7 On-Trip Support"` (`en.json:482`) is **correctly gated** behind `hasLiveSupportChannel` at `builder/page.tsx:370`; flagged only so it stays gated.

### 3.6 "Verified" is claimed 25+ times with no verification process behind it

This is the largest structural finding on the portal. "Verified" appears 25+ times in `dictionaries/en.json` alone and across roughly 15 components. **No verification process was found in the repository** — no admin review queue UI, no criteria, no evidence surface. The only real signal is a backend boolean `isVerified`.

**Honest usage that should be left alone:**
- `app/[lang]/page.tsx:249-251` — `<CountUp target={verifiedCount} /> verified locals on the ground right now.` A real count from live API data, with a comment stating it is not fabricated. This is the correct pattern.
- `components/molecules/Card.tsx:71` and `explore/page.tsx:346` — badge rendered conditionally on `service.vendor.verified`.

**Hardcoded or fabricated — all of these need a decision:**

| File:line | String | Problem |
|---|---|---|
| `vendor/services/[id]/page.tsx:235` | `Verified Partner • 100% Acceptance` | Hardcoded, unconditional, shown regardless of `isVerified`. "100% Acceptance" is an invented performance statistic. |
| `vendor/services/[id]/page.tsx:105` | fallback vendor name `"Verified Mountain Host"` | When `businessName` is missing, the app **invents a partner name that asserts verification**. |
| `vendor/services/[id]/page.tsx:188` | fallback description `"Authentic verified mountain experience hosted by certified local partners."` | **Fabricated listing copy** injected when a vendor wrote none. Also asserts "certified" — no certification exists. |
| `vendor/services/[id]/page.tsx:179, :165` | `Verified Available`, `Verified Rate` | Availability is not verified (request-based); rates are vendor-entered. |
| `components/molecules/FeedbackReviewModal.tsx:50` | `authorName: authorName.trim() \|\| "Verified Traveler"` | **An anonymous review is attributed to a "Verified Traveler."** The most serious instance — it manufactures review credibility and sits squarely on CLAUDE.md §8's no-fake-verified-local rule. |
| `dictionaries/en.json:481` | `"100% Verified Vendors"` | Rendered on the builder page. Absolute claim, no process. |
| `dictionaries/en.json:363` | `"Every route is human-verified"` | Routes are assembled algorithmically from `DESTINATION_ID_MAP`; no human reviews them. |
| `dictionaries/en.json:473, :475` | `"Route verified"`, `"Vendors checked"`, `"Availability confirmed"` | Builder loading-screen theatre. Nothing is verified at that moment. |
| `dictionaries/en.json:242` | `"Manual verification required for all new listings to ensure elite quality."` | Asserts a manual review process that could not be found. |
| `about/page.tsx:198` | `All vehicles, stays, and trek itineraries undergo verified checks before listing.` | Strongest claim on the site — a **safety** assertion about vehicles. If no inspection happens this is a liability, not just copy. |
| `about/page.tsx:78` (+ 46, 170, 230, 295) | `Every host and operator is locally verified.` | Absolute claims. |
| `app/layout.tsx:78` | `... — verified locals, direct and with no agency markup.` | The **sitewide meta description**, live on every page right now. |
| `privacy-policy/page.tsx:30` | `... facilitate verified connections with local Himalayan hosts.` | In a legal document. |
| `explore/[destination]/[activity]/page.tsx:48, 122, 154` | `Find verified ...`, `Book verified ...`, `Verified local ... operators.` | Across 90 programmatic pages, in `<title>`, meta description, JSON-LD and `<h1>` subtitle. |

**And the live proof the claim is false:** `/en/explore/kasol/taxi` renders, under the heading *"Verified local taxi operators"*, a listing named **`ZZQAPendingApproval Cottage`** — an unapproved QA fixture, publicly displayed as verified inventory.

### 3.7 Vendor onboarding — field gap (re-verified, prior audit was stale)

`app/[lang]/vendor/onboarding/page.tsx` @ `e57cefd`. **Payout fields have been added since the last audit.**

Currently captured (state declarations, lines 129-151): `contactFirstName` (required), `contactLastName`, `businessName` (required), `phone` (required, prefilled from `user?.phone`), `email` (optional), `types` (multi-select), `description`, `documents` (image upload, JPEG/PNG/WebP/GIF only), and **new since last audit**: `payoutMethod`, `upiId`, `accountHolderName`, `accountNumber`, `ifsc`.

Still missing — a grep for location/region/address/consent/whatsapp/photo/pricing/language/years/reference returns **nothing** in this file:

| Required field | Status |
|---|---|
| Location / region | **Missing — the biggest gap.** No local SEO, no geographic matching, no way to verify a local. |
| WhatsApp (distinct from phone) | **Missing** — and `whatsapp_contact_click` is a required tracking event. |
| Business photos (separate from documents) | **Missing** — the upload accepts images but is labelled and used as documents; no listing gallery. |
| Pricing range | **Missing** |
| Languages spoken | **Missing** |
| Years active | **Missing** |
| Local references | **Missing** |
| Explicit consent-to-be-contacted | **Missing** — no checkbox, no terms link, no consent record. Legal exposure, not just UX. |
| Cancellation / refund note | **Missing** — and payments are already live. |

**Vendor type gap:** the form offers 4 buckets (Stay / Activities / Transport / Food, `CATEGORY_OPTIONS` lines 52-56). CLAUDE.md §9 specifies 9 types. "Local guide" and "trek guide" both collapse into "Activities"; **"creator/storyteller" has nowhere to go at all** — which is the vendor type most relevant to this brand.

### 3.8 Traveller request flow — field gap

The builder submits via `createPackage()` at `builder/components/PackageBuilderStep.tsx:237-247`. That payload is the entire lead record: `{ origin, destinations, startDate, endDate, guestCount, servicePreferences, selectedServices, totalPrice, sessionId }`.

Present: start point ✅, destination/region ✅, dates ✅, people count ✅, needs ✅, stops ✅.
Missing: **name** (only from the auth account), **WhatsApp** (entirely), **email**, **budget comfort range**, **notes/free text**, **consent** (no checkbox anywhere in the flow). Travel style is only *inferred* from stay tier and vehicle class, never asked.

**Structural finding:** this is not a request flow, it is a cart. `handleCreatePackage` builds a priced object and routes to `/results?packageId=...` → checkout → Razorpay. There is no point at which a traveller supplies contact details **as a lead**. Combined with `en.json`'s own promise `"No sign-up needed · Takes ~2 min"`, a traveller can complete six steps and then hit an auth wall with **nothing captured**. An abandoned builder session currently leaves zero recoverable lead.

This is the reconciliation question CLAUDE.md §10 already flags. The site currently describes **both** models at once: `en.json` says `"Request-Based Booking"` and *"Reserve & Go — Small fee to lock it in. Pay the rest direct."*, while `app/[lang]/page.tsx:335` says *"Direct booking."* Whichever the founder picks, the copy has to stop saying both.

### 3.9 Cross-linking — portal → main site is attribution, not a trust bridge

The portal links to `pahariyatri.com` in exactly three places, and **never to a chapter, a book, or the Yatri Code**:

1. `components/organisms/PublicFooter.tsx:31` — footer nav item `Parent Website ↗` → root URL only
2. `components/organisms/PublicFooter.tsx:83-88` — attribution line
3. `about/page.tsx:126` — same root URL

Plus one piece of bridge copy at `config/brandConfig.ts:51`, rendered at `PublicFooter.tsx:67`:

> "Built by Pahari Yatri for travellers who want local context, not package noise."

**The tone is right** — provenance, not a funnel, deliberately positioned against package-selling. But a grep of the live homepage HTML for `pahariyatri.com` returns exactly one URL: the bare root. Not one deep link into the story library.

Missing against CLAUDE.md §4's "portal → main site: trust bridge":
- No "Before you request local options, read the Pahari Yatri chapter" pattern anywhere.
- The 90 `/explore/[destination]/[activity]` pages are the natural home for it — `/explore/kasol/*` should link to *Parvati Valley, Beyond Kasol* — and none link out at all.
- No Yatri Code link.
- No `utm_source` or `ref` on the outbound links, so portal→main-site traffic is invisible, even though `middleware.ts:102-110` is built to capture exactly those parameters in the other direction.

### 3.10 Tracking — code complete, measurement dead

**Events wired: 14 of 14, plus both bridge events.** `lib/analytics.ts` defines 15 exported trackers (lines 60-106) and every one has a real call site outside the lib: `app_landing_view`, `portal_cta_click` (4 CTAs), `traveller_request_start`, `traveller_destination_select`, `traveller_date_select`, `traveller_people_select`, `traveller_need_select`, `traveller_stop_add`, `traveller_plan_preview`, `traveller_request_submit`, `vendor_apply_start`, `vendor_apply_submit`, `whatsapp_contact_click`, `partner_profile_view`, `partner_contact_click`.

`middleware.ts:102-110` sets the `partner_ref` / `utm_source` 7-day cookies as documented. The dual-event-stream note in CLAUDE.md §8 is **confirmed and intentional** — `PackageBuilderStep.tsx:250-260` fires `sessionTracker.track('trip_builder_completed', ...)` and `trackTravellerRequestSubmit(...)` side by side, with a comment saying both vocabularies are kept on purpose. Whoever builds GA4 tags in GTM must handle both or silently miss one.

**Honest verdict on GTM: NOT live.**

```
$ curl -s https://app.pahariyatri.com/en | grep -o "googletagmanager.com/gtm.js?id=GTM-[A-Z0-9]*"
(no output)
```

No match, and no `googletagmanager.com/ns.html` noscript iframe either. `app/layout.tsx:147` gates the entire GTM block on `gtmId &&`, and `NEXT_PUBLIC_GTM_ID` is inlined at Docker **build** time. This is conclusive: **the deployed image was built without `NEXT_PUBLIC_GTM_ID`.**

**Every one of the 14 events is pushing into a `window.dataLayer` that nothing reads.** The instrumentation is done and correct; zero data is being collected. This is a rebuild-with-the-build-arg problem, not a code problem.

**Could not verify:** where the production build actually runs. `.github/workflows/ci.yml` still only lints, typechecks and build-tests. So it is not possible to say *who* needs to pass the build arg — that needs the founder.

### 3.11 Portal — top 5 by (trust/conversion impact) ÷ effort

1. **Fake-location programmatic pages, live and indexable** (§3.4) — effort low, impact existential. Owners: `portal-technical-seo-engineer` + `portal-content-seo-strategist`.
2. **"Verified" claimed with no process** (§3.6) — effort medium (one copy pass + a founder decision on what verification means), impact: this is the product's entire trust proposition. Owners: `portal-conversion-strategist` + `reputation-local-trust-agent`.
3. **GTM ID missing from the production build** (§3.10) — effort: one build arg. Impact: unblocks all measurement; every other fix is currently unmeasurable. Owner: `portal-tracking-analyst`.
4. **Traveller flow captures no contact, no consent, no notes** (§3.8) — effort medium (one contact+consent step before `createPackage`), impact: highest single conversion lever. Owner: `portal-conversion-strategist`.
5. **Vendor onboarding has no location field** (§3.7) — effort low-medium, impact: unblocks local SEO, matching, and any real verification process. Owner: `portal-conversion-strategist`.

**Below the top 5, still worth doing:** delete or protect `/en/sitemap`; move `/en/docs` behind auth (a robots disallow is not access control, and it currently returns 200 to anyone); `noindex` on `/vendor/[id]/book/[serviceId]`, `/vendor/onboarding/confirmation` and `/vendor/community`; build `/explore/[destination]` hubs so the 90 activity pages stop being orphans; fix `hreflang` advertising `fr`/`he` for untranslated English; delete the two dead-code banned-language carriers.

---

## 4. What Phase 0 concludes

1. **The bottleneck is indexing and trust, not content volume.** 90 unindexed pages on the main site, and a portal claiming verification it cannot evidence. More content on top of either makes the problem larger, not smaller.
2. **The measurement layer is half-dead on both properties.** The main site's events fire correctly. The portal's fire into a dataLayer with no container behind it. No portal decision this sprint can be evaluated until the build arg is set.
3. **The identity question is now unavoidable.** It appears on the GBP category, the LinkedIn job posting, the YouTube description, the Instagram bio, and — newly — as a live contradiction inside the portal's own copy ("Request-Based Booking" vs "Direct booking"). It cannot be solved by copy edits in six places; it needs one founder decision applied downward.
4. **Several documented "known issues" were already fixed.** The builder CTA, the `[lang]/layout.tsx` client-component problem, and the vendor payout fields all landed before this pass. Auditing against a stale checkout would have reported all three as open. The freshness discipline in CLAUDE.md earned its keep this pass.

---

## 5. Founder decisions this audit surfaces

| # | Decision | Where it comes from | Blocking what |
|---|---|---|---|
| 1 | **The identity question.** Is the canonical description "Himalayan story library", "tour operator", or an explicit both-with-a-boundary? | Audit §1.1, §7; portal §3.5 | Every bio, the GBP category, the LinkedIn job post, the YouTube description, portal landing copy |
| 2 | **Do the 30 non-Himachal programmatic pages come down?** (goa, rishikesh, kedarnath) | Portal §3.4 | This is a CLAUDE.md hard-no currently shipped. Recommend yes, this week. |
| 3 | **What does "verified" actually mean?** Build a real process, or replace the word with what is true ("locally introduced", "founder-contacted", "partner-listed")? | Portal §3.6 | 25+ strings, the sitewide meta description, and a vehicle-safety claim |
| 4 | **Request-first or payment-first?** The portal ships Razorpay checkout while the strategy documents manual confirmation first, and the copy currently claims both. | Portal §3.8 | Traveller flow design, all conversion copy |
| 5 | **Who sets `NEXT_PUBLIC_GTM_ID` at Docker build time, and where does the production build run?** | Portal §3.10 | All portal measurement |
| 6 | **Publish `data/books/monsoon.yaml`?** `parashar-lake-trek` is assigned to it and is therefore invisible in the published library. | §2.4 | The Prashar cluster opportunity |
| 7 | **GBP hours** read "Closed · Opens 12 am Thu" — very likely a data-entry default. | Audit §7 | Cheap fix on the highest-trust asset |
| 8 | **SafarCabby listing ownership** — founder-created, third-party, or scraped? | Audit §8 | Local-trust risk, NAP consistency |
| 9 | **Story sourcing.** 20 of 28 stories are unlabelled and read as real interviewed people. Label them, or begin real outreach? | Audit §10 | "Voice of Himalaya", Instagram slot 5, chapter local-voice sections |

---

## 6. Provenance

- Platform numbers: `marketing/SOCIAL_MEDIA_AUDIT.md` (live logged-in pass, 2026-09-09).
- Competitors: `marketing/SOCIAL_MEDIA_AUDIT.md` §9 (live SERP reads, 2026-09-09).
- Portal: fresh audit this pass against `local-connect-app` @ `e57cefd` (pulled from 6 commits behind), plus live `curl` verification of `app.pahariyatri.com`.
- Chapter priorities: `docs/growth/chapter-upgrade-queue.md`.

**Nothing in this document was published, deployed, committed, or sent.**
