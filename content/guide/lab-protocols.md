---
layout: layouts/guide.njk
title: Lab Protocols
description: How to add and edit laboratory protocols in the BlastoDB CMS.
---

<h-hero>Lab Protocols</h-hero>

Here you find the information on how to add, edit or remove lab protocols on the admin panel of BlastoDB ([www.blastodb.com/admin](/admin)). Lab protocols are step-by-step procedures that can be linked to datasets.

## Add a new Lab Protocol

1. If there is a related publication, add that first to the database (see [Publications](/guide/publications/))
2. Click **Lab Protocols** in the left sidebar.
3. Click **New Lab Protocols** in the top-right.
4. Fill in the fields described below.
5. Click **Save**. → The website will be updated automatically within a few minutes.

## Editing an Existing Lab Protocol

1. Click **Lab Protocols** in the left sidebar.
2. Click on the protocol you want to edit.
3. Change what needs to be changed.
4. Click **Save**. → The website will be updated automatically within a few minutes.

<div class="guide-warning">

**Be careful when renaming lab protocols.** Datasets are linked to the lab protocols by their name. If you rename a lab protocol, this link breaks. You need to remove the lab protocol from each dataset, then rename it, and then add it back to the datasets.

</div>

## Deleting a Lab Protocol

<div class="guide-warning">

**Be careful when deleting lab protocols.** Datasets that are linked to this protocol will lose that connection. Before deleting, check whether any datasets reference this protocol under their **Lab Protocols** field and remove the link there first.

</div>

1. Click **Lab Protocols** in the left sidebar.
2. Click on the protocol you want to delete.
3. Click the **Delete** button at the top of the editor.
4. Click **Save**. → The website will be updated automatically within a few minutes.

## Fields

1. **Title** `required` — Title of the protocol
    - Example: `Culture of Blastocystis in Jones’ Medium`

2. **Related Publications** — Related publication where the protocol comes from
    - Select from the list.
    - Publications must already be in the system — see the [Publications guide](/guide/publications/).

3. **Protocol** `required` — The full protocol text, written in Markdown.

    <div class="guide-warning">

    **Do not delete the code at the bottom of the protocol.** The section below the line "Please do not change the code below this line" automatically displays the linked publications as a reference list at the bottom of the protocol page.

    </div>

    Write your protocol above that line. Useful Markdown formatting:

    | What you type | What it looks like |
    |---|---|
    | `## Materials` | A section heading |
    | `- item` | A bullet point |
    | `1. step` | A numbered step |
    | `**bold**` | **bold text** |

    A typical structure:
    ```
    ## Materials
    - Reagent A (200 µl)
    - Reagent B (20 µl)

    ## Procedure
    1. Add 200 µl of sample to a 1.5 ml tube.
    2. Add 20 µl of proteinase K.
    3. Vortex for 15 seconds.

    ## Notes
    Store reagents at −20 °C.
    ```
