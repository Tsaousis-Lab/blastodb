---
layout: layouts/documentation.njk
title: People
description: Schema reference for the People collection.
---

[hero: text-align:center]

<h-hero>People</h-hero>

[:hero]

People are stored as a JSON array in `content/data/people.json`. This collection is standalone — it does not link to any other collection.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Full name of the person |
| `picture` | image | no | Square portrait photo |
| `mail` | email | no | Email address |
| `affiliation` | string | no | Free-text affiliation |
| `role` | string | no | A single word describing what they do, e.g. "Developer" |
| `website` | URL | no | Personal or lab webpage |
| `github` | URL | no | GitHub profile |

→ [Editor Guide: People](/documentation/editors_guide/people/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
