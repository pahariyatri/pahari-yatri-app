---
description: Full app portal audit — live app.pahariyatri.com + local codebase (local-connect-app, verified against origin/main) + route inventory + SEO/conversion/brand/tracking/security issues. Audit only, no code edits, no publishing.
---

Run the full portal audit.

1. **portal-product-auditor** — live app status, code status (confirm which repo/branch, verified against `origin/main`), full route inventory, UX/flow issues, literal banned-language instances in UI copy, trust issues.
2. **portal-technical-seo-engineer** — sitemap, robots, canonical/metadata, rendering strategy (SSG/SSR/CSR), schema, security/route-leakage.
3. **portal-conversion-strategist** — traveller request flow and vendor onboarding, field gaps against the required lists, CTA copy issues.
4. **portal-brand-bridge-editor** — whether the portal's current tone has drifted toward package-selling or booking-clone territory, and whether the main site oversells what the portal delivers.
5. **portal-tracking-analyst** — current tracking state (verified fresh, not assumed), gap against required events.
6. **qa-security-reviewer** — only if this run made any repo changes. Skip for a pure audit-only run.

Rules:
- Audit only. Do not edit code, do not publish, do not deploy.
- Do not change billing, credentials, ads, permissions, or production settings.
- Do not run paid APIs without approval.
- If login/passkey/OTP/payment/permission appears while checking the live site, stop and ask the founder.
- Verify every code finding against `origin/main` of the correct repo (`local-connect-app` for frontend) — a stale local checkout has already produced false findings once.

Return:
- live app status
- local codebase status (which repo/branch, confirmed current)
- full route inventory table (route, purpose, public/private, index/noindex, current issue, recommendation)
- SEO issues
- conversion issues
- brand issues
- tracking issues
- security/privacy issues
- staged roadmap (Stage 0 audit → Stage 7 weekly review, per CLAUDE.md)

$ARGUMENTS
