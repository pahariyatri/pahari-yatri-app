---
description: Exact-files implementation plan for approved portal fixes — staged, tested, and gated behind founder approval. Runs after /portal-audit, never instead of it.
---

Run the portal implementation plan. Requires an approved audit or an explicit founder-approved fix list — do not run this cold.

1. **portal-product-auditor** — confirm the current state of what's being fixed hasn't drifted since the audit (re-check against `origin/main`).
2. **portal-technical-seo-engineer** — confirm the exact SEO-safe changes (metadata, noindex, sitemap entries, rendering).
3. **nextjs-production-engineer** — the actual file-level implementation plan: exact files to change, in `local-connect-app` (or the relevant repo), smallest safe diff.
4. **portal-tracking-analyst** — tracking implementation, additive only.
5. **qa-security-reviewer** — final gate before anything is proposed for deploy.

Rules:
- Stop after the plan and ask before: deploying to production, changing live public copy heavily, changing public slugs, deleting routes, changing forms that affect leads, destructive database schema changes, touching credentials.
- Safe additive changes (noindex tags, metadata, tracking events, new sitemap entries, new pages with real content) may proceed if the founder has already approved the specific item.
- Never touch `payment-service`, `stay-sync-app`, `media-worker`, or `vendor-cms` unless the task explicitly requires it — scope stays in `local-connect-app` unless stated otherwise.

Return:
- exact files to change
- code risks
- staged implementation order
- tests to run (build, typecheck, route checks)
- what still needs explicit founder approval before it ships

$ARGUMENTS
