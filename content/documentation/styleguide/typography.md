---
layout: layouts/documentation.njk
title: BlastoDB — Typography
description: Typefaces, heading scale, body text, and colour tokens for BlastoDB.
---

[hero: text-align:center]
<h-hero>Typography</h-hero>
[:hero]

## Typefaces

Three families cover every context on the site.

| Role | Family | Used for |
|---|---|---|
| Headline | Crimson Pro | Headings, hero text, the site logo |
| Body / UI | Public Sans | Body copy, navigation, buttons, labels |
| Mono | IBM Plex Mono | Code snippets, tag pills |

---

## Heading scale

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

## Body text

Public Sans · 1 rem · 1.7 line-height. The generous line-height is intentional — scientific content benefits from breathing room.

Use **bold** (`**text**`) for key terms and important values. Use *italics* (`*text*`) for emphasis and species names (*Blastocystis*).

Inline `code` is set in IBM Plex Mono with a teal pale background. Use it for filenames, field names, and short identifiers.

---

## Links

**Standard link** — accent colour with a persistent underline. Default for links in running prose.

**`.link-underline`** — accent colour, underline animates in on hover. Use for links alongside metadata (dataset cards, download links) where a permanent underline would feel heavy.

<a href="#" class="link-underline">Example link-underline ↗</a>

**Styled spans** — `[s: css]content[:s]` applies arbitrary inline CSS. Use sparingly, only for one-off typographic emphasis that has no existing class. Example: the genus name in the homepage hero uses `color: var(--accent-darker)`.

---

For the full colour palette and design tokens, see the [Color Guide](/documentation/styleguide/colors/).
