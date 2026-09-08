# Pahari Yatri — Final SEO + AI Visibility + Performance + Indexing QA

Date: 2026-09-05 · Scope: `pahariyatri.com` only. `app.pahariyatri.com`/Local Connect not touched.

This supersedes the previous version of this file. Status legend: **PASS** · **FAIL** · **NEEDS ACTION** · **WAITING FOR GOOGLE** · **OPTIONAL** · **NOT APPLICABLE**

---

## Phase 1 — Production state (established before any change)

| | |
|---|---|
| Local HEAD (session start) | `3efdd12` |
| `origin/main` | `3efdd12` — identical, 0 ahead/behind |
| Live production (Vercel, `pahariyatri.com` alias) | `3efdd12` — identical |

**All three were in sync at the start of this session.** Every fix from the prior two sessions was confirmed already live, not just committed. Nothing was "fixed but not deployed."

This session added two new commits, both built, tested, and deployed before being reported as done:
- `2a39641` — `fetchPriority="high"` on the hero LCP image (Phase 4)
- `b8a0fff` — IndexNow key file + submission script (Phase 7)

Both are confirmed live on `pahariyatri.com` as of this report (see Phase 4 and Phase 7).

---

## A. Technical SEO

No new technical SEO bugs were found this pass — the prior two sessions' fixes were re-verified live, not re-litigated from scratch.

| Item | Status | Evidence |
|---|---|---|
| robots.txt | PASS | Unchanged, correct AI-crawler allow rules |
| sitemap.xml | PASS | 87 URLs, matches GSC's submitted count |
| Sitemap URLs return 200 | PASS | Re-crawled sample, all 200 |
| Canonical URLs | PASS | Homepage self-canonical fix (prior session) still correct live |
| www → apex redirect | PASS | 308, confirmed live |
| HTTP → HTTPS | PASS | |
| 404 status codes | PASS | Real 404s, confirmed |
| Soft 404s | PASS | None found |
| Redirect chains | PASS | Single-hop redirects only |
| Metadata / title / description uniqueness | PASS | |
| OpenGraph | PASS | |
| Twitter/X cards | PASS | |
| Favicon | PASS | Broken `mask-icon` reference removed (prior session) |
| hreflang | NOT APPLICABLE | Single-locale site, correctly no hreflang tags |
| Structured data (Organization, JSON-LD) | PASS | Google Rich Results Test (prior session): 2 valid items, 0 errors |
| Breadcrumbs | PASS | GSC: 18 valid, 0 invalid |
| Duplicate schema | PASS | None found |
| Image alt text | PASS | |
| Server-rendered HTML | PASS | |
| Heading hierarchy | PASS | 1 H1/page across sample |
| Internal linking / orphan pages | PASS | `/chapters` orphan fixed prior session |
| Broken internal links | PASS | None found in this pass's crawl |
| Index/noindex, robots directives | PASS | |

---

## B. Google Indexing

**Unchanged since the last audit — GSC's own data is 6 hours stale as of this check, and no code change in this pass affects indexing signals beyond what was already fixed and is now waiting on Google.**

| Item | Status | Detail |
|---|---|---|
| Property ownership | PASS | 2 verified Owners (`pankajkumar.techie@gmail.com`, `pahariyatri@gmail.com`) |
| Sitemap status | PASS | Submitted, last read Aug 31 2026, "Success", 86 pages discovered |
| Indexed pages | PASS (33) | Includes the two ranking assets (`jalori-small-circle`, `churdhar-bell-echo`) |
| Not-indexed pages | WAITING FOR GOOGLE (94) | See exclusion-reason breakdown below |
| Discovered — not indexed (63) | E. waiting for recrawl | Root cause (200-on-404) fixed two sessions ago; recrawl hasn't happened yet |
| Crawled — not indexed (10) | E. waiting for recrawl | Same root cause |
| Page with redirect (8) | C. intentional exclusion | Working as intended |
| Excluded by noindex (6) | D. historical Google data | All 6 are dead legacy URLs (`/home`, `/blog/...`, `/chapters/undefined`) from a pre-restructure site version — confirmed 404 now, nothing to fix |
| Duplicate, different canonical (4) | Mixed: 1× A (technical, fixed), 3× D (historical) | The `/index` entry was the real canonical bug (fixed, reindex requested last session); the other 3 are residual www-split noise |
| URL Inspection on important URLs | PASS | Homepage live-tested this session's prior pass; not re-requested here since nothing new changed on it |

**No indexing was requested for every URL.** Only the homepage was inspected/reindex-requested (last session), consistent with the instruction to prioritize.

---

## C. Performance (mandatory — real numbers obtained this pass)

**Real Lighthouse audits were obtained this session** via local Lighthouse CLI + headless Chrome directly against production, bypassing the PageSpeed Insights API entirely (its public quota has been exhausted across all three sessions). This is the breakthrough the prior two audits couldn't achieve.

### Homepage — Mobile (before → after the fetchPriority fix)

| Metric | Before | After (devtools throttling, real conditions) |
|---|---|---|
| Performance score | 75 | 70–83 across 3 runs |
| LCP | 3.7s | 2.0–3.1s (median ~3.0s) |
| CLS | 0 | 0 |
| TBT | 340ms | ~340ms (unchanged, as expected — this fix targets LCP, not TBT) |
| FCP | 1.7s | 1.7s |
| `fetchpriority=high` applied to LCP image | **No** (confirmed via Lighthouse's own checklist) | **Yes** |
| LCP "resource load delay" | 1,661ms | 46–48ms (consistent across 5 repeat measurements) |

**Root cause identified**: the hero background image (`<img alt="Himalayan peaks">`, the confirmed LCP element) had Next.js's `priority` prop set, which produced a `<link rel="preload">` in `<head>` but — on this Next.js 16.1.1/Turbopack build — did **not** propagate `fetchpriority="high"` onto the actual `<img>` element. Lighthouse's LCP-discovery checklist flagged this explicitly (`priorityHinted: false`), and it accounted for the single largest chunk (1,661ms of 3,700ms) of the measured LCP.

**Fix**: added `fetchPriority="high"` explicitly to the `<Image>` component in `components/HeroBanner.tsx` (one line). Verified the attribute now renders on both a local production build and live production.

**Methodology note worth recording**: `--throttling-method=simulate` (Lighthouse's mathematical network model) produced wildly inconsistent LCP numbers after this fix (9.5s, 9.2s, 3.3s, 9.1s, 8.5s across 5 runs) — investigated and traced to a simulation artifact in how Lantern models priority-boosted requests, **not** a real regression: the LCP breakdown table's four phases summed to only ~2.5s while the top-line simulated LCP claimed 9s. Switching to `--throttling-method=devtools` (actual, not modeled, network/CPU throttling) produced stable, consistent results (2.0–3.1s across 3 runs) that make physical sense given the phase breakdown. **Recommendation for future audits on this site: prefer `devtools` throttling over `simulate` — this site's specific script/priority mix appears to trigger a known Lantern edge case.**

### Homepage — Desktop

| Metric | Value |
|---|---|
| Performance score | 77–78 |
| LCP | 2.3–2.7s |
| CLS | 0 |
| TBT | 20–30ms |
| Total transfer | **9,737–9,749 KiB** |

The large desktop transfer is the autoplay hero video (`banners/media.mp4`, ~8 MB). This is **not flagged as a bug** — the code already defers the video's `src` assignment via `requestAnimationFrame` until after first paint specifically to avoid blocking LCP (confirmed in `HeroBanner.tsx`), and the measured desktop TBT (20–30ms) and LCP (2.3–2.7s) show this deferral works. It's a genuine bandwidth-cost trade-off for visual impact, not a rendering-path problem. **Flagged as a P2 recommendation** (consider a compressed/lower-bitrate variant) rather than changed, since altering a marketing video's encoding is a content-quality judgment call outside "smallest safe fix."

### Hub page (`/temples`, mobile)

| Metric | Value |
|---|---|
| Performance | 74–86 | LCP | 3.0–3.1s | CLS | 0 | TBT | 340–540ms | Total transfer | 928 KiB |

### Chapter page (`baga-sarahan-bashleo-pass`, mobile)

| Metric | Value |
|---|---|
| Performance | 70–80 | LCP | 3.1–3.3s | CLS | 0 | TBT | 470–730ms | Total transfer | 947–954 KiB |

### Story page (`jalori-small-circle`, mobile)

| Metric | Value |
|---|---|
| Performance | 78–83 | LCP | 2.3–3.6s | CLS | 0.001 | TBT | 420–490ms | Total transfer | 945–951 KiB |

**Finding, not fixed this pass**: TBT on hub/chapter/story pages runs 340–730ms — higher than ideal, and unrelated to the LCP fix (these pages don't use `HeroBanner`). Root cause is consistent with prior sessions' finding that ~91% of "unused JavaScript" on this site comes from required third-party scripts (GTM, gtag, Meta Pixel), not app code. **Not touched this pass** — per instruction, working analytics infrastructure isn't modified without a specific, approved reason, and reducing TBT here would mean deferring/delaying tracking scripts, a trade-off that needs an explicit decision, not a unilateral "smallest safe fix."

All 4 pages: **SEO 100, Accessibility 90 (85 desktop), Best Practices 77** — unchanged across before/after, confirming the LCP fix didn't regress anything else.

---

## D. Mobile Performance / Mobile QA

| Item | Status | Evidence |
|---|---|---|
| Viewport meta configured correctly | PASS | Lighthouse `meta-viewport`/`viewport-insight`: score 1 (pass) on all 4 tested pages |
| Touch target size/spacing | PASS | Lighthouse `target-size`: score 1 (pass) on all 4 tested pages |
| CLS / layout jumps | PASS | 0–0.001 across all 4 pages — no visible layout shift |
| Horizontal overflow | PASS | `document.documentElement.scrollWidth === clientWidth` (no overflow), checked live via JS |
| Manual device-emulated visual QA (screenshots at real mobile dimensions) | **NEEDS ACTION (tooling limitation)** | The browser automation's `resize_window` tool did not reliably resize the actual rendering viewport in this environment (confirmed via `window.innerWidth` staying at desktop size after resize calls) — this is the same limitation noted in the prior audit. Lighthouse's own mobile device emulation (a real, independent emulation path, not this tool) was used instead for the checks above, which is a legitimate substitute for automated checks, but a literal side-by-side mobile screenshot comparison wasn't obtained this pass either. |

**Not claimed**: "mobile UX manually verified pixel-by-pixel." What's actually verified: the automated, real-device-emulation checks that matter most (viewport config, tap targets, layout stability) all pass.

---

## E. GA4 / GTM / Analytics

**Unchanged from the prior session's live verification — no code affecting analytics changed in this pass, so this was not blindly re-verified from scratch; only spot-checked for continuity.**

| Item | Status |
|---|---|
| Correct GA4 property (`pahariyatri.com`, Measurement ID `G-VLHVCQKQM0`) | PASS (verified prior session) |
| Correct GTM container (`GTM-N953C62X`) | PASS (verified prior session) |
| page_view (single source, no duplicates) | PASS — one "All Pages" Google Tag, custom-event tag fires separately |
| Meta Pixel wired to real events | PASS (channel join, apply_submit) |
| Stray unused GA4 property (`G-P6B1L1JFH9`) | NEEDS ACTION — still awaiting your confirmation on whether to archive it; not touched |

---

## F. Search Console

Same GSC account/property access confirmed working this session (used for URL Inspection re-checks and performance data pull in Phase 9). No new Search Console findings beyond what's in Section B.

---

## G. Bing / IndexNow

| Item | Status | Detail |
|---|---|---|
| IndexNow key file | **PASS — done this session** | `public/6f9ae0f91e3ef7e65a5d9fa4559cf0c1.txt`, deployed, confirmed live (200) |
| IndexNow submission script | **PASS — done this session** | `scripts/submit-indexnow.mjs`, reads the real sitemap, `npm run submit-indexnow` |
| IndexNow actual submission | **PASS — done this session** | Submitted all 87 sitemap URLs to `api.indexnow.org`: **202 Accepted** |
| Bing Webmaster Tools dashboard | **NEEDS ACTION — permission boundary, unchanged** | See below |

```
SERVICE: Bing Webmaster Tools
ACCOUNT: A Microsoft account with ownership rights over pahariyatri.com
CURRENT ACCESS: None — checked live again this session, still lands on Bing's public signup page with no Microsoft account signed in
REQUIRED ACCESS: Site added and verified in Bing Webmaster Tools (DNS TXT record or HTML file, same pattern as GSC)
WHY IT IS REQUIRED: To see Bing's own indexing/coverage reports and Bing-specific SEO tools — IndexNow (done above) gets URLs submitted for crawling, but doesn't give visibility into Bing's indexing status
EXACT ACTION REQUIRED FROM FOUNDER: Sign in with (or create) the Microsoft account tied to the business at bing.com/webmasters, add pahariyatri.com, verify ownership — then this session (or a future one) can pick up from there
```

---

## H. AI SEO

Unchanged from the prior session's live verification (robots.txt AI-crawler rules, `llms.txt`, `llms-full.txt`) — not re-tested from scratch since no code affecting these changed this pass. Spot-checked and still correct.

| Item | Status |
|---|---|
| GPTBot, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended accessibility | PASS (verified live, prior session) |
| robots.txt AI crawler rules | PASS |
| llms.txt / llms-full.txt | PASS |
| Server-rendered content | PASS |
| Structured data | PASS |

## I. AI Visibility (content/entity signals — unchanged, carried forward)

| Category | Status | Note |
|---|---|---|
| AI TECHNICAL | PASS | Crawlability, rendering, structured data all correct |
| AI ENTITY | NEEDS ACTION | WikiData mapping incomplete for several destinations/chapters (pre-existing, content task) |
| AI CONTENT | PARTIAL | Several destinations remain thin (pre-existing, tracked in `PAHARI_YATRI_SEO_MASTER_AUDIT.md`) |
| AI AUTHORITY | NEEDS ACTION | Content attributed to the Organization, not a named author — weakens E-E-A-T/citation signal |

No fake authority, reviews, geographic claims, or doorway pages were created or recommended, per instruction.

---

## J. Organic Ranking Opportunities (Phase 9)

Pulled fresh from GSC Performance (3-month window; last GSC update was 6 hours before this check, so this predates today's fixes/IndexNow submission):

- **Total**: 24 clicks, 1.11K impressions, 2.2% CTR, average position 17
- **Top queries**: mostly brand terms (`pahari`, `pahari path`, `yatri way`, `पहारी`/Hindi transliterations)
- **Genuine non-brand opportunity, unchanged from the master audit**: `mural danda trek` — 14 impressions, 0 clicks, previously identified at ~position 10.6. This is the clearest "Google already understands the page, ranking is close to page 1" opportunity on the site.
- `jamadagni rishi temple` — 6 impressions, a real temple-name query with content relevance (matches the `/temples` opportunity already flagged in the master audit: ~60 temple-name searches, page currently ranking poorly at ~54.7).

**Priority list** (unchanged from the master audit's own conclusion, re-confirmed still valid):

| Tier | Item |
|---|---|
| QUICK WINS | Tighten `mural danda trek` chapter metadata/targeting; expand `/temples` with verified content for the ~60 already-searched temple names (gated on `local-verification-editor`) |
| CONTENT EXPANSION | Thin destinations already identified in the master audit — not re-litigated here |
| INTERNAL LINKING | Already addressed (orphan `/chapters` fixed) |
| AUTHORITY | Named authorship (see Section I) |
| LONG-TERM | WikiData entity mapping completion |

No new keyword targets were invented; this list only surfaces where Google already shows demand.

---

## K. Permissions Required

Only one boundary was hit this session (same as before):

```
SERVICE: Bing Webmaster Tools
ACCOUNT: Microsoft account
CURRENT ACCESS: None
REQUIRED ACCESS: Site verification
ACTION NEEDED: See Section G
```

GSC, GA4, GTM, and IndexNow all worked within existing access — no other boundary was crossed or needed.

---

## L. Changes Made (this session)

| Change | Commit | Verified |
|---|---|---|
| `fetchPriority="high"` on hero LCP image | `2a39641` | typecheck ✓, eslint ✓, local build ✓, local Lighthouse re-test ✓, deployed ✓, live attribute confirmed ✓, live Lighthouse re-test ✓ (5 runs, devtools + simulate throttling) |
| IndexNow key file + submission script + `npm run submit-indexnow` | `b8a0fff` | typecheck ✓, eslint ✓, build ✓, deployed ✓, key file live (200) ✓, submission executed: **202 Accepted, 87 URLs** |

Both changes are live in production as of this report.

## M. Changes NOT Made (and why)

- **8MB hero video (desktop)**: already deferred correctly post-first-paint; re-encoding is a content-quality trade-off, not a code bug — flagged as P2, not touched.
- **Third-party script TBT (340–730ms on hub/chapter/story pages)**: real, but reducing it means deferring/delaying GTM/GA4/Meta Pixel, which needs an explicit decision, not a unilateral change to working tracking infrastructure.
- **Stray GA4 property (`G-P6B1L1JFH9`)**: visible, not deleted — awaiting your explicit confirmation.
- **Bing Webmaster Tools account setup**: requires your Microsoft account login — stopped at that boundary, did not attempt to bypass.
- **Any of the 63+10 "not indexed" GSC pages**: these are waiting on Google's own recrawl schedule following an already-shipped fix — nothing left to change in code.

## N. Waiting for Google

- 63 "Discovered — currently not indexed" + 10 "Crawled — currently not indexed" pages: root cause (200-on-404) fixed two sessions ago, recrawl pending.
- Homepage's corrected canonical: reindex requested last session, not yet reflected in GSC's own "Google-selected canonical" (which only updates after indexing, not on request).
- Core Web Vitals field data (CrUX): still "No data" in GSC — traffic volume too low, will populate over time regardless of anything fixed.
- IndexNow submission (this session): submitted, not yet reflected in any visible index — no dashboard to check without Bing Webmaster Tools access (Section G).

---

## Recommended Next 30 Days

1. **Sign in to Bing Webmaster Tools with a Microsoft account and verify pahariyatri.com** (~15 min) — unlocks Bing-side indexing visibility on top of the IndexNow submission already sent.
2. **Decide on the stray GA4 property** (`G-P6B1L1JFH9`) — confirm unused, then archive it.
3. **Monitor GSC's "Discovered/Crawled — not indexed" buckets over the next 2–4 weeks** — should visibly shrink now that the 200-on-404 and canonical bugs are both fixed and IndexNow has been pinged; if they don't move, that's worth a fresh look.
4. **Tighten `mural danda trek` chapter targeting** — the single clearest "already close to page 1" ranking opportunity on the site.
5. **Add named authorship to chapters/stories** — strengthens both traditional and AI-search citation signals; currently everything is attributed to the Organization only.

---

## Final Status Summary

**FINAL SEO STATUS:** PASS — all previously-identified technical SEO issues remain fixed and live; no new bugs found this pass.

**FINAL PERFORMANCE STATUS:** NEEDS ACTION → IMPROVED — real Lighthouse numbers obtained for the first time across all three audit sessions; one genuine LCP bug found and fixed (hero image `fetchpriority`); remaining TBT on content pages is a known, unfixed trade-off tied to required third-party scripts, not a bug.

**FINAL INDEXING STATUS:** WAITING FOR GOOGLE — technically correct; Google has not yet recrawled/reprocessed the fixes from two sessions ago. IndexNow submission sent this session as an additional discovery signal (not a Google-indexing shortcut).

**FINAL AI SEO STATUS:** PASS (technical) / NEEDS ACTION (entity/authority) — crawlers, structured data, and llms.txt are all correct; named authorship and WikiData completeness remain open, pre-existing content-strategy items.

**FINAL ANALYTICS STATUS:** PASS — GA4/GTM/Meta Pixel confirmed correctly wired with no duplicate tracking; one unused stray property awaiting a founder decision.

---

## Next 5 Actions

1. Sign in to Bing Webmaster Tools and verify the site (founder action, ~15 min).
2. Confirm/archive the stray GA4 property `G-P6B1L1JFH9`.
3. Watch GSC's indexing coverage over the next 2–4 weeks — no action unless it fails to improve.
4. Tighten metadata/targeting on the `mural danda trek` chapter (quick win, already-close-to-page-1 query).
5. Plan named authorship for chapters/stories (AI + traditional search authority signal).
