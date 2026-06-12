---
layout: layouts/documentation.njk
title: Lab Protocols
description: How to add and edit laboratory protocols in the BlastoDB CMS.
---

<h-hero>Lab Protocols</h-hero>

BlastoDB stores lab protocols important to other data on this website (<a href="/lab-protocols/" target="_blank">www.blastodb.com/lab-protocols</a>). Here you find a guide on how to edit this information in the admin panel, and get an overview and description of all parameters.

If you want to edit the webpage displaying the lab protocols, you finde a guide [here](/documentation/editors_guide/pages/).

## Editing the Lab Protocols

You can edit the content by opening the **Lab Protocols** collection on the left side on the admin panel (<a href="/admin/#/collections/lab-protocols" target="_blank">www.blastodb.com/admin/#/collections/lab-protocols</a>).

#### Add a new Lab Protocol

1. If there is a related publication, add that first to the database (see [Publications](/documentation/editors_guide/publications/))
2. Click **New** in the top-right.
3. Fill in the fields described below.
4. Click **Save**. → The website will be updated automatically within a few minutes.

#### Editing a Lab Protocol

1. Click on the protocol you want to edit.
2. Change what needs to be changed. you can find a description of the fields below.
3. Click **Save**. → The website will be updated automatically within a few minutes.

<div class="guide-warning">

**Be careful when renaming lab protocols.** Datasets are linked to the lab protocols by their name. If you rename a lab protocol, this link breaks. You need to remove the lab protocol from each dataset, then rename it, and then add it back to the datasets.

</div>

#### Deleting a Lab Protocol

<div class="guide-warning">

**Be careful when deleting lab protocols.** Datasets that are linked to this protocol will lose that connection. Before deleting, check whether any datasets reference this protocol under their **Lab Protocols** field and remove the link there first.

</div>

1. Click on the protocol you want to delete.
2. Click the **Delete** button at the top of the editor.
3. Click **Save**. → The website will be updated automatically within a few minutes.

## Fields

1. **Title** `required` — Title of the protocol
    - Example: `Culture of Blastocystis in Jones’ Medium`

2. **Related Publications** — Related publication where the protocol comes from
    - Select from the list.
    - Publications must already be in the system — see the [Publications guide](/documentation/editors_guide/publications/).

3. **Protocol** `required` — The full protocol text, written in Markdown.

    <div class="guide-warning">

    **Do not delete the code at the bottom of the protocol.** The section below the line "Please do not change the code below this line" automatically displays the linked publications as a reference list at the bottom of the protocol page.

    </div>

    Write your protocol above that line. Useful Markdown ==TODO: link to markdown guide== formatting:

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
