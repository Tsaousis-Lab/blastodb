---
layout: layouts/documentation.njk
title: Announcements
description: How to add and manage announcements in the BlastoDB CMS.
---

[hero: text-align:center]

<h-hero>Announcements</h-hero>

[:hero]

Announcements are shown on the BlastoDB homepage during a defined date window. A maximum of two announcements are displayed at once. All announcements (including past ones) are listed at <a href="/announcements/" target="_blank">www.blastodb.com/announcements</a>.

# Editing the Announcements

Open the **Announcements** collection in the left sidebar of the admin panel (<a href="/admin/#/collections/announcements/entries/announcements" target="_blank">www.blastodb.com/admin/#/collections/announcements/entries/announcements</a>).

#### Add an Announcement

1. Scroll to the bottom and click **+ Add Announcement** (easier after clicking *Collapse all* top right)
2. Fill in the fields described below
3. Click **Save** → The website updates automatically within a few minutes

#### Edit an Announcement

1. Find the announcement you want to edit (easier after clicking *Collapse all* top right)
2. Edit the relevant fields
3. Click **Save** → The website updates automatically within a few minutes

You can also change the order of the anouncements here, using the arrow buttons.

#### Delete an Announcement

1. Find the announcement
2. Click the **x** at the top right of the entry
3. Click **Save** → The website updates automatically within a few minutes

# Fields

1. **Title** `required` — The headline of the announcement.
2. **Publication Date** `required` — The date the announcement starts appearing on the homepage.
    - Format: `dd.mm.yyyy`, e.g. `16.06.2026`.
    - The announcement will not be visible before this date.
3. **Valid Until** `required` — The date after which the announcement is hidden from the homepage.
    - Format: `dd.mm.yyyy`, e.g. `02.09.2026`.
    - The announcement remains visible on the [Announcements archive page](/announcements/) regardless of this date.
4. **Body** `required` — The content of the announcement, written in Markdown.
    - Keep it concise — announcements are shown inline on the homepage.
