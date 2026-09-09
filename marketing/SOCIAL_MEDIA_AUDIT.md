# Social Media & Platform Audit — Pahari Yatri

**Date:** 2026-09-09 (v2 — live logged-in pass)
**Run by:** Claude Code, direct browser automation with a logged-in Chrome session (Instagram, Facebook/Meta Business Suite admin, Google Analytics 4, Google Search Console, Google Business Profile Manager, LinkedIn Company Page admin, YouTube), plus public Google Search.
**Scope:** website, Instagram, Facebook, YouTube, LinkedIn, Google Business Profile, off-site listings, Google Search appearance.
**Status:** audit only. Nothing was published, changed, sent, or deleted. No comments were replied to, no posts were boosted, no ads were started, no monetisation offer was actioned.

This is a full revision of the 2026-09-09 v1 audit, which was run without browser access and had to mark most of this document `not verified this session`. That caveat is now resolved for every platform below except two items called out explicitly (§5 YouTube Studio internals, §8 SafarCabby phone digits). Where this version contradicts v1 — most importantly §6 LinkedIn and §7 GBP, both previously "unconfirmed" and now confirmed to exist — this version is correct; v1 was reporting an absence of access, not an absence of the thing itself.

---

## 0. Data honesty statement

| Source | Available this pass? |
|---|---|
| Website, public profile pages | Yes — direct browse |
| Instagram (as a logged-in viewer, not the account owner) | Yes — bio, posts, follower/following counts. Post-level Insights (saves, shares beyond what Meta Business Suite shows) not available from this login. |
| Facebook Page + Meta Business Suite | Yes — **admin access**. Real reach, content, and audience numbers below. |
| Google Analytics 4 (property: pahariyatri.com) | Yes — **admin/viewer access**. |
| Google Search Console (property: pahariyatri.com) | Yes — **verified owner access**. |
| Google Business Profile Manager | Yes — **verified owner access**. |
| LinkedIn Company Page admin | Yes — **admin access**. |
| LinkedIn founder personal profile | Confirmed to exist (logged in as the founder). Not deep-audited — that's the founder's personal identity, not the brand's, and existence is all Task 2B needs to proceed. |
| YouTube channel (public + Studio-adjacent) | Partially — public channel page checked directly. Full YouTube Studio (traffic sources, audience retention) not opened this pass. |
| Reddit mentions | Not re-checked this pass; v1's "zero known mentions" stands, still not exhaustive. |

Every number below was read directly off a live dashboard or page on 2026-09-09. Nothing is estimated or carried forward from an older baseline unless explicitly labelled as such.

---

## 1. Executive summary — five things that matter, in order

**1. The brand currently describes itself five different ways across five platforms it controls, and the most-reviewed one is "tour operator."**

| Platform | Self-description, verbatim, read live |
|---|---|
| Website H1 | "Experience the Himalayas like a Yatri, not a tourist." — correct |
| Instagram bio | "Not tourism. A movement of Yatris 🌿 Hidden valleys, sacred lakes & secret trails. Limited journeys guided by Himalayan experts." |
| Facebook bio | "A 'Pahari Yatri Who a one avid Traveler, a day-night dreamer and a soul wandering in the Himalayas." |
| Google Business Profile category | **Tour operator** |
| LinkedIn Overview | "Experiential storytelling brand curating purposeful Himalayan journeys with community collaboration, cultural preservation & environmental respect." |
| LinkedIn job post (live, hiring a Content Creator) | "...a venture dedicated to curating unparalleled trekking and mountaineering experiences in **untouched landscapes**." |
| YouTube channel description | "Pahari Yatri - Your Ultimate Travel Companion" |

This is not a hypothetical drift risk. The GBP identity is backed by **29 real, named, 5.0★ Google reviews** describing actual guided treks delivered, with owner replies dating back to September 2024 ("Thanks, Mohit for the great review! Glad you loved the trek and views."). The "tour operator" identity is the business's real operating history, not a mistake sitting in a form field. The "storytelling library" identity is the strategy going forward. Both are true at once, on different platforms, and nothing currently tells a reader which one they're looking at.

**2. Every channel except Instagram is dormant, and Instagram itself is losing followers.**

- **LinkedIn company page:** 77 followers, **zero posts ever published**, 0 new followers / 0 post impressions / 0 page visitors in the last 7 days.
- **Facebook:** 36 followers, page live since **August 2023** (over two years), **0 Facebook posts and Facebook reach of 1 (one)** in the most recent 7-day window Meta reports.
- **YouTube:** 2 subscribers, 1 regular video, **1 Short ever posted** (173 views) against ~189 Instagram posts in the same period — the "repost every good Reel as a Short within 48h" rule is not happening in practice.
- **Instagram**, the one channel with real activity and reach, is still **net losing followers**: 23 follows vs. **30 unfollows** in the last 90 days (Meta Business Suite, Audience → Trends).

**3. Search traffic is real but tiny, and does not hit a single one of the six keywords the founder named as targets.**

Google Search Console, last 3 months: **24 clicks, 1,160 impressions, 2.1% average CTR, average position 16.8.** Of the top 10 actual queries bringing impressions — `pahari`, `pahari path`, `mural danda trek`, `mural hills`, `pahadi log`, `jamadagni rishi temple`, `yatri way`, `patiyayatri`, `यात्री`, `himalayan folklore` — **none is "Himachal travel guide," "Parvati Valley villages," "Kasol hidden places," "Kheerganga trek guide," "Kamrunag Lake story," or "Winter Himachal travel."** Separately, **90 of 127 known pages are not indexed by Google at all** (Search Console → Indexing → Pages).

**4. The Instagram → website bridge the whole content strategy is built on is barely used.**

GA4, last 28 days (Aug 12 – Sep 8), 83 total users, 326 total events: `page_view` 113, `session_start` 87, `first_visit` 82, `user_engagement` 17, `scroll` 15, **`chapter_view` 7**, **`reel_source_visit` 2**, `apply_start` 1, `click` 1, `social_click` 1. Tracking is confirmed **live and firing** — that was unverifiable in v1 — but in four weeks, only two site visits were attributed to a Reel, and only seven chapter reads happened at all, from every source combined, against 1,065 Instagram followers and thousands of weekly reach.

**5. Google Business Profile is the strongest trust asset in the entire presence and nothing in the current strategy accounts for it.**

Verified, 5.0★ average, 29 real reviews with named reviewers, photos, and owner replies — more third-party trust signal than Instagram, Facebook, LinkedIn and YouTube combined. It is also visibly unmanaged: hours read **"Closed · Opens 12 am Thu"** (a literal-midnight opening time is very unlikely to be intentional), and profile strength is incomplete per Google's own prompt. This is a founder-decision item (§7), not a routine fix — but it should stop being treated as "maybe doesn't exist."

---

## 2. Website — pahariyatri.com

```
PLATFORM              — Website (pahariyatri.com)
CURRENT STATUS        — Live. Title: "Pahari Yatri — Learn the Himalayas Before You Walk
                        Them". H1: "Experience the Himalayas like a Yatri, not a tourist."
                        Content: 6 books (3 published), 39 chapters, 28 stories.
BRAND CONSISTENCY     — 4/5, unchanged from v1. Strongest brand asset in the whole
                        presence. Two drifts: (a) homepage copy "Secret Valleys.
                        Forgotten Trails"; (b) data/siteMetadata.js keywords contains
                        "hidden places in Himachal".
TRAFFIC VALUE (NOW VERIFIED) — GSC 3 months: 24 clicks / 1,160 impressions / 2.1% CTR /
                        16.8 avg position. GA4 28 days: 83 users, 326 events, only
                        7 chapter_view and 2 reel_source_visit. See §1.3 and §1.4.
                        Indexing: 37 of 127 pages indexed, 90 not indexed.
TRUST VALUE           — High. Real content depth, hedged cultural claims.
ISSUE                 — Five-way positioning split, not two-way (§1.1). Also: a broken
                        social link — app/layout.tsx and app/scan-me/page.tsx link to
                        facebook.com/pahariyatri, which returns "This content isn't
                        available." The real, live Facebook URL is
                        facebook.com/fb.pahariyatri. Every visitor who clicks the
                        Facebook icon on the site hits a dead page.
RECOMMENDATION        — 1. Fix the Facebook URL in app/layout.tsx and app/scan-me/
                           page.tsx to facebook.com/fb.pahariyatri. This is a plain bug,
                           not a strategy call — safe to fix without further approval
                           once confirmed, since it's a correction, not new content.
                        2. Rewrite the `keywords` string in data/siteMetadata.js to drop
                           "hidden places in Himachal".
                        3. Replace homepage "Secret Valleys. Forgotten Trails".
                        4. Founder decision required on the five-way identity split.
PRIORITY              — high (Facebook link is a real broken-link bug found live)
```

**Structured data note (unchanged from v1):** `app/layout.tsx` declares `sameAs` listing Facebook, Instagram, Twitter, YouTube. `data/siteMetadata.js` lists Instagram, YouTube, Facebook and Threads — no Twitter, no LinkedIn (which now demonstrably exists, see §6). Both files should list the same set, and LinkedIn should be added to both once the founder confirms it's the account of record.

---

## 3. Instagram — @pahariyatri

```
PLATFORM              — Instagram (https://www.instagram.com/pahariyatri/)
CURRENT STATUS        — Public, active. 189 posts / 1,065 followers / 530 following.
                        Category: "Travel Service". No Story Highlights exist on the
                        profile at all — a first-time visitor gets the grid and nothing
                        else structured.
                        Bio, full text: "Not tourism. A movement of Yatris 🌿
                        Hidden valleys, sacred lakes & secret trails.
                        Limited journeys guided by Himalayan experts."
                        Link in bio: pahariyatri.com (homepage) + a second link to the
                        Facebook Page.
CONTENT STYLE (NEW)   — The actual posted grid is dominated by relatable/humor Reels —
                        career-quitting jokes, "Bhai baat samjho, ab pahadon ki ek
                        baitak zaroori hai", "Paisa ped par hi lagta hai", "Mere Papa Ki
                        Girlfriend", "Enjoying Our Unemployed Era" — mixed with a smaller
                        number of genuine place-and-culture posts (Manikaran, a
                        Kedarnath crowd shot captioned "Kedarnath ❌ Delhi NCR ✅"). This
                        is a real, distinct brand voice from "sacred not scenic, local
                        truth" — it reads as a relatable-lifestyle meme account that
                        occasionally posts Himalaya content, not a Himalayan storytelling
                        library that occasionally posts a joke.
AUDIENCE (Meta Business Suite, lifetime) — Age/gender skews heavily male: Men 81.7%,
                        Women 18.3%, dominant bracket 25–34. Top cities: Sundarnagar HP
                        4.5%, Delhi 2.5%, Mohali (Punjab) 2%, Bilaspur HP 1.5%, Mandi HP
                        1.5%. Top countries: India 46%, US 1.4%, Canada 0.8%, UK 0.8%,
                        Germany 0.6%.
GROWTH (Meta Business Suite, last 90 days) — Follows: 23 (↓34.3% vs. prior period).
                        Unfollows: 30. **Net loss of 7 followers over 90 days.**
CONTENT PERFORMANCE (Meta Business Suite, real numbers) — Last 7 days: 1 post published,
                        2.6K reach. Last 28 days: only 2 pieces of content total — one
                        reel at 139 views/130 reach, one at 2,828 views/2,240 reach
                        (58 interactions, 48 likes). Last 90 days: the single best
                        performer (2,961 views, 2,144 reach) was a **repost from another
                        creator** (_solo_tripper_02), not original content.
BRAND CONSISTENCY     — 1/5. Three banned phrases in the bio (hidden valleys, secret
                        trails, limited journeys) plus scarcity language plus an
                        internal contradiction ("Not tourism" → "Limited journeys").
TRAFFIC VALUE         — Real reach (thousands/week) but structurally capped: bio link
                        goes to the homepage, and GA4 shows only 2 reel-attributed site
                        visits in 28 days (§1.4).
ISSUE                 — Bio violates brand rules three times over on the one channel
                        that's actually working; posted content doesn't match the
                        intended voice; account is shrinking, not growing.
RECOMMENDATION        — Replace the bio (draft in SOCIAL_STRATEGY.md §2). Move the bio
                        link to a chapter or Yatri Circle landing page with a UTM. Decide
                        deliberately whether the humor-Reel format stays (it may be what
                        earned the real 2.6K-reach post) alongside more chapter-rooted
                        content, rather than drifting between the two unplanned.
PRIORITY              — HIGHEST
```

---

## 4. Facebook — real URL is facebook.com/fb.pahariyatri, not /pahariyatri

```
PLATFORM              — Facebook. The codebase links to facebook.com/pahariyatri, which
                        is DEAD ("This content isn't available"). The real, live,
                        admin-accessible page is at facebook.com/fb.pahariyatri.
CURRENT STATUS        — Page name "Pahari Yatri". Category: "Travel company". 36
                        followers, 10 following. Live since 8 Aug 2023 (2+ years).
                        Bio, full text: "A 'Pahari Yatri Who a one avid Traveler, a
                        day-night dreamer and a soul wandering in the Himalayas."
                        (this is grammatically broken and reads as a personal blog,
                        not a brand).
                        Cover image + Instagram profile picture both use the same
                        "Pahari Yatri — Turning Treks Into Himalayan Yatras" graphic
                        with a QR code — the one piece of genuinely consistent visual
                        branding found across platforms.
CONTACT INFO (real, on record) — Phone: +91 62808 88188 (mobile). Email:
                        info@pahariyatri.com (matches site). Instagram: correctly
                        linked to @pahariyatri. WhatsApp button: present and active.
                        "Get a verified badge" is offered, meaning the page is NOT
                        currently Meta Verified.
REACH & ACTIVITY (Meta Business Suite, real numbers) — Last 7 days (30 Aug–5 Sep): 0
                        Facebook posts, 0 Facebook stories, 1 Instagram post (crossed
                        into this dashboard), 0 Instagram stories. **Facebook reach: 1.**
                        Facebook visits: 5 (↑100% — i.e., up from near zero). Content
                        interactions: 0. New messaging contacts: 0.
                        An open alert reads: "Your earnings from Facebook content
                        monetisation expired."
AUDIENCE               — 36 lifetime followers, below Meta's 100-follower threshold for
                        any demographic breakdown.
BRAND CONSISTENCY     — Not assessable against Instagram's voice — this page barely
                        posts anything of its own; the content that exists is almost
                        entirely Instagram Reels crossposted in.
TRAFFIC VALUE         — Effectively zero, and CLAUDE.md's "repost/infrastructure layer,
                        not primary growth" framing is generous — a page with 0 posts
                        and reach of 1 isn't functioning as infrastructure either.
ISSUE                 — Broken link from the site to a page that doesn't even exist at
                        that URL; the page that does exist is unbranded and inactive.
RECOMMENDATION        — 1. Fix the URL on-site (see §2).
                        2. Rewrite the Facebook bio to match the approved brand
                           description once one exists — do not leave the current
                           broken-grammar text live.
                        3. Decide whether Facebook is worth the minimal weekly repost
                           effort CLAUDE.md already prescribes, given it is currently
                           producing zero reach either way.
PRIORITY              — high (dead link is a real, live bug affecting every visitor)
```

---

## 5. YouTube — @pahariyatri

```
PLATFORM              — YouTube (https://www.youtube.com/@pahariyatri)
CURRENT STATUS        — 2 subscribers. 1 regular video. 1 Short ever posted: "Winter Is
                        Coming! Plan Your Epic Trip with..." — 173 views.
CHANNEL DESCRIPTION    — "Pahari Yatri - Your Ultimate Travel Companion" — generic
                        travel-agency framing, and a FOURTH distinct self-description
                        alongside Instagram's, Facebook's, and LinkedIn's (see §1.1).
BANNER                — Same "Turning Treks Into Himalayan Yatra" graphic as Facebook/
                        Instagram, plus "Call for Reservation +91 6280888188" — booking-
                        agency language, consistent phone number.
BRAND CONSISTENCY     — Not assessable on content (only one Short exists) but the
                        channel description itself is off-brand.
TRAFFIC VALUE         — Effectively zero. The strategy's "repost best Reels as Shorts
                        within 48h" rule is not happening: 1 Short exists against ~189
                        Instagram posts.
TRUST VALUE           — Negligible at this scale (2 subscribers).
ISSUE                 — Channel is functionally abandoned as a repost surface despite
                        being defined as one in strategy.
RECOMMENDATION        — Either commit to the 48h repost cadence for real, starting with
                        the 2,828-view and 2,961-view Reels already identified in §3, or
                        formally deprioritise YouTube rather than leave it silently
                        unused. Rewrite the channel description to match the approved
                        brand description.
PRIORITY              — medium — low current cost, but the channel description is a
                        live, public, off-brand asset that costs nothing to fix.
```

---

## 6. LinkedIn — EXISTS. Company page confirmed, zero activity.

```
PLATFORM              — LinkedIn Company Page: linkedin.com/company/pahari-yatri
                        (numeric ID 99308813). CONFIRMED TO EXIST — v1's "no LinkedIn
                        presence on record" was a data-access gap, not a fact about the
                        world. Admin access confirmed (logged in as the founder).
CURRENT STATUS        — 77 followers. Tagline: "Not tourism. A movement of Yatri."
                        Overview: "Experiential storytelling brand curating purposeful
                        Himalayan journeys with community collaboration, cultural
                        preservation & environmental respect." Industry: Travel
                        Arrangements. Company size: 2–10 employees. Company type: Self
                        Owned. Year founded: 2020. Phone: 6280888188 (matches Facebook/
                        GBP). Website: https://pahariyatri.com/.
ACTIVITY               — ZERO posts have ever been published from this page ("Page
                        posts" tab is empty; "No highlights, No recent post to
                        highlight" for the last 30 days).
PERFORMANCE (last 7 days, real numbers) — 37 search appearances (↓24.5%), 0 new
                        followers, 0 post impressions, 0 page visitors.
LIVE JOB POSTING (found via public search, real and current) — "Pahari Yatri hiring
                        Content Creator in India." Description: "Welcome to Pahari
                        Yatri, a venture dedicated to curating unparalleled trekking
                        and mountaineering experiences in untouched landscapes." This
                        is public, live content actively describing the company as a
                        trekking venture to job applicants, using "untouched
                        landscapes" — a close cousin of the explicitly banned
                        "untouched paradise."
FOUNDER PERSONAL PROFILE — Confirmed to exist (this session is logged in as the
                        founder). Not deep-audited — out of scope for a brand audit
                        and it's the founder's own identity to manage — but its
                        existence is what LINKEDIN_PLAN.md needs to proceed with
                        founder-led posts.
BRAND CONSISTENCY     — Tagline and Overview are actually the BEST-aligned self-
                        description of any platform audited — closer to brand voice
                        than the website's own homepage copy in places. The live job
                        posting directly contradicts it.
TRAFFIC/TRUST VALUE   — Currently zero, entirely because of inactivity, not because the
                        page is broken or badly described.
ISSUE                 — A well-written, unused asset, undercut by one live piece of
                        content (the job post) that contradicts it.
RECOMMENDATION        — 1. Publish the first founder-led post — LINKEDIN_PLAN.md already
                           has drafts ready, this was previously blocked on "does the
                           page exist," which is now resolved.
                        2. Rewrite the Content Creator job post to drop "untouched
                           landscapes" and describe the actual storytelling work, once
                           the founder approves new copy.
                        3. Add the LinkedIn URL to data/siteMetadata.js and the
                           layout.tsx sameAs array (see §2).
PRIORITY              — high-value, low-effort — this is the easiest real win in the
                        whole audit: a correctly-described, zero-activity page just
                        needs its first post.
```

---

## 7. Google Business Profile — EXISTS, VERIFIED, 5.0★/29 reviews

```
PLATFORM              — Google Business Profile. CONFIRMED TO EXIST AND BE VERIFIED —
                        v1 marked this "unconfirmed, eligibility must be checked first."
                        It already passed that check: Business Profile Manager shows
                        "1 business, 100% verified."
CURRENT STATUS        — Business name: "Pahari Yatri". Category: **Tour operator**.
                        Service area: Mandi (HP), Chamba (HP), and 5 other areas (full
                        list not captured this pass — pull it from Business Profile
                        Manager → Edit profile → Service area for the strategy doc).
                        Phone: 062808 88188 (matches Facebook and LinkedIn exactly).
                        Hours: "Closed · Opens 12 am Thu" — a literal-midnight opening
                        time is very unlikely to be intentional and should be checked.
                        Website link: present, points to pahariyatri.com.
REVIEWS (real, read directly) — 5.0★ average, 29 Google reviews. Sampled reviews are
                        from named accounts with review histories and photos (e.g.
                        Mohit Thakur, 11 reviews / 3 photos, 5★, 30 weeks ago:
                        "Trekking with Pahari Yatri was incredible! The guides were
                        great, and the views were stunning. It felt more like a
                        journey than just a trek!"), with an owner reply on record
                        dated 29 Sept 2024. These read as genuine reviews of real
                        delivered treks, not fabricated — this is a real trust asset,
                        not a liability to hide.
SEARCH SNIPPET (organic, for pahariyatri.com itself) — "Pahari Yatri — Learn the
                        Himalayas Before You Walk Them... Pahari Yatri is a digital
                        Himalayan library and community for people who want to
                        understand the mountains before they travel." On-brand and
                        correct — this is what ranks for the brand name organically,
                        separate from the Maps/GBP panel next to it.
PROFILE STRENGTH      — Incomplete per Google's own "Complete info" prompt; "2 customer
                        interactions" shown.
BRAND CONSISTENCY     — Category directly says "tour operator," which is the most
                        concrete instance of the five-way identity split in §1.1 — and
                        it's the one with real third-party proof (29 reviews) behind it.
TRUST VALUE           — Highest of any platform audited. Real, verifiable, specific.
ISSUE                 — This is a founder-decision item, not a routine fix: does the
                        business keep presenting as "Tour operator" (honest to its
                        history and reviews) with the library as a separate content
                        arm, or does the category change (which CLAUDE.md §9 requires
                        be reported with impact before ever being proposed)? Either
                        way, the hours look wrong and should just be fixed.
RECOMMENDATION        — 1. Founder confirms/corrects business hours (12am Thursday
                           opening looks like a data-entry default, not a real hour).
                        2. Founder decides the category question above — this audit
                           does not recommend a category change on its own judgment.
                        3. Pull the full service-area list into the strategy doc.
                        4. Add the GBP as a linked, sourced trust asset in
                           SOCIAL_STRATEGY.md and reputation materials — 29 real 5★
                           reviews is worth citing, accurately, not hiding.
PRIORITY              — founder-decision on positioning; routine fix on hours
```

---

## 8. Off-site listings and Google Search appearance

**Google Search appearance for the brand name** (unchanged pattern from v1, re-confirmed): the brand competes for its own name against the Pahari language, Pahari painting, and Pahari people — a real, structural SEO headwind on top of the keyword-targeting gap in §1.3.

**SafarCabby — re-confirmed live this pass, with a new detail:**

Google's AI Overview and organic results (2026-09-09) confirm: *"Pahari Yatri is listed as a verified car rental and guided trekking vendor on SafarCabby based in Solan, Himachal Pradesh."* A second organic result gives a specific address for the listing: **"Rajgarh Rd, near Degree College, Kotla Nala, Solan, Himachal Pradesh 173212."** Listing copy: *"Pahari Yatri offers transformative trekking experiences in Himachal Pradesh's Himalayas. We don't just guide treks; we craft Himalayan Yatras,"* filed under SafarCabby's "Best Taxi Services" category.

This confirms v1's finding was real, not a stale scrape, and adds a specific street-level address that appears nowhere else in any platform audited (GBP's service area is Mandi/Chamba + 5 areas — Solan was not among the two named). **The phone number previously reported for this listing (787-777-0858) was not re-opened and re-read digit-for-digit this pass** — that specific figure should be treated as needing one more direct check of safarcabby.com before being quoted as current, though the listing's existence, location claim, and copy are now confirmed live.

This remains flagged, not actioned — ownership of this listing (founder-created, third-party-created, or scraped) is still unconfirmed, and an agent should not touch a listing it cannot verify ownership of.

**Reddit mentions:** not re-checked this pass. v1's "zero known mentions this session, not exhaustive" stands.

---

## 9. Competitor analysis (v3 — refreshed 2026-09-09)

Re-run live this session by `competitor-analysis-agent`. This tool has no Bash access, so the prior tables could not be diffed directly from git history — but their *conclusions* survive in `marketing/MONTHLY_GROWTH_REPORT.md` and `marketing/SOCIAL_STRATEGY.md`, and this pass tested those conclusions against fresh SERP reads rather than re-deriving them from nothing.

**Verified live this session:** every URL and quote below; SERP composition for all 8 queries checked; 5 Instagram follower reads.
**Carried forward, not re-derived:** GSC 24 clicks / 1,160 impressions / 2.1% CTR / pos 16.8; 90 of 127 pages unindexed; GA4 7 `chapter_view` / 2 `reel_source_visit` (all from §1 above).

**One correction to a fact assumed elsewhere:** `parashar-lake-trek` is not an orphan chapter. It IS listed in `data/books/monsoon.yaml` (line 15) and receives three inbound chapter links. Its real problem is that `monsoon` has no `published: true` — the chapter is assigned to an unpublished book, which is a homelessness problem, not a linking problem. (This is corrected again, with more detail, in the chapter-upgrade queue — see the new `docs/growth/chapter-upgrade-queue.md`.)

### 9.1 Kamrunag cluster

Queries checked live: `kamrunag lake`, `kamrunag trek`, `kamrunag lake story legend Dev Kamrunag`.

| Competitor | URL | Does well | Gets wrong | Gap PY can win |
|---|---|---|---|---|
| Wikipedia | en.wikipedia.org/wiki/Kamrunag_Lake | Extractable facts: 3,334 m, 6 km from Rohanda, Biodiversity Heritage Site (2020). Answer-engine default. | No living practice. No fair dates, no committee, no etiquette. | Everything that happens *at* the lake in a given month — Wikipedia structurally can't hold a fair calendar. |
| District Mandi (Govt) | hpmandi.nic.in/tourist-place/kamrunag-lake/ | Official, authoritative distances (Mandi→Rohanda 47 km, Rohanda→Kamrunag 6 km). | Two paragraphs. No narrative. | Depth — the government page is the citation, not the read. |
| **AllTrails** (new this pass) | alltrails.com/trail/india/himachal-pradesh/kamru-nag-lake | Ranked #1 live. Real GPS track, 5 mi / 2,549 ft gain, 6 reviews. Wins the "is it hard" intent outright. | Zero cultural layer — treats a working shrine as a trail node. | The reason the trail exists at all. |
| eHimachal | ehimachal.org/kamrunag-temple/ | Most complete non-govt page found: ~1,500–1,800 words, route + access + a June mela. | "No sources are cited." No rules, no etiquette, no fee. Marketing register ("breathtaking views"). | Sourcing — PY's `docs/audit-evidence/research-citation-ledger.json` already holds Tribune quotes eHimachal doesn't have, including a named temple-committee president. |
| HimachalStory | himachalstory.com/location/kamru-nag-lake-mandi/ | Closest editorial-folklore competitor; carries two origin stories. | "No academic sources cited... No named local informants." Elsewhere on the same page: "Chindi is a **hidden gem**." | Named attribution — folklore with a source beats folklore without one. |
| TravelTriangle | traveltriangle.com/blog/kamrunag-lake/ | Volume, domain strength. | Pure aggregator. | Nothing to copy. |

**Kamrunag gap sentence:** *Kamrunag is not a viewpoint with a legend attached — it is Bada Deo's residence, run by a named temple committee with a fair calendar and a closure window, and Pahari Yatri is the only page that will tell you who decides.*

### 9.2 Parvati Valley cluster

Queries checked live: `parvati valley villages`, `kalga village himachal`, `tosh village parvati valley`, `kheerganga trek guide`, `grahan village kasol trek`, plus a live check on the camping-ban news.

| Competitor | URL | Does well | Gets wrong | Gap PY can win |
|---|---|---|---|---|
| Wikipedia | en.wikipedia.org/wiki/Parvati_Valley | Holds the one genuinely hard fact in this cluster: Malana speaks **Kanashi**, "now classified as endangered," governed via a devta-linked council. | Neutral, non-navigational, no seasonality. | Extend Wikipedia's own framing — deity-linked village governance — into every village it doesn't cover. |
| On My Canvas | onmycanvas.com/travel-parvati-valley-himachal-pradesh/ | Explicitly "Not Your Typical Travel Guide" — the strongest editorial competitor in this cluster. | Personal memoir, about the writer, not the villages. Elsewhere: "You Won't Believe" framing. | Resident perspective over traveller memoir. |
| Thrillophilia | thrillophilia.com/places-to-visit-in-parvati-valley, /tours/trek-to-grahan | Owns the conversion layer. | Live title evidence: "**Book Now** & Get @20% Off!"; "**10 Places to Visit**." | Nothing — this is the traffic model PY isn't building. |
| Holidify / India.com / MakeMyTrip | holidify.com/places/parvati-valley/... | Domain authority, "2026" freshness stamps. | Live titles: "Why Tosh Village... is a **Must Visit**"; "**14 Places to visit**." | These pages structurally cannot state a rule without weakening their own pitch. |
| **whistlinghound** (new this pass — the rules encroacher) | whistlinghound.com/kheerganga-camping-ban/ | Covers the July 2024 camping ban directly, updated May 2025. | "No official links or direct quotes from Forest Department orders." A booking site — the rule is framed as a logistics constraint. | Sourcing, and the consequence for the ~400–500 local tent operators the ban displaced. |
| discoverwithdheeraj | discoverwithdheeraj.com/kheerganga-trek-travel-guide-beginners/ | Live title now reads "Day-Trek Rules + Hot Springs" — "rules" has entered this SERP since the last pass. | Rules as logistics, not authority. No panchayat, no devta, no order number. | Who made the rule and why. |
| Tribune India | tribuneindia.com/news/himachal/camping-prohibited-in-kullus-kheerganga-area-638633/ | The primary source everyone paraphrases. Not a competitor — a citation. | — | Cite it. None of the commercial pages above do. |

**Parvati gap sentence:** *Every page in this cluster still sells these villages as a feeling; Pahari Yatri is the one that treats Kalga, Tosh, Pulga and Grahan as inhabited panchayats whose rules changed in July 2024 and whose residents paid for the change.*

### 9.3 Prashar Lake cluster (new this pass)

`prashar lake` and `"parashar lake trek"` have **almost no SERP overlap** — that split is itself the finding, and it means PY's chapter (currently titled "Parashar Lake Trek") is aimed at the harder, fully-commercial half of its own keyword.

| Competitor | URL | Read |
|---|---|---|
| Wikipedia | en.wikipedia.org/wiki/Prashar_Lake | 2,730 m, 14th-century pagoda temple, the floating island, holomictic classification. No devta layer. |
| AllTrails | alltrails.com/trail/india/himachal-pradesh/prashar-lake-trek | #1 live. Same gap as Kamrunag: owns the route, not the reason it exists. |
| **Indiahikes** | indiahikes.com/documented-trek/prashar-lake-trek | Ranked #2 live, genuinely credible "documented trek" positioning — but its authority is trek-operational, not cultural, and that's a different business than PY's. (Page fetch returned 403 — not characterised further.) |
| **Grokipedia** (new competitor *type*) | grokipedia.com/page/Prashar_Lake | An AI-generated encyclopaedia entry now ranks here. No named authorship, no fieldwork, no accountability — exactly what PY's citation ledger and named-source discipline exist to beat. |
| Thrillophilia / JustWravel / others | — | Own `"parashar lake trek"` almost completely: "**Book @ ₹2199 Only**." PY should not contest this half of the query — it should own `prashar lake` (informational), which is culturally empty. |

**Prashar gap sentence:** *Prashar and Kamrunag are sold as two separate weekend treks, but they share the Saranahuli fair and one devta geography — Pahari Yatri is the only publisher positioned to write them as one region rather than two products.*

### 9.4 Instagram attention competitors

Read directly off public profiles, 2026-09-09. Post counts weren't visible on any profile through this tool.

| Account | Followers (live) | Bio, verbatim | Read |
|---|---|---|---|
| @indiahikes | **655K**, following 155 | "Largest, Safest & Most Sustainable Trekking Organisation of India." | A national organisation with a paid trek business behind the feed — not a benchmark for a 1,065-follower account. |
| @visit__himachal | **11.7K**, following 2,777 | "Himachali 🍁 Explore Himachal \|\| Culture \|\| travelling ☃️" | Pure attention competitor; the following:follower ratio reads as follow-for-follow growth, not editorial authority. Nearest realistic scale comparison to PY. |
| @devbhoomi_family | **3,320**, following 70 | "DEVBHOOMI: THE PAHADI CULTURE — A College Society promoting culture of Uttarakhand and Himachal Pradesh." | Closest positioning overlap to PY's actual subject. A college society, no commercial motive — a potential collaborator, not a threat. |
| @himachalpradeshtourism, @himachal_pradesh_, @_solo_tripper_02 | not readable (login wall) | — | `@_solo_tripper_02` matters regardless: audit §3 already records that PY's single best-performing post in 90 days (2,961 views) was a **repost from this creator**, not original content — attention competitor and de facto content supplier at once. |
| @kasol_diaries | 181, following 986 | "Holiday gateway. Travel **packages** available..." | Not a competitor at this scale — kept as banned-language evidence, since this is the account a traveller would guess is a package reseller. |

No large Himachal devta/village-rules Instagram account was found. `@devbhoomi_family` is the only overlapping-subject account in this set, and it's a 3,320-follower student society.

### 9.5 What changed since the earlier pass — five bullets

1. **"No editorial competitor in the Kamrunag cluster" needs a qualifier now.** Five editorial-ish pages rank (eHimachal, HimachalStory, three blogs). Verified live: not one cites a source or names a local informant, and none carries the fair calendar, the closure window, or the temple committee. Refined verdict: *no competitor has sourced cultural depth* — narrower, and still defensible.
2. **The Parvati verdict is partly overtaken — "rules" is now in the SERP.** Overnight Kheerganga camping has been banned since July 2024 (re-confirmed live as still in force). Two competitor titles now use "rules" language. But every one of them frames rules as a booking constraint, links no order, and never asks what the ban cost local tent operators.
3. **Two new competitor *types* entered both lake SERPs.** AllTrails ranks #1 live for both `kamrunag lake` and `prashar lake`. Grokipedia now appears for Prashar. Neither is capable of cultural context, which strengthens PY's gap — but both are hard to outrank on pure route/fact intent, narrowing where PY should actually compete.
4. **Prashar splits into two SERPs, and PY's chapter targets the wrong half** — see §9.3.
5. **None of this is reachable yet, and that should not be forgotten.** 90 of 127 pages are unindexed, average position is 16.8, and the real impression queries are `pahari`, `mural danda trek`, `jamadagni rishi temple` — not any query in this section. Competitor analysis is not this month's bottleneck; indexing is.

### 9.6 Three content angles no competitor is covering

1. **What the camping ban did to the villages that hosted the camps.** Every page treats the July 2024 Kheerganga ban as a rule for tourists. Nobody asks what happened to the ~400–500 tents run by people from Barshaini, Kalga, Tosh and Nakthan. Reportable — the order is already sourced (Tribune), the village side is unwritten. Requires real interviews — route through `OUTREACH_SYSTEM.md`, not a desk write.
2. **Who is allowed to decide anything at Kamrunag, and when the lake is closed.** The SERP repeats the treasure legend and skips the administration. `docs/audit-evidence/research-citation-ledger.json` already holds a named temple committee president, a langar start date, and a cleaning-window closure — material nobody else has surfaced.
3. **The road changed who arrives.** The ledger holds reporting that a 16 km road was built to the Kamrunag temple boundary and that the committee itself observed rising visitor numbers afterward — while AllTrails and most blogs still describe it as foot-access only. Pairs naturally with Prashar Lake, where the same dynamic runs one step ahead.

### Handoffs from this pass

- `seo-research-strategist` — the Prashar two-SERP split and its `title`/`seoTitle` implication; the `monsoon` book publication question (also flagged independently in the chapter-upgrade queue).
- `chapter-editor` — the three angles above; also a route-distance discrepancy worth one check (`parashar-lake-trek.yaml` says ~9 km one way from Baggi, several operator pages say ~16 km round trip).
- `instagram-shorts-strategist` — `@devbhoomi_family` as a collaboration lead, not a competitor to out-post; `@indiahikes`' 655K must never be quoted as a benchmark for this account.

---

## 10. Trust and credibility audit — story sourcing

Unchanged from v1 — not re-run this pass. Zero of 28 stories in `data/stories/` carry a named human source; 8 are correctly hedged as editorial composites, 20 are not labelled and read as real interviewed people. This remains the blocking constraint on "Voice of Himalaya" as specified — see the previous edition for the full finding.

**New context from this pass that bears on it directly:** GBP's 29 reviews are the opposite case — real, named, verifiable people, already saying things like "It felt more like a journey than just a trek." That is exactly the kind of real voice the story library lacks. Reviewers who left a 5★ GBP review are a plausible first outreach list for Voice of Himalaya, with consent asked properly — see OUTREACH_SYSTEM.md.

---

## 11. Cross-platform consistency verdict

**Revised from v1's 2/5.** The picture is not "most channels don't exist" (v1's read, forced by lack of access) — it's **"every channel exists, most are dormant, and the ones with real numbers disagree with each other and with the strategy."** That is a more specific and more fixable problem.

**Top 5 fixes by trust-value-per-effort, updated with real numbers:**

1. **Fix the broken Facebook URL in `app/layout.tsx` and `app/scan-me/page.tsx`.** Real bug, found live, one-line change, zero judgment calls needed once confirmed.
2. **Publish LinkedIn's first post.** The page is correctly described and has 77 followers already; it has simply never been used. Drafts exist in `LINKEDIN_PLAN.md`.
3. **Rewrite the Instagram bio.** Same finding as v1, now confirmed against the live, exact bio text and tied to a real, currently-shrinking follower base.
4. **Fix GBP's business hours** ("Opens 12 am Thu" is very likely wrong) and pull the full service-area list — cheap, and this is the highest-trust asset in the whole presence.
5. **Label the 20 unlabelled stories**, or begin Voice of Himalaya outreach to the founder's own 29 real GBP reviewers, who have already consented to being public reviewers of the real business.

Everything else — the GBP category question, the SafarCabby listing, the five-way identity split — is a founder decision, not an effort problem.

---

## 12. What's still needed from the founder

Most of v1's list is now answered by this pass. What remains:

1. **The GBP positioning decision** (§7): keep "Tour operator," reframe alongside the library, or something else — this audit deliberately does not recommend a category change on its own.
2. **The five-way identity split decision** (§1.1): which self-description is canonical, and how the real trekking history (GBP reviews, LinkedIn job post) is meant to coexist with the library-first strategy going forward.
3. **SafarCabby ownership** — founder-created, third-party-created, or scraped — and, if kept, a re-check of the exact phone number on file there.
4. **Full GBP service-area list** (currently "Mandi, Chamba + 5 other areas" — the other 5 need pulling from Business Profile Manager).
5. **YouTube Studio internals** (traffic sources, audience retention) if a deeper YouTube read is wanted — the public channel page was sufficient for this audit's purposes.
