# CLAUDE.md

Project instructions for Claude Code working in the Pahari Yatri repo.

The full production agent system — specialist agents, growth loops, the golden rule, banned language, and traps that have already cost time — lives at [`docs/agents/pahari-yatri-agent-system.md`](docs/agents/pahari-yatri-agent-system.md). Read it before any multi-step change. This file adds the platform marketing and local trust layer on top of that system.

---

## Pahari Yatri Platform Marketing & Local Trust System

Pahari Yatri is **not** selling trips right now. Current goal across every public platform — website, Instagram, YouTube Shorts, Facebook, LinkedIn, Google Business Profile, Reddit, Google Search, and a future Local Connect — is brand awareness, engagement, website traffic, search visibility, local trust, community building, and a creator/local/vendor network.

**Never turn a platform into package-selling.** Never fake an address, a review, a local claim, or "we are everywhere" language.

### 1. Brand tone across platforms

One identity everywhere: **Yatri, not tourist.**

- One-line identity: *Yatri, not tourist.*
- Description: *Himalayan stories, sacred places, local culture and responsible travel from Himachal and the Indian Himalayas.*
- CTA: *Join the Yatri Circle* / *Read the latest chapter*
- Voice: sacred not scenic · local truth · understand before you visit · travel slower · this is not just a view · some places ask for respect, not noise.
- Banned everywhere: hidden gem · must visit · best places to visit · cheap trip · limited seats · package · explore the unexplored · untouched paradise · secret trail · book now · nestled in the lap of · breathtaking paradise · ultimate guide · unforgettable experience awaits · hidden valleys · secret trails · limited journeys.
- No AI-sounding openers on any platform.

### 2. Google Business Profile rules

GBP builds trust and local discovery, not fake Map Pack ranking. Only proceed if Pahari Yatri is genuinely eligible — a real office/location, a real service-area business, or a real local travel/community service. Eligibility is checked, never assumed.

Do not: fake an address · use a virtual office unless it follows Google's rules · keyword-stuff the business name · add a destination string to the name unless that is the real legal/brand name · fabricate reviews · post misleading services · show a customer-facing address customers cannot actually visit.

Business name: **Pahari Yatri** (no keyword stuffing). Description angle: a Himalayan storytelling and responsible travel platform sharing real stories, local culture, sacred places, village routes, and travel wisdom — building a Yatri community for people who want to understand the mountains, not just consume them.

Avoid travel-agency language, package language, "cheapest tour," hotel-booking language, and fake "official tourism" tone. Categories are researched against Google's actual category list, never guessed, and never changed without reporting the impact first.

Full detail owned by `google-business-profile-strategist`.

### 3. LinkedIn strategy

Credibility and partner channel, not a growth channel. One founder-led post per week, drafts only, never auto-posted. Audience: creators, locals, homestays, guides, tourism professionals, future collaborators. Tone: serious, human, founder-led — not corporate, not startup hype. Never promise Local Connect exists; it is a future intent, stated as intent. Owned by `linkedin-brand-strategist`.

### 4. Reddit strategy

Listening and research only — never spam, never astroturf, never a fake personal story, never a bare link for backlinks. Watch r/himachal, r/IndiaTravel, r/travel, r/backpacking, r/solotravel, and relevant city/travel subreddits for the questions people actually ask, pain points, route confusion, safety concerns, and etiquette confusion. Output is content ideas and FAQ gaps, plus optional no-link helpful replies — never a promotional comment. Owned by `reddit-community-researcher`.

### 5. Meta / Facebook strategy

Not primary growth. Repost layer, trust layer, older-audience layer, Meta infrastructure, future local/vendor audience. No ads. Audit page name, bio, website link, WhatsApp button, images, category, connected Instagram, pixel/events, and comments/messages for consistency with the rest of the brand.

### 6. Instagram strategy

Primary reach engine. Every Reel maps to chapter traffic, saves/shares, comments, Yatri Circle, or a creator/local story submission — never a random scenic Reel. Formula: **viral hook → real local truth → Yatri lesson → soft CTA.** Full detail owned by `instagram-shorts-strategist`.

### 7. YouTube Shorts strategy

Repost surface. Best Reels reposted as Shorts within 48 hours, same UTM campaign where a link is used, searchable title, strong first line, pinned comment to the destination chapter, no hashtag stuffing.

### 8. Review / reputation rules

No fake reviews, ever, on any platform. No fake testimonials, no fake "verified local" claims, no fabricated authority or traction numbers. Real contributor and source transparency at all times — a claim about local culture carries a named source or is hedged as unverified, same standard as `local-verification-editor` applies to chapters. Review responses are honest, specific, and never templated into something generic. Owned by `reputation-local-trust-agent`.

### 9. Local SEO rules

Local trust signals must be real: real service area, real category, real photos, consistent NAP-equivalent (name, contact, area) across GBP, website, and every social profile. No fabricated address. No listing in directories the business does not actually serve. Local SEO improvements are proposed, never published, without founder approval.

### 10. Weekly platform audit process

Trigger: **"Run weekly platform marketing review."** Audit available platforms; mark any unavailable dashboard/profile as unavailable and continue — do not block on it. Return: traffic from platforms · profile issues · brand consistency issues · Google Business opportunities · Reddit questions/content ideas · one LinkedIn post draft · next Instagram/Shorts posts · SEO chapter opportunities · what needs approval. Ask minimal clarifying questions — proceed on what is inspectable.

### 11. Monthly platform improvement process

Once a month, run `/platform-presence-audit` followed by `/social-copy-pack`. Compare against the prior month's audit if one exists. Prioritize the highest trust-value, lowest-effort fixes first (bio drift, dead links, inconsistent CTA) before category or structural changes to any profile. Any category change, address change, or business-name change on a public profile is reported with its impact before it is ever proposed for approval.

### 12. Approval policy

Agents may audit, draft, and prepare update packs automatically. Agents never:

- publish a change to any public profile (GBP, Instagram, Facebook, LinkedIn, YouTube, Reddit) without explicit founder approval
- fabricate reviews, testimonials, addresses, or "we are everywhere" claims
- run ads or spend ad budget
- spend API credits without being asked
- ask for a password
- continue past an OTP, passkey, payment, permission, or billing screen — stop and hand back to the founder immediately

This mirrors the existing golden rule in `docs/agents/pahari-yatri-agent-system.md`: Inspect → Report → Plan → **Approve** → Implement → Test → QA → Document → Recommend. Platform work stops hard at step 4 — nothing here is exempt.

---

## Agents added by this system

Location: `.claude/agents/`

| Agent | Owns | Model |
|---|---|---|
| `platform-presence-auditor` | Cross-platform audit — website, Instagram, Facebook, LinkedIn, GBP, YouTube, Reddit mentions, Google Search | opus |
| `google-business-profile-strategist` | GBP eligibility, fields, posts, photos, Q&A, reviews, local SEO — drafts only | opus |
| `social-brand-consistency-editor` | Bios/descriptions/pinned posts aligned across every platform | sonnet |
| `reddit-community-researcher` | Reddit listening, pain points, content gaps, no-spam replies | opus |
| `reputation-local-trust-agent` | Reviews, testimonial ethics, contributor credibility, "verified local" wording | opus |
| `competitor-analysis-agent` | Himachal/Himalaya competitor positioning, content gaps, platform presence, SERP overlap — research only, never copies their tone | opus |
| `outreach-relationship-agent` | Personalized LinkedIn/Instagram collaboration, story-submission and relationship drafts — drafts only, never sends, refuses bulk spam | sonnet |

## Commands added by this system

Location: `.claude/commands/`

- `/platform-presence-audit` — full cross-platform audit and update pack
- `/google-business-profile-review` — GBP eligibility, audit, and draft improvements
- `/social-copy-pack` — one consistent bio/description/CTA pack for every platform
- `/reddit-market-listening` — Reddit research → content and FAQ ideas

---

## Pahari Yatri Main Site + App Portal Operating System

Two connected properties, two different jobs. Confusing them is the main risk this section exists to prevent.

**Main site** — `pahariyatri.com`, this repo. The Himalayan story library. Builds awareness, trust, culture, search traffic, Instagram traffic, Yatri identity. Never feels like a package-selling site.

**App portal** — the product layer. **Its actual live name is "Travel Platform by Pahari Yatri"** (`app.pahariyatri.com`), centrally defined in `config/brandConfig.ts` in the portal repo — not "Pahari Yatri Local Connect." That name only exists in planning docs; nobody has renamed the product to match it. Treat "Local Connect" as the working/internal codename until the founder decides to either rename the live product or update the planning language to match reality. It helps travellers connect with vendors, homestays, guides, taxis, creators and local hosts in Himachal. Never feels like a random booking clone, never "book now" spam.

### 1. The repos, for real

This is a multi-repo ecosystem, not one app. As last audited (2026-08-22):

| Repo | Role | Stack |
|---|---|---|
| `pahari-yatri-app` (this repo) | Main site, `pahariyatri.com` | Next.js, Keystatic |
| `local-connect-app` | **The actual portal frontend** — this is what serves `app.pahariyatri.com` | Next.js 16, App Router, `[lang]` i18n |
| `local-connect-portal` | Portal backend, now backend-only on `main` (repo name is legacy — `frontend/` still exists on the `dev` branch but is **stale**, not what's deployed) | NestJS, TypeORM, Postgres, Redis |
| `payment-service` | Separate payments service (Stripe/Razorpay) | Spring Boot |
| `stay-sync-app` | Homestay operations PWA | — |
| `media-worker` / `media-sdk` | Signed upload/download for vendor media | Cloudflare Workers + R2 |
| `vendor-cms` | — | — |

**When auditing or changing the portal, clone/pull `local-connect-app` fresh and diff against `origin/main`.** A stale local checkout of `local-connect-portal/frontend` was audited once and found materially different from production — wrong sitemap domain, wrong sitemap URLs, a `console.log` of an auth token that had already been fixed on `main`. Don't repeat that mistake: verify against `origin/main` (or the live site) before reporting a finding as current.

### 2. Product positioning

Main site: *Pahari Yatri helps people understand the Himalayas before they travel.*

Portal: *Pahari Yatri Local Connect helps travellers find trusted local support through verified Himachali partners* (once the naming question above is resolved).

Avoid on the portal: cheap Himachal packages · lowest price · instant booking everywhere · hidden gem trips · guaranteed best local · "verified" without an actual verification process · official tourism language unless actually official.

Use instead: local access · verified local partners · plan with people who know the place · travel with context · responsible local support · request local options · match with local partners · founder/community verified (only if true).

~~**The live trip-builder CTA currently reads "Create my package"**~~ — **RESOLVED, verified 2026-09-09** against `local-connect-app` @ `e57cefd`. `dictionaries/en.json:468` now reads `"createPackage": "Create my Yatra plan"`, the French translation matches, and the step-6 button's accessible name is `"Create my Yatra plan, ₹X"`. The banned word is gone from all user-facing copy. Residual, low priority: the JSON *key* is still `createPackage` and the code path is still `PackageBuilderStep` / `handleCreatePackage` — internal identifiers only.

**Still live and unresolved on the highest-intent screen** (verified 2026-09-09): `dictionaries/en.json:483` `"price": "Best Price Guarantee"`, rendered at `builder/page.tsx:380`. Guaranteed pricing is on the avoid-list above and no mechanism backs it. Also `app/[lang]/page.tsx:335` `Verified locals. Direct booking.`, which contradicts the request-based flow the same site describes elsewhere. See `docs/growth/september-audit.md` §3.5.

### 3. SEO strategy for both properties

**Main site** targets informational, story-led search: Kamrunag Lake, Prashar Lake, Shikari Devi, Kasol beyond Parvati Valley, Himachal temple etiquette, devta culture, Manali beyond Mall Road, Kheerganga sacred context, Parvati Valley villages, responsible travel Himachal. CTAs: read related chapter, join Yatri Circle, request local options — softly, only where relevant.

**Portal** targets conversion and local-service intent: verified homestays in Himachal, local guide in Parvati Valley, taxi from Kasol to Barshaini, homestay in Kalga/Pulga/Tosh, local guide for Kamrunag, Mandi local travel support, list your homestay Himachal, join as local guide Himachal. No doorway spam — every public portal page needs real value, real partner/context, brand-safe copy.

### 4. Cross-linking rules

Main site → portal: soft bridge, never sales pressure. *"Planning Kamrunag? Go with local context, not just a route map." → Request local guidance.* Every chapter-to-portal link should read like a suggestion, not a checkout funnel.

Portal → main site: trust bridge. *"Before you request local options, read the Pahari Yatri chapter."* Portal landing pages should link to relevant books, the Yatri Code, and responsible-travel content — Sacred Mandi, Parvati Valley Beyond Kasol, Manali Beyond Mall Road.

### 5. Portal public/indexable pages

Audit and classify every route with this table shape:

| Route | Purpose | Public/Private | Index/Noindex | Current issue | Recommendation |

**Updated 2026-09-09** against `local-connect-app` @ `e57cefd`. Production `robots.ts` disallows: `/*/auth/`, `/*/profile`, `/*/admin`, `/*/bookings`, `/*/checkout`, `/*/vendor/dashboard`, `/*/vendor/payouts`, `/*/vendor/calendar`, `/*/vendor/contracts`, `/*/vendor/partnerships`, `/*/vendor/services`, `/*/vendor/bookings`, and now `/*/docs`. Two changes from the previous note: **`/*/vendor/onboarding` is deliberately no longer disallowed** (documented founder decision, `middleware.ts:51-54` + `app/robots.ts:33-37`), and `/*/journey/view` is gone because the route no longer exists. That part is in good shape — don't redo it, extend it as new private routes appear.

**Still unprotected and indexable** (verified 2026-09-09): `/[lang]/vendor/[id]/book/[serviceId]`, `/[lang]/vendor/onboarding/confirmation`, `/[lang]/vendor/community`, and `/[lang]/sitemap` (an internal dev link directory). Separately, `/[lang]/docs` returns HTTP 200 to anyone — a robots disallow is an indexing hint, not access control.

### 6. Portal private/noindex pages

Login, dashboard, admin, vendor dashboard, traveller request status, payment pages, internal matching pages, account settings, test pages, staging/demo routes, API routes. `/vendor/[id]` (public partner profile) is intentionally **not** in the protected list — keep it that way, it's meant to be public and indexable.

### 7. SSG vs SSR vs CSR rules

- Public SEO pages: SSG or SSR.
- Evergreen landing pages: SSG where possible.
- Pages depending on changing vendor data: ISR or SSR.
- Dashboards/admin/user-specific pages: CSR or protected SSR, and noindex.
- Search engines must see meaningful HTML without waiting on client JS.
- Don't hide important SEO content behind client-only state.
- Forms can be client components; page copy, headings, FAQs, and internal links should be server-rendered.
- Metadata, canonical, OG, schema, and robots rules must be server-defined.

~~**Known issue:** `app/[lang]/layout.tsx` is a client component~~ — **RESOLVED, verified 2026-09-09.** It was converted to an async server component (its own comment records "Converted from a client component (2026-09)"). Root `app/layout.tsx` still owns `generateMetadata`, now fed the real path via an `x-pathname` header set in `middleware.ts:98`. Per-segment metadata works — `results/layout.tsx` and `auth/layout.tsx` both export `robots` successfully. This is a sound pattern now; the old "future pages will silently fail to set metadata" risk is gone.

**The real rendering issue now** is different: `/[lang]`, `/[lang]/explore`, `/[lang]/about`, `/[lang]/builder`, `/[lang]/vendor/onboarding` and the legal pages are all still `"use client"`, so the provider list, listings and page copy are fetched in `useEffect` and are **absent from the SSR HTML** a crawler sees. Server-render the copy/headings/FAQ shell; keep only the forms client-side.

### 8. Tracking events

**Code is built; nothing is live yet — those are two different claims, keep them separate.** `local-connect-app` has `lib/analytics.ts` (single `pushEvent()` → `window.dataLayer`, one function per event) and a conditional GTM loader in `app/layout.tsx`, wired to all 14 portal events plus `app_landing_view`/`portal_cta_click` on the landing page. **Never say tracking is "live" or "on" without independently verifying the deployed bundle actually contains a GTM ID** — see the deploy note below for exactly how.

Required events — main site bridge: `portal_cta_click` · `request_local_options_click` · `vendor_apply_click` · `app_landing_view`.

**Naming mismatch, open decision (2026-09-09).** Those four names describe events *on the portal side*, and all of them exist there. On the **main site** (`pahari-yatri-app`), the equivalent outbound bridge click is implemented as a single event, **`portal_redirect_click`** (`lib/analytics.ts`), carrying `location`, `destination` and `campaign`. It is deliberately distinct from `outbound_click` because the portal is our own second property, not link attrition. Either rename the main-site event to match this list, or update this list to name `portal_redirect_click` — **do not add a second overlapping event**, which would double-count the same click. Founder/analytics decision.

Required events — portal: `app_landing_view` · `traveller_request_start` · `traveller_destination_select` · `traveller_need_select` · `traveller_date_select` · `traveller_people_select` · `traveller_stop_add` · `traveller_plan_preview` · `traveller_request_submit` · `vendor_apply_start` · `vendor_apply_submit` · `whatsapp_contact_click` · `partner_profile_view` · `partner_contact_click`.

`middleware.ts` in `local-connect-app` already captures `ref` and `utm_source` into 7-day cookies (`partner_ref`, `utm_source`) on every request, and `lib/analytics.ts` reads them into every event automatically.

**Deploy note — this is a Docker/Next.js standalone build, and it matters:**

- `NEXT_PUBLIC_GTM_ID` (and every `NEXT_PUBLIC_*` var) is **compiled into the client bundle at Docker build time**, not read at container runtime. Setting it via `docker run -e`, a platform's runtime-env panel, or anything after the image is built **does nothing** — see `Dockerfile`'s `ARG NEXT_PUBLIC_GTM_ID` / `ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID` in the builder stage, and `README.md`'s Docker section, both updated 2026-08 to make this explicit.
- **Do not claim GTM is live in production without verifying the built bundle actually contains the ID.** Check via page source or `curl`:
  ```bash
  curl -s https://app.pahariyatri.com/en | grep -o "googletagmanager.com/gtm.js?id=GTM-[A-Z0-9]*"
  ```
  No match = GTM isn't in this build, regardless of what any env var panel says.
- **`services/sessionService.ts` (pre-existing, not part of the Stage 1 build) also pushes to `window.dataLayer` directly**, once `NEXT_PUBLIC_GTM_ID` is set — via its own `pushToThirdParty()` method, using an older, different event vocabulary (`SessionEventType`: `planner_started`, `booking_started`, `payment_completed`, etc.) than the 14 events above. This isn't a bug and nothing here should "fix" it unprompted — but whoever configures GA4 event tags in GTM must account for **both** event streams, or they'll build tags for one and silently miss the other. Its two other branches (direct `gtag()`/`fbq()` calls) stay inert — they're gated behind `NEXT_PUBLIC_GA4_ID`/`NEXT_PUBLIC_META_PIXEL_ID`, which are undocumented and unset anywhere in the project.
- **This repo has no deploy automation.** `.github/workflows/ci.yml` lints/typechecks/build-tests only — it never pushes an image or touches a server. Where the real production build actually runs is unconfirmed as of 2026-08; don't assume push-to-`main` deploys anything.

### 9. Vendor onboarding rules

Needed fields: business/person name · vendor type · location/region · services offered · WhatsApp/contact · photos · pricing range · languages · years active · local references · documents if needed · verification status · consent to be contacted · cancellation/refund note if bookings later.

**As last audited**, `app/[lang]/vendor/onboarding/page.tsx` in `local-connect-app` captures: business name, category (Stay/Food/Transport/Activities), description, contact name, email, phone, document upload. **Missing:** location/region, WhatsApp specifically, business photos (separate from documents), pricing range, languages, years active, local references, explicit consent-to-be-contacted.

Vendor types: homestay · hotel/guesthouse · taxi · local guide · trek guide · activity operator · food/cafe/dhaba · local experience host · creator/storyteller.

Vendor status: submitted · under review · verified · active · paused · rejected.

### 10. Traveller conversion rules

Needed fields: name · WhatsApp · email (optional) · start point · destination/region · dates · people count · needs · budget comfort range (optional) · travel style · stops · notes · consent.

Needs categories: stay · taxi · guide · food/local meals · experience · spiritual/yatra support · full local help · creator-friendly places.

Status: new request · reviewing · matched · contacted · confirmed · closed · spam.

**Note:** Razorpay payment integration (checkout, bookings, success pages) is already live in `local-connect-app`, ahead of the "manual confirmation first, payment later" sequencing this section describes. Reconcile the strategy with what's actually shipped rather than assuming payment is still a future stage — ask the founder which is intended.

### 11. Brand tone rules

Main site tone: Yatri, not tourist · sacred not scenic · local truth · story-led · responsible travel · Himalayan library.

Portal tone: local access · verified partners · travel planning support · responsible local connection · simple, trustworthy, practical · not cheap-package marketplace · not "book now" spam.

Same banned-language discipline as the rest of the brand system (see above): no fake vendors, fake reviews, fake locations, fake instant booking, fake scarcity, doorway spam pages, or package-selling tone — on either property.

### 12. Approval rules

Allowed without asking: inspect code, inspect the live app, write audit docs, prepare copy, prepare route maps, propose code changes, run build/typecheck.

Ask before: deploying to production · heavily changing live public copy · changing public slugs · deleting routes · changing forms that affect leads · destructive database schema changes · touching credentials · publishing social/profile changes · spending API credits · calling something "verified" without an actual process behind it.

Hard no, always: fake vendors, fake reviews, fake locations, fake instant booking, fake scarcity, doorway spam pages, package-selling tone. Stop and ask the founder if login/passkey/OTP/payment/permission screens appear.

### 13. Weekly/monthly audit process

Weekly: run `/portal-audit` — live app + local code + route inventory + SEO/conversion/brand/tracking/security issues, output as a staged roadmap, no code edits.

Monthly: run `/portal-seo-plan` after `/portal-audit` — keyword plan, region/service page plan, index/noindex plan, sitemap plan, compared against the previous month's audit where one exists.

Both processes are audit/planning only. Nothing here is auto-published or auto-deployed.

## Portal agents added by this system

Location: `.claude/agents/` (this repo) — they operate on the sibling repos above via absolute paths.

| Agent | Owns | Model |
|---|---|---|
| `portal-product-auditor` | Live app + local code: product flow, routes, UX, forms, SEO, trust, conversion, brand alignment | opus |
| `portal-technical-seo-engineer` | Sitemap, robots, canonical, noindex, rendering (SSG/SSR/CSR), metadata, schema, route protection | opus |
| `portal-conversion-strategist` | Traveller request flow, vendor onboarding, CTA hierarchy, trust copy, lead capture | opus |
| `portal-brand-bridge-editor` | Keeps main site and portal connected but distinct; guards portal tone | sonnet |
| `portal-tracking-analyst` | Tracking events for the traveller/vendor funnel | opus |
| `portal-content-seo-strategist` | Region/service landing page plan, no doorway spam | opus |

## Portal commands added by this system

Location: `.claude/commands/` (this repo)

- `/portal-audit` — full live-app + code audit, staged roadmap, no edits
- `/portal-seo-plan` — keyword/page/index plan for the portal
- `/portal-implementation-plan` — exact files to change, staged, after audit approval
- `/brand-bridge-plan` — main-site ↔ portal CTA and linking map

---

## Growth Marketing Automation Workflow

Added 2026-09-09. This section **documents and sequences work the existing agents and commands already do**. It does not create a parallel system, and it does not supersede anything above it. The golden rule still governs every step: Inspect → Report → Plan → **Approve** → Implement → Test → QA → Document → Recommend.

Working files live in `/marketing/`: `SOCIAL_MEDIA_AUDIT.md`, `SOCIAL_STRATEGY.md`, `LINKEDIN_PLAN.md`, `INSTAGRAM_REELS_PLAN.md`, `OUTREACH_SYSTEM.md`, `MONTHLY_GROWTH_REPORT.md`, plus the month-specific `september-content-calendar.md` and `linkedin-september-plan.md`.

Sprint-scoped artefacts live in `/docs/growth/`: `september-audit.md` (Phase 0 baseline), `chapter-upgrade-queue.md` (the one-at-a-time chapter priority order), `september-final-report.md` (one-off sprint retrospective), alongside the standing `content-growth-system.md` and `reel-to-chapter-workflow.md`.

### What "automatic" actually means here

**It means the founder brings the data and the agents turn it into a plan. It does not mean unattended.**

This matters because the word "automation" implies something this environment cannot currently do. There is **no GSC API, no GA4 API, no Meta Graph API, and no LinkedIn API configured in this repo**. `platform-presence-auditor` already works exactly this way and says so in its own file: it expects the orchestrating session to hand it logged-in data when available, and otherwise checks public pages directly.

So the loop is automated in the sense that *the analysis, prioritisation and drafting are automated*. The **data collection is manual** and the **publishing is manual**, by design. Publishing stays manual permanently — that is an approval rule, not a tooling gap. Data collection could be automated later if API access is configured; nothing here assumes it will be.

### The weekly loop

| # | Step | Runs via | Data access |
|---|---|---|---|
| 1 | Check Google Search Console — impressions, clicks, CTR, position, new queries | `/weekly-growth-review` step 1 (`analytics-tracking-agent`) | **Founder-supplied.** No GSC API. Needs a logged-in Chrome session or an export. |
| 2 | Check GA4 — sessions by source, all tracked events, funnel | `/weekly-growth-review` step 1 | **Founder-supplied.** No GA4 API. |
| 3 | Check social analytics — IG reach/saves/shares, Shorts views, FB reach | `/weekly-growth-review` step 1 | **Founder-supplied.** No Meta or YouTube API. Public follower counts are readable without login; nothing else is. |
| 4 | Identify keyword opportunities | `/weekly-growth-review` step 3 (`seo-research-strategist`) | **Works without login.** Live SERP inspection via WebFetch/WebSearch. Volume/difficulty are labelled directional judgements, never measured metrics. |
| 5 | Find trending topics and real questions | `reddit-community-researcher`, `/reddit-market-listening` | **Works without login.** Public subreddits and People-also-ask. |
| 6 | Check what competitors are doing | `competitor-analysis-agent` | **Works without login.** Public pages only. Never invents a competitor or a follower count. |
| 7 | Suggest next chapters | `chapter-editor`, gated by `local-verification-editor` | **Works offline.** Reads the repo. |
| 8 | Suggest next Reels/Shorts | `instagram-shorts-strategist`, per `INSTAGRAM_REELS_PLAN.md` | **Works offline**, but the 2-of-4 promotion bar needs step 3's numbers to mean anything. |
| 9 | Suggest LinkedIn posts | `linkedin-brand-strategist`, per `LINKEDIN_PLAN.md` | **Works offline.** |
| 10 | Draft outreach | `outreach-relationship-agent`, per `OUTREACH_SYSTEM.md` | **Works offline.** Drafts only. The founder sends, personally, always. |

Steps 4–10 run today with no credentials. Steps 1–3 produce `no data this session` until the founder supplies an export or reconnects a logged-in Chrome session — this has been done successfully at least once (2026-09-09: real GSC, GA4, Meta Business Suite, GBP and LinkedIn data pulled live via browser automation, all in `marketing/SOCIAL_MEDIA_AUDIT.md` §0). It is not an API integration and does not run unattended — it requires an interactive session with the founder's logged-in Chrome profile. **A step that cannot get data says so. It never estimates.**

**Day-of-week mapping.** Added 2026-09-09. This sequences the same 10 steps above across a working week — it does not add new steps or new agents, and it does not override the founder-supplied-data rule for steps 1–3.

| Day | Steps | What actually runs |
|---|---|---|
| Monday | 1–4 | Pull whatever GSC/GA4/social data is available (founder-supplied or a fresh logged-in session), then `seo-research-strategist` turns it into keyword opportunities. |
| Tuesday | 5, 7 | `reddit-community-researcher` for real questions/trends, `chapter-editor` (gated by `local-verification-editor`) for next-chapter suggestions — see `docs/growth/chapter-upgrade-queue.md` for the current priority order. |
| Wednesday | 6, 8–9 | `competitor-analysis-agent` refresh, then `instagram-shorts-strategist` and `linkedin-brand-strategist` turn Monday's + Tuesday's findings into the week's Reels and LinkedIn posts. |
| Friday | — | Generate/refresh `marketing/MONTHLY_GROWTH_REPORT.md` (the recurring monthly report) and, once a month, the equivalent one-off sprint report if one is in flight (e.g. `docs/growth/september-final-report.md`). Step 10 (outreach drafting) runs whenever a real candidate exists, not on a fixed day. |

Fix **one** thing per week, per the existing weekly rule.

### The monthly loop

1. `/platform-presence-audit` — full cross-platform audit, refreshing `marketing/SOCIAL_MEDIA_AUDIT.md`.
2. `/social-copy-pack` — one consistent bio/description/CTA set across every platform.
3. `competitor-analysis-agent` — refresh the competitor section.
4. Generate the next edition of `marketing/MONTHLY_GROWTH_REPORT.md`, compared against the previous edition where one exists.

Prioritise highest-trust-value, lowest-effort fixes first — bio drift, dead links, inconsistent CTA — before category or structural changes to any profile. Any category, address, or business-name change on a public profile is reported with its impact before it is ever proposed for approval.

### Cadence reconciliations recorded here so they are not re-litigated

Three documented rules were adjusted, openly rather than silently:

- **LinkedIn.** `linkedin-brand-strategist` caps founder posts at **1 per week**, and that cap is unchanged. The requested 3 posts/week is met as **1 founder post + 2 company-page posts**. The cap protects the founder's personal voice, which is the scarce asset; the company page is a separate surface and was never covered by it.
- **Instagram.** `instagram-shorts-strategist` defines **4 Reels/week** across four slots. A fifth slot is added for **Voice of Himalaya**. All four original slots and the collapse rule are unchanged: if a week falls apart, ship slots 2 and 3. Slot 5 ships **only when a real, named, consented voice exists**, and is left empty otherwise.
- **Report files.** Added 2026-09-09. The September Growth Sprint spec asked for both a recurring monthly GA4 growth report and a September final report. Rather than create a third competing monthly-report file: **`marketing/MONTHLY_GROWTH_REPORT.md` is THE recurring monthly growth report** — the artefact the monthly loop regenerates, numbered by edition, compared against the previous one. **`docs/growth/september-final-report.md` is a one-off sprint retrospective** with a different purpose and lifecycle, not regenerated monthly. **`docs/growth/september-audit.md`** is that sprint's one-off Phase 0 baseline. Do not create a second recurring monthly report.

### Data honesty — binding on every step above

- Never state a metric that was not actually read this session. Mark it `not verified this session — needs founder-supplied export or a reconnected Chrome session`.
- Never carry a number forward from an older audit as if it were current. Re-verify or label it as a stale baseline.
- Never invent a competitor, a follower count, a review, a testimonial, or a traction figure. `reputation-local-trust-agent`'s no-fabrication rule applies to growth reporting identically to how it applies to chapters.
- Never claim tracking is "live" without verifying it fires. Configured and live are two different claims. Verify in **Chrome, not Brave** — Brave Shields blocks googletagmanager.com, so events push to the dataLayer and never reach GA4 or Meta.

### Approval boundary

Allowed without asking: read the repo, check public pages, run audits, draft copy, draft outreach, propose changes, write to `/marketing/`.

**Ask first, always:** publishing anything to Instagram, Facebook, LinkedIn, YouTube, Reddit or GBP; sending any outreach message; changing live public copy or slugs; changing a public profile's name, category or address; anything affecting UTM attribution.

**Never:** send a message, publish a profile change, run or boost ads, fabricate any number or claim, or continue past a login, OTP, passkey, payment, permission or billing screen. Stop and hand back to the founder.
