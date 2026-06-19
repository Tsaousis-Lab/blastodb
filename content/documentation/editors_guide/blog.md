---
layout: layouts/documentation.njk
title: Blog
description: How to write and edit blog articles in the BlastoDB CMS.
---

[hero: text-align:center]
<h-hero>Blog<h-hero>

BlastoDB has a blog for news, updates and short articles (<a href="/blog/" target="_blank">www.blastodb.com/blog</a>). This page explains how to write and edit blog articles in the admin panel.

[:hero]

# Editing the Blog

You can edit the blog by opening the **Blog** collection on the left side of the admin panel (<a href="/admin/#/collections/blog" target="_blank">www.blastodb.com/admin/#/collections/blog</a>).

#### Creating a new article
1. If you want to link publications, subtypes or datasets, make sure they already exist in BlastoDB.
2. Click **New** in the top-right.
3. Fill out the form (the fields are described below).
4. Click **Save**. -> The website will be updated automatically within a few minutes.

#### Editing an existing article
1. Click on the existing article.
2. Change what needs to be changed.
3. Click **Save**.

#### Deleting an article
Select the article (checkbox on the left) and click **Delete** on the top right. Deleting an article also removes it from the "Related Blog Articles" sections of any datasets or subtypes it linked to.

# Where articles appear

- All articles are listed on the [Blog page](/blog/), newest first, each shown as a box with its headline and the first few lines of text.
- Each article also gets its own page showing the full text, the author, and any linked publications, subtypes and datasets.
- Datasets and subtypes you link to an article automatically show it under a **"Related Blog Articles"** section on their own pages.

# Fields

Fields marked with `required` need to be filled out, all others are optional.

1. **Title** `required` - The headline of the article.
2. **Publication Date** `required` - When the article was published.
    - Enter a year (2024), month and year (06.2024), or full date (11.06.2024).
3. **Author** - The person who wrote the article.
    - Select from the [People](/documentation/editors_guide/people/) list. Add the person there first if they are missing.
4. **Related Publication(s)** - Publications relevant to the article.
    - Shown as a "References" list on the article page. Publications must be added first, see the [Publications guide](/documentation/editors_guide/publications/).
5. **Related Subtypes** - Subtypes this article is about.
    - The article will appear under "Related Blog Articles" on each linked subtype's page.
6. **Related Datasets** - Datasets this article is about.
    - The article will appear under "Related Blog Articles" on each linked dataset's page.
7. **Body** `required` - The article text.
    - Written in markdown ([see markdown cheat sheet](/documentation/markdown/markdown_cheat_sheet/)).

[card: class:warning]

**Be Careful! You can break things here.** The body supports the extended markdown syntax, which needs to be written exactly, otherwise the build of the website might fail. Please edit the webpage locally if you want to use these features.

[:card]
