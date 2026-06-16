---
layout: layouts/documentation.njk
title: BlastoDB — Hero Component
description: Full-width banner section for introducing a page or major section.
---

[hero: text-align:center]

<h-hero>Hero</h-hero>

A full-width banner that bleeds to the viewport edge. Use it once per page, at the top, to carry the page title and a brief orientation.

[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

## What it does

The Hero component creates a visually distinct full-width section that spans the entire page width. It automatically centres its content horizontally with a max-width constraint via an inner `hero-inner` div. You can pass inline CSS to customise the background, text colour, or padding.

## Syntax

```markdown
[hero: optional CSS here]
Content goes here
[:hero]
```

The CSS after the colon is optional. Leave it blank for the default styling: `[hero:]`.

## Parameters

Any valid CSS property can be passed as an inline style:

| Property | Example |
|---|---|
| Background | `background-color: var(--accent-pale)` |
| Text colour | `color: white` |
| Text alignment | `text-align: center` |
| Padding | `padding: 3rem 1.5rem` |
| Border | `border-bottom: 2px solid var(--accent)` |

## Example

```markdown
[hero: background-color: var(--accent-pale); text-align:center]
# Welcome
This hero has a custom background colour.
[:hero]
```

[hero: background-color: var(--accent-pale); text-align:center]
# Welcome
This hero has a custom background colour.
[:hero]

---

You can also nest layout components inside a hero:

```markdown
[hero:]
[cols:]
[box:]
### Left side
Text content.
[:box]
[box:]
### Right side
An image or call-to-action.
[:box]
[:cols]
[:hero]
```

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
