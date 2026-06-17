---
layout: layouts/documentation.njk
title: Publications
description: How to add and manage publications in the BlastoDB CMS.
---

[hero: text-align:center]

<h-hero>Publications</h-hero>

[:hero]

BlastoDB provides an overview of all poblications related to content on this website (<a href="/publicatios/" target="_blank">www.blastodb.com/publications</a>). Here you find a guide on how to edit this information in the admin panel, and get an overview and description of all parameters.

If you want to edit the webpage displaying the publications, you finde a guide [here](/documentation/editors_guide/pages/).

# Editing the Publications

You can edit the content by opening the **Publications** collection on the left side on the admin panel, and opening the single 'Publications' entery (<a href="/admin/#/collections/publications/entries/publications" target="_blank">www.blastodb.com/admin/#/collections/publications/entries/publications</a>). Here, you can select which ones you want to edit.

#### Add a Publication

1. Scroll to the bottom and click **+ Add Publication** (This is easyer if you click *collapse all* on the top right)
2. Enter the relevant Data (you can find a description of the fields below)
3. Click **Save** on the top right -> The Website will be updated automatically within a few minutes


#### Edit a Publication

1. Find the publication you want to edit (This is easyer if you click *collapse all* on the top right)
2. Edit the relevant Data (you can find a description of the fields below)
3. Click **Save** on the top right -> The Website will be updated automatically within a few minutes

You can also **rearrange** the publications by using the arrows, or **add an item above or below** by clicking the three dots beside the **x** in a publication entery.

#### Delete a Publication

<div class="guide-warning">

**Please be Careful!** Other data on BlastoDB, the Datasets and Lab Protocols, is dependent on the publications stored here. Please remove all links to a publication forst, otherwise links in the datasets or lab protocols might break. **Only remove publications if you know it is save!**

</div>

1. Find the publication you need(This is easyer if you click *collapse all* on the top right)
2. Click the "x" at the top right of the publication entery to delete it
3. Click **Save** on the top right -> The Website will be updated automatically within a few minutes

# Fields

1. **Title** `required` - The title of the paper.
2. **Authors** `required` - The authors of the paper.
    - One author per line, in the format `Lastname, Letter of First Name`. For example:<br>Tsaousis A.<br>Gentekaki E.<br>Roger A.<br>...
3. **Publication Date** `required` - The publication date
    - Enter a year (2024), month and year (06.2024), or full date (11.06.2024)
4. **Name of Publication** - The name of the journal or conference
5. **DOI** - The digital object identifier
    - Enter without the prefix of `https://doi.org/` prefix, e.g. `10.1038/s41564-019-0622-3`.
6. **URL** - Link to the publication
    - Only really needed of DOI is not available.
