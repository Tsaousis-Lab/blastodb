---
layout: layouts/documentation.njk
title: Lab Protocols
description: Schema reference for the Lab Protocols collection.
---

[hero: text-align:center]

<h-hero>Lab Protocols</h-hero>

[:hero]

Each lab protocol is a separate Markdown file in `content/data/lab_protocols/`. Lab protocols are linked from datasets, and can themselves link to publications.

| Field | Type | Required | Notes |
|---|---|---|---|
| `key` | UUID | auto | Hidden; auto-generated stable identifier — never edit |
| `title` | string | yes | Display name of the protocol |
| `related_publications` | UUID[ ] | no | Keys of linked publications |
| `body` | markdown | yes | Full protocol description |
| `layout` | hidden | auto | Always `layouts/lab-protocol.njk` |

→ [Editor Guide: Lab Protocols](/documentation/editors_guide/lab-protocols/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
