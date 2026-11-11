---
title: "X's New Algorithm: from Creator Economy to Engagement Economy"
date: 2026-01-20
tags: []
featured: false
original: "https://reinwu.substack.com/p/xs-new-algorithm-from-creator-economy"
image: /assets/img/xs-new-algorithm/cover.png
image_fit: contain
image_bg: "#363635"
---

Yesterday X open-sourced their recommendation algorithm. Like everyone else, I expected to find Grok reading every post, scoring quality, deciding what’s “good content.”

That’s not what I found.

<!--more-->

From the README:

> **No Hand-Engineered Features** — The system relies entirely on the Grok-based transformer to learn relevance from **user engagement sequences**. No manual feature engineering for content relevance.

The algorithm doesn’t ask “is this post good?” It asks “will THIS user engage with THIS post?”

That’s a fundamentally different question. Let me explain through two forces: **Pull** and **Push**.

---

## Pull: How Content Comes To You

When you open X, the algorithm pulls content into your feed. Here’s what it predicts for every candidate post:

```
Predictions (for each candidate):
├── P(favorite)        Will you like it?
├── P(reply)           Will you reply?
├── P(repost)          Will you repost?
├── P(quote)           Will you quote it?
├── P(click)           Will you click?
├── P(profile_click)   Will you visit their profile?
├── P(video_view)      Will you watch?
├── P(photo_expand)    Will you expand the image?
├── P(share)           Will you share?
├── P(dwell)           Will you spend time on it?
├── P(follow_author)   Will you follow them?
├── P(not_interested)  Will you hit "not interested"?
├── P(block_author)    Will you block them?
├── P(mute_author)     Will you mute them?
└── P(report)          Will you report it?
```

The final score combines all of these:

```
Final Score = Σ (weight_i × P(action_i))
```

Positive actions (like, repost, follow) have positive weights. Negative actions (block, mute, report) have negative weights.

**Your feed is personalized.** The same post gets different scores for different users. A crypto thread scores high for a crypto trader, low for a sports fan. There’s no universal “quality” — only predicted relevance to YOU.

---

## Push: How Your Content Reaches Others

But most people don’t care as much about Pull. They care about **Push** — how do I get MY content into OTHER people’s feeds?

This is where it gets interesting.

The architecture from `phoenix/recsys_retrieval_model.py`:

```python
class PhoenixRetrievalModel(hk.Module):
    """A two-tower retrieval model.

    - User Tower: Encodes user features + history
    - Candidate Tower: Projects post + author embeddings to shared space

    User and candidate representations are L2-normalized, enabling
    approximate nearest neighbor search using dot product similarity.
    """
```

In plain English: when you post, your content becomes a candidate. The algorithm asks “which users are nearby this candidate?” and shows your post to them.

**Your reach depends on how many users are “nearby” you.**

---

## A Note On What We Actually Know

X open-sourced the recommendation pipeline — but not everything. We can see the two-tower architecture, the list of predicted actions, the scoring formula, and how matching works. That’s genuinely useful.

But we can’t see how the village addresses are actually calculated. We don’t know the exact weights for likes vs. reposts vs. blocks. We don’t know how fast you can move, or whether content analysis happens upstream before the code we’re looking at.

So take what follows as my best interpretation of the architecture — not gospel. The village metaphor is a simplification. The real system is more complex, and there are pieces we simply don’t have access to.

---

## The Village: A Better Way To Think About This

Forget technical terms. Think of X as a massive village with millions of residents.

Everyone lives somewhere in this village. Your location isn’t random — it’s based on your behavior. What you like, who you follow, what you share, who engages with you. People with similar behavior end up living in the same neighborhood.

```
                        The X Village

        Fashion District              Crypto Corner
              🏠 🏠 🏠                   🏠 🏠 🏠 🏠
                🏠                       🏠 🏠 🏠
                                           🏠

                         Tech Town
                    🏠 🏠 🏠 🏠 🏠 🏠
                  🏠 🏠 🏠 ⭐ 🏠 🏠 🏠    ← Big account (town center)
                🏠 🏠 🏠 🏠 🏠 🏠 🏠 🏠
                  🏠 🏠 🏠 🏠 🏠 🏠
                    🏠 🏠 🏠 🏠

            📍 ← You (outskirts)


        Sports Zone                  Politics Plaza
             🏠 🏠 🏠 🏠 🏠             🏠 🏠 🏠 🏠
               🏠 🏠 🏠                 🏠 🏠
```

**Here’s the key rule: when you post something, only your neighbors see it.**

The algorithm doesn’t broadcast your post to the whole village. It looks at where you live and shows your content to people nearby. If you live in the center of Tech Town surrounded by thousands of neighbors, thousands of people see your post. If you live on the outskirts with only a few neighbors, only a few people see it.

**Big accounts aren’t “favored” by the algorithm.** They just live in the town center where everyone clusters. The algorithm treats everyone the same — it just shows content to neighbors. But having more neighbors means more reach.

---

## The Push Problem: Great Content, Wrong Address

This explains something that frustrates every small creator.

You write an amazing thread. Original insights. Deep research. Genuine value.

Result: 34 likes.

Meanwhile, a big account posts something simple. 12,000 likes.

It’s not that the algorithm thinks their content is better. It’s that:

- They live in the town center with millions of neighbors
- You live on the outskirts with dozens of neighbors
- Both posts were shown to neighbors
- They just have more neighbors

**Content quality matters for engagement rate** — whether your neighbors like what you post. But your address determines how many neighbors see it in the first place.

---

## How To Get Better Neighbors: Three Timeframes

Given this architecture, here’s what probably matters for getting your content seen by more people:

### Short-Term: Hitch A Ride (Reposts)

Your address is what it is right now. You can’t move houses overnight.

But reposts let you **temporarily visit someone else’s neighborhood.**

When someone reposts you:

- Your content appears in THEIR neighborhood
- You reach people who’ve never seen you before
- Some of those people might follow you back to your place

**Tactics:**

- Create content that makes others look smart for sharing
- Reply to bigger accounts with genuine insight (not “great post!”)
- Quote tweet with real analysis that adds value
- Build relationships with mid-sized accounts (10K-100K) who actually share good stuff

Think of reposts as **getting a ride to a busier part of town**. You’re borrowing someone else’s location temporarily.

### Mid-Term: Move Closer To The Center (3-6 months)

Your address probably shifts based on who visits you over time.

If crypto people consistently engage with you → you gradually move toward Crypto Corner.

If random people from engagement pods engage with you → you move toward... the engagement pod neighborhood. Not where you want to be.

**Tactics:**

- Focus on getting the RIGHT people to engage, not just more people
- Consistency matters more than virality — the same 100 people visiting you repeatedly probably moves you more than one viral spike from random tourists
- Stay in your niche — scattered engagement from all over the village might not move you anywhere coherent
- Avoid fake engagement — bots and pods might drag you to the wrong neighborhood

Think of this as **slowly relocating**. Every genuine interaction from your target audience is like one more box unpacked in your new neighborhood.

### Long-Term: Become A Town Center (12+ months)

The end game: you live in the center of your target community.

When you’re at the center:

- The algorithm shows your posts to many neighbors automatically
- You don’t have to fight for attention — people naturally see you
- Growth compounds — more neighbors → more engagement → more central location

**Tactics:**

- Keep getting reposts (rides to stay visible in adjacent neighborhoods)
- Keep getting consistent engagement from your audience (keep moving toward center)
- Eventually the flywheel kicks in — you’re close enough to the center that growth becomes easier

```
     Your Location Over Time

     Month 1:        Month 6:         Month 12:

       🏠 🏠 🏠        🏠 🏠 🏠          🏠 🏠 🏠
     🏠 🏠 🏠 🏠 🏠    🏠 🏠 🏠 🏠 🏠    🏠 🏠 🏠 🏠 🏠
       🏠 🏠 🏠      🏠 🏠 🏠 🏠 🏠    🏠 🏠 ⭐ 🏠 🏠  ← You made it!
         🏠            🏠 📍 🏠        🏠 🏠 🏠 🏠 🏠
                         ↑              🏠 🏠 🏠
         📍           You
         ↑         (closer)
        You
     (outskirts)
```

---

## Why Growth Hacks Probably Don’t Work

The algorithm learns from real behavior patterns.

**Buying followers?** They don’t visit you. Ghost neighbors don’t help your location.

**Engagement pods?** You might move toward the pod neighborhood instead of your target audience. Congrats, you’re now surrounded by other growth hackers.

**Keyword stuffing?** The algorithm learns from who actually visits you, not what you write on your mailbox.

The only thing that reliably changes your address is genuine engagement from real people in your target community. No shortcut for that.

---

## What I’m Still Wondering

A few things I couldn’t figure out from the code:

How exactly does the algorithm decide where you live in the village? We see the matching system, but not how locations get calculated in the first place. There might be content analysis happening somewhere upstream that we’re not seeing.

How much does each action actually matter? A like, a repost, a block — they all factor into the score, but we don’t know the actual weights. Is a repost worth 10 likes? 100? No idea.

How fast can you actually move? If you start getting consistent engagement from a new audience, does your address shift in days? Weeks? Months? The code doesn’t tell us.

And how much of your feed comes from people you follow vs. algorithmic discovery? The system has both (Thunder for follows, Phoenix for discovery), but we don’t know the ratio.

---

## The Bottom Line

**For Pull (your feed):**

- Algorithm predicts your engagement probability for each post
- Positive and negative signals both matter
- Feed is personalized — no universal “good content”

**For Push (your reach):**

- Your content gets shown to your neighbors
- Your location determines how many neighbors you have
- Big accounts aren’t favored — they just have better addresses

**To get a better address:**

- **Short-term:** Get reposts (hitch rides to busier neighborhoods)
- **Mid-term:** Get consistent engagement from target audience (slowly move toward them)
- **Long-term:** Become central to your community (be the town center)

The algorithm doesn’t judge quality. It predicts engagement and shows content to neighbors. Your job is to move to where your target audience lives.
