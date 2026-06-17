---
layout: layouts/documentation.njk
title: Announcements
description: Schema reference for the Announcements collection.
---

[hero: text-align:center]

<h-hero>Announcements</h-hero>

[:hero]

Announcements are stored as a YAML list in a single file: `content/data/announcements.yaml`. They do not link to any other collection. Active announcements (within their date window) are shown on the homepage; all announcements appear on the `/announcements/` archive page.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Display headline |
| `publication_date` | string (dd.mm.yyyy) | yes | Announcement starts showing on this date |
| `valid_until` | string (dd.mm.yyyy) | yes | Announcement is hidden from homepage after this date |
| `body` | markdown | yes | Announcement content, rendered as HTML |

Date filtering is evaluated client-side at page load.

→ [Editor Guide: Announcements](/documentation/editors_guide/announcements/) &nbsp;|&nbsp; [Data Structure Overview](/documentation/technical/)
