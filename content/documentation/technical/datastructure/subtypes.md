---
layout: layouts/documentation.njk
title: Subtypes
description: Schema reference for the Subtypes collection.
---

[hero: text-align:center]

<h-hero>Subtypes</h-hero>

[:hero]

Each subtype is a separate Markdown file in `content/data/subtypes/`. Subtypes are linked from datasets via the hidden `key` field.

| Field | Type | Required | Notes |
|---|---|---|---|
| `key` | UUID | auto | Hidden; auto-generated stable identifier — never edit |
| `name` | string | yes | Display name, e.g. `Subtype 1` |
| `sources` | string[ ] | no | Hosts where the subtype has been found (controlled list) |
| `reference_genome_link` | URL | no | Direct download link to the reference genome |
| `ssu_rrna_link` | URL | no | Direct download link to the SSU rRNA sequence |
| `body` | markdown | no | Free-text description |
| `layout` | hidden | auto | Always `layouts/subtype.njk` |

The `key` field is invisible in the CMS and auto-generated on entry creation. The subtype page automatically lists all datasets linked to it.

→ [Editor Guide: Subtypes](/documentation/editors_guide/subtypes/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
