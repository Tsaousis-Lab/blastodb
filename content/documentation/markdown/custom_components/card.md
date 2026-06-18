---
layout: layouts/documentation.njk
title: Card Component
description: A styled content container with background and border, used inside grids.
---

[hero: text-align:center]

<h-hero>Card</h-hero>

A contained box with a warm background and soft shadow. Use inside a `[grid:]` to present parallel resources, navigation options, or feature highlights.

[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

# What it does

Cards visually separate content into distinct, self-contained blocks. Unlike `[box:]`, cards have their own visual styling (background, border, shadow). They are not interactive by themselves — place a `[btn:]` inside for a call to action.

# Syntax

```markdown
[card: optional CSS here]
Content goes here
[:card]
```

The CSS after the colon is optional. Leave it blank for the default card style: `[card:]`.

# Parameters

Any valid CSS property can be passed as an inline style:

| Property | Example |
|---|---|
| Background | `background-color: var(--accent-pale)` |
| Left border accent | `border-left: 4px solid var(--accent)` |
| Padding | `padding: 2rem` |
| Shadow | `box-shadow: 0 2px 8px rgba(0,0,0,0.1)` |

# Example

```markdown
[grid: cols:3]

[card:]
### Resources
A short description. Keep cards focused — one topic, one action.
[btn: Explore -> /documentation/]
[:card]

[card:]
### Methods
A short description. Keep cards focused — one topic, one action.
[btn: Explore -> /documentation/]
[:card]

[card:]
### Community
A short description. Keep cards focused — one topic, one action.
[btn: Explore -> /documentation/]
[:card]

[:grid]
```

[grid: cols:3]

[card:]
### Resources
A short description. Keep cards focused — one topic, one action.
[btn: Explore -> /documentation/]
[:card]

[card:]
### Methods
A short description. Keep cards focused — one topic, one action.
[btn: Explore -> /documentation/]
[:card]

[card:]
### Community
A short description. Keep cards focused — one topic, one action.
[btn: Explore -> /documentation/]
[:card]

[:grid]

---

# Alert Cards
Some styles for notes, tips, warnings and severe warnings are already implemented:
```markdown
[card: class:note]
A **note** highlights neutral, supplementary information.
[:card]
```

[card: class:note]
A **note** highlights neutral, supplementary information.
[:card]

```markdown
[card: class:tip]
A **tip** highlights a helpful shortcut or best practice.
[:card]
```
[card: class:tip]
A **tip** highlights a helpful shortcut or best practice.
[:card]

```markdown
[card: class:warning]
⚠️ A **warning** flags a medium-severity issue — something to double-check before proceeding.
[:card]
```
[card: class:warning]
⚠️ A **warning** flags a medium-severity issue — something to double-check before proceeding.
[:card]

```markdown
[card: class:danger]
⚠️ A **danger** box flags a severe issue — data loss, broken links, or an action that cannot be undone.
[:card]
```
[card: class:danger]
⚠️ A **danger** box flags a severe issue — data loss, broken links, or an action that cannot be undone.
[:card]

# Freely Styled Card

```markdown
[card: border-left: 4px solid var(--accent)]
## Important Information
This card has a colored left border to draw attention.
[:card]
```

[card: border-left: 4px solid var(--accent)]
## Important Information
This card has a colored left border to draw attention.
[:card]

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
