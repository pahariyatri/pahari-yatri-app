---
description: Keyword and page plan for the portal — traveller/vendor keywords, region/service page plan, index/noindex plan, sitemap plan. No doorway spam.
---

Run the portal SEO plan.

1. **portal-content-seo-strategist** — audit existing portal pages first, then propose staged region/service pages with real content behind each one.
2. **seo-research-strategist** — keyword research and SERP analysis for the traveller and vendor keyword targets. (This repo doesn't have separate `dataforseo-keyword-researcher` / `search-console-analyst` / `ai-seo-geo-strategist` agents — `seo-research-strategist` covers GSC, SERP, and keyword-cluster work; use it for all of that. If DataForSEO access is available, use it directly rather than assuming a dedicated agent exists.)
3. **portal-technical-seo-engineer** — turn the page plan into an index/noindex plan and a sitemap plan (which routes should be added to `app/sitemap.ts` and in what order).

Rules: no doorway pages — every proposed page needs real content behind it. Stage the roadmap; do not propose building all pages at once.

Return:
- traveller keywords
- vendor keywords
- region/service page plan, staged
- noindex/index plan
- sitemap plan (exact URLs to add, in priority order)

$ARGUMENTS
