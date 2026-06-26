---
layout: layouts/documentation.njk
title: Pages
description: How to edit the general content pages on BlastoDB, and how the custom markdown syntax works.
---

[hero: text-align:center]

<h-hero>Pages</h-hero>

[:hero]

Here you find the information on how to edit the web pages of BlastoDB on the admin panel ([www.blastodb.com/admin](/admin)).

This does not include the pages of the [subtypes](/documentation/editors_guide/subtypes/), [datasets](/documentation/editors_guide/datasets/), or [lab protocols](/documentation/editors_guide/lab-protocols). Look at the respective tutorials to add and change the corrensponding pages.

[card: class:warning]

**Pages use custom syntax that can break the site if entered incorrectly.** The BlastoDB site uses special shortcodes like `[hero: ...]`, `[collector -> ...]`, and `[btn: ...]` that are not standard Markdown. The website will not be build propperly if these are not written in the correct syntax.

Simpler changes to the website are fine. However, **if you are not sure what a piece of code does, do not change or delete it.** If you want to do larger changes, edit the website locally with a propper preview if you plan to substentially change the layout or interaction with the website and touch a lot of custom components.

Use the guide on how to [revert a change]](/documentation/editors_guide/rollback/) if something breaks by accident.

[:card]

The content of BlastoDB is written in Markdown, with custom components to load its data and visual elements. You can find a overview of the [markdown syntax here](/documentation/markdown/), and an overview on the [custom components here](/documentation/markdown/custom_components/).

# Add a Page

1. Click **Pages** in the left sidebar.
2. Click on **New** on the top right corner.
3. Enter the **Title**, **Description**, or **Body** (/content of the website) fields as needed. You find a description of the fields below.
4. Click **Save**. → The website will be updated automatically within a few minutes.
5. You can now access this new webpage with the following link: `https://www.blastodb.com/<title_in_lower_case>/`. Alternatively, you can click on **Preview on Live Site** (avter saving the website). Note that it takes a few minutes before the site is build, if you are too fast the page will still be empty.
6. To make it easily accessible, you can add it to the header and/or footer [in the navigation panel](/documentation/editors_guide/navigation), or add a button to a webpage [as described here](/documentation/markdown/custom_components/btn/). Make shure you use the relative link: ~~`https://www.blastodb.com`~~`/<title_in_lower_case>/`

# Editing a Page

1. Click **Pages** in the left sidebar.
2. Click the page you want to edit.
3. Edit the **Title**, **Description**, or **Body** (/content of the website) fields as needed. You find a description of the fields below.
4. Click **Save**. → The website will be updated automatically within a few minutes.

# Delete a Page

1. Click **Pages** in the left sidebar.
2. Select the page you want to delete ()
3. Edit the **Title**, **Description**, or **Body** (/content of the website) fields as needed. You find a description of the fields below.
4. Click **Save**. → The website will be updated automatically within a few minutes.

[card: class:warning]

**Be careful not to delete any important pages!**

If you delete a page, remove it from the Header and Footer [as described here](/documentation/editors_guide/navigation/).

[:card]

# Fields

Each webpage consists of the following elements:

1. **Title** `required` — Shown in the browser tab and used by search engines.

2. **Description** — A short summary shown in search engine results.
    - Keep it under 160 characters.

3. **Body** `required` — The full page content, written in Markdown.
    - See the guide on the [markdown syntax](/documentation/markdown/markdown_syntax/) and the [custom markdown components](/documentation/markdown/custom_components/) to edit the content.

[card: class:warning]

**Again: Do not edit or delete the custom shortcode blocks unless you know what you are doing!** Leave the already present on a page (hero banners, collector blocks, buttons, boxes, cards, columns, rows or grids) untouched and edit the plain text around them. If something breaks, see the guide on how to [revert a change](/documentation/editors_guide/rollback/).

[:card]

# Demo of a Webpage

Here you find a short example of a simple webpage in the markdown syntax:

```markdown
`[hero: text-align:center]

<h-hero> Page Title </h-hero>
Usually, each page is started with a hero card, like this!

[:hero]

# This is the First Headline

Here you can write the content you want.

## And Add a Sub-Chapter

1. And you can add a List
2. With multiple elements

## And Here we have Interactive Elements

For example a [link to somewhere](https://example-link.co.uk).

Or a Button to the Datasets Page like this:

[btn: Go To Datasets -> /datasets/]
```
