---
layout: layouts/guide.njk
title: Navigation
description: How to edit the header navigation, footer, and site branding in the BlastoDB CMS.
---

<h-hero>Navigation</h-hero>

Here you find the information on how to edit the header menu, footer, and site branding on the admin panel of BlastoDB ([www.blastodb.com/admin](/admin)).


## Editing the Header

1. Click **Navigation** in the left sidebar.
2. Click **Header Configuration**.
3. Add, edit, or remove items in the **Header Items** list. You can find a description of the fields below.
4. Click **Save**. → The website will be updated automatically within a few minutes.

<div class="guide-warning">

**Please make shure the links are correct!** If you do not specify the link correctly, the buttons in the header will go to a wrong or non-existing page.

</div>


## Editing the Footer

1. Click **Navigation** in the left sidebar.
2. Click **Footer Configuration**.
3. Edit the relevant fields. You can find a description of the fields below.
4. Click **Save**. → The website will be updated automatically within a few minutes.

<div class="guide-warning">

**Please make shure the links are correct!** If you do not specify the link correctly, the buttons in the header will go to a wrong or non-existing page.

</div>

## Editing the Title and Logo

1. Click **Navigation** in the left sidebar.
2. Click **Title and Logo**.
3. Edit the relevant fields. You can find a description of the fields below.
4. Click **Save**. → The website will be updated automatically within a few minutes.

## Header fields

Each header item is either a **direct link** or a **dropdown** with sub-links.

1. **Label** `required` — The text shown in the navigation bar, e.g. `Research Labs`.

2. **File** — The path to the `.md` page this item links to.
    - Must match an existing file exactly, e.g. `content/labs.md`.
    - Leave blank if the item is a dropdown with sub-items instead of a direct link.

3. **Items** — Sub-links for a dropdown item.
    - Each sub-item has its own **Label** and **File**.
    - The **File** must match an existing `.md` file in the `content/` folder.

## Footer fields

1. **Description** — A short sentence shown next to the logo, e.g. *"The open hub for Blastocystis research."*

2. **Funding** — A funding acknowledgement line shown at the bottom of the footer.

3. **Footer Columns** — A list of link columns in the footer. Each column has:
    - **Column Title** — the heading for that column
    - **Links** — a list of links, each with a **Link Label** and a **URL**
    - URLs can be internal (e.g. `/datasets/`) or external (e.g. `https://github.com/Tsaousis-Lab/blastodb`)

## Title and Logo fields

1. **Site Title** — The name displayed next to the logo, e.g. `BlastoDB`.

2. **Logo (upload)** — Upload the site logo directly.
    - SVG, PNG or WebP on a transparent background works best.
    - If both an upload and a URL are provided, the uploaded file takes priority.

3. **Logo (URL)** — A link to the logo image hosted elsewhere (e.g. on your server or CDN).
    - Used only when no file is uploaded.
    - At least one of the two logo fields should be filled in.
