---
layout: layouts/documentation.njk
title: Subtypes
description: How to add and edit Blastocystis subtype pages in the BlastoDB CMS.
---

[hero: text-align:center]

<h-hero>Subtypes</h-hero>

[:hero]

BlastoDB stores information about its known subtypes (<a href="/subtypes/" target="_blank">www.blastodb.com/subtypes</a>). Here you find a guide on how to edit this information in the admin panel, and get an overview and description of all parameters.

If you want to edit the webpage displaying all the subtypes, you finde a guide [here](/documentation/editors_guide/pages/).

# Editing the Subtypes

You can edit the content by opening the **Subtypes** collection on the left side on the admin panel (<a href="/admin/#/collections/subtypes" target="_blank">www.blastodb.com/admin/#/collections/subtypes</a>).

#### Add a new Subtype

1. Click **New** in the top-right
2. Fill in the fields described below
3. Click **Save** → The website will be updated automatically within a few minutes

#### Editing an Existing Subtype

1. Click on the subtype you want to edit
2. Change what needs to be changed
3. Click **Save** → The website will be updated automatically within a few minutes

<div class="guide-warning">

**Be careful when renaming subtypes.** The name of a subtype (e.G. `Subtype 7`) is used as a link for the datasets. When renaming a subtype, you must first remove it from all relevant datasets, then rename it, and then add it back in again to the datasets.

</div>

#### Deleting a Subtype

<div class="guide-warning">

**Be careful when deleting subtypes.** Datasets that are linked to this subtype will lose that connection. Only delete a subtype if no dataset links to it.

</div>

1. Click on the subtype you want to delete
2. Click the **Delete** button at the top right
3. A prompt will open, click on **Delete** again → The website will be updated automatically within a few minutes

# Fields

1. **ID** `required` — The short subtype identifier used internally.
    - Format: `ST` followed by the subtype number, e.g. `ST1`, `ST2`, `ST17`.
    - This value is used for matching — once set it should not be changed.

2. **Name** `required` — The full display name shown on cards and in filter menus.
    - Format: `Subtype 1`, `Subtype 2`, etc.
    - Must match exactly the name used when tagging datasets — a mismatch will break the link between datasets and this subtype page.

3. **Sources / Hosts** — Sources where the subtype has been found (e.g. `Human`, `Mammals`, `Water`, ...).
    - Select from the controlled list.
    - If a source you need is missing, it can be added under *[Vocabularies](/documentation/editors_guide/vocabularies/) → Data Sources*.

4. **Download Link to Reference Genomes** — A direct download URL for the reference genome sequence.
    - Leave blank if not available.

5. **Download Link to SSU rRNA Sequence** — A direct download URL for the SSU rRNA sequence.
    - Leave blank if not available.

6. **Description** `required` — A free-text description written in Markdown.
    - Write your descriptive text in markdown ([see markdown cheat sheet](/documentation/markdown/markdown_cheat_sheet/)).
    <div class="guide-warning">
    
    **Be Careful! You can break things here.** The description supports the extendet markdown syntax, which need to be defined exactly, otherwise the build of the website might fail. Please edit the webpage locally, if you want to use these features.

    </div>
