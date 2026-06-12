---
layout: layouts/documentation.njk
title: BlastoDB — Button
description: A styled link button for calls to action and navigation.
---

[hero: text-align:center]

<h-hero>Button</h-hero>

A styled link that renders as a solid call-to-action button.

[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

## What it does

The Button component renders a link as a solid teal button. Use it for navigating to a section, opening a dataset, or pointing to an external resource. It is an **inline element** — it sits within a paragraph or can stand alone on a line.

## Syntax

```markdown
[btn: Button Label -> /url/]
```

Both the label and the URL are required, separated by ` -> `.

## Example

```markdown
[btn: View Datasets -> /datasets/]
[btn: External Link -> https://www.example.com]
```

[btn: View Datasets -> /datasets/]
[btn: External Link -> https://www.example.com]

## Links

For a full explanation of how links work see the [Markdown Syntax guide](/documentation/markdown/markdown_syntax/#links).

**External link** — use the full URL including `https://`:
```markdown
[btn: Visit Kent University -> https://www.kent.ac.uk/]
```

**Internal link** — use the page path without the domain:
```markdown
[btn: View Subtypes -> /subtypes/]
[btn: Homepage -> /]
```

**Link to a heading** — append `#custom-id` to jump to a section. Headings need a `{#custom-id}` attribute first — see the [Markdown Syntax guide](/documentation/markdown/markdown_syntax/#linking-to-a-headline).
```markdown
[btn: Jump to Lists -> /documentation/markdown/markdown_syntax/#lists]
```

## Tips

- Prefer internal paths (`/subtypes/`) over full URLs — they stay correct if the domain changes
- Use one button per card for a clear primary action
- For multiple related links in one button, use `[sbtn:]` instead — see the [Selector Button](/documentation/markdown/custom_components/sbtn/) page

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
