---
layout: layouts/guide.njk
title: Datasets
description: How to add and edit datasets in the BlastoDB CMS.
---

<h-hero>Datasets<h-hero>

Here you find the information on how to add, edit or remove a dataset on the admin panel of BlastoDB ([www.blastodb.com/admin](/admin)). You also find an overview and description of the input fields.

## Creating a new dataset

1. Add the publication this dataset is based upon to BlastoDB ([Publications](/guide/publications/)), if it does not already exist (you will need to link to it).
2. Click **Datasets** in the left sidebar.
3. Click **New Datasets** in the top-right.
4. Fill in the fields described below. 
5. Click **Save**. -> The Website will be updated automatically within a few minutes.

## Editing an Existing Dataset

1. Click **Datasets** in the left sidebar.
2. Click on the existing dataset.
3. Change what needs to be changed.
4. Click **Save**. -> The Website will be updated automatically within a few minutes.

## Deleting a Dataset

You can delete datasets by selecting them (checking the box on the left) and then clicking **Delete** on the top right.

It is save to delete datasets, as other enteries are dependent on the datasets.

## Fields

The datasets here have thirteen properties, which are shortly described in the folowing. Fields marked with `required` need to be filled out, all others are optional, but should be filled out if available.

1. **Title** `required` - The title of the dataset
    - The name of the Dataset.
2. **Link to source** `required` - The link to the download page/webpage where the dataset can be obtained.
    - A URL to the raw data. For example: `https://www.ncbi.nlm.nih.gov/sra/...`
3. **Related Publications** `required` - The publication(s) this dataset is based upon.
    - Select the publication the dataset is based upon from the list.
    - Publications must be added to the system before you can link to them, see [Publications guide](/guide/publications/).
4. **Publication Date** `required` - The date the dataset was published
    - Enter a year (2024), month and year (06.2024), or full date (11.06.2024)
5. **Datatypes** `at least one` - The type of data in the dataset.
    - Select at least one or more data types from the list.
    - If a datatype you need is missing, it can be added under *[Vocabularies](/guide/vocabularies/) → Datatypes*.
6. **Subtype(s)** - The subtypes present in the dataset
    - Select the blastocystis subtypes from the list.
    - Subtypes must already exist to be selectable. You can add new ones under [Subtypes guide](/guide/subtypes/).
7. **Strains** - Strains of Blastocystis (if available)
    - Free-text list of strain identifiers. One item per line. Leave blank if not applicable.
8. **Data Origin(s)** - e.G. In-Vitro, Ex-Vivo...
    - Select the data origin from the list.
    - If a data origin you need is missing, it can be added under *[Vocabularies](/guide/vocabularies/) → Data Origin*.
9. **Detection Method(s)** - e.G. PCR, 
    - Select the detection method(s) from the list.
    - If a detection method you need is missing, it can be added under *[Vocabularies](/guide/vocabularies/) → Detection Methods*.
10. **Sources** - The source where Blastocystis was sampled from (e.G. Human, Mammel, Soil...)
    - Select the source from the list.
    - If a required data source you need is missing, it can be added under *[Vocabularies](/guide/vocabularies/) → Sources*.
11. **Countries** - The country(s) where the data was collected
    - Select the countries from which the samples were collected from the list.
    - This currently includes all countries of the ISO 3166 country code standart. You can edit the available countries in the [Vocabularies](/guide/vocabularies/)
12. **Lab Protocols**
    - Select related lan protocols from the list.
    - Lab protocols need to be added to the system before you can link to them, see ([Publications guide](/guide/publications/)).
13. **Description**
    - A free-text description of the dataset.
    - Leave everything below the `---` divider untouched! The default template includes collector blocks that automatically display linked publications and protocols.Please do not delete or change these, otherwise the related references and lab protocols will not be displayed! (In case you accidentally deleted something, you can copy and paste the section from another dataset).

    <div class="guide-warning">
    
    **Be Careful! You can break things here.** The description supports the extendet markdown syntax, which need to be defined exactly, otherwise the build of the website might fail. Please edit the webpage locally, if you want to use these features.

    </div>
