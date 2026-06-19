---
layout: layouts/documentation.njk
title: Button
description: A styled link button for calls to action and navigation.
---

[hero: text-align:center]

<h-hero>Button</h-hero>

Buttons are used for interactions on the webpage (see the [styleguide](/documentation/styleguide/components/#links--buttons) on when to use buttons and when to use links).

[:hero]

# Syntax

```markdown
[btn: *Button Label* -> */url/*]
```

Both the label and the URL are required, separated by ` -> `.

For a full explanation of how **links** work see the [Markdown Syntax guide](/documentation/markdown/markdown_syntax/#links).

# Examples

```markdown
[btn: View Datasets -> /datasets/]

[btn: External Link -> https://www.blastodb.com]
```

[btn: View Datasets -> /datasets/]

[btn: External Link -> https://www.blastodb.com]
*Please use a [link](/documentation/markdown/markdown_syntax/#links-to-external-websites) if you want to link to an external website (see [styleguide](/documentation/styleguide/components/#links--buttons)).

## Internal link
For internal links, use the path without the domain (e.G. ~~`https://www.blastodb.com`~~`/subtypes/`):
```markdown
[btn: View Subtypes -> /subtypes/]
[btn: Homepage -> /]
```
The path including the domain also works. However, these links would loose its functionality if the primary domain ever changes. For this reason, the path is strongly preferred.

## Link to a heading

Append `#custom-id` to jump to a section. Headings need a `{#custom-id}` attribute first. See the [Markdown Syntax guide](/documentation/markdown/markdown_syntax/#linking-to-a-headline) for more information.
```markdown
[btn: Jump to Lists -> /documentation/markdown/markdown_syntax/#lists]
```

## External link

Buttons are not supposed to be used with external links (see the [styleguide](/documentation/styleguide/components/#links--buttons) for more information). Consider using an [external link](/documentation/styleguide/typography/#external-links).
Tecklically, buttons can be used for external links by using the full domain including `https://`:
```markdown
[btn: Visit Kent University -> https://www.kent.ac.uk/]
```

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]
