---
layout: layouts/documentation.njk
title: Blog
description: Schema reference for the Blog collection.
---

[hero: text-align:center]

<h-hero>Blog</h-hero>

[:hero]

Each blog article is a separate Markdown file in `content/data/blog/`. Articles are folder-based pages (like datasets), rendered with `layouts/blog-post.njk`, and listed on `/blog/` via `layouts/blog-list.njk`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Headline of the article |
| `publication_date` | string | yes | Format: `yyyy`, `mm.yyyy`, or `dd.mm.yyyy` |
| `author` | string | no | Person `name` from the People collection |
| `related_publications` | UUID[ ] | no | Keys of linked publications |
| `related_subtypes` | UUID[ ] | no | Keys of linked subtypes |
| `related_datasets` | UUID[ ] | no | Keys of linked datasets |
| `body` | markdown | no | Article text |
| `layout` | hidden | auto | Always `layouts/blog-post.njk` |

## Cross-linking

Blog articles reference other collections by their stable `key`:

- `related_subtypes` → subtype `key`
- `related_datasets` → dataset `key` (a UUID added to the datasets collection for this purpose)
- `related_publications` → publication `key`

The links are **reverse-rendered**: a dataset or subtype page shows a "Related Blog Articles" section by filtering the `blog` collection for articles whose `related_datasets` / `related_subtypes` array contains that page's `key`. This uses the collector's array-contains prefilter (`assets/main.js`), the same mechanism subtype pages use to list their datasets.

## Build details

- `getItemsFromCollection` in `.eleventy.js` adds an `excerpt` (first ~40 words of the body, plain text) used by the listing boxes and related-article cards, and sorts articles newest-first by parsing `publication_date`.
- The listing box markup is shared between the listing layout and the `blog` collector card via the `_includes/blog-macros.njk` `blogBox` macro.

→ [Editor Guide: Blog](/documentation/editors_guide/blog/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/datastructure/)
