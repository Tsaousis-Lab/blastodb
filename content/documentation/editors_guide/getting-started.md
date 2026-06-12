---
layout: layouts/documentation.njk
title: Logging into the CMS
description: How to log into the BlastoDB CMS and navigate the editorial interface.
---

[hero: text-align:center]

<h-hero>Logging into the CMS<h-hero>

[:hero]

## Opening the CMS

The content management system (CMS) can be accessed with this link: <a href="/admin" target="_blank">www.blastodb.com/admin</a>

You will need a GitHub Account, access rights to the Resository and a Personal Access Tocen (PAT) to log in. Go to [GitHub Setup](/documentation/editors_guide/github-setup/) if you need help with that.

## Logging in

1. Click **Sing In Using Access Token**
2. Paste the PAT you generated during setup from your favorite password manager into the text field.
3. You are now in the CMS dashboard!

## The editorial workflow

The left sidebar in the dashboard lists all the content you can edit. This includes the content of the database, and the webpage itself.

The content of the database includes:
- [**Datasets**](/documentation/editors_guide/datasets/) — individual sequencing datasets
- [**Publications**](/documentation/editors_guide/publications/) — the publication library
- [**Research Labs**](/documentation/editors_guide/labs/) — lab profiles
- [**Lab Protocols**](/documentation/editors_guide/lab_protocols/) — laboratory protocols
- [**Subtypes**](/documentation/editors_guide/subtypes/) — Blastocystis subtype pages
- [**Vocabularies**](/documentation/editors_guide/vocabularies/) — controlled lists (datatypes, countries, sources, etc.)

The webpage can be edited here:
- [**Pages**](/documentation/editors_guide/pages/) — the web-pages of BlastoDB
- [**Navigation**](/documentation/editors_guide/navigation/) — header and footer of BlastoDB

**Be careful, all changes go life immediately!** As of the time of writing, Sveltia does not support an editorial workflow with *draft -> review -> publish*. This means that every time you click "save", the content gets saved into the GitHub repository, and the site gets updated within a few minutes. On the left side you find a guide on how to edit the content for each of these enteries. Feel free to read up on them.
Editing through the CMS is, for the most part, save. However, some actions can lead to a breaking change. In case you accidentaly break something, you can always [roll back a change](/documentation/editors_guide/rollback/). (It is a hassle though, try to avoid it.)
