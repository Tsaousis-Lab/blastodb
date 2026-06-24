---
layout: layouts/documentation.njk
title: Box Component
description: A simple container used as a building block inside Columns and Grid layouts.
---

[hero: text-align:center]

<h-hero>Box</h-hero>

The Box component is a container with no visual styling of its own. Its purpose is to group content into a unit that can be placed inside a multi-column or grid layout. It accepts optional inline CSS for alignment, spacing, or background color. The primary building block inside `[cols:]` and `[grid:]`.

[:hero]

# Syntax

```markdown
[box: *optional CSS here*]
Content goes here
[:box]
```

The CSS after the colon is optional. Leave it blank for a plain box: `[box:]`.

# Parameters

Any valid CSS property can be passed as an inline style:

| Property | Example |
|---|---|
| Background color | `background-color: var(--accent-pale)` |
| Padding<br>->Space between content and border | `padding: 1.5rem` |
| Text alignment<br>->left, right, centre | `text-align: center` |
| Border<br>->thickness, style and color of border | `border: 1px solid var(--border)` |

# Examples

## Two-column layout

```markdown
[cols:]
[box:]
### Left Column
Content for the left side.
[:box]
[box:]
### Right Column
Content for the right side.
[:box]
[:cols]
```

Renders:

[cols:]
[box:]
### Left Column
Content for the left side.
[:box]
[box:]
### Right Column
Content for the right side.
[:box]
[:cols]

---

## Box with background color

```markdown
[box: background-color: var(--accent-pale); padding: 1.5rem]
This box has a custom background and padding.
[:box]
```

Renders:

[box: background-color: var(--accent-pale); padding: 1.5rem]
This box has a custom background and padding.
[:box]

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
