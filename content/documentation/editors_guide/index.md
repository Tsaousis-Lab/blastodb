---
layout: layouts/documentation.njk
title: Editor Guide
description: A step-by-step guide for adding and editing content on BlastoDB.
---

[hero: text-align:center]

<h-hero>Editors Guide for BlastoDB<h-hero>

This guide explains how to add and edit the content on BlastoDB using the built-in content management system (CMS).

[:hero]



# Before you start

BlastoDB is hosted on [GitHub](https://github.com). You will need a **GitHub account** and access to the BlastoDB repository. If you do not have these yet, start with the [GitHub Setup](/documentation/editors_guide/github-setup/) page.

Editing the content on this website is done with **Sveltia**. Sveltia is a *content management system (CMS)*. This allows you to add new, or edit existing content on the website. For more substential changes to the layout of the website, or adding or editing the web pages themselfs, you need to touch the code of the website and edit it locally on youd computer. A tutorial for this can be found [here](TODO!).

# What you can manage

Through the CMS you can edit the following content on the website:

- Add or edit **Datasets** on BlastoDB.
- Add or edit information about **Subtypes** of Blastocystis.
- Add or edit **Publications**/references for the data on this website.
- Add or edit **Research Labs** working on Blastocystis.
- Add or edit **Lab Protocols**.
- Add or edit **People**.
- Write or edit **Blog** articles.
- Make **small changes to the webpage**, like editing a description text or fixint a typo.


# How editing works

BlastoDB uses a system called **Sveltia CMS**. You edit content in a form-based editor at [blastoDB/admin](/admin/), and your changes are saved back to GitHub. Changes here are directly published on the webpage and can not be reviewed in a live-view. 

The general workflow is:

1. Go to [www.blastoDB/admin](/admin/) and log in with GitHub.
2. Pick the content type you want to edit from the left sidebar.
3. Make your changes and click **Save**.
4. Your change is pushed to the [Git Repository](https://github.com/Tsaousis-Lab/blastodb) and will be automatically published within a few minutes.
