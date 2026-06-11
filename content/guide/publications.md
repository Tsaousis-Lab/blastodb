---
layout: layouts/guide.njk
title: Publications
description: How to add and manage publications in the BlastoDB CMS.
---

<h-hero>Publications</h-hero>

Here you find the information on how to add, edit or remove publications on the admin panel of BlastoDB ([www.blastodb.com/admin](/admin)). You also find an overview and description of the input fields.


## Add a new Publication

1. Click **Publications** in the left sidebar
2. Click the single **Publications** file entry
3. Scroll to the bottom and click **+ Add Publication**. (This is easyer if you click *collapse all* on the top right)
4. Enter the relevant Data.
5. Click **Save** on the top right. -> The Website will be updated automatically within a few minutes.


## Editing an existing Publication

1. Click **Publications** in the left sidebar.
2. Click the single **Publications** file entry.
3. Find the publication you want to edit. (This is easyer if you click *collapse all* on the top right).
4. Edit the relevant Data.
5. Click **Save** on the top right. -> The Website will be updated automatically within a few minutes.

## Delete a Publication

<div class="guide-warning">

**Please be Careful!** Other data on BlastoDB, the Datasets and Lab Protocols, is dependent on the publications stored here. Please remove all links to a publication forst, otherwise links in the datasets or lab protocols might break. **Only remove publications if you know it is save!**

</div>

1. Click **Publications** in the left sidebar
2. Click the single **Publications** file entry
3. Find the publication you need(This is easyer if you click *collapse all* on the top right).
4. Click the "x" at the top right of the publication entery to delete it.
5. Click **Save** on the top right. -> The Website will be updated automatically within a few minutes.

## Fields

1. **Citation Key** `required` - Short, unique identifier for each publication.
    -  Please format is to **AuthorYear**, e.g.:
        - `Tsaousis2023`
        - `Gentekaki2017`
        - `Clark2013`
    - If two publications share the same key, add a letter
      - `Smith2021a`
      - `Smith2021b`.
2. **Title** `required` - The title of the paper.
    - Input via text field.
3. **Authors** `required` - The authors of the paper.
    - One author per line, in the format `Lastname, Letter of First Name`. For example:<br>Tsaousis A.<br>Gentekaki E.<br>Roger A.<br>...
4. **Publication Date** `required` - The publication date
    - Enter a year (2024), month and year (06.2024), or full date (11.06.2024)
5. **Name of Publication** - The name of the journal or conference
    - Enter via text field.
6. **DOI** - The digital object identifier
    - Enter without the prefix of `https://doi.org/` prefix, e.g. `10.1038/s41564-019-0622-3`.
7. **URL** - Link to the publication
    - Enter via text field.
    - Only really needed of DOI is not available.
