---
description: Full cross-platform audit — website, Instagram, Facebook, LinkedIn, Google Business Profile, YouTube, Reddit, Google Search — with a brand-consistency and trust scorecard and an update pack.
---

Run the full platform presence audit.

1. **platform-presence-auditor** — audit every accessible platform: website, Instagram, Facebook, LinkedIn, Google Business Profile, YouTube, Reddit mentions, Google Search appearance. Mark anything inaccessible as `unavailable` and continue.
2. **google-business-profile-strategist** — eligibility check and full GBP field audit.
3. **social-brand-consistency-editor** — score bio/description consistency across every platform against the one shared identity.
4. **reputation-local-trust-agent** — flag any existing fabricated or unverifiable trust claim as top priority.
5. **qa-security-reviewer** — only if this run touches any repo file (e.g. website metadata). Skip if this was audit-only across external platforms.

Rules:
- Browser access only if already logged in. Never ask for a password.
- Stop immediately and hand back to the founder if an OTP, passkey, payment, permission, or billing screen appears.
- Do not run ads. Do not spend API credits beyond normal tool use.
- Do not publish any public profile change. Prepare the update pack only.

Return:
- platform-by-platform audit (status, brand consistency score, traffic value, trust value, issue, recommendation, priority)
- current profile copy vs. improved profile copy, where available
- risk notes, especially any existing fake/unverifiable claim found
- what can be updated with a routine approval vs. what needs a bigger founder decision (category change, address, business name)

$ARGUMENTS
