# Claude Workspace Cleanup Plan

Date: 2026-09-08. **Audit only — nothing has been moved, archived, or deleted.** Every `.md` file in the repo (root, `docs/`, `.claude/`) was inventoried and classified below. Waiting on approval before touching anything.

---

## How to read this

- **KEEP** — permanent or current-cycle knowledge an agent needs.
- **ARCHIVE** — real historical value, superseded by newer work, not needed for daily operation. Proposed destination: `docs/archive/YYYY-MM/`, preserving the original filename so existing cross-references in commit history stay traceable.
- **REMOVE** — none found. See "On 'Remove'" below.

## On "Remove"

I looked for true duplicates or zero-value files and found **none**. Every candidate that looked redundant at first (multiple SEO audits, multiple status docs) turned out to be a different time-slice or a different scope (main site vs. portal), not a copy of the same content. Recommending deletion of a dated audit would destroy the "what did we know and when" record this project has otherwise been careful to preserve (see the Kamrunag research record's own citation-ledger discipline). If you specifically want old superseded audits gone rather than archived, tell me which ones and I'll delete them after this plan is approved — but my default recommendation is archive, not delete, for all of them.

---

## `.claude/` — already clean

21 agent files, 13 command files. I checked every agent definition against the roster in `docs/agents/pahari-yatri-agent-system.md` — all 21 are distinct, none are dead code, none duplicate another's scope closely enough to merge. **No changes recommended here.** One doc bug found in passing: `docs/agents/pahari-yatri-agent-system.md` line 5 still says "Ten specialist agents" — stale, there are 21. Small fix, bundled into Part 2 below.

`.claude/settings.local.example.json` and `.claude/settings.local.json` are a template + real local config pair, not a duplicate. Keep both.

---

## Root-level `.md` files

| File | Classification | Why |
|---|---|---|
| `CLAUDE.md` | **KEEP** | Governing instruction file. See Part 2 for a consolidation proposal. |
| `README.md` | **KEEP, but flag** | Currently reads as marketing copy for the repo itself ("THE HIMALAYAN REALITY HUB", "Authenticated Local Intelligence (HLI)", "AI-Optimized Knowledge Graph") rather than a technical README. Not a cleanup issue, but worth a rewrite pass to describe the actual stack/setup for a developer opening the repo cold. |
| `PAHARI_YATRI_CONTENT_AUTHORITY_REPORT.md` | **KEEP** | 2026-09-08. The current synthesis of the main-site audit. Most-current single source of truth for content/architecture status. |
| `SEO_CONTENT_AUDIT.md` | **KEEP** | 2026-09-08. Phase 1 evidence the Authority Report synthesizes. Still the underlying detail. |
| `CONTENT_PRIORITY_MATRIX.md` | **KEEP** | 2026-09-08. Companion to the above. |
| `BOOK_PROPOSALS.md` | **KEEP** | 2026-09-08. Live proposal, no book created yet — still an open decision. |
| `CONTENT_AUDIT.md` | **KEEP** | 2026-09-08. Parvati Valley cluster audit, feeds pending priority decisions. |
| `LIBRARY_SEO_AUDIT.md` | **KEEP** | 2026-09-08. Awaiting implementation approval. |
| `CHAPTER_TEMPLATE.md` | **KEEP** | 2026-09-08. Active reference — Kheerganga and Mural Danda Trek were both built against it this cycle. |
| `PAHARI_YATRI_FINAL_SEO_AUDIT.md` | **KEEP** | 2026-09-05. Still the only source for Lighthouse/Core Web Vitals and indexing-bucket data — not repeated in the Sept 8 report. Superseded only for the content/architecture claims the Sept 8 report re-verified. |
| `SEO_OPPORTUNITY_MAP.md` | **KEEP** | 2026-09-05. Query-level GSC detail referenced by the Master Audit and Priority Matrix. |
| `PAHARI_YATRI_SEO_MASTER_AUDIT.md` | **KEEP, with a note** | 2026-09-05. Covers *both* `pahariyatri.com` and the portal (`app.pahariyatri.com`). Its main-site sections are superseded by the Sept 8 Authority Report; its **portal** sections are not — the portal hasn't been re-audited since. Don't archive this until the portal gets its own current audit. |
| `PAHARI_YATRI_SEO_REFACTOR_REPORT.md` | **ARCHIVE** | 2026-09-02. A batch-by-batch implementation log (Batches 0-8) for work that's now shipped and re-verified by later audits. Historical record of what changed and when; not needed for current decisions. |
| `PERFORMANCE.md` | **ARCHIVE** | 2026-01-04. Predates the Next.js 16 migration and the brand-ecosystem-revamp. Should be spot-checked against the current build before anyone cites it as accurate — likely describes an earlier codebase state. |

## `docs/` (excluding `agents/` and `audit-evidence/`, handled separately)

| File | Classification | Why |
|---|---|---|
| `docs/agents/pahari-yatri-agent-system.md` | **KEEP** (fix the stale count) | Actively referenced by `CLAUDE.md`. |
| `docs/content-psychology-map.md` | **KEEP** | Actively cited by the Sept 8 Authority Report (`docs/content-psychology-map.md:16,48-53`) as evidence for the story-authorship finding. |
| `docs/growth/content-growth-system.md` | **KEEP** | Describes the current operating growth loop (Reels → chapters → WhatsApp/Yatri Circle); still the model in use. |
| `docs/growth/reel-to-chapter-workflow.md` | **KEEP** | Operational companion to the above; the `/reel-to-chapter-loop` command still implements it. |
| `docs/instagram-integration.md` | **KEEP** | Technical setup reference for a still-live feature (`/films` auto-pulls reels). |
| `docs/youtube-integration.md` | **KEEP** | Same, for YouTube. |
| `docs/chapter-content-pack.md` | **KEEP, verify currency** | Titles/reel-hooks/captions tied to the `narrative`/`closingQuote` fields still in use. Written 2026-07-06, before several chapters existed — worth a pass to confirm it still covers the current 25-chapter set before treating it as complete. |
| `docs/social-media-playbook.md` | **KEEP, review for overlap** | Tactical social guidance from 2026-07-06. `CLAUDE.md`'s Platform Marketing System (added later) now covers Instagram/LinkedIn/Reddit/Meta policy at a rules level. This playbook is more tactical/how-to. Likely complementary rather than duplicate, but worth one read-through to confirm they don't now contradict each other — this is the closest thing to a "duplicate strategy document" found in the audit. |
| `docs/content-model-migration-2026-08.md` | **ARCHIVE, with a flag** | Tracks "Loop 1 and 2 complete, Loop 3 prepared not executed" as of Aug 16. The Sept 8 Authority Report found new, more current architecture issues (the "Journeys (Legacy)" naming confusion, the alphabetical dual-book-membership bug) that this doc doesn't mention — meaning it's now incomplete as a status source. Before archiving, confirm whether "Loop 3" is still a live open task or was abandoned; if live, it should move into current planning instead. |
| `docs/brand-website-plan.md` | **ARCHIVE** | 2026-07-05. Pre-dates the brand-ecosystem-revamp it proposes; that work has since merged. Historical plan, largely executed. |
| `docs/pahari-yatri-status-and-roadmap.md` | **ARCHIVE** | 2026-07-05. Superseded by the much more current Sept 2026 audit chain. |
| `docs/SEO_STRATEGY_2026.md` | **ARCHIVE** | 2026-01-04. The oldest SEO doc in the repo; superseded by everything from the Sept 2026 audit cycle. |
| `docs/site-audit-2026-07.md` | **ARCHIVE** | 2026-07-05. Superseded by the Sept 2, 5, and 8 audits. |
| `docs/mobile-first-implementation.md` | **ARCHIVE** | Dated 2025-08-23 — over a year old, predates the Next.js 16 migration and the current component set. Almost certainly describes a codebase that no longer exists in this form. |

## `docs/audit-evidence/` — do not move

40+ files: research source dumps, HTTP/crawl/technical check logs, JSON results. This is raw supporting evidence for the Sept 7-8 audits, actively cited by relative path from **currently-KEEP documents** (`SEO_CONTENT_AUDIT.md`, `CONTENT_AUDIT.md`, `PAHARI_YATRI_CONTENT_AUTHORITY_REPORT.md` all reference `docs/audit-evidence/research-record.md` and siblings directly). **Recommend leaving this folder exactly where it is** — moving it would break every citation in the documents you're keeping. It's correctly described as "evidence," not "knowledge to read regularly," which is a different axis than KEEP/ARCHIVE; no action needed.

---

## Proposed structure after cleanup

```
/ (repo root)
  CLAUDE.md
  README.md
  docs/
    agents/                      (unchanged)
    audit-evidence/              (unchanged — do not move)
    growth/                      (unchanged)
    reports/
      current/                  <- BOOK_PROPOSALS.md, CONTENT_PRIORITY_MATRIX.md,
                                    SEO_CONTENT_AUDIT.md, CONTENT_AUDIT.md,
                                    LIBRARY_SEO_AUDIT.md, CHAPTER_TEMPLATE.md,
                                    PAHARI_YATRI_CONTENT_AUTHORITY_REPORT.md,
                                    PAHARI_YATRI_FINAL_SEO_AUDIT.md,
                                    SEO_OPPORTUNITY_MAP.md,
                                    PAHARI_YATRI_SEO_MASTER_AUDIT.md
      archive/2026-01/           <- SEO_STRATEGY_2026.md
      archive/2025-08/           <- mobile-first-implementation.md
      archive/2026-07/           <- brand-website-plan.md, pahari-yatri-status-and-roadmap.md,
                                    site-audit-2026-07.md
      archive/2026-08/           <- content-model-migration-2026-08.md
      archive/2026-09/           <- PAHARI_YATRI_SEO_REFACTOR_REPORT.md, PERFORMANCE.md
    content-psychology-map.md, chapter-content-pack.md,
    social-media-playbook.md, instagram-integration.md,
    youtube-integration.md       (stay in place — active reference docs, not reports)
  .claude/                       (unchanged — already clean)
```

This moves 9 files into `docs/reports/current/` (root-level audit sprawl → one place), archives 8 files into dated subfolders, and leaves everything else untouched. **Every internal citation was checked**: none of the 8 archive candidates are referenced by relative path from a KEEP document, so archiving them breaks nothing.

---

## Part 2 — CLAUDE.md consolidation (plan only)

You asked for "one master instruction file" containing brand vision, tone, content rules, SEO rules, development rules, and agent workflow. Here's what I found:

**`CLAUDE.md` already contains**, in full: brand tone/banned language, GBP/LinkedIn/Reddit/Meta/Instagram/YouTube platform rules, the main-site + app-portal architecture, SEO strategy for both properties, tracking events, vendor/traveller conversion rules, and approval policy. It's long (500+ lines) but it's a single file already — it isn't scattered.

**What's genuinely scattered outside it:**
- Agent roster and the golden rule live in `docs/agents/pahari-yatri-agent-system.md`, linked from `CLAUDE.md`'s top line rather than inlined.
- Development/build rules (typecheck, lint, commit conventions) aren't in `CLAUDE.md` at all — they live implicitly in this session's own instructions and in `PERFORMANCE.md`.
- Writing-tone specifics for chapters (the "Local Truth," "sacred not scenic" voice) are split across `CLAUDE.md`'s brand section and `docs/content-psychology-map.md`.

**Recommendation:** don't merge `docs/agents/pahari-yatri-agent-system.md` into `CLAUDE.md` — keeping the agent roster in its own file is why `CLAUDE.md` stays readable at 500 lines instead of 700+, and the golden rule / approval gates are already duplicated as a summary inside `CLAUDE.md` itself. Instead:
1. Fix the stale "Ten specialist agents" line in `docs/agents/pahari-yatri-agent-system.md` (21 agents, factual fix, no judgment call).
2. Add a short "Development rules" section to `CLAUDE.md` — typecheck/lint/build before every commit, small logical commits, no `--no-verify` — codifying what this session has been doing anyway rather than leaving it as unwritten convention.
3. Leave the rest as is. A single 700-line file with everything inlined would be harder for an agent to actually use than two cross-linked files of ~500 and ~200 lines.

**Not recommending:** a wholesale CLAUDE.md rewrite. Nothing in the audit found its content wrong or contradictory — the ask was consolidation, and the file is already 90% consolidated. The remaining 10% is two small, low-risk additions.
