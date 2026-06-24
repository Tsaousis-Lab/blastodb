---
layout: layouts/documentation.njk
title: Hero Component
description: Full-width banner section for introducing a page or major section.
---

[hero: text-align:center]

<h-hero>Hero</h-hero>

A full-width banner, designed to be used at the top of each page or to break up content blocks. It carrys the page title and a brief orientation.

[:hero]

# Syntax

```markdown
[hero: *optional CSS here*]
Content goes here
[:hero]
```

The CSS after the colon is optional. Leave it blank for the default styling: `[hero:]`.

# Parameters

Any valid CSS property can be passed as an inline style:

| Property | Example |
|---|---|
| Background colour | `background-color: var(--accent-pale)` |
| Text colour | `color: white` |
| Text alignment<br>->left, right, centre | `text-align: center` |
| Padding<br>->Space between content and its border | `padding: 3rem 1.5rem` |
| Border<br>->hickness, style and color of the border | `border-bottom: 2px solid var(--accent)` |

# Example

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
renders:

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


---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
