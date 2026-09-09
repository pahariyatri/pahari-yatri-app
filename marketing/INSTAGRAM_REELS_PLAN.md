# Instagram Reels Plan — Pahari Yatri

**Date:** 2026-09-09
**Owner:** `instagram-shorts-strategist`
**Status:** drafts only. Nothing scheduled, nothing published. The founder posts.

---

## 1. The formula, unchanged

**Viral hook → real local truth → Yatri lesson → soft CTA**

| Beat | Time | Job |
|---|---|---|
| Hook | 0–3s | Earn the next three seconds. A contradiction, a question, a visual. No logo, no slow intro. |
| Local truth | 3–20s | The thing a tourist would not know. A name, a season, a rule, a person. This is why the account is worth following. |
| Yatri lesson | 20–35s | What the place asks of you. Short. Never preachy. |
| Soft CTA | last 3–5s | One line. Never urgency, never scarcity. |

Content mix: 70% reach, 20% local truth/culture, 10% cinematic-emotional. **The 70% still has to be true.** Reach does not license a scenic montage.

Hinglish hooks are an advantage, not a compromise. Hindi People-also-ask exists for these queries and Hinglish matches the brand's actual voice.

---

## 2. Cadence — 5/week

The existing standard is 4/week. The founder asked for 5. The four defined slots are unchanged; slot 5 is added.

| Slot | Type | Drop if the week collapses? |
|---|---|---|
| 1 | Place / trail (reach) | Yes |
| 2 | **Local truth** | **Never** |
| 3 | **Culture / folklore / temple** | **Never** |
| 4 | Yatri lesson | Yes |
| 5 | Voice of Himalaya (real person) | Ships only when a real consented voice exists |

**If the week falls apart, ship 2 and 3.** Those carry the brand.

**Slot 5 stays empty when no real voice is available, and that is the correct outcome.** Per the audit, zero of the 28 existing stories carry a named human source, so slot 5 cannot be filled from the archive. It is filled by outreach (`OUTREACH_SYSTEM.md`) or not at all. An empty slot is a scheduling gap. A fabricated one is a trust incident.

---

## 3. Links and UTMs

Every Reel links to a **chapter**, never the homepage.

```
https://pahariyatri.com/chapters/{slug}?utm_source=instagram&utm_medium=reel&utm_campaign={campaign}&utm_content={variant}
```

- Lowercase everything. `Instagram` and `instagram` become two separate GA4 rows.
- `utm_medium`: reel | story | short | bio | post
- Campaign naming follows the live convention: **snake_case, one campaign per Reel**, e.g. `har_lake_picnic_spot_nahi_hoti`.
- YouTube Shorts reposts get `utm_source=youtube&utm_medium=short`, same campaign.
- **An untagged link is an untracked link.** `reel_source_visit` will not fire and the Reel's whole contribution is invisible.

**Current blocker:** the Instagram bio link points at the homepage. Until it points at a chapter or a Yatri Circle landing page with a UTM, Reels that say "link in bio" are sending traffic to an untracked destination that is not the chapter. Fix this before running the week below.

---

## 4. Week 1 — Kamrunag

Chapter of the week: **`kamrunag-the-lake-of-oaths`**. Chosen because the SERP is genuinely weak (Wikipedia, hpmandi.nic.in, aggregators, no editorial competitor), the short-video block on those queries confirms Reels are the discovery surface, and the chapter already holds real verified detail.

---

### Reel 1 — Slot 1, place/trail (reach)

```
HOOK          — "Is lake ke andar sona hai. Aaj tak kisi ne nikala nahi."
                (There is gold in this lake. Nobody has ever taken it out.)
STORY ANGLE   — Lead with the fact that is already the search term
                ("Kamrunag Lake gold"), then immediately give it the real
                meaning instead of the mystery. The offerings are not treasure
                nobody found. They are offerings nobody would take.
SCRIPT (15s)  — 0-3s  Hook over the dark water.
                3-12s "Log yahan sadiyon se sikke aur sona daalte aaye hain.
                      Ye Dev Kamrunag ka khazana hai, Mandi ke baarish ke devta.
                      Kuch bhi wapas nahi nikala jaata."
                12-15s "Ye lake picnic spot nahi hai. Ye ek vaada hai."
CAPTION       — Kamrunag Lake, Mandi. 3,334 m.
                People have been offering coins and gold into this water for
                centuries. Nothing is ever taken out.
                It is not treasure that nobody found. It is treasure that nobody
                would touch. The lake belongs to Dev Kamrunag, the rain god of
                Mandi, and the mountain keeps his accounts.
                Full chapter on Pahari Yatri.
VISUAL IDEA   — Open tight on still dark water, no horizon. Pull back slowly to
                reveal the deodar stand and the ridge. Cut to the temple only at
                the lesson beat. No drone spin. No transitions on the beat.
CTA           — "Full story on Pahari Yatri." (link in bio)
UTM           — https://pahariyatri.com/chapters/kamrunag-the-lake-of-oaths
                ?utm_source=instagram&utm_medium=reel
                &utm_campaign=kamrunag_ka_khazana&utm_content=gold_hook
SEO KEYWORDS  — kamrunag lake, kamrunag lake gold, kamrunag mandi,
                dev kamrunag, kamrunag temple
HASHTAGS      — #kamrunag #mandi #himachal #devbhoomi #himachalpradesh
                #pahariyatri #himalayas #mandidistrict
VERIFICATION  — Altitude, the rain-god attribution, the offering tradition and
                the Saranahuli fair are already carried in the chapter. Do NOT
                add a Mahabharata/Bhima origin claim to this script — it appears
                in third-party sources but is not in our chapter and has no named
                local source. local-verification-editor gate before shooting.
```

---

### Reel 2 — Slot 2, local truth (never dropped)

```
HOOK          — "Har lake picnic spot nahi hoti."
                (Not every lake is a picnic spot.)
STORY ANGLE   — The existing approved campaign line, applied where it is most
                literally true. Reuses a hook already validated on Prashar.
SCRIPT (30s)  — 0-3s  Hook, plain text over water.
                3-20s "Himachal mein bahut saari lakes hain jahan aap baith ke
                      khaana kha sakte hain. Ye unmein se nahi hai.
                      Yahan log vaada karne aate hain. Sikke daalte hain, sona
                      daalte hain, aur wapas kuch nahi lete.
                      June mein Saranahuli mela hota hai, hazaaron log dhol aur
                      palkiyon ke saath ye chadhai chadhte hain."
                20-27s "Baaki saal itni khaamoshi hoti hai ki aap apne hi vaade
                      sun sakte ho."
                27-30s CTA.
CAPTION       — Not every lake is a picnic spot.
                Kamrunag is a working shrine. In June, thousands climb the path
                from Rohanda with drums and deities on palanquins for the
                Saranahuli fair. The rest of the year it is quiet enough to hear
                your own promises.
                Six kilometres up from Rohanda, through one of the finest deodar
                stands in Mandi district.
                Come as a yatri.
VISUAL IDEA   — Contrast cut: two seconds of a crowded, littered lakeside
                anywhere in Himachal (no identifying detail, no shaming a
                specific place) → hard cut to Kamrunag's stillness. Hold the
                second shot uncomfortably long.
CTA           — "Read the chapter before you go."
UTM           — https://pahariyatri.com/chapters/kamrunag-the-lake-of-oaths
                ?utm_source=instagram&utm_medium=reel
                &utm_campaign=har_lake_picnic_spot_nahi_hoti
                &utm_content=kamrunag_variant
SEO KEYWORDS  — kamrunag lake trek, kamrunag rohanda, saranahuli fair,
                sacred lakes himachal
HASHTAGS      — #kamrunag #prasharlake #mandi #himachal #devbhoomi
                #responsibletravel #pahariyatri #himalayas
NOTE          — This reuses the approved campaign har_lake_picnic_spot_nahi_hoti,
                already live against Prashar. Keeping the campaign and varying
                utm_content lets GA4 compare the same hook across two chapters.
                That comparison is the actual experiment here.
```

---

### Reel 3 — Slot 3, culture / temple (the moat, never dropped)

```
HOOK          — "Mandir ke bahar joota utarna sirf shuruaat hai."
                (Taking your shoes off outside the temple is only the start.)
STORY ANGLE   — Himachal temple etiquette as practical respect, not as a list of
                prohibitions. The single most useful thing this brand can teach,
                and the chapter every place chapter links to.
SCRIPT (30s)  — 0-3s  Hook.
                3-22s Three concrete things, stated as facts, not commands:
                      the deity travels to fairs and is carried on a rath;
                      there are people who hold actual offices around the deity
                      (kardar, gur, pujari, bajantri) and they are not
                      performing for visitors;
                      photography is a question you ask, not a right you assume.
                22-27s "Har mandir ke apne niyam hain. Poochhna kamzori nahi hai."
                      (Every temple has its own rules. Asking is not weakness.)
                27-30s CTA.
CAPTION       — Himachal temple etiquette, from someone who asked first.
                The deity travels. The people around it hold real offices, not
                costumes. Rules differ from valley to valley and from temple to
                temple, which is exactly why asking beats assuming.
                We would rather publish this than another photo of the door.
VISUAL IDEA   — Hands, feet, thresholds, bells. Deliberately no faces and no
                deity close-ups unless explicitly permitted on the day. The
                restraint is the message and viewers will read it as such.
CTA           — "Read the etiquette chapter before your next temple visit."
UTM           — https://pahariyatri.com/chapters/himachal-temple-etiquette
                ?utm_source=instagram&utm_medium=reel
                &utm_campaign=poochhna_kamzori_nahi&utm_content=etiquette_basics
SEO KEYWORDS  — himachal temple etiquette, temple rules himachal,
                devta culture himachal, himachal temple photography rules
HASHTAGS      — #devbhoomi #himachal #templeetiquette #devtaculture
                #responsibletravel #pahariyatri #kullu #mandi
VERIFICATION  — MANDATORY local-verification-editor gate before shooting.
                Office-holder terms (kardar, gur, pujari, bajantri, mohra, rath)
                and deity travel to fairs are verified against
                kulludussehra.hp.gov.in and are safe to state.
                DO NOT include: menstruation-related access, or entry rules by
                community. Both were removed from the chapter as unsourced and,
                in the second case, unsafe. They do not return via a Reel.
```

---

### Reel 4 — Slot 4, Yatri lesson (filter)

```
HOOK          — "Ek gaon hai jahan sharaab nahi le jaa sakte. Koi rokta nahi hai.
                Fir bhi koi le kar nahi jaata."
                (There is a village where you cannot carry alcohol. Nobody stops
                you. Still, nobody carries it.)
STORY ANGLE   — A rule that holds with no enforcement. The filter Reel — it
                actively repels the audience this brand does not want, which is
                the point of slot 4.
SCRIPT (30s)  — 0-3s  Hook over the walking trail.
                3-20s "Chadhai pe ek ped par board laga hai. Sharaab mana hai,
                      jurmana hai, mehmaanon ke liye bhi koi chhoot nahi.
                      Koi checkpoint nahi hai. Koi guard nahi hai.
                      Log bottle upar le jaate hain aur band ki band wapas le
                      aate hain."
                20-27s "Niyam isliye nahi chalta ki koi dekh raha hai.
                      Isliye chalta hai ki poore gaon ne mil kar tay kiya hai."
                27-30s CTA.
CAPTION       — A signboard on a tree does all the stopping that is needed.
                No checkpoint. No guard. Travellers describe carrying a bottle up
                and carrying it back down unopened, with nobody watching.
                A rule that survives without enforcement tells you a community
                actually believes something. That is more accurate information
                about where you are standing than any view.
                You do not have to agree with a village's rules. You do have to
                know they exist before you arrive with your habits.
VISUAL IDEA   — The signboard, the trail, the walk back down. Do not film the
                village as a destination and do not make it look inviting.
                This Reel should make the wrong viewer scroll past.
CTA           — "Read the chapter before you walk up."
UTM           — https://pahariyatri.com/chapters/grahan-protects-its-traditions
                ?utm_source=instagram&utm_medium=reel
                &utm_campaign=niyam_bina_pehredaar&utm_content=alcohol_rule
SEO KEYWORDS  — grahan village parvati valley, parvati valley village rules,
                kasol responsible travel, himachal village customs
HASHTAGS      — #parvativalley #kasol #himachal #responsibletravel
                #slowtravel #pahariyatri #himalayas
VERIFICATION  — The rule and the signboard are safe. The origin story (a shared
                village vision) is how the story is locally told and is NOT
                verified history — our own story file hedges it exactly that way
                and the Reel must too, or omit it. The traveller experience comes
                from a labelled editorial composite, so the caption says
                "travellers describe", never "I carried".
RISK          — Do not turn the village into a destination. If this Reel performs,
                it increases footfall to a place whose whole point is restraint.
                Watch the comments; if they turn into "where is this", reply with
                the etiquette chapter, not the location.
```

---

### Reel 5 — Slot 5, Voice of Himalaya

```
STATUS        — NOT PRODUCIBLE THIS WEEK. Slot intentionally empty.
WHY           — Requires one real, named, consented person: local voice,
                traveller voice, or founder voice, with person + place +
                emotion + lesson. Zero of the 28 existing stories carry a named
                human source, so nothing in the archive qualifies.
UNBLOCK       — OUTREACH_SYSTEM.md §4 (story submission requests). Founder sends
                personally. First consented voice fills this slot.
INTERIM       — If the founder wants slot 5 filled before outreach lands, the
                only honest option is a FOUNDER voice Reel: the founder's own
                first-person experience, own opinion, no claims about anyone
                else's beliefs. That requires no external consent and is
                genuinely a real voice.
DO NOT        — Do not fill this slot by voicing a "Yatri Reflection" composite
                as though it were an interview. That converts a correctly
                labelled editorial composite into a fabricated testimonial the
                moment it is spoken in first person on camera.
```

---

## 5. YouTube Shorts reposts

All five reposted within 48 hours. Same campaign, `utm_source=youtube&utm_medium=short`.

| Reel | Shorts title (searchable, literal) |
|---|---|
| 1 | Kamrunag Lake: The Gold Nobody Takes Out \| Mandi, Himachal |
| 2 | Why Kamrunag Lake Is Not a Picnic Spot \| Himachal |
| 3 | Himachal Temple Etiquette: What to Know Before You Enter |
| 4 | The Parvati Valley Village Where a Rule Holds Without Guards |
| 5 | — |

Rules: searchable literal titles (the poetic version stays on the Reel), strong first line, **pinned comment linking to the chapter with the Shorts UTM**, no hashtag stuffing.

## 6. Facebook

3/week, adapted reposts of Reels 1, 2 and 3. Facebook is the repost/trust/older-audience layer, not primary growth. Copy-paste where it works; adapt only the caption length. No ads, ever.

---

## 7. Measurement

**24h — did the plumbing work?** `reel_source_visit` for the campaign must be non-zero and `chapter_view` should roughly match. A gap means people tapped and did not land. Do not judge the content yet. Use **GA4 Realtime** — standard reports lag 24–48h.

**72h — did it persuade?** `join_yatri_circle_click` / `whatsapp_join_click` above zero, then `apply_start`. Apply the promotion bar: a Reel earns a chapter upgrade when it hits **2 of 4** — saves above recent median, shares above median, comments asking real questions, strong watch-through past the local-truth beat.

**7d — worth repeating?** `apply_submit` attributable to the campaign. Is `chapter_view` still trickling without the Reel pushing? Would you make this again?

**Baseline caveat:** no GA4 or Instagram Insights data was available this session. "Above recent median" has **no median on record yet**. Week 1 establishes the baseline; the promotion bar becomes meaningful from week 2. Do not retro-fit a median.

**Verify in Chrome, not Brave.** Brave Shields blocks googletagmanager.com — events push to the dataLayer and never reach GA4 or Meta.

## 8. Hard rules

- Never a random scenic montage.
- Never banned language: hidden gem, must visit, best places, package, book now, secret trail, limited journeys.
- Never fiction as the main identity.
- Never publish. Drafts only. The founder posts.
- Never run or boost ads.
- Every cultural claim clears `local-verification-editor` **before shooting**, not before posting.

---

## September 2026 (weeks of Sep 9, Sep 15, Sep 22, Sep 29)

**Added:** 2026-09-09. Extends the existing Week 1 (Kamrunag) plan above, does not replace it. Structure, formula, slot definitions and UTM convention are unchanged. Drafts only. The founder posts.

---

### 9.0 Slot 5 sourcing constraint — read before scripting anything in this section

**No Reel in this section may quote, paraphrase, or imply a real named local person. No consented named source exists on file.**

Audit §10, re-confirmed: **zero of the 28 stories in `data/stories/` carry a named human source.** Eight are correctly hedged editorial composites. Twenty are unlabelled and read as real interviewed people. That second group is the danger — a composite that is merely written in third person is a labelling problem; the same composite spoken in first person on camera is a fabricated testimonial.

Named people appear inside chapter narratives (`chandernahan-lake-trek` names a shepherd "Chatru"; `parashar-lake-trek` has "an old man with a brass pot"; `understanding-parvati-valley` has "a homestay owner near Barshaini"; `tosh-village-above-the-valley` has "a shopkeeper"). **None of these are consented sources.** Do not voice them. Do not caption them. Do not put them on screen.

So every week below gives slot 5 in two forms:

- **(a) Real-voice version — BLOCKED.** Named, with the exact consent and sourcing needed to unblock it. Unblocks via `OUTREACH_SYSTEM.md` §4 Template C, which already carries the consent terms: talk in their language, they review before publish, nothing goes up until they confirm, name optional, withdrawal honoured even after publishing.
- **(b) Shippable fallback — EDITORIAL, NARRATED.** Must carry the on-screen line, verbatim, in the first three seconds and again in the caption: **"This is Pahari Yatri reading the valley, not a resident speaking."** No first-person claim to have been told anything by anyone.

**Never write a fabricated quote.** An empty slot 5 is a scheduling gap. A fabricated one is a trust incident, and this account has 29 real named 5★ Google reviewers who would be the first to notice.

**Additional constraint carried into this section:** a **founder** voice Reel is honest, because the founder is a real named person consenting to themselves. It is used exactly once below (week of Sep 29) and only if the founder has genuinely done the thing described.

---

### 9.1 Production reality — state this before planning 20 Reels

Audit §3: **2 pieces of content in the last 28 days.** This section schedules 16 new Reels across three and a half weeks. That is roughly an 8× production increase and it will not happen by being written down.

The collapse ladder, applied per week, in this order:

| If you can ship | Ship |
|---|---|
| 5 | All five slots |
| 4 | Slots 1, 2, 3, 4 |
| 3 | Slots 2, 3, 4 |
| 2 | **Slots 2 and 3.** Non-negotiable. |
| 1 | Slot 2 |

A week where only slots 2 and 3 shipped is a **successful** week under the existing rule, not a failure to apologise for.

**Bio link:** `app/start/` now exists in the repo (shipped 2026-09-09). Point the bio link there:
`https://pahariyatri.com/start?utm_source=instagram&utm_medium=bio&utm_campaign=bio_start_page`
Per-Reel campaigns stay on chapter URLs regardless.

---

### 9.2 Week of Sep 9 — already scripted, one gap to close

Slots 1–4 for this week are already drafted above (Kamrunag ×2, temple etiquette, Grahan). Do not re-script them and do not renumber their campaigns — `kamrunag_ka_khazana`, `har_lake_picnic_spot_nahi_hoti`, `poochhna_kamzori_nahi`, `niyam_bina_pehredaar` are the live values.

The only open item is slot 5, which was correctly left empty. Here it is in the two required forms.

#### Reel 5 — Slot 5, Voice of Himalaya (a) REAL VOICE — BLOCKED

```
STATUS        — BLOCKED. Do not shoot.
THE REEL      — A Mandi resident who has actually climbed to Kamrunag for the
                Saranahuli fair, on their own terms, describing what an offering
                at that lake means to the person making it. Not what it looks
                like. What it means.
WHY BLOCKED   — No named, consented source exists. Nothing in data/stories/
                qualifies. The chapter's own material is researched, not
                interviewed.
TO UNBLOCK, NEEDED IN WRITING —
                1. Full name, correctly spelled, and village.
                2. Their actual relationship to Kamrunag (born in the area?
                   attends the fair? holds an office around the devta?). This
                   decides what they are entitled to speak to.
                3. Recorded or written consent covering: publication, their name
                   appearing or not appearing (their choice), review of the cut
                   before it goes live, and withdrawal at any point including
                   after publishing.
                4. Language of their choosing. Subtitles are our job, not theirs.
                5. local-verification-editor pass on any devta, ritual or fair
                   detail they describe, before drafting.
ROUTE         — OUTREACH_SYSTEM.md §4, Template C. Founder sends personally.
                Highest-priority candidate pool: the 29 named 5★ Google reviewers
                (audit §7, §10) — already public, already consenting reviewers of
                the real business, already saying things like "it felt more like a
                journey than just a trek."
DO NOT        — Do not voice a "Yatri Reflection" composite as an interview.
                Do not use the chapter narrative's unnamed figures.
```

#### Reel 5 — Slot 5 (b) SHIPPABLE FALLBACK — editorial, narrated

```
SLOT          — 5, Voice of Himalaya (editorial substitute)
HOOK (0-3s)   — "Ye ek local ki awaaz nahi hai. Ye hum hain, is jheel ko padhte
                hue."
                On-screen text, held the full 3s, verbatim:
                "This is Pahari Yatri reading the valley, not a resident speaking."
VISUAL / SHOTS— 1. 0-3s: still dark water, no horizon, no movement. Disclosure
                   line over it. No music yet.
                2. 3-10s: slow push in on the water surface only.
                3. 10-20s: the deodar stand, mid-shot, static tripod. No faces.
                4. 20-27s: the temple structure at a distance, never the sanctum,
                   never a person praying.
                5. 27-32s: cut to black, CTA card.
                No drone. No speed ramps. No transitions on the beat. The
                restraint is the argument.
VOICEOVER (32s, verbatim) —
                "Hum aapko ye nahi bata sakte ki Kamrunag mein sikka daalne wale
                insaan ke dil mein us waqt kya chalta hai.
                Hamare paas uski awaaz nahi hai.
                Jo hamare paas hai wo ye hai: ye jheel Mandi ke baarish ke devta
                ki hai, log yahan sadiyon se chadhava daalte aaye hain, aur
                aaj tak kuch wapas nahi nikaala gaya.
                Iske aage jo hai, wo hamara kehne ka haq nahi hai. Jab tak koi
                Mandi se khud aa kar na kahe, hum uske shabd nahi likhenge.
                Tab tak, hum sirf itna keh sakte hain: kuch jagahein aapse chup
                rehne ko kehti hain, aur wahi kaafi hai."
CAPTION (verbatim) —
                This is Pahari Yatri reading the valley, not a resident speaking.

                We can tell you what is documented about Kamrunag. The altitude,
                the rain god of Mandi, the offerings that go in and never come
                out, the Saranahuli fair in June.

                We cannot tell you what it feels like to be the person making
                that offering, because nobody from Mandi has told us, on record,
                with their name on it. So we are not going to write it for them.

                When someone does, their name goes on it, and they get to change
                their mind afterwards.
CTA (verbatim)— "Full story on Pahari Yatri."
DESTINATION   — https://pahariyatri.com/chapters/kamrunag-the-lake-of-oaths?utm_source=instagram&utm_medium=reel&utm_campaign=hum_kya_nahi_keh_sakte&utm_content=editorial_narration
utm_campaign  — hum_kya_nahi_keh_sakte
HASHTAGS      — #kamrunag #mandi #himachal #devbhoomi #responsibletravel
                #pahariyatri
VERIFICATION  — Every factual line is already carried in the chapter. Nothing new
                is asserted. No Mahabharata/Bhima origin claim.
RISK          — This Reel is about our own sourcing gap. It will read as integrity
                to some and as navel-gazing to others. If comments turn hostile,
                do not defend it — reply with the chapter link and stop.
```

**Shorts repost, week of Sep 9:** priority repost if only one ships within 48h is **Reel 1**, title `Kamrunag Lake: The Gold Nobody Takes Out | Mandi, Himachal`, pinned comment to `https://pahariyatri.com/chapters/kamrunag-the-lake-of-oaths?utm_source=youtube&utm_medium=short&utm_campaign=kamrunag_ka_khazana&utm_content=gold_hook`.

---

### 9.3 Week of Sep 15 — the valley past the road

Chapter cluster: the four Parvati villages the road does not reach, plus Manikaran.

#### Reel 1 — Slot 1, place/trail (reach)

```
SLOT          — 1, place/trail (reach)
HOOK (0-3s)   — "Is gaon tak aaj tak koi sadak nahi pahunchi. Ye planning ki
                kami nahi hai."
VISUAL / SHOTS— 1. 0-3s: boots on the footpath, low angle, steep gradient
                   visible. Hook text over it.
                2. 3-8s: the Barshaini roadhead behind, parked taxis, then a
                   deliberate turn away from them.
                3. 8-16s: the climb, one unbroken handheld take, breathing
                   audible. Do not cut the effort out; the effort is the story.
                4. 16-24s: first wooden roofs through the pines, apple trees
                   running right up to the houses.
                5. 24-30s: a ground-floor doorway with animals inside, people's
                   floor above it. Wide, no faces.
VOICEOVER (30s, verbatim) —
                "Barshaini se Kalga tees se paitalis minute ki chadhai hai. Koi
                road nahi hai, aur koi bana bhi nahi raha.
                Chalees-pachaas ghar hain, purane tareeke se bane hue, patthar
                aur lakdi ke. Neeche jaanwar, upar log. Ye design ki soch nahi
                hai, ye thand ka jawab hai.
                Ek baat aur, jo koi guide nahi batata: Kalga ki asli oonchai
                par sources aapas mein hi sehmat nahi hain. Do sau meter ka
                antar hai. Hum ek number chun kar aapko sahi hone ka dhokha
                nahi denge.
                Jo pakka hai wo ye hai: yahan pahunchne ka ek hi tareeka hai,
                aur wo paidal hai."
CAPTION (verbatim) —
                No road reaches Kalga. Thirty to forty five minutes uphill from
                Barshaini, and that is the only way in.

                Forty to fifty houses, stone and wood, animals on the ground floor
                and people above them. That arrangement is a cold-climate answer,
                not a design choice made for visitors.

                Sources disagree about Kalga's altitude by roughly 200 metres. We
                are not picking one to sound precise. A village this photographed
                has not been surveyed to the standard travellers assume, and that
                gap is worth sitting with.

                Rooms run about 500 to 1,500 rupees. That is what the village
                costs to live in, not a discount performed for anyone.
CTA (verbatim)— "Full story on Pahari Yatri."
DESTINATION   — https://pahariyatri.com/chapters/kalga-slow-mountain-life?utm_source=instagram&utm_medium=reel&utm_campaign=kalga_tak_sadak_nahi&utm_content=no_road_hook
utm_campaign  — kalga_tak_sadak_nahi
HASHTAGS      — #kalga #parvativalley #himachal #slowtravel #kullu
                #responsibletravel #pahariyatri
VERIFICATION  — Every figure is from the chapter and is already hedged there.
                Do NOT state a single altitude. Do NOT name a homestay.
```

#### Reel 2 — Slot 2, local truth (never dropped)

```
SLOT          — 2, local truth
HOOK (0-3s)   — "Yahan tak sadak nahi hai. Par network poora chalta hai."
VISUAL / SHOTS— 1. 0-3s: river crossing on foot, water loud, phone in hand
                   showing full bars. That single frame IS the hook.
                2. 3-12s: the deodar forest walk in. Trunks wide enough that the
                   shot needs no scale reference.
                3. 12-20s: a homestay balcony, a laptop open on it, apple trees
                   behind. Held long, unglamorous.
                4. 20-27s: the waterfall, audible before it is visible — let the
                   sound arrive two seconds before the picture.
                5. 27-30s: CTA card.
VOICEOVER (30s, verbatim) —
                "Pulga tak koi gaadi nahi jaati. Barshaini se nadi paar kar ke
                pandrah se chaalis minute paidal.
                Aur phir bhi, is gaon mein phone aur internet dono theek chalte
                hain. Aas paas ke kai gaon mein nahi chalte. Pulga mein chalte
                hain.
                Isi ek practical baat ne tay kiya hai ki yahan kaun rukta hai.
                Log ek shaam ke liye aate hain aur teen hafte kaam kar ke jaate
                hain.
                Raaste ka jungle bhi hai. Locals use Fairy Forest kehte hain. Ye
                naam bahar se nahi aaya, yahin ka hai. Ye naam shuru kahan se
                hua, wo humein aaj tak kisi source mein pukka nahi mila, aur hum
                bana kar nahi likhenge."
CAPTION (verbatim) —
                Pulga has no road and reliable internet at the same time. Both
                things are true and neither cancels the other.

                Fifteen to forty minutes on foot across the river from Barshaini,
                about 2,210 metres. The connectivity is unusual for a village this
                hard to reach, and it is the actual reason Pulga fills with people
                who stay for weeks instead of an afternoon. That is a service-level
                fact, not something to romanticise.

                The deodar forest on the way in is called the Fairy Forest by
                people who live here. It is a real local name, not a phrase
                invented for visitors. Where the name started, we could not
                confirm, so we are not going to tell you.
CTA (verbatim)— "Read the chapter before you plan a week here."
DESTINATION   — https://pahariyatri.com/chapters/pulga-forests-and-silence?utm_source=instagram&utm_medium=reel&utm_campaign=sadak_nahi_network_hai&utm_content=connectivity_truth
utm_campaign  — sadak_nahi_network_hai
HASHTAGS      — #pulga #parvativalley #himachal #kullu #slowtravel
                #responsibletravel #pahariyatri
NOTE          — Strongest differentiation Reel of the week. Every competitor
                sells Pulga as remote. The interesting fact is that it is remote
                AND connected, and that combination is what actually decides who
                ends up there.
```

#### Reel 3 — Slot 3, culture / temple (the moat, never dropped)

```
SLOT          — 3, culture / temple
HOOK (0-3s)   — "Ek garam paani ka chashma. Do dharm. Kisi ne doosre ko jaane
                ke liye nahi kaha."
VISUAL / SHOTS— 1. 0-3s: steam coming off the river surface, tight, no context
                   yet. Hook text over it.
                2. 3-10s: pull wide to show the gurudwara and the temple standing
                   close together in one frame. Hold it 4 full seconds — this is
                   the entire thesis of the Reel.
                3. 10-20s: langar hall. Long steel tables, hands serving dal. No
                   faces without permission asked on the day.
                4. 20-27s: the springs, from a respectful distance.
                5. 27-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Manikaran mein ek hi garam chashme ke aas paas do alag alag
                parampara khadi hain.
                Sikh parampara kehti hai ki Guru Nanak Dev Ji, Bhai Mardana ke
                saath, solahvi sadi mein yahan aaye, aur ek patthar uthaya jiske
                neeche se ye garmi nikli. Aaj usi garmi par gurudwara ka langar
                pakta hai.
                Hindu parampara kehti hai ki ye Shiv aur Parvati ki jagah hai.
                Manikaran ka matlab hai jadau baali. Wo baali is nadi mein kho
                gayi thi.
                Dono kahaniyan yahan poori sanjeedgi se maani jaati hain. Ye
                koi modern tolerance ka gesture nahi hai. Ye bahut purana
                intezaam hai.
                Ek baat saaf: kai log maante hain ki ye paani bimari theek karta
                hai. Ye vishwas asli hai. Par ye medical dawa hai, ye hum nahi
                keh sakte."
CAPTION (verbatim) —
                One hot spring at Manikaran, two traditions, and neither one asked
                the other to leave.

                Sikh tradition holds that Guru Nanak Dev Ji, travelling with Bhai
                Mardana in the early 16th century, revealed the spring when the
                community needed food. The gurudwara's langar still cooks on that
                heat. Hindu tradition ties the same site to Shiva and Parvati, and
                to a lost jewelled earring recovered from the river. Manikaran
                means jewelled earring.

                Both are held seriously here. The gurudwara and the temple standing
                a short walk apart is not a modern gesture. It has been like that a
                very long time.

                Some pilgrims come believing the water eases skin conditions or
                joint pain. That belief is real and widely held. We are not going to
                present it as medicine, because we cannot verify it as medicine.

                The langar feeds everyone without asking what you believe.
CTA (verbatim)— "Read the Manikaran chapter before you go."
DESTINATION   — https://pahariyatri.com/chapters/manikaran-sahib-and-its-culture?utm_source=instagram&utm_medium=reel&utm_campaign=ek_chashma_do_kahaniyan&utm_content=two_traditions
utm_campaign  — ek_chashma_do_kahaniyan
HASHTAGS      — #manikaran #manikaransahib #parvativalley #himachal #langar
                #devbhoomi #pahariyatri
VERIFICATION  — MANDATORY local-verification-editor gate before shooting. Both
                origin traditions and the healing hedge are carried verbatim in
                the chapter and are safe as written. Do NOT adjudicate between
                the two traditions, do not rank them, and do not film inside the
                gurudwara or temple without asking on the day.
```

#### Reel 4 — Slot 4, Yatri lesson (filter)

```
SLOT          — 4, Yatri lesson
HOOK (0-3s)   — "Kheerganga mein raat rukna ab allowed nahi hai. Aur zyadatar
                itineraries abhi bhi purani hain."
VISUAL / SHOTS— 1. 0-3s: the meadow, wide, EMPTY of tents. Hook text over it.
                   The absence in the frame is the point.
                2. 3-10s: the climb from Barshaini, Nakthan, Rudranag shrine.
                3. 10-20s: steam off the spring pool. No bodies in frame, no
                   bathing footage, nothing that could read as an invitation to
                   treat it as an amenity.
                4. 20-28s: walking DOWN. Deliberately end on the descent.
                5. 28-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "July 2024 se Himachal Forest Department ne Kheerganga meadow par
                overnight camping band ki hai, High Court ke nirdesh ke baad,
                kyunki saalon ke tents aur kachre ne jagah ko nuksaan pahunchaya.
                Matlab ye ab ek day trek hai. Kaam ka niyam ye hai: das baje se
                pehle pahunchiye, nahaaiye, do baje tak utarna shuru kar dijiye.
                Aap online jo do din ek raat wale plan dekhte hain, wo bata rahe
                hain ki ye trek pehle kaise chalta tha, aaj kya allowed hai wo
                nahi.
                Aur kund ke apne niyam hain. Mard aur aurton ke alag enclosures.
                Sabun bilkul nahi. Subah aur shaam awaaz dheemi.
                Ye pehle ek chadhava hai, uske baad ek suvidha."
CAPTION (verbatim) —
                Overnight camping at Kheerganga has been banned since July 2024 by
                the Himachal Pradesh Forest Department, following a High Court
                directive after years of tent and waste damage to the meadow.

                It is a day trek now. Arrive before 10 am, bathe, begin descending
                by 2 pm. Any two day one night itinerary you find online is
                describing how this used to be walked, not what is currently
                allowed.

                The pool has its own rules. Separate enclosures for men and women,
                no soap at all, low voices at dawn and dusk.

                Rules change. Check the current forest department notice before you
                plan around either version, including this one.
CTA (verbatim)— "Read the chapter before you plan Kheerganga."
DESTINATION   — https://pahariyatri.com/chapters/kheerganga-buni-buni-pass?utm_source=instagram&utm_medium=reel&utm_campaign=kheerganga_ab_day_trek_hai&utm_content=camping_ban
utm_campaign  — kheerganga_ab_day_trek_hai
HASHTAGS      — #kheerganga #parvativalley #himachal #kullu #trekking
                #responsibletravel #pahariyatri
VERIFICATION  — **HARD GATE, DO NOT SKIP.** The chapter's ban information is
                sourced to July 2024. This Reel publishes in September 2026.
                A two-year-old rule stated as current is the single most likely
                factual failure in this whole month's plan.
                Before shooting: re-verify the ban's current status with a
                Himachal Pradesh Forest Department notice or a current local
                source, and update or pull this Reel accordingly. The caption's
                closing line ("Rules change... including this one") is the
                minimum hedge and is not a substitute for re-verification.
RISK          — This Reel tells people they cannot do the thing they came to
                Instagram to plan. That is exactly what slot 4 is for. Expect
                lower saves and higher comment volume than slot 1.
```

#### Reel 5 — Slot 5, Voice of Himalaya

```
(a) REAL VOICE — BLOCKED
THE REEL      — A Kalga or Pulga homestay host on what having no road actually
                costs them — carrying supplies up, a medical emergency, a winter —
                against what it protects. The honest version of a fact that every
                travel account romanticises.
TO UNBLOCK    — Same five requirements as §9.2(a): name + village, their real
                relationship to the place, written/recorded consent covering
                publication, naming, pre-publication review and withdrawal,
                their language, and a local-verification-editor pass on anything
                cultural. OUTREACH_SYSTEM.md §4 Template C.
DO NOT        — data/stories/ contains "the-day-i-stopped-checking-my-phone" and
                "two-weeks-that-were-supposed-to-be-two-days", both attached to
                the Kalga chapter. These are traveller-perspective pieces with no
                named consented source. Not eligible for this slot in any form.
```

```
(b) SHIPPABLE FALLBACK — editorial, narrated
SLOT          — 5, Voice of Himalaya (editorial substitute)
HOOK (0-3s)   — "Aapne Parvati Valley dekhi, ya sirf Kasol dekha?"
                On-screen text, held the full 3s, verbatim:
                "This is Pahari Yatri reading the valley, not a resident speaking."
VISUAL / SHOTS— 1. 0-3s: the Kasol cafe strip, handheld, busy, ordinary. Hook and
                   disclosure text over it.
                2. 3-9s: the road narrowing past Kasol, one continuous car-window
                   shot. No music swell.
                3. 9-16s: Kalga's footpath. Then Pulga's river crossing. Then
                   Tosh's uphill. Three separate villages, three separate walks,
                   cut plainly with no transitions.
                4. 16-26s: static wide of each village, four seconds each. Let
                   them look different from each other, because they are.
                5. 26-30s: CTA card.
VOICEOVER (30s, verbatim) —
                "Jo log kehte hain ki wo Parvati Valley ho aaye, unmein se
                zyadatar Kasol ho aaye hain.
                Ye taana nahi hai. Kasol jaane laayak hai. Par wo ghaati ka
                darwaza hai, ghaati nahi.
                Kalga seb ki fasal ke hisaab se chalta hai. Pulga wahan ke
                network ke hisaab se. Tosh apne backpacker season ke hisaab se,
                jiski apni alag etiquette hai. Malana apni council ke hisaab se,
                jo zyadatar aane walon ne kabhi baithi hui nahi dekhi.
                Inmein se koi bhi Kasol ka doosra naam nahi hai.
                Hum ye nahi keh rahe ki ye baat inhone humein khud batayi. Hum ye
                keh rahe hain ki farq dekhna mushkil nahi hai, agar aap Kasol ke
                aage chal kar dekhein."
CAPTION (verbatim) —
                This is Pahari Yatri reading the valley, not a resident speaking.

                Most people who say they have done Parvati Valley have done Kasol.
                Kasol is genuinely worth the visit. It is also the front door.

                Kalga runs on apple harvest time. Pulga runs on connectivity nobody
                expects it to have. Tosh runs on a backpacker season with its own
                etiquette. Malana runs on a local council most visitors never see in
                session. None of them is Kasol under a different name.

                Kasol's identity came from a specific history, decades of backpacker
                culture from the 1990s onward. Every village past it has a history
                that has nothing to do with that one.
CTA (verbatim)— "Full story on Pahari Yatri."
DESTINATION   — https://pahariyatri.com/chapters/understanding-parvati-valley?utm_source=instagram&utm_medium=reel&utm_campaign=yeh_ghaati_kasol_nahi_hai&utm_content=editorial_narration
utm_campaign  — yeh_ghaati_kasol_nahi_hai
HASHTAGS      — #parvativalley #kasol #himachal #kullu #slowtravel
                #responsibletravel #pahariyatri
VERIFICATION  — All four village characterisations are carried verbatim in
                understanding-parvati-valley's localTruth field. The chapter's
                narrative contains an unnamed "homestay owner near Barshaini" —
                that line is deliberately NOT used in this script.
```

**YouTube Shorts repost, week of Sep 15.** Given the channel has exactly one Short in its entire history, the realistic commitment is one per week, done properly:

- **Repost: Reel 2 (Pulga).** Most literally searchable, least likely to be misread out of context.
- **Shorts title:** `Pulga, Parvati Valley: No Road In, But the Internet Works`
- **Pinned comment:** `Full chapter: https://pahariyatri.com/chapters/pulga-forests-and-silence?utm_source=youtube&utm_medium=short&utm_campaign=sadak_nahi_network_hai&utm_content=connectivity_truth`
- Second priority if bandwidth exists: Reel 4, title `Kheerganga Camping Ban: What Is Actually Allowed Now`, same campaign, `utm_source=youtube&utm_medium=short`. Only after the ban re-verification gate clears.

Facebook: Reels 1, 2, 3 crossposted. No new copy.

---

### 9.4 Week of Sep 22 — Mandi's sacred ground

Chapter cluster: Mandi district lakes and temples.

#### Reel 1 — Slot 1, place/trail (reach)

```
SLOT          — 1, place/trail (reach)
HOOK (0-3s)   — "Is jheel par ek island hai jo saal bhar mein poori jheel ghoom
                leta hai."
VISUAL / SHOTS— 1. 0-3s: the island, tight, centred, absolutely still frame so
                   the viewer looks for movement. Hook text over it.
                2. 3-10s: locked-off wide of the lake with the island small in
                   frame. If you have two shots from different days at the same
                   angle, cut between them — that comparison is the Reel.
                3. 10-18s: the three-storey deodar temple leaning over its own
                   reflection. Tilt up the carving slowly.
                4. 18-26s: the meadow, wind moving the grass. One shot, no cuts.
                5. 26-30s: CTA card.
VOICEOVER (30s, verbatim) —
                "Parashar jheel, Mandi, kareeb do hazaar saat sau tees meter.
                Paani par mitti aur ghaas ka ek chhota sa island hai jo tairta
                hai. Wo ek jagah nahi rukta.
                Kinare par teen manzil ka deodar ka mandir hai, Parashar Rishi
                ka, sadiyon purana.
                Yahan log jheel ko sundar nahi kehte. Wo kehte hain ki ye jaagi
                hui hai. Aap khud hi apni awaaz dheemi kar lete ho, bina tay
                kiye.
                Aur ek baat jo aapko yahan sunne ko milti hai: log kehte hain ki
                is jheel ki gehrai kisi ne aaj tak nahi paayi. Ye yahan ki kahi
                hui baat hai, koi survey nahi. Hum wo waise hi de rahe hain jaise
                ye kahi jaati hai."
CAPTION (verbatim) —
                Parashar Lake sits at about 2,730 metres in Mandi district, and a
                small island of matted earth drifts across it. It does not stay in
                one place.

                A three storey deodar pagoda temple to the sage Parashar Rishi
                leans over the water. Local belief holds the island's movement is
                sacred.

                You will also hear that nobody has ever found the lake's bottom.
                That is a thing people here say, not a survey result, and we are
                passing it on as exactly that.

                People here do not call the lake beautiful. They say it is awake.
                Most visitors lower their voice without deciding to.
CTA (verbatim)— "Full story on Pahari Yatri."
DESTINATION   — https://pahariyatri.com/chapters/parashar-lake-trek?utm_source=instagram&utm_medium=reel&utm_campaign=island_jo_ghoomta_hai&utm_content=floating_island
utm_campaign  — island_jo_ghoomta_hai
HASHTAGS      — #parasharlake #prasharlake #mandi #himachal #devbhoomi
                #pahariyatri
VERIFICATION  — The chapter's narrative attributes the depth claim to "an old man
                circling the lake with a brass pot." He is NOT a consented
                source. The script says "log kehte hain" and never quotes or
                describes him. Do not put him back in.
                Do NOT reuse the har_lake_picnic_spot_nahi_hoti campaign here —
                that hook is already live against Prashar and a second campaign
                on the same chapter with the same hook would split GA4 rows for
                no experimental gain.
```

#### Reel 2 — Slot 2, local truth (never dropped)

```
SLOT          — 2, local truth
HOOK (0-3s)   — "Ek hi devta tak do raste jaate hain. Zyadatar log sirf ek jaante
                hain."
VISUAL / SHOTS— 1. 0-3s: a trail forking, filmed from the fork itself. Hook text.
                2. 3-9s: the Rohanda side. Crowds, drums if the season allows,
                   movement, energy. Fast cuts here, deliberately.
                3. 9-20s: hard cut to the Saroa side. Oak closing over the path.
                   Long, slow, one take, ambient sound only. The edit rhythm
                   change carries the whole idea.
                4. 20-26s: the lake arriving sideways through trees, not a reveal
                   shot. Undersell it on purpose.
                5. 26-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Kamrunag tak jaane ke do raste hain.
                Rohanda wala chhota hai, bhara hua hai, teerthyatriyon ka rasta.
                June ki Saranahuli ke waqt yahi rasta chalta hai.
                Saroa wala lamba hai, khaali hai, aur jungle ke through jaata hai.
                Chaar se paanch ghante oak aur deodar ke andar. Ye rasta paise
                nahi maangta, dhyaan maangta hai, kyunki trail baar baar
                jaanwaron ke raaston mein mil jaata hai.
                Aur Saroa mein ek baat hai jo koi app nahi bata sakta: gaon mein
                puchhiye ki koi aapke saath chal sakta hai kya. Isliye nahi ki
                rasta khatarnak hai. Isliye ki raaste ki kahaniyan signboard mein
                nahi, logon mein rehti hain. Aur ek din ki mazdoori ka yahan
                matlab hota hai."
CAPTION (verbatim) —
                There are two ways to Kamrunag and most people only know one.

                Rohanda is shorter and busier, the pilgrim's route, and the one that
                carries the June Saranahuli fair. Saroa is longer, quieter, and runs
                four to five hours through oak and deodar from near the Chail Chowk
                road. It reaches the lake from its gentler shoulder at about 3,334
                metres.

                The Saroa path braids into cattle trails in places, so it asks for
                attention rather than fitness.

                Ask in Saroa whether someone can walk it with you. Not because it is
                dangerous. Because the path's stories live in people, not signboards,
                and a day's wage means something there.

                Same sacred ground either way, so the same etiquette applies at the
                water.
CTA (verbatim)— "Read the chapter before you pick a route."
DESTINATION   — https://pahariyatri.com/chapters/saroa-to-kamrunag?utm_source=instagram&utm_medium=reel&utm_campaign=do_raste_ek_devta&utm_content=saroa_route
utm_campaign  — do_raste_ek_devta
HASHTAGS      — #kamrunag #saroa #mandi #himachal #devbhoomi #trekking
                #pahariyatri
NOTE          — This Reel does two jobs at once: it is genuinely useful route
                information nobody else publishes, and it puts money toward a
                local walking companion without ever using the word package or
                selling anything. That is the honest version of the bridge.
```

#### Reel 3 — Slot 3, culture / temple (the moat, never dropped)

```
SLOT          — 3, culture / temple
HOOK (0-3s)   — "Is mandir ki chhat nahi hai. Aur ab koi banane ki koshish nahi
                karta."
VISUAL / SHOTS— 1. 0-3s: look straight UP from inside the shrine. Open sky where
                   a ceiling should be. Hook text. This is the whole Reel in one
                   frame — do not open on anything else.
                2. 3-10s: the deodar and kharsu oak forest on the climb from
                   Devidarh. Green filtered light.
                3. 10-18s: the treeline giving out, grass taking over, the ridge.
                4. 18-26s: the stone shrine open to the sky, wide. In winter,
                   snow sitting inside the sanctum, if that shot exists — it is
                   the strongest image this account owns.
                5. 26-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Shikari Devi, teen hazaar teen sau unsath meter. Mandi zile ka
                sabse ooncha point.
                Yahan ki maanyata ye hai ki jitni baar bhi mandir par chhat
                dalne ki koshish hui, wo gir gayi ya jal gayi. To dalna band kar
                diya gaya. Devi ko khula aasman chahiye.
                Ye ek maanyata hai, itihaas ka record nahi. Hum ise waise hi de
                rahe hain jaise ye yahan kahi jaati hai.
                Jo dikhta hai wo ye hai: sardi mein garbhagrih ke andar baraf
                padi rehti hai, aur kisi ko usse dikkat nahi hai.
                Ek aur baat, kyunki ye zaroori hai: ye poora jungle wildlife
                sanctuary hai. Bhaalu ka ilaka. Akele mat chaliye, aur ghane
                hisson mein apni aahat hone dijiye."
CAPTION (verbatim) —
                Shikari Devi is 3,359 metres, the highest point of Mandi district,
                and the temple at the top has no roof.

                Local belief holds that every roof raised over the goddess fell or
                burned, so they stopped raising them. That is belief, told the way it
                is told here, not a documented history. What you can see is simpler:
                snow sits inside the sanctum in winter and nobody treats that as a
                problem.

                Locals climb for the darshan. The view from the Dhauladhar to the
                Kinnaur ranges is real, and it is the second reason, not the first.

                The forest below is the Shikari Devi Wildlife Sanctuary. It is bear
                country. Walk with at least one other person, make gentle noise
                through thick sections, and never leave food out at night.
CTA (verbatim)— "Read the chapter before you walk this ridge."
DESTINATION   — https://pahariyatri.com/chapters/devidarh-shikari-devi?utm_source=instagram&utm_medium=reel&utm_campaign=jis_mandir_ki_chhat_nahi&utm_content=roofless_temple
utm_campaign  — jis_mandir_ki_chhat_nahi
HASHTAGS      — #shikaridevi #mandi #himachal #devbhoomi #templesofindia
                #trekking #pahariyatri
VERIFICATION  — MANDATORY local-verification-editor gate before shooting. The
                roof belief must be stated AS belief in both the voiceover and
                the caption. It already is in both — do not let an edit soften
                "maanyata" into a statement of fact.
                The chapter narrative has an unnamed "old pujari" who shared a
                fire. He is not a consented source and does not appear here.
                Ask before filming anything inside the shrine, on the day.
```

#### Reel 4 — Slot 4, Yatri lesson (filter)

```
SLOT          — 4, Yatri lesson
HOOK (0-3s)   — "Jahan nadi paida hoti hai, wahan log kapde nahi dhote."
VISUAL / SHOTS— 1. 0-3s: the first tarn, black water inside white stone. Hook
                   text. Absolutely static shot.
                2. 3-10s: Janglik's timber houses, the last village. Then the walk
                   out past it.
                3. 10-18s: Litham meadow at the valley head, snow walls above,
                   the light going from rose to iron if you have the golden hour.
                4. 18-26s: the tarn edge — filmed from a distance, no footprints
                   at the water, nothing touching it. The framing enforces the
                   rule the Reel is about.
                5. 26-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Chandernahan, chaar hazaar do sau saath meter, Rohru ke upar.
                Ye glacier ke taalab hain, aur Pabbar nadi yahin se shuru hoti
                hai. Wahi Pabbar jiske saath aap ghanton gaadi chalate hain.
                Ye jheelein Devta Shikru ki hain. Yahan ke gadariye peedhiyon se
                inke neeche apni bhed charate aaye hain.
                Aur wo ek niyam rakhte hain jo kisi board par nahi likha:
                jheel ke kinare par kuch nahi dhona. Paani ke paas camp nahi
                lagana. Kinara chhod dena.
                Agar jinki rozi roti isi ghaati par tiki hai wo paani ko haath
                nahi lagate, to teen din ke liye aaye hue kisi bhi insaan ke paas
                lagane ki koi wajah nahi hai."
CAPTION (verbatim) —
                Chandernahan is a chain of glacial tarns at about 4,260 metres above
                the Pabbar valley in Rohru, and it is where the Pabbar river starts.
                The river you drove beside for hours is born here.

                The lakes are sacred to Devta Shikru, and shepherds have grazed
                flocks under that name for generations.

                They keep a rule that is not written on any board. Nothing is washed
                at the water's edge. Nothing is camped at the water. The edge is left
                alone.

                If the people whose living depends on this valley will not touch the
                water, nobody here for three days has a reason to.

                Janglik to the lakes and back is not a day walk. Do not plan it as
                one.
CTA (verbatim)— "Read the chapter before you plan Chandernahan."
DESTINATION   — https://pahariyatri.com/chapters/chandernahan-lake-trek?utm_source=instagram&utm_medium=reel&utm_campaign=kinare_ko_chhod_dena&utm_content=source_water_rule
utm_campaign  — kinare_ko_chhod_dena
HASHTAGS      — #chandernahan #rohru #pabbarvalley #himachal #trekking
                #responsibletravel #pahariyatri
VERIFICATION  — The chapter's narrative names a shepherd, "Chatru," and gives him
                a nine-generation family claim. **He is not a consented source.**
                He is not named, quoted, paraphrased or shown in this Reel, and the
                nine-generation figure is deliberately generalised to
                "peedhiyon se" / "for generations." Do not restore either.
```

#### Reel 5 — Slot 5, Voice of Himalaya

```
(a) REAL VOICE — BLOCKED
THE REEL      — Either: a Saroa resident who has walked people up to Kamrunag, on
                what the walk is like when it is your own ground rather than a
                trek. Or: a shepherding family from Janglik on grazing under
                Devta Shikru's lakes.
TO UNBLOCK    — Same five requirements as §9.2(a). Additionally, for the Janglik
                option: the nine-generation claim in the chapter narrative is
                unsourced and must be re-asked and confirmed by the actual family
                before it can appear anywhere, in any form.
NOTE          — Saroa is the more realistic first contact. It is a short drive from
                Mandi, the chapter already suggests asking in the village for a
                walking companion, and that ask is a legitimate reason to be there
                that has nothing to do with content.
```

```
(b) SHIPPABLE FALLBACK — editorial, narrated
SLOT          — 5, Voice of Himalaya (editorial substitute)
HOOK (0-3s)   — "Hamare paas atthais kahaniyan hain. Kisi ek par bhi kisi ka naam
                nahi hai."
                On-screen text, held the full 3s, verbatim:
                "This is Pahari Yatri reading the valley, not a resident speaking."
VISUAL / SHOTS— 1. 0-3s: a laptop or notebook, the story archive open, filmed
                   plainly on a desk. Deliberately NOT a mountain shot. Hook and
                   disclosure text over it.
                2. 3-12s: cut to temple thresholds, bells, hands, feet. No faces.
                   Same restraint grammar as Reel 3.
                3. 12-22s: a doorway with nobody in it. A courtyard, empty. Held
                   uncomfortably long. The empty frames are the argument.
                4. 22-28s: back to the desk. Close the notebook.
                5. 28-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Is library mein abhi atthais kahaniyan hain. Kisi ek par bhi kisi
                asli, naam wale insaan ka naam nahi hai.
                Aath par saaf likha hai ki ye editorial hain. Baaki bees aise
                padhi jaati hain jaise kisi se baat ki gayi ho. Ki nahi gayi.
                Isliye is account par aapne aaj tak kisi local ki awaaz nahi
                suni, aur na hi sunenge, jab tak wo insaan khud haan na kahe,
                apna naam de, aur publish hone se pehle apna hissa padh na le.
                Ye rule humein dheema karta hai. Rakhne wala hai.
                Kisi jagah ke baare mein galat likhna theek kiya ja sakta hai.
                Kisi ke mooh mein shabd daalna theek nahi kiya ja sakta."
CAPTION (verbatim) —
                We have 28 stories in this library and not one of them carries a
                named human source.

                Eight are labelled as editorial. The other twenty read as though
                someone was interviewed. Nobody was.

                So you have not heard a local voice on this account, and you will not
                until a real person says yes, gives their name, reads their part
                before it goes up, and keeps the right to take it down afterwards.

                Getting a place wrong can be corrected. Putting words in someone's
                mouth cannot.

                If you are from these valleys and want to correct us on something,
                that offer is open and it comes with your name on it.
CTA (verbatim)— "Read the etiquette chapter on Pahari Yatri."
DESTINATION   — https://pahariyatri.com/chapters/himachal-temple-etiquette?utm_source=instagram&utm_medium=reel&utm_campaign=naam_ke_bina_koi_awaaz_nahi&utm_content=sourcing_standard
utm_campaign  — naam_ke_bina_koi_awaaz_nahi
HASHTAGS      — #himachal #devbhoomi #responsibletravel #storytelling
                #pahariyatri
NOTE          — Highest-upside and highest-variance Reel of the month. Also the
                best recruitment ad for slot 5 that exists, because it ends with
                an open invitation and a promise attached. Any DM it generates
                goes straight to OUTREACH_SYSTEM.md §4 Template C, unedited,
                founder-sent.
RISK          — Do not follow it with a humour Reel the same day. The tonal
                whiplash undoes it.
```

**YouTube Shorts repost, week of Sep 22.** Priority if only one ships:

- **Repost: Reel 3 (Shikari Devi).** Roofless temple is a genuinely searched, genuinely unusual query with almost no good video answer.
- **Shorts title:** `Shikari Devi: The Temple in Mandi That Has No Roof`
- **Pinned comment:** `Full chapter: https://pahariyatri.com/chapters/devidarh-shikari-devi?utm_source=youtube&utm_medium=short&utm_campaign=jis_mandir_ki_chhat_nahi&utm_content=roofless_temple`
- Second priority: Reel 1, title `Parashar Lake: The Island That Moves Across the Water | Mandi`, `utm_campaign=island_jo_ghoomta_hai`.

Facebook: Reels 1, 2, 3.

---

### 9.5 Week of Sep 29 — Kasol, and what the stories get wrong

This week runs one Reel into October (Sep 29 is a Tuesday); slots 4 and 5 land Oct 2–4 and their measurement windows carry into the October review.

#### Reel 1 — Slot 1, place/trail (reach)

```
SLOT          — 1, place/trail (reach)
HOOK (0-3s)   — "Kasol ki bheed se nikalne mein tees minute lagte hain. Ek pul,
                aur bas."
VISUAL / SHOTS— 1. 0-3s: the Kasol market, busy, handheld, slightly too close.
                   Hook text over it.
                2. 3-8s: stepping onto the metal footbridge. Let it move
                   underfoot. Do not stabilise this shot — the sway is the
                   transition.
                3. 8-18s: the pine trail along the river. One long walking take.
                   River always on one shoulder, audibly.
                4. 18-25s: Chalal arriving. Stone and wood houses, cafes around
                   them. Show both honestly; do not crop the cafes out.
                5. 25-30s: CTA card.
VOICEOVER (30s, verbatim) —
                "Kasol se Chalal dedh kilometre hai. Ek metal footbridge, phir
                tees minute chid ke jungle ka rasta. Koi gaadi nahi jaati.
                Itna hi antar hai. Ek nadi aur ek pul. Aur usi se sab kuch badal
                jaata hai.
                Hum aapse ye nahi kahenge ki Chalal ka koi gehra chhupa hua
                itihaas hai. Humein research mein aisa kuch nahi mila, to hum
                bana kar nahi denge.
                Jo sach hai wo simple hai aur phir bhi kehne laayak hai: ek gaon,
                Kasol se sirf ek nadi door, aur wahi door hona kaafi hai."
CAPTION (verbatim) —
                Chalal is about 1.5 kilometres from Kasol. Cross the metal footbridge
                near the market and follow the pine trail along the river for roughly
                30 minutes. No vehicle reaches it.

                We are not going to invent a deeper history for Chalal than the record
                supports. We looked and did not find one. Its altitude is reported
                loosely, around 1,600 metres, not precisely surveyed.

                What is true is simpler. A village kept apart from Kasol by nothing
                more than a river and a bridge, and that separation alone changes how
                it feels to stand there.

                If you want documented cultural weight, Manikaran and Malana carry
                more of it. That is an honest answer, not a redirect.
CTA (verbatim)— "Full story on Pahari Yatri."
DESTINATION   — https://pahariyatri.com/chapters/chalal-first-step-away?utm_source=instagram&utm_medium=reel&utm_campaign=ek_pul_ka_antar&utm_content=thirty_minutes
utm_campaign  — ek_pul_ka_antar
HASHTAGS      — #chalal #kasol #parvativalley #himachal #kullu #slowtravel
                #pahariyatri
NOTE          — The "we looked and did not find one" beat is the differentiator.
                Every competing Chalal Reel manufactures a history. Saying we
                could not is the same hook strength with the opposite integrity.
```

#### Reel 2 — Slot 2, local truth (never dropped)

```
SLOT          — 2, local truth
HOOK (0-3s)   — "Malana ke baare mein do baatein har koi confidence se kehta hai.
                Dono aaj tak saabit nahi hui."
VISUAL / SHOTS— 1. 0-3s: the approach trail, filmed from below looking up at the
                   village. Distant. Hook text. Never film close without
                   permission.
                2. 3-12s: on-screen text cards, one claim at a time, each struck
                   through as the voiceover addresses it. Text-led, not
                   footage-led — this Reel is an argument, not a view.
                3. 12-22s: wide, respectful village exterior. No residents in
                   frame. No buildings touched. No interiors. No courtyards.
                4. 22-28s: hands held deliberately at sides, walking past a wall
                   without touching it. That gesture is the Yatri lesson.
                5. 28-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Pehli: ki Malana ke log Sikandar ke chhode hue sainikon ke vansaj
                hain. Ye baat har jagah likhi hai. Jo bhi source ise seriously
                jaanchta hai, wo saath mein ye bhi likhta hai ki iska koi saboot
                nahi hai.
                Doosri: ki ye duniya ka sabse purana loktantra hai. Ye travel
                writing ka phrase hai, political history ka nateeja nahi.
                Jo asli hai wo ye hai. Malana ki apni bhasha hai, Kanashi, jo aur
                kahin nahi boli jaati. Apni council hai. Aur Jamlu devta se apna
                rishta hai. In teeno ko interesting hone ke liye Sikandar ki
                zaroorat nahi hai.
                Aur jaate waqt sabse zaroori niyam: bina bulaye kisi ghar, deewar,
                mandir ya insaan ko haath mat lagaiye."
CAPTION (verbatim) —
                Two things are said about Malana with total confidence and neither has
                been proven.

                That its people descend from soldiers Alexander the Great left behind.
                Every credible source that reports this also says plainly that it has
                never been established. And that it is the world's oldest democracy,
                which is a travel writing framing, not a finding in political history.

                What is documented is more interesting anyway. Malana speaks Kanashi,
                reportedly spoken nowhere else. It has its own council structure. It
                has its own relationship with the deity Jamlu.

                Do not touch village buildings, walls, temples or residents without
                invitation. That rule is reported consistently and taken seriously.

                Do not go looking for cannabis. It carries real legal risk and real
                social cost for the village's own young people, and treating it as an
                attraction disrespects both.
CTA (verbatim)— "Read the Malana chapter before you go."
DESTINATION   — https://pahariyatri.com/chapters/malana-myth-and-reality?utm_source=instagram&utm_medium=reel&utm_campaign=dono_baatein_saabit_nahi&utm_content=myth_correction
utm_campaign  — dono_baatein_saabit_nahi
HASHTAGS      — #malana #parvativalley #himachal #kullu #devbhoomi
                #responsibletravel #pahariyatri
VERIFICATION  — MANDATORY local-verification-editor gate before shooting. Both
                claims must stay framed as unproven, and the Kanashi / council /
                Jamlu material must stay descriptive, not authoritative. The
                chapter's narrative mentions "more than one guide we spoke to" —
                unnamed, not consented, not used here.
RISK          — Comments will argue about Alexander. Reply with the chapter link
                and the line "every source that reports it also says it is
                unproven." Do not argue past one reply.
                Do NOT answer any comment asking about cannabis. Delete or ignore.
                This is the one Reel this month where filming discipline is a
                safety and consent issue, not an aesthetic one.
```

#### Reel 3 — Slot 3, culture / folklore (the moat, never dropped)

```
SLOT          — 3, culture / folklore
HOOK (0-3s)   — "Poori ghaati ka naam ek nadi par hai. Kya aapko pata hai wo nadi
                kahan se shuru hoti hai?"
VISUAL / SHOTS— 1. 0-3s: the Parvati river at Kasol, loud, jade green, ordinary.
                   Hook text. The viewer has seen this exact water in a hundred
                   Reels — that familiarity is the setup.
                2. 3-10s: the river upstream, progressively colder and smaller.
                   Three or four cuts, each higher than the last.
                3. 10-20s: Mantalai. Glacier-fed, still, the small Shiva temple
                   near the edge. Distant, no interiors.
                4. 20-28s: cut all the way back DOWN to the steam at Manikaran.
                   Closing the loop in the edit is the point of the Reel.
                5. 28-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Parvati nadi. Kasol, Manikaran, Barshaini, har gaon isi ke saath
                khada hai.
                Wo shuru hoti hai Mantalai jheel se, kareeb chaar hazaar sau
                meter, Parvati glacier se. Kheerganga se bahut aage. Jitne log
                Kheerganga ke kund mein nahaate hain, unmein se lagbhag koi
                aage jaa kar ise dekhta nahi.
                Parampara kehti hai ki Shiv ne Mantalai mein tapasya ki, aur
                Parvati neeche wahan thehri jo aaj Manikaran hai. Kuch kehne wale
                teen hazaar saal kehte hain. Wo sankhya kahani ka apna tareeka
                hai ye kehne ka ki bahut lamba samay, na ki koi date.
                Jo kahani nahi hai wo bhugol hai. Ye paani sach mein Manikaran
                pahunchta hai, Kasol pahunchta hai, har us gaon tak pahunchta hai
                jiske baare mein humne likha hai. Us se pehle kahin aur nahi
                jaata."
CAPTION (verbatim) —
                The Parvati river names this entire valley. It starts at Mantalai
                Lake, roughly 4,100 metres, fed by the Parvati glacier, far beyond
                Kheerganga.

                Almost nobody who bathes in that hot spring goes on to see it.

                Tradition holds that Shiva meditated at Mantalai while Parvati rested
                downstream at what is now Manikaran, which ties this remote alpine
                lake to the pilgrimage site much further down the same valley. Some
                tellings say three thousand years. That number is the legend's way of
                saying an incomprehensibly long time, not a date.

                The geography is not legend. This water reaches Manikaran, reaches
                Kasol, reaches every village in this book, before it reaches anywhere
                else.

                Mantalai is not a Kheerganga add on. It is a serious multi day trek
                at real altitude.
CTA (verbatim)— "Full story on Pahari Yatri."
DESTINATION   — https://pahariyatri.com/chapters/mantalai-lake-the-source?utm_source=instagram&utm_medium=reel&utm_campaign=nadi_kahan_se_shuru_hoti_hai&utm_content=river_source
utm_campaign  — nadi_kahan_se_shuru_hoti_hai
HASHTAGS      — #mantalai #parvativalley #himachal #kullu #devbhoomi
                #trekking #pahariyatri
VERIFICATION  — The three-thousand-years hedge must survive the edit intact. It is
                the whole reason this Reel differs from every other Mantalai video.
                Do not add Pin Parvati Pass footage unless it is genuinely ours;
                the chapter is explicit that the pass is a separate, serious
                undertaking and the Reel should not blur the two.
```

#### Reel 4 — Slot 4, Yatri lesson (filter)

```
SLOT          — 4, Yatri lesson
HOOK (0-3s)   — "Sar Pass ko beginner friendly kehte hain. Wahi log ek hissa aisa
                bhi batate hain jo nahi hai."
VISUAL / SHOTS— 1. 0-3s: the Nagaru section, steep, snow, small figures for
                   scale. Hook text. Open on the hard part, not the meadow.
                2. 3-10s: the easy start. Kasol, then the walk into Grahan.
                   Green, gentle, obviously pleasant.
                3. 10-18s: the gradient changing. Min Thach, then Nagaru. Let the
                   footage get progressively less comfortable.
                4. 18-26s: the pass, and then the descent to Biskeri. Do not end
                   on a summit pose.
                5. 26-32s: CTA card.
VOICEOVER (32s, verbatim) —
                "Sar Pass, kareeb chaar hazaar do sau meter. Paanch se chhe din,
                lagbhag pachas kilometre. Kasol, Grahan, Min Thach, Nagaru, pass,
                Biskeri, Barshaini.
                Ise beginner friendly kaha jaata hai, aur ye galat nahi hai.
                Adhoora hai.
                Kyunki jo operators ye label dete hain, wahi alag alag likhte
                hain ki Nagaru se pass, aur pass se Biskeri, ye hissa asli mein
                mushkil hai. Steep, ooncha, aur taiyari na hone par maaf nahi
                karta.
                Dono baatein ek saath sach hain. Beginner friendly ka matlab
                shuru se aakhir tak aasan nahi hota.
                Aur raaste mein Grahan aata hai. Wahan ke apne niyam hain. Guzarte
                waqt bhi wo lagoo hote hain."
CAPTION (verbatim) —
                Sar Pass is about 4,200 metres, five to six days, roughly 50
                kilometres. Kasol to Grahan to Min Thach to Nagaru, over the pass,
                down through Biskeri to Barshaini.

                It is widely called a good first high altitude trek and that is true
                overall. It is also incomplete on its own.

                The same operators who give it that label separately flag the Nagaru
                to pass to Biskeri stretch as the genuinely difficult section. Steep,
                high, and unforgiving of poor preparation. Both things are true at
                once.

                Its accessibility has made it a first serious trek for a whole
                generation of Indian trekkers, which is why the honest version of the
                description matters more here than almost anywhere else.

                Grahan is on the route. Its rules apply to people passing through too.
CTA (verbatim)— "Read the chapter before you sign up for Sar Pass."
DESTINATION   — https://pahariyatri.com/chapters/sar-pass-trekking-culture?utm_source=instagram&utm_medium=reel&utm_campaign=beginner_friendly_adhoora_hai&utm_content=nagaru_section
utm_campaign  — beginner_friendly_adhoora_hai
HASHTAGS      — #sarpass #parvativalley #himachal #kullu #trekking
                #responsibletravel #pahariyatri
VERIFICATION  — The "beginner friendly" correction is the chapter's own localTruth
                and is safe as written. Do not name or criticise any specific
                trek operator. The claim is about a label, not about a company.
RISK          — This Reel will be read by some as discouraging people from a trek.
                It is. That is slot 4's job. Do not soften it in response to
                comments.
```

#### Reel 5 — Slot 5, Voice of Himalaya

```
(a) REAL VOICE — BLOCKED
THE REEL      — A Rasol or Grahan resident on which courtyards and shrines are not
                for outsiders, in their own words, and why the rule holds without
                anyone enforcing it. The natural companion to the existing Reel 4
                temple-etiquette script, and would be the single most valuable
                piece of content this account could publish.
TO UNBLOCK    — Same five requirements as §9.2(a), plus one specific to this ask:
                the person must be comfortable that the Reel will increase
                attention on their village. Ask that question explicitly and
                accept a no. If this content works, it raises footfall on places
                whose entire point is restraint.
DO NOT        — data/stories/ contains "the-village-that-said-no" attached to the
                Sar Pass chapter and "what-the-guide-would-not-say" attached to
                Malana. Neither carries a named source. Neither is eligible.
```

```
(b) SHIPPABLE FALLBACK — FOUNDER VOICE, or editorial if the founder has not done this
SLOT          — 5, Voice of Himalaya (founder substitute)
PRECONDITION  — **Ship the founder version ONLY if the founder has actually made
                the Chalal to Rasol climb.** A founder is a real, named, consenting
                person speaking about their own experience. It stops being honest
                the moment the experience is borrowed. If the founder has not done
                it, ship the editorial variant below instead.
HOOK (0-3s)   — Founder version: "Rasol ki chadhai ne mujhe ek baat sikhayi, aur
                wo view nahi tha."
                Editorial version: "Rasol ki chadhai teen se chaar ghante ki hai.
                Aur wahi chadhai gaon ko bacha rahi hai."
                Editorial version carries the on-screen line, verbatim, 3s:
                "This is Pahari Yatri reading the valley, not a resident speaking."
                The founder version does NOT carry that line. It carries the
                founder's name on screen instead.
VISUAL / SHOTS— 1. 0-3s: the climb out of Chalal, steep, unshaded, early light.
                   Hook text.
                2. 3-14s: the climb itself. Founder version: to camera, breathing
                   hard, one honest unpolished take. Editorial version: no
                   presenter, just the trail and the gradient.
                3. 14-22s: the top. Old wooden houses, narrow lanes, apple trees.
                4. 22-28s: a courtyard entrance, filmed from OUTSIDE it, camera
                   stopping at the threshold. The camera obeying the rule is the
                   whole lesson.
                5. 28-32s: CTA card.
VOICEOVER (32s, verbatim, founder version) —
                "Chalal se Rasol teen se chaar ghante ki seedhi chadhai hai. Koi
                road nahi. Main upar pahuncha to baat karne ki halat nahi thi.
                Upar purane lakdi ke ghar hain, patli galiyan hain, aur seb ke ped
                jo kisi trekker ke aane se bahut pehle se hain.
                Rasol ki oonchai par sources mein do sau se aath sau meter ka
                farak hai. Hum ek number chun kar precision ka natak nahi karenge.
                Jo nahi badalta wo chadhai hai. Aur wahi chadhai wajah hai ki
                Rasol apne padosi gaon se dheere badla hai.
                Jo maine seekha wo ye tha: kuch aangan aur mandir bahar walon ke
                paer ke liye nahi hain, aur wahan koi board nahi laga hota. Main
                rukka, maine poocha, aur mujhe dikhaya gaya."
VOICEOVER (editorial version) — Identical, with these three changes: "main upar
                pahuncha" becomes "upar pahunchne wale", "jo maine seekha" becomes
                "jo ye chadhai sikhati hai", and the final sentence becomes "jo
                rukte hain aur poochte hain, unhein dikhaya jaata hai."
CAPTION (verbatim) —
                Chalal to Rasol is a genuinely steep three to four hour climb with no
                road at any point. Unlike the flat riverside walk to Chalal, this one
                does not ease you in.

                Reported altitude varies between sources from roughly 2,200 to nearly
                3,000 metres. We are holding that range rather than picking a number
                to sound precise.

                What does not vary is the climb, and the climb is the actual reason
                Rasol has changed more slowly than villages reached by an easier path.

                Some courtyards and shrines are understood, without a sign saying so,
                as places outsiders do not enter uninvited. Treat them the way you
                would a stranger's home, because that is exactly what they are.

                Carry more water than the distance suggests. Start early.
CTA (verbatim)— "Read the Rasol chapter before you climb."
DESTINATION   — https://pahariyatri.com/chapters/rasol-remote-mountain-village?utm_source=instagram&utm_medium=reel&utm_campaign=chadhai_ne_kya_sikhaya&utm_content=founder_voice
                Editorial version uses the identical URL with
                &utm_content=editorial_narration — same campaign, different
                variant, so GA4 can compare founder voice against narration
                directly.
utm_campaign  — chadhai_ne_kya_sikhaya
HASHTAGS      — #rasol #parvativalley #kasol #himachal #kullu #slowtravel
                #pahariyatri
NOTE          — The utm_content split here is the month's most useful experiment:
                does a named human face outperform narration on the same chapter,
                same hook, same week? That answer decides how hard to push
                OUTREACH_SYSTEM.md §4 in October.
```

**YouTube Shorts repost, week of Sep 29.** Priority if only one ships:

- **Repost: Reel 2 (Malana).** Highest search volume of anything in this month's plan, and the correction angle is genuinely absent from YouTube results for these queries.
- **Shorts title:** `Malana: Two Famous Claims, Neither One Proven | Himachal`
- **Pinned comment:** `Full chapter: https://pahariyatri.com/chapters/malana-myth-and-reality?utm_source=youtube&utm_medium=short&utm_campaign=dono_baatein_saabit_nahi&utm_content=myth_correction`
- Second priority: Reel 4, title `Sar Pass Trek: The One Section That Is Not Beginner Friendly`, `utm_campaign=beginner_friendly_adhoora_hai`.

Facebook: Reels 1, 2, 3.

**Bench (scripted-adjacent, not scheduled):** `tosh-village-above-the-valley` (the "walk ten minutes past the cafe strip" angle, and the chapter's explicit hedge that the three-cuisine menus are recent tourism history, not ancient cultural fusion) and `waichin-valley-high-meadow` (the chapter openly states its research base is thin — usable only as a "we are not going to invent this" piece, never as a route guide). Pull either forward if a scheduled Reel fails its verification gate.

---

### 9.6 Measurement — against the real September baseline

**The baseline, read live 2026-09-09. Nothing here is estimated.**

| Metric | Actual, last 28 days | Source |
|---|---|---|
| `reel_source_visit` | **2** | GA4, audit §1.4 |
| `chapter_view` | **7** (all sources combined) | GA4, audit §1.4 |
| `apply_start` | 1 | GA4 |
| `apply_submit` | 0 | GA4 |
| Total site users | 83 | GA4 |
| Content published | **2 pieces** | Meta Business Suite, audit §3 |
| Best original Reel | 2,828 views / 2,240 reach / 58 interactions / 48 likes | Meta Business Suite |
| Other Reel | 139 views / 130 reach | Meta Business Suite |
| Best performer overall, 90d | 2,961 views / 2,144 reach — **a repost of @_solo_tripper_02**, not ours | Meta Business Suite |
| Follower change, 90d | 23 follows, 30 unfollows, **net minus 7** | Meta Business Suite |
| Followers | 1,065 | Instagram |

**The one number this month exists to move: `reel_source_visit`, currently 2 per 28 days.**

#### 24h — did the plumbing work?

Per Reel, checked in **GA4 Realtime** (standard reports lag 24–48h), in **Chrome, not Brave** (Brave Shields blocks googletagmanager.com):

- `reel_source_visit` with that Reel's exact `utm_campaign` value must be **≥ 1**. Not "some traffic" — that campaign string, matching `trackReelSourceVisit()`'s `campaign` param.
- `chapter_view` for that chapter should be within **±2** of it. A larger gap means people tapped and did not land — a link or redirect problem, not a content problem.
- Zero at 24h with non-zero Reel views = **the link is wrong**. Check for a capitalised `Instagram`, a stripped query string in the bio-link tool, or a missing `utm_source` (without it the event does not fire — `trackReelSourceVisit()` returns early when `utm_source` is absent).
- Do not judge content at 24h.

**Scale note so nobody misreads a small number:** a single Reel producing **2** `reel_source_visit` matches the entire last 28 days. Three producing 2 each triples the account's four-week history. Small integers are the correct unit here.

#### 72h — did it persuade?

Per Reel, against real reference points, not invented targets:

| Signal | Reference | September bar |
|---|---|---|
| Views | Only two data points exist: 139 and 2,828 | **Floor: 139.** A Reel below the worst recent piece underperformed. **Record: 2,828.** Any Reel beating it is the account's new best original. |
| Interactions | 58 on the 2,828-view Reel | 30+ is a real signal at this account's size |
| `reel_source_visit` | 2 per 28 days | ≥ 1 per Reel; ≥ 3 for slot 2 Reels |
| `join_yatri_circle_click` / `whatsapp_join_click` | Not in the 28-day event list at all (effectively 0) | **Any** non-zero value is new information |
| `apply_start` | 1 in 28 days, unattributed | Any campaign-attributable `apply_start` is a first |

**The 2-of-4 promotion bar cannot run yet, and here is exactly when it can.** With n=2 for the last 28 days, a median is meaningless. The honest schedule:

- Weeks of Sep 9 and Sep 15 → **collect only.** Log views, reach, saves, shares, comments and watch-through per Reel in a single sheet. No promotion decisions.
- From the week of **Sep 22** → a median computed from that cohort (up to 9 Reels) becomes usable. Apply the 2-of-4 bar from then: saves above median, shares above median, comments asking real questions, watch-through holding past the local-truth beat.
- Do not retro-fit a median onto the two August/September pieces. Two points is not a distribution.

**Watch-through specifically:** for every Reel above, the local-truth beat lands between 8s and 20s. Audience retention at the 20s mark is the single most diagnostic number for this content model. Log it per Reel from Sep 9.

#### 7d — worth repeating?

- `apply_submit` attributable to a campaign. Baseline is **0**. One in the whole of September would be the first ever attributed to a Reel.
- Is `chapter_view` for that slug still trickling three days after the Reel stopped pushing? That distinguishes a chapter that earns search traffic from a chapter that only borrowed a spike.
- Would you make this again?

#### Month-level, reviewed Oct 9

Judged against the 28-day baseline, not against ambition:

| Metric | Baseline (28d) | September bar | Why this number |
|---|---|---|---|
| `reel_source_visit` | 2 | **12** | ~16 Reels shipping ≥ 1 each, allowing for several that ship late or not at all. A 6× lift, coming almost entirely from Reels having a tagged destination at all, which most currently do not. |
| `chapter_view` | 7 | **20** | Roughly `reel_source_visit` plus existing organic. If `chapter_view` does not move with `reel_source_visit`, the landing is broken. |
| Content published | 2 | **8 minimum** (slots 2 and 3, all four weeks) | The collapse ladder floor. 16 is the plan; 8 is the number that means the system held. |
| YouTube Shorts | 1 in channel history | **4** (one per week) | Channel-history-aware, not strategy-aware — a 400% lift on the entire history of the channel. |
| Net follower change | minus 7 over 90d | **≥ 0 for the month** | Unfollows run ~10/month. The goal in September is to stop the bleed, not to grow. A growth target above zero right now would be a number invented to feel good. |
| `join_yatri_circle_click` + `whatsapp_join_click` | not present in the event list | **≥ 3 combined** | First evidence the chapter actually converts, at any volume. |
| `apply_submit` attributable | 0 | **0 is an acceptable result** | State this in advance so nobody rewrites the goalposts on Oct 9. |

**One structural caveat to record now:** the best-performing content in 90 days was a repost of another creator's work (2,961 views), not ours. Every original Reel above will be measured against a number the account did not produce. If original content lands consistently in the 500–1,500 range while a repost hits 2,900, that is a **production quality** finding, not a strategy finding, and it points at editing and shot discipline rather than at the content model. Do not confuse the two in the October review.

---

### 9.7 Story Highlights — three to create from scratch

No Story Highlights exist on the profile at all (audit §3). A first-time visitor gets 189 posts and nothing structured, which is a large part of why 1,065 followers produce 2 site visits a month. Highlights are the cheapest structural fix available.

Every Highlight cover: same typeface, same muted palette, no logo, one word each. Every link inside uses `utm_medium=story`.

**1. `Start Here`** — the bio link's companion. Five to seven frames: what "Yatri, not tourist" means in one sentence, what a chapter is, the library at a glance (6 books, 39 chapters, real numbers only), what we will never do (no ads, no fabricated quotes, no place sold as a discovery), one link frame to `/start`:
`https://pahariyatri.com/start?utm_source=instagram&utm_medium=story&utm_campaign=highlight_start_here&utm_content=start_page`

**2. `Yatri Code`** — the moat and the filter in one place, and the most reusable asset on the account. One frame per rule, each drawn from a published chapter, each linking to it: Kheerganga's day-trek rule (re-verify before posting, add a "last checked" date on the frame), the hot spring's enclosure/no-soap rules, Grahan's alcohol rule, Malana's no-touch rule, Rasol's courtyard rule, Chandernahan's water-edge rule, temple photography as a question not a right. Closing frame links to
`https://pahariyatri.com/chapters/himachal-temple-etiquette?utm_source=instagram&utm_medium=story&utm_campaign=highlight_yatri_code&utm_content=etiquette_chapter`
This is the Highlight to link in every comment reply that asks "where is this."

**3. `Ghaati Notes`** — the archive of slot 2, one frame per chapter, each carrying the single thing a tourist would not know, each linking to its chapter with that Reel's own campaign so story taps and Reel taps stay separable in GA4. Grows by one frame per week for free, because every slot 2 Reel already produces its own frame.

**Deliberately not a Highlight yet: `Voices`.** Stays uncreated until a real consented named voice exists. Creating an empty or editorially-filled `Voices` Highlight would be the exact failure §9.0 exists to prevent.

---

### 9.8 The humour vs storytelling voice split — honest read

**What is actually true, from the audit, without softening it.**

The posted grid is dominated by relatable and humour Reels: career-quitting jokes, "Paisa ped par hi lagta hai", "Enjoying Our Unemployed Era", "Bhai baat samjho, ab pahadon ki ek baitak zaroori hai", "Mere Papa Ki Girlfriend". Genuine place-and-culture posts are the minority. Audit §3 puts it plainly: this reads as a relatable-lifestyle account that occasionally posts Himalaya content, not a Himalayan library that occasionally posts a joke.

**Three things this plan will not claim, because the data does not support them:**

1. **Which format the 2,828-view Reel was is not recorded.** Anyone asserting "humour is what works here" is asserting past the evidence, and so is anyone asserting the opposite.
2. **Humour did not provably cause the 30 unfollows.** Net minus 7 over 90 days on 2 pieces of content in 28 days is at least as consistent with *inactivity* as with *voice mismatch*.
3. **The best performer of the whole 90 days was a repost of @_solo_tripper_02** — not a humour Reel and not a storytelling Reel. The strongest single signal in the account's recent history is that the audience responded to someone else's production quality. Uncomfortable, and the most important fact in this section.

**The finding that actually matters, and it is not about tone.** The humour Reels have **no destination.** They cannot produce a `chapter_view`, cannot fire `reel_source_visit`, cannot be attributed, cannot fail a promotion bar because they were never entered into one. The storytelling Reels are the only ones ever asked to convert. The account is not split between two voices where one works — it is split between one voice given a job and one never asked to do anything.

**A second, quieter cost.** `Travel Service` as the Instagram category, plus a bio promising guided journeys, plus a grid of unemployment jokes, plus 29 real 5★ Google reviews for delivered treks, is four different promises to the same visitor — the audit §1.1 five-way identity split, expressed as a content feed.

**Three options, and the recommendation.**

- **A — Absorb humour into slot 1.** Keep the Hinglish relatable hook, attach it to a real local truth and a real chapter link.
- **B — Retire humour entirely.** Not recommended — discards the only reach mechanism this account has ever had at scale, on a hunch.
- **C — Tag them and find out, 30 days.** Ship humour Reels at the current rate, but give every one a real chapter destination and `utm_campaign`. Costs one line of copy per Reel.

**Recommendation: C now, then A from November.** By Oct 9 there will be an actual answer instead of a guess. If C shows humour converts → make it Option A permanently, and treat the Hinglish relatable hook as the account's real competitive advantage (plausible, given the audience skews 25–34, male, Indian). If it reaches but doesn't convert → cap it at one per week, top-of-funnel only, never in slots 2 or 3.

**Two things to fix regardless of which option is chosen, because they are not tone questions:** the bio (three banned phrases, scarcity language, self-contradiction — draft in `SOCIAL_STRATEGY.md` §2), and production quality (a reposted creator beating all original content is a craft signal; if original Reels keep losing to reposts through October, the answer is an editor, not a new voice).

**What is not a founder decision:** slots 2 and 3 stay, in every scenario, at 2 per week minimum. They are the moat, and they are the only reason a chapter exists to link to at all. The humour question is a question about slots 1 and 5. It was never a question about the brand.
