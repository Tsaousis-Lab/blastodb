---
layout: layouts/documentation.njk
title: Datasets
description: How to edit datasets in the BlastoDB CMS.
---

[hero: text-align:center]
<h-hero>Datasets<h-hero>
[:hero]
BlastoDB stores links to reputable blastocystis datasets (<a href="/datasets/" target="_blank">www.blastodb.com/datasets</a>). Here you find a guide on how to edit this information in the admin panel, and get an overview and description of all parameters.

If you want to edit the webpage displaying all the datasets, you finde a guide [here](/documentation/editors_guide/pages/).

## Editing the Datasets

You can edit the content by opening the **Datasets** collection on the left side on the admin panel (<a href="/admin/#/collections/datasets" target="_blank">www.blastodb.com/admin/#/collections/datasets</a>).

#### Creating a new dataset
1. Make shure te publication this dataset is based upon is already in BlastoDB, as you will need to link to it ([-> now to add publications](/documentation/editors_guide/publications/)).
2. Click **New** in the top-right.
3. Fill out the form. You can find a description of the fields. 
4. Click **Save**. -> The Website will be updated automatically within a few minutes.

#### Editing an Existing Dataset
1. Click on the existing dataset.
2. Change what needs to be changed.
3. Click **Save**. -> The Website will be updated automatically within a few minutes.

#### Deleting a Dataset
You can delete datasets by selecting them (checking the box on the left) and then clicking **Delete** on the top right.

It is save to delete datasets, as other enteries are dependent on the datasets.

## Fields

The datasets here have fourteen properties, which are shortly described in the folowing. Fields marked with `required` need to be filled out, all others are optional, but should be filled out if available.

1. **Title** `required` - The title of the dataset
    - The name of the Dataset.
2. **Link to source** `required` - The link to the download page/webpage where the dataset can be obtained.
    - A URL to the raw data. For example: `https://www.ncbi.nlm.nih.gov/sra/...`
3. **Related Publications** `required` - The publication(s) this dataset is based upon.
    - Select the publication the dataset is based upon from the list.
    - Publications must be added to the system before you can link to them, see [Publications guide](/documentation/editors_guide/publications/).
4. **Publication Date** `required` - The date the dataset was published
    - Enter a year (2024), month and year (06.2024), or full date (11.06.2024)
5. **Datatypes** `at least one` - The type of data in the dataset.
    - Select at least one or more data types from the list.
    - If a datatype you need is missing, it can be added under *[Vocabularies](/documentation/editors_guide/vocabularies/) → Datatypes*.
6. **Subtype(s)** - The subtypes present in the dataset
    - Select the blastocystis subtypes from the list.
    - Subtypes must already exist to be selectable. You can add new ones under [Subtypes guide](/documentation/editors_guide/subtypes/).
7. **Strains** - Strains of Blastocystis (if available)
    - Free-text list of strain identifiers. One item per line. Leave blank if not applicable.
8. **Data Origin(s)** - e.G. In-Vitro, Ex-Vivo...
    - Select the data origin from the list.
    - If a data origin you need is missing, it can be added under *[Vocabularies](/documentation/editors_guide/vocabularies/) → Data Origin*.
9. **Detection Method(s)** - e.G. PCR, 
    - Select the detection method(s) from the list.
    - If a detection method you need is missing, it can be added under *[Vocabularies](/documentation/editors_guide/vocabularies/) → Detection Methods*.
10. **Sources** - The source where Blastocystis was sampled from (e.G. Human, Mammel, Soil...)
    - Select the source from the list.
    - If a required data source you need is missing, it can be added under *[Vocabularies](/documentation/editors_guide/vocabularies/) → Sources*.
11. **Countries** - The country(s) where the data was collected
    - Select the countries from which the samples were collected from the list.
    - You can edit the available countries in the [Vocabularies](/documentation/editors_guide/vocabularies/).
12. **Lab Protocols**
    - Select related lan protocols from the list.
    - Lab protocols need to be added to the system before you can link to them, see ([Publications guide](/documentation/editors_guide/publications/)).
13. **Annotations** - Short contextual notes shown below the hero of the dataset page, before the description.
    - Use these to set the data into context or hint at something readers should be aware of. A dataset can have several annotations.
    - Each annotation has:
        - **Severity** - The importance of the note: *Info* (blue), *Warning* (amber), or *Severe warning* (red). This controls the colour and icon shown on the dataset page, and the indicator pill shown on the dataset card in the collector. Defaults to *Info*.
        - **Title** - A short heading for the annotation.
        - **Text** - The note itself. Supports basic markdown (bold, italics, links, lists), no custom components.
        - **Related Publication(s)** - Optionally link publications relevant to this annotation, the same way as the dataset-level *Related Publications* field above.
    - Datasets with at least one annotation show a coloured indicator on their card in the [datasets overview](/datasets/), reflecting the most severe annotation.
14. **Description**
    - A free-text description of the dataset in markdown ([see markdown cheat sheet](/documentation/markdown/markdown_cheat_sheet/)).

If a [blog article](/documentation/editors_guide/blog/) links to this dataset, it is shown automatically in a **"Related Blog Articles"** section on the dataset page. You link them from the blog entery.

[card: class:warning]

**Be Careful! You can break things here.** The description supports the extendet markdown syntax, which need to be defined exactly, otherwise the build of the website might fail. Please edit the webpage locally, if you want to use these features.

[:card]
