---
layout: layouts/documentation.njk
title: Publications
description: Schema reference for the Publications collection.
---

[hero: text-align:center]

<h-hero>Publications</h-hero>

[:hero]

Publications are stored as a JSON array in a single file: `content/data/publications.json`. Datasets and lab protocols link to publications via the hidden `key` field.

| Field | Type | Required | Notes |
|---|---|---|---|
| `key` | UUID | auto | Hidden; auto-generated stable identifier — never edit |
| `title` | string | yes | Title of the paper |
| `authors` | string[ ] | yes | One entry per author, e.g. `Tsaousis A.` |
| `date` | string | yes | Format: `yyyy`, `mm.yyyy`, or `dd.mm.yyyy` |
| `publication_name` | string | no | Journal or conference name |
| `doi` | string | no | DOI without the `https://doi.org/` prefix |
| `url` | URL | no | Full URL — only needed when DOI is unavailable |

All publications live in one list; there are no individual files per publication.

→ [Editor Guide: Publications](/documentation/editors_guide/publications/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
