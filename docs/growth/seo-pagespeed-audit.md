# SEO + PageSpeed Audit — Pahari Yatri

**Date:** 2026-09-09
**Run by:** Lighthouse 13.4.1, against the live production homepage and a local production build of the pages shipped today.
**Status:** Audit only. Nothing here was fixed as part of this pass — this documents what's real, so the next fix is picked deliberately instead of guessed at.

---

## 0. What just shipped, and what that does and doesn't mean here

Four commits went to `origin/beta` today (Facebook link + banned-language + entity-schema fixes, the new `/start` page, the Kamrunag chapter upgrade, and the growth-sprint docs). **This repo has no deploy automation** (confirmed earlier this session — `.github/workflows/ci.yml` only lints/typechecks/build-tests) and `beta` is not `main`. So: **the live site audited below has not received today's fixes yet.** The Lighthouse run against `https://pahariyatri.com` caught this directly — its accessibility scan still flags `<a href="https://www.facebook.com/pahariyatri">`, the dead URL fixed in today's first commit. That's expected, not a failure of the fix.

---

## 1. Live production homepage — the real, current baseline

`https://pahariyatri.com/`, Lighthouse 13.4.1, mobile defaults, 2026-09-09:

| Category | Score |
|---|---|
| Performance | **75** |
| Accessibility | **90** |
| Best Practices | **77** |
| SEO | **100** |

**Core metrics:** LCP 3.7s · TBT 480ms · Speed Index 4.1s · TTI 9.4s · CLS 0.

SEO is already perfect — worth stating plainly, since the rest of this document is about the two categories that aren't. CLS at 0 is genuinely good and worth protecting in anything shipped next.

### 1.1 The dominant cost is third-party script weight, not the app's own code

Lighthouse's `unused-javascript` audit: **299 KiB of unused JS**, broken down:

| Script | Total transferred | Wasted (unused) |
|---|---|---|
| `googletagmanager.com/gtag/js` (GA4) | 190 KB | 81 KB |
| `googletagmanager.com/gtm.js` (GTM container) | 127 KB | 68 KB |
| `connect.facebook.net/.../fbevents.js` (Meta Pixel) | 110 KB | 39 KB |
| One own chunk (`bd9c4e55995e2277.js`) | 46 KB | **46 KB — almost entirely unused** |

`mainthread-work-breakdown` is 3.1s; `bootup-time` 1.4s. Between GA4, GTM's own loader, and the Meta Pixel, **roughly 190 KB of wasted JS execution is analytics tooling, not product code.** This is the single biggest lever available: auditing what's actually configured inside the GTM container (GA4 + Meta Pixel are both loaded there — `components/GoogleTagManager.tsx`'s own comment confirms this) and trimming or deferring what isn't earning its weight would move Performance more than any code change in today's commits.

**One own-code item worth a look:** that 46 KB chunk that's almost 100% unused wasn't identified further in this pass (no source map inspection done) — flagging it for whoever picks this up next, since a chunk that's essentially dead weight is usually a quick win once found.

### 1.2 Accessibility and Best Practices — concrete, fixable items

- **`link-name` (score 0):** the header's social icons (`facebook.com/pahariyatri` among them — the dead link) are icon-only `<a>` tags with no accessible name. Needs `aria-label` on each, independent of the URL fix already shipped.
- **`color-contrast` (score 0):** three elements, including a button and the `text-[10px] uppercase ... text-primary/60` label style used site-wide (appears twice in this one scan) — that utility class combination is under the contrast threshold everywhere it's used, not just once.
- **`heading-order` (score 0):** one instance of a heading level skipping order.
- **`third-party-cookies` (score 0):** direct consequence of §1.1 — GA4/GTM/Meta Pixel set cookies Lighthouse flags as a Best Practices issue by default. Not independently actionable without revisiting §1.1.
- **`label-content-name-mismatch`, `inspector-issues`:** both scored 0, not drilled into further this pass.

---

## 2. Local production build — what's actually shippable, with an honest caveat

Same Lighthouse run, `npm run start` locally, against `/start` (new) and the upgraded `/chapters/kamrunag-the-lake-of-oaths`:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/start` | 88 | 90 | 96 | 100 |
| `/chapters/kamrunag-the-lake-of-oaths` | 90 | 90 | 96 | 100 |

**Before reading these as "today's fixes improved performance" — they mostly didn't, and here's why, checked directly rather than assumed:** `components/GoogleTagManager.tsx`'s own code comment says it plainly — *"`NEXT_PUBLIC_GTM_ID` is set on Vercel for Production only, so preview and local builds render nothing."* A local `npm run start` never loads GTM, GA4, or the Meta Pixel at all. The ~13-15 point Performance gap and the 440ms TBT gap between the live site and these local pages is **overwhelmingly the absence of §1.1's ~300 KB of third-party script**, not a property of `/start` or the Kamrunag chapter specifically. Comparing a third-party-free local build to a third-party-loaded live site is not apples to apples, and this report isn't going to claim otherwise.

**What these numbers do honestly show:** the app's own code, isolated from third-party weight, performs solidly (88-96 across the board, SEO perfect on both). Accessibility holds at 90 on both new/changed pages too — meaning the `color-contrast`/`link-name` issues in §1.2 are pre-existing, site-wide, not something introduced today, and not something today's pages fixed either.

---

## 3. What this means, put together

1. **The single highest-leverage performance fix available isn't in this repo's code at all — it's in what's configured inside the GTM container.** GA4 + Meta Pixel together account for roughly 190 KB of wasted JS execution on every page load. That's a GTM/analytics-configuration review, not an engineering sprint.
2. **The accessibility and Best Practices issues are real, pre-existing, and site-wide** (icon links with no accessible name, a low-contrast label utility class used everywhere, one heading-order slip) — none of them were introduced or fixed by today's work, and none of them are hard: `aria-label` on icon links and a contrast tweak on one utility class would likely move both scores meaningfully.
3. **SEO is already a 100 on the live site as measured by Lighthouse** — Lighthouse's SEO category checks crawlability/meta basics, not rankings or indexing depth. This is a different, narrower claim than "the site ranks well" — the real indexing problem (90 of 127 pages not indexed, documented in `marketing/SOCIAL_MEDIA_AUDIT.md` and `docs/growth/chapter-upgrade-queue.md`) is a content-depth and internal-linking problem Lighthouse's SEO check doesn't and can't see.
4. **None of today's shipped fixes are live yet.** Once `beta` is merged/deployed, re-run this same Lighthouse pass against production to get a real before/after — the comparison in §2 is a preview of code quality, not a verified production result.

## 4. What "a few days" realistically looks like

Nothing here compounds automatically. Concretely, over the next few days:

- **Immediate, no judgment call needed:** deploy `beta` (or merge to `main` per this repo's normal flow) so today's fixes — the dead link, the entity/schema alignment, the Kamrunag upgrade, `/start` — actually reach real visitors and Google. Until that happens, this whole session's work sits in git, not in front of anyone.
- **Cheap, real performance win:** review what's firing inside the GTM container and defer or drop what isn't load-bearing. Re-run Lighthouse against production after deploy to see the real, current baseline — not the local approximation in §2.
- **Cheap, real accessibility win:** `aria-label` on icon-only social links, fix the low-contrast label class, fix the one heading-order slip.
- **Slower, the actual constraint:** the 90-of-127-unindexed problem is a content and internal-linking issue, not a PageSpeed one — that's `docs/growth/chapter-upgrade-queue.md`'s job, one chapter at a time, not something a "few days" changes on its own. Traffic in a few days will look close to `marketing/SOCIAL_MEDIA_AUDIT.md`'s current baseline (24 clicks / 1,160 impressions / 3 months) regardless of what ships this week — that number moves on the timescale of indexing and content depth, not days.
