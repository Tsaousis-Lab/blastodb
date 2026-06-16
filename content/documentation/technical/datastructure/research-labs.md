---
layout: layouts/documentation.njk
title: Research Labs
description: Schema reference for the Research Labs collection.
---

[hero: text-align:center]

<h-hero>Research Labs</h-hero>

[:hero]

Research labs are stored as a JSON array in `content/data/research_labs.json`. This collection is standalone — it does not link to any other collection.

| Field | Type | Required | Notes |
|---|---|---|---|
| `lab_name` | string | yes | Name of the research lab |
| `institution_name` | string | yes | Name of the host institution |
| `institution_address` | text | yes | Full postal address |
| `institution_logo_upload` | image | no | Uploaded logo file |
| `institution_logo_url` | URL | no | External logo URL (used if no file uploaded) |
| `short_description` | text | no | A few sentences about the lab |
| `contact_name` | string | yes | Name of the primary contact |
| `contact_mail` | email | yes | Contact email address |
| `contact_url` | URL | no | Contact person's webpage |
| `contact_img_path` | image | no | Square portrait photo |

→ [Editor Guide: Research Labs](/documentation/editors_guide/labs/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
