# Content Audit — Parvati Valley / priority-cluster chapters

Date: 2026-09-08. Scope: the 9-item priority list given for this pass (Parvati Valley, Kasol, Kheerganga, Prashar Lake, Kamrunag, Manali, Bir Billing, Dharamshala/Triund, Shimla/Solan). Companion files: `docs/audit-evidence/research-record-parvati-valley.md` (new), `docs/audit-evidence/research-record.md` (existing, Kamrunag), `PAHARI_YATRI_CONTENT_AUTHORITY_REPORT.md` (2026-09-08, prior session — architecture, indexing and technical findings this audit builds on rather than repeats).

**Read this before Step 1 of the brief's "final output":** the brief's priority order was checked against live Google Search Console data (`pahariyatri.com` domain property, `pahariyatri@gmail.com` account, last 3 months, pulled 2026-09-08) rather than assumed correct. The two do not agree — see "SEO reconciliation" at the end. Nothing below skips the brief's request; it delivers it, with the gap between requested priority and measured demand flagged rather than hidden.

---

### Current chapter: Kasol Weekend Trail (`data/chapters/kasol-weekend.yaml`)

- **Problem:** 717 words. Covers Kasol, Chalal and Rasol well; does not mention Kalga, Pulga or Malana at all — the "villages beyond Kasol" the brief wants covered don't exist in this chapter or anywhere else on the site. No research dossier behind any claim in it.
- **Research:** none existed before this pass. `research-record-parvati-valley.md` now covers Kalga/Pulga/Tosh/Malana as separate places, not as part of this chapter — see architecture note below on why they shouldn't be folded into one chapter.
- **SEO opportunity:** zero measured impressions or clicks in GSC for this page or any "kasol" query in the 105-query export. Not a page with existing traffic to protect or lose.
- **Recommended structure:** keep this chapter as the Kasol/Chalal/Rasol/Manikaran "easy door" chapter it already is; do not try to cram Kalga/Pulga/Tosh/Malana into it. If those villages get built out, they should be their own `places` (or full chapters, if there's enough to say), cross-linked from here — matching the real content model (see below), not the brief's illustrative one.
- **Expected impact:** low near-term ranking impact (no existing demand signal); the real value is completing the valley cluster so a future `relatedChapters`/`Place` network has something to link to.

### Current chapter: Kheer Ganga + Buni Buni Pass (`data/chapters/kheerganga-buni-buni-pass.yaml`)

- **Problem:** 706 words. The Kartikeya origin story is told as a single settled narrative; fresh research shows at least two materially different tourism-source versions of that legend. No research dossier existed before this pass.
- **Research:** now covered in `research-record-parvati-valley.md`. Verdict: the existing hot-spring rules (bathing etiquette, no soap, camping regulation) are fine as written — they're presented as current practice, not myth. The legend section needs a "one version of the story..." hedge before any expansion; do not add the "cures all ailments" claim some sources carry — it's an unverified health claim.
- **SEO opportunity:** the **only** chapter in this priority list with real measured demand — `kheerganga story` (2 impr., pos. 10.0), `kheerganga history` (1 impr., pos. 11.0) in GSC; the `stories/kheerganga-fire-and-water` story page independently pulls 12+7 impressions across www/non-www at position 9–13.
- **Recommended structure:** highest-justified rewrite target in this list. Expand practical detail (current chapter is thin on permit/camping specifics beyond "ask locally"), keep the legend hedged, add the second/third Buni Buni pass detail the title promises but the body barely covers, strengthen `relatedStories` (currently 1) and keep the existing `kasol-weekend`/`cloud-forest-paths` cross-links.
- **Expected impact:** medium-high relative to this list — it is starting from a real, if small, ranking position (~10-13) rather than zero, so improvement is measurable, not speculative.

### Current chapter: Parashar Lake Trek (`data/chapters/parashar-lake-trek.yaml`)

- **Problem:** 989 words, already the deepest of the pre-existing chapters (before this session's temple-cluster linking work). Floating-island claim and Parashar Rishi temple history are told without a dossier.
- **Research:** **not done in this pass** — out of scope for this session's research budget, which went to the Parvati Valley villages the brief specifically named. Flagging rather than inventing: this chapter should not be expanded further until it gets the same treatment Kamrunag got.
- **SEO opportunity:** the `stories/parashar-floating-island` story gets 1 impression in GSC; no "prashar" or "parashar" query appears in the 105-query export. Low measured demand today.
- **Recommended structure:** hold. Already has `relatedChapters` (kamrunag, chandernahan, and now himachal-temple-etiquette from this session's internal-linking work) and reasonable depth; the floating-island mechanism claim is the one line that needs a source before any rewrite touches it.
- **Expected impact:** low priority for new work this cycle.

### Current chapter: Kamrunag (`kamrunag-the-lake-of-oaths.yaml` + `saroa-to-kamrunag.yaml`)

- **Problem:** already documented exhaustively in `docs/audit-evidence/research-record.md` (2026-09-07) and `PAHARI_YATRI_CONTENT_AUTHORITY_REPORT.md`. Not re-audited here to avoid duplicating that work.
- **Research:** the only chapter on the entire site with a full 6-source dossier. Publishing the rewrite means removing several claims currently live (the absolutes around "never robbed," the oath-tribunal framing) — a founder decision already logged as pending, not a new finding.
- **SEO opportunity:** zero Kamrunag-specific rows in the current GSC export (no page, no query) — this was true in the 2026-09-05 export the prior session used and is still true today.
- **Recommended structure:** unchanged recommendation — this is the one chapter that is actually ready to rewrite the moment the founder decides on the held claims.
- **Expected impact:** editorial/trust value (it sets the standard other chapters must meet), not a near-term ranking play — there's no search demand for it to capture yet.

### Manali region (`solstice-snow.yaml` only — no comprehensive Manali chapter exists)

- **Problem:** the only Manali-area content is one 657-word winter reflection piece ("Above Manali"). There is no chapter or place covering Old Manali, Manali town, Solang, or Hadimba Temple as destinations in their own right.
- **Research:** not done this pass — "Manali" is broad enough that treating it as one research topic would violate the brief's own warning against generic "ultimate guide" content. It would need to be scoped to a specific angle (e.g., "Manali beyond Mall Road," already named as a target keyword in this project's SEO strategy) before research starts.
- **SEO opportunity:** zero "manali" queries in the current 105-query GSC export.
- **Recommended structure:** do not write a generic Manali guide. If pursued, scope it the way `solstice-snow` already is — a specific angle, not a destination dump — and treat it as new content requiring its own research pass.
- **Expected impact:** unscoped; cannot estimate until an angle is chosen.

### Bir Billing

- **Problem:** zero content anywhere in the repo — no chapter, no place, not even a destination stub. Not mentioned in any existing file.
- **Research:** not started.
- **SEO opportunity:** zero queries, zero pages in GSC (unsurprising — there's nothing to rank).
- **Recommended structure:** this is a "new content" decision, not a "rewrite" one, and Bir Billing (paragliding, a very different traveller intent than the rest of the site) is arguably the furthest of the nine from Pahari Yatri's "sacred, local, slow" identity. Recommend against building this out until the founder confirms it fits the brand, rather than defaulting to it because it's on the list.
- **Expected impact:** cannot estimate — would be a from-scratch build.

### Dharamshala / Triund

- **Problem:** Triund and McLeod Ganj exist only as `places` — title, one-paragraph description, coordinates. No chapter depth (this matches the prior session's finding that the `places` schema can't hold a real guide at all — title/region/district/description/image/coordinates, nothing else).
- **Research:** not started.
- **SEO opportunity:** zero queries, zero pages.
- **Recommended structure:** blocked on the same schema gap the prior audit already flagged (places can't hold itinerary/FAQ/narrative content) — this needs a schema decision before it needs a writer.
- **Expected impact:** cannot estimate until the schema question is resolved.

### Shimla / Solan belt

- **Problem:** three real chapters exist (`buran-ghati-trek`, `mural-danda-trek`, `chandernahan-lake-trek`, all Shimla district). Solan itself is one of the three district pages the prior audit flagged as an empty stub (108 words).
- **Research:** not done this pass.
- **SEO opportunity:** **the second-best measured opportunity in this entire list** — `/chapters/mural-danda-trek` gets 38 impressions at position 11.1, and `mural danda trek`/`mural hills`/`mural danda` together account for 29 impressions in the query export, all around position 11-12. This is a real, close-to-page-2 ranking with no rewrite yet attempted.
- **Recommended structure:** do not touch Solan (no content, no demand — matches the prior audit's "don't write district guides for empty districts" rule). Do consider `mural-danda-trek` for the next research-and-expand pass — it already outperforms everything on this list except the temple cluster and Kheerganga.
- **Expected impact:** medium — improving a chapter already at position 11 is a more plausible page-1 push than starting any of the zero-demand topics from scratch.

---

## SEO reconciliation: brief's priority order vs. measured demand

Live GSC pull (`sc-domain:pahariyatri.com`, `pahariyatri@gmail.com`, last 3 months, 2026-09-08): 24 clicks, 1.16K impressions, 2.1% CTR, position 16.8 — matches the founder's known baseline exactly, confirming the account and property are correct.

**What actually has measured demand right now**, in order:
1. Temple/devta name queries — ~60 of 105 total queries (`kalamuni temple`, `indrunag temple`, `mrikula devi temple`, `jamadagni rishi temple`, etc.) driving 167 impressions to `/temples` at position 51.7. Unchanged from the prior session's finding — still the single largest opportunity on the site, and still blocked on the same thing: `/temples` hardcodes six temples against sixty distinct queries.
2. `/folklore` — the second-best-performing page after the homepage (2+1 clicks, 57+66 impressions, position ~22).
3. `mural-danda-trek` (Shimla belt, priority #9 in this brief) — real position-11 ranking, 38 impressions.
4. Kheerganga (priority #3 in this brief) — small but real demand, position 9-13.
5. Everything else in the given priority list — Parvati Valley cluster, Kasol, Prashar Lake, Kamrunag, Manali, Bir Billing, Dharamshala/Triund — has **zero** measured queries or page impressions today.

This doesn't mean the brief's priority order is wrong — Kalga/Pulga/Tosh/Malana can't have impressions before they exist as pages, and building evergreen destination coverage is a legitimate bet distinct from chasing existing demand. It means the two are different strategies (build-new vs. improve-existing), and both being called "priority 1" risks working against the "prioritize existing pages before creating new ones" rule this project has followed until now. Recommend deciding explicitly which strategy this cycle is optimizing for, rather than treating the given order as demand-validated.

## Platform check (side finding, not part of the original brief but requested mid-session)

- **Google Analytics (GA4):** confirmed the `pahariyatri@gmail.com` account's GA4 property (`a336957575p467775152`) is the real one — 34 active users / 7 days, direct traffic dominant (31), organic search only 2, organic social 2 (one `facebook.com/referral`, one `instagram/reel`), one `chatgpt.com/ai-assistant` referral logged. An earlier glance at a different Google account's Analytics showed a "Sample Gold report" — Google's **synthetic demo dataset**, not real site data; that number should not be cited anywhere as real traffic.
- **Facebook:** the page linked in the site's own code (`facebook.com/pahariyatri`, in `app/layout.tsx` and `data/siteMetadata.js`) currently returns "This content isn't available" when visited. Meta Business Suite (under `pahariyatri@gmail.com`) confirms a "Pahari Yatri" business portfolio does own Facebook + Instagram assets, so the page exists as an asset but isn't publicly visible — likely unpublished or restricted. This is a real, live broken-link/trust-signal defect, not a hypothetical one.
- **Instagram:** `instagram.com/pahariyatri` is live — 190 posts, 1,065 followers — but its bio currently reads *"Not tourism. A movement of Yatris 🌿 Hidden valleys, sacred lakes & secret trails. Limited journeys guided by Himalayan..."* — three phrases (**hidden valleys**, **secret trails**, **limited journeys**) that are explicitly on this project's own banned-language list, and a bio that doesn't match the prescribed "Yatri, not tourist" / "Himalayan stories, sacred places, local culture and responsible travel" copy at all. This is a genuine, current brand-consistency violation on the platform with the most followers.
- These three findings are handed off rather than acted on — profile/bio changes need founder approval per this project's platform rules, and the Facebook access issue needs the founder or whoever manages the Meta Business account to check publish status directly (an agent can't fix Page visibility from the outside).
