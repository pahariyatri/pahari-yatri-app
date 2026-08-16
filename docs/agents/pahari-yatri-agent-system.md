# Pahari Yatri Agent System

A production workflow for growing Pahari Yatri without breaking it.

Ten specialist agents, five repeatable loops, and one rule: **never surprise the founder.**

---

## Why this exists

Pahari Yatri is a Himalayan story library, not a tour package company. The risks that matter here are not the usual ones:

- Publishing an invented cultural claim that the people described will read.
- Quietly becoming a generic travel blog through a hundred small copy decisions.
- Breaking live campaign attribution with an innocent-looking rename.
- Shipping content that Google cannot see, and not noticing for months.

Each agent below is shaped around one of those risks.

---

## The agents

Location: `.claude/agents/`

| Agent | Owns | Model |
|---|---|---|
| `growth-orchestrator` | Coordination, roadmap, approval gates | opus |
| `content-architect` | Book → Chapter → Story structure, fields, redirects | opus |
| `seo-research-strategist` | Keywords, SERP, clusters, internal linking | opus |
| `chapter-editor` | Writing and upgrading chapters | opus |
| `local-verification-editor` | Cultural accuracy — **blocking gate** | opus |
| `instagram-shorts-strategist` | Reels, Shorts, carousels, UTM campaigns | opus |
| `linkedin-brand-strategist` | Founder posts, partners, credibility | sonnet |
| `nextjs-production-engineer` | Implementing approved code changes | opus |
| `analytics-tracking-agent` | GA4 / GTM / Meta / Vercel measurement | opus |
| `qa-security-reviewer` | Final gate before any push — **blocking** | opus |

Two of these are **gates, not advisors**. `local-verification-editor` must clear any cultural claim before it is written as fact. `qa-security-reviewer` must pass before anything is pushed. Neither can be skipped to hit a deadline.

---

## The loops

Location: `.claude/commands/` — invoke with `/loop-name`.

### `/growth-loop`
The general-purpose loop. The orchestrator inspects, decides which specialists are needed, runs them, and QA gates the result. Start here when you are not sure which loop you want.

### `/content-architecture-loop`
Book → Chapter → Story structure work. **Audit-only unless you have approved a plan in that session.** Produces the content map, what moves where, redirects required, and fields needed.

### `/chapter-upgrade-loop [chapter]`
Upgrades one chapter to 1,500–2,000 words. One chapter per run, never batched. Runs SEO → verification → writing → Reel pack → QA. Defaults to Kamrunag if you don't name one.

### `/reel-to-chapter-loop [idea]`
Turns a Reel idea into a tracked campaign pointing at a chapter. Checks the destination chapter can carry the traffic before you send it there.

### `/weekly-growth-review`
Read-only. What worked, what didn't, next four Reels, next chapter, next SEO action. Run it the same day each week.

---

## The golden rule

Every loop follows this order. No exceptions.

```
1. Inspect    — read the repo and real data
2. Report     — what is actually true now
3. Plan       — the minimal safe change
4. Approve    — mandatory if destructive, public-facing, or large
5. Implement  — smallest change that works
6. Test       — typecheck, build, routes
7. QA         — qa-security-reviewer
8. Document   — what changed, how to roll back
9. Recommend  — next loop
```

**Stop at step 4** if the plan touches more than ~10 files or any live URL.

---

## Approval gates

| Situation | Gate |
|---|---|
| Any cultural / devta / mythology claim | `local-verification-editor` must label it before it is written as fact |
| Any push to `main` | `qa-security-reviewer` must pass |
| Deleting content | **Founder only.** Agents never delete |
| Renaming a live campaign URL | **Founder only.** Breaks UTM attribution silently |
| Publishing to Instagram / LinkedIn / anywhere | **Founder only.** Agents prepare drafts |
| Ads, boosts, billing, permissions | **Never.** Not even with approval |
| Login, OTP, passkey, payment screens | Stop and hand to the founder |

---

## What not to touch

**Live campaign URLs.** `parashar-lake-trek` and `kamrunag-the-lake-of-oaths` have published UTM links pointing at them. A rename breaks attribution with no error message.

**The analytics entry point.** Every event goes through `lib/analytics.ts` → `window.dataLayer`. Nothing calls `gtag()` or `fbq()` directly — GA4 and the Meta Pixel live inside GTM `GTM-N953C62X`, and a direct call double-fires. If `NEXT_PUBLIC_GA_ID` ever reappears alongside GTM, that is a double-count.

**The visual identity.** Composition changes are fine — reordering sections, a new card reusing existing type and colour. New visual languages are not. The design is not the problem.

**Content, ever.** Nothing is deleted. Reclassify, redirect, mark legacy. The ten poetic chapters are not bad writing; they are well-written material on the wrong shelf.

---

## Traps that have already cost time

**Directory-format content is invisible.** Flat files work (`data/places/chintpurni.yaml`). Directory entries (`{slug}/index.yaml`) have rendered as soft-404s and vanished from the sitemap — 16 pages were affected. A clean build proves nothing. Always verify: file → `.all()` → sitemap → rendered `<title>`.

**Brave blocks GTM.** `navigator.brave.isBrave()` returns true and the `gtm.js` fetch fails while curl gets the full container. Events push to the dataLayer but never reach GA4 or Meta. **Verify analytics in Chrome.** Vercel Analytics still works in Brave because it is first-party — that asymmetry is the tell.

**Dashboards lie about recency.** GA4 standard reports lag 24–48h and Home may still say "No data received" while Realtime is live. Meta's chart date range often excludes today. Use GA4 Realtime and Meta's `last received` row.

**`permanent: true` emits 308, not 301.** Use `statusCode: 301` when 301 is specified.

**Testing `apply_submit` posts to real Discord.** Stub `/api/discord` in the browser before completing the form. The stub is in `analytics-tracking-agent`.

---

## Banned and preferred language

**Banned everywhere — site, Reels, LinkedIn:**
hidden gem · must visit · best places to visit · cheap trip · limited seats · package · explore the unexplored · untouched paradise · secret trail · book now

**Banned cultural framings:**
guaranteed wish · mysterious treasure · hidden secret · nobody ever · most powerful · any miracle claim without a named source

**Preferred:**
local truth · sacred not scenic · Yatri, not tourist · understand before you visit · travel slower · respect the place · local belief ke according · Mandi mein maana jaata hai

---

## Hooks

`.claude/settings.local.example.json` contains four optional hooks, **none active by default**: typecheck after edit, secret scan before commit, sitemap reminder after content change, and a direct-`gtag`/`fbq` guard.

Copy the blocks you want into `.claude/settings.local.json`. The secret scan is the one worth enabling first — it deliberately does not match public IDs (`GTM-`, `G-`, Meta Pixel, `facebook-domain-verification`), which belong in code.

Do not add hooks that auto-commit, auto-push, delete files, post to social channels, or run a full build on every edit.

---

## Running your first loop

```
Use growth-orchestrator. Run the content-architecture-loop in audit-only mode.
Do not edit product code. Return the implementation plan for Loop 1.
```

That produces the schema plan, the files that would change, the migration risk, and the decisions waiting on you — with nothing modified.

---

## The eight roadmap loops

| Loop | Goal | Status |
|---|---|---|
| 1 | Architecture foundation — 7 books, author fields, chapter SEO fields | Plan first |
| 2 | Fix invisible / soft-404 content | Ready after Loop 1 |
| 3 | Reclassify poetic chapters, rehome orphaned stories | Needs founder answers |
| 4 | First SEO upgrades — Kamrunag first | After Loops 1–2 |
| 5 | Instagram / Reels growth engine | Campaign 1 live |
| 6 | Homepage mobile circuit | After author fields exist |
| 7 | LinkedIn credibility | Anytime, drafts only |
| 8 | Analytics learning system | Weekly, ongoing |

Loop 6 depends on Loop 1 — the mobile circuit shows story author names, which do not exist in the schema yet.

---

## Production standards

Before any push: typecheck passes · build passes · sitemap verified · redirects verified · no secrets committed · no package-style claims on public pages · no unverified cultural claim stated as fact · no broken links · no accidental redesign · analytics events still fire · rollback note written.
