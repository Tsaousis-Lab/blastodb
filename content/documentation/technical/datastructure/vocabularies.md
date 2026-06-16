---
layout: layouts/documentation.njk
title: Vocabularies
description: Schema reference for vocabulary lists used across BlastoDB collections.
---

[hero: text-align:center]

<h-hero>Vocabularies</h-hero>

[:hero]

Vocabularies are flat controlled lists managed under the **Vocabularies** section in the CMS. Unlike cross-collection links, vocabulary values are stored as plain strings — not UUIDs. Renaming a vocabulary term does not automatically update existing entries that use it.

| Vocabulary | File | Structure | Used in |
|---|---|---|---|
| Datatypes | `content/data/datatypes.yaml` | string list | Datasets |
| Sources / Hosts | `content/data/sources.yaml` | string list | Datasets, Subtypes |
| Data Origins | `content/data/data_origins.yaml` | string list | Datasets |
| Detection Methods | `content/data/detection_methods.yaml` | string list | Datasets |
| Countries | `content/data/countries.yaml` | `{iso, name}` objects | Datasets |

## File Format

All vocabulary files except Countries use a simple list:

```yaml
datatypes:
  - 18s
  - Genome
  - Transcriptome
```

Countries store ISO code alongside the display name:

```yaml
countries:
  - iso: DE
    name: Germany
  - iso: GB
    name: United Kingdom
```

Datasets store the `name` value for countries (not the ISO code).

→ [Editor Guide: Vocabularies](/documentation/editors_guide/vocabularies/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
