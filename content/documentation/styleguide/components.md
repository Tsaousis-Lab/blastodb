---
layout: layouts/documentation.njk
title: BlastoDB — Components
description: Visual elements and layout components for BlastoDB.
---

[hero: text-align:center]
<h-hero>Components</h-hero>
[:hero]

# Button

[btn: Primary Action -> #]

**`.btn`** / `[btn: Label -> /url/]` — the main call-to-action. Use for navigating to a section, opening a dataset, or submitting a form. Solid teal, lifts slightly on hover. Add `.btn-disabled` when an action is genuinely unavailable.

---

# Links & Buttons {#links--buttons}

Four types are available. Choose based on where the link sits and how many destinations it has.

| Type | Use when | Example |
|---|---|---|
| Normal link `[text](url)` | Link is **inside a sentence** — inline prose, cross-references, citations | "See the [Subtypes page](/subtypes/) for details." |
| Arrow link `.external-link` ↗ | Link is **external** and sits in a **metadata or card context** — not inside prose | Source attribution next to a dataset title |
| Button `[btn:]` | Link is a **standalone primary action** with **one destination** | "Download Data" or "View Subtypes" at the end of a card |
| Selector button `[sbtn:]` | Link is a **standalone primary action** with **multiple destinations** (e.g. file formats) | "Download Data" that reveals CSV / XLSX / JSON options |

In-text links/normal links can be used for both internal and external linking. Otherwise, external links should use an arrow link, and internal links a button or selector button.

**Decision tree:**
```
Is the link inside a sentence?
  → Yes → Normal link
  → No — is it external attribution in a metadata or card context?
      → Yes → Arrow link (↗)
      → No (it is a primary action on the website?)
          → One destination        → [btn:]
          → Multiple destinations  → [sbtn:]
```

---

# Tag

<span class="tag">ST1</span> <span class="tag">Genomics</span> <span class="tag tag-muted">Germany</span>

**`.tag`** — structured metadata: subtypes, data types, detection methods. Monospace, uppercase, teal pill. Scannable at a glance.

**`.tag-muted`** — secondary or contextual metadata: countries, sources. Same shape, muted warm-grey fill. Used alongside `.tag` so the hierarchy is visible.

---

# Hero

**`[hero:]`** — a full-width banner that bleeds to the viewport edge. Use once per page, always as the first element in `<main>`. Carries the page title (`h-hero`) and a brief orientation: tags, download links, or a single call-to-action.

Add `hero-content-center` (via the layout template) to stack content centrally — used on dataset and subtype pages.

---

# Box

**`[box:]`** — a simple flex column with a `0.5 rem` gap. Has no visual chrome of its own; it just stacks its children vertically. Takes an optional inline style (`[box: text-align:center]`) for alignment. Used as the column unit inside `[cols:]` and `[grid:]`.

---

# Card

[grid: cols:3]

[card:]
### Resources
A short description. Keep cards focused — one topic, one action per card.
[btn: Explore -> #]
[:card]

[card:]
### Methods
A short description. Keep cards focused — one topic, one action per card.
[btn: Explore -> #]
[:card]

[card:]
### Community
A short description. Keep cards focused — one topic, one action per card.
[btn: Explore -> #]
[:card]

[:grid]

**`[card:]`** — a content card with a warm background and soft shadow. Use inside a `[grid:]` to present parallel resources or navigation options. Not interactive by itself — place a `[btn:]` inside for the action.

---

##Columns

[cols:]

[box:]
### Left column
Two equal-width columns, collapsing to a single column on mobile. Use for paired text + image, a list next to a description, or two related blocks of content.
[:box]

[box:]
### Right column
Columns align to their tops. Good for narrative content; less suited to items that need equal height.
[:box]

[:cols]

**`[cols:]`** — two-column, equal-width layout. Always wrap each side in a `[box:]`. Collapses to one column below 720 px.

---

# Grid

**`[grid:]`** — a responsive auto-fill grid. Default column minimum is 280 px. Add `cols:2`, `cols:3`, `cols:4`, or `cols:5` for a fixed column count. Use for card groups and icon-link rows. Collapses to one column on narrow screens.

---

# Collector

**`[collector -> collectionName; opts]`** - a filterable, searchable list of cards drawn from a Sveltia CMS collection. Options:

| Option | Example | Effect |
|---|---|---|
| `search` | `search` | Adds a search box |
| `filter` | `filter: subtypes` | Adds a filter dropdown for a field |
| `sort` | `sort: publication_date` | Adds a sort control |
| `arrange` | `arrange: rows` | Renders cards as rows instead of a grid |

**Card types by collection:**

| Collection | Card | Shows |
|---|---|---|
| `datasets` | Dataset card | Title, publication date, subtypes, countries, links to subtype page and source |
| `publications` | Publication card | Title, authors, journal, year |
| `research_labs` | Lab card | Name, institution, country |
| `lab_protocols` | Protocol card | Title, category |

Each card is a compact summary - detailed content lives on the individual page. The collector is the right place for browsing and filtering; individual pages are the right place for depth.

---

# Collector Card Anatomy {#collector-card-anatomy}

Collector cards are designed to be flexible. This here is a suggested layout for a more consistent styling. Not every slot is required:

| Slot | Required | Element / class | Font, size, colour |
|---|---|---|---|
| Eyebrow | no | `<div class="...">` | Public Sans, 0.9rem, `--text` or `--text-muted` |
| Title row | yes | `<h3 class="card-title">` | Crimson Pro, 1.2rem, weight 500, `--text` |
| Date (on title row) | no | `<span class="...date">` | IBM Plex Mono, 0.85rem, `--text-muted`, right-aligned |
| Source line | no | `<div>` / `<span>` | Public Sans, 0.9rem, italic, `--text-muted`, one line |
| Tags | no | `<span class="tag">` / `<span class="tag tag-muted">` | — |
| Description | no | `<p class="collector-item-description">` | Public Sans, 0.9rem, `--text-muted`, line-height 1.5 |
| Actions | no | `<a class="external-link">` / `.btn` | always at the bottom |

**Rules:**

- Title is always `<h3 class="card-title">` / `###`, never `<h2>`, never `<strong>`
- Dates sit right-aligned on the title row, not below it
- External links use `.external-link` + ↗, see the [Links & Buttons guide](#links--buttons)
- Disabled-state downloads (e.g. "Reference Genome — not available") may use `.btn` with `.btn-disabled`
- One action area per card; keep to 1–2 links

**Exception:** The research-lab card has a unique contact section (avatar, email, institution) that does not map to these slots — its structure is intentional and should be kept as-is.
