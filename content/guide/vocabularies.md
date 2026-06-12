---
layout: layouts/guide.njk
title: Vocabularies
description: How to manage the controlled vocabulary lists used across BlastoDB datasets.
---

# Vocabularies

The *Vocabularies* store parameters which are used to describe and filter the subtypes, datasets and lab protocols. These include:

- Datatypes - which type of data is stored in a dataset
- Sources - sources and hosts of blastocystis
- Data Origins - Where data came from (e.G. In-Vitro, Ex-Vivo...)
- Detection Methods - of Blastocystis, e.G. PCR, Microscopy, ...
- Countries - A list of countries for where data was sampled

Here you find a guide on how to add new values. This has to be done with care, as the other data in this dataset links to this information. These links might get broken!

<div class="guide-warning">

**Only add new values; do not rename or delete existing ones.** Every value in these lists can be selected and stored inside the datasets, lab protocols and subtypes. These links get broken if you rename or delete a value that is already used by other enteries.

</div>

## Editing the Vocabularies

You can edit the content by opening the **Vocabuleries** collection on the left side on the admin panel (<a href="/admin/#/collections/vocabularies" target="_blank">www.blastodb.com/admin/#/collections/vocabularies</a>). Here, you can select which ones you want to edit.

All vocabularies are stored in a list, which you can see in a textbox. Each line represents one item.
To **add an item** simply add a new line with the new value, and llick **Save** on the top right corner. Make shure the new value is spelled correctly, as changing this later when other items link to will lead to breaking changes! Once saved, the new value will now be available to be selected across the BlastoDB.

<div class="guide-warning">

**Editing or Deleting a value is probably not nessecary, and will break links in the data.** These vocabularies are referenced in the datasets and subtypes, if you rename or delete them, these links will break! Please consider carefully if this really is nessecary.

You can reverse a deleted value by re-adding it (in the exact same spelling) to the database.

</div>


## The vocabulary lists

1. **Datatypes** — The type of data in a dataset
    - Examples: `Shotgun`, `16s`, `Metabolome`, 
    - Used in the datasets

2. **Sources** — The host, or source of blastocystis in a dataset
    - Examples: `Mammel`, `Soil`, ...
    - Used in both datasets and subtypes

3. **Data origins** — Where the biological samples originate from.
    - Examples: `In-Vitro`, `Ex-Vivo`, ...
    - Used in the datasets

5. **Detection methods** — How Blastocystis was identified in the samples
    - Examples: `PCR`, `Microscopy`, `Sequencing`, ...
    - Used in the datasets

6. **Countries** — A list of countries used to tag dataset sample origins
    - Examples: `United Kingdom`, `Germany`, ...
    - Currently contains all countries of the [ISO 3166-1 country codes list](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
    - Used in both datasets and subtypes
