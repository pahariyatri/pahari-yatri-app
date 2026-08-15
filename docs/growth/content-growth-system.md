# Pahari Yatri — Content Growth System

How Pahari Yatri grows: **Instagram Reels bring people in, chapters hold them, WhatsApp and the Yatri Circle keep them.**

Everything below serves that one sentence. If an activity doesn't move someone along that path, it isn't a priority yet.

---

## 1. Channel roles

Each channel has exactly one job. Confusing these is how effort gets wasted.

| Channel | Role | Priority |
|---|---|---|
| **Instagram Reels** | Primary growth. Where new people discover us. | **P0 — the only channel that must ship weekly** |
| **Website chapters** | Where a viewer becomes a reader. The place a Reel points to. | P0 |
| **WhatsApp Channel** | Broadcast. Low-friction way to stay in someone's week. | P1 |
| **Yatri Circle (Discord + application)** | Depth. The people who actually want to walk. | P1 |
| **YouTube Shorts** | Repost only. Zero original production. Second surface for the same Reel. | P2 |
| **Facebook** | Infrastructure and repost only. Needed for Business/Pixel/domain; not an audience we court yet. | P3 |
| **Local Connect** | Not started. Do not build for it yet. | Later |

**Facebook is deliberately not a growth channel right now.** It exists because Meta Business, the Pixel and domain verification live there. Repost Reels to it if it costs you nothing. Do not write for it.

---

## 2. The funnel

```
Instagram Reel
      │  (link in bio / story sticker, always UTM-tagged)
      ▼
Chapter page on pahariyatri.com          → chapter_view
      │
      ├─────────────► WhatsApp Channel   → whatsapp_join_click
      │
      └─────────────► Yatri Circle CTA   → join_yatri_circle_click
                              │
                              ▼
                      Application start  → apply_start
                              │
                              ▼
                      Application sent   → apply_submit  (Meta: Lead)
                              │
                              ▼
                      Discord Circle     → discord_join_click
```

Every arrow is a tracked event. If a step has no numbers, we are guessing.

The events are defined once in `lib/analytics.ts` and read by GTM. See `reel-to-chapter-workflow.md` for how to tag a Reel so `reel_source_visit` attributes it.

---

## 3. The weekly plan — 4 Reels per week

Four is the commitment. It is small enough to sustain in a bad week and large enough to learn from.

| Slot | Type | Purpose |
|---|---|---|
| Reel 1 | **Place / trail** | Reach. The visually strongest thing you have. |
| Reel 2 | **Local truth** | Differentiation. Something only someone who lives there knows. |
| Reel 3 | **Culture / folklore / temple** | Depth. This is the brand's moat. |
| Reel 4 | **Yatri lesson / responsible travel** | Filter. Attracts the right people, repels the wrong ones. |

Rules:

- **One chapter per week maximum.** Chapters are expensive. Only the Reel that earns it gets one (§5).
- **Repost all 4 to YouTube Shorts** within 48h. No re-editing, no new captions beyond a trimmed hook. It costs minutes and buys a second discovery surface.
- **Repost to Facebook** only if it is a copy-paste. Never spend creative time there.
- If a week collapses, ship Reel 2 and Reel 3. Those two carry the brand.

---

## 4. Content formula

Every Reel follows the same four beats:

> **Viral hook → real local truth → Yatri lesson → soft CTA**

1. **Viral hook (0–3s).** Earn the next three seconds. A visual, a contradiction, a question. No logo, no slow intro.
2. **Real local truth (3–20s).** The thing a tourist would not know. A name, a season, a rule, a story from someone who lives there. This is what makes the account worth following.
3. **Yatri lesson (20–35s).** What this asks of the traveller. Respect, timing, restraint. Short. Never preachy.
4. **Soft CTA (last 3–5s).** One line. "The full chapter is on the site." / "There's a longer story about this place." Never urgency, never scarcity.

### Banned words

These are banned because they signal the exact tourism economy Pahari Yatri exists to counter. Using them attracts price-shoppers, not Yatris.

- **hidden gem**
- **must visit**
- **limited seats**
- **package**
- **cheap trip**

Say instead: *a quiet place*, *worth understanding*, *a small group*, *a journey*, *a slow route*. When in doubt, describe the place accurately rather than selling it.

---

## 5. Deciding which Reel becomes a chapter

Do not write a chapter because you like the Reel. Write it because the audience asked.

A Reel earns a chapter when, at 72 hours, it meets **at least two** of:

- **Saves** are high relative to your recent median — saves mean "I want to come back to this".
- **Shares** are high — the story travelled beyond your followers.
- **Comments ask a real question** — where is this, when to go, is it open, who do I ask.
- **Watch-through** is strong past the local-truth beat, i.e. people stayed for the substance, not just the hook.

Signals that do **not** justify a chapter: likes alone, follower spikes, a Reel that did well purely on scenery.

Then:
- **Meets the bar** → write the chapter, then re-post the Reel pointing at it (§ `reel-to-chapter-workflow.md`).
- **Doesn't** → keep the Reel, point the CTA at an existing chapter or the WhatsApp Channel instead.

One good chapter beats four thin ones. A chapter is a permanent, indexable asset; a Reel is a moment.

---

## 6. Weekly analytics review

Same day each week, 20 minutes. Two tabs.

### From GA4

Reports → Engagement → Events. Look at:

| Metric | Question it answers |
|---|---|
| `chapter_view` | Did the Reels actually send readers? |
| `reel_source_visit` (by `campaign`) | **Which Reel** sent them? |
| `join_yatri_circle_click` | Did the chapter persuade anyone? |
| `apply_start` → `apply_submit` | Where do people abandon the form? |
| `whatsapp_join_click` / `discord_join_click` | Which channel do they actually prefer? |

Also check **Reports → Search Console → Queries** to see which chapters are starting to earn organic search — that's the compounding layer underneath the Reels.

### From Instagram Insights

Per Reel: **views, watch-through, saves, shares, profile visits, link taps.**

### The one number that matters

```
chapter_view ÷ link taps
```

If people tap and don't land, the link or the page is broken. If they land and `join_yatri_circle_click` stays at zero, the chapter's CTA is too soft or in the wrong place.

### Read it in this order

1. Which Reel drove the most `reel_source_visit`? → make more like it.
2. Did those visits become `chapter_view`? → if not, fix the link.
3. Did chapters produce `join_yatri_circle_click`? → if not, fix the CTA.
4. Did clicks become `apply_submit`? → if not, the form is too long or asks too early.

Fix **one** step per week. Fixing everything at once teaches you nothing.

---

## 7. What we are deliberately not doing yet

- **No ads.** Organic has to work first, or paid just buys expensive indifference.
- **No Local Connect.** Not until the Yatri Circle has real, active people.
- **No new channels.** Not Twitter/X, not LinkedIn, not a newsletter platform.
- **No posting cadence above 4 Reels/week.** Consistency beats volume.

---

## 8. Related

- `docs/growth/reel-to-chapter-workflow.md` — the operational steps for turning a Reel into a chapter, UTM tagging, and measurement windows.
- `lib/analytics.ts` — the single source of truth for event names and their parameters.
