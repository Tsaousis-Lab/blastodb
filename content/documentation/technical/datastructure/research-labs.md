---
layout: layouts/documentation.njk
title: Research Labs
description: Schema reference for the Research Labs collection.
---

[hero: text-align:center]

<h-hero>Research Labs</h-hero>

[:hero]

Research labs are stored as a JSON array in `content/data/research_labs.json`. The collection is referenced by the [Biobank](/documentation/technical/datastructure/biobank/), whose entries link to a lab via its `key` (UUID) and derive their name and country from the lab.

| Field | Type | Required | Notes |
|---|---|---|---|
| `key` | UUID (hidden) | yes | Auto-generated; Biobank entries reference a lab via this key (`affiliated_lab`) |
| `lab_name` | string | yes | Name of the research lab |
| `institution_name` | string | yes | Name of the host institution |
| `institution_address` | text | yes | Full postal address |
| `country` | string | no | Country of the institution; used as the country for affiliated Biobank entries |
| `institution_logo_upload` | image | no | Uploaded logo file |
| `institution_logo_url` | URL | no | External logo URL (used if no file uploaded) |
| `short_description` | text | no | A few sentences about the lab |
| `contact_name` | string | yes | Name of the primary contact |
| `contact_mail` | email | yes | Contact email address |
| `contact_url` | URL | no | Contact person's webpage |
| `contact_img_path` | image | no | Square portrait photo |

→ [Editor Guide: Research Labs](/documentation/editors_guide/labs/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
