---
layout: layouts/documentation.njk
title: BlastoDB — Typography
description: Typefaces, heading scale, body text, and colour tokens for BlastoDB.
---

[hero: text-align:center]
<h-hero>Typography</h-hero>
[:hero]

# Typefaces

Three families cover every context on the site.

| Role | Family | Used for |
|---|---|---|
| Headline | Crimson Pro | Headings, hero text, the site logo |
| Body / UI | Public Sans | Body copy, navigation, buttons, labels |
| Mono | IBM Plex Mono | Code snippets, tag pills |

---

# Heading scale {#headings}

Heading sizes are fluid — they scale smoothly between the minimum and maximum as the viewport widens.

<h-hero>Hero headline</h-hero>

**`h-hero`** · Crimson Pro · fluid 40–72 px · weight 300. Only used inside a `[hero:]` block, once per page.

# Heading 1

**`h1`** · Crimson Pro · fluid 30–40 px · weight 400. Top-level page sections.

## Heading 2

**`h2`** · Crimson Pro · fluid 24–30 px · weight 500. Secondary sections within a page.

### Heading 3

**`h3`** · Crimson Pro · fluid 20–24 px · weight 600. Sub-sections and collector card titles.

#### Heading 4

**`h4`** · Crimson Pro · fluid 17–19 px · weight 600. Fine-grained groupings, rarely needed.

---

# Body text

Public Sans · 1 rem · 1.7 line-height. The generous line-height is intentional — scientific content benefits from breathing room.

Use **bold** (`**text**`) for key terms and important values. Use *italics* (`*text*`) for emphasis and species names (*Blastocystis*).

Inline `code` is set in IBM Plex Mono with a teal pale background. Use it for filenames, field names, and short identifiers.

---

# Links {#links}

Links are used either for in-text links, or as links to external websites. Other interactions on BlastoDB should be done with Buttons. See the [style guide for links and buttons](/documentation/styleguide/components/#links--buttons) for when to use which.

## Standard Links / In-Text Links {#links-in-text}
[Standart links](#links-in-text) are colored in the accent color, and underlined. They are mainly used for links within written text.

## External Links {#external-links}

**`.external-link`** — accent colour, always underlined, darkens and lifts slightly (`translateY(-1px)`) on hover. Use for links that open external websites, such as links to datasets. These links are standalone and should be written in title-case with a ↗ suffix. [Write it like this in HTML](/documentation/markdown/markdown_syntax/#links-to-external-websites):

`<a href="https://external-link.co.uk" class="external-link">Example External Link ↗</a>`
<br>
<a href="#external-links" class="external-link">Example External Link ↗</a>

---

For the full colour palette and design tokens, see the [Color Guide](/documentation/styleguide/colors/).
