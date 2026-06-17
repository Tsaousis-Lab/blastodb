---
layout: layouts/documentation.njk
title: BlastoDB — Grid Component
description: Responsive multi-column grid for card groups and icon-link rows.
---

[hero: text-align:center]

<h-hero>Grid</h-hero>

A responsive auto-fill grid. Use `cols:2` – `cols:5` for a fixed column count, or leave it out for an auto-responsive layout. Always collapses to one column on mobile.

[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

## What it does

The Grid component arranges its children into a responsive grid. Without a `cols:` parameter it auto-fills columns based on available space (minimum 280 px per column). With `cols:N` it locks to exactly N columns on desktop. It works best with `[card:]` or `[box:]` children of similar heights.

## Syntax

```markdown
[grid: cols:N optional CSS here]
[card:]
Content
[:card]
[card:]
Content
[:card]
[:grid]
```

The `cols:N` parameter and all CSS are optional. Use `[grid:]` for a fully auto-responsive grid.

## Parameters

| Parameter | Example | Effect |
|---|---|---|
| `cols:N` | `cols:3` | Sets a fixed column count (2–5). Removed from the style attribute and applied as a CSS class instead |
| Any CSS | `gap: 2rem` | Added as inline style to the grid wrapper |

## Responsive behaviour

### With `cols:N`
| Screen width | Layout |
|---|---|
| > 720 px | Fixed N columns |
| ≤ 720 px | 1 column |

### Without `cols:N` (auto)
| Screen width | Layout |
|---|---|
| > 1000 px | 3+ columns (auto, min 280 px) |
| 600 – 1000 px | 2 columns |
| < 600 px | 1 column |

## Examples

### Fixed three-column card grid

```markdown
[grid: cols:3]
[card:]
### Feature A
Description of feature A.
[:card]
[card:]
### Feature B
Description of feature B.
[:card]
[card:]
### Feature C
Description of feature C.
[:card]
[:grid]
```

[grid: cols:3]
[card:]
### Feature A
Description of feature A.
[:card]
[card:]
### Feature B
Description of feature B.
[:card]
[card:]
### Feature C
Description of feature C.
[:card]
[:grid]

---

### Auto-responsive box grid

```markdown
[grid:]
[box:]
Item 1
[:box]
[box:]
Item 2
[:box]
[box:]
Item 3
[:box]
[box:]
Item 4
[:box]
[:grid]
```

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
