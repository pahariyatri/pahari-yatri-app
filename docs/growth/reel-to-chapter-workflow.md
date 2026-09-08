# Reel → Chapter Workflow

The operational half of `content-growth-system.md`. This is the checklist you follow when a Reel has earned a chapter.

---

## 0. Before you start

Confirm the Reel actually qualifies. From the growth system, at 72h it must hit **at least two** of: high saves, high shares, comments asking real questions, strong watch-through past the local-truth beat.

If it doesn't qualify, stop here. Point the Reel's CTA at an existing chapter or the WhatsApp Channel instead. A chapter nobody asked for is a week you don't get back.

---

## 1. Turn the Reel into a chapter

The Reel is the trailer. The chapter is the thing itself — it must give more than the Reel did, or the click feels like a bait-and-switch.

**Write in this order:**

1. **Open where the Reel ended.** The viewer already saw the hook. Do not replay it. Start at the local truth.
2. **Give the context the Reel had no room for** — the season, the walk in, who lives there, what the place is actually called and why.
3. **Name the human source.** "An elder in Mandi told me…" Attribution is the brand.
4. **State what the place asks of you.** The Yatri lesson, expanded. Concrete: what to wear, what not to photograph, when not to come.
5. **Close with one onward step**, not three. Either the Yatri Circle or the WhatsApp Channel — pick the one that fits the emotion of the piece.

**Length:** long enough to be worth the click, short enough to finish standing up. If you're padding, stop.

**Banned words** apply here exactly as they do on Instagram: *hidden gem, must visit, limited seats, package, cheap trip*.

**Publish via Keystatic** at `/admin` → Chapters. The chapter goes live at:

```
https://pahariyatri.com/chapters/{slug}
```

Chapters are in the sitemap automatically — no manual step.

---

## 2. Add the UTM link

**Never post a bare link.** An untagged link is an untracked link, and you will not be able to tell which Reel worked.

### The pattern

```
https://pahariyatri.com/chapters/{slug}?utm_source={platform}&utm_medium={format}&utm_campaign={chapter-slug}&utm_content={variant}
```

### The parameters

| Parameter | Use | Examples |
|---|---|---|
| `utm_source` | The platform | `instagram`, `youtube`, `whatsapp`, `facebook` |
| `utm_medium` | The format | `reel`, `story`, `bio`, `short`, `post` |
| `utm_campaign` | **The chapter slug.** Always. This is what ties everything together. | `buran-ghati-trek` |
| `utm_content` | Which variant of the CTA/placement | `bio-link`, `story-sticker`, `hook-a` |

### Worked example

Chapter `buran-ghati-trek`, linked from the Instagram bio:

```
https://pahariyatri.com/chapters/buran-ghati-trek?utm_source=instagram&utm_medium=reel&utm_campaign=buran-ghati-trek&utm_content=bio-link
```

Same chapter, from a Story sticker:

```
https://pahariyatri.com/chapters/buran-ghati-trek?utm_source=instagram&utm_medium=story&utm_campaign=buran-ghati-trek&utm_content=story-sticker
```

Same chapter, reposted to YouTube Shorts:

```
https://pahariyatri.com/chapters/buran-ghati-trek?utm_source=youtube&utm_medium=short&utm_campaign=buran-ghati-trek&utm_content=description
```

**Rules of hygiene**

- Lowercase everything. `Instagram` and `instagram` become two different rows in GA4.
- Use hyphens, never spaces or underscores.
- `utm_campaign` is always the chapter slug — no exceptions, no creative names.
- Keep a running list of the links you've posted. If you can't reproduce the link, you can't explain the number.

---

## 3. How `reel_source_visit` gets tracked

You don't do anything. The site handles it.

On landing, `components/AnalyticsEvents.tsx` runs `trackReelSourceVisit()` from `lib/analytics.ts`. If the URL carries a `utm_source`, it pushes:

```js
{
  event: 'reel_source_visit',
  source,        // utm_source
  medium,        // utm_medium
  campaign,      // utm_campaign  → the chapter slug
  content,       // utm_content
  landing_path   // e.g. /chapters/buran-ghati-trek
}
```

It fires **once per landing**, so a reader who navigates around the site won't inflate the number.

Immediately after, the chapter page fires `chapter_view` with `chapter_slug`, `chapter_title`, `book` and `region`.

So a single tagged visit gives you two rows: *where they came from* and *what they read*.

**If `utm_source` is missing, `reel_source_visit` does not fire at all.** That is the entire cost of forgetting to tag a link.

---

## 4. Choosing the CTA

One CTA per chapter. Two CTAs is the same as none.

| If the chapter is… | Point at | Why |
|---|---|---|
| Emotional, story-led, folklore | **WhatsApp Channel** | Low commitment. They're not ready to apply; they're ready to keep listening. |
| Practical — a trail, a route, a season | **Yatri Circle** (`/apply`) | They're planning. Catch the intent while it's live. |
| Cultural, temple, a place asking for respect | **WhatsApp Channel** | Applying would feel transactional against the subject matter. |
| Explicitly about walking with us | **Yatri Circle** | Obvious. Don't be coy. |

Whichever you choose, the click is tracked — `whatsapp_join_click` or `join_yatri_circle_click` — both carrying a `location` so you can see which placement converts.

**Write the CTA soft.** "There's a WhatsApp channel where these go out first" beats "JOIN NOW".

---

## 5. Measuring: 24h / 72h / 7d

Three checkpoints. Each answers a different question. Don't judge early.

### At 24 hours — *did the link work?*

| Look at | Healthy | If not |
|---|---|---|
| `reel_source_visit` with this `utm_campaign` | Non-zero | The link is wrong or untagged. Fix it and repost the link in Stories. |
| `chapter_view` for the slug | Roughly matches the visits above | People tapped but didn't land — check the URL and page load. |
| Instagram link taps | Non-zero | The hook worked but the CTA didn't. Rewrite the last 3 seconds. |

Do **not** judge the chapter yet. 24h only tests plumbing.

### At 72 hours — *did the chapter persuade?*

| Look at | Healthy | If not |
|---|---|---|
| `join_yatri_circle_click` or `whatsapp_join_click` | > 0 | CTA is too soft, too low on the page, or the wrong one for this chapter. |
| `apply_start` | Follows the CTA clicks | People click then bounce — the form's first question is scaring them. |
| Saves/shares on the Reel | Still climbing | The Reel peaked. Note the format and move on. |

This is where you decide whether the chapter's CTA needs a change.

### At 7 days — *was it worth it?*

| Look at | Healthy | If not |
|---|---|---|
| `apply_submit` attributable to the campaign | ≥ 1 for a strong chapter | Long funnel — normal. Judge across several chapters, not one. |
| `chapter_view` still trickling | Yes, small and steady | The chapter is Reel-dependent only; it isn't earning search yet. |
| GA4 → Search Console → Queries | Chapter starts appearing | Give it 3–4 weeks before worrying; indexing is slow. |

**The 7-day question:** would you write this chapter again? Write the answer down. Six of those and you know your format.

---

## 6. Quick checklist

```
[ ] Reel passed the 72h bar (2+ signals)
[ ] Chapter written — starts where the Reel ended, names a human source
[ ] No banned words
[ ] Published via /admin, live at /chapters/{slug}
[ ] UTM link built, lowercase, utm_campaign = chapter slug
[ ] Link in bio / story sticker updated
[ ] One CTA chosen, matched to the chapter's tone
[ ] Reposted to YouTube Shorts within 48h (own UTM)
[ ] 24h check — plumbing
[ ] 72h check — persuasion
[ ] 7d check — worth repeating?
```

---

## 7. Related

- `docs/growth/content-growth-system.md` — channel roles, weekly plan, content formula, banned words.
- `lib/analytics.ts` — every event name and its parameters.
