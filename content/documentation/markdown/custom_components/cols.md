---
layout: layouts/documentation.njk
title: BlastoDB — Columns Component
description: Two-column side-by-side layout that collapses to one column on mobile.
---

[hero: text-align:center]

<h-hero>Columns</h-hero>

A two-column, equal-width layout. Always wrap each side in a `[box:]`. Collapses to a single column on mobile.

[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

## What it does

The Columns component splits the page width into two equal columns placed side by side. It is ideal for text + image pairings, feature comparisons, or any two related blocks of content. On screens below 720 px the columns stack vertically.

## Syntax

```markdown
[cols: optional CSS here]
[box:]
Left column content
[:box]
[box:]
Right column content
[:box]
[:cols]
```

Always wrap each column in a `[box:]` — the columns layout itself has no visual styling; the boxes provide structure.

## Parameters

Any valid CSS property can be passed as an inline style on the `[cols:]` tag:

| Property | Example |
|---|---|
| Gap between columns | `gap: 2rem` |
| Vertical alignment | `align-items: center` |
| Text alignment | `text-align: center` |

## Responsive behaviour

| Screen width | Layout |
|---|---|
| > 720 px | Two columns, side by side |
| ≤ 720 px | Stacked vertically |

## Example

```markdown
[cols:]
[box:]
### Left column
Two equal-width columns, collapsing to a single column on mobile. Use for paired text + image, a list next to a description, or two related blocks.
[:box]
[box:]
### Right column
Columns align to their tops. Good for narrative content; less suited to items that need equal height.
[:box]
[:cols]
```

[cols:]
[box:]
### Left column
Two equal-width columns, collapsing to a single column on mobile. Use for paired text + image, a list next to a description, or two related blocks.
[:box]
[box:]
### Right column
Columns align to their tops. Good for narrative content; less suited to items that need equal height.
[:box]
[:cols]


---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
