---
layout: layouts/guide.njk
title: Logging into the CMS
description: How to log into the BlastoDB CMS and navigate the editorial interface.
---

<h-hero>Logging into the CMS<h-hero>

## Opening the CMS

Go to [www.blastodb.com/admin](/admin/) in your browser. You will see the Sveltia CMS login screen.

If you have not yet set up your GitHub account or PAT, do that first ([GitHub Setup](/guide/github-setup/)).

## Logging in

1. Click **Sing In Using Access Token**
2. Paste the PAT you generated during setup from your favorite password manager into the text field.
3. You are now in the CMS dashboard.

## The editorial workflow

The left sidebar in the dashboard lists all the content types you can edit. Here is a description on what to look out for when editing each content type:

- [**Datasets**](/guide/datasets/) — individual sequencing datasets
- [**Publications**](/guide/publications/) — the publication library
- [**Research Labs**](/guide/labs/) — lab profiles
- [**Lab Protocols**](/guide/lab_protocols/) — laboratory protocols
- [**Subtypes**](/guide/subtypes/) — Blastocystis subtype pages
- [**Vocabularies**](/guide/vocabularies/) — controlled lists (datatypes, countries, sources, etc.)
- [**Pages**](/guide/pages/) — the web-pages of BlastoDB
- [**Navigation**](/guide/navigation/) — header and footer of BlastoDB

**Be careful, all changes go life immediately!** As of the time of writing, Sveltia does **not** support an editorial workflow with *draft -> review -> publish*. This means that every time you click "save", the content gets saved into the GitHub repository, and the site gets updated within a few minutes.
Editing through the CMS is, for the most part, and if not specified otherwise, save. In case you accidentaly break something, you can always [roll back a change](/guide/rollback/).
