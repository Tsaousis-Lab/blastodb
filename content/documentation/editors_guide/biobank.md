---
layout: layouts/documentation.njk
title: Biobank
description: How to add and edit Biobank entries in the BlastoDB CMS.
---

[hero: text-align:center]
<h-hero>Biobank</h-hero>

The Biobank is a notice board for research labs working on blastocystis to offer resources. It is not a full shop system!
[:hero]

Each entry belongs to a [research lab](/documentation/editors_guide/labs/) and the country shown on the entry is taken automatically from that lab.

## Editing the Biobank

You can edit the content by opening the **Biobank** collection on the left side of the admin panel (<a href="/admin/#/collections/biobank" target="_blank">www.blastodb.com/admin/#/collections/biobank</a>).

#### Creating a new entry
1. Make sure the research lab offering this item is already in BlastoDB, as you will need to link to it ([-> how to add research labs](/documentation/editors_guide/labs/)).
2. Click **New** in the top-right.
3. Fill out the form. You can find a description of the fields below.
4. Click **Save**. -> The Website will be updated automatically within a few minutes.

#### Editing an existing entry
1. Click on the existing entry.
2. Change what needs to be changed.
3. Click **Save**. -> The Website will be updated automatically within a few minutes.

#### Deleting an entry
You can delete entries by selecting them (checking the box on the left) and then clicking **Delete** on the top right.

It is safe to delete an entry, as no other entries depend on it. Consider deleting any uploaded picture alongside the entry to not clutter the repository data.

## Fields

The Biobank entries have seven properties, which are shortly described in the following. Fields marked with `required` need to be filled out, all others are optional, but should be filled out if available.

1. **Title** `required` - The name of the item offered.
    - For example a strain identifier, sample name or reagent name.
2. **Resource Type** `required` - What kind of physical resource this is.
    - Select one from the list: *Strain*, *Sample*, *DNA / Nucleic acid*, *Reagent*, *Culture medium* or *Other*.
3. **Contact person name** `required` - The person offering this specific item.
    - This may be a different person than the lab's main contact.
4. **Contact person email** `required` - The email address requests for this item are sent to.
5. **Affiliated research lab** `required` - The lab this item belongs to.
    - Select the lab from the list. The lab must already exist, see the [Research Labs guide](/documentation/editors_guide/labs/).
    - The **country** shown on the entry is pulled automatically from this lab — you do **not** set a country here. Make sure the lab has its *Country* field filled in.
6. **Picture** - An optional photo of the item.
    - Square or landscape photo. JPG or WebP. Shown on the entry page and its card in the overview.
7. **Description** - A free-text description of the item in markdown ([see markdown cheat sheet](/documentation/markdown/markdown_cheat_sheet/)).
    - Use it to describe price, quantities, condition, handling notes or anything a requester should know.

[card: class:warning]

**Be Careful! You can break things here.** The description supports the extended markdown syntax, which needs to be defined exactly, otherwise the build of the website might fail. Please edit the webpage locally, if you want to use these features.

[:card]

→ [Technical: Biobank Schema](/documentation/technical/datastructure/biobank/)
