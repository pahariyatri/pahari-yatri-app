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

**The live trip-builder CTA currently reads "Create my package"** (`app/[lang]/builder/page.tsx` in `local-connect-app`) — this is the one banned word from the list above sitting on the product's highest-intent screen. Top-priority copy fix.

### 3. SEO strategy for both properties

**Main site** targets informational, story-led search: Kamrunag Lake, Prashar Lake, Shikari Devi, Kasol beyond Parvati Valley, Himachal temple etiquette, devta culture, Manali beyond Mall Road, Kheerganga sacred context, Parvati Valley villages, responsible travel Himachal. CTAs: read related chapter, join Yatri Circle, request local options — softly, only where relevant.

**Portal** targets conversion and local-service intent: verified homestays in Himachal, local guide in Parvati Valley, taxi from Kasol to Barshaini, homestay in Kalga/Pulga/Tosh, local guide for Kamrunag, Mandi local travel support, list your homestay Himachal, join as local guide Himachal. No doorway spam — every public portal page needs real value, real partner/context, brand-safe copy.

### 4. Cross-linking rules

Main site → portal: soft bridge, never sales pressure. *"Planning Kamrunag? Go with local context, not just a route map." → Request local guidance.* Every chapter-to-portal link should read like a suggestion, not a checkout funnel.

Portal → main site: trust bridge. *"Before you request local options, read the Pahari Yatri chapter."* Portal landing pages should link to relevant books, the Yatri Code, and responsible-travel content — Sacred Mandi, Parvati Valley Beyond Kasol, Manali Beyond Mall Road.

### 5. Portal public/indexable pages

Audit and classify every route with this table shape:

| Route | Purpose | Public/Private | Index/Noindex | Current issue | Recommendation |

As last checked, production `robots.ts` (in `local-connect-app`) already correctly disallows: `/*/auth/`, `/*/profile`, `/*/admin`, `/*/bookings`, `/*/checkout`, `/*/vendor/onboarding`, `/*/vendor/dashboard`, `/*/vendor/payouts`, `/*/vendor/calendar`, `/*/vendor/contracts`, `/*/vendor/partnerships`, `/*/vendor/services`, `/*/vendor/bookings`, `/*/journey/view`. That part is in good shape — don't redo it, extend it as new private routes appear.

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

**Known issue:** `app/[lang]/layout.tsx` in `local-connect-app` is a client component (`"use client"`). It wraps every real page in the app. Because it can't export `metadata`, canonical/OG/etc. all had to move up to the (server) root `app/layout.tsx` via `generateMetadata` — which the team has actually done well (locale-aware title/description/canonical/hreflang via `BRAND_CONFIG`). The risk is future pages assuming they can set their own metadata from inside `[lang]/layout.tsx` and silently failing to.

### 8. Tracking events

**Code is built; nothing is live yet — those are two different claims, keep them separate.** `local-connect-app` has `lib/analytics.ts` (single `pushEvent()` → `window.dataLayer`, one function per event) and a conditional GTM loader in `app/layout.tsx`, wired to all 14 portal events plus `app_landing_view`/`portal_cta_click` on the landing page. **Never say tracking is "live" or "on" without independently verifying the deployed bundle actually contains a GTM ID** — see the deploy note below for exactly how.

Required events — main site bridge: `portal_cta_click` · `request_local_options_click` · `vendor_apply_click` · `app_landing_view`.

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
