---
layout: layouts/guide.njk
title: Subtypes
description: How to add and edit Blastocystis subtype pages in the BlastoDB CMS.
---

<h-hero>Subtypes</h-hero>

Here you find the information on how to add, edit or remove Blastocystis subtypes on the admin panel of BlastoDB ([www.blastodb.com/admin](/admin)). You also find an overview and description of the input fields. Each subtype has its own page on the site that lists all datasets containing it.

## Add a new Subtype

1. Click **Subtypes** in the left sidebar.
2. Click **New Subtypes** in the top-right.
3. Fill in the fields described below.
4. Click **Save**. → The website will be updated automatically within a few minutes.

## Editing an Existing Subtype

1. Click **Subtypes** in the left sidebar.
2. Click on the subtype you want to edit.
3. Change what needs to be changed.
4. Click **Save**. → The website will be updated automatically within a few minutes.

<div class="guide-warning">

**Be careful when renaming subtypes.** The name of a subtype (e.G. `Subtype 7`) is used as a link for the datasets. When renaming a subtype, you must first remove it from all relevant datasets, then rename it, and then add it back in again to the datasets.

</div>

## Deleting a Subtype

<div class="guide-warning">

**Be careful when deleting subtypes.** Datasets that are linked to this subtype will lose that connection. Only delete a subtype if no dataset links to it.

</div>

1. Click **Subtypes** in the left sidebar.
2. Click on the subtype you want to delete.
3. Click the **Delete** button at the top of the editor.
4. Click **Save**. → The website will be updated automatically within a few minutes.

## Fields

1. **ID** `required` — The short subtype identifier used internally.
    - Format: `ST` followed by the subtype number, e.g. `ST1`, `ST2`, `ST17`.
    - This value is used for matching — once set it should not be changed.

2. **Name** `required` — The full display name shown on cards and in filter menus.
    - Format: `Subtype 1`, `Subtype 2`, etc.
    - Must match exactly the name used when tagging datasets — a mismatch will break the link between datasets and this subtype page.

3. **Sources / Hosts** — Sources where the subtype has been found (e.g. `Human`, `Mammals`, `Water`, ...).
    - Select from the controlled list.
    - If a source you need is missing, it can be added under *[Vocabularies](/guide/vocabularies/) → Data Sources*.

4. **Download Link to Reference Genomes** — A direct download URL for the reference genome sequence.
    - Leave blank if not available.

5. **Download Link to SSU rRNA Sequence** — A direct download URL for the SSU rRNA sequence.
    - Leave blank if not available.

6. **Description** `required` — A free-text description written in Markdown.
    - Write your descriptive text under the `# Short Description` heading at the top.
    - Leave everything below the `---` divider untouched.
    <div class="guide-warning">

    **Do not delete the collector block at the bottom of the description.** It is the code starting with `[collector -> datasets;` and is what automatically lists all datasets tagged with this subtype. If you delete it, copy it from another subtype's description field. See the [Pages guide](/guide/pages/) for an explanation of collector blocks.

    </div>
