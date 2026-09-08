---
description: Full growth loop — orchestrator picks specialists, QA gates the result.
---

Run the standard Pahari Yatri growth loop.

1. Use **growth-orchestrator** to inspect current state and decide which specialists this loop needs.
2. Run those specialists in sequence.
3. Use **qa-security-reviewer** as the final gate if anything was changed.

Follow the golden rule: Inspect → Report → Plan → **Ask approval if destructive, public-facing or large** → Implement minimal change → Test → QA → Document → Recommend next.

Do not begin a large migration inside this loop. If the plan touches more than ~10 files or any live URL, stop after the plan and ask.

Return:
- what changed (or "audit only")
- what failed
- QA verdict
- what to do next

$ARGUMENTS
