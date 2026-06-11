---
layout: layouts/guide.njk
title: Vocabularies
description: How to manage the controlled vocabulary lists used across BlastoDB datasets.
---

# Vocabularies

Here you find the information on how to add or remove values from the vocabularies. The vocabularies are lists of values which are referenced in the datasets and subtypes:

- Datatypes - which type of data is stored in a dataset
- Sources - sources and hosts of blastocystis
- Data Origins - Where data came from (e.G. In-Vitro, Ex-Vivo...)
- Detection Methods - of Blastocystis, e.G. PCR, Microscopy, ...
- Countries - A list of countries for where data was sampled

**Each of these should already contain the relevant information**. 

<div class="guide-warning">

**Be careful when renaming or deleting vocabulary values.** Every value in these lists can be selected and stored inside one or more datasets. If you **rename or delete** a value that is already used by existing datasets, those datasets will silently lose that reference — the field will appear empty even though data was there before. **Only add new values; never rename or delete existing ones.** If a value genuinely needs to be renamed, contact Tasos first so all affected datasets can be updated at the same time.

</div>

## Add a new Value

1. Click **Vocabularies** in the left sidebar.
2. Click the type of vocabulary you want to edit (e.g. **Datatypes**).
3. Scroll to the bottom of the list and click **Add <Vocabulary name>**.
4. Type the new value and click **Save**. → The new value is immediately available in all relevant dataset fields.

## Editing or Deleting a Value

<div class="guide-warning">

**Editing or Deleting a value is probably not nessecary, and will break links in the data.** These vocabularies are referenced in the datasets and subtypes, if you rename or delete them, these links will break! Please consider carefully if this really is nessecary.

Only edit or delete values where you are shure 

</div>

1. Click **Vocabularies** in the left sidebar.
2. Click the vocabulary you want to edit.
3. Find the value you want to edit or delete, and edit/delete it in the list.
4. Click **Save**.

You can reverse a deleted value by re-adding it (in the exact same spelling) to the database.

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
    - Each entry has two fields:
        - **ISO code** — the two-letter country code (always uppercase), e.g. `GB`, `TH`, `DE`
        - **Name** — the full country name as displayed on the site, e.g. `United Kingdom`
    - A full list of ISO codes: [ISO 3166-1 alpha-2 on Wikipedia](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
    - Used in both datasets and subtypes
