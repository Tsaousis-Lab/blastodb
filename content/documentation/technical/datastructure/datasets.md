---
layout: layouts/documentation.njk
title: Datasets
description: Schema reference for the Datasets collection.
---

[hero: text-align:center]

<h-hero>Datasets</h-hero>

[:hero]

Each dataset is a separate Markdown file in `content/data/datasets/`. Datasets are the central entity in BlastoDB — they link to subtypes, publications, and lab protocols via UUID keys.

| Field | Type | Required | Notes |
|---|---|---|---|
| `key` | UUID | auto | Hidden, auto-generated; lets other collections (e.g. Blog) link to the dataset |
| `title` | string | yes | Display name of the dataset |
| `link_to_source` | URL | yes | Link to the raw data source |
| `publication_date` | string | no | Format: `yyyy`, `mm.yyyy`, or `dd.mm.yyyy` |
| `related_publications` | UUID[ ] | no | Keys of linked publications |
| `datatypes` | string[ ] | no | Controlled list (see Vocabularies) |
| `strains` | string[ ] | no | Free-text strain identifiers |
| `data_origins` | string[ ] | no | Controlled list (see Vocabularies) |
| `detection_methods` | string[ ] | no | Controlled list (see Vocabularies) |
| `subtypes` | UUID[ ] | no | Keys of linked subtypes |
| `sources` | string[ ] | no | Controlled list (see Vocabularies) |
| `countries` | string[ ] | no | Country names (see Vocabularies) |
| `lab_protocols` | UUID[ ] | no | Keys of linked lab protocols |
| `annotations` | object[ ] | no | Contextual notes shown below the hero (see below) |
| `body` | markdown | no | Free-text description |
| `layout` | hidden | auto | Always `layouts/dataset-page.njk` |

Cross-collection fields (`subtypes`, `related_publications`, `lab_protocols`) store the `key` UUID of the target entry. Renaming the target does not break the link.

## Annotations

`annotations` is an embedded list of objects. Each object has:

| Field | Type | Required | Notes |
|---|---|---|---|
| `severity` | string | no | `info`, `warning`, or `severe`. Defaults to `info` |
| `title` | string | yes | Heading of the annotation |
| `text` | markdown | no | Basic markdown only, rendered via the `markdownify` filter |
| `related_publications` | UUID[ ] | no | Keys of linked publications |

Annotations render between the hero and the body in `_includes/layouts/dataset-page.njk`, each styled per `severity` via the `severityIcon` macro in `_includes/annotation-macros.njk`. The collector card derives an `annotation_severity` field (the highest severity across a dataset's annotations) in `.eleventy.js` to render the indicator pill.

→ [Editor Guide: Datasets](/documentation/editors_guide/datasets/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/datastructure/)
