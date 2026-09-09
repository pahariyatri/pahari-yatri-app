# LinkedIn Plan — Pahari Yatri

**Date:** 2026-09-09
**Owner:** `linkedin-brand-strategist`
**Status:** drafts only. Nothing is published. The founder posts manually, always.

---

## 0. Blocking issue — read first

**There is no LinkedIn URL on record anywhere in this codebase.**

Verified this session: `data/siteMetadata.js` has no `linkedin` key. The Organization `sameAs` array in `app/layout.tsx` lists Facebook, Instagram, Twitter and YouTube, but not LinkedIn. `components/common/SocialLinks.tsx` accepts an optional `linkedin` prop and renders an icon for it, so the site is **built to display a LinkedIn link and is currently never given one**.

**The founder must supply, or confirm the absence of:**
1. The Pahari Yatri **company page** URL.
2. The founder's **personal profile** URL.

No URL was invented for this plan. Both paths are covered:

- **If both exist** → start at §2, and add the company URL to `siteMetadata.js` and the `sameAs` array so the site and the profile corroborate each other.
- **If neither exists** → the company page is created first (a company page needs a verified personal profile as admin, so the personal profile comes first in practice). Week 1 is setup, not posting. Do not start a 3-posts-per-week cadence on a page with no About section and no logo.

**Two caveats about a brand-new page, stated honestly:** a page with zero followers reaches almost nobody, so early company posts are an archive being built for people who arrive later, not a growth channel. And the founder's personal profile will outperform the company page for a long time. That is normal and it is why the cadence below is weighted the way it is.

---

## 1. The cadence reconciliation, stated plainly

**The founder asked for 3 LinkedIn posts per week. The existing rule in `.claude/agents/linkedin-brand-strategist.md` is "One post per week. Drafts only."**

These conflict. This plan does not silently override the existing rule.

**Reconciliation: 1 founder post + 2 company-page posts = 3 per week.**

The reasoning, so the founder can overrule it knowingly: the 1/week cap exists to protect the **founder's personal voice**, which is the scarce asset. Founder credibility comes from specificity, and specificity does not survive being produced three times a week. A founder posting three times weekly starts writing motivational filler by week three, and the audience — creators, homestay owners, guides, tourism professionals — is exactly the audience that notices.

The company page is a different surface with a different voice and was never covered by that cap. Two company posts per week is comfortable there.

**Net effect: the founder gets the 3 posts/week they asked for. The existing rule is respected, not broken.** If the founder wants 3 *personal* posts per week, that is their call to make explicitly — it is a change to a documented standard, so it should be a decision, not a drift.

| Surface | Cadence | Voice | Rule source |
|---|---|---|---|
| Founder personal | 1/week | First person, specific, admits uncertainty | Existing cap, unchanged |
| Company page | 2/week | Brand voice, still human, never corporate | New, no existing cap |

---

## 2. Company page — the six pillars

The founder's verbatim pillar list was not relayed to this session. **These six are mapped from the seven post types already defined in `linkedin-brand-strategist.md`**, so they inherit an existing standard rather than inventing a parallel one. They should be reconciled against the founder's own list before execution — where they differ, the founder's wins, and this file gets updated.

| # | Pillar | What it is | Frequency |
|---|---|---|---|
| 1 | Building in public | A real decision and its tradeoff | Weekly-ish |
| 2 | Responsible travel thinking | The argument, made calmly, with an example | Weekly-ish |
| 3 | Local partner philosophy | How we intend to work with locals — **intent, never product** | Twice monthly |
| 4 | Research learning | Something the SEO or content work surfaced | Twice monthly |
| 5 | Collaboration call | Inviting creators and locals to contribute | Monthly |
| 6 | Why we are not a package company | The identity post | **Once a quarter at most** |

Pillar 6 is powerful and degrades fast on repetition. The existing rule caps it at quarterly. Keep it there.

---

## 3. Company page — draft posts, grounded in real repo content

Every draft below is built on something that actually exists in this repository. No invented traction, no invented partnerships.

---

### Draft C1 — Pillar 1, Building in public

```
POST TYPE  — Building in public
HOOK       — We removed the itinerary fields from our content model.
             They were the most "useful" thing on the page and they were the
             most wrong.
DRAFT      —
We removed the itinerary fields from our content model.

Our chapter schema carried the standard set: itinerary, included, excluded,
packing, duration, difficulty. Every travel site has them. They are genuinely
useful. We are removing most of them anyway.

The reason is that those six fields quietly decide what a page is. A page with
an "included / excluded" block is a product listing, whatever the prose above it
says. Once the fields are there, the writing bends toward them, and a chapter
about a lake where people have left offerings for centuries turns into a
comparison table.

We are keeping what describes reality: distance, altitude, best season. Those
help someone decide whether they can walk it. We are dropping what implies a
transaction we do not offer.

It costs us something. Those fields probably rank.

CTA        — If you run a travel or content site: which field on your page is
             quietly deciding what the page is?
WHY NOW    — Package-tour fields are documented in the content model as a known
             issue. This is a real decision, in progress, with a real cost.
RISK       — Only post once the removal is actually decided. If the fields are
             still there in three months this reads as talk.
```

---

### Draft C2 — Pillar 2, Responsible travel thinking

```
POST TYPE  — Responsible travel thinking
HOOK       — There is a village in Parvati Valley that does not allow alcohol.
             No checkpoint. No guard. The rule just holds.
DRAFT      —
There is a village above Kasol that does not allow alcohol. A signboard nailed
to a tree on the walk up says so, with a fine attached and no exception for
visitors.

What is interesting is not the rule. It is that there is nobody enforcing it.

Travellers describe carrying a bottle up out of habit, reading the board,
and carrying it back down unopened, without anyone ever checking. The rule
holds because the community decided it together and has not needed to revisit
it since.

Most travel content would file this under "unusual local customs" and move on
to the cafes. We think it is the more important fact about the place. A rule
that survives without enforcement tells you a community actually believes
something, and that is a more accurate picture of where you are standing than
any view is.

You do not have to agree with a village's rules. You do have to know they exist
before you arrive with your habits.

CTA        — Where have you seen a rule hold with nobody enforcing it?
SOURCE     — Based on our own chapter on Grahan and a Yatri Reflection in our
             library. The reflection is an editorial composite representing a
             commonly described traveller experience, not a transcript of one
             interview, and it is labelled that way on our site.
WHY NOW    — Real content, already published, already correctly hedged.
RISK       — Do NOT name the village as "the village that banned alcohol" in a
             way that turns it into a destination. The point is the principle.
             Verify the vision/origin detail with a named local before ever
             stating it as fact — our own chapter treats it as how the story is
             locally told, not as verified history.
```

---

### Draft C3 — Pillar 4, Research learning

```
POST TYPE  — Research learning
HOOK       — Nobody searches "hidden gem". They search the name of the village.
DRAFT      —
We went through the search results for the places we write about. The pattern
was consistent enough to change what we do.

Almost every page ranking for Parvati Valley villages sells them as secrets.
"Best-kept secret." "Places to visit." The vocabulary is nearly identical across
sites that otherwise have nothing in common.

Not one of them says the simplest true thing about Kalga, Pulga or Tosh: these
are inhabited villages, people live there, and they have rules.

That gap is structural, not an oversight. A site whose traffic depends on
"places to visit" cannot easily publish "here is what this place asks of you
before you come". It works against its own model.

It does not work against ours. So that is the sentence we are building on.

CTA        — Curious whether people in other categories see the same thing: is
             the obvious true sentence in your field the one nobody publishes?
WHY NOW    — Directly from this week's competitor analysis. Real, checkable.
RISK       — Quote competitor phrasing as evidence only. Do not name and shame
             individual small blogs.
```

---

### Draft C4 — Pillar 3, Local partner philosophy

```
POST TYPE  — Local partner philosophy
HOOK       — We are not ready to send anyone business yet. Saying so is the
             whole point.
DRAFT      —
People ask whether we connect travellers with homestays and guides.

Not yet. We are working toward it. Right now we are a library, and I would
rather say that plainly than imply a network that is not built.

What I can describe is the standard we intend to hold it to. If we say a local
partner is verified, there has to be an actual verification process behind the
word, one we can describe publicly. If we cannot describe it, we do not use the
word. "Verified" is a promise made to a traveller about somebody else's
livelihood, and it is not a marketing adjective.

The same standard already applies to our writing. When we could not source a
cultural claim to a named local, we removed it rather than hedging it into
something vague. Two blocks came out of our temple etiquette chapter that way.
They will go back in when a named person from that valley tells us their own
practice.

Slower. Also the only version worth building.

CTA        — If you run a homestay or guide in Himachal and want to be told
             when this is real: my inbox is open. No list, no pitch.
WHY NOW    — Directly grounded in the verification header in
             himachal-temple-etiquette.yaml, which records exactly this.
RISK       — Never state or imply Local Connect exists. This draft says "not
             yet" three times deliberately. Keep it that way.
```

---

## 4. Founder personal posts — 1 per week

Voice: first person. Lead with the specific thing, not the lesson. Short paragraphs. No emoji bullets, no "Here's the thing 👇". Indian English is correct and is not neutralised. Admit uncertainty — it is the most credible thing available.

---

### Draft F1 — Founder note

```
POST TYPE  — Founder note
HOOK       — I deleted two sections from our temple etiquette chapter last week.
             Both were accurate to what I had read. Neither had a name attached.
DRAFT      —
I deleted two sections from our temple etiquette chapter last week.

One was about access restrictions during menstruation. One was about entry
rules by community. Both are things you will find written about Himachal
temples. Both were, as far as I could tell, describing something real
somewhere.

That is exactly the problem. Somewhere is not a source.

Practice varies from valley to valley and temple to temple, and writing a
general rule out of a few readings turns one village's custom into a statement
about an entire state. In the second case it was worse than imprecise: as I had
drafted it, it described exclusion as a normal posted rule, which is also
unlawful.

So they are out. Not softened. Out.

They come back if a named woman from a temple-owning village describes her own
valley's practice, or a named temple committee describes their own temple. Not
before.

I do not feel good about it, exactly. The chapter is thinner and thinner pages
do not rank. But I would rather publish less than have someone from Mandi read
our page and recognise it as something written by a person who was not there.

CTA        — none. Let it sit.
WHY NOW    — This actually happened and is documented in the repo.
RISK       — Do not restate the removed claims while explaining that they were
             removed. This draft describes the category, not the content.
```

---

### Draft F2 — Founder note

```
POST TYPE  — Founder note
HOOK       — Our best chapter has an unrankable title, and I am not sure I want
             to change it.
DRAFT      —
Our chapter on Kamrunag is called "Kamrunag – The Lake of Oaths".

I like that title. It is also close to useless.

Nobody types "the lake of oaths". They type "Kamrunag lake". They ask how far
the trek is, whether the temple is open, whether it is the same as Khatu Shyam.
Those are the actual questions, and our page — which has the altitude, the
route from Rohanda, the offering tradition, the June fair — answers most of
them while being titled something no one will ever search.

The fix is boring and obvious. Keep the literary line as the heading, write a
literal title for search. We already do this on one of our books and it works.

What I am sitting with is a smaller question. Every time we make the library
more findable we make it slightly more ordinary. I do not think that is
avoidable. I think the honest version is that being unfindable is not integrity,
it is just being unread, and a place like Kamrunag is better served by people
arriving informed than by our page sounding good to us.

CTA        — Anyone else running a content site and negotiating this?
WHY NOW    — Real, specific, in progress, admits an unresolved tension.
RISK       — none material.
```

---

## 5. Measurement

LinkedIn is a **credibility channel, not a traffic channel.** Judging it on clicks will produce the wrong changes.

| Metric | Weight | Notes |
|---|---|---|
| Partner conversations started | **Primary** | The actual point. Count them manually. |
| Comments from locals, guides, homestay owners, creators | High | Who is commenting matters far more than how many. |
| Profile visits from the target audience | Medium | Needs LinkedIn analytics — not available this session. |
| Followers | Low | Vanity here. |
| Clicks to site | Low | Instagram and Google own traffic. |

No LinkedIn analytics were available this session and **no LinkedIn baseline exists**. The first real measurement requires the founder to supply the page URLs and analytics access.

## 6. Hard rules

- Never auto-post. Drafts only, always.
- Never promise Local Connect. "Working toward", never "we offer".
- No package, booking, pricing, or scarcity language.
- No fabricated traction. If a number is small, use it honestly or leave it out.
- No unverified cultural claim — the website's gate applies here identically.
- No banned language, including in comments and replies.
